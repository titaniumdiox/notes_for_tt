#!/usr/bin/env python3
"""Merge discovery runs into one deduped, multi-pillar content pool.

Pillars are heuristic tags for navigation, not final editorial decisions.
"""

from __future__ import annotations

import csv
import json
import math
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "poc/content-pool")
RUNS = [
    ("discovery-01", "poc/discovery-01"),
    ("discovery-01-repeat", "poc/discovery-01-repeat"),
    ("discovery-02-living-in-china", "poc/discovery-02-living-in-china"),
    ("culture-differences-01", "poc/culture-differences-01"),
    ("culture-differences-02", "poc/culture-differences-02"),
    ("discovery-03-chinese-street-food", "poc/discovery-03-chinese-street-food"),
    ("discovery-04-chinese-family-life", "poc/discovery-04-chinese-family-life"),
    ("discovery-05-china-travel", "poc/discovery-05-china-travel"),
]

PILLARS = [
    "culture_difference",
    "daily_life",
    "travel",
    "food",
    "language",
    "family_social",
    "work_money",
    "tech_convenience",
    "rural_nature",
]

# Order matters: the first match becomes the primary pillar for the shortlist.
PATTERNS: dict[str, list[str]] = {
    "culture_difference": [
        r"culture\s*shock", r"cultural\s*shock", r"culture\s*difference",
        r"cultural\s*difference", r"normal in (the )?(us|usa|america|europe|china)",
        r"abnormal in", r"only in china", r"foreigner", r"expat",
        r"etiquette", r"taboo", r"misunderstanding", r"stereotype",
        r"china\s*(vs|versus)\s*(the )?(us|usa|america|west|europe)",
        r"(us|usa|america|west|europe)\s*(vs|versus)\s*china",
        r"why chinese", r"chinese culture", r"cultural", r"culture",
        r"文化差异", r"文化冲击", r"中外", r"老外", r"外国人", r"对比",
    ],
    "daily_life": [
        r"daily life", r"day in (my|the) life", r"dayinmylife", r"routine",
        r"vlog", r"apartment", r"commute", r"grocery", r"morning",
        r"日常", r"生活", r"一天", r"公寓", r"早晨", r"vlog",
    ],
    "travel": [
        r"travel", r"trip", r"tourism", r"visitchina", r"chinatravel",
        r"beijing", r"shanghai", r"shenzhen", r"guangzhou", r"chengdu",
        r"chongqing", r"xian", r"hangzhou", r"suzhou", r"wuhan",
        r"旅行", r"旅游", r"打卡", r"城市",
    ],
    "food": [
        r"food", r"eat", r"breakfast", r"lunch", r"dinner", r"noodle",
        r"hotpot", r"restaurant", r"street food", r"grocery", r"milk tea",
        r"美食", r"吃", r"早餐", r"火锅", r"奶茶", r"菜市场", r"外卖",
    ],
    "language": [
        r"learn chinese", r"chinese learning", r"mandarin", r"hsk",
        r"pronunciation", r"speak chinese", r"slow chinese", r"language",
        r"中文", r"汉语", r"普通话", r"口语", r"学中文",
    ],
    "family_social": [
        r"family", r"mom", r"mother", r"dad", r"father", r"parent",
        r"marriage", r"married", r"wedding", r"kids?", r"child", r"son",
        r"daughter", r"grandma", r"grandpa", r"generation", r"dating",
        r"relationship", r"家庭", r"妈妈", r"父母", r"结婚", r"婚姻",
        r"孩子", r"相亲", r"催婚", r"代际",
    ],
    "work_money": [
        r"work", r"job", r"salary", r"rent", r"cost of living", r"office",
        r"boss", r"colleague", r"delivery rider", r"工作", r"工资",
        r"房租", r"上班", r"打工", r"外卖员", r"物价",
    ],
    "tech_convenience": [
        r"didi", r"alipay", r"wechat", r"mobile payment", r"high-speed rail",
        r"metro", r"subway", r"convenience", r"future", r"高铁", r"地铁",
        r"支付", r"快递", r"方便", r"科技",
    ],
    "rural_nature": [
        r"rural", r"village", r"countryside", r"farm", r"nature", r"mountain",
        r"rice", r"农村", r"村", r"山", r"田野", r"乡村",
    ],
}
COMPILED = {pillar: [re.compile(p, re.I) for p in patterns] for pillar, patterns in PATTERNS.items()}


def text_for(record: dict) -> str:
    return " ".join(
        [
            record.get("desc") or "",
            " ".join(record.get("hashtags") or []),
            record.get("nickname") or "",
            record.get("username") or "",
        ]
    ).lower()


def tag_pillars(record: dict) -> list[str]:
    text = text_for(record)
    return [pillar for pillar in PILLARS if any(p.search(text) for p in COMPILED[pillar])]


def load_run(run_name: str, run_dir: Path) -> list[dict]:
    path = run_dir / "normalized" / "videos.jsonl"
    if not path.exists():
        print(f"skip missing {path}")
        return []
    with path.open(encoding="utf-8") as handle:
        records = [json.loads(line) for line in handle if line.strip()]
    for record in records:
        record["_run"] = run_name
    return records


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    merged: dict[str, dict] = {}
    run_counts: Counter = Counter()
    duplicate_rows = 0

    for run_name, run_dir in RUNS:
        records = load_run(run_name, Path(run_dir))
        for record in records:
            run_counts[run_name] += 1
            video_id = record["video_id"]
            if video_id in merged:
                duplicate_rows += 1
                existing = merged[video_id]
                if run_name not in existing["source_runs"]:
                    existing["source_runs"].append(run_name)
                keyword = record.get("search_keyword")
                if keyword and keyword not in existing["source_keywords"]:
                    existing["source_keywords"].append(keyword)
                continue
            record["source_runs"] = [run_name]
            record["source_keywords"] = [record.get("search_keyword")] if record.get("search_keyword") else []
            record["pillars"] = tag_pillars(record)
            record["primary_pillar"] = record["pillars"][0] if record["pillars"] else "other"
            play = record.get("play_count") or 0
            interactions = sum(record.get(k) or 0 for k in ("digg_count", "comment_count", "share_count"))
            record["engagement_rate"] = round(interactions / play, 4) if play else None
            record["share_rate"] = round((record.get("share_count") or 0) / play, 4) if play else None
            record["score"] = round(math.log10(play + 10) * (1 + (record["share_rate"] or 0) * 20), 3)
            merged[video_id] = record

    videos = list(merged.values())
    videos.sort(key=lambda r: (-(r.get("play_count") or 0), r["video_id"]))

    with (OUT / "videos.jsonl").open("w", encoding="utf-8", newline="\n") as handle:
        for record in videos:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")

    creators: dict[str, dict] = {}
    for record in videos:
        key = record.get("creator_id") or record.get("sec_uid") or record.get("username")
        if not key:
            continue
        creator = creators.setdefault(
            key,
            {
                "creator_id": record.get("creator_id"),
                "sec_uid": record.get("sec_uid"),
                "username": record.get("username"),
                "nickname": record.get("nickname"),
                "verified": record.get("verified"),
                "follower_count": record.get("follower_count"),
                "videos_in_pool": 0,
                "total_play": 0,
                "pillars": set(),
            },
        )
        creator["videos_in_pool"] += 1
        creator["total_play"] += record.get("play_count") or 0
        creator["pillars"].update(record["pillars"])
    for creator in creators.values():
        creator["pillars"] = sorted(creator["pillars"])
    with (OUT / "creators.jsonl").open("w", encoding="utf-8", newline="\n") as handle:
        for creator in sorted(creators.values(), key=lambda c: -c["total_play"]):
            handle.write(json.dumps(creator, ensure_ascii=False) + "\n")

    per_pillar = Counter(record["primary_pillar"] for record in videos)
    multi_pillar = sum(1 for record in videos if len(record["pillars"]) > 1)
    no_pillar = sum(1 for record in videos if not record["pillars"])
    top_hashtags = Counter(tag for record in videos for tag in (record.get("hashtags") or [])).most_common(30)

    candidates = []
    for pillar in PILLARS:
        pool = [record for record in videos if record["primary_pillar"] == pillar]
        for record in sorted(pool, key=lambda r: -(r.get("score") or 0))[:4]:
            candidates.append((pillar, "top_score", record))
        for record in sorted(pool, key=lambda r: -(r.get("share_rate") or 0))[:2]:
            candidates.append((pillar, "top_share_rate", record))

    seen_candidates = set()
    with (OUT / "candidates.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(
            [
                "pillar", "selection", "video_id", "username", "desc", "play_count",
                "digg_count", "comment_count", "share_count", "engagement_rate",
                "share_rate", "score", "video_url", "source_keywords",
            ]
        )
        for pillar, selection, record in candidates:
            key = (pillar, record["video_id"])
            if key in seen_candidates:
                continue
            seen_candidates.add(key)
            writer.writerow(
                [
                    pillar, selection, record["video_id"], record.get("username") or "",
                    " ".join((record.get("desc") or "").split()),
                    record.get("play_count") or 0, record.get("digg_count") or 0,
                    record.get("comment_count") or 0, record.get("share_count") or 0,
                    record.get("engagement_rate"), record.get("share_rate"),
                    record.get("score"), record.get("video_url") or "",
                    " | ".join(record.get("source_keywords") or []),
                ]
            )

    metrics = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "runs": [{"run": name, "rows": run_counts[name]} for name, _ in RUNS],
        "raw_rows": sum(run_counts.values()),
        "duplicate_rows_removed": duplicate_rows,
        "unique_videos": len(videos),
        "unique_creators": len(creators),
        "multi_pillar_videos": multi_pillar,
        "no_pillar_videos": no_pillar,
        "per_primary_pillar": dict(per_pillar),
        "top_hashtags": [{"hashtag": tag, "videos": count} for tag, count in top_hashtags],
        "candidates": len(seen_candidates),
        "note": "Pillars are keyword heuristics; review candidates before editorial use.",
    }
    (OUT / "metrics.json").write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(metrics, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
