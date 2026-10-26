# CN Fieldnotes 制作包 v0.1

三集 9:16 竖屏动画/插画样片，用来验证“文化差异镜头 + 轻量中文”的内容模型。

工具选型（一键成片/程序化动画/字幕）见 [tooling-options.md](tooling-options.md)。

## 剧集

| # | 标题 | 时长目标 | scratch 时长 | 支柱 | 中文点 |
| --- | --- | --- | --- | --- | --- |
| 01 | 3 Things Normal in the US, Surprising in China | 54s | **50.75s** | 文化差异 | 长辈 zhǎngbèi |
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
| 01 | [script](episodes/01-us-vs-china/script.md) | [vo](episodes/01-us-vs-china/vo_en.txt) | [shotlist](episodes/01-us-vs-china/shotlist.csv) | [srt](episodes/01-us-vs-china/scratch_en.srt) |
| 02 | [script](episodes/02-lunch-nap/script.md) | [vo](episodes/02-lunch-nap/vo_en.txt) | [shotlist](episodes/02-lunch-nap/shotlist.csv) | [srt](episodes/02-lunch-nap/scratch_en.srt) |
| 03 | [script](episodes/03-marriage-pressure/script.md) | [vo](episodes/03-marriage-pressure/vo_en.txt) | [shotlist](episodes/03-marriage-pressure/shotlist.csv) | [srt](episodes/03-marriage-pressure/scratch_en.srt) |

## 01 集 animatic v1（仅管线测试，不发布）

- [ep01_animatic_v1.mp4](episodes/01-us-vs-china/animatic/ep01_animatic_v1.mp4)：54 秒，1080×1920，30fps
- [animatic README](episodes/01-us-vs-china/animatic/README.md)：验证目标、已知问题、重新生成方式
- **明确结论：v1 的文案、SAPI 音色、静态卡片都不达发布标准；不再用这套方式迭代。**

## 01 集 v2（已重写，等配音）

针对反馈重写为“一个晚餐故事”，不再是三条并列知识点：

- [script-v2.md](episodes/01-us-vs-china/script-v2.md)：44 秒，Alex 叫错称呼 → 送礼物 → 付小费 → 走回家
- [shotlist-v2.csv](episodes/01-us-vs-china/shotlist-v2.csv)：14 个镜头，每 2–4 秒一次视觉变化
- [voice-casting.md](voice-casting.md)：Mei / Alex / Mom 的表演方向、试音句、技术规格

**当前阻塞：没有高质量 TTS key，也没有真人录音。**  
不再用 SAPI 渲染 v2；需要你选：真人配音 / ElevenLabs / OpenAI TTS / Azure Speech。

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

- 脚本/分镜：01 v2 重写完成；02/03 仍是初稿
- scratch 配音：三集都有 SAPI 版本，但**只用于校对时长，v1 已判定不可发布**
- 01 集 animatic v1：**仅管线测试**（8 张场景卡 + SAPI + 字幕，54s；文案/音色/画面均不达发布标准）
- 01 集 v2：脚本/分镜完成，**等高质量配音**
- 正式配音：未开始
- 正式插画/动画：未开始
- 正式字幕：未开始（等最终配音）
- 发布：未开始

scratch 文件的用途：

- `scratch_vo.wav`：听节奏、做 animatic、检查时长
- `scratch_en.srt`：校对字幕断句；正式发布前必须用最终配音重新对齐
- `scratch_timing.json`：每段旁白的实际起止时间

注意：SAPI 不会正确读中文关键词（会把“午休/催婚”读成英文），所以中文关键词只做画面卡片，不靠 scratch 音频。

## 时长结论（scratch）

- **01：50.75s**，比 54s 目标短 3.25s。结尾加 3 秒回顾/提问卡即可，不用加旁白。
- **02：56.17s**，接近 57–62s 的下限；可加 1 秒环境停顿，不要拉长人声。
- **03：59.92s**，正好在 60s；不要再加旁白，靠画面留白。

## 下一步需要定的事

1. **配音路线**：真人 / ElevenLabs / OpenAI TTS / Azure Speech。SAPI 不再使用。
2. 三集是否共用同一套角色和色板（建议共用）。
3. 01 v2 的视觉方向：2D 扁平插画 + 纸张纹理 + 有限色板；需要插画师或图像生成能力。
4. 配音确定后：先做 01 v2 的 44 秒 animatic，再替换精稿。

当前环境没有 ElevenLabs/OpenAI/Azure key；Edge TTS 连接失败。没有 key 的话，建议先找真人录 3 个角色的试音，或只录 Mei 的旁白做第一版。
