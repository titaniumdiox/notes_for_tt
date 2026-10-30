from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

V3 = Path(".runtime/research/milk-tea-v3")
V2 = Path(".runtime/research/milk-tea-v2")
MP3 = Path(".runtime/volc-v3")
FFMPEG = Path(".runtime/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe").resolve()

PAGES = [
    ["When you walk into a milk tea shop, how do you order in Chinese?", "当你走进一家奶茶店，如何使用汉语点单？"],
    ["奶茶。", "你要喝什么？", "我要一杯奶茶。", "真棒！"],
    ["半糖。", "糖度要多少？", "半糖。", "点单成功！"],
    ["少冰。", "冰块要多少？", "少冰。", "你做到了！"],
    ["打包。", "要在这儿喝吗？", "打包。", "继续！"],
    ["谢谢。", "这是你的奶茶。", "谢谢。", "再来一个！"],
    ["一杯奶茶，半糖少冰，打包，谢谢。"],
    ["恭喜你，今天又学会了五个词！", "这是今天的小票，暂停读一下。"],
]


def ffmpeg_stderr(args: list[str]) -> str:
    p = subprocess.run([str(FFMPEG), "-hide_banner", *args], capture_output=True, text=True, encoding="utf-8", errors="replace")
    return p.stderr


def duration(path: Path) -> float:
    out = ffmpeg_stderr(["-i", str(path)])
    m = re.search(r"Duration:\s*(\d+):(\d+):([\d.]+)", out)
    if not m:
        raise RuntimeError(f"cannot read duration: {path}")
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


def trim_edges(src: Path, dst: Path) -> None:
    """Trim only leading/trailing silence; keep every internal pause intact."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    raw = dst.with_suffix(".raw.wav")
    subprocess.run(
        [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(src),
         "-ac", "1", "-ar", "24000", "-c:a", "pcm_s16le", str(raw)],
        check=True,
    )
    dur = duration(raw)
    log = ffmpeg_stderr(["-i", str(raw), "-af", "silencedetect=noise=-45dB:d=0.08", "-f", "null", "NUL"])
    starts = [float(x) for x in re.findall(r"silence_start:\s*([\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", log)]
    start = 0.0
    end = dur
    if starts and ends and starts[0] <= 0.02:
        start = ends[0]
    if starts and ends and ends[-1] >= dur - 0.04:
        end = starts[-1]
    if end - start < 0.2:
        start, end = 0.0, dur
    subprocess.run(
        [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw),
         "-ss", f"{start:.3f}", "-to", f"{end:.3f}", "-c:a", "pcm_s16le", str(dst)],
        check=True,
    )
    raw.unlink(missing_ok=True)


def main() -> int:
    shutil.copy2(V2 / "audio/p01-c00-13992e459e.wav", V3 / "audio/p01-c00.wav")
    voices = []
    for pi, texts in enumerate(PAGES):
        rows = []
        for ci, text in enumerate(texts):
            if pi == 0 and ci == 0:
                f = V3 / "audio/p01-c00.wav"
            else:
                src = MP3 / f"p{pi + 1:02d}-c{ci:02d}.mp3"
                f = V3 / "audio" / f"p{pi + 1:02d}-c{ci:02d}.wav"
                if not src.exists():
                    raise FileNotFoundError(src)
                trim_edges(src, f)
            rows.append({"t": text, "f": f"audio/{f.name}", "d": round(duration(f), 3), "o": 0.0})
        voices.append(rows)
    payload = {
        "speaker": "zh_female_meilinvyou_uranus_bigtts",
        "provider": "volc+elevenlabs",
        "pages": voices,
    }
    (V3 / "voice.js").write_text(
        "SCRIPT.VOICE = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("pages", len(voices), "cues", sum(len(x) for x in voices))
    print("total audio", round(sum(r["d"] for p in voices for r in p), 2))
    for i, p in enumerate(voices, 1):
        print(f"p{i:02d}", [r["d"] for r in p])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
