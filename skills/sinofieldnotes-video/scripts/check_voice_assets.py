#!/usr/bin/env python3
"""Check that every voice.js cue has a real WAV with a matching duration.

Usage:
  python check_voice_assets.py --episode production/episodes/05-breakfast
  python check_voice_assets.py --episode ... --ffmpeg path/to/ffmpeg.exe
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


def ffmpeg_duration(ffmpeg: str, path: Path) -> float:
    p = subprocess.run([ffmpeg, "-hide_banner", "-i", str(path)], capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = re.search(r"Duration:\s*(\d+):(\d+):([\d.]+)", p.stderr)
    if not m:
        raise RuntimeError(f"cannot read duration: {path}")
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode", required=True)
    ap.add_argument("--ffmpeg", default="ffmpeg")
    ap.add_argument("--tolerance", type=float, default=0.05)
    args = ap.parse_args()

    ep = Path(args.episode)
    text = (ep / "voice.js").read_text(encoding="utf-8")
    voice = json.loads(text[text.index("=") + 1:].strip().rstrip(";"))
    bad = []
    total = 0.0
    count = 0
    for pi, page in enumerate(voice["pages"], 1):
        for ci, cue in enumerate(page):
            f = ep / cue["f"]
            count += 1
            if not f.exists():
                bad.append(f"p{pi:02d}-c{ci:02d} missing: {f}")
                continue
            d = ffmpeg_duration(args.ffmpeg, f)
            total += d
            if abs(d - cue["d"]) > args.tolerance:
                bad.append(f"p{pi:02d}-c{ci:02d} duration {d:.3f}s != voice.js {cue['d']:.3f}s")
    print(f"cues {count}  audio {total:.2f}s  tolerance {args.tolerance:.2f}s")
    if bad:
        print("MISMATCH")
        for line in bad:
            print(" ", line)
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
