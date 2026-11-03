# EP.08 · Momo's Rainy Day｜下雨天

状态：**v1 成片完成**。

## 成片

- [rainy-day-v1.mp4](out/rainy-day-v1.mp4) — **60.2s**，1080×1920，30fps
- [cover.png](out/cover.png) — 1080×1920
- [QA contact sheet](out/qa-contact-sheet.png)
- [企划](PLAN.md)

## 5 words

| 词 | Pinyin | English |
|---|---|---|
| 下雨 | xiàyǔ | to rain |
| 天气 | tiānqì | weather |
| 雨衣 | yǔyī | raincoat |
| 雨伞 | yǔsǎn | umbrella |
| 雨滴 | yǔdī | raindrop |

## 整句

```text
今天天气不好，下雨了。
我穿雨衣、带雨伞，
雨滴落在我的伞上。
```

```text
The weather is bad today, and it’s raining.
I put on my raincoat and bring my umbrella.
Raindrops fall on my umbrella.
```

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–4.6s | p01 | 窗边看雨，Momo 想出门 |
| 4.6–11.3s | p02 | 下雨 |
| 11.3–18.8s | p03 | 天气 |
| 18.8–26.3s | p04 | 雨衣 |
| 26.3–33.7s | p05 | 雨伞 |
| 33.7–42.8s | p06 | 雨滴 |
| 42.8–51.4s | p07 | 整句 |
| 51.4–60.2s | p08 | 5/5 + 小票 |

## 配音

| 类型 | 参数 |
|---|---|
| 中文 | 火山 `zh_female_meilinvyou_uranus_bigtts` |
| 英文开场 | ElevenLabs Bella |
| 词 | speed 0.95 |
| 问句 / 答句 / 整句 | speed 0.92 |
| 奖励 | speed 1.08，pitch +2 |
| 音轨 | 24 cues，约 33.03s |
| BGM / SFX | **无** |

## 制作

- 8 页场景，Momo 动作：窗边 → 接雨 → 穿雨衣 → 撑伞 → 看雨滴 → 走路 → 收伞
- 黄色雨衣 / 雨伞是冷暖对比的唯一暖点
- 雨只靠画面，不加雨声
- 原地渲染

## 已知小问题

- p07 整句卡信息量偏大，三行中文 + 拼音 + 三行英文。
- p08 小票信息密度高。
- p01 标题压在窗景上，属于设计选择。

## 文件

- `script.js` / `voice.js` / `volc-jobs.csv`
- `build_voice.py`
- `pages-portrait/p01–p08.js`
- `extras/word.js`
- `audio/` — 24 条 WAV
- `assets/mascot/scenes/` — 8 页场景
- `assets/mascot/scenes/p07-walk-in-rain-v1.png` + `cover.html`
- `out/` — 成片 / 封面 / QA 拼图
