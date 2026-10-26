# Voice casting / TTS brief — Episode 01 v2

## 结论

**不再使用 Windows SAPI/Zira 作为发布音色。**  
v1 的机械感不是参数问题，是引擎问题。v2 需要真人或高质量神经 TTS。

优先级：

1. **真人英文配音**（最自然，能演对话）。
2. **ElevenLabs**（对话感好，适合 Mei/Alex 两个角色；需要 key）。
3. **OpenAI TTS**（自然、便宜，适合旁白；对话角色区分弱一些）。
4. **Azure Speech**（稳定，Neural voice 多；需要 key）。
5. 本地 Piper 只做 scratch，不作为发布音色。

当前环境没有以上任何 API key；Edge TTS 在该网络下连接失败（WebSocket 被拒）。所以 v2 的配音需要你选一条：

- 提供 ElevenLabs / OpenAI / Azure 的 key；或
- 找真人录 3 个角色；或
- 先用 Piper 做一版“比 SAPI 好”的 scratch，但仍不发布。

## 角色

### Mei（旁白 + 主角）

- 20 多岁，中国女生，城市生活；英文清晰、自然，有一点国际口音可以，但不要夸张。
- 语气：温暖、干脆、轻微幽默；不是“文化讲解员”，是故事里的当事人。
- 参考：朋友间讲一件刚发生的小事，不是纪录片旁白。

试音句：

> “Auntie. And bring fruit.”

> “Same dinner. Three small translations. Not better, not worse — just a different map.”

### Alex

- 美国男生，20 多岁，轻松、好奇、有礼貌；不是“无知老外”喜剧角色。
- 语气：自然、稍微尴尬；犯错时是真的不好意思，不是搞笑。

试音句：

> “Hi, Linda—”

> “So… what do I call your mom next time?”

### Mom

- 50 多岁，中国女性；英文很少，主要是表情和两个词。
- 语气：热情但有自己的边界；不是严厉长辈。
- 台词： “You didn't have to.” / “No, no.”
- 如果找双语的妈妈角色，可以让她的“No, no”带一点中文口音；不要刻意演。

## 表演方向

- 不要“播音腔”；每句像刚想到的。
- 允许停顿、呼吸、轻笑；TTS 也要在标点处留 150–300ms。
- 不要用夸张的中国口音演喜剧；口音不是笑点。
- 对话场景（门口、餐桌、餐馆）要像两个人真的在说话，不像读稿。
- 旁白只在动作之间出现，不要压着对话。

## 技术规格

- WAV，48kHz，24-bit 或 16-bit；单声道干声。
- 每个角色单独一轨；保留无音乐干声。
- 如果 TTS 支持，开启 **word/sentence boundary**，用于字幕对齐。
- 语速：约 140–150 wpm；不要为了卡 44 秒加速。
- 响度：人声约 -16 LUFS 干声，最终混音 -14 LUFS。

## 试音交付

每个角色录 2 句即可，文件名：

```text
mei_test.wav
alex_test.wav
mom_test.wav
```

同时给一条手机录音也可以，先听表演方向；正式版再进棚/换设备。

## 如果先用 TTS

建议先用 **ElevenLabs** 做 01 的 A/B：

- Mei：年轻女性，温暖、自然、语速稍慢。
- Alex：年轻男性，美式、轻松。
- Mom：年长女性，少量台词。
- 生成后检查：是否像“两个人在说话”，而不是“两个播音员在交替朗读”。

TTS 只解决音色，不解决文案；v2 的台词已经按对话写，不要把旁白读成广告。
