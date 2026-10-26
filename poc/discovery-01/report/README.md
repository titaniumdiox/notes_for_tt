# PoC-01：TikTok 关键词发现验证报告

- 运行日期：2026-10-26（Asia/Shanghai）
- 关键词：`Chinese daily life`
- 目标：最多 5 页，每页目标 50 条
- 结论：**接口可用、分页可用、数据质量可接受，但只完成 3 页就耗尽结果；目前只能作为 PoC baseline，还不能证明长期稳定。**

## 1. 环境与启动

| 项目 | 实际值 |
| --- | --- |
| 系统 | Windows |
| Git | 2.43.0 |
| Node.js | v24.21.0（DSH 随附运行时） |
| pnpm | 11.28.5 |
| Python | 3.14.3 |
| Docker | 未安装，走非 Docker 方案 |
| 网络 | Clash for Windows，`127.0.0.1:7890` |
| 服务地址 | `http://127.0.0.1:3000` |

启动参数：

```powershell
$env:NODE_PATH = (Resolve-Path 'node_modules\.pnpm\node_modules').Path
$env:PORT = '3000'
$env:TIKTOK_TRANSPORT = 'undici'
$env:TIKTOK_PROXY_URL = 'http://127.0.0.1:7890'
$env:TIKTOK_MAX_RETRIES = '0'
$env:TIKTOK_MIN_REQUEST_INTERVAL_MS = '1500'
node dist/main.js
```

健康检查结果（原始文件：[health_before.json](health_before.json)）：

- `status: ok`
- `transport.inUse: undici`
- `transport.chromeHandshake: false`
- `upstream.reachable: true`
- `upstream.elapsedMs: 1370`
- `proxy: true`

说明：

- 本机直连 TikTok 不可达；Clash 代理开启后，`undici` 可以访问搜索接口。
- 本次没有使用 `node-tls-client`。它能在 Node 24 上加载，但当前代码没有把 `TIKTOK_PROXY_URL` 传给 TLS Session，独立探测请求失败；搜索接口用 undici 已经可用。
- `pnpm` 的 junction 布局导致 `node-tls-client` 找不到同级依赖，需要设置 `NODE_PATH`。这是本地运行细节，不是数据结论。

## 2. 采集与分页结果

采集脚本：[collect.py](../scripts/collect.py)  
原始清单：[manifest.json](../manifest.json)

| 页 | HTTP | 应用状态 | data 行数 | 其中视频数 | 传入 offset | 返回 cursor | has_more | 结果 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 200 | 0 | 53 | 52 | 0 | 50 | 1 | 成功 |
| 2 | 200 | 203 | 49 | 49 | 50 | 100 | 1 | 成功（203） |
| 3 | 200 | 203 | 90 | 90 | 100 | 150 | 0 | 成功（203），停止 |

- 总原始行数：**192**
- 视频行数：**191**
- 非视频行：**1**（第 1 页第 41 行，`type: 4` 的用户卡片，已剔除）
- 成功页数：**3 / 5**
- 停止原因：`has_more_false`
- 分页是否推进：**是**，`0 → 50 → 100 → 150`
- 请求失败数：**0**

为确认 `has_more=0` 不是假信号，又用第一页 `impr_id` 请求 `offset=150`：

- HTTP 200
- `data: []`（0 条）
- `cursor: 200`
- `has_more: 0`

结论：**结果确实耗尽**，不是分页标志错误。证据见 [page_004_probe.json](../raw/page_004_probe.json) 和 [pagination_probe.json](pagination_probe.json)。

## 3. 数据质量

规范化脚本：[normalize.py](../scripts/normalize.py)  
指标文件：[metrics.json](metrics.json)

| 指标 | 结果 |
| --- | --- |
| 唯一视频数 | **191** |
| 唯一创作者数 | **163** |
| 重复视频数 | **0** |
| 重复率 | **0.00%** |
| 广告条目 | 2 |
| 图文帖子 | 44 |
| 平均每个创作者视频数 | 1.17 |

字段缺失率（按 191 条唯一视频计算）：

| 字段 | 缺失数 | 缺失率 |
| --- | --- | --- |
| video_id / video_url | 0 | 0% |
| desc | 1 | 0.52% |
| create_time | 0 | 0% |
| creator_id / secUid / username / nickname | 0 | 0% |
| play / digg / comment / share / collect | 0 | 0% |
| hashtags | 19 | 9.95% |
| music_id / duration | 0 | 0% |
| follower_count | 0 | 0% |

发布时间范围：`2023-08-07T09:10:39Z` 到 `2026-10-26T01:00:00Z`。

高频标签：`#china` 90 条、`#chinese` 28 条、`#fyp` 27 条、`#chinalife` 23 条、`#Vlog` 20 条。

## 4. 语义相关性抽样

抽样脚本：[sample_relevance.py](../scripts/sample_relevance.py)  
人工标注：[relevance_review.csv](relevance_review.csv)  
汇总：[relevance_summary.json](relevance_summary.json)

抽样方式：`random.Random(20261026).sample(videos.jsonl, 30)`，共 30 条。

| 标签 | 数量 | 占比 |
| --- | --- | --- |
| 2 = 直接相关 | 21 | 70.0% |
| 1 = 邻近相关 | 7 | 23.3% |
| 0 = 跑题 | 2 | 6.7% |
| 2 + 1 | 28 | **93.3%** |

判定标准：

- **2**：直接讲中国日常生活、文化、旅行或在华生活体验。
- **1**：中国相关但更窄，例如美食、中文学习、批发市场/商业，或上下文较弱。
- **0**：没有中国或日常生活信号，或纯泛化内容。

两条 0 分样本：

- `In short, KNOW URSELF`：无中国/日常信号。
- 泛化 aesthetic vlog：无中国信号。

说明：这是单人、单次、30 条的主观标注，不是稳定准确率；它的作用是给出可复查的基线，而不是宣称 93.3% 是长期精度。

## 5. 复跑与跨关键词验证

在第一次采集后不久，用同一关键词、同样 `5 × 50` 复跑一次，保存到 `poc/discovery-01-repeat/`。

| 指标 | 第一次 | 复跑 |
| --- | --- | --- |
| 成功页数 | 3 | 3 |
| 停止原因 | `has_more_false` | `has_more_false` |
| 应用状态序列 | 0, 203, 203 | 0, 203, 203 |
| 每页行数 | 53, 49, 90 | 53, 50, 90 |
| 唯一视频 | 191 | 192 |
| 唯一创作者 | 163 | 162 |

重叠情况：

- 视频交集：**156** 条
- 第一次独有：35 条；复跑独有：36 条
- 相对第一次的重叠率：**81.68%**
- Jaccard：**0.6872**
- 第 1 页交集：42 / 52（80.77%）
- 创作者交集：137；Jaccard：0.7287

完整对比：[comparison.json](../../discovery-01-repeat/report/comparison.json)。

解读：

- **分页结构高度稳定**：两次都是 3 页、同样的状态码序列、第 3 页都是 90 条、都因 `has_more=0` 停止。
- **结果集约 81% 重叠**，每次有约 18–19% 的新视频。对搜索型 feed 来说这不意外，但意味着“单次采集”不能当作完整快照。
- 这次复跑仍然只覆盖同一关键词、同一时间段，不能替代多关键词和跨时间段验证。

### 第二关键词：`living in China`

| 指标 | 结果 |
| --- | --- |
| 成功页数 | 4 |
| 停止原因 | `has_more_false` |
| 唯一视频 | 208 |
| 唯一创作者 | 157 |
| 重复 | 0 |
| 203 出现位置 | 第 1、2 页 |
| 相关 + 邻近 | 90.0% |

第二个关键词同样是自然耗尽，没有请求失败；203 出现在第 1、2 页，说明它**不是“最后一页”或“结果池尾部”的专属信号**。详细报告：[discovery-02/report/README.md](../../discovery-02-living-in-china/report/README.md)。

## 6. 关键发现

1. **`status_code=203` 不等于失败，但也不能无条件当成功。**  
   第 2、3 页都是 203，且都返回了可用数据；第 3 页甚至返回 90 条。说明 README 里“203 结果正常”的说法在本次运行中成立。但 203 仍然可能是上游降级/软拦截信号，必须同时看 `data` 数量、分页和相关性，不能只看状态码。

2. **`count=50` 不是精确条数。**  
   第 1 页返回 53 行（52 个视频 + 1 个用户卡片），第 2 页 49 条，第 3 页 90 条。分页 `cursor` 按请求的 `count` 递增（50、100、150），不是按实际返回行数。**下一页 offset 必须用响应里的 `cursor`，不能用 `len(data)`。**

3. **`data` 不全是视频。**  
   第 1 页混入 `type: 4` 的用户卡片。统一模型必须先过滤非视频行，否则会把用户卡片当视频。

4. **这个关键词的搜索池是有限的。**  
   191 条唯一视频后 `has_more=0`，再请求 `offset=150` 返回空。因此“5 页 × 50 条”的目标没有达成，不是请求失败，而是结果耗尽。

5. **代理是硬依赖。**  
   本机直连 TikTok 不通；当前可用链路是 `undici + Clash`。如果后续要访问需要 Chrome TLS 的接口，当前代码还需要把代理传给 `node-tls-client` 或 `curl_cffi`，这是长期架构要补的适配点。

6. **同词复跑结构稳定，第二关键词也成立；跨时间段仍未验证。**  
   `Chinese daily life` 两次运行的分页/状态序列完全一致，视频重叠约 81.7%；`living in China` 也以同样方式自然耗尽（4 页、208 条、90% 相关或邻近）。目前可以支持继续做 PoC，但还不足以证明跨小时/跨天稳定。

## 7. PoC 判定

| 验收项 | 结果 |
| --- | --- |
| 健康检查 | 通过 |
| 单页搜索 | 通过 |
| 分页推进 | 通过（3 页） |
| 原始响应保存 | 通过（含 sha256） |
| 按 video_id 去重 | 通过（0 重复） |
| 字段完整性 | 通过（除 hashtags 外接近 100%） |
| 语义相关性 | 可接受（93.3% / 90.0% 相关或邻近） |
| 稳定性 | 初步通过（同词结构一致；第二关键词也自然耗尽） |
| 5 页目标 | **未达成（两个关键词分别 3 页、4 页耗尽）** |

**判定：PoC-01 通过，但附带三个限制：单个关键词的池子只有约 190–210 条、`203` 需要持续监控、跨时间段稳定性尚未验证。**

## 8. 下一步

### 你需要做的

1. **保持 Clash 开启**，并确认 `127.0.0.1:7890` 可用；否则服务无法访问 TikTok。
2. **抽查 [relevance_review.csv](relevance_review.csv)**，尤其是 7 条“邻近相关”和 2 条“跑题”的判定是否符合你的内容口味。这会直接影响后续筛选规则。
3. 如果要开始把成果推到 `titaniumdiox/notes_for_tt`，需要先解决 GitHub 写权限：当前 SSH key 未被 GitHub 接受，公开仓库只能读。可以在 GitHub 添加 `C:\Users\12345\.ssh\id_rsa.pub`，或用 Git Credential Manager 登录。

### 我建议的下一步

两个关键词已经完成：`Chinese daily life`（3 页、191/192 条）和 `living in China`（4 页、208 条）。**现在不要扩大采集规模，先做第三项验证：**

1. 用 `Chinese street food` 或第三个内容方向跑一次 5×50，检查是否仍然自然耗尽、203 是否仍可用、相关性是否下降。
2. 30–60 分钟后再复跑一次 `living in China`，比较 203 出现位置和结果重叠，验证跨时间段稳定性。
3. 只有三项都稳定，才进入 Discovery 方案比较和长期架构设计。

第三个关键词命令（服务保持运行）：

```powershell
python poc\discovery-01\scripts\collect.py `
  --out poc\discovery-03-chinese-street-food `
  --pages 5 --count 50 --keyword "Chinese street food"
```

任意两次运行对比：

```powershell
python poc\discovery-01\scripts\compare_runs.py `
  poc\discovery-02-living-in-china poc\discovery-03-chinese-street-food
```

## 9. 产物清单

| 文件 | 内容 |
| --- | --- |
| [manifest.json](../manifest.json) | 每页请求、状态、cursor、impr_id、sha256 |
| [raw/page_001.json](../raw/page_001.json) | 第 1 页原始响应 |
| [raw/page_002.json](../raw/page_002.json) | 第 2 页原始响应 |
| [raw/page_003.json](../raw/page_003.json) | 第 3 页原始响应 |
| [raw/page_004_probe.json](../raw/page_004_probe.json) | `offset=150` 耗尽验证（不参与规范化） |
| [normalized/videos.jsonl](../normalized/videos.jsonl) | 191 条统一视频模型 |
| [normalized/creators.jsonl](../normalized/creators.jsonl) | 163 个创作者 |
| [report/metrics.json](metrics.json) | 汇总指标 |
| [report/relevance_review.csv](relevance_review.csv) | 30 条人工相关性标注 |
| [report/comparison.json](../../discovery-01-repeat/report/comparison.json) | 两次运行的重叠对比 |
| [discovery-01-repeat/manifest.json](../../discovery-01-repeat/manifest.json) | 复跑原始清单 |
| [discovery-02/report/README.md](../../discovery-02-living-in-china/report/README.md) | 第二关键词交叉验证报告 |
| [scripts/collect.py](../scripts/collect.py) | 采集脚本 |
| [scripts/normalize.py](../scripts/normalize.py) | 规范化与指标脚本 |
| [scripts/sample_relevance.py](../scripts/sample_relevance.py) | 可复现抽样 |
| [scripts/apply_relevance.py](../scripts/apply_relevance.py) | 应用人工标签并汇总 |
| [scripts/compare_runs.py](../scripts/compare_runs.py) | 两次运行对比 |

统一模型字段：平台、来源、关键词、页码、排名、video_id、视频链接、描述、发布时间、creator_id、secUid、username、nickname、播放/点赞/评论/分享/收藏、hashtags、music_id、时长、宽高、图文/视频、是否广告、文本语言、采集时间、原始文件。
