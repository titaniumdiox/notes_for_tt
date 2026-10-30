---
name: sinofieldnotes-video
description: Produce a 55–60s vertical Chinese-learning episode for Sinofieldnotes — topic selection, 5-word vocabulary, tone/palette, Momo scene redraw, Volcengine voice, Frametell build, QA, and archive. No BGM, no sound effects.
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

## Pipeline

### 1. Topic

Read `references/01-topic.md`.

- Propose 3 topics; score 0–13.
- Pick only ≥10 and only if it can fit one scene / 5 words / 1 sentence.
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

- Render with `--fps 30 --skip-subs --workers 3`.
- Check frames at hook, each word, sentence, receipt.
- Check pinyin, tone marks, answer blank, brand, watermark, stamp.
- Export MP4; copy into the episode `out/`.

### 7. Archive

- Canonical episode: `production/episodes/NN-slug/`.
- Old experiments: `production/archive/`.
- Keep: script, voice.js, pages, audio, scene images, cover, final MP4, README, jobs CSV.
- Add one `README.md` with status, links, known gaps, and exact commands.

## Acceptance

- [ ] 55–60s, 1080×1920, 30fps
- [ ] 5 words + 1 sentence, all words in the sentence
- [ ] No BGM/SFX
- [ ] No generated text in images
- [ ] Momo consistent across pages
- [ ] Momo pose changes page to page; no repeated chin-tap/standing sticker
- [ ] p01 has a scene-specific intro Momo, not a generic sticker
- [ ] Pinyin correct; polyphonic words verified
- [ ] First answer full; later answers short
- [ ] Reward stamp appears after 1.1s pause, outside the glass card
- [ ] Top/bottom brand and watermark on every page
- [ ] Cover + final MP4 + README archived

## Canonical example

`production/episodes/04-milk-tea-order/`

- Final: `out/milk-tea-v3-scenes-demo.mp4`
- Cover: `out/cover.png`
- Scenes: `assets/mascot/scenes/`
- Build: `extras/word.js`, `pages-portrait/`
- Jobs: `volc-jobs.csv`

Do not copy its content blindly; copy its **structure and gates**.
