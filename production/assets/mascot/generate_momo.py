#!/usr/bin/env python3
"""Generate one Momo character sheet with Ark Seedream.

Reads ARK_API_KEY / ARK_IMAGE_MODEL / ARK_BASE_URL from .env.local.
Never prints the key. Saves image + response metadata under .runtime/ark-test.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path.cwd()
ENV = ROOT / ".env.local"


def load_env(path: Path) -> None:
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), v.strip().strip('"').strip("'")
        if k and v:
            os.environ.setdefault(k, v)


def main() -> int:
    load_env(ENV)
    key = os.environ["ARK_API_KEY"]
    model = os.environ["ARK_IMAGE_MODEL"]
    endpoint = os.environ["ARK_BASE_URL"]
    prompt = Path(sys.argv[1] if len(sys.argv) > 1 else "production/assets/mascot/momo-prompt-v1.txt").read_text(encoding="utf-8").strip()
    out_dir = Path(".runtime/ark-test")
    out_dir.mkdir(parents=True, exist_ok=True)

    body = {
        "model": model,
        "prompt": prompt,
        "size": "2K",
        "output_format": "png",
        "response_format": "url",
        "watermark": False,
    }
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            raw = resp.read()
            print("http", resp.status, "bytes", len(raw))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print("http", exc.code, "reason", exc.reason)
        print(body[:2000])
        return 1
    obj = json.loads(raw.decode("utf-8"))
    (out_dir / "momo-response.json").write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    data = obj.get("data") or []
    if not data or not data[0].get("url"):
        print(json.dumps(obj, ensure_ascii=False)[:1000])
        return 1
    url = data[0]["url"]
    with urllib.request.urlopen(url, timeout=120) as resp:
        image = resp.read()
    out = out_dir / "momo-character-sheet.png"
    out.write_bytes(image)
    print("saved", out, len(image), "bytes")
    print("size", data[0].get("size"), "format", data[0].get("output_format"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
