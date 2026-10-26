# 自动剪辑 / 视频生成工具评估

_截至 2026-10-26。Star 数会变，仅用于判断社区活跃度。_

## 结论

GitHub 上没有“一键生成 CN Fieldnotes 这种插画风 + 英文旁白 + 中文字幕”的成熟插件。现有项目分三类：

1. **一键成片**：输入主题/文章，自动脚本、素材、TTS、字幕、FFmpeg 合成。
2. **程序化动画**：用代码写场景和时间轴，适合固定视觉风格、批量生产。
3. **字幕/粗剪**：只解决时间轴、静音删除、字幕对齐，不生成内容。

对 CN Fieldnotes 最合适的不是“全自动一键成片”，而是：

> **程序化动画模板（Remotion / Motion Canvas）+ WhisperX 字幕 + FFmpeg 合成**；  
> 短期可以用 MoneyPrinterTurbo 做一次“本地插画 + 旁白 + 字幕”的成片测试。

## 候选项目

| 项目 | 类型 | 适配度 | 关键点 |
| --- | --- | --- | --- |
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 一键成片 | **高（作为合成/字幕层）** | 135k stars，MIT；主题→脚本→素材→TTS→字幕→9:16；支持本地图片/视频、Edge TTS 免费、edge/whisper 两种字幕；但默认是素材拼接风，不是插画动画 |
| [NarratoAI](https://github.com/linyqh/NarratoAI) | 影视解说/混剪 | **低（不适合原创动画）** | 11.5k stars，MIT；擅长给已有视频写解说、剪辑、配音、字幕；不适合从零生成插画场景 |
| [AI-generated-English-podcast-videos](https://github.com/liangdabiao/AI-generated-English-podcast-videos) | 文章→播客视频 | **中（架构参考）** | 183 stars，MIT；文章→对话脚本→逐句生图→TTS→FFmpeg；**无字幕**；依赖 MiniMax + apimart 付费 key；适合参考“逐句素材 + 音频”的简单流水线 |
| [Remotion](https://github.com/remotion-dev/remotion) | 程序化动画 | **高（长期模板）** | 67k stars；React 写视频，适合做固定分镜、角色、关键词卡、字幕组件；**不是 MIT，商业使用需看 Remotion license** |
| [Motion Canvas](https://github.com/motion-canvas/motion-canvas) | 程序化动画 | **高（MIT 替代）** | 19k stars，MIT；TypeScript 写 2D 动画，适合场景化插画、转场、图表；生态比 Remotion 小 |
| [Revideo](https://github.com/midrender/revideo) | 程序化动画 | **中高（MIT 替代）** | 4.1k stars，MIT；Remotion 风格，代码生成视频；社区较小 |
| [auto-editor](https://github.com/WyattBlue/auto-editor) | 自动粗剪 | **中（只做辅助）** | 5.6k stars，Unlicense；自动删静音/空白，适合真人素材粗剪；不生成内容 |
| [WhisperX](https://github.com/m-bain/whisperX) | 字幕/对齐 | **高（字幕层）** | 24.8k stars，BSD-2；词级时间戳 + 说话人分离；解决“字幕时间不准”，不负责剪辑 |

## 推荐组合

### 现在（1–3 天）

用 **MoneyPrinterTurbo** 做一次 01 集的成片测试：

- 输入：8 张已完成的插画/色块场景 + `scratch_vo.wav`（或正式 VO）
- 用它处理：9:16 画幅、字幕、背景音乐、FFmpeg 合成
- 目的：验证“画面 + 旁白 + 字幕”的节奏，不追求最终视觉
- 如果它的素材时长/转场太死板，只复用它的 **字幕 + FFmpeg 合成层**，画面交给我们自己的模板

### 中期（1–2 周）

用 **Remotion** 或 **Motion Canvas** 做 3 个固定模板：

1. 左右/上下对比（文化差异）
2. 单场景角色对话（家庭/社交）
3. 关键词卡 + 地图/数据（旅行/工作）

每个模板由 JSON 驱动：

```json
{
  "episode": "01",
  "scenes": [
    {"id": "hook", "start": 0, "end": 5, "template": "split", "left": "US", "right": "CN"},
    {"id": "elder", "start": 5, "end": 18, "template": "scene", "keyword": "长辈", "pinyin": "zhǎngbèi"}
  ]
}
```

这样脚本/分镜可以直接映射到视频，不需要每次手工拖时间轴。

### 字幕

- 正式流程：**WhisperX** 对最终干声做词级时间戳，生成 SRT/ASS
- 不用“总时长 ÷ 句子数”的平均估算
- 如果先用 Edge TTS，MoneyPrinterTurbo 的 `edge` 字幕模式可以直接用 TTS 时间戳；但最终换真人配音后必须重对齐

### 粗剪

- 真人素材/口播花絮才用 `auto-editor`
- 插画动画不需要它

## 不建议

- **NarratoAI**：它是“给已有视频配解说/混剪”，不是“从脚本生成原创插画动画”。可以做后续 reaction/commentary 线，不是当前主线。
- **AI-generated-English-podcast-videos 直接用**：没有字幕，依赖两个付费 API，视觉是“每句一张图”的幻灯片，不是我们的风格；只参考它的流水线拆分。
- **Remotion 直接商用**：先确认 license；如果不确定，用 Motion Canvas/Revideo 的 MIT 方案。
- **一开始就搭完整自动系统**：先用 3 条样片验证内容，再决定是否模板化。

## 下一步 PoC

1. 用 MoneyPrinterTurbo 的本地图片模式，拿 01 集的 8 张场景图 + scratch VO 生成一版 9:16 成片。
2. 同时用 Remotion/Motion Canvas 做 1 个 15 秒的“左右对比”模板，比较两版节奏和修改成本。
3. 选成本更低的那条，再扩到 3 集。

## 许可提醒

- MoneyPrinterTurbo / NarratoAI / Motion Canvas / Revideo / podcast 项目：MIT
- Remotion：自定义 license，商业使用前确认
- auto-editor：Unlicense
- WhisperX：BSD-2-Clause
- 第三方素材（Pexels/Pixabay/AI 生图）仍有各自许可，发布前逐项确认
