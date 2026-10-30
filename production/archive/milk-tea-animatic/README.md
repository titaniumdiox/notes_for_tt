# 奶茶点单 · 60 秒 animatic v1

- 成片：[out/milk-tea-animatic-v1.mp4](out/milk-tea-animatic-v1.mp4)
- 时长：**59.9s**
- 画幅：1080×1920，30fps
- 风格：Frametell `study`（暖纸、墨色、红色强调）
- 配音：Edge TTS **Xiaoxiao**（zh-CN-XiaoxiaoNeural），语速 1.0
- 字幕：不烧录；信息全部在画面内
- 词量：**5 个新词 + 1 句完整对话**

## 结构

| 时间 | 页面 | 内容 |
|---|---|---|
| 0–5.7s | p01 | 场景钩子 + 5 词地图 |
| 5.7–13.4s | p02 | 奶茶 nǎichá |
| 13.4–21.2s | p03 | 半糖 bàntáng |
| 21.2–28.9s | p04 | 少冰 shǎobīng |
| 28.9–36.5s | p05 | 打包 dǎbāo |
| 36.5–45.1s | p06 | 谢谢 xièxie |
| 45.1–50.5s | p07 | 完整句子 |
| 50.5–59.9s | p08 | 5/5 奖励 + 小票总结 |

每个词 8 秒左右，固定 4 拍：

1. 汉字最大 + 拼音 + 英文义
2. 问句留空
3. 2 秒倒计时
4. 答案揭晓 + “say it”

## 5 个词与问句

| 词 | 拼音 | 问句 | 答案 |
|---|---|---|---|
| 奶茶 | nǎichá | 我要一杯 ____。 | 奶茶 |
| 半糖 | bàntáng | 糖度要 ____。 | 半糖 |
| 少冰 | shǎobīng | 冰块要 ____。 | 少冰 |
| 打包 | dǎbāo | 要在这儿喝吗？ | 打包 |
| 谢谢 | xièxie | 店员递给你，你说 ____。 | 谢谢 |

最终句：

> 一杯奶茶，半糖少冰，打包，谢谢。

## 小票

p08 同时承担奖励、总结、读写锚点：

- 5/5 + “你今天又学会了 5 个词”
- 5 行：汉字 / 拼音 / 英文 / 短例句
- 最终句
- “5 words · 1 sentence”
- “You can order a milk tea in Chinese now.”
- `PAUSE TO READ / 截图保存`
- `LEARNED` 印章

## 已知问题

- 这是 **animatic**，不是最终视觉；没有背景音乐、音效、转场。
- 配音是 Edge TTS，不是母语者录音；正式版建议替换。
- p05 是“要在这儿喝吗？”的 yes/no 问句，没有留空；其他 4 个词有留空。
- 小票信息密度高，是故意让用户暂停阅读；正式版需要再调字号/行距。
- Frametell 的竖屏 lint 仍按横屏安全区报错；这版的判断以实际渲染帧为准。

## 重新生成

```powershell
# 1. 配音（Edge TTS，20 条 cue）
$env:PYTHONPATH = (Resolve-Path '.runtime/pydeps-edge').Path
$env:PORTRAIT = '1'
cd .runtime/research/whiteboard
python scripts/ftvoice.py ..\milk-tea --backend edge --voice mature --speed 1.0

# 2. 渲染（12 worker 会内存不足，用 3）
cd ..\milk-tea
node ..\whiteboard\engine\tools\render.mjs --fps 30 --skip-subs --workers 3
```

Edge TTS 输出带约 1.2 秒尾静音；本项目用“反向裁尾”去掉首尾静音，再重跑 `ftvoice` 更新 `voice.js` 时长。

## 文件

- `script.js`：8 页、20 条 cue
- `pages-portrait/p01–p08.js`：页面代码
- `extras/word.js`：5 个词共用的单词页组件
- `voice.js` + `audio/`：Xiaoxiao 的逐句 WAV
- `out/hook.jpg`、`out/receipt.jpg`：静帧
