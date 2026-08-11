# cd-design-skill — Design Skills Repository

个人设计类 AI skills 的统一仓库。所有与设计相关的 skill 都合并在这里，自包含、可版本化、可跨机器迁移。

## Skills

| Skill | 定位 | 何时触发 |
|---|---|---|
| [`skills/design-intelligence/`](skills/design-intelligence/SKILL.md) | **UI/UX 与产品设计智囊**：用户任务、信息架构、导航/流程/表单/状态、可用性与无障碍验证、Apple 公开资料综合、平台判断和视觉设计 | 设计/评审用户流程、Web/应用 UI、仪表盘、Apple 平台概念、独立硬件产品/伴侣与跨设备体验；要求"好用/好看/惊艳/fancy"的时候 |
| [`skills/cd-html-design/`](skills/cd-html-design/SKILL.md) | **CD 文档设计语言**：克制的信息密集型 HTML 文档/手册风格，带可执行校验器 | 独立 HTML 文档、手册、产品指南、流程图页、密集信息页 |

分工按产物和交互深度：**静态文档、报告、手册、打印型密集信息页 → cd-html-design；可操作产品 UI、交互式仪表盘、工作流工具、营销/创意页 → design-intelligence。** 内部/外部不决定路由：内部静态报告用前者，内部应用用后者。

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
│   ├── agents/openai.yaml              # Codex 展示名、简介与默认调用提示
│   └── references/
│       ├── apple-product-design.md     # Apple 公开资料综合：官方原则、推导规则、平台/输入、责任与一体化验证门
│       ├── fundamentals/
│       │   ├── experience-architecture.md            # 任务/对象、IA、导航、流程、表单、状态与内容架构
│       │   ├── experience-validation-and-handoff.md  # 原型、可用性/无障碍证据、韧性测试与工程交付
│       │   └── …                                     # 排版、色彩、空间、动效、交互与 UX 文案理论
│       ├── product-style-fit.md        # 风格×产品匹配决策树 + 名产品案例
│       ├── style-playbooks.md          # 风格百科：31 种风格完整规格
│       ├── component-adoption.md       # 现成组件：使用/主题化/包装/vendor/重写决策阶梯
│       ├── color-and-typography.md     # 配色公式 + 字体搭配
│       ├── micro-interactions.md       # 微交互目录（含时长/缓动/弹簧参数）
│       ├── signature-details.md        # "眼前一亮"细节彩蛋目录
│       ├── taste-and-inspiration.md    # 审美培养方法 + 灵感源清单
│       └── style-tokens/               # 5 套风格 token CSS；ADE 另含 neat-annotations adapter
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
