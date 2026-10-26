#!/usr/bin/env python3
"""Concatenate SAPI scratch WAV parts and build a scratch SRT/timing report.

The timings are anchored to the generated scratch audio. They are for animatic
pacing only; re-time against the final voice track before publishing.
"""

from __future__ import annotations

import json
import re
import sys
import wave
from pathlib import Path


def ts(seconds: float) -> str:
    millis = int(round(seconds * 1000))
    hours, rem = divmod(millis, 3_600_000)
    minutes, rem = divmod(rem, 60_000)
    secs, ms = divmod(rem, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{ms:03d}"


def split_cues(text: str, max_chars: int = 84) -> list[str]:
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s.strip()]
    cues: list[str] = []
    for sentence in sentences:
        if len(sentence) <= max_chars:
            cues.append(sentence)
            continue
        words = sentence.split()
        line: list[str] = []
        for word in words:
            candidate = " ".join(line + [word])
            if len(candidate) > max_chars and line:
                cues.append(" ".join(line))
                line = [word]
            else:
                line.append(word)
        if line:
            cues.append(" ".join(line))
    return cues or [text.strip()]


def main() -> int:
    if len(sys.argv) < 2:
        raise SystemExit("usage: build_scratch.py EPISODE_DIR")
    episode = Path(sys.argv[1])
    parts = sorted(episode.glob("scratch_part_*.wav"))
    if not parts:
        raise SystemExit(f"no scratch parts in {episode}")

    with wave.open(str(parts[0]), "rb") as first:
        params = first.getparams()
    frames = []
    durations = []
    for part in parts:
        with wave.open(str(part), "rb") as handle:
            if handle.getparams()[:3] != params[:3]:
                raise SystemExit(f"WAV format mismatch: {part}")
            data = handle.readframes(handle.getnframes())
            duration = handle.getnframes() / handle.getframerate()
            frames.append(data)
            durations.append(duration)

    silence_seconds = 0.35
    silence = b"\x00" * int(params.framerate * silence_seconds) * params.sampwidth * params.nchannels
    combined = []
    for index, data in enumerate(frames):
        combined.append(data)
        if index < len(frames) - 1:
            combined.append(silence)

    out_wav = episode / "scratch_vo.wav"
    with wave.open(str(out_wav), "wb") as handle:
        handle.setparams(params)
        handle.writeframes(b"".join(combined))

    vo_text = (episode / "vo_en.txt").read_text(encoding="utf-8").strip()
    paragraphs = [p.strip() for p in re.split(r"\r?\n\s*\r?\n", vo_text) if p.strip()]
    if len(paragraphs) != len(parts):
        raise SystemExit(f"paragraph count {len(paragraphs)} != WAV parts {len(parts)}")

    cursor = 0.0
    cues = []
    timing = []
    for paragraph, duration in zip(paragraphs, durations):
        timing.append(
            {
                "paragraph": paragraph,
                "start": round(cursor, 3),
                "end": round(cursor + duration, 3),
                "duration": round(duration, 3),
            }
        )
        chunks = split_cues(paragraph)
        total_chars = sum(len(c) for c in chunks) or 1
        local = cursor
        for chunk in chunks:
            share = len(chunk) / total_chars
            cue_duration = max(0.6, duration * share)
            cues.append((local, min(cursor + duration, local + cue_duration), chunk))
            local += cue_duration
        cursor += duration + silence_seconds

    srt_path = episode / "scratch_en.srt"
    with srt_path.open("w", encoding="utf-8", newline="\n") as handle:
        for index, (start, end, text) in enumerate(cues, 1):
            handle.write(f"{index}\n{ts(start)} --> {ts(end)}\n{text}\n\n")

    timing_path = episode / "scratch_timing.json"
    timing_path.write_text(
        json.dumps(
            {
                "episode": episode.name,
                "voice": "Windows SAPI (scratch only; not publish voice)",
                "total_seconds": round(cursor, 3),
                "paragraphs": timing,
                "cues": len(cues),
                "note": "Scratch timings; re-time against the final VO before publishing.",
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"wrote {out_wav} ({cursor:.2f}s), {srt_path}, {timing_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
