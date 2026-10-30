# Frametell / whiteboard-teacher-video — 单页视觉测试

## 结论

**可用。** 这是目前最接近“科普解释 + 手绘会动”的工具，明显优于 Pillow 卡片：

- 暖色绘本风 `warm-story`，纸张底、手绘线条、斜线填充
- 图形逐笔生长，不是静态图片
- 竖屏 1080×1920
- 本地 Chrome 渲染，零生图 API 成本
- 复用 ElevenLabs Bella 音频后，字幕自动按真实配音时长生成

但它**不是角色插画**：人物仍是几何剪影/门框，做不了“有表情、有场景的绘本角色”。最终视觉若要求角色插画，仍要 AI 生图或插画师。

## 测试产物

- 视频：[out/auntie-test-portrait-with-subtitles.mp4](out/auntie-test-portrait-with-subtitles.mp4)（16.20s，1080×1920）
- 静帧：[out/frame_12d.png](out/frame_12d.png)
- 页面源码：[pages-portrait/p01.js](pages-portrait/p01.js)
- 口播：[script.js](script.js)
- 配音时间：[voice.js](voice.js) / `audio/*.wav`

测试内容：v3 开头 4 句（三个日常差异 / 称呼 / 美国 first name / 中国关系词），只做“阿姨”一页。

## 安装踩坑（Windows / 无 npm）

工具默认要求 `npm`，本机只有 pnpm。实际可用流程：

```powershell
git clone https://github.com/liangdabiao/whiteboard-teacher-video.git
# 1) sparse checkout 只取 frametell 的 packages/engine → skill/engine
# 2) 在 skill 根目录 pnpm install --ignore-scripts --shamefully-hoist
# 3) 把 ffmpeg.exe 同时放到：
#    skill/node_modules/ffmpeg-static/ffmpeg.exe
#    skill/engine/node_modules/ffmpeg-static/ffmpeg.exe
```

`ftlib.py` 只从 `engine/node_modules/ffmpeg-static` 找 ffmpeg，所以第二份是必须的。

## 两个已知问题

1. **竖屏 lint 误报**：`engine/tools/checks.mjs` 的安全区还是横屏常量（x 40–1880 / y 30–1060 / 字幕带 y>905），所以竖屏里 y>1060 的内容会被报 `off-canvas`。实际 1080×1920 渲染正常；这次用“渲染后看静帧”而不是 lint 全绿来判断。
2. **`ftnew --style warm-story` 生成的 `script.js` 仍写 `style:'study'`**；需要手动改成 `warm-story`。页面模板也仍是横屏坐标（x=960），竖屏必须自己按 1080 宽重排。

## 对 v3 的建议

- 用它重做 12 页图解，风格选 `warm-story` 或 `study`。
- 每页 2–4 个元素，不做满；字幕带以下留空。
- 称呼/礼物/小费三页最适合：门框、礼盒、账单、关系线都是它的强项。
- 角色场景仍建议 AI 生图/插画师；Frametell 负责“图解动画”而不是“角色表演”。

## 复现

项目源在 `.runtime/research/frametell-test`（未提交，依赖约 130MB）。  
本目录只保留脚本、音频、成片和静帧；重新渲染需要按上面的安装步骤准备引擎。

引擎许可：AGPL-3.0-only，作为独立进程调用；skill 本身 MIT。不要把引擎源码复制进闭源项目。
