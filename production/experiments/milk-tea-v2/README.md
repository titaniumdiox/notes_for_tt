# 奶茶点单 v2 · 占位 Demo

- 成片：[out/milk-tea-v2-demo.mp4](out/milk-tea-v2-demo.mp4)
- 时长：**55.7s**
- 画幅：1080×1920，30fps
- 风格：Frametell `study`
- 角色：**Placeholder Momo**（明确标注占位，不是最终美术）
- 开场：英文 Bella → 中文 Xiaoxiao
- 词页：Momo 从左滑入 + 气泡问句 + 独立答句 + 2 秒倒计时 + 奖励语
- 结尾：5/5 + 小票

## 这一版验证什么

1. 开场“目标语言 → 中文”的双语标题/VO 结构。
2. Momo 从画布左侧滑入，是否比静态卡片更有节奏。
3. 问句在气泡里、答句单独一行，是否比“我要一杯什么？”更清楚。
4. 每个词后面的奖励语（真棒/点单成功/你做到了/继续/再来一个）是否成立。
5. 结尾小票是否仍然可读。

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–6.9s | p01 | 英文开场 + 中文译读 |
| 6.9–13.6s | p02 | 奶茶 nǎichá |
| 13.6–20.9s | p03 | 半糖 bàntáng |
| 20.9–27.9s | p04 | 少冰 shǎo bīng |
| 27.9–34.6s | p05 | 打包 dǎbāo |
| 34.6–41.8s | p06 | 谢谢 xièxie |
| 41.8–46.7s | p07 | 完整句 |
| 46.7–55.7s | p08 | 5/5 + 小票 |

## 这版没做好的地方

- **纸色擦除未接好**：页内 flash 会盖住 Momo 层，后处理 drawbox 也没在成片里生效；目前仍是 Frametell 默认页面过渡。下一版在 AE/Remotion 或专门的 ffmpeg 分段里做。
- **少冰音频是 Huihui 占位**：Edge 的 Xiaoxiao/Yunxi/Yunyang/Xiaoyi 都把“少冰”读成 shào；SSML `<phoneme>` 被 Edge 服务拒绝。当前 p04 的“少冰”用了本机 Huihui 中文 SAPI，音色与其余页不一致，必须换真人录音。
- **Momo 是占位**：灰猫剪影 + `PLACEHOLDER` 标签，只用于验证滑入和版面，不是最终角色。
- **没有 BGM / 音效**：奖励语只有人声，没有“叮”的音效。
- 版面仍偏空；正式版需要 AI 背景/道具和更完整的构图。

## 音频来源

| 内容 | 音源 |
|---|---|
| 英文开场 | ElevenLabs Bella |
| 中文开场 / 问句 / 奖励 / 小票 | Edge TTS Xiaoxiao |
| p04 少冰单词与答案 | Microsoft Huihui（占位） |

`voice.js` 里 p01 第一条是英文音频，第二条是中文；这是手动替换后的混合时间轴。

## 下一步

1. 真人录 `少冰`（shǎo bīng），替换 p04-c00 / p04-c02。
2. 用 AE/Remotion 做纸色擦除，不要再用 Frametell 页内 flash。
3. AI 生成 Momo 角色表（围裙、杯子、三种表情），替换占位。
4. 再把 5 个词扩到正式版；这一版只验证结构。

## 文件

- `script.js` / `voice.js`
- `pages-portrait/p01–p08.js`
- `extras/word.js`：词页组件（Momo 滑入、气泡、答句、倒计时、奖励）
- `assets/mascot/placeholder-momo.svg`
- `audio/`：25 条 WAV
- `out/intro.jpg`、`word.jpg`、`receipt.jpg`
