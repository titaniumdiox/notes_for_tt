# Final QA checklist

## Story

- [ ] 5 words + 1 sentence
- [ ] sentence uses all 5 words
- [ ] one scene / one transaction
- [ ] 55–60s

## Words and pinyin

- [ ] tone marks correct
- [ ] polyphonic word checked
- [ ] no pronunciation note unless requested
- [ ] English meaning is natural, not literal

## Voice

- [ ] `check_voice_assets.py` passes
- [ ] word 0.95
- [ ] question/answer 0.92
- [ ] reward 1.08 / pitch +2
- [ ] 1.1s pause before reward
- [ ] no clipped words
- [ ] no BGM
- [ ] no SFX

## Visual

- [ ] Momo consistent
- [ ] p01 intro Momo pose is specific to this episode, not a generic sticker
- [ ] p01 intro Momo sits in the lower cream area, title stays clear
- [ ] Momo pose changes page to page; no repeated chin-tap/standing sticker
- [ ] no generated text in image
- [ ] straw/prop present
- [ ] right/top UI space clean
- [ ] no extra fingers/limbs
- [ ] no hard image edges

## UI

- [ ] progress dots
- [ ] question bubble above image
- [ ] answer blank centered
- [ ] answer fills at t2
- [ ] glass answer card
- [ ] reward stamp outside card
- [ ] top/bottom brand
- [ ] watermark

## Output

- [ ] contact sheet reviewed; full-res only failures
- [ ] 1080×1920
- [ ] 30fps
- [ ] final MP4
- [ ] designed cover PNG (not an intro frame)
- [ ] README
- [ ] jobs CSV
- [ ] scene images
- [ ] audio WAVs
