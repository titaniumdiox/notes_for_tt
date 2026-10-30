# Momo 账号头像

状态：**v1 已选，眨眼版为主头像**。

## 主头像

- [momo-avatar-1080.png](momo-avatar-1080.png) — 1080×1080
- [momo-avatar-800.png](momo-avatar-800.png) — 800×800
- [momo-avatar-400.png](momo-avatar-400.png) — 400×400
- [圆形预览](avatar-v1-wink-round.png)

推荐用途：YouTube / TikTok / Instagram / 小红书头像。

## 三版对比

| 版本 | 文件 | 表情 | 用途 |
|---|---|---|---|
| WINK | `avatar-v1-wink.png` | 单眼眨眼 + 微笑 | **主头像**，友好、有记忆点 |
| GRIN | `avatar-v2-grin.png` | 闭眼大笑、张嘴 | 社群、活动、轻松内容 |
| CURIOUS | `avatar-v3-curious.png` | 点眼、歪头、轻微笑 | 正式、教学封面备用 |

对比图：[avatar-contact-sheet.png](avatar-contact-sheet.png)

## 生成参数

- 模型：Seedream 5.0 Flash
- 参考：`../../momo-character-sheet-v1.png`
- 尺寸：1440×1440，输出 1080 / 800 / 400
- 背景：暖奶油 `#F4E9D8`
- 约束：点眼、无眼白高光、无文字、无气泡、无道具、圆形安全区

Prompt：

- [avatar-wink-prompt.txt](../../avatar-wink-prompt.txt)
- [avatar-grin-prompt.txt](../../avatar-grin-prompt.txt)
- [avatar-curious-prompt.txt](../../avatar-curious-prompt.txt)

## 使用注意

- 圆形裁切时耳朵、下巴、领巾都在安全区内。
- 头像本身已带奶油圆形底，叠在深浅背景上都成立。
- 不要加文字；频道名放在 banner / 视频封面，不放头像。
