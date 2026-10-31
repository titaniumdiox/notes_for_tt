from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

EP = Path("production/episodes/07-momo-reading-01")
MP3 = EP / "audio"
FFMPEG = Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()

# Each page: [(text, mp3 stem)] — English sentence audio is only on p01/p06/p08.
PAGES = [
    [("Momo's Afternoon Reading. Quiet Night Thoughts.", "p01-c00")],
    [("床前明月光。", "p02-c00"), ("Before my bed the moonlight streams.", "p02-c01"), ("明月。", "p02-c02"), ("bright moon.", "p02-c03")],
    [("疑是地上霜。", "p03-c00"), ("And on the ground, like frost, it gleams.", "p03-c01"), ("霜。", "p03-c02"), ("frost.", "p03-c03")],
    [("举头望明月。", "p04-c00"), ("I raise my head — the moon is bright.", "p04-c01"), ("举头。", "p04-c02"), ("raise one's head.", "p04-c03")],
    [("低头思故乡。", "p05-c00"), ("I lower my head — home fills the night.", "p05-c01"), ("低头。", "p05-c02"), ("lower one's head.", "p05-c05"), ("故乡。", "p05-c03"), ("hometown.", "p05-c04")],
    [("床前明月光，疑是地上霜。举头望明月，低头思故乡。", "p06-c00"), ("Before my bed the moonlight streams. And on the ground like frost it gleams. I raise my head the moon is bright. I lower my head and home fills the night.", "p06-c01")],
    [("这是今天的词汇小票。", "p07-c00")],
    [("A little poem, a little peace.", "p08-c00")],
]


def stderr(args):
    return subprocess.run([str(FFMPEG), "-hide_banner", *args], capture_output=True, text=True, encoding="utf-8", errors="replace").stderr


def duration(path: Path) -> float:
    m = re.search(r"Duration:\s*(\d+):(\d+):([\d.]+)", stderr(["-i", str(path)]))
    if not m:
        raise RuntimeError(f"cannot read duration: {path}")
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


def trim_edges(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    raw = dst.with_suffix(".raw.wav")
    subprocess.run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(src), "-ac", "1", "-ar", "24000", "-c:a", "pcm_s16le", str(raw)], check=True)
    dur = duration(raw)
    log = stderr(["-i", str(raw), "-af", "silencedetect=noise=-45dB:d=0.08", "-f", "null", "NUL"])
    starts = [float(x) for x in re.findall(r"silence_start:\s*([\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", log)]
    start, end = 0.0, dur
    if starts and ends and starts[0] <= 0.02:
        start = ends[0]
    if starts and ends and ends[-1] >= dur - 0.04:
        end = starts[-1]
    if end - start < 0.2:
        start, end = 0.0, dur
    subprocess.run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw), "-ss", f"{start:.3f}", "-to", f"{end:.3f}", "-c:a", "pcm_s16le", str(dst)], check=True)
    raw.unlink(missing_ok=True)


def main() -> int:
    voices = []
    for page in PAGES:
        rows = []
        for text, stem in page:
            src = MP3 / f"{stem}.mp3"
            dst = EP / "audio" / f"{stem}.wav"
            if not src.exists():
                raise FileNotFoundError(src)
            trim_edges(src, dst)
            rows.append({"t": text, "f": f"audio/{dst.name}", "d": round(duration(dst), 3), "o": 0.0})
        voices.append(rows)
    payload = {"speaker": "zh_female_meilinvyou_uranus_bigtts", "provider": "volc+elevenlabs", "pages": voices}
    (EP / "voice.js").write_text("SCRIPT.VOICE = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print("pages", len(voices), "cues", sum(len(x) for x in voices))
    print("total audio", round(sum(r["d"] for p in voices for r in p), 2))
    for i, p in enumerate(voices, 1):
        print(f"p{i:02d}", [r["d"] for r in p])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
