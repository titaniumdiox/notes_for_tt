---
name: sinofieldnotes-video
description: Produce a 60–61s regular vertical Chinese-learning episode for Sinofieldnotes — topic selection, 5-word vocabulary, tone/palette, Momo scene redraw, Volcengine voice, Frametell build, QA, and archive. No BGM, no sound effects. Reading-series episodes use a separate 68s spec.
---

# Sinofieldnotes Video

One episode = **one scene, one transaction/dialogue, 5 words, 1 full sentence, 60 seconds**.

## Hard rules

1. **No BGM. No sound effects.** Voice + silence only. Reward is visual.
2. Vertical **1080×1920, 30fps, 60–61s**; first word scene starts by **4s**.
3. Exactly **5 words + 1 sentence**; the sentence must use all 5 words.
4. One scene, one situation; do not cut across unrelated locations.
5. Chinese text, pinyin, and English are **always code overlays** — never generated inside an AI image.
6. One character (Momo) across scenes; use the character sheet as image reference for every generation, but **change Momo's pose and action on every page** — no repeated chin-tap, standing sticker, or identical pose.
7. First answer may be a full sentence; later answers stay short. Do not force every answer into a full sentence.
8. Reward beat needs a **1.1s pause** after the answer; reward appears as a separate pop-out stamp, not inside the answer card.
9. Every page has top/bottom `SINOFIELDNOTES` branding and a small watermark.
10. Archive all versions; never delete a rejected variant without moving it to an archive folder.
11. **Intro Momo is scene-specific**: p01 gets one Momo pose that reacts to this episode's situation (thinking, checking a map, holding a ticket, etc.), not a generic mascot sticker.
12. **Render in place**: use `scripts/setup_render.ps1` and render inside `production/episodes/NN-slug/`. Never ship from a stale mirrored runtime copy.
13. **Cover is a separate design**: title + full-body Momo + scene + number/name badge. Never use a video frame or the intro page as the cover.
14. **QA cheaply but fully**: render once, inspect one contact sheet, then open only failing frames at full resolution.

## Regular episode standard（EP.04 / 05 / 06 / 08）

This is the standard for **non-Reading** episodes. Reading 01 uses 68s and its own poem layout; do not mix the two.

### Format

| Item | Standard |
|---|---|
| Duration | **60.2–60.5s** |
| Frame | 1080×1920, 30fps |
| Pages | **8** |
| Vocabulary | **5 words + 1 full sentence** |
| Sentence | must use all 5 words |
| Audio | **24 cues** |
| BGM / SFX | **none** |
| Character | one Momo; new action on every page |

### 8-page beat sheet

| Page | Role |
|---|---|
| p01 | Hook: scene-specific Momo + title + English hook |
| p02–p06 | One word per page, in story order |
| p07 | Full sentence + pinyin + English |
| p08 | `5 / 5`, receipt, `LEARNED`, pause-to-read |

### Word page（p02–p06）

- Header: `THEME · n/5` + five progress dots.
- Big Hanzi, pinyin, English meaning.
- Question bubble: **Chinese + pinyin + English**.
- Answer card: **Chinese + pinyin + English**.
- English under pinyin is **the same size as that pinyin**:
  - question pinyin / English: 24px
  - answer pinyin / English: 34px
- Reward stamp sits **above or outside** the answer card; never cover the English.
- Four audio cues: word → question → answer → reward.
- Answer may be short; only p07 must be a full sentence.

`EP.04/05/06` were archived before the bilingual question/answer layer. Use them for structure, but **new episodes follow EP.08's bilingual word-page standard**.

### p07 / p08

- p07: one glass card; sentence split into 3 short lines; pinyin 3 lines; English 3 lines; green check; `You can … now.`
- p08: receipt card with 5 rows; each row Hanzi + pinyin + English + example; full sentence; `5 words · 1 sentence`; `You can … now.`; `LEARNED`; `PAUSE TO READ / 截图保存`.
- Never end on a poetic tagline. Closing is always a capability sentence: `You can talk about rainy days now.`

### Cover

Regular cover is not a video frame and not the Reading cover:

```text
5 个词，60 秒
[scene subtitle]
MOMO / [episode action]
```

- Number badge: `08 RAIN`, `06 HOTPOT`, etc.
- Full-body Momo + scene.
- No `A little rain, a little adventure.`-style tagline.
- No `READING 01` typography unless it is actually a Reading episode.

### Audio

- p01: 1 English cue (Bella).
- p02–p06: 4 cues each (Chinese word, Chinese question, Chinese answer, Chinese reward).
- p07: 1 Chinese full-sentence cue.
- p08: 2 Chinese cues.
- Total 24; typical 33–36s of voice.
- Chinese: Volcengine `zh_female_meilinvyou_uranus_bigtts`.
- English: ElevenLabs Bella.
- No BGM, no rain/wind/cup SFX. Atmosphere comes from image only.

### QA

- Duration 60.2–60.5s.
- `check_voice_assets.py` must pass.
- p01 word scene starts by ~4.5s.
- English under pinyin is legible at full resolution and does not collide with reward stamps.
- p07/p08 text must not overlap; check full-res if the contact sheet looks dense.
- Cover: `5 个词，60 秒` visible, full-body Momo, badge, bottom `MOMO / …`.

## Cost control

Read `references/07-efficiency.md` before production. The expensive part is repeated full-res image review and re-rendering. Batch scene/audio work, render in place, and use `scripts/qa_contact_sheet.py` + `scripts/check_voice_assets.py`.

## Pipeline

### 1. Topic

Read `references/01-topic.md`.

- Propose 3 topics; score 0–15 (5 dimensions × 0–3).
- Pick only ≥12 and only if it can fit one scene / 5 words / 1 sentence.
- Write a one-line promise: “After this video, the learner can ___ in Chinese.”

Gate: topic promise is concrete and sayable in 60 seconds.

### 2. Vocabulary and script

Read `references/02-vocab-script.md`.

- Choose 5 high-frequency words; max 1 polyphonic word.
- Choose 1 sentence that uses all 5.
- Fill `templates/words.csv`.
- Write the 8-page beat sheet: hook → 5 words → sentence → receipt.

Gate: every word appears in the sentence; no abstract/filler words.

### 3. Tone and visual system

Read `references/03-tone-visual.md`.

- Pick a palette by scene temperature.
- Generate Momo scene references from `production/assets/mascot/reference/momo-character-sheet-v1.png`.
- One scene image per page, 1440×2560, no text, right/top space reserved for UI.
- **p01 intro Momo**: generate one pose specific to this scene; put it in the lower warm-cream area under the title. It should look like Momo is also wondering about the episode question. No thought bubble by default.
- **Pose variation**: every page needs a different Momo action tied to that word (pour, hold, point, taste, pack, carry, look). Do not reuse the intro pose or the same standing pose across pages.
- **Batch generation**: generate 3–5 scenes per command. Inspect one contact sheet; open full-res only for failures.
- Reject any image with generated text; either mask it or regenerate.

Gate: 3 style frames (hook, word page, receipt) before producing all pages.

### 4. Voice

Read `references/04-voice.md`.

- Build `templates/tts-jobs.csv`.
- Use Volcengine TTS with the approved voice.
- Test `少冰` or any polyphonic word alone first.
- Reward rows get separate speed/pitch, not a natural-language prompt.

Gate: native-speaker check on polyphonic words; no wrong tone shipped.

### 5. Build

Read `references/05-build.md`.

- Use Frametell `study`, portrait.
- Copy the canonical `extras/word.js` and `pages-portrait/` patterns from `production/episodes/04-milk-tea-order/`.
- Use canvas for anything that must sit above `P.img` (bubbles, dots, eraser block, stamps).
- Use an HTML glass div for the answer card.

Gate: one word page composited and reviewed before applying to all pages.

### 6. Render and QA

Read `references/06-qa-archive.md`.

- Run `scripts/setup_render.ps1 -Episode <episode>` once, then render from the episode folder with `--fps 30 --skip-subs --workers 3`.
- Run `scripts/check_voice_assets.py --episode <episode>` before rendering.
- Render once; make `scripts/qa_contact_sheet.py` from the MP4.
- Read the contact sheet, then open only failing frames at full resolution.
- Check pinyin, tone marks, answer blank, brand, watermark, stamp.
- Export MP4 into the episode `out/`.

### 7. Archive

- Canonical episode: `production/episodes/NN-slug/`.
- Old experiments: `production/archive/`.
- Keep: script, voice.js, pages, audio, scene images, cover, final MP4, README, jobs CSV.
- Add one `README.md` with status, links, known gaps, and exact commands.

## Acceptance

- [ ] 60–61s regular, 1080×1920, 30fps
- [ ] 5 words + 1 sentence, all words in the sentence
- [ ] 8 pages, 24 cues
- [ ] No BGM/SFX
- [ ] No generated text in images
- [ ] Momo consistent across pages
- [ ] Momo pose changes page to page; no repeated chin-tap/standing sticker
- [ ] p01 has a scene-specific intro Momo, not a generic sticker
- [ ] Pinyin correct; polyphonic words verified
- [ ] Question and answer both have Chinese + pinyin + English
- [ ] English under pinyin is the same size as the pinyin
- [ ] First answer full; later answers short
- [ ] Reward stamp appears after 1.1s pause, outside the glass card
- [ ] Top/bottom brand and watermark on every page
- [ ] Audio files match `voice.js` durations
- [ ] Cover is designed, not an intro frame
- [ ] Contact sheet reviewed; only failures opened full-res
- [ ] Cover + final MP4 + README archived

## Canonical examples

Use **EP.08** for the current regular-episode standard, including the bilingual question/answer layer:

`production/episodes/08-rainy-day/`

- Final: `out/rainy-day-v1.mp4`
- Cover: `out/cover.png`
- Build: `extras/word.js`, `pages-portrait/`
- Jobs: `volc-jobs.csv`

Use **EP.04** only as the frozen structural reference:

`production/episodes/04-milk-tea-order/`

- Final: `out/milk-tea-v3-scenes-demo.mp4`
- Build: `extras/word.js`, `pages-portrait/`

Do not copy content blindly; copy **structure and gates**. EP.05/06 are pre-bilingual archives; do not copy their missing English rows into new work.
