# 04 · Voice (Volcengine TTS)

## Credentials

Use `.env.local`; never commit or print keys.

```text
VOLC_TTS_API_KEY=...
VOLC_TTS_RESOURCE_ID=seed-tts-2.0
VOLC_TTS_VOICE_ID=zh_female_meilinvyou_uranus_bigtts
VOLC_TTS_ENDPOINT=https://openspeech.bytedance.com/api/v3/tts/unidirectional
```

The endpoint returns **newline-delimited JSON**, not standard SSE. The adapter handles both.

## Jobs table

Use `templates/tts-jobs.csv`.

Columns:

- `job_id`
- `page`
- `cue`
- `kind` (word / question / answer / reward / final)
- `text`
- `out`
- `speed`
- `pitch`
- `volume`
- `voice`

## Speed

| Kind | speed |
|---|---|
| word | 0.95 |
| question | 0.92 |
| short answer | 0.92 |
| full sentence | 0.92 |
| reward | 1.08 |
| sport / competition reward | 1.10–1.12 |

Rewards are separate jobs. Do not use a natural-language “tone prompt” as a TTS parameter; use speed/pitch/voice and punctuation.

## Polyphonic words

Always test alone first.

Good test cases:

- 少冰 (shǎo bīng, not shào)
- 行 (xíng / háng)
- 长 (cháng / zhǎng)
- 还 (hái / huán)

If wrong:

1. Try a different context with the same voice.
2. Splice “少。冰。” at the silence.
3. Record one human line.
4. Do not switch the entire episode to another voice for one word.

## Post-process

- Convert MP3 → 24k mono WAV.
- Trim only leading/trailing silence; **never** trim internal pauses.
- Write durations into `voice.js`.
- Keep the English intro from ElevenLabs Bella if using the bilingual hook.

## Reward phrase bank

`production/assets/rewards/rewards.csv` has 36 phrases by category:

- calm / warm / food / sports / travel / final / cute

Use IDs, not free text. Keep a 1.1s pause before the reward.
