# EP.07 · Momo's Afternoon Reading 01 · 静夜思

状态：**v1 成片完成**。

## 成片

- [momo-reading-01-v1.mp4](out/momo-reading-01-v1.mp4) — **78.0s（1:18）**，1080×1920，30fps
- [cover.png](out/cover.png) — 1080×1920
- [QA contact sheet](out/qa-contact-sheet.png)
- [企划](PLAN.md)

## 栏目

**Momo's Afternoon Reading｜Momo的午后阅读时间**  
首期：**静夜思 · 李白 · 唐**  
规格：**82 秒**，无 BGM、无音效。

## 5 words

| 词 | Pinyin | 精确英文 |
|---|---|---|
| 明月 | míngyuè | bright moon |
| 霜 | shuāng | frost |
| 举头 | jǔtóu | raise one’s head |
| 低头 | dītóu | lower one’s head |
| 故乡 | gùxiāng | hometown |

## 诗

```text
床前明月光，
疑是地上霜。
举头望明月，
低头思故乡。
```

押韵译文：

```text
Before my bed the moonlight streams,
And on the ground, like frost, it gleams.
I raise my head — the moon is bright,
I lower my head — home fills the night.
```

## 时间轴

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–10.3s | p01 | 午后窗边；《静夜思》中英标题 + 唐·李白 |
| 10.3–20.2s | p02 | 床前明月光；明月 |
| 20.2–29.2s | p03 | 疑是地上霜；霜 |
| 29.2–37.5s | p04 | 举头望明月；举头 |
| 37.5–48.4s | p05 | 低头思故乡；低头 + 故乡 |
| 48.4–68.0s | p06 | 全诗：中文一遍，英文一遍 |
| 68.0–75.0s | p07 | 词汇小票 + 今天学会了一首唐诗 |
| 75.0–78.0s | p08 | 合书（1:18 截尾） |

## 音轨

| 页面 | 顺序 |
|---|---|
| p01 | `Momo's Afternoon Reading.` → 静夜思 → Quiet Night Thoughts → 唐 → 李白 → LiBai from Tang Dynasty |
| p02 | 中文整句 → 英文整句 → 明月（中）→ bright moon（英） |
| p03 | 中文整句 → 英文整句 → 霜（中）→ frost（英） |
| p04 | 中文整句 → 英文整句 → 举头（中）→ raise one's head（英） |
| p05 | 中文整句 → 英文整句 → 低头（中）→ lower one's head（英）→ 故乡（中）→ hometown（英） |
| p07 | 这是今天的词汇小票 → 今天学会了一首唐诗 |

- 29 条音轨，54.98s
- 中文：火山 `zh_female_meilinvyou_uranus_bigtts`
- 英文：ElevenLabs Bella
- p01 的《静夜思》中文标题、英文标题与作者分轨朗读
- p01 / p06 英文 / p08 英文为整句朗读
- p02–p05 的英文整句均保留
- 两个词都保留中文和英文，不因同页双词而删减

## 页面规则

- 气泡：完整中文诗句 + 拼音 + 中文朗读
- 答句：完整诗句 + 英文押韵 + 词条
- p05：答句用挖空 + 词条；英文整句仍然朗读并显示
- 目标词在汉字、拼音、英文里同色
- `明月 = bright moon`，不是 moonlight
- `故乡 = hometown`；诗句里的 `home` 是意译

## 制作

- 8 页场景，Momo 每页有动作变化
- p01 窗边阅读 → p04 抬头望月 → p08 合书
- 低饱和月白 / 灰蓝 / 墨蓝 / 燕麦 / 暖灯黄
- 原地渲染，避免 runtime 旧音频

## 已知小问题

- p06 全诗卡覆盖了 Momo 的头部，画面主体偏文字。
- p07 词汇小票下半部留白较多。
- p05 挖空线在缩略图里偏淡，全尺寸可见。
- p02–p05 每页信息量较高，阅读节奏偏慢是刻意设计。

## 渲染

```powershell
cd production/episodes/07-momo-reading-01
$env:PORTRAIT = "1"
node <workspace>/.runtime/research/whiteboard/engine/tools/render.mjs --fps 30 --skip-subs --workers 3
```
