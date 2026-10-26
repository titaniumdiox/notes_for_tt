#!/usr/bin/env python3
"""Apply manual relevance labels to the sampled CSV and summarize them."""

from __future__ import annotations

import csv
import json
import sys
from collections import Counter
from pathlib import Path

out = Path(sys.argv[1] if len(sys.argv) > 1 else "poc/discovery-01")
report = out / "report"
labels = json.loads((report / "relevance_labels.json").read_text(encoding="utf-8"))
rows = list(csv.DictReader((report / "relevance_sample.csv").open(encoding="utf-8-sig")))
default_criteria = {
    "2": "directly about daily life, culture, travel or lived experience in China",
    "1": "China-adjacent but narrower (food, language learning, commerce) or weak context",
    "0": "no China or daily-life signal, or generic content",
}
criteria_path = report / "criteria.json"
criteria = (
    json.loads(criteria_path.read_text(encoding="utf-8"))
    if criteria_path.exists()
    else default_criteria
)

missing = [row["video_id"] for row in rows if row["video_id"] not in labels]
if missing:
    raise SystemExit(f"unlabeled video ids: {missing}")

counts = Counter()
by_page: dict[str, Counter] = {}
for row in rows:
    label = labels[row["video_id"]]["label"]
    row["label_0_1_2"] = str(label)
    row["notes"] = labels[row["video_id"]].get("note", "")
    counts[label] += 1
    by_page.setdefault(row["page"], Counter())[label] += 1

with (report / "relevance_review.csv").open("w", encoding="utf-8-sig", newline="") as handle:
    writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
    writer.writeheader()
    writer.writerows(rows)

total = len(rows)
summary = {
    "sample_size": total,
    "sampling": "random.Random(20261026).sample(videos.jsonl, 30)",
    "labels": {
        "2_relevant": counts[2],
        "1_adjacent": counts[1],
        "0_off_topic": counts[0],
    },
    "rates": {
        "relevant": round(counts[2] / total, 4),
        "adjacent": round(counts[1] / total, 4),
        "off_topic": round(counts[0] / total, 4),
        "relevant_or_adjacent": round((counts[2] + counts[1]) / total, 4),
    },
    "by_page": {
        str(page): {
            "2_relevant": counter[2],
            "1_adjacent": counter[1],
            "0_off_topic": counter[0],
        }
        for page, counter in sorted(by_page.items(), key=lambda item: int(item[0]))
    },
    "criteria": criteria,
    "review_file": "report/relevance_review.csv",
}
(report / "relevance_summary.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(json.dumps(summary, ensure_ascii=False, indent=2))
