#!/usr/bin/env python3
"""Generate the 12-card animatic for Episode 01 v3 (explainer)."""

from __future__ import annotations

import csv
import json
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

EPISODE = Path("production/episodes/01-us-vs-china")
OUT = EPISODE / "animatic-v3"
W, H = 1080, 1920
CREAM = (244, 233, 216)
INK = (31, 42, 68)
RED = (201, 76, 59)
GREEN = (122, 139, 127)
WHITE = (255, 255, 255)
MUTED = (122, 112, 96)
GOLD = (196, 160, 96)

FONT_EN = "C:/Windows/Fonts/arialbd.ttf"
FONT_EN_REG = "C:/Windows/Fonts/arial.ttf"
FONT_CN = "C:/Windows/Fonts/msyh.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def is_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in text)


def fit(draw: ImageDraw.ImageDraw, text: str, path: str, size: int, width: int, min_size: int = 24):
    while size > min_size:
        f = font(path, size)
        if draw.textbbox((0, 0), text, font=f)[2] <= width:
            return f
        size -= 3
    return font(path, min_size)


def center(draw: ImageDraw.ImageDraw, xy, text: str, f, fill=INK):
    box = draw.textbbox((0, 0), text, font=f)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1] - (box[3] - box[1]) / 2), text, font=f, fill=fill)


def paper() -> Image.Image:
    base = Image.new("RGB", (W, H), CREAM)
    noise = Image.effect_noise((W, H), 16).convert("L")
    grain = Image.merge("RGB", (noise, noise, noise)).convert("RGB")
    base = Image.blend(base, grain, 0.045)
    draw = ImageDraw.Draw(base)
    # Soft halftone corners.
    for x in range(60, 320, 22):
        for y in range(60, 220, 22):
            draw.ellipse((x, y, x + 3, y + 3), fill=(226, 214, 194))
    for x in range(W - 320, W - 60, 22):
        for y in range(H - 240, H - 80, 22):
            draw.ellipse((x, y, x + 3, y + 3), fill=(226, 214, 194))
    return base


def header(draw: ImageDraw.ImageDraw, index: int, total: int):
    draw.text((64, 54), "CN FIELDNOTES", font=font(FONT_EN, 26), fill=INK)
    label = f"EP 01 / {index:02d} of {total:02d}"
    f = font(FONT_EN, 23)
    box = draw.textbbox((0, 0), label, font=f)
    draw.text((W - 64 - (box[2] - box[0]), 56), label, font=f, fill=MUTED)
    draw.line((64, 104, W - 64, 104), fill=INK, width=2)
    draw.text((64, H - 50), "v3 · Bella · animatic", font=font(FONT_EN_REG, 21), fill=MUTED)


def base(index: int, total: int, title: str, subtitle: str):
    image = paper()
    draw = ImageDraw.Draw(image)
    header(draw, index, total)
    draw.text((64, 170), title, font=fit(draw, title, FONT_CN if is_cjk(title) else FONT_EN, 86, W - 128), fill=INK)
    draw.text((64, 280), subtitle, font=fit(draw, subtitle, FONT_CN if is_cjk(subtitle) else FONT_EN_REG, 34, W - 128), fill=RED)
    return image, draw


def bubble(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, fill=WHITE, ink=INK):
    f = font(FONT_CN if is_cjk(text) else FONT_EN, 38)
    box = draw.textbbox((0, 0), text, font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.rounded_rectangle((x, y, x + w + 56, y + h + 38), radius=24, fill=fill, outline=ink, width=3)
    draw.text((x + 28, y + 14), text, font=f, fill=ink)


def doorway(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, accent=INK):
    draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=(255, 249, 239), outline=accent, width=4)
    draw.rectangle((x + w * 0.18, y + h * 0.18, x + w * 0.82, y + h * 0.82), fill=(232, 220, 201), outline=accent, width=2)
    # Silhouette: head + shoulders.
    cx = x + w / 2
    draw.ellipse((cx - 42, y + h * 0.34, cx + 42, y + h * 0.34 + 84), fill=INK)
    draw.rounded_rectangle((cx - 88, y + h * 0.53, cx + 88, y + h * 0.86), radius=44, fill=INK)


def icon_card(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, label: str, kind: str, accent=RED):
    draw.rounded_rectangle((x, y, x + w, y + h), radius=28, fill=WHITE, outline=INK, width=3)
    center(draw, (x + w / 2, y + 56), label, font(FONT_EN, 26), fill=accent)
    cx, cy = x + w / 2, y + h / 2 + 24
    if kind == "name":
        draw.ellipse((cx - 42, cy - 42, cx + 42, cy + 42), fill=(230, 196, 170), outline=INK, width=3)
    elif kind == "gift":
        draw.rounded_rectangle((cx - 52, cy - 36, cx + 52, cy + 50), radius=8, fill=(255, 241, 238), outline=INK, width=3)
        draw.rectangle((cx - 8, cy - 36, cx + 8, cy + 50), fill=RED)
        draw.rectangle((cx - 52, cy - 6, cx + 52, cy + 10), fill=RED)
    else:
        draw.rounded_rectangle((cx - 50, cy - 58, cx + 50, cy + 58), radius=8, fill=WHITE, outline=INK, width=3)
        for i in range(3):
            draw.line((cx - 28, cy - 28 + i * 24, cx + 28, cy - 28 + i * 24), fill=MUTED, width=4)
        draw.text((cx + 4, cy + 10), "20%", font=font(FONT_EN, 30), fill=RED)


def draw_hook(draw: ImageDraw.ImageDraw):
    icon_card(draw, 64, 520, 280, 360, "NAME", "name")
    icon_card(draw, 400, 520, 280, 360, "GIFT", "gift")
    icon_card(draw, 736, 520, 280, 360, "TIP", "tip")
    draw.text((64, 980), "One dinner. Three translations.", font=font(FONT_EN, 40), fill=INK)


def draw_us_name(draw: ImageDraw.ImageDraw):
    doorway(draw, 90, 480, 420, 760, accent=RED)
    bubble(draw, 560, 600, "Linda")
    draw.text((560, 760), "first name = friendly", font=font(FONT_EN, 34), fill=RED)


def draw_cn_name(draw: ImageDraw.ImageDraw):
    doorway(draw, 90, 480, 420, 760, accent=GREEN)
    bubble(draw, 560, 600, "阿姨", fill=(237, 246, 238))
    draw.text((560, 760), "长辈 zhǎngbèi", font=font(FONT_CN, 38), fill=GREEN)


def draw_map(draw: ImageDraw.ImageDraw):
    center(draw, (W / 2, 760), "阿姨", font(FONT_CN, 92), fill=INK)
    center(draw, (W / 2, 860), "auntie = placement", font(FONT_EN_REG, 28), fill=MUTED)
    nodes = [(220, 560, "family"), (860, 560, "neighbor"), (540, 1180, "friend's mom")]
    for cx, cy, label in nodes:
        draw.ellipse((cx - 105, cy - 105, cx + 105, cy + 105), fill=WHITE, outline=GREEN, width=5)
        center(draw, (cx, cy), label, font(FONT_EN_REG, 23), fill=INK)
    draw.line((320, 560, 470, 700), fill=INK, width=4)
    draw.line((760, 560, 610, 700), fill=INK, width=4)
    draw.line((540, 880, 540, 1070), fill=INK, width=4)


def draw_gift_open(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((260, 700, 820, 1180), radius=18, fill=(255, 247, 235), outline=INK, width=5)
    draw.rectangle((500, 700, 580, 1180), fill=RED)
    draw.rectangle((260, 820, 820, 880), fill=RED)
    draw.polygon([(260, 700), (380, 620), (500, 700)], fill=(255, 241, 238), outline=INK)
    draw.polygon([(580, 700), (700, 620), (820, 700)], fill=(255, 241, 238), outline=INK)
    draw.text((300, 1240), "open it now", font=font(FONT_EN, 46), fill=RED)


def draw_gift_wait(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((260, 700, 820, 1180), radius=18, fill=(255, 247, 235), outline=INK, width=5)
    draw.rectangle((500, 700, 580, 1180), fill=RED)
    draw.rectangle((260, 820, 820, 880), fill=RED)
    draw.text((300, 1240), "thank you first", font=font(FONT_EN, 46), fill=GREEN)
    # Two simple hands.
    draw.ellipse((160, 900, 280, 1020), fill=(230, 196, 170), outline=INK, width=3)
    draw.ellipse((800, 900, 920, 1020), fill=(230, 196, 170), outline=INK, width=3)


def draw_person_thing(draw: ImageDraw.ImageDraw):
    center(draw, (280, 780), "PERSON", font(FONT_EN, 40), fill=INK)
    draw.ellipse((200, 820, 360, 980), fill=(230, 196, 170), outline=INK, width=4)
    center(draw, (W / 2, 900), ">", font(FONT_EN, 100), fill=RED)
    draw.rounded_rectangle((700, 820, 900, 980), radius=12, fill=(255, 241, 238), outline=INK, width=4)
    center(draw, (800, 900), "THING", font(FONT_EN, 34), fill=INK)
    center(draw, (W / 2, 1180), "人 > 物", font(FONT_CN, 64), fill=RED)


def draw_tip_us(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((260, 500, 820, 1360), radius=12, fill=WHITE, outline=INK, width=5)
    for y in range(600, 1000, 80):
        draw.line((320, y, 760, y), fill=(210, 205, 195), width=3)
    draw.text((320, 1040), "TIP", font=font(FONT_EN, 48), fill=INK)
    draw.text((320, 1120), "20%", font=font(FONT_EN, 150), fill=RED)
    draw.text((320, 1280), "part of the service", font=font(FONT_EN_REG, 28), fill=MUTED)


def draw_tip_cn(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((240, 520, 680, 960), radius=10, fill=WHITE, outline=INK, width=6)
    rng = random.Random(42)
    for gy in range(10):
        for gx in range(10):
            if rng.random() > 0.5:
                x, y = 275 + gx * 37, 555 + gy * 37
                draw.rectangle((x, y, x + 28, y + 28), fill=INK)
    draw.ellipse((760, 640, 980, 860), fill=(237, 246, 238), outline=GREEN, width=6)
    center(draw, (870, 750), "NO TIP", font(FONT_EN, 34), fill=GREEN)
    draw.text((240, 1040), "小费 xiǎofèi", font=font(FONT_CN, 46), fill=INK)
    draw.text((240, 1120), "menu price = price", font=font(FONT_EN, 36), fill=MUTED)


def draw_recap(draw: ImageDraw.ImageDraw):
    labels = [("长辈", "name"), ("礼物", "gift"), ("小费", "tip")]
    for i, (cn, _) in enumerate(labels):
        x = 180 + i * 360
        draw.ellipse((x - 110, 680, x + 110, 900), fill=WHITE, outline=RED, width=6)
        center(draw, (x, 790), cn, font(FONT_CN, 54), fill=INK)
    draw.text((64, 1060), "Different rules. Same instinct.", font=font(FONT_EN, 42), fill=INK)


def draw_map_respect(draw: ImageDraw.ImageDraw):
    center(draw, (W / 2, 820), "RESPECT", font(FONT_EN, 54), fill=RED)
    nodes = [(180, 600, "NAME"), (900, 600, "GIFT"), (540, 1200, "TIP")]
    for cx, cy, label in nodes:
        draw.ellipse((cx - 90, cy - 90, cx + 90, cy + 90), fill=WHITE, outline=INK, width=4)
        center(draw, (cx, cy), label, font(FONT_EN, 22), fill=INK)
    draw.line((270, 600, 450, 760), fill=INK, width=3)
    draw.line((810, 600, 630, 760), fill=INK, width=3)
    draw.line((540, 920, 540, 1110), fill=INK, width=3)


def draw_end(draw: ImageDraw.ImageDraw):
    center(draw, (W / 2, 720), "?", font(FONT_EN, 260), fill=RED)
    center(draw, (W / 2, 1060), "长辈 · 先谢谢 · 小费", font(FONT_CN, 52), fill=INK)
    center(draw, (W / 2, 1170), "Which one would you have gotten wrong?", font(FONT_EN_REG, 30), fill=MUTED)


SCENES = {
    1: ("THREE SMALL DIFFERENCES", "None of them is about being polite.", draw_hook),
    2: ("LINDA", "US: first name = friendly", draw_us_name),
    3: ("阿姨", "CN: a kinship word places you", draw_cn_name),
    4: ("THE NAME MAPS THE RELATIONSHIP", "not formal — positional", draw_map),
    5: ("OPEN IT NOW", "US: the paper is part of the fun", draw_gift_open),
    6: ("THANK YOU FIRST", "CN: the person before the thing", draw_gift_wait),
    7: ("PERSON > THING", "It's not about the gift.", draw_person_thing),
    8: ("TIP: 20%", "US: part of the service", draw_tip_us),
    9: ("NO TIP", "CN: menu price is the price", draw_tip_cn),
    10: ("DIFFERENT RULES", "Same instinct.", draw_recap),
    11: ("WHAT RESPECT LOOKS LIKE", "One map, three translations", draw_map_respect),
    12: ("WHICH ONE?", "Leave a comment", draw_end),
}


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = list(csv.DictReader((EPISODE / "shotlist-v3.csv").open(encoding="utf-8-sig")))
    concat = []
    durations = []
    for index, row in enumerate(rows, 1):
        start_m, start_s = [int(v) for v in row["start"].split(":")]
        end_m, end_s = [int(v) for v in row["end"].split(":")]
        duration = (end_m * 60 + end_s) - (start_m * 60 + start_s)
        title, subtitle, painter = SCENES[index]
        image, draw = base(index, len(rows), title, subtitle)
        painter(draw)
        path = OUT / f"card_{index:02d}.png"
        image.save(path)
        concat.extend([f"file '{path.resolve().as_posix()}'", f"duration {duration}"])
        durations.append(duration)
        print(f"{index:02d} {duration}s {title}")
    concat.append(f"file '{(OUT / f'card_{len(rows):02d}.png').resolve().as_posix()}'")
    (OUT / "concat.txt").write_text("\n".join(concat) + "\n", encoding="utf-8")
    (OUT / "durations.json").write_text(json.dumps({"durations": durations, "total": sum(durations)}, indent=2), encoding="utf-8")
    print("total", sum(durations), "s")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
