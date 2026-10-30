# Momo · 角色设定 v1

> 目标：一个能长期复用、能换装、能在 1080×1920 里一眼认出的猫店长。  
> AI 生图只做参考；最终资产是分层矢量，不直接拿 AI 位图当成品。

## 1. 身份

- 名字：**Momo**
- 物种：猫
- 角色：小店店长 / 讲解员 / 对话提问者
- 性格：好奇、温和、轻微呆萌；不卖萌过度
- 不说话时也能通过姿态表达“问 / 指 / 递 / 等”

## 2. 轮廓与比例

- **2.5 头身**：头大、身体短、腿短
- 在 1080 宽画面里，站立高度约 **560px**，宽约 **340px**
- 头：宽约 220px，圆中带方，脸颊略宽
- 耳朵：短三角，耳尖略圆，不尖锐
- 身体：梨形/圆角矩形，肚子略圆
- 四肢：短粗，爪子不分指；**不画人手**
- 尾巴：粗、向上弯，**尾尖奶油色**

```text
      /\   /\
     /  \_/  \
    |  ◕   ◕  |
    |    △    |
     \  ‿‿  /
      \_____/
     /|     |\
    / | 围裙 | \
      |_____|
      /     \
```

## 3. 固定识别点（70% 不变）

1. **鼠尾草绿领巾**：所有服装下都保留
2. **奶油色尾尖**：剪影识别
3. **赭红围裙 + 小杯子徽章**：工作装；徽章不写字
4. 圆脸、短耳、点状眼、无详细毛发
5. 粗墨线、平涂、无渐变

## 4. 脸

- 眼睛：两个深墨色圆点；开心时变成上弯弧线
- 鼻子：小三角，赭红
- 嘴：一条短弧线或“w”形；不露牙
- 胡须：每边 3 根，细线
- 腮红：可选，低饱和，面积小
- 不画眉毛、不画睫毛、不画复杂瞳孔

## 5. 色板

| 名称 | Hex | 用途 |
|---|---|---|
| 奶油 | `#F4E9D8` | 猫身、纸底 |
| 墨蓝 | `#1F2A44` | 线条、文字 |
| 赭红 | `#C94C3B` | 围裙、重点 |
| 鼠尾草 | `#7A8B7F` | 领巾、辅助 |
| 芥末黄 | `#C4A060` | 星星、强调 |
| 纸白 | `#FFF9EF` | 气泡、围裙口袋 |

## 6. 服装变化

| 场景 | 服装 | 道具 |
|---|---|---|
| 奶茶店 | 赭红围裙 + 领巾 | 奶茶杯 |
| 便利店 | 绿色围裙 + 领巾 | 扫码枪/小票 |
| 机场/旅行 | 领巾 + 小背包 | 登机牌 |
| 中餐/厨房 | 厨师帽 + 领巾 | 锅铲/盘子 |
| 冬天/户外 | 领巾 + 围巾 | 热饮 |
| 雨天 | 领巾 + 雨衣 | 伞 |

规则：

- 领巾和尾尖永远保留
- 一次只换一个主服装 + 一个道具
- 不做复杂花纹、不做大面积图案
- 围裙徽章始终是“小杯子”，不写字

## 7. 表情

- `neutral`：点眼 + 短嘴
- `happy`：上弯眼 + 小笑
- `blink`：一条横线眼
- `curious`：头微歪 + 一眼大一眼小
- `surprised`：圆眼 + 小圆嘴
- `proud`：闭眼笑 + 抬头

## 8. 姿态

- `stand`：正面站立，双手自然
- `hold-cup`：双手/单手拿杯
- `point`：一只爪子指向气泡
- `present-receipt`：双手递小票
- `wave`：打招呼
- `think`：爪子托下巴

## 9. 矢量结构

```text
momo/
  base/
    head.svg
    ears.svg
    face-neutral.svg
    face-happy.svg
    body.svg
    tail.svg
    arm-left.svg
    arm-right.svg
    leg-left.svg
    leg-right.svg
  outfits/
    apron-terracotta.svg
    apron-sage.svg
    scarf.svg
    backpack.svg
    chef-hat.svg
  props/
    cup.svg
    receipt.svg
    menu.svg
    qr.svg
  poses/
    stand.svg
    hold-cup.svg
    point.svg
    present-receipt.svg
```

- 每个部件独立图层，锚点固定
- 线宽 8px（按 1080 宽）
- 圆头线帽、圆角连接
- 平涂，无渐变、无投影
- 导出 SVG + @2x PNG

## 10. AI 生图只做参考

第一步只生成 **一张 character sheet**：

- 正面 / 3/4 / 侧面 / 背面
- 4 个表情
- 3 个姿态
- 白底或浅底，不要文字
- 高分辨率，平涂，粗墨线

提示词方向：

```text
Character turnaround sheet of a cute cream-colored cat barista,
2.5 heads tall, round face, short rounded ears, tiny dot eyes, small triangle nose,
sage green neckerchief, terracotta apron with a tiny cup badge,
thick dark ink outlines, flat 2D vector style, limited palette,
front view, three-quarter view, side view, back view,
happy / neutral / blink / surprised expressions,
plain warm white background, no text, no letters, no gradients, no 3D
```

生成后：

1. 选一张最稳的参考
2. 人工在 Figma/Illustrator 重画为分层矢量
3. 不直接 auto-trace 整张图（节点会乱）
4. 先做 `stand + apron + cup` 三个部件，测试复用

## 11. 不要做

- 不加人类手指
- 不画写实毛发
- 不做 3D/渐变/发光
- 不把中文生成在图里
- 不一次生成 20 张
- 不让每集换物种/换脸

## 12. 验收

- 缩到 120px 还能认出是 Momo
- 只换围裙/道具，观众仍认得出
- 词页里不抢文字
- 轮廓适合做滑入/纸色擦除
- 矢量分层能单独换表情/手臂/尾巴

## 待确认

1. 奶油猫 + 鼠尾草领巾 + 赭红围裙 + 奶油尾尖，是否 OK？
2. 2.5 头身、560px 高，是否太大/太小？
3. 点眼 + 小三角鼻 + 短嘴，是否够可爱？
4. 围裙徽章用“小杯子”，是否保留？
5. 第一次只生成 1 张 character sheet，是否同意？
