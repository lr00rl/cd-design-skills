# cd-design-skill — Design Skills Repository

个人设计类 AI skills 的统一仓库。所有与设计相关的 skill 都合并在这里，自包含、可版本化、可跨机器迁移。

## Skills

| Skill | 定位 | 何时触发 |
|---|---|---|
| [`skills/design-intelligence/`](skills/design-intelligence/SKILL.md) | **设计智囊**：风格选择、配色、排版、布局、微交互、风格与产品匹配 | 设计/重设计任何 web 页面、应用 UI、落地页、仪表盘、组件；要求"好看/惊艳/眼前一亮/fancy"的时候 |
| [`skills/cd-html-design/`](skills/cd-html-design/SKILL.md) | **CD 文档设计语言**：克制的信息密集型 HTML 文档/手册风格，带可执行校验器 | 独立 HTML 文档、手册、产品指南、流程图页、密集信息页 |

分工：**文档/报告/内部工具 → cd-html-design；营销页/产品 UI/仪表盘/创意页 → design-intelligence。**

## Install

```bash
./install.sh
```

把每个 skill 软链到 `~/.claude/skills/`，Claude Code 自动发现。重复执行安全。

## Structure

```
skills/
├── design-intelligence/
│   ├── SKILL.md                        # 路由 + 工作流 + 硬规则
│   └── references/
│       ├── product-style-fit.md        # 风格×产品匹配决策树 + 名产品案例
│       ├── style-playbooks.md          # 风格百科：25+ 风格完整规格
│       ├── color-and-typography.md     # 配色公式 + 字体搭配
│       ├── micro-interactions.md       # 微交互目录（含时长/缓动/弹簧参数）
│       ├── signature-details.md        # "眼前一亮"细节彩蛋目录
│       ├── taste-and-inspiration.md    # 审美培养方法 + 灵感源清单
│       ├── fundamentals/               # 深度理论（源自 Impeccable, Apache 2.0）
│       └── style-tokens/               # 4 套可直接引用的风格 token CSS
└── cd-html-design/
    ├── SKILL.md
    ├── references/                     # design-system / interaction / quality-gates
    ├── assets/                         # light-document.html / editorial-handbook.html
    ├── scripts/validate-html.mjs       # 可执行质量门（90/100 阈值）
    └── tests/
```

## Conventions

- 新增设计类 skill：在 `skills/` 下建目录 + `SKILL.md`（YAML frontmatter：`name` + `description`），重跑 `./install.sh`。
- `description` 决定 AI 何时自动调用——写清触发场景，而不只是功能。
- 参考文件按需加载（progressive disclosure）：SKILL.md 保持短，重内容放 `references/`。
