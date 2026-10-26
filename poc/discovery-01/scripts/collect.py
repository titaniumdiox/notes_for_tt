#!/usr/bin/env python3
"""Collect TikTok keyword-search pages from the local Tiktok-Api service.

The collector saves every response byte-for-byte, records request/paging
metadata, and stops as soon as a page is not a usable success. It does not
normalize or interpret the data.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def fetch(url: str, timeout: float) -> tuple[int, bytes, float]:
    """GET a localhost URL without any system proxy."""
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    started = time.perf_counter()
    try:
        with opener.open(url, timeout=timeout) as response:
            body = response.read()
            return response.status, body, (time.perf_counter() - started) * 1000
    except urllib.error.HTTPError as exc:
        body = exc.read()
        return exc.code, body, (time.perf_counter() - started) * 1000


def app_status(payload: dict | None) -> int | None:
    if not isinstance(payload, dict):
        return None
    for key in ("status_code", "statusCode"):
        value = payload.get(key)
        if isinstance(value, (int, float)):
            return int(value)
        if isinstance(value, str) and value.strip().lstrip("-").isdigit():
            return int(value)
    return None


def safe_json(raw: bytes) -> dict | None:
    try:
        value = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None
    return value if isinstance(value, dict) else None


def classify(http_status: int, status: int | None, item_count: int) -> str:
    if http_status != 200:
        return "http_error"
    if status not in (0, 203):
        return "app_rejected"
    if item_count == 0:
        return "empty"
    return "success_203" if status == 203 else "success"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://127.0.0.1:3000")
    parser.add_argument("--keyword", default="Chinese daily life")
    parser.add_argument("--pages", type=int, default=5)
    parser.add_argument("--count", type=int, default=50)
    parser.add_argument("--out", default="poc/discovery-01")
    parser.add_argument("--timeout", type=float, default=90)
    parser.add_argument("--sleep", type=float, default=2.0)
    args = parser.parse_args()

    out = Path(args.out)
    raw_dir = out / "raw"
    report_dir = out / "report"
    raw_dir.mkdir(parents=True, exist_ok=True)
    report_dir.mkdir(parents=True, exist_ok=True)

    base = args.base_url.rstrip("/")
    started_at = utc_now()
    pages: list[dict] = []
    first_impr_id: str | None = None
    offset = "0"
    stop_reason = "pages_exhausted"

    health_path = report_dir / "health_before.json"
    try:
        status, body, elapsed = fetch(f"{base}/internal/health", args.timeout)
        health_path.write_bytes(body)
        health = safe_json(body) or {}
        print(f"health: HTTP {status} status={health.get('status')} in {elapsed:.0f} ms")
    except Exception as exc:  # health is diagnostic; collection can still proceed
        print(f"health: failed: {type(exc).__name__}: {exc}")

    for page_number in range(1, args.pages + 1):
        query = {
            "keyword": args.keyword,
            "count": str(args.count),
            "offset": offset,
        }
        if first_impr_id:
            query["searchId"] = first_impr_id
        url = f"{base}/tiktok/search/general?{urllib.parse.urlencode(query)}"

        print(f"page {page_number}: offset={offset} searchId={first_impr_id or '-'}")
        try:
            http_status, raw, elapsed = fetch(url, args.timeout)
        except Exception as exc:
            pages.append(
                {
                    "page": page_number,
                    "request": {"offset": offset, "searchId": first_impr_id},
                    "request_url": url,
                    "fetched_at": utc_now(),
                    "outcome": "transport_error",
                    "error": f"{type(exc).__name__}: {exc}",
                }
            )
            stop_reason = "transport_error"
            break

        raw_path = raw_dir / f"page_{page_number:03d}.json"
        raw_path.write_bytes(raw)
        payload = safe_json(raw)
        status = app_status(payload)
        rows = (payload or {}).get("data")
        item_count = len(rows) if isinstance(rows, list) else 0
        cursor_out = (payload or {}).get("cursor")
        has_more = (payload or {}).get("has_more")
        impr_id = ((payload or {}).get("log_pb") or {}).get("impr_id")
        outcome = classify(http_status, status, item_count)

        record = {
            "page": page_number,
            "request": {"offset": offset, "searchId": first_impr_id},
            "request_url": url,
            "fetched_at": utc_now(),
            "http_status": http_status,
            "elapsed_ms": round(elapsed),
            "bytes": len(raw),
            "sha256": hashlib.sha256(raw).hexdigest(),
            "saved_as": str(raw_path.relative_to(out)).replace("\\", "/"),
            "app_status": status,
            "rows": item_count,
            "cursor_out": cursor_out,
            "has_more": has_more,
            "impr_id": impr_id,
            "outcome": outcome,
        }
        pages.append(record)
        print(
            f"  HTTP {http_status} status={status} rows={item_count} "
            f"cursor={cursor_out} has_more={has_more} -> {outcome}"
        )

        if outcome not in ("success", "success_203"):
            stop_reason = outcome
            break
        if page_number == 1:
            first_impr_id = impr_id
            if not first_impr_id:
                stop_reason = "missing_impr_id"
                break
        if has_more in (0, False, "0"):
            stop_reason = "has_more_false"
            break
        if cursor_out is None or str(cursor_out) == str(offset):
            stop_reason = "cursor_did_not_advance"
            break
        offset = str(cursor_out)
        if page_number < args.pages:
            time.sleep(args.sleep)

    manifest = {
        "poc": "discovery-01",
        "platform": "tiktok",
        "endpoint": "/tiktok/search/general",
        "keyword": args.keyword,
        "requested_pages": args.pages,
        "requested_count": args.count,
        "started_at": started_at,
        "finished_at": utc_now(),
        "service": {"base_url": base},
        "pages": pages,
        "stop_reason": stop_reason,
        "successful_pages": sum(1 for p in pages if p.get("outcome") in ("success", "success_203")),
    }
    (out / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"manifest: {out / 'manifest.json'}")
    print(f"stop_reason: {stop_reason}")
    return 0 if manifest["successful_pages"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
