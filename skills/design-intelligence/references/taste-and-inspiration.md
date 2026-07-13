# 审美培养与灵感体系（Taste & Inspiration）

面向开发者的设计审美训练手册。当用户问"如何培养审美 / 有什么好的灵感来源 / 该学什么"时读这份文件；也可直接推荐给用户自读。

## 一、核心论点（五位大师殊途同归）

**审美是可训练的直觉，不是天生偏好。** 训练公式 = 大量接触顶级作品 × 强迫自己说出"为什么好" × 大量产出 + 诚实的批评。

- **Paul Graham**《Taste for Makers》："说品味只是个人偏好，是避免争论的好办法——问题是这不是真的。" 伟大作品 = "极其苛刻的品味 + 满足它的能力"。
- **Emil Kowalski**（Linear 设计工程师，Sonner 作者）：品味是"被训练出来的直觉——看穿显而易见之外的能力"，靠"浸泡在优秀作品里、深入思考为什么感觉对、以及不懈练习"。
- **Julie Zhuo**（前 Facebook 设计 VP）："好品味和所有事情一样，是一种技能。"
- **Rauno Freiberg**（Vercel）：能"超越'感觉不错'去分析细节"，正是滋养品味的方法。
- **Ira Glass 的"品味鸿沟"**：入行时品味先于能力，作品配不上眼光是**常态**——解药是**给自己定死线、靠产量追平**。Graham 补充：这个落差本身是引擎，"培养不满足感"。

Steve Jobs（Emil 引用）："归根结底是让自己接触人类做过的最好的东西，然后把它们带进你正在做的事情里。"

## 二、日常训练系统（按杠杆率排序）

### 1. Copywork 临摹 —— 杠杆率最高，从业者共识最强
像素级复刻你欣赏的界面。原理：**你被迫重做原设计师做过的每一个决定**。
- 流程：截图 → 放进 Figma 当底图逐元素重建；开发者变体（更适合你）：**直接用 HTML/CSS 复刻**，同时练实现。
- 关键规则：**选比你当前水平更高的作品临摹**。"临摹训练眼睛，你会开始注意到以前看不见的细节。"

### 2. Julie Zhuo 六步法
① 相信好品味存在 → ② 找到公认品味好的人（再顺藤摸瓜研究**他们**欣赏谁——品味传递图谱）→ ③ 深挖其作品（用他们的产品、翻作品集）→ ④ 练批判眼光："喜欢什么？为什么？"——分析具体决策，永远不说"酷/烂"就完事 → ⑤ **把你的分析公开分享讨论**（强制具体化）→ ⑥ 创作，并拿到"真实、诚恳的批评"。

### 3. 拆解仪式（Rauno 方法）
每周选一个你天天用的交互，说清它的隐形细节。词汇表：手势动量保留、意图-距离阈值（轻量操作中途触发、破坏性操作必须完成）、动画的空间起点、Fitts 定律与"魔法角落"、可把玩性（fidgetability）、边界阻尼。

### 4. Swipe File 灵感库
收藏时**必须写一行注释：你为哪个具体决策存的它**。有注释的 swipe file 是品味资产；无注释的 Pinterest 板不是。

### 5. Friction Log 摩擦日志（Stripe 实践）
每周用自己的产品，记下每一处别扭。配合"walking the store"。Katie Dill："对抗滑向平庸的引力。" Emil 版本：**第二天以新鲜眼睛重看**，用慢速/逐帧回放动画，全速下看不见的时序问题会显形。

### 6. 产量与死线
Ira Glass：每周固定产出一件。量变追平品味鸿沟，没有捷径。

## 三、灵感源清单（已验证，按用途分）

### 真实产品 UX（最高杠杆）
- **mobbin.com** — 已上线产品的真实界面和**完整流程**（onboarding/结账/设置），非概念稿。做 app/SaaS 最值得付费的订阅。
- **refero.design / pageflows** — 真实产品 UX 流程。

### 视觉野心
- **godly.website** — 极严选（每周 3–5 个 vs Awwwards 每日），信噪比高；动画、滚动、视觉叙事。
- **awwwards.com** — 实验前沿；有启发性但常不可迁移到产品 UI。
- **dark.design** — 深色主题精选。

### 落地页与组件
- **land-book.com** — SaaS/startup 落地页，可按风格、颜色、**具体区块**（定价、对比表）筛选。卡在某个组件时最好用。
- **onepagelove.com** — 单页落地页。
- **footer.design** — 只收 footer，可按类型筛。
- **curated.design** — 网页设计精选（X 推荐清单来源）。

### 层级与留白
- **minimal.gallery** — 2013 年至今 Piet Terheyden 手选；看**视觉层级、留白、内容优先**的最佳参考。
- **seesaw.website** — 每日更新、按**行业**分类（AI/营销/加密/作品集）——"一家可信的 X 公司长什么样"。

### 交互与动效工艺
- **interfaces.dev** — Jakub Krehel（前 OpenSea 设计工程师）的付费设计工程杂志（$7.99/月，3 期免费试读）：动画、排版、OKLCH、光学对齐。核心主张："AI 时代快速上线不再是优势，差异化在于极致用心的构建。" 每期配套一个 agent skill。
- **github.com/jakubkrehel/skills** — 上面杂志的开源 skill 提炼（MIT）：better-ui / better-typography / better-colors，`npx skills add jakubkrehel/skills` 可装；其精确数值已吸收进本 skill 的 `craft-details.md`。配套工具 **oklch.fyi**（OKLCH 配色生成器）。
- **interfacecraft.dev《Means & Methods》** — joshpuckett（前 Dropbox 设计负责人）：11 章 100+ 个界面设计精进主题，带交互示例和代码。
- **uilabs.dev** — Mariana Castilho 的可把玩实验组件。
- **60fps.design** — 专收 app 动效。
- **appmotion.design** — 动画灵感。

### 设计系统资源
- thedesignsystem.guide（指南）· designsystemchecklist.com（清单）· designsystems.surf（数据库）· designsystemsrepo.com（资源）· component.gallery（组件对照）· rebrand.gallery（品牌重塑案例）。

### 值得关注的人（design engineers）
- **Rauno Freiberg**（rauno.me — Vercel，《Invisible Details of Interaction Design》《Devouring Details》）
- **Emil Kowalski**（emilkowal.ski — Linear；Sonner 周下载 1300 万+；animations.dev 课程；GitHub emilkowalski/skills 的 emil-design-eng SKILL.md 是免费资料里编码化 UI 品味密度最高的单件）
- **Mariana Castilho**（@mrncst — uilabs，前 Vercel）
- **Karri Saarinen**（Linear 创始人）、**Katie Dill**（Stripe，前 Airbnb/Lyft）
- **Maggie Appleton** 维护的公开清单 **maggieappleton.com/design-engineers** —— 现成的关注列表
- X 上的实践者：joshpuckett、marina_uiux（budarina.studio）、asobodesign（日式可爱微交互）、UiSavior、Jhey Tompkins（CSS 魔术）、Josh Comeau（joshwcomeau.com）

### 书与课程（从业者真实推荐）
1. **《Refactoring UI》**（Adam Wathan & Steve Schoger）— 开发者第一本。核心招式：留白从过多开始往回删；视觉层级是"让东西看起来'被设计过'的最有效工具"；层级靠字重和颜色而不只是字号；**弱化竞争元素**优于强化目标元素；每页只有一个真主操作；**先灰度设计**逼间距/对比/尺寸做功。
2. **《Grid Systems in Graphic Design》**（Müller-Brockmann）+ Kimberly Elam《Grid Systems》— 网格思维的源头。
3. **《Thinking with Type》**（Ellen Lupton）— 排版入门 + 获得"把品味说出口"的词汇。
4. **animations.dev**（Emil 的课）— 每一课都聚焦品味与质量，开发者练 web 动效的首选付费课。
5. **Don Norman《设计心理学》《情感化设计》**— visceral/behavioral/reflective 三层次的出处。

## 四、给 AI 时代开发者的三条捷径

1. **你会写代码是优势不是短板**：品味最密集的地方（动量、打断、缓动、延迟）Figma 表达不了，只能在代码里迭代——直接在实现层练。
2. **Design-first vibe coding**：AI 能把"枯燥数据变成惊艳交互画布"，但方向感必须来自你——先锁定风格 spec（token 先行），再让 AI 生成，否则输出滑向统计平均值（=slop）。
3. **产出即训练**：每次让 AI 出的界面，用本 skill 的 Output Contract 强迫自己复述"选了什么风格、为什么契合、加了哪些签名细节"——这就是 Julie Zhuo 第 4-5 步的日常化。
