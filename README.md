# Sinofieldnotes

Short vertical Chinese-learning videos for an overseas audience: **one scene, 5 words, 1 full sentence, 60 seconds**. Illustration/light animation, Chinese voice, English hook. **No BGM, no sound effects.**

## Watch

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
- Episode 04: demo complete
- Format: 5 words + 1 sentence, 60s, 9:16, no BGM/SFX
- Known gaps: paper wipe not implemented; p02 has no straw; p04/p06/p08 use counter half-body while p03/p05/p07 are full-body
- Next: run the skill on episode 05; keep episode 04 frozen as the reference build

## Reproduce

See [production/README.md](production/README.md) and [the skill](skills/sinofieldnotes-video/SKILL.md).  
Final render uses Frametell portrait, `--fps 30 --skip-subs --workers 3`.

## Research archive

The `poc/` folder holds the earlier TikTok discovery work: keyword runs, deduped content pool, and content strategy. It is kept for reference, not as the current production direction.
