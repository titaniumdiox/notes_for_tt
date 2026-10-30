# 奶茶点单 v3 · 视觉 Brief

音频已锁定：60.3s，25 条 cue，火山中文 + Bella 英文开场。  
下一阶段只替换视觉，不改时间轴和配音。

## 目标

先做 3 张 style frame：

1. **开场/场景**：奶茶店柜台 + Momo 店长
2. **词页**：Momo 拿杯子 + 气泡问句 + 答句
3. **小票页**：Momo 双手递小票

通过后再做 12–16 张场景/姿态，铺满整条。

## 视觉方向

**暖纸 + 扁平 2D + 粗墨线 + 有限色板。**

- 纸张：暖米白，细颗粒
- 线条：深墨蓝，粗细 6–8px（按 1080 宽）
- 主色：赭红 `#C94C3B`、鼠尾草绿 `#7A8B7F`、芥末黄 `#C4A060`
- 阴影：单层平涂，不做渐变
- 角色：2.5 头身，圆脸、短腿、粗尾巴
- 禁止：3D、写实照片、复杂渐变、发光、图内文字

## Momo 角色卡（待确认）

- 固定：奶油色猫、圆头、短耳、粗墨线、2.5 头身
- 可变：围裙/围巾/背包/厨师帽、手持道具、表情
- 本集：赭红围裙 + 奶茶杯 + 店员名牌
- 表情：neutral / happy / blink / surprised
- 姿态：stand / hold cup / point / present receipt

## 资产清单

| 资产 | 规格 | 用途 |
|---|---|---|
| `momo-apron-hold.png` | 1200×1600，透明 | 词页左侧 |
| `momo-apron-point.png` | 1200×1600，透明 | 指气泡 |
| `momo-apron-receipt.png` | 1200×1600，透明 | 小票页 |
| `bg-counter.png` | 1080×1920 | 开场/词页背景 |
| `bg-receipt.png` | 1080×1920 | 小票页背景 |
| `prop-cup.png` | 600×600，透明 | 杯子特写 |
| `prop-receipt.png` | 600×800，透明 | 小票 |
| `paper-wipe.png` | 1080×1920，纸纹 | 转场 |

图内**不要生成任何文字**；中文、拼音、英文、小票内容全部由代码叠加。

## 3 张 Style Frame

### Frame 1：柜台开场

```text
Flat 2D vector illustration, warm cream paper texture, thick dark ink outlines,
limited palette of terracotta red, sage green, mustard yellow.
A cute cream-colored cat barista wearing a terracotta apron, standing behind a
small milk tea counter, holding a bubble tea cup. Warm shop interior, menu board
with no readable text, soft afternoon light. Vertical 9:16 composition.
Large empty area in the upper third for title text. No text, no letters, no logos.
No gradients, no 3D, no photorealism.
```

### Frame 2：词页 Momo

```text
Full-body character sheet illustration of the same cream cat barista,
terracotta apron, holding a bubble tea cup, three-quarter view, friendly smile,
thick ink outline, flat colors, warm cream background, transparent background,
vertical 3:4, no text, no shadows on the floor, no gradients.
```

### Frame 3：小票页

```text
The same cream cat barista, both paws holding a blank paper receipt,
standing behind a counter, warm paper texture, terracotta apron,
simple flat 2D, thick ink outline, vertical 9:16,
blank receipt with no readable text, space above for a headline.
```

## 运动规范

- Momo 从画布左侧滑入：0.28s，ease-out，最后 4px 回弹
- 气泡：0.12s 从 0.92 缩放到 1.0
- 词/答句：0.2s 淡入或快速写出
- 倒计时：2s，是唯一连续平滑动画
- 词间：纸色 wipe 0.08–0.10s，不用 0.5s crossfade
- 猫每次词页重新入场；小票页改为双手递票

## 生产顺序

1. 生成 Momo 三视图 + 4 表情
2. 生成 3 张 style frame
3. 人工修线/去背/统一色板
4. 用 Frametell/Remotion 做 3 秒运动测试
5. 通过后再做 12–16 张资产
6. 替换 v3 的占位猫和背景，音频不动

## 工具

优先：

- **火山/即梦 Seedream**：已有火山账户，若能开图像生成就用它
- GPT Image / Midjourney / Flux：能提供角色参考图即可
- 插画师：最稳，但周期和成本更高

无论用哪个，必须能：

- 透明背景 PNG
- 同一角色参考图
- 固定 seed / 参考图
- 手工修线

## 验收

只看三件事：

1. Momo 是否一眼记住、和文字不抢
2. 暖纸/墨线/有限色板是否统一
3. 词页留白是否够，气泡和答句是否清楚

三张通过后，再谈纸色 wipe 和整条动画。
