# ElevenLabs TTS — Episode 01 v3

## Key

- `.env.local` at the repo root contains `ELEVENLABS_API_KEY` (last 4: **bdd7**).
- The file is gitignored; never commit it, print it, or paste the key into code/chat.
- The SDK reads `ELEVENLABS_API_KEY` from the environment.

## Free-plan caveat

The account is on the free plan. Some library voices return HTTP 402:

- ❌ Charlotte (`XB0fDUnXU5powFXDhCwa`)
- ❌ Rachel (`21m00Tcm4TlvDq8ikWAM`)
- ✅ Bella (`EXAVITQu4vr4xnSDxMaL`) — female, used for the v3 sample
- ✅ George (`JBFqnCBsd6RMkjVDRZzb`) — male, reference sample

To use Charlotte/Rachel, upgrade to Creator or add $5 of credits.

## Generated samples

| Voice | File | Duration | Notes |
| --- | --- | --- | --- |
| Bella (female) | `episodes/01-us-vs-china/tts/bella.mp3` | **48.20s** | Recommended for v3 |
| George (male) | `episodes/01-us-vs-china/tts/george.mp3` | **48.61s** | Reference / alternate |

Model: `eleven_multilingual_v2`；MP3 44.1kHz/128kbps；voice settings: stability 0.55, similarity 0.75.

These are internal review samples. Check ElevenLabs plan terms before publishing or using them commercially.

## Timed Bella version

The selected v3 track uses `convertWithTimestamps`, so subtitles come from actual character timings:

| File | Purpose |
| --- | --- |
| `bella_timed.mp3` | Bella audio, 49.46s |
| `bella_alignment.json` | character-level start/end times |
| `bella.srt` | 17 cues, generated from alignment |
| `bella.ass` | 1080×1920 burned-in subtitle style |

George remains an alternate voice; his `george.mp3` is not timestamped.

## Regenerate

From this folder:

```powershell
pnpm install
$env:NODE_PATH = (Resolve-Path 'node_modules/.pnpm/node_modules').Path
node --env-file=../../.env.local generate_vo.mjs `
  ../../episodes/01-us-vs-china/vo_v3.txt `
  ../../episodes/01-us-vs-china/tts `
  eleven_multilingual_v2
```

`NODE_PATH` works around pnpm's junction layout on this Windows machine; without it the SDK may fail to resolve `ws`.

## Next

1. Pick Bella or George.
2. Regenerate with **timestamps** (`convertWithTimestamps`) so subtitles use character/word-level timing, not the old scratch SRT.
3. Then rebuild the v3 animatic with the chosen track.
