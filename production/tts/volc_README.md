# 火山引擎豆包 TTS（HTTP/SSE V3）

## 环境变量

写到项目根目录 `.env.local`，不要发聊天，不要提交：

```text
VOLC_TTS_API_KEY=...
VOLC_TTS_RESOURCE_ID=seed-tts-2.0
VOLC_TTS_VOICE_ID=zh_female_meilinvyou_uranus_bigtts
VOLC_TTS_APP_ID=...
VOLC_TTS_ENDPOINT=https://openspeech.bytedance.com/api/v3/tts/unidirectional
```

- 新版 API 主要用 `X-Api-Key` + `X-Api-Resource-Id`
- `APP ID` 可不填；控制台要求就填
- `Resource ID` 必须和音色版本匹配：2.0 音色用 `seed-tts-2.0`
- 如果报 resource mismatch，先检查音色属于 1.0 还是 2.0

## 单条测试

```powershell
python production/tts/volc_tts.py `
  --text "少冰。" `
  --out .runtime/volc-test/shao.mp3 `
  --speed 0.92
```

## 表驱动测试

```powershell
python production/tts/volc_tts.py --table production/tts/volc_test_jobs.csv
```

表字段：

```csv
job_id,kind,text,out,speed,pitch,volume,voice
```

- `speed` 0.92 = 慢 8%
- 奖励语 `speed` 1.08、`pitch` +2
- `voice` 留空时用 `VOLC_TTS_VOICE_ID`
- `kind` 只用于人读，脚本不依赖

## 语速建议

| 类型 | speed |
|---|---|
| 词 | 0.95 |
| 问句 / 例句 | 0.92 |
| 完整答句 | 0.92 |
| 最终整句 | 0.92 |
| 奖励语 | 1.05–1.12 |

## 多音字

`少冰` 先单独跑。如果仍读 shào：

1. 检查 `Resource ID` 和音色版本
2. 试 `text` 为 `少。冰。`，按停顿拆开拼接
3. 仍不对就真人录这一条

不要用别的音源替换整条视频；优先同一音色修正。

## 输出

脚本会：

- 从 SSE `event: 352` 的 `data` 取音频
- 支持 base64、URL、对象三种返回
- 写到 `out`
- 打印字节数，不打印 key

`event: 152` 为结束；`code` 非 0 会报错并重试。
