# Sinofieldnotes

Short vertical Chinese-learning videos for an overseas audience: **one scene, 5 words, 1 full sentence, 60 seconds**. Illustration/light animation, Chinese voice, English hook. **No BGM, no sound effects.**

## Watch

- [07 · Momo's Afternoon Reading 01 · 静夜思](production/episodes/07-momo-reading-01/out/momo-reading-01-v1.mp4) — 68.0s, 1080×1920
- [06 · Momo Wants Hotpot Today!](production/episodes/06-hotpot/out/hotpot-v1.mp4) — 60.4s, 1080×1920
- [05 · Breakfast in China](production/episodes/05-breakfast/out/breakfast-v1.mp4) — 60.5s, 1080×1920
- [04 · Milk Tea Order — full scene cut](production/episodes/04-milk-tea-order/out/milk-tea-v3-scenes-demo.mp4) — 60.3s, 1080×1920
- [Cover](production/assets/mascot/cover.png)
- [Episode notes](production/episodes/04-milk-tea-order/README.md)
- [Scene bank](production/assets/mascot/scenes/README.md)

## Production skill

The reusable workflow lives at [skills/sinofieldnotes-video/SKILL.md](skills/sinofieldnotes-video/SKILL.md):

1. topic selection
2. 5-word vocabulary + 1 sentence
3. tone/palette
4. Momo scene redraw
5. Volcengine voice
6. Frametell build
7. QA + archive

## Structure

| Path | Contents |
|---|---|
| `production/episodes/04-milk-tea-order/` | current demo: script, pages, audio, scenes, cover, final MP4 |
| `production/episodes/01-us-vs-china/` | legacy episode script |
| `production/episodes/02-lunch-nap/` | legacy episode script |
| `production/episodes/03-marriage-pressure/` | legacy episode script |
| `production/archive/` | v2 demo, first animatic, Frametell test |
| `production/assets/mascot/` | Momo character bible, reference sheet, scene bank, cover |
| `production/assets/rewards/` | 36 reward phrases by category |
| `production/tts/` | Volcengine TTS adapter and jobs |
| `skills/sinofieldnotes-video/` | full video-production skill |
| `poc/` | earlier discovery/research archive; not the current format |

## Status

- Channel renamed: **Sinofieldnotes**
- Episode 04: **v1.0 demo frozen** (`v1.0-demo` tag)
- Episode 05: **Breakfast in China — complete** (60.5s)
- Episode 06: **Momo Wants Hotpot Today! — complete** (60.4s)
- Episode 07: **Momo's Afternoon Reading 01 · 静夜思 — complete** (82.0s)
- Format: 5 words + 1 sentence, 60s regular / 82s Reading, 9:16, no BGM/SFX
- Known gaps: paper wipe not implemented; EP.05 p02 answer card covers the table edge; EP.07 p06 poem card covers Momo's head
- Next: run the skill on episode 08

## Reproduce

See [production/README.md](production/README.md) and [the skill](skills/sinofieldnotes-video/SKILL.md).  
Final render uses Frametell portrait, `--fps 30 --skip-subs --workers 3`.

## Research archive

The `poc/` folder holds the earlier TikTok discovery work: keyword runs, deduped content pool, and content strategy. It is kept for reference, not as the current production direction.
