#!/usr/bin/env python3
"""Make one contact sheet from a rendered film, so QA reads one image instead of eight.

Usage:
  python qa_contact_sheet.py --video out/breakfast-v1.mp4 --out out/qa-contact-sheet.png
  python qa_contact_sheet.py --video ... --times 2,8,15,22,30,38,46,56 --cols 4
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--times", default="2,8,15,22,30,38,46,56")
    ap.add_argument("--cols", type=int, default=4)
    ap.add_argument("--thumb-width", type=int, default=360)
    ap.add_argument("--ffmpeg", default="ffmpeg")
    args = ap.parse_args()

    video = Path(args.video)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    times = [float(x) for x in args.times.split(",") if x.strip()]
    tmp = out.parent / ".qa_frames"
    shutil.rmtree(tmp, ignore_errors=True)
    tmp.mkdir(parents=True, exist_ok=True)
    frames = []
    try:
        for i, t in enumerate(times):
            f = tmp / f"f{i:02d}.png"
            subprocess.run(
                [args.ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
                 "-ss", str(t), "-i", str(video), "-frames:v", "1", "-update", "1", str(f)],
                check=True,
            )
            if f.exists():
                frames.append((t, Image.open(f).convert("RGB")))
        if not frames:
            raise RuntimeError("no frames extracted")

        thumb_w = args.thumb_width
        first = frames[0][1]
        thumb_h = round(first.height * thumb_w / first.width)
        label_h = 34
        margin = 12
        cols = max(1, min(args.cols, len(frames)))
        rows = (len(frames) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * (thumb_w + margin) + margin, rows * (thumb_h + label_h + margin) + margin), "#F4E9D8")
        d = ImageDraw.Draw(sheet)
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
        except Exception:
            font = None

        for i, (t, im) in enumerate(frames):
            im = im.resize((thumb_w, thumb_h), Image.LANCZOS)
            col, row = i % cols, i // cols
            x = margin + col * (thumb_w + margin)
            y = margin + row * (thumb_h + label_h + margin)
            sheet.paste(im, (x, y))
            d.text((x + 4, y + thumb_h + 6), f"{t:.1f}s", fill="#22304A", font=font)

        sheet.save(out)
        print(f"saved {out}  {len(frames)} frames  {sheet.width}x{sheet.height}")
        return 0
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
