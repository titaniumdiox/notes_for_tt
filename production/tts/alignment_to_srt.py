#!/usr/bin/env python3
"""Build SRT/ASS from ElevenLabs character-level alignment."""

from __future__ import annotations

import json
import re
import sys
import textwrap
from pathlib import Path


def ts_srt(seconds: float) -> str:
    ms = int(round(max(0, seconds) * 1000))
    h, rem = divmod(ms, 3_600_000)
    m, rem = divmod(rem, 60_000)
    s, ms = divmod(rem, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def ts_ass(seconds: float) -> str:
    cs = int(round(max(0, seconds) * 100))
    h, rem = divmod(cs, 360_000)
    m, rem = divmod(rem, 6_000)
    s, cs = divmod(rem, 100)
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def main() -> int:
    if len(sys.argv) < 2:
        raise SystemExit("usage: alignment_to_srt.py ALIGNMENT_JSON [OUT_DIR]")
    path = Path(sys.argv[1])
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else path.parent
    payload = json.loads(path.read_text(encoding="utf-8"))
    alignment = payload.get("alignment")
    if not alignment:
        raise SystemExit("no alignment in JSON")

    chars = alignment["characters"]
    starts = alignment["characterStartTimesSeconds"]
    ends = alignment["characterEndTimesSeconds"]
    text = "".join(chars)

    # Split into sentences while keeping character offsets.
    sentence_matches = list(re.finditer(r"[^.!?]+[.!?]+|[^.!?]+$", text))
    cues: list[tuple[float, float, str]] = []
    for match in sentence_matches:
        sentence = match.group(0)
        if not sentence.strip():
            continue
        base = match.start()
        wrapped = textwrap.wrap(
            sentence.strip(),
            width=90,
            break_long_words=False,
            break_on_hyphens=False,
        ) or [sentence.strip()]
        search_from = 0
        for chunk in wrapped:
            local = sentence.find(chunk, search_from)
            if local < 0:
                local = search_from
            search_from = local + len(chunk)
            start_idx = base + local
            end_idx = base + local + len(chunk) - 1
            start_idx = min(start_idx, len(chars) - 1)
            end_idx = min(max(end_idx, start_idx), len(chars) - 1)
            while start_idx < end_idx and chars[start_idx].isspace():
                start_idx += 1
            while end_idx > start_idx and chars[end_idx].isspace():
                end_idx -= 1
            start = starts[start_idx]
            end = ends[end_idx]
            if end - start < 0.4:
                end = start + 0.4
            cues.append((start, end, chunk.strip()))

    cues.sort(key=lambda item: item[0])
    srt_path = out_dir / "bella.srt"
    ass_path = out_dir / "bella.ass"
    with srt_path.open("w", encoding="utf-8", newline="\n") as handle:
        for index, (start, end, cue) in enumerate(cues, 1):
            handle.write(f"{index}\n{ts_srt(start)} --> {ts_srt(end)}\n{cue}\n\n")

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
    with ass_path.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write(header)
        for start, end, cue in cues:
            handle.write(f"Dialogue: 0,{ts_ass(start)},{ts_ass(end)},Default,,0,0,0,,{cue}\n")

    print(f"cues={len(cues)} duration={ends[-1]:.2f}s")
    print(f"wrote {srt_path}")
    print(f"wrote {ass_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
