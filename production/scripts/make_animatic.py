#!/usr/bin/env python3
"""Generate a simple 9:16 animatic for Episode 01 from the shotlist.

Cards are intentionally rough: they validate pacing, subtitles, and scene order,
not final art.
"""

from __future__ import annotations

import csv
import json
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

EPISODE = Path("production/episodes/01-us-vs-china")
OUT = EPISODE / "animatic"
W, H = 1080, 1920
CREAM = (244, 233, 216)
INK = (31, 42, 68)
RED = (201, 76, 59)
GREEN = (122, 139, 127)
WHITE = (255, 255, 255)
MUTED = (120, 116, 108)

FONT_EN = "C:/Windows/Fonts/arialbd.ttf"
FONT_EN_REG = "C:/Windows/Fonts/arial.ttf"
FONT_CN = "C:/Windows/Fonts/msyh.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def is_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in text)


def fit(draw: ImageDraw.ImageDraw, text: str, path: str, size: int, width: int, min_size: int = 28):
    while size > min_size:
        f = font(path, size)
        box = draw.textbbox((0, 0), text, font=f)
        if box[2] - box[0] <= width:
            return f
        size -= 4
    return font(path, min_size)


def center(draw: ImageDraw.ImageDraw, xy: tuple[float, float], text: str, f, ink=INK):
    box = draw.textbbox((0, 0), text, font=f)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1] - (box[3] - box[1]) / 2), text, font=f, fill=ink)


def header(draw: ImageDraw.ImageDraw, index: int, total: int):
    draw.text((64, 54), "CN FIELDNOTES", font=font(FONT_EN, 26), fill=INK)
    label = f"EP 01 / {index:02d} of {total:02d}"
    f = font(FONT_EN, 24)
    box = draw.textbbox((0, 0), label, font=f)
    draw.text((W - 64 - (box[2] - box[0]), 56), label, font=f, fill=MUTED)
    draw.line((64, 104, W - 64, 104), fill=INK, width=2)
    draw.text((64, H - 54), "animatic v1 · scratch VO · not final art", font=font(FONT_EN_REG, 22), fill=MUTED)


def card_base(index: int, total: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(image)
    header(draw, index, total)
    # Large ghost scene number for orientation.
    ghost = font(FONT_EN, 300)
    draw.text((W - 360, H - 420), f"{index:02d}", font=ghost, fill=(232, 220, 202))
    return image, draw


def speech(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, fill=WHITE, ink=INK):
    f = font(FONT_CN if is_cjk(text) else FONT_EN, 34)
    box = draw.textbbox((0, 0), text, font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.rounded_rectangle((x, y, x + w + 52, y + h + 34), radius=22, fill=fill, outline=ink, width=3)
    draw.text((x + 26, y + 12), text, font=f, fill=ink)


def draw_split(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((64, 360, W - 64, 860), radius=32, fill=WHITE, outline=INK, width=4)
    draw.rounded_rectangle((64, 900, W - 64, 1400), radius=32, fill=(226, 236, 228), outline=INK, width=4)
    draw.text((100, 388), "US", font=font(FONT_EN, 46), fill=RED)
    draw.text((100, 928), "CN", font=font(FONT_EN, 46), fill=GREEN)
    draw.ellipse((150, 560, 270, 680), fill=(230, 196, 170), outline=INK, width=3)
    draw.ellipse((150, 1100, 270, 1220), fill=(230, 196, 170), outline=INK, width=3)
    speech(draw, 300, 540, "Linda", fill=(255, 241, 238))
    speech(draw, 300, 1080, "阿姨", fill=(237, 246, 238))


def draw_table(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((110, 760, W - 110, 820), radius=18, fill=(198, 160, 120), outline=INK, width=3)
    for x in (270, 540, 810):
        draw.ellipse((x - 62, 690, x + 62, 760), fill=WHITE, outline=INK, width=3)
        draw.arc((x - 40, 630, x + 40, 710), 200, 340, fill=RED, width=4)
    # Relationship map.
    for cx, cy, label in ((250, 1030, "family"), (540, 950, "neighbor"), (830, 1030, "friend's mom")):
        draw.ellipse((cx - 70, cy - 70, cx + 70, cy + 70), fill=WHITE, outline=INK, width=4)
        center(draw, (cx, cy), label[:12], font(FONT_EN_REG, 20), ink=INK)
    draw.line((320, 1030, 470, 985), fill=INK, width=3)
    draw.line((610, 985, 760, 1030), fill=INK, width=3)
    draw.line((320, 1030, 760, 1030), fill=INK, width=2)
    draw.text((110, 1160), "not formal — relational", font=font(FONT_EN, 30), fill=RED)


def draw_network(draw: ImageDraw.ImageDraw):
    center(draw, (W / 2, 850), "关系", font(FONT_CN, 120), ink=INK)
    center(draw, (W / 2, 970), "guānxì — relationship", font(FONT_EN_REG, 30), ink=MUTED)
    for cx, cy, label in ((210, 650, "family"), (870, 650, "neighbor"), (540, 1250, "colleague")):
        draw.ellipse((cx - 110, cy - 110, cx + 110, cy + 110), fill=WHITE, outline=RED, width=5)
        center(draw, (cx, cy), label, font(FONT_EN_REG, 24), ink=INK)
    draw.line((320, 650, 470, 790), fill=INK, width=4)
    draw.line((760, 650, 610, 790), fill=INK, width=4)
    draw.line((540, 960, 540, 1140), fill=INK, width=4)


def draw_gift(draw: ImageDraw.ImageDraw, opened: bool):
    draw.rounded_rectangle((260, 780, 820, 1240), radius=20, fill=(255, 247, 235), outline=INK, width=5)
    draw.rectangle((500, 780, 580, 1240), fill=RED)
    draw.rectangle((260, 900, 820, 960), fill=RED)
    if opened:
        draw.polygon([(260, 780), (380, 700), (500, 780)], fill=(255, 241, 238), outline=INK)
        draw.polygon([(580, 780), (700, 700), (820, 780)], fill=(255, 241, 238), outline=INK)
        draw.text((300, 1300), "thank you first", font=font(FONT_EN, 40), fill=GREEN)
    else:
        draw.arc((420, 680, 660, 840), 200, 340, fill=RED, width=18)
        draw.text((300, 1300), "open it now", font=font(FONT_EN, 40), fill=RED)


def draw_receipt(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((260, 520, 820, 1360), radius=12, fill=WHITE, outline=INK, width=5)
    for y in range(620, 1000, 80):
        draw.line((320, y, 760, y), fill=(210, 205, 195), width=3)
    draw.text((320, 1040), "TIP", font=font(FONT_EN, 48), fill=INK)
    draw.text((320, 1120), "20%", font=font(FONT_EN, 150), fill=RED)
    draw.text((320, 1280), "expected in the US", font=font(FONT_EN_REG, 28), fill=MUTED)


def draw_qr(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((250, 600, 690, 1040), radius=10, fill=WHITE, outline=INK, width=6)
    # Pseudo-QR blocks.
    import random

    rng = random.Random(42)
    for gy in range(10):
        for gx in range(10):
            if rng.random() > 0.5:
                x = 285 + gx * 37
                y = 635 + gy * 37
                draw.rectangle((x, y, x + 28, y + 28), fill=INK)
    draw.ellipse((760, 720, 980, 940), fill=(237, 246, 238), outline=GREEN, width=6)
    center(draw, (870, 830), "NO TIP", font(FONT_EN, 34), ink=GREEN)
    draw.text((250, 1120), "menu price = price", font=font(FONT_EN, 40), fill=INK)


def draw_recap(draw: ImageDraw.ImageDraw):
    labels = [("长辈", "elders"), ("礼物", "gift"), ("小费", "tip")]
    for i, (cn, en) in enumerate(labels):
        x = 180 + i * 360
        draw.ellipse((x - 110, 760, x + 110, 980), fill=WHITE, outline=RED, width=6)
        center(draw, (x, 840), cn, font(FONT_CN, 56), ink=INK)
        center(draw, (x, 920), en, font(FONT_EN_REG, 24), ink=MUTED)
    center(draw, (W / 2, 1250), "?", font(FONT_EN, 220), ink=RED)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = list(csv.DictReader((EPISODE / "shotlist.csv").open(encoding="utf-8-sig")))
    durations = []
    concat_lines = []

    scenes = {
        1: ("LINDA / 阿姨", "US: first name  ·  CN: kinship term", draw_split),
        2: ("长辈", "zhǎngbèi — elders", draw_table),
        3: ("NOT FORMAL. RELATIONSHIP.", "不是“客气”，是“关系”", draw_network),
        4: ("OPEN IT NOW", "US birthday party", lambda d: draw_gift(d, opened=False)),
        5: ("THANK FIRST. OPEN LATER.", "先谢谢，再拆", lambda d: draw_gift(d, opened=True)),
        6: ("TIP: 20%", "US restaurant bill", draw_receipt),
        7: ("小费", "xiǎofèi — tip", draw_qr),
        8: ("DIFFERENT RULES.", "Which one would surprise you most?", draw_recap),
    }

    for index, row in enumerate(rows, 1):
        start = row["start"]
        end = row["end"]
        mm1, ss1 = [int(v) for v in start.split(":")]
        mm2, ss2 = [int(v) for v in end.split(":")]
        duration = (mm2 * 60 + ss2) - (mm1 * 60 + ss1)
        durations.append(duration)
        title, subtitle, painter = scenes.get(index, ("SCENE", "", lambda d: None))
        image, draw = card_base(index, len(rows))
        title_font_path = FONT_CN if is_cjk(title) else FONT_EN
        subtitle_font_path = FONT_CN if is_cjk(subtitle) else FONT_EN_REG
        draw.text((64, 180), title, font=fit(draw, title, title_font_path, 92, W - 128), fill=INK)
        draw.text((64, 300), subtitle, font=fit(draw, subtitle, subtitle_font_path, 38, W - 128), fill=RED)
        painter(draw)
        image.save(OUT / f"card_{index:02d}.png")
        concat_lines.append(f"file '{(OUT / f'card_{index:02d}.png').resolve().as_posix()}'")
        concat_lines.append(f"duration {duration}")
        print(f"card {index:02d}: {duration}s {title}")

    # Last image must be repeated so concat holds its duration.
    concat_lines.append(f"file '{(OUT / f'card_{len(rows):02d}.png').resolve().as_posix()}'")
    (OUT / "concat.txt").write_text("\n".join(concat_lines) + "\n", encoding="utf-8")
    (OUT / "durations.json").write_text(
        json.dumps({"durations": durations, "total": sum(durations)}, indent=2), encoding="utf-8"
    )
    print(f"total {sum(durations)}s -> {OUT / 'concat.txt'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
