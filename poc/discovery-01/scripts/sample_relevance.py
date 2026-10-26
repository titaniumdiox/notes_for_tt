#!/usr/bin/env python3
"""Draw a reproducible sample for manual relevance review."""

from __future__ import annotations

import csv
import json
import random
import sys
from pathlib import Path

out = Path(sys.argv[1] if len(sys.argv) > 1 else "poc/discovery-01")
size = int(sys.argv[2]) if len(sys.argv) > 2 else 30
with (out / "normalized" / "videos.jsonl").open(encoding="utf-8") as handle:
    records = [json.loads(line) for line in handle if line.strip()]
rng = random.Random(20261026)
sample = rng.sample(records, min(size, len(records)))

path = out / "report" / "relevance_sample.csv"
with path.open("w", encoding="utf-8-sig", newline="") as handle:
    writer = csv.DictWriter(
        handle,
        fieldnames=["video_id", "page", "rank", "username", "desc", "hashtags", "label_0_1_2", "notes"],
    )
    writer.writeheader()
    for record in sample:
        writer.writerow(
            {
                "video_id": record["video_id"],
                "page": record["page"],
                "rank": record["rank"],
                "username": record["username"],
                "desc": " ".join((record["desc"] or "").split()),
                "hashtags": ",".join(record["hashtags"]),
                "label_0_1_2": "",
                "notes": "",
            }
        )

print(f"sample: {path} ({len(sample)} rows)")
for i, record in enumerate(sample, 1):
    desc = " ".join((record["desc"] or "").split())
    print(f"{i:02d}. p{record['page']} @{record['username']} | {desc[:190]} | #{','.join(record['hashtags'][:5])}")
