# CN Fieldnotes 制作包 v0.1

三集 9:16 竖屏动画/插画样片，用来验证“文化差异镜头 + 轻量中文”的内容模型。

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

- 脚本/分镜：完成初稿
- scratch 配音：**三集都已完成**（Windows SAPI，仅校对时长，不可发布）
- scratch 字幕：三集都有 `scratch_en.srt`，按实际音频生成
- 正式配音：未开始
- 插画/动画：未开始
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

1. 正式英文配音用真人还是 TTS；如果是 TTS，选温暖、中性、不过度戏剧化的声音。
2. 三集是否共用同一套角色和色板（建议共用）。
3. 先做哪一集：建议 01 → 02 → 03，先易后难。
4. 下一步制作动作：先用 scratch 音轨做 01 的 animatic（色块/剪影），检查前 3 秒和中段节奏。
