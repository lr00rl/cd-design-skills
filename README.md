# cd-design-skill: design skills repository

One repository for design-focused AI agent skills. Every design-related skill lives here, self-contained, versioned, and portable across machines.

## Skills

| Skill | Role | When it triggers |
|---|---|---|
| [`skills/design-intelligence/`](skills/design-intelligence/SKILL.md) | **UI/UX and product design brain trust**: user tasks, information architecture, navigation/flows/forms/states, usability and accessibility validation, a synthesis of Apple's public material, platform judgment, and visual design | Designing or reviewing user flows, web or app UI, dashboards, Apple-platform concepts, standalone hardware products and their companions, and cross-device experiences; also when the user asks for design that is easy to use, good-looking, striking, or "fancy" |
| [`skills/cd-design-skill/`](skills/cd-design-skill/SKILL.md) | **Execution and measurement**: a four-line brief that fixes the point of the page, a structure-only CSS kernel, and a layout audit that measures the rendered page for crooked edges, uneven gaps, overflow, and a lead that does not lead | Building, restyling, or reviewing anything that renders in a browser; a page that looks crooked, flat, or generic; requests for alignment, proportion, emphasis, or livelier interaction |

The two skills divide the work by stage, not by artifact. `design-intelligence` decides what to build and in which style: tasks, information architecture, flows, style-product fit. `cd-design-skill` governs how any direction is executed and checked: the content's main point leads, every edge sits on a shared line, and the result is measured in a browser before it is called done. Each works alone; together, choose with the first and build with the second.

## Why the skill has this form

A design skill can ship as prose, as templates or components, or as tools. Each fails differently. Prose alone restates what the model already knows and cannot tell it that a heading sits 3px off the column line, because the model never sees its own render. Templates and component libraries make every output look like the template, lock the skill to one stack, and get copied along with their sample content. The previous `cd-html-design` skill was of this kind, and its own two templates fail the audit that replaced it.

`cd-design-skill` therefore ships three things with separate jobs: a short instruction file for order and judgment, a CSS kernel that fixes geometry and carries no look, and a measurement script. The script is plain JavaScript evaluated in the page, so an agent with any browser tool can run it, and a Node CLI runs it headless for agents that only have a shell.

The `design-intelligence` description keeps a few Chinese trigger keywords (好看, 惊艳, 眼前一亮) so the skill also matches prompts written in Chinese. Everything else in the repository is in English.

## Install

```bash
./install.sh
```

The script symlinks each skill into `~/.agents/skills/` (read by pi, Codex, and other agents that follow that convention) and `~/.claude/skills/` (Claude Code). It is safe to run more than once, and it removes links to skills that no longer exist in this repository. Agents that do not load skills on their own can be pointed at a skill's `SKILL.md` directly.

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
└── cd-design-skill/
    ├── SKILL.md                        # order of work, the six rules, how to run and read the audit
    ├── agents/openai.yaml              # Codex display name, short description, and default prompt
    ├── assets/kernel.css               # geometry only: page grid, column lines, shared row lines, spacing scale
    ├── references/
    │   ├── proportion-and-alignment.md # the mechanism behind each kind of crookedness, and the fix per audit check
    │   └── life-and-boldness.md        # choosing one bold move; interaction states; motion that explains
    ├── scripts/
    │   ├── layout-audit.js             # the measurement, evaluated in the page by any browser tool
    │   └── layout-audit.mjs            # the same measurement in headless Chrome at several widths
    └── tests/                          # a clean fixture and a fixture with one planted defect per section
```

## Conventions

- To add a design skill, create a directory with a `SKILL.md` under `skills/` (YAML frontmatter: `name` + `description`), then rerun `./install.sh`.
- The `description` decides when the agent invokes the skill on its own, so describe the situations that should trigger it, not only what it does.
- Reference files load on demand (progressive disclosure): keep SKILL.md short and put heavy content in `references/`.
