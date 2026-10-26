#!/usr/bin/env python3
"""Compare two normalized discovery runs by video and creator overlap."""

from __future__ import annotations

import json
import sys
from pathlib import Path


def load(run: Path) -> list[dict]:
    with (run / "normalized" / "videos.jsonl").open(encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]


def main() -> int:
    if len(sys.argv) < 3:
        raise SystemExit("usage: compare_runs.py RUN_A RUN_B")
    run_a, run_b = Path(sys.argv[1]), Path(sys.argv[2])
    a, b = load(run_a), load(run_b)
    ids_a = {record["video_id"] for record in a}
    ids_b = {record["video_id"] for record in b}
    creators_a = {record["creator_id"] for record in a if record.get("creator_id")}
    creators_b = {record["creator_id"] for record in b if record.get("creator_id")}
    first_a = {record["video_id"] for record in a if record["page"] == 1}
    first_b = {record["video_id"] for record in b if record["page"] == 1}

    def ratio(part: int, whole: int) -> float | None:
        return round(part / whole, 4) if whole else None

    result = {
        "run_a": str(run_a),
        "run_b": str(run_b),
        "videos": {
            "a": len(ids_a),
            "b": len(ids_b),
            "intersection": len(ids_a & ids_b),
            "only_a": len(ids_a - ids_b),
            "only_b": len(ids_b - ids_a),
            "jaccard": ratio(len(ids_a & ids_b), len(ids_a | ids_b)),
            "overlap_vs_a": ratio(len(ids_a & ids_b), len(ids_a)),
            "overlap_vs_b": ratio(len(ids_a & ids_b), len(ids_b)),
        },
        "page_1": {
            "a": len(first_a),
            "b": len(first_b),
            "intersection": len(first_a & first_b),
            "jaccard": ratio(len(first_a & first_b), len(first_a | first_b)),
        },
        "creators": {
            "a": len(creators_a),
            "b": len(creators_b),
            "intersection": len(creators_a & creators_b),
            "jaccard": ratio(len(creators_a & creators_b), len(creators_a | creators_b)),
        },
        "manifest": {
            "a": json.loads((run_a / "manifest.json").read_text(encoding="utf-8")),
            "b": json.loads((run_b / "manifest.json").read_text(encoding="utf-8")),
        },
    }
    # Trim manifests to the fields that matter for comparison.
    for key in ("a", "b"):
        manifest = result["manifest"][key]
        result["manifest"][key] = {
            "successful_pages": manifest.get("successful_pages"),
            "stop_reason": manifest.get("stop_reason"),
            "pages": [
                {
                    "page": page.get("page"),
                    "http_status": page.get("http_status"),
                    "app_status": page.get("app_status"),
                    "rows": page.get("rows"),
                    "cursor_out": page.get("cursor_out"),
                    "has_more": page.get("has_more"),
                    "outcome": page.get("outcome"),
                }
                for page in manifest.get("pages", [])
            ],
        }

    out = run_b / "report" / "comparison.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
