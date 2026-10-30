#!/usr/bin/env python3
"""Generate one scene image with a character reference (Ark Seedream).

Example:
  python production/assets/mascot/generate_scene.py \
    --prompt production/assets/mascot/scene-p01-prompt.txt \
    --out production/assets/mascot/scenes/p01-v1.png
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import os
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path.cwd()
ENV = ROOT / ".env.local"
REF = ROOT / "production/assets/mascot/reference/momo-character-sheet-v1.png"


def load_env(path: Path) -> None:
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), v.strip().strip('"').strip("'")
        if k and v:
            os.environ.setdefault(k, v)


def data_uri(path: Path, max_side: int = 1024) -> str:
    im = Image.open(path).convert("RGB")
    im.thumbnail((max_side, max_side))
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=88, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    print("reference", im.size, "jpeg_bytes", len(buf.getvalue()))
    return "data:image/jpeg;base64," + b64


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--size", default="1440x2560")
    ap.add_argument("--ref", default=str(REF))
    args = ap.parse_args()

    load_env(ENV)
    key = os.environ["ARK_API_KEY"]
    model = os.environ["ARK_IMAGE_MODEL"]
    endpoint = os.environ["ARK_BASE_URL"]
    prompt = Path(args.prompt).read_text(encoding="utf-8").strip()
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    body = {
        "model": model,
        "prompt": prompt,
        "image": data_uri(Path(args.ref)),
        "size": args.size,
        "output_format": "png",
        "response_format": "url",
        "watermark": False,
    }
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            raw = resp.read()
            print("http", resp.status, "bytes", len(raw))
    except urllib.error.HTTPError as exc:
        print("http", exc.code, "reason", exc.reason)
        print(exc.read().decode("utf-8", errors="replace")[:2500])
        return 1
    obj = json.loads(raw.decode("utf-8"))
    meta = out.with_suffix(".json")
    meta.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    data = obj.get("data") or []
    if not data or not data[0].get("url"):
        print(json.dumps(obj, ensure_ascii=False)[:1500])
        return 1
    with urllib.request.urlopen(data[0]["url"], timeout=180) as resp:
        image = resp.read()
    out.write_bytes(image)
    print("saved", out, len(image), "bytes")
    print("size", data[0].get("size"), "format", data[0].get("output_format"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
