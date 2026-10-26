# Episode 01 v3 Animatic

- 文件：`ep01_v3_animatic_v1.mp4`
- 时长：52.00s
- 画幅：1080×1920，9:16，30fps
- 配音：ElevenLabs **Bella**（`eleven_multilingual_v2`）
- 音频实际长度：49.46s；结尾留约 2.5s 提问卡
- 字幕：`tts/bella.ass`，由 **ElevenLabs 字符级时间戳**生成，不是平均估算
- 画面：12 张场景卡 + 轻微镜头运动（约 ±22px 水平、±14px 垂直）

## 这一版验证什么

1. 52 秒的 12 镜头节奏是否成立（每 3–6 秒换镜）。
2. Bella 的音色、语速、句间停顿是否适合科普旁白。
3. 字幕是否跟音频对齐，是否遮挡画面。
4. 三个差异（称呼 / 礼物 / 小费）是否能在一个连续解释里成立。

## 已知问题

- 仍是 **animatic 场景卡**，不是最终插画；人物只是剪影/几何形。
- 硬切，没有转场；正式版需要 0.2–0.4 秒 transition 或动作衔接。
- 个别卡片留白偏多（如“阿姨”卡），正式版需要更完整的场景。
- 字幕是 scratch 级样式；正式版需要品牌字幕规范。
- 音乐/音效未加入；Bella 干声已够清晰。

## 重新生成

1. 生成带时间戳的 Bella 音频：

```powershell
$env:NODE_PATH = (Resolve-Path 'node_modules/.pnpm/node_modules').Path
node --env-file=.env.local production/tts/generate_timed_vo.mjs `
  production/episodes/01-us-vs-china/vo_v3.txt `
  production/episodes/01-us-vs-china/tts
```

2. 生成 SRT/ASS：

```powershell
python production/tts/alignment_to_srt.py `
  production/episodes/01-us-vs-china/tts/bella_alignment.json `
  production/episodes/01-us-vs-china/tts
```

3. 生成 12 张卡：

```powershell
python production/scripts/make_animatic_v3.py
```

4. 用 ffmpeg 为每张卡加轻微运动，concat 后混入 `bella_timed.mp3` 并烧录 `bella.ass`。具体命令见 `production/pipeline.md`。

## 下一版

- 用正式插画替换 12 张卡。
- 加转场/音效/背景音乐。
- 字幕做品牌化样式；保留 ElevenLabs 时间戳重新对齐。
- 发布前确认 ElevenLabs 账户/声音的商用条款。
