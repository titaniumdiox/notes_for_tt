#!/usr/bin/env python3
"""Volcengine Doubao TTS v3 (HTTP/SSE, unidirectional).

Credentials are read from .env.local; the key is never printed or written
into source. Example:

  python production/tts/volc_tts.py --text "少冰。" --out out/shao.mp3 --speed 0.92

Env:
  VOLC_TTS_API_KEY
  VOLC_TTS_RESOURCE_ID        e.g. seed-tts-2.0
  VOLC_TTS_VOICE_ID           e.g. zh_female_meilinvyou_uranus_bigtts
  VOLC_TTS_APP_ID             optional for the new API
  VOLC_TTS_ENDPOINT           default https://openspeech.bytedance.com/api/v3/tts/unidirectional
"""

from __future__ import annotations

import argparse
import base64
import csv
import json
import os
import sys
import time
import urllib.error
import urllib.request
import uuid
from pathlib import Path

DEFAULT_ENDPOINT = "https://openspeech.bytedance.com/api/v3/tts/unidirectional"


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), v.strip().strip('"').strip("'")
        if k and v:
            os.environ.setdefault(k, v)


def require(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise SystemExit(f"missing {name} in .env.local")
    return value


def _audio_bytes_from_data(data):
    """The SSE data field can be raw base64, a URL, or an object."""
    if data is None:
        return b""
    if isinstance(data, dict):
        for key in ("audio", "audio_base64", "base64", "url"):
            if key in data:
                return _audio_bytes_from_data(data[key])
        return b""
    if not isinstance(data, str):
        return b""
    text = data.strip()
    if text.startswith("http://") or text.startswith("https://"):
        with urllib.request.urlopen(text, timeout=60) as resp:
            return resp.read()
    # SSE often returns base64; tolerate whitespace.
    try:
        return base64.b64decode("".join(text.split()), validate=False)
    except Exception:
        return text.encode("utf-8", errors="replace")


def synthesize(text: str, out: Path, *, speed: float, voice: str, resource: str,
               api_key: str, endpoint: str, pitch: int = 0, volume: int = 0,
               retries: int = 3, timeout: int = 120) -> Path:
    out.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "user": {"uid": "cn-fieldnotes"},
        "req_params": {
            "speaker": voice,
            "text": text,
            "audio_params": {
                "format": "mp3",
                "sample_rate": 24000,
                "speech_rate": int(round((speed - 1.0) * 100)),
                "loudness_rate": int(volume),
            },
            "additions": json.dumps(
                {"post_process": {"pitch": int(pitch)}},
                ensure_ascii=False,
            ),
        },
    }
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    headers = {
        "X-Api-Key": api_key,
        "X-Api-Resource-Id": resource,
        "X-Api-Request-Id": str(uuid.uuid4()),
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    }
    errors: list[str] = []
    for attempt in range(1, retries + 1):
        req = urllib.request.Request(endpoint, data=body, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                audio = bytearray()
                event = None
                debug = os.environ.get("VOLC_DEBUG") == "1"
                if debug:
                    print(
                        "  http",
                        getattr(resp, "status", None),
                        "ctype=", resp.headers.get("Content-Type"),
                        "len=", resp.headers.get("Content-Length"),
                        "logid=", resp.headers.get("X-Tt-Logid"),
                    )
                seen_events: list[int | None] = []
                done = False
                for raw in resp:
                    line = raw.decode("utf-8", errors="replace").strip()
                    if not line:
                        continue

                    # This endpoint returns newline-delimited JSON, not SSE.
                    if line.startswith("{"):
                        try:
                            obj = json.loads(line)
                        except json.JSONDecodeError:
                            if debug:
                                print(f"  non-json line={line[:120]!r}")
                            continue
                        code = obj.get("code", 0)
                        if code not in (0, 20000000, None):
                            raise RuntimeError(f"TTS error code={code} message={obj.get('message')}")
                        if code == 20000000 or obj.get("message") == "OK":
                            done = True
                            break
                        data = obj.get("data")
                        if isinstance(data, str) and data:
                            chunk = _audio_bytes_from_data(data)
                            audio.extend(chunk)
                            if debug:
                                print(f"  audio_chunk={len(chunk)} total={len(audio)}")
                        continue

                    if line.startswith("event:"):
                        try:
                            event = int(line.split(":", 1)[1].strip())
                        except ValueError:
                            event = None
                        seen_events.append(event)
                    elif line.startswith("data:"):
                        data_txt = line.split(":", 1)[1].strip()
                        if debug:
                            print(f"  event={event} data_len={len(data_txt)}")
                        try:
                            obj = json.loads(data_txt)
                        except json.JSONDecodeError:
                            continue
                        code = obj.get("code", 0)
                        if code not in (0, 20000000, None):
                            raise RuntimeError(f"TTS error code={code} message={obj.get('message')}")
                        if event == 352:
                            audio.extend(_audio_bytes_from_data(obj.get("data")))
                        if event == 152:
                            done = True
                            break
                if debug:
                    print(f"  events={seen_events} done={done} audio_bytes={len(audio)}")
                if not audio:
                    raise RuntimeError("no audio bytes received")
                out.write_bytes(bytes(audio))
                print(f"ok {out} {len(audio)} bytes")
                return out
        except Exception as exc:  # noqa: BLE001
            errors.append(f"attempt {attempt}: {exc}")
            if attempt < retries:
                time.sleep(1.2 * attempt)
    raise RuntimeError("; ".join(errors))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--env-file", default=".env.local")
    ap.add_argument("--text")
    ap.add_argument("--out")
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--pitch", type=int, default=0)
    ap.add_argument("--volume", type=int, default=0)
    ap.add_argument("--voice")
    ap.add_argument("--resource")
    ap.add_argument("--endpoint")
    ap.add_argument("--table", help="CSV with columns: job_id,text,out[,speed,pitch,volume]")
    args = ap.parse_args()

    load_env(Path(args.env_file))
    api_key = require("VOLC_TTS_API_KEY")
    resource = args.resource or require("VOLC_TTS_RESOURCE_ID")
    voice = args.voice or require("VOLC_TTS_VOICE_ID")
    endpoint = args.endpoint or os.environ.get("VOLC_TTS_ENDPOINT", DEFAULT_ENDPOINT)

    if args.table:
        rows = list(csv.DictReader(Path(args.table).open(encoding="utf-8-sig")))
        for row in rows:
            text = (row.get("text") or "").strip()
            if not text:
                continue
            out = Path(row["out"])
            synthesize(
                text, out,
                speed=float(row.get("speed") or args.speed),
                pitch=int(row.get("pitch") or args.pitch),
                volume=int(row.get("volume") or args.volume),
                voice=row.get("voice") or voice,
                resource=resource, api_key=api_key, endpoint=endpoint,
            )
        return 0

    if not args.text or not args.out:
        ap.error("--text and --out are required unless --table is used")
    synthesize(
        args.text, Path(args.out),
        speed=args.speed, pitch=args.pitch, volume=args.volume,
        voice=voice, resource=resource, api_key=api_key, endpoint=endpoint,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
