# 制作流水线（TTS / 字幕 / 合成）

目标：先做 3 条可发布的 9:16 样片，不开发完整系统。

## 1. 锁定旁白

- 以每集的 `vo_en.txt` 为准。
- 英文旁白目标语速：约 140–155 wpm；01 约 54s，02 约 57–62s，03 约 60–65s。
- 不要为了卡时长加速到听不清；宁可删一句。

## 2. 配音

优先顺序：

1. 真人英文配音（最自然，但需要人）。
2. 高质量 TTS（温暖、中性、不过度戏剧化；不要模仿中国口音）。
3. 系统 TTS 只做 scratch，用于看节奏，不用于发布。

导出：

- WAV，48kHz，24-bit 或 16-bit
- 单声道即可；峰值不要削波
- 保留一条无音乐干声，方便后期做字幕对齐

当前已有 scratch 配音：

- `01-us-vs-china/scratch_vo.wav`：50.75s
- `02-lunch-nap/scratch_vo.wav`：56.17s
- `03-marriage-pressure/scratch_vo.wav`：59.92s

这些是 Windows SAPI/Zira 生成的临时音轨，只用于 animatic 和时长校对，**不能发布**。SAPI 不会正确读中文关键词，正式配音必须重录/重生成，并用最终音轨重新对齐字幕。

## 3. 字幕：必须从实际音频生成

不要用“总时长 ÷ 句子数”的平均估算。上一版工具的问题就是字幕时间不准。

推荐流程：

1. 用 Whisper/forced alignment 对最终干声做词级时间戳。
2. 按语义断句，不按字数硬切。
3. 每行最多 2 行，英文每行约 32–42 字符。
4. 中文关键词卡单独做，不跟英文逐句混排。
5. 导出 `.srt`，再烧录或作为平台字幕上传。

字幕样式：

- 英文：白字 + 半透明深色底，底部安全区上方
- 关键词：中文大字 + 拼音 + 英文小注，出现 2–3 秒
- 不使用自动滚动字幕；不做逐字高亮（样片阶段）

## 4. Animatic（粗剪）

- 用 `shotlist.csv` 的时间段做色块/剪影/文字卡。
- 先检查三件事：
  1. 前 3 秒是否有钩子；
  2. 中段是否有视觉变化（不是一张图配旁白）；
  3. 结尾是否留出 2–3 秒提问/评论空间。
- Animatic 通过后再画精稿，避免白画。

## 5. 合成

建议参数：

- 容器：MP4
- 视频：H.264，1080×1920，30fps，yuv420p
- 音频：AAC，192kbps，48kHz
- 响度：约 -14 LUFS（平台常见目标），峰值 -1 dBTP
- 字幕：烧录英文主字幕；关键词卡作为画面元素

FFmpeg 示例（路径按实际替换）：

```powershell
ffmpeg -y `
  -i animatic.mp4 `
  -i vo.wav `
  -i music.wav `
  -filter_complex "[1:a]loudnorm=I=-14:TP=-1:LRA=11[vo];[2:a]volume=0.12[bg];[vo][bg]amix=inputs=2:duration=first[a]" `
  -map 0:v -map "[a]" `
  -c:v libx264 -pix_fmt yuv420p -r 30 -crf 18 `
  -c:a aac -b:a 192k -ar 48000 `
  -shortest output.mp4
```

烧录字幕示例：

```powershell
ffmpeg -y -i output.mp4 -vf "subtitles=en.srt:force_style='FontName=Inter,FontSize=18,PrimaryColour=&HFFFFFF&,OutlineColour=&H80000000&,BorderStyle=3'" -c:a copy final.mp4
```

## 6. QA 清单

- [ ] 前 3 秒有钩子，不靠标题解释
- [ ] 英文旁白没有“all Chinese / always / never”这类绝对化
- [ ] 中文关键词只出现一次主卡，拼音正确
- [ ] 字幕与音频逐句对齐，没有平均估算
- [ ] 竖屏安全区：底部不挡字幕，右侧不挡按钮
- [ ] 音乐不压过人声；人声 -14 LUFS 左右
- [ ] 结尾有提问，留 2–3 秒
- [ ] 没有刻板化视觉（红金满屏、夸张口音、单一“中国代表”）
- [ ] 导出文件命名：`ep01_us-vs-china_v1.mp4`

## 7. 发布前最小验证

每集发布后只看 4 个指标：

- 3 秒留存
- 完播率
- 评论率
- 分享率

先各发 1 条，不要一次发 10 条；根据评论决定下一批选题。
