# Sinofieldnotes 制作包

对外品牌：**Sinofieldnotes**  
当前格式：**60 秒竖屏中文学习短片**，一个场景、5 个词、1 个完整句。  
硬规则：**无 BGM、无音效**，只保留人声与静默。

## 当前成片

> 状态：**04 冻结；05 新片完成**。

- 05 · 中国早餐：[成片](episodes/05-breakfast/out/breakfast-v1.mp4) · [制作说明](episodes/05-breakfast/README.md)
- 04 · 奶茶点单：[完整场景版](episodes/04-milk-tea-order/out/milk-tea-v3-scenes-demo.mp4)
- [封面](assets/mascot/cover.png)
- [账号头像](assets/mascot/avatar/README.md)
- [制作说明](episodes/04-milk-tea-order/README.md)
- [场景素材库](assets/mascot/scenes/README.md)
- [视频生产 skill](../skills/sinofieldnotes-video/SKILL.md)

## 目录

```text
production/
  assets/
    mascot/            Momo 角色设定、场景图、封面
    rewards/           36 条奖励语词库
  episodes/
    04-milk-tea-order/ 当前正式 demo
    01-us-vs-china/    早期脚本（legacy）
    02-lunch-nap/      早期脚本（legacy）
    03-marriage-pressure/ 早期脚本（legacy）
  archive/
    milk-tea-v2/       v2 占位 demo
    milk-tea-animatic/ 第一条 60s animatic
    frametell-01/      Frametell 单页测试
  tts/                 火山 TTS 适配器与任务表
  scripts/             早期 Pillow 合成脚本
```

## 当前 demo

| 项 | 值 |
|---|---|
| 时长 | 60.3s |
| 画幅 | 1080×1920，30fps |
| 中文音色 | 火山 `zh_female_meilinvyou_uranus_bigtts` |
| 英文开场 | ElevenLabs Bella |
| 场景 | p02–p08 为 AI 场景；p01 为虚化背景 + 思考 Momo |
| 转场 | 仍是 Frametell 页面过渡，纸色擦除未接 |
| 声音 | 仅人声，无 BGM / 音效 |

## 生产流程

不要从空白开始。按 skill 走：

1. 选题评分：3 个候选，≥10 分才做
2. 5 词 + 1 句：全部进句
3. 色调与场景：Momo 设定图作参考，逐页重绘
4. 火山 TTS：词 0.95 / 问答 0.92 / 奖励 1.08
5. Frametell 合成：场景图 + 擦除词卡 + 玻璃答句 + 奖励印花
6. 渲染：`--fps 30 --skip-subs --workers 3`
7. QA 与归档

详见：[skills/sinofieldnotes-video/SKILL.md](../skills/sinofieldnotes-video/SKILL.md)

## 资产

- [Momo 角色卡](assets/mascot/momo-character-bible.md)
- [Momo 第一版设定图](assets/mascot/reference/momo-character-sheet-v1.png)
- [场景素材库](assets/mascot/scenes/README.md)
- [奖励语词库](assets/rewards/README.md)
- [火山 TTS 适配器](tts/volc_tts.py)

## 归档规则

- 正式集：`production/episodes/NN-slug/`
- 旧实验：`production/archive/`
- 弃用但保留的场景：`assets/mascot/scenes/` 或 `archive/rejected/`
- 每集必须保留：`script.js`、`voice.js`、pages、audio、scene images、cover、final MP4、jobs CSV、README
