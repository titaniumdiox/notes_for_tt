from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

EP = Path("production/episodes/10-plants")
MP3 = EP / "audio"
FFMPEG = Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()

PAGES = [
    [("Momo has some little green friends to take care of.", "p01-c00")],
    [("植物。", "p02-c00"), ("这是什么？", "p02-c01"), ("这是植物。", "p02-c02"), ("小绿朋友！", "p02-c03")],
    [("浇水。", "p03-c00"), ("植物需要什么？", "p03-c01"), ("要给植物浇水。", "p03-c02"), ("喝水啦！", "p03-c03")],
    [("叶子。", "p04-c00"), ("这片叶子怎么样？", "p04-c01"), ("叶子绿绿的。", "p04-c02"), ("绿绿的！", "p04-c03")],
    [("花朵。", "p05-c00"), ("那是什么？", "p05-c01"), ("这是花朵。", "p05-c02"), ("好漂亮！", "p05-c03")],
    [("生长。", "p06-c00"), ("植物会怎么样？", "p06-c01"), ("植物会慢慢生长。", "p06-c02"), ("长高了！", "p06-c03")],
    [("我照顾植物：浇水、看叶子、等花朵生长。", "p07-c00")],
    [("恭喜你，今天又学会了五个词！", "p08-c00"), ("这是今天的小票，暂停读一下。", "p08-c01")],
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
