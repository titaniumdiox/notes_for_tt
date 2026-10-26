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

1. **看 v3 animatic**：重点判断 Bella 的语速/停顿、52 秒节奏、字幕是否挡画面。
2. 定 3 张 style frame（门口 / 餐桌 / 餐馆），再替换 12 张场景卡。
3. 三集是否共用同一套角色和色板（建议共用）。
4. 通过后加转场、音效、背景音乐，再做 02/03。

ElevenLabs 已接入：key 在 `.env.local`（尾号 bdd7，已 gitignore）。Bella 已选，George 备选；详见 [tts/README.md](tts/README.md)。
