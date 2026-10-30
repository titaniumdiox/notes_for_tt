# 奶茶点单 v3 · 火山 TTS + AI 场景

- 完整场景版：[out/milk-tea-v3-scenes-demo.mp4](out/milk-tea-v3-scenes-demo.mp4)
- 旧占位版：[out/milk-tea-v3-demo.mp4](out/milk-tea-v3-demo.mp4)
- 封面：[assets/mascot/cover.png](assets/mascot/cover.png)
- 时长：**60.3s**
- 画幅：1080×1920，30fps
- 风格：Frametell `study`
- 中文音色：火山 `zh_female_meilinvyou_uranus_bigtts`
- 英文开场：ElevenLabs Bella
- 角色：AI 生成的 Momo；p01 用封面图模糊背景，无独立场景

## v3 相对 v2 的改动

1. 中文全部换成火山 TTS；不再用 Huihui 占位。
2. 第一句回答改成完整句：`我要一杯奶茶。`；其余保留短答。
3. 答句后留 **1.1 秒**，再出奖励语和星星。
4. `少冰` 用同一火山音色，拼音 `shǎo bīng`；多音字提示已移除。
5. 开场英文 Bella → 中文火山，保留双语标题。

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–6.8s | p01 | 英文开场 + 中文译读 |
| 6.8–14.6s | p02 | 奶茶 nǎichá |
| 14.6–22.4s | p03 | 半糖 bàntáng |
| 22.4–30.1s | p04 | 少冰 shǎo bīng |
| 30.1–37.4s | p05 | 打包 dǎbāo |
| 37.4–45.5s | p06 | 谢谢 xièxie |
| 45.5–51.5s | p07 | 完整句 |
| 51.5–60.3s | p08 | 5/5 + 小票 |

## 音频参数

| 类型 | speed | pitch |
|---|---|---|
| 词 | 0.95 | 0 |
| 问句 / 答句 | 0.92 | 0 |
| 最终整句 | 0.92 | 0 |
| 奖励语 | 1.08 | +2 |

`少冰`、`我要一杯奶茶`、中文开场、`真棒` 四条已单独试听。

## 已知问题

- p01 用封面图模糊背景，没有独立 Momo 场景；p02–p08 已换 AI 场景。
- **纸色擦除仍未接好**：目前还是 Frametell 页面过渡，不是纸色 wipe。
- p02 杯子没吸管（已确认无伤大雅）。
- 按规则不做 BGM / 音效；奖励只有人声 + 印花。
- p04/p06/p08 是柜台半身，p03/p05/p07 是全身。

## 文件

- `script.js` / `voice.js`
- `pages-portrait/p01–p08.js`
- `extras/word.js`
- `assets/mascot/scenes/`：p02–p08 场景图
- `audio/`：25 条 WAV
- `volc-jobs.csv`：24 条火山任务表
- `build_voice.py`：MP3→WAV、只裁首尾静音、生成 voice.js
