# EP.05 · 中国早餐

状态：**v1 成片完成**。  
标题：**What Do People Eat for Breakfast in China? 🥟**

## 成片

- [breakfast-v1.mp4](out/breakfast-v1.mp4) — **60.5s**，1080×1920，30fps
- [cover.png](out/cover.png) — 1080×1920
- [企划](PLAN.md)
- [场景素材](assets/mascot/scenes/)

## 5 words + 1 sentence

| 词 | Pinyin | English |
|---|---|---|
| 早饭 | zǎofàn | breakfast |
| 豆浆 | dòujiāng | soy milk |
| 油条 | yóutiáo | fried dough stick |
| 茶叶蛋 | cháyèdàn | tea egg |
| 甜 | tián | sweet |

```text
早饭我要一杯甜豆浆，一根油条，一个茶叶蛋。
Zǎofàn wǒ yào yì bēi tián dòujiāng, yì gēn yóutiáo, yí gè cháyèdàn.
For breakfast, I’d like a sweet soy milk, one youtiao, and one tea egg.
```

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–3.6s | p01 | 早餐摊钩子 + 拿油条的 Momo |
| 3.6–12.3s | p02 | 早饭 zǎofàn |
| 12.3–20.1s | p03 | 豆浆 dòujiāng |
| 20.1–28.1s | p04 | 油条 yóutiáo |
| 28.1–36.3s | p05 | 茶叶蛋 cháyèdàn |
| 36.3–44.7s | p06 | 甜 tián |
| 44.7–50.7s | p07 | 整句 |
| 50.7–60.5s | p08 | 5/5 + 小票 |

## 配音

| 类型 | 参数 |
|---|---|
| 中文音色 | 火山 `zh_female_meilinvyou_uranus_bigtts` |
| 英文开场 | ElevenLabs Bella |
| 词 | speed 0.95 |
| 问句 / 答句 / 整句 | speed 0.92 |
| 奖励 | speed 1.08，pitch +2 |
| 音轨 | 24 cues，约 28.05s |
| BGM / SFX | **无** |

## 页面结构

- p01：早餐摊全幅 + 顶部标题/英文问题 + 底部 Momo
- p02–p06：场景词页 + 擦除词卡 + 气泡问句 + 玻璃答句 + 奖励印花
- p07：托盘场景虚化 + 整句玻璃卡
- p08：小票 + 5/5 + LEARNED 印章

## 已知小问题

- p02 的玻璃答句卡会遮住桌面下缘的食物，但杯子和食物上缘仍可见。
- p04 的气泡会压到 Momo 左耳一点点。
- p07 的小票卡下方留白较多。
- 奶油主色是本集选择，不是永久规则。

## 文件

- `script.js` / `voice.js` / `volc-jobs.csv`
- `build_voice.py`
- `pages-portrait/p01–p08.js`
- `extras/word.js`
- `audio/` — 24 条 WAV
- `assets/mascot/scenes/` — 场景图 + style frames
- `out/` — 成片 + 封面

## 渲染命令

```powershell
$env:PORTRAIT = "1"
Push-Location .runtime/research/breakfast-v1
node ..\whiteboard\engine\tools\render.mjs --fps 30 --skip-subs --workers 3
Pop-Location
```
