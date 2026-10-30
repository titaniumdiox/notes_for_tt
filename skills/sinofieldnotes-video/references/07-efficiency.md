# 07 · Cost control without lowering quality

This reference exists because the expensive part is not image generation — it is **re-reading large files and inspecting full-resolution frames repeatedly**.

## What actually costs tokens

1. Full-res 1080×1920 frame review, one frame per message.
2. Re-reading the same long JS/README files after every small edit.
3. Re-rendering the whole film after a one-line change.
4. Dumping full JSON, logs, or image metadata into the conversation.
5. Asking the model to verify things a script can verify.

## Protocol

### 1. One state file, not repeated reading

Keep `production/episodes/NN-slug/STATE.md`:

```text
locked words:
sentence:
palette:
scene paths:
audio status:
render status:
known gaps:
next action:
```

Read only `STATE.md` + the file being edited. Do not re-read the whole episode every turn.

### 2. Batch generation, one review

- Generate **3–5 scenes in one command**, not one scene per turn.
- Inspect **one contact sheet** at 360–480px per tile.
- Open a full-res frame only when:
  - text appears in the image
  - the face/eyes are visibly wrong
  - a key prop is missing
  - the cover is being approved

### 3. Render in place

Do **not** mirror the episode into `.runtime/research/...`. That is how EP.05 shipped old audio against new text.

Use:

```powershell
powershell -File skills/sinofieldnotes-video/scripts/setup_render.ps1 `
  -Episode production/episodes/05-breakfast
```

This creates `engine` / `engine_modules` junctions and an `index.html` inside the episode. Then render from the episode directory:

```powershell
cd production/episodes/05-breakfast
node <workspace>/.runtime/research/whiteboard/engine/tools/render.mjs --fps 30 --skip-subs --workers 3
```

All audio, scenes, pages, and voice.js are already the live files. No sync step, no stale WAVs.

### 4. Render once, QA cheaply

After the page build:

- render once
- run `scripts/qa_contact_sheet.py` to get an 8-frame contact sheet
- read the contact sheet
- open only the failing frames at full resolution

### 5. Verify with scripts, not eyes

Run:

```powershell
python skills/sinofieldnotes-video/scripts/check_voice_assets.py `
  --episode production/episodes/05-breakfast
```

It checks:

- every `voice.js` `f` exists
- every WAV duration matches `d` within 50ms
- total audio length

Do this **before** rendering. It catches stale/truncated audio without a model call.

### 6. Summarize logs

Never paste whole render logs. Tail 6 lines, or grep only:

```powershell
Select-String -Path out/render.log -Pattern 'video:|audio:|✓|Error|failed'
```

### 7. Keep the expensive gates

Saving tokens does **not** mean skipping:

- 3 style frames
- full-res cover review
- one full-res check of each distinct page type
- audio duration check
- contact-sheet review of all 8 pages

The saving comes from **batching and thumbnails**, not from lowering the bar.

## Quality-preserving budget

| Stage | Expensive action | Cheap replacement |
|---|---|---|
| topic | none | table in `STATE.md` |
| scenes | 8 full-res images | one contact sheet, 3–5 per batch |
| audio | re-listen to all cues | duration check + script cue table |
| pages | render after each edit | batch edits, one render |
| QA | 8 full-size frames | 8-up contact sheet + 1–2 full-res failures |
| cover | regenerate often | one full-res design pass |
