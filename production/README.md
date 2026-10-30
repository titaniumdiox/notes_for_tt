# CN Fieldnotes 制作包 v0.1

三集 9:16 竖屏动画/插画样片，用来验证“文化差异镜头 + 轻量中文”的内容模型。

工具选型（一键成片/程序化动画/字幕）见 [tooling-options.md](tooling-options.md)。

## 剧集

| # | 标题 | 时长目标 | scratch 时长 | 支柱 | 中文点 |
| --- | --- | --- | --- | --- | --- |
| 01 | Three Everyday Differences（v3） | 52s | 未配音 | 文化差异 | 长辈 / 先谢谢 / 小费 |
| 02 | Why Chinese Offices Go Quiet After Lunch | 57–62s | **56.17s** | 日常生活/工作 | 午休 wǔxiū |
| 03 | 29, Unmarried, and Home for the Holidays | 60–65s | **59.92s** | 家庭/代际 | 催婚 cuīhūn |

每集包含：

- `script.md`：分镜、英文旁白、屏幕字、事实边界
- `vo_en.txt`：纯旁白，供 TTS/配音使用
- `shotlist.csv`：镜头表，可导入剪辑/动画工具
- `scratch_vo.wav`：SAPI 临时音轨，仅校对时长
- `scratch_en.srt`：按 scratch 音轨生成的临时字幕
- `scratch_timing.json`：每段旁白的实际起止时间

## 文件索引

| 集 | 脚本 | 旁白 | 镜头表 | scratch 字幕 |
| --- | --- | --- | --- | --- |
| 01 | [script-v3](episodes/01-us-vs-china/script-v3.md) | [vo-v3](episodes/01-us-vs-china/vo_v3.txt) | [shotlist-v3](episodes/01-us-vs-china/shotlist-v3.csv) | —（未配音） |
| 02 | [script](episodes/02-lunch-nap/script.md) | [vo](episodes/02-lunch-nap/vo_en.txt) | [shotlist](episodes/02-lunch-nap/shotlist.csv) | [srt](episodes/02-lunch-nap/scratch_en.srt) |
| 03 | [script](episodes/03-marriage-pressure/script.md) | [vo](episodes/03-marriage-pressure/vo_en.txt) | [shotlist](episodes/03-marriage-pressure/shotlist.csv) | [srt](episodes/03-marriage-pressure/scratch_en.srt) |

## 01 集 animatic v1（仅管线测试，不发布）

- [ep01_animatic_v1.mp4](episodes/01-us-vs-china/animatic/ep01_animatic_v1.mp4)：54 秒，1080×1920，30fps
- [animatic README](episodes/01-us-vs-china/animatic/README.md)：验证目标、已知问题、重新生成方式
- **明确结论：v1 的文案、SAPI 音色、静态卡片都不达发布标准；不再用这套方式迭代。**

## 01 集 v3（当前版本，科普介绍）

按你的反馈回到“介绍科普”，不写剧情对话；用三条日常差异 + 更好的转场，修掉 v1 的清单感和绝对化表达：

- [script-v3.md](episodes/01-us-vs-china/script-v3.md)：52 秒，三条差异（称呼 / 礼物 / 小费）
- [vo_v3.txt](episodes/01-us-vs-china/vo_v3.txt)：单人英文旁白，130 词，约 52–54 秒
- [shotlist-v3.csv](episodes/01-us-vs-china/shotlist-v3.csv)：12 个镜头，每 3–5 秒一次视觉变化
- [voice-casting.md](voice-casting.md)：配音路线 + GPT-SoVITS 评估

配音样本（ElevenLabs 免费账户，`eleven_multilingual_v2`）：

- [Bella（女声，48.20s）](episodes/01-us-vs-china/tts/bella.mp3)
- [George（男声，48.61s）](episodes/01-us-vs-china/tts/george.mp3)
- 说明：[production/tts/README.md](tts/README.md)。免费账户不能通过 API 用 Charlotte/Rachel（402）；Bella/George 可用。

已选 **Bella**，并生成带时间戳的版本：

- [ep01_v3_animatic_v1.mp4](episodes/01-us-vs-china/animatic-v3/ep01_v3_animatic_v1.mp4)：52 秒，12 个镜头，Bella 配音，字符级时间戳字幕
- [animatic-v3/README.md](episodes/01-us-vs-china/animatic-v3/README.md)
- `bella_timed.mp3` 49.46s；`bella.srt` 17 条 cue；`bella.ass` 1080×1920

George 保留为备选，不做时间戳。

v2 的故事稿（`script-v2.md`）保留作对照，但**不是当前方向**，不用于制作。

下一步：看 v3 animatic 的节奏/字幕/画面；通过后再做正式插画和转场。

## 视觉工具验证：Frametell

交接包里同作者后来做的 [whiteboard-teacher-video](https://github.com/liangdabiao/whiteboard-teacher-video) 已在本机跑通单页测试：

- [out/auntie-test-portrait-with-subtitles.mp4](experiments/frametell-01/out/auntie-test-portrait-with-subtitles.mp4)：16.2s，1080×1920，`warm-story`，Bella 配音
- [README](experiments/frametell-01/README.md)：安装踩坑、竖屏 lint 误报、结论

结论：**用它做 v3 的图解动画，不再用 Pillow 画最终画面。**  
它仍不是角色插画；角色场景要 AI 生图或插画师。

## 奶茶点单 60 秒 animatic

按“5 个词 + 2 秒倒计时 + 完整对话 + 5/5 奖励 + 小票总结”做的第一条样品：

- [milk-tea-animatic-v1.mp4](experiments/milk-tea-animatic/out/milk-tea-animatic-v1.mp4)：59.9s，1080×1920，Xiaoxiao 中文配音
- [README](experiments/milk-tea-animatic/README.md)：时间轴、5 个问句、小票文案、已知问题
- 词：奶茶 / 半糖 / 少冰 / 打包 / 谢谢
- 最终句：一杯奶茶，半糖少冰，打包，谢谢

这是“字 + 音 + 倒计时 + 小票”格式的 first cut；下一步用真人录音替换 Edge TTS，再做 2–3 条同类场景验证留存。

## 奖励语词库

- [rewards.csv](assets/rewards/rewards.csv)：36 条，按 calm / warm / food / sports / travel / final / cute 分类
- [README](assets/rewards/README.md)：语速规则、轮换规则、推荐套组、脚本引用格式
- 词、例句、奖励语分三种语速：词 0.95×，例句 0.90×，奖励 1.04–1.12×
- 运动/比赛套组更短更冲；教学套组更平静；食物/旅行有场景词
- 脚本只引用 `R01`–`R36`，不直接写句子

## 视觉系统

- 画幅：9:16，1080×1920，30fps
- 风格：2D 扁平插画 + 轻动画，粗描边，有限色板
- 色板：墨蓝 `#1F2A44`、暖红 `#C94C3B`、米白 `#F4E9D8`、灰绿 `#7A8B7F`
- 字体：英文用无衬线（Inter/Archivo），中文用思源黑体；关键词卡加粗
- 字幕：英文主字幕，底部安全区；中文只做关键词卡，不做逐句双语
- 避免：3D、真人素材、满屏红金“中国风”、夸张口音

## 固定角色（可选，但建议）

- **Mei**：中国女生，20 多岁，城市上班族，冷幽默，不是“文化讲解员”
- **Alex**：美国朋友，好奇但不无知，不是“老外丑角”
- **Auntie**：Mei 的阿姨，热情、直接、有点催婚

角色只做叙事工具，不承担“代表所有中国人/美国人”的功能。

## 建议制作顺序

1. 锁定 `vo_en.txt`，先做 30 秒内的 scratch VO，检查语速。
2. 用实际音频做字幕时间轴（见 [pipeline.md](pipeline.md)），不要平均估算。
3. 按 `shotlist.csv` 做粗 animatic（可用色块/剪影），先看节奏。
4. 通过后再做精稿插画/动画。
5. 三集一起做 QA，不要单集反复打磨到完美。

## 当前状态

- 脚本/分镜：01 v3 科普介绍版完成；02/03 仍是初稿
- scratch 配音：三集都有 SAPI 版本，但**只用于校对时长，已判定不可发布**
- 01 集 animatic v1：**仅管线测试**（54s；文案/音色/画面均不达发布标准）
- 01 集 v2 故事稿：**保留作对照，不是当前方向**
- 01 集 v3：脚本/分镜完成；**Bella 配音 + 52s animatic 完成**
- 正式配音：Bella 已选定；George 备选
- 正式字幕：字符级时间戳 v1 完成（`bella.srt` / `bella.ass`）
- 正式插画/动画：未开始（animatic 仍是场景卡）
- 发布：未开始

scratch 文件的用途：

- `scratch_vo.wav`：听节奏、做 animatic、检查时长
- `scratch_en.srt`：校对字幕断句；正式发布前必须用最终配音重新对齐
- `scratch_timing.json`：每段旁白的实际起止时间

注意：SAPI 不会正确读中文关键词（会把“午休/催婚”读成英文），所以中文关键词只做画面卡片，不靠 scratch 音频。

## 时长结论

- **01 v3：Bella 48.20s / George 48.61s**；目标 52 秒，留约 3–4 秒结尾卡。
- **02：56.17s**（旧 SAPI），接近 57–62s 的下限；正式配音后重算。
- **03：59.92s**（旧 SAPI），约 60s；正式配音后重算。

## 下一步需要定的事

1. **看两个测试**：v3 animatic（节奏/字幕）+ Frametell 单页（视觉语言）。
2. 用 Frametell 重做 12 页图解；先做称呼/礼物/小费三页，确认风格一致。
3. 角色场景（门口、餐桌）用 AI 生图或插画师做 3 张 style frame，再决定是否替换 Frametell 的剪影。
4. 三集是否共用同一套角色和色板（建议共用）。
5. 通过后加转场、音效、背景音乐，再做 02/03。

ElevenLabs 已接入：key 在 `.env.local`（尾号 bdd7，已 gitignore）。Bella 已选，George 备选；详见 [tts/README.md](tts/README.md)。
