# 06 · QA and archive

## Frame checks

Extract at least:

- hook: 4s
- first word: first word + 2s
- answer blank: answer cue − 0.5s
- answer filled: answer cue + 1s
- reward: reward cue + 0.5s
- sentence page: middle
- receipt: last 3s

## QA checklist

### Content

- [ ] 5 words + 1 sentence
- [ ] sentence uses all 5
- [ ] first answer full; later answers short
- [ ] pinyin tone marks correct
- [ ] polyphonic word verified
- [ ] no pronunciation-correction note unless requested

### Visual

- [ ] no generated text in any image
- [ ] Momo face/outfit consistent
- [ ] p01 intro Momo pose matches the episode situation, not a generic sticker
- [ ] p01 intro Momo stays in the lower cream area, title area clear
- [ ] Momo pose changes page to page; no repeated chin-tap/standing sticker
- [ ] straw present where needed
- [ ] right/top space clean for UI
- [ ] no extra fingers/limbs
- [ ] no hard box edges on a scene image

### UI

- [ ] progress dots visible
- [ ] question bubble visible and above image
- [ ] answer card glass, centered under the word block
- [ ] answer blank centered
- [ ] reward stamp outside the glass card
- [ ] top/bottom `SINOFIELDNOTES`
- [ ] watermark present

### Audio

- [ ] no BGM
- [ ] no SFX
- [ ] 1.1s pause before reward
- [ ] voice consistent
- [ ] no clipped words from silence trimming

### Render

- [ ] 1080×1920, 30fps
- [ ] 55–60s
- [ ] no black/blank frames at page transitions
- [ ] cover exported separately

## Archive

Canonical episode:

```
production/episodes/NN-slug/
  README.md
  script.js
  voice.js
  pages-portrait/
  extras/
  assets/mascot/scenes/
  audio/
  volc-jobs.csv
  out/
    final.mp4
    cover.png
```

Old experiments go to `production/archive/`. Keep rejected scene variants in `assets/mascot/scenes/` or move to `archive/rejected/`; never delete without recording.

## README required sections

1. Final video link
2. Duration / format
3. What changed in this version
4. Timeline table
5. Audio parameters
6. Known gaps
7. File list
8. Exact render command

## Versioning

- `v1` = layout/flow demo
- `v2` = bilingual / placeholder character
- `v3` = final voice + AI scenes
- `v3.1` = typography / stamp / intro polish

Do not overwrite a shipped version; add a new `out/` filename.
