# cd-design-skill: design skills repository

One repository for design-focused AI agent skills. Every design-related skill lives here, self-contained, versioned, and portable across machines.

## Skills

| Skill | Role | When it triggers |
|---|---|---|
| [`skills/design-intelligence/`](skills/design-intelligence/SKILL.md) | **UI/UX and product design brain trust**: user tasks, information architecture, navigation/flows/forms/states, usability and accessibility validation, a synthesis of Apple's public material, platform judgment, and visual design | Designing or reviewing user flows, web or app UI, dashboards, Apple-platform concepts, standalone hardware products and their companions, and cross-device experiences; also when the user asks for design that is easy to use, good-looking, striking, or "fancy" |
| [`skills/cd-html-design/`](skills/cd-html-design/SKILL.md) | **CD document design language**: a restrained, information-dense style for HTML documents and handbooks, with an executable validator | Standalone HTML documents, handbooks, product guides, process-map pages, dense information pages |

The split follows the artifact and how much interaction it needs: **static documents, reports, handbooks, and print-style dense information pages go to cd-html-design; operable product UI, interactive dashboards, workflow tools, and marketing or creative pages go to design-intelligence.** Internal versus external does not decide the route: an internal static report uses the first, an internal app uses the second.

The `design-intelligence` description keeps a few Chinese trigger keywords (好看, 惊艳, 眼前一亮) so the skill also matches prompts written in Chinese. Everything else in the repository is in English.

## Install

```bash
./install.sh
```

The script symlinks each skill into `~/.claude/skills/`, where Claude Code discovers it automatically. It is safe to run more than once.

## Structure

```
skills/
├── design-intelligence/
│   ├── SKILL.md                        # routing + workflow + hard rules
│   ├── agents/openai.yaml              # Codex display name, short description, and default prompt
│   └── references/
│       ├── apple-product-design.md     # synthesis of Apple's public material: official principles, derived rules, platforms/inputs, responsibility, and integrated validation gates
│       ├── fundamentals/
│       │   ├── experience-architecture.md            # tasks/objects, IA, navigation, flows, forms, states, and content architecture
│       │   ├── experience-validation-and-handoff.md  # prototypes, usability/accessibility evidence, resilience tests, and engineering handoff
│       │   └── …                                     # typography, color, space, motion, interaction, and UX writing theory
│       ├── product-style-fit.md        # style × product fit decision tree + cases from well-known products
│       ├── style-playbooks.md          # style encyclopedia: full specs for 31 styles
│       ├── component-adoption.md       # off-the-shelf components: use/theme/wrap/vendor/rewrite decision ladder
│       ├── color-and-typography.md     # color formulas + font pairings
│       ├── micro-interactions.md       # micro-interaction catalog (with duration/easing/spring values)
│       ├── signature-details.md        # catalog of eye-catching signature details
│       ├── taste-and-inspiration.md    # how to train taste + list of inspiration sources
│       └── style-tokens/               # 5 style token CSS sets; ADE also includes a neat-annotations adapter
└── cd-html-design/
    ├── SKILL.md
    ├── references/                     # design-system / interaction / quality-gates
    ├── assets/                         # light-document.html / editorial-handbook.html
    ├── scripts/validate-html.mjs       # executable quality gate (the 90/100 visual-score threshold is in references/quality-gates.md)
    └── tests/
```

## Conventions

- To add a design skill, create a directory with a `SKILL.md` under `skills/` (YAML frontmatter: `name` + `description`), then rerun `./install.sh`.
- The `description` decides when the agent invokes the skill on its own, so describe the situations that should trigger it, not only what it does.
- Reference files load on demand (progressive disclosure): keep SKILL.md short and put heavy content in `references/`.
