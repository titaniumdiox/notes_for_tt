# 05 · Build (Frametell, portrait)

## Project skeleton

```
episode/
  script.js
  voice.js
  pages-portrait/p01–p08.js
  extras/word.js
  assets/mascot/scenes/
  assets/mascot/cover.png
  audio/
  volc-jobs.csv
  out/
```

Copy the canonical pattern from `production/episodes/04-milk-tea-order/`. Do not invent a new layout engine.

## Page rules

- `META.style = 'study'`
- `META.pace.maxHold = 3.0`
- portrait 1080×1920
- 8 pages: hook, 5 words, sentence, receipt
- **p01 = 3–4s**: blurred Momo background + title + one English hook + a **scene-specific intro Momo** in the lower cream area; pose changes per episode (chin-tap, ticket, menu, mug, etc.); no Chinese VO on p01; no thought bubble by default
- **Momo pose changes on every page**: assign one action per word before generating; never reuse the intro pose or the same standing pose
- p02 full-sentence answer; p03–p06 short answers
- answer hold 1.1s; reward stamp at t3

## Layering: the critical bug

`P.img()` creates an HTML media element above the SVG layer. Therefore:

- `P.box()`, `P.circle()`, `P.line()` are **behind** the image and disappear.
- `P.text()` is HTML and stays above.
- `P.canvas()` is HTML and stays above the image.
- A raw HTML div appended to `P.html` stays above the image.

Use **canvas or HTML** for:

- question bubble
- progress dots
- eraser block
- reward stamp
- glass answer card

## Glass answer card

Use a real HTML div, not SVG:

```js
const glass = document.createElement('div');
Object.assign(glass.style, {
  position: 'absolute', left: '74px', top: '1320px',
  width: '932px', height: '290px', borderRadius: '26px',
  background: 'rgba(255,249,239,.52)',
  backdropFilter: 'blur(12px) saturate(1.08)',
  border: '1.5px solid rgba(255,255,255,.75)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 18px 42px rgba(34,48,74,.16)',
  pointerEvents: 'none',
});
P.html.appendChild(glass);
```

Then draw answer text with `P.text()` **after** the div.

## Eraser block

Use a canvas with an irregular polygon, blurred edges, 80% paper fill, and a few eraser streaks. Do not use a hard `P.box`.

## Reward stamp

- separate from the glass card
- bottom-right, rotated −5°
- double terracotta border
- scale 0.68 → 1.0 at t3
- no text inside the glass card

## Answer blank

Short answer pages use a **centered canvas underline**, not underscore text:

- line from x=340 to 740 at y≈1412
- period dot at x=745
- disappears at t2, full answer appears

## Fonts

- Hanzi: 180px on word pages
- Pinyin: 62px, red, 600
- English: 40px, ink, 600
- Question: 43px
- Glass answer: 96px, 800
- Glass pinyin: 38px
- Receipt row: 50px; full sentence 42px

Do not use muted gray for pinyin/English; use `red` / `ink`.

## Render

```powershell
powershell -File skills/sinofieldnotes-video/scripts/setup_render.ps1 `
  -Episode production/episodes/05-breakfast
cd production/episodes/05-breakfast
$env:PORTRAIT = "1"
node <workspace>/.runtime/research/whiteboard/engine/tools/render.mjs --fps 30 --skip-subs --workers 3
```

- Render **in the episode folder**. Do not mirror to `.runtime`; stale audio is the classic failure.
- Always `--workers 3` for 1080×1920; 12 workers runs out of memory.
- Use `--skip-subs` unless subtitles are explicitly requested.
- Cache means a one-page change rerenders only that page's segments.
- Run `scripts/check_voice_assets.py` before rendering.

## Cover

- 1080×1920
- **designed composition, not a video frame and not the intro page**
- top block: `SINOFIELDNOTES · EP.NN`, `5 个词，60 秒`, scene subtitle, English line
- lower: full-body Momo, feet visible, holding the episode's key prop/tray
- number badge (`05 / BREAKFAST`), `MOMO` tag, bottom `MOMO / 场景`
- render from HTML with Playwright/Chrome
- review the cover at full resolution once

## No BGM / SFX

Do not add music, whooshes, dings, or paper sounds.  
Reward is a visual stamp. Silence after the answer is intentional.
