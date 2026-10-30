# 03 · Tone, palette, and scene redraw

## Palette selection

Pick by scene temperature, not by mood words.

| Scene | Base | Accent | Avoid |
|---|---|---|---|
| Milk tea / bakery / cafe | warm cream | terracotta + sage | cold blue, neon |
| Airport / train / hotel | warm white | ink blue + mustard | heavy red |
| Family dinner / kitchen | cream | terracotta + green | black background |
| Night street / convenience store | deep navy | warm yellow + coral | pastel wash |
| Clinic / office / formal | paper white | sage + ink | cute pink |

Default Sinofieldnotes palette:

- cream `#F4E9D8`
- ink `#22304A`
- terracotta `#C95845`
- sage `#7A8B7F`
- mustard `#C4A060`

Only 4–5 colors. No gradients, no 3D, no photographic texture.

## Character consistency

Use the approved character sheet as **image reference** for every scene:

`production/assets/mascot/reference/momo-character-sheet-v1.png`

Rules:

- same face, dot eyes, small triangle nose, short mouth
- same sage neckerchief
- same terracotta apron + cup badge
- same thick ink outline
- same 2.7–3 head proportions
- one scene = one pose, not a character sheet grid

Do not let the model redraw the character sheet layout.

## Scene image spec

- 1440×2560 PNG (9:16)
- flat 2D vector-like illustration
- warm paper background
- no text, no letters, no numbers, no signage, no menu text
- character on the left or lower-left
- clean right/top area for UI
- full body or counter half-body, but no cropped feet unless intentional
- visible props: cup, straw, paper bag, receipt, ice cubes

## Prompt template

Use `templates/scene-prompt.md`.

Always include:

- “same cream cat as the reference”
- “do not reproduce the character-sheet grid”
- “no text / no signage / no letters / no numbers”
- “flat 2D, thick ink line, limited palette”
- “right side blank for UI”

Negative examples that fail:

- model writes “奶茶店” on the wall
- model writes “LEARNED” on a receipt
- model adds a menu board with fake text
- model gives the cat a human hand
- model raises one finger when you asked for “half”

## Image QA gate

Before accepting a scene:

1. No generated text anywhere.
2. Face matches the reference.
3. Straw / prop is present.
4. Right/top space is clean.
5. No extra fingers or limbs.
6. Composition leaves the answer card area free.

If 1 fails, mask or regenerate. If 2 or 5 fails, regenerate. Do not build on a bad image.

## Momo variants

Keep all variants in `assets/mascot/scenes/`:

- `p01-v1`, `p01-v2`, …
- `p03-v1-index`, `p03-v2`, …

Use `README.md` in that folder to record:

- which page
- what works
- what fails
- preferred / backup

Do not delete rejected variants; move to `archive/rejected/`.
