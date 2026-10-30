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

**Cream is the EP.04/05 default, not a permanent brand rule.** Future episodes can shift the overall palette, as long as it stays low-saturation and limited to 4–5 colors. Pick by scene:

| Episode mood | Low-saturation main colors |
|---|---|
| morning market / breakfast | oat, sage, clay, muted mustard |
| night street / convenience store | slate, muted teal, warm amber |
| travel / station / hotel | dusty blue, sand, brick, paper |
| clinic / office / formal | paper white, sage, ink, pale clay |
| family / kitchen | cream, terracotta, olive, warm gray |

Do not default every episode to the same cream; repeated cream is a series choice for these first two episodes, not a requirement.

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

## Intro Momo (p01)

p01 needs one **scene-specific** Momo before the teaching starts. It is not a generic mascot sticker; it should look like Momo is also wondering about this episode's question.

Placement:

- lower half of p01, centered
- about 400–450px wide on a 1080px canvas
- warm cream area below the title; not on top of the title
- keep the top 700px clear for title + hook
- no thought bubble by default; the pose carries the thought

Pose library:

| Episode type | Intro pose |
|---|---|
| ordering food / milk tea | one paw at chin, looking up-right |
| travel / train / hotel | holding ticket or key card, looking at it |
| restaurant / family dinner | holding menu or chopsticks, slightly puzzled |
| clinic / pharmacy | touching cheek, worried look |
| office / cowork | holding mug, thinking |
| shopping / market | holding a shopping bag, looking at price tag |
| language confusion | head tilt, one ear down, looking at viewer |

Rules:

- generate from `momo-character-sheet-v1.png`
- 3/4 view, face and outfit identical to the sheet
- no text, no speech bubble, no question mark
- one pose only; do not reproduce the four-view sheet
- if face/eyes/proportions are off, regenerate with the sheet as reference; do not hand-paint features
- keep the sharp Momo separate from the blurred background; the blur stays atmospheric

## Pose variation across pages

Momo should feel like a participant, not a logo. Every page gets one clear action:

| Page | Action examples |
|---|---|
| p02 | sitting at table, holding chopsticks or a menu |
| p03 | pouring soy milk / holding a cup with steam |
| p04 | lifting a youtiao from the fryer / holding it with two paws |
| p05 | picking up a tea egg / peeling it |
| p06 | holding a sugar jar / tasting |
| p07 | carrying the full tray |
| p08 | small thumbs-up or leaning on the receipt edge (optional) |

Rules:

- Do not repeat the intro pose.
- Do not use the same standing pose on every word page.
- Keep the face/outfit identical; only pose and action change.
- If the action hides the face too much, choose a simpler action.
- Remove hands/props that do not belong to the action.

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
