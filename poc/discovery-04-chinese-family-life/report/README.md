# 家庭/代际支柱验证：`Chinese family life`

- 运行日期：2026-10-26
- 目的：补“家庭/代际”支柱，寻找催婚、育儿、代际边界等文化差异选题
- 结论：**泛词能查到大量家庭 vlog，但严格讲家庭关系/代际的只有 26.7%；家庭线需要更具体的关键词。**

## 数据

| 指标 | 值 |
| --- | --- |
| 成功页数 | 3 |
| 停止原因 | `has_more_false` |
| 原始行数 | 173 |
| 非视频行 | 1 |
| 唯一视频 | **172** |
| 唯一创作者 | **137** |
| 重复 | **0** |
| 广告 / 图文 | 1 / 24 |
| 203 出现位置 | 第 1 页 |

分页：51 → 50 → 72 条，`cursor` 50 → 100 → 150，最后一页 `has_more=0`。

字段缺失：

- `desc`：3 / 172（1.74%）
- `hashtags`：33 / 172（19.19%）
- 其余字段：0%

## 标签结构

| 标签 | 视频数 |
| --- | --- |
| `#china` | 42 |
| `#fyp` | 27 |
| `#chinese` | 22 |
| `#family` | 19 |
| `#Vlog` | 16 |
| `#chinesefamily` | 15 |
| `#parentchild` | 12 |
| `#kids` | 12 |
| `#chinalife` | 10 |
| `#familydaily` | 10 |

## 相关性：按“是否讲家庭关系/代际”评估

| 标签 | 含义 | 数量 | 占比 |
| --- | --- | --- | --- |
| 2 | 直接讲家庭关系、代际、婚育、育儿、亲属文化，或有中外对比 | 8 | **26.7%** |
| 1 | 中国家庭日常 vlog，缺少解释或对比 | 16 | 53.3% |
| 0 | 非中国家庭、影视剧、纯标签或其他国别 | 6 | 20.0% |
| 2 + 1 | 可作为素材 | 24 | **80.0%** |

明细：[relevance_review.csv](relevance_review.csv)。标准：[criteria.json](criteria.json)。

## 高潜力样本

8 条直接相关里，出现了这些可用的选题方向：

1. **29 岁婚姻压力 / 农村单身**
2. **百岁姐妹探亲、送鱼**：亲属关系的具体细节
3. **传统中国家庭 + 出柜**：家庭价值观冲突（敏感，需谨慎处理）
4. **用电视剧解释中国家庭动态**：适合“为什么中国家庭这样说话”
5. **婚礼前父亲喂女儿最后一餐**：婚俗与代际情感
6. **无子女夫妻的简单生活与遗产**：家庭定义的变化
7. **Chinese childcare + culturedifference**：育儿方式对比
8. **Random Chinese things + culturedifferences**：生活细节对比

这些比“三孩家庭日常”更适合 Sinofieldnotes，因为它们有**关系张力**或**文化解释**。

## 关键发现

1. **泛词 `Chinese family life` 太宽。**  
   返回大量“三孩家庭吃饭”“爸爸带娃”“全职太太日常”，视觉可用，但没有“为什么”。

2. **家庭线的金矿在“具体冲突”，不在“家庭日常”。**  
   催婚、育儿、祖辈、婚俗、代际边界，比“幸福一家人”更有内容潜力。

3. **需要更具体的查询。**  
   下一页应改用：
   - `marriage pressure China`
   - `Chinese parenting`
   - `Chinese grandparents`
   - `only child family China`
   - `Chinese wedding tradition`

4. **注意代表性。**  
   一个家庭的故事不能写成“中国人都这样”；用“有的家庭/在一些地方”而不是全称判断。

## 下一步

家庭支柱保留，但不再用泛词扩量。优先：

1. `China travel`（旅行/城市，补最后一个大支柱）
2. `marriage pressure China` 或 `Chinese parenting`（家庭线具体查询）
3. 对 `China culture shock` 做跨时间段复跑

## 文件

- [manifest.json](../manifest.json)
- [metrics.json](metrics.json)
- [relevance_review.csv](relevance_review.csv)
- [criteria.json](criteria.json)
- [normalized/videos.jsonl](../normalized/videos.jsonl)
- [normalized/creators.jsonl](../normalized/creators.jsonl)
