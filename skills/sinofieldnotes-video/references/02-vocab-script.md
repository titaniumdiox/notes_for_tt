# 02 · Vocabulary and script

## 5-word selection

Pick words that pass all:

1. **Scene-usable**: can be said in this exact scene.
2. **High-frequency**: appears in everyday speech, not a textbook noun.
3. **Short**: 1–3 characters preferred.
4. **Buildable**: all 5 can fit into one sentence.
5. **Tone-safe**: at most 1 polyphonic word; if possible, 0.

Avoid:

- abstract nouns (文化, 关系, 意义)
- words that need a long explanation
- 5 words that are all nouns
- a sentence that is only a list of the 5 words

## The sentence

- One sentence, 6–18 characters.
- Must use all 5 words.
- Must be sayable in one breath.
- Prefer a real request/response, not a textbook example.
- The first answer in the episode may be the full sentence; later answers stay short.

Milk tea example:

> 一杯奶茶，半糖少冰，打包，谢谢。

## 8-page beat sheet

| Page | Seconds | Beat |
|---|---|---|
| p01 | 3–4 | one English hook + thinking Momo; Chinese only as text |
| p02 | 7–8 | word 1 + full-sentence answer |
| p03 | 7–8 | word 2 + short answer |
| p04 | 7–8 | word 3 + short answer |
| p05 | 7–8 | word 4 + short answer |
| p06 | 7–8 | word 5 + short answer |
| p07 | 6 | full sentence, blurred background |
| p08 | 8–9 | 5/5 + receipt |

## Word page order

1. Word + pinyin + English.
2. Clerk question + pinyin.
3. Answer blank (canvas underline) or full-sentence blank.
4. Countdown 2s.
5. Answer fills.
6. **1.1s pause.**
7. Reward stamp pops out.

Do not put the reward inside the glass card.

## Data table

Use `templates/words.csv`.

Required columns:

- `page`
- `cue`
- `kind` (word / question / answer / reward / final)
- `hanzi`
- `pinyin`
- `meaning`
- `question`
- `question_pinyin`
- `answer_full`
- `answer_pinyin`
- `reward_id`
- `speed`
- `pitch`

## Multi-tone test

If a word is polyphonic:

1. Generate it alone.
2. Listen for the intended reading.
3. If wrong, try a different context with the same voice.
4. If still wrong, splice from a same-voice clip or record one line.
5. Never change the whole voice source to fix one word.

Do not put a “pronunciation correction” note on screen unless the user asks for it.
