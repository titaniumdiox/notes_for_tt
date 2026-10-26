#!/usr/bin/env python3
"""Convert the scratch SRT to a 1080x1920 ASS file for readable 9:16 subtitles."""

from __future__ import annotations

import re
import sys
from pathlib import Path


def ass_time(value: str) -> str:
    match = re.match(r"(\d+):(\d+):(\d+)[,.](\d+)", value.strip())
    if not match:
        raise ValueError(value)
    h, m, s, ms = match.groups()
    return f"{int(h)}:{int(m):02d}:{int(s):02d}.{int(ms[:2]):02d}"


def main() -> int:
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "scratch_en.srt")
    dst = src.with_suffix(".ass")
    text = src.read_text(encoding="utf-8").strip()
    blocks = re.split(r"\r?\n\s*\r?\n", text)
    events = []
    for block in blocks:
        lines = [line for line in block.splitlines() if line.strip()]
        if len(lines) < 3 or "-->" not in lines[1]:
            continue
        start, end = [part.strip() for part in lines[1].split("-->")]
        body = "\\N".join(lines[2:])
        events.append(f"Dialogue: 0,{ass_time(start)},{ass_time(end)},Default,,0,0,0,,{body}")

    header = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,44,&H00FFFFFF,&H000000FF,&H80000000,&H80000000,-1,0,0,0,100,100,0,0,3,2,0,2,80,80,160,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    dst.write_text(header + "\n".join(events) + "\n", encoding="utf-8")
    print(f"wrote {dst} ({len(events)} cues)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
