#!/usr/bin/env python3
"""Normalize collected TikTok search pages into videos/creators JSONL + metrics."""

from __future__ import annotations

import json
import sys
import urllib.parse
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


def as_int(value) -> int | None:
    if value is None or value == "":
        return None
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def first_int(*values) -> int | None:
    for value in values:
        parsed = as_int(value)
        if parsed is not None:
            return parsed
    return None


def missing(value) -> bool:
    return value is None or value == "" or value == []


def main() -> int:
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "poc/discovery-01")
    manifest = json.loads((out / "manifest.json").read_text(encoding="utf-8"))
    videos: list[dict] = []
    seen: dict[str, dict] = {}
    duplicate_events: list[dict] = []
    non_video_rows: list[dict] = []
    missing_ids: list[dict] = []
    total_video_rows = 0

    for page in manifest["pages"]:
        raw_path = out / page["saved_as"]
        payload = json.loads(raw_path.read_text(encoding="utf-8"))
        rows = payload.get("data") or []
        for rank, row in enumerate(rows, start=1):
            item = row.get("item") if isinstance(row, dict) else None
            if not isinstance(item, dict):
                non_video_rows.append(
                    {"page": page["page"], "rank": rank, "type": row.get("type") if isinstance(row, dict) else None}
                )
                continue
            video_id = str(item.get("id") or "").strip()
            if not video_id:
                missing_ids.append({"page": page["page"], "rank": rank})
                continue
            total_video_rows += 1
            if video_id in seen:
                duplicate_events.append(
                    {
                        "video_id": video_id,
                        "first_page": seen[video_id]["page"],
                        "first_rank": seen[video_id]["rank"],
                        "duplicate_page": page["page"],
                        "duplicate_rank": rank,
                    }
                )
                continue

            author = item.get("author") or {}
            stats = item.get("stats") or {}
            stats_v2 = item.get("statsV2") or {}
            author_stats = item.get("authorStats") or {}
            author_stats_v2 = item.get("authorStatsV2") or {}
            video = item.get("video") or {}
            music = item.get("music") or {}
            challenges = item.get("challenges") or []
            hashtags = []
            for challenge in challenges:
                title = (challenge or {}).get("title")
                if isinstance(title, str) and title.strip() and title.strip() not in hashtags:
                    hashtags.append(title.strip())

            username = author.get("uniqueId") or None
            video_url = (
                f"https://www.tiktok.com/@{urllib.parse.quote(username, safe='')}/video/{video_id}"
                if username
                else f"https://www.tiktok.com/video/{video_id}"
            )
            create_time = as_int(item.get("createTime"))
            create_time_iso = (
                datetime.fromtimestamp(create_time, tz=timezone.utc).isoformat(timespec="seconds")
                if create_time is not None
                else None
            )

            record = {
                "platform": "tiktok",
                "source": "tiktok_search_general",
                "search_keyword": manifest["keyword"],
                "page": page["page"],
                "rank": rank,
                "video_id": video_id,
                "video_url": video_url,
                "desc": item.get("desc") or "",
                "create_time": create_time,
                "create_time_iso": create_time_iso,
                "creator_id": str(author["id"]) if author.get("id") is not None else None,
                "sec_uid": author.get("secUid") or None,
                "username": username,
                "nickname": author.get("nickname") or None,
                "verified": bool(author.get("verified")) if author.get("verified") is not None else None,
                "signature": author.get("signature") or "",
                "follower_count": first_int(author_stats.get("followerCount"), author_stats_v2.get("followerCount")),
                "following_count": first_int(author_stats.get("followingCount"), author_stats_v2.get("followingCount")),
                "creator_heart_count": first_int(author_stats.get("heartCount"), author_stats_v2.get("heartCount")),
                "creator_video_count": first_int(author_stats.get("videoCount"), author_stats_v2.get("videoCount")),
                "play_count": first_int(stats.get("playCount"), stats_v2.get("playCount")),
                "digg_count": first_int(stats.get("diggCount"), stats_v2.get("diggCount")),
                "comment_count": first_int(stats.get("commentCount"), stats_v2.get("commentCount")),
                "share_count": first_int(stats.get("shareCount"), stats_v2.get("shareCount")),
                "collect_count": first_int(stats.get("collectCount"), stats_v2.get("collectCount")),
                "hashtags": hashtags,
                "music_id": str(music["id"]) if music.get("id") is not None else None,
                "duration_seconds": as_int(video.get("duration")),
                "width": as_int(video.get("width")),
                "height": as_int(video.get("height")),
                "media_type": "image" if item.get("imagePost") else "video",
                "is_ad": bool(item.get("isAd")) if item.get("isAd") is not None else None,
                "text_language": item.get("textLanguage") or None,
                "collected_at": page.get("fetched_at"),
                "raw_file": page["saved_as"],
            }
            videos.append(record)
            seen[video_id] = record

    normalized_dir = out / "normalized"
    normalized_dir.mkdir(parents=True, exist_ok=True)
    with (normalized_dir / "videos.jsonl").open("w", encoding="utf-8", newline="\n") as handle:
        for record in videos:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")

    creators: dict[str, dict] = {}
    for record in videos:
        key = record["creator_id"] or record["sec_uid"] or record["username"]
        if not key:
            continue
        creator = creators.get(key)
        if creator is None:
            creator = {
                "creator_id": record["creator_id"],
                "sec_uid": record["sec_uid"],
                "username": record["username"],
                "nickname": record["nickname"],
                "verified": record["verified"],
                "signature": record["signature"],
                "follower_count": record["follower_count"],
                "following_count": record["following_count"],
                "creator_heart_count": record["creator_heart_count"],
                "creator_video_count": record["creator_video_count"],
                "first_seen_page": record["page"],
                "videos_in_sample": 0,
            }
            creators[key] = creator
        creator["videos_in_sample"] += 1

    with (normalized_dir / "creators.jsonl").open("w", encoding="utf-8", newline="\n") as handle:
        for creator in sorted(creators.values(), key=lambda c: (-c["videos_in_sample"], c["username"] or "")):
            handle.write(json.dumps(creator, ensure_ascii=False) + "\n")

    field_names = [
        "video_id",
        "video_url",
        "desc",
        "create_time",
        "creator_id",
        "sec_uid",
        "username",
        "nickname",
        "play_count",
        "digg_count",
        "comment_count",
        "share_count",
        "collect_count",
        "hashtags",
        "music_id",
        "duration_seconds",
        "follower_count",
    ]
    field_missing = {
        field: {
            "missing": sum(1 for record in videos if missing(record.get(field))),
            "rate": round(
                sum(1 for record in videos if missing(record.get(field))) / len(videos), 4
            )
            if videos
            else None,
        }
        for field in field_names
    }

    http_counts = Counter(str(page.get("http_status")) for page in manifest["pages"])
    app_counts = Counter(str(page.get("app_status")) for page in manifest["pages"])
    pagination = [
        {
            "page": page["page"],
            "offset_in": page["request"]["offset"],
            "cursor_out": page.get("cursor_out"),
            "has_more": page.get("has_more"),
            "impr_id": page.get("impr_id"),
            "outcome": page.get("outcome"),
        }
        for page in manifest["pages"]
    ]
    create_times = [record["create_time"] for record in videos if record["create_time"] is not None]
    top_creators = Counter(record["username"] or record["nickname"] or "unknown" for record in videos).most_common(10)
    hashtag_counts = Counter(tag for record in videos for tag in record["hashtags"]).most_common(20)

    metrics = {
        "poc": manifest.get("poc"),
        "platform": manifest.get("platform"),
        "endpoint": manifest.get("endpoint"),
        "keyword": manifest.get("keyword"),
        "requested_pages": manifest.get("requested_pages"),
        "requested_count": manifest.get("requested_count"),
        "pages_attempted": len(manifest["pages"]),
        "successful_pages": manifest.get("successful_pages"),
        "stop_reason": manifest.get("stop_reason"),
        "raw_rows": sum(page.get("rows", 0) for page in manifest["pages"]),
        "total_video_rows": total_video_rows,
        "non_video_rows": len(non_video_rows),
        "non_video_row_details": non_video_rows,
        "missing_video_id_rows": len(missing_ids),
        "unique_videos": len(videos),
        "duplicate_rows": len(duplicate_events),
        "duplicate_rate": round(len(duplicate_events) / total_video_rows, 4) if total_video_rows else None,
        "duplicate_events": duplicate_events[:20],
        "unique_creators": len(creators),
        "ads": sum(1 for record in videos if record["is_ad"]),
        "image_posts": sum(1 for record in videos if record["media_type"] == "image"),
        "http_status_counts": dict(http_counts),
        "app_status_counts": dict(app_counts),
        "pagination": pagination,
        "pagination_advanced": all(
            int(page["cursor_out"]) > int(page["offset_in"])
            for page in pagination
            if page.get("cursor_out") is not None
        ),
        "request_failures": [
            {"page": page["page"], "outcome": page.get("outcome"), "error": page.get("error")}
            for page in manifest["pages"]
            if page.get("outcome") not in ("success", "success_203")
        ],
        "field_missing": field_missing,
        "create_time_range": {
            "min": min(create_times) if create_times else None,
            "max": max(create_times) if create_times else None,
            "min_iso": datetime.fromtimestamp(min(create_times), tz=timezone.utc).isoformat(timespec="seconds")
            if create_times
            else None,
            "max_iso": datetime.fromtimestamp(max(create_times), tz=timezone.utc).isoformat(timespec="seconds")
            if create_times
            else None,
        },
        "top_creators_by_videos": [{"creator": name, "videos": count} for name, count in top_creators],
        "top_hashtags": [{"hashtag": tag, "videos": count} for tag, count in hashtag_counts],
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    report_dir = out / "report"
    report_dir.mkdir(parents=True, exist_ok=True)
    (report_dir / "metrics.json").write_text(
        json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"videos: {len(videos)} unique / {total_video_rows} rows")
    print(f"creators: {len(creators)}")
    print(f"duplicates: {len(duplicate_events)} (rate={metrics['duplicate_rate']})")
    print(f"non-video rows: {len(non_video_rows)}; missing ids: {len(missing_ids)}")
    print(f"metrics: {report_dir / 'metrics.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
