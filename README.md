# Sinofieldnotes

Chinese culture, daily life, travel, and cross-cultural observations for an overseas audience. The working format is short vertical video (9:16), with 2D illustration/light animation, English voiceover, and one lightweight Chinese keyword per episode.

## Status

_Last updated: 2026-10-26_

- Discovery PoC: **validated** across 8 keyword runs (plus one repeat run).
- Deduped content pool: **1,248 unique videos / 930 creators**.
- Production: **3 episode scripts, shotlists, scratch voiceovers, and scratch SRTs**.
- Next: 01 animatic, final voice, then 3 sample videos.

## What is in this repo

| Path | Contents |
| --- | --- |
| `poc/discovery-01/` | `Chinese daily life` baseline: raw pages, manifest, normalized JSONL, metrics, relevance review |
| `poc/discovery-01-repeat/` | Same keyword repeat; overlap comparison |
| `poc/discovery-02-living-in-china/` | `living in China` run |
| `poc/culture-differences-01/` | `China culture shock` run + repeat comparison |
| `poc/culture-differences-02/` | `cultural differences China` run (leans traditional culture) |
| `poc/discovery-03-chinese-street-food/` | `Chinese street food` run |
| `poc/discovery-04-chinese-family-life/` | `Chinese family life` run |
| `poc/discovery-05-china-travel/` | `China travel` run |
| `poc/content-pool/` | Deduped 1,248-video pool with heuristic pillars and candidates |
| `poc/content-strategy.md` | 8 content pillars, keyword matrix, format rules |
| `poc/topic-shortlist.md` | 12 candidate topics; first 3 selected for production |
| `production/` | 3 episode packages, scratch audio/SRT, TTS and assembly pipeline |
| `poc/discovery-01/scripts/` | Collector, normalizer, relevance sampling, run comparison |

## Key findings

1. **The search endpoint works through a local signed-out TikTok API + proxy.**  
   Direct `www.tiktok.com` access is blocked on this network. `undici` + Clash proxy reached `/tiktok/search/general` successfully. `node-tls-client` was not used for search.

2. **HTTP 200 + `status_code: 203` is not automatically a failure.**  
   Pages with 203 still returned usable data. But 203 can appear on any page and may signal a degraded/soft-blocked upstream, so gate on `data` count, pagination, and relevance, not the status alone.

3. **`count` is not exact; `cursor` is authoritative.**  
   A request for 50 items returned 49–105. The next `offset` must use the response `cursor` (which advances by the requested count), not `len(data)`.

4. **Filter non-video rows.**  
   Some pages include `type: 4` user cards without an `item`; the normalizer skips them.

5. **Keyword pools are finite.**  
   Each keyword exhausted after 172–255 unique videos. The “5 pages × 50” target was not reached because `has_more` became 0, not because requests failed.

6. **Repeat stability is moderate-to-good.**  
   `Chinese daily life` repeat: 81.7% video overlap. `China culture shock` repeat after ~1 hour: 87.1% overlap, identical page/status structure.

7. **Culture difference is a lens, not the whole account.**  
   Keep daily life, travel, food, language, family, work/consumption, and rural/nature pillars. Culture-difference framing can be applied across all of them.

## Reproduce discovery

### Prerequisites

- Node.js 22+ and pnpm
- Python 3
- Docker (optional)
- A working proxy/egress route to TikTok (this repo was run with Clash at `127.0.0.1:7890`)

Upstream service used: [`sangzun-han/Tiktok-Api`](https://github.com/sangzun-han/Tiktok-Api), commit `d438d72fa903aa0ecb6f104fa9b915928134fe0a` (2026-10-15). It is not vendored here to keep the repo readable.

```powershell
git clone https://github.com/sangzun-han/Tiktok-Api.git vendor/Tiktok-Api
cd vendor/Tiktok-Api
pnpm install --frozen-lockfile
pnpm run build

$env:NODE_PATH = (Resolve-Path 'node_modules\.pnpm\node_modules').Path
$env:TIKTOK_TRANSPORT = 'undici'
$env:TIKTOK_PROXY_URL = 'http://127.0.0.1:7890'
$env:TIKTOK_MAX_RETRIES = '0'
$env:TIKTOK_MIN_REQUEST_INTERVAL_MS = '1500'
node dist/main.js
```

On Windows, `pnpm run setup` calls `python3`, which may resolve to the Microsoft Store stub. If you need the `curl_cffi` TLS bridge, install it manually into a Python environment and set `TIKTOK_PYTHON`.

Health check:

```powershell
curl.exe --noproxy "*" http://127.0.0.1:3000/internal/health
```

Collect:

```powershell
python poc\discovery-01\scripts\collect.py `
  --out poc\discovery-01-new `
  --pages 5 --count 50 --keyword "Chinese daily life"
```

Normalize:

```powershell
python poc\discovery-01\scripts\normalize.py poc\discovery-01-new
```

## Production

See [production/README.md](production/README.md) and [production/pipeline.md](production/pipeline.md).

- 01: [3 Things Normal in the US, Surprising in China](production/episodes/01-us-vs-china/script.md) — 50.75s scratch
- 02: [Why Chinese Offices Go Quiet After Lunch](production/episodes/02-lunch-nap/script.md) — 56.17s scratch
- 03: [29, Unmarried, and Home for the Holidays](production/episodes/03-marriage-pressure/script.md) — 59.92s scratch

Scratch voiceovers use Windows SAPI/Zira and are **not publishable**; they exist only for timing and animatic. Final voice and subtitles must be redone from the final track.

## Data and compliance

- Raw search responses are stored under each run's `raw/` directory for auditability.
- Only public video/profile metadata is stored; no private account data or comments are collected.
- Request pacing was kept at ~1.5s minimum interval; no attempt was made to bypass access controls.
- This is a research/PoC repository. TikTok's terms and applicable law still apply; do not use it for spam or large-scale personal-data collection.
- Third-party TikTok content/metadata remains subject to TikTok's terms. Code license: TBD; upstream Tiktok-Api is MIT.

## Known limitations

- Single machine, single egress IP, one proxy.
- No comment analysis, no DTK integration, no video-generation pipeline yet.
- No cross-day stability test.
- `ffmpeg` is not installed in the current environment; final assembly needs it.
- Heuristic pillar tags in `poc/content-pool` are noisy; use them for navigation, not editorial truth.
