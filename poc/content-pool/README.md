# 内容池：多关键词去重汇总

这个目录把五组 Discovery 结果合并成一个可检索的候选池，用来保留选题多样性，而不是把账号收窄到“文化差异”一个方向。

## 数据来源

| 运行 | 关键词 | 行数 |
| --- | --- | --- |
| `discovery-01` | `Chinese daily life` | 191 |
| `discovery-01-repeat` | `Chinese daily life`（复跑） | 192 |
| `discovery-02-living-in-china` | `living in China` | 208 |
| `culture-differences-01` | `China culture shock` | 202 |
| `culture-differences-02` | `cultural differences China` | 183 |
| `discovery-03-chinese-street-food` | `Chinese street food` | 202 |
| `discovery-04-chinese-family-life` | `Chinese family life` | 172 |
| `discovery-05-china-travel` | `China travel` | 255 |

合并后：

- 原始行数：**1605**
- 去重后唯一视频：**1248**
- 唯一创作者：**930**
- 跨运行重复：**357**

## 支柱分布（自动标签，仅用于导航）

| 主支柱 | 视频数 |
| --- | --- |
| `travel` | 369 |
| `culture_difference` | 287 |
| `daily_life` | 175 |
| `food` | 160 |
| `other` | 155 |
| `family_social` | 60 |
| `language` | 14 |
| `work_money` | 12 |
| `rural_nature` | 10 |
| `tech_convenience` | 6 |

**重要：这些标签是关键词启发式，不是人工审核结果。** 例如：

- `food` 里混入了“房租/工资”内容，因为标签里有 `#food`；
- `work_money` 里混入了世界地图、企业穿搭；
- `language` 里混入了留学/宗教标签；
- `rural_nature` 里混入了历史人类学内容。

因此 `candidates.csv` 只能当作“导航清单”，不能直接当最终选题。下一步应该用“来源关键词 + 人工复核”替代纯关键词分类。

## 高频标签

`#china` 542、`#fyp` 216、`#chinatravel` 202、`#chinese` 121、`#travel` 117、`#chinesefood` 96、`#streetfood` 95、`#shanghai` 79、`#lifeinchina` 73、`#chineseculture` 72。

## 文件

| 文件 | 内容 |
| --- | --- |
| [videos.jsonl](videos.jsonl) | 698 条去重视频，含 `pillars`、`primary_pillar`、`source_runs`、`source_keywords`、互动率 |
| [creators.jsonl](creators.jsonl) | 544 个创作者聚合 |
| [metrics.json](metrics.json) | 来源、支柱、标签统计 |
| [candidates.csv](candidates.csv) | 每个支柱按 score / share_rate 取的候选，需人工复核 |
| [scripts/build_pool.py](scripts/build_pool.py) | 合并、去重、打标脚本 |

## 使用建议

1. **按 `source_keywords` 分组看**，比只看自动支柱更可靠。
2. 先从 `culture_difference`、`daily_life`、`travel` 各取 10 条，人工判断是否值得做成动画。
3. 把“自动标签错误”的样本记下来，反过来修正分类规则；不要在这个阶段上 NLP/LLM 分类系统。
4. 缺的支柱用新关键词补：饮食、家庭、语言、工作消费、乡村/科技各至少一个查询。
