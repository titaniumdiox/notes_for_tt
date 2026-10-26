# Episode 01 Animatic v1（已判定不达发布标准）

> 这版只保留作管线记录：文案是清单式、SAPI 音色机械、静态卡片粗糙。  
> 不再基于这一版迭代；v2 见 [script-v2.md](../script-v2.md) 和 [shotlist-v2.csv](../shotlist-v2.csv)。

- 文件：`ep01_animatic_v1.mp4`
- 时长：54.00s
- 画幅：1080×1920，9:16，30fps
- 音轨：`scratch_vo.wav`（Windows SAPI/Zira，仅校对时长）
- 字幕：`scratch_en.ass`，由 `scratch_en.srt` 转换；PlayRes 1080×1920，44px，底部安全边距
- 画面：8 张场景卡（`card_01.png`…`card_08.png`），不是最终插画

## 这一版验证什么

1. 前 3 秒钩子是否成立（“Linda / 阿姨”）。
2. 54 秒的节奏是否太慢；每张卡 5–9 秒，静态卡是否还能看。
3. 字幕在 9:16 底部安全区是否可读。
4. 旁白与场景切换是否对齐；结尾 3 秒是否留够。

## 已知问题

- 静态卡片、硬切，不是最终动效；正式版需要插画/轻动画/转场。
- 字幕沿用 scratch SRT 的分句，个别长句会在中途换行/换 cue；正式配音后要重新按语义断句。
- scratch 音色机械，不能发布。
- 卡片里有较多留白，是给最终插画留的位置。

## 重新生成

```powershell
$py = "C:\Users\12345\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
& $py production\scripts\make_animatic.py
```

渲染（在 `production/episodes/01-us-vs-china` 目录下）：

```powershell
$ff = "E:\cnfieldnotes\.runtime\pydeps\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
& $ff -y -f concat -safe 0 -i animatic\concat.txt -i scratch_vo.wav `
  -vf "fps=30,ass=animatic\scratch_en.ass" `
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -r 30 `
  -c:a aac -b:a 192k -t 54 animatic\ep01_animatic_v1.mp4
```

当前使用的是 `imageio-ffmpeg` 自带二进制，不依赖系统 PATH；该二进制在 `.runtime/` 下，不提交到仓库。

## 下一版

- 把 8 张卡替换成正式插画/角色。
- 加入 0.2–0.4 秒转场或轻动效。
- 正式配音后重做 SRT/ASS，并逐句对齐。
- 加背景音乐/音效，人声做 -14 LUFS 左右的响度处理。
