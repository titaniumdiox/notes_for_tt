# EP.06 · Momo Wants Hotpot Today!

状态：**v1 成片完成**。

## 成片

- [hotpot-v1.mp4](out/hotpot-v1.mp4) — **60.4s**，1080×1920，30fps
- [cover.png](out/cover.png) — 1080×1920
- [QA contact sheet](out/qa-contact-sheet.png)
- [企划](PLAN.md)

## 5 words + 1 sentence

| 词 | Pinyin | English |
|---|---|---|
| 火锅 | huǒguō | hotpot |
| 鸳鸯锅 | yuānyāngguō | split pot |
| 锅底 | guōdǐ | soup base |
| 牛肉 | niúròu | beef |
| 蘸料 | zhànliào | dipping sauce |

```text
今天吃火锅，我要一个鸳鸯锅，锅底一边辣、一边不辣，再来一盘牛肉和一份蘸料。
Jīntiān chī huǒguō, wǒ yào yí ge yuānyāngguō,
guōdǐ yì biān là, yì biān bú là,
zài lái yì pán niúròu hé yí fèn zhànliào.
Today I’m having hotpot. I’d like a split pot — one spicy side,
one mild side — plus a plate of beef and a portion of dipping sauce.
```

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–4.1s | p01 | Momo 想吃火锅 |
| 4.1–11.6s | p02 | 火锅 huǒguō |
| 11.6–18.3s | p03 | 鸳鸯锅 yuānyāngguō |
| 18.3–26.1s | p04 | 锅底 guōdǐ |
| 26.1–32.9s | p05 | 牛肉 niúròu |
| 32.9–41.4s | p06 | 蘸料 zhànliào |
| 41.4–51.4s | p07 | 整句 |
| 51.4–60.4s | p08 | 5/5 + 小票 |

## 配音

| 类型 | 参数 |
|---|---|
| 中文音色 | 火山 `zh_female_meilinvyou_uranus_bigtts` |
| 英文开场 | ElevenLabs Bella |
| 词 | speed 0.95 |
| 问句 / 答句 / 整句 | speed 0.92 |
| 奖励 | speed 1.08，pitch +2 |
| 音轨 | 24 cues，约 36.22s |
| BGM / SFX | **无** |

## 制作

- p01–p08 场景为 Seedream 生成，角色参考设定图
- 鸳鸯锅在 p01/p02/p03/p04/p07/p08 中保持一红一白
- Momo 每页换动作，不重复站姿
- 原地渲染（episode 目录 + engine junction），避免 runtime 旧音频

## 已知小问题

- p05 牛肉盘在答句卡下方，下缘被卡片压住一点。
- p02/p03 的答句卡会盖住桌沿食材下缘。
- p07 整句为 3 行，信息密度较高。

## 文件

- `script.js` / `voice.js` / `volc-jobs.csv`
- `build_voice.py`
- `pages-portrait/p01–p08.js`
- `extras/word.js`
- `audio/` — 24 条 WAV
- `assets/mascot/scenes/` — 8 页场景
- `assets/mascot/hotpot-cover-v1.png` + `cover.html`
- `out/` — 成片 / 封面 / QA 拼图

## 渲染

```powershell
cd production/episodes/06-hotpot
$env:PORTRAIT = "1"
node <workspace>/.runtime/research/whiteboard/engine/tools/render.mjs --fps 30 --skip-subs --workers 3
```
