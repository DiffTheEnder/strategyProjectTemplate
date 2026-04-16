# DS Strategy Stack (Claude Code)

> An open-source, AI-powered strategy and project management stack for Claude Code. Clone it, run `/onboard`, and start doing real work — market entry, competitor research, internal implementations, due diligence, or any corporate project that needs structured thinking.

[![MIT Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

---

## What is this?

A complete strategy project framework that runs inside [Claude Code](https://claude.ai/code). It gives you a **persistent memory layer** so Claude remembers everything — research, decisions, discovery calls, competitor intel, and strategic context — across sessions, conversations, and team members.

Every research finding is evidence-graded. Every decision captures its rationale. Every kill condition is tracked. The promise of the stack is that **session N+1 starts warm** — Claude picks up with full project context, not from scratch.

![Dashboard Screenshot](dashboard/screenshot.png)

---

## Your first 30 minutes

This is a narrative walkthrough. Follow it once end-to-end and you'll have experienced the full loop on your own data.

### Minutes 0–5 — Scaffold the project

```bash
npx create-dss-project my-project
cd my-project
claude
```

The scaffolder asks 4 questions:
1. **Project name**
2. **Project type** (Market Entry, Competitor Research, Due Diligence, Vendor Eval, and 6 others)
3. **Structure level** (Full / Essentials / Minimal)
4. **Include a worked example?** — strongly recommended first time: it drops a fully-populated demo project (DentaSync — evaluating dental PMS market entry) alongside yours, so you can see what a second brain looks like *after* six weeks of real work.

### Minutes 5–15 — `/onboard` — configure and seed

```
/onboard
```

The `/onboard` skill walks you through:
- **Structural questions** — goal, team, scope, hypothesis, ICP, entity type, kill conditions (~5 min on Quick Start, ~10 min on Full Setup)
- **Optional seed phase (~5 min)** — paste any existing research you have, name 3–5 companies/entities you already care about, write your current gut hypothesis, pick one question for this week

Every seed input is optional. Whatever you skip becomes a `TODO` that `/session-start` surfaces until you seed it later.

By the end of `/onboard`, `project.config.json` is written, placeholders are replaced, seed material is stored in `memory/` and `data/entities.csv`, and the completion report prints **your next 3 moves** — tailored to your project type.

### Minutes 15–30 — Pick one path

**Path A: Take the guided tour** (if you seeded anything)

```
/tour
```

A 15-minute walkthrough that runs `/enrich-entity` on a real entity you named, `/critical-reasoning` on your real hypothesis, and `/session-end` to close the loop. By the end: one enriched competitor teardown, one pressure-tested claim, one clean git commit. You feel the system, not just read about it.

**Path B: Browse the demo project** (if you opted in)

```
ls examples/demo
```

Read `examples/demo/docs/executive-summary.md`, then `examples/demo/memory/MEMORY.md`, then one of the three discovery-call notes in `examples/demo/discovery/calls/`. You'll see what your project looks like after 6 weeks: populated memory, evidence-graded claims, a weekly synthesis memo, a hypothesis that evolved under discovery pressure. When you're oriented, `rm -rf examples/demo` and start real work.

**Path C: Jump to a recipe**

```
cat docs/recipes/competitive-landscape.md
```

Four workflow recipes ship with the stack — narrative walkthroughs of the skill-chains that deliver the biggest leverage. Pick the one that matches your immediate need.

---

## What this looks like after a week

If you opted in to `examples/demo`, you already have a concrete answer to "what does a populated project look like?" A few highlights from the DentaSync demo:

- `memory/MEMORY.md` shows a hypothesis that **shifted under discovery pressure** — from $600-$1,200/mo PMS add-on to $300-$500/mo recall-only — with a decision trail in `memory/decisions.md` that explains why.
- `context/project-state.md` has a **kill condition in `FAILING` status** (KC-2: WTP threshold) and the memo transparently reasons about whether to revise the threshold or kill the thesis. This is the stack's core value proposition in action: evidence that challenges you isn't hidden, it's surfaced.
- Every claim in `research/entities/dentalstack.md` is tagged `[CONFIRMED]`, `[SECONDARY]`, `[INFERENCE]`, or `[ASSUMPTION]`. The synthesis memo reports the distribution across grades — you know when you've done enough research vs. when you're still guessing.
- A single finding ("recall is the top universal pain") traces cleanly from a call note → pain ranking in `memory/discovery.md` → weekly synthesis → decision in `memory/decisions.md` → executive summary. The memory cascade is the product.

This is what you're building toward.

---

## The loop

Every session follows the same arc:

```
  /session-start   →   work   →   /session-end
  (warm context)    (do the thing)   (close & commit)
```

- **`/session-start`** loads the right context for your task, shows priorities and overdue actions, warns you about conflicts with other agents. 3 loading modes:
  - **Fast** — snapshot only. For pipeline updates, scheduling, housekeeping.
  - **Standard** — snapshot + targeted raw files. For research, competitor work.
  - **Deep** — snapshot + all raw evidence. **Required** for hypothesis review, critical reasoning, kill-condition updates.
- **Work** — use the skills below, or just talk to Claude in plain English. The stack supplies context; Claude supplies the thinking.
- **`/session-end`** runs 10-step housekeeping: file audit, memory cascade, snapshot rebuild, commit. Non-optional. If you skip it, memory goes cold and the next session rebuilds context from scratch.

Run this loop every working session for 4 weeks and the compounding effect is the product.

---

## Workflow recipes

The real value shows up in chained workflows, not individual skills. Four ship with the stack:

| Recipe | Time | When to use |
|---|---|---|
| [Competitive landscape](docs/recipes/competitive-landscape.md) | 2–4 hrs | Map a market, produce a competitor memo, evaluate a pivot |
| [First discovery call](docs/recipes/first-discovery-call.md) | ~2 hrs | Your first prospect/partner/target interview |
| [Weekly strategic review](docs/recipes/weekly-strategic-review.md) | ~45 min | End of every work-week — repeating cadence |
| [Pressure-test a pivot](docs/recipes/pressure-test-a-pivot.md) | ~90 min | Before any hard-to-reverse strategic change |

Read one recipe end-to-end before running it, then execute.

---

## Skills reference

15 project-level skills ship with the stack. Read a recipe first, then reach for individual skills.

| Skill | Phase | Description |
|-------|-------|-------------|
| `/onboard` | Setup | One-time project configuration wizard (structural + optional seed) |
| `/tour` | Setup | 15-min guided first-session walkthrough on your real seed data |
| `/session-start` | Session | Load context, check conflicts, show priorities |
| `/session-end` | Session | 10-step end-of-session housekeeping |
| `/health-check` | Quality | Project integrity audit and health score |
| `/rebuild-snapshots` | Session | Regenerate all context snapshots from raw files |
| `/pipeline-update` | Pipeline | Track entity status transitions |
| `/outreach-sequence` | Pipeline | Design multi-touch outreach cadences |
| `/process-call` | Discovery | Post-discovery-call structured processing |
| `/enrich-entity` | Research | Deep research and dashboard enrichment for an entity |
| `/synthesise` | Research | Cross-file research synthesis into structured memos |
| `/critical-reasoning` | Analysis | Pressure-test ideas with 4 lenses: truth, consequences, risks, feasibility |
| `/decision` | Analysis | Record strategic decisions with full rationale |
| `/compare-options` | Analysis | Score and compare 2–5 strategic options |
| `/weekly-report` | Reporting | Generate stakeholder-ready weekly summaries |

Also available: **user-level skills** like `/bottom-up-tam`, `/gtm-playbook`, `/pricing-packaging`, `/unit-economics-modeler`, `/burning-platform`, and more — see `CLAUDE.md` for the full list.

---

## What can you ask Claude?

The skills above are structured entry points. You can also just talk to Claude in plain English — the stack gives it the context to answer strategically. Some examples:

### Research & Analysis
> "Pull together everything we know about the competitive landscape and tell me where the biggest white space is."
>
> "I just found this industry report — read it and update our competitor research with anything new."
>
> "What are the strongest and weakest parts of our hypothesis right now? What evidence are we missing?"

### Discovery & Pipeline
> "I have 3 new leads from a conference. Add them to the pipeline and draft a personalised outreach sequence for each."
>
> "Based on all the discovery calls so far, what patterns are emerging? Are we hearing the same pain points?"
>
> "Prep me for my call with Nexus Payments tomorrow — what do we know about them and what should I ask?"

### Decision-Making
> "We need to decide between building our own data pipeline vs. using a third-party vendor. Set up a comparison with the pros, cons, and scores."
>
> "Play devil's advocate on our go-to-market strategy. What are we not seeing?"
>
> "We're about to commit to a product-led growth motion. Pressure-test this before we lock it in."

### Reporting & Status
> "Write a 2-paragraph update I can send to the board summarising where we are this week."
>
> "What's changed since last Monday? Give me a diff of all research and decisions."
>
> "How close are we to hitting any of our kill conditions?"

---

## Architecture

```
my-project/
├── CLAUDE.md                 # Agent instructions & context loading rules
├── STATUS.md                 # Multi-agent coordination board
├── project.config.json       # Project configuration (generated by /onboard)
├── memory/                   # Persistent strategic memory (5 files)
├── context/                  # Pre-computed snapshots for fast loading (4 files)
├── templates/                # Standard formats (call-prep, call-notes, entity-teardown)
├── research/                 # Raw research files (competitors, market, technical)
├── discovery/                # Customer/stakeholder discovery [optional]
├── data/                     # CSV/JSON source of truth
├── skills/                   # Project-level Claude Code skills (15)
├── dashboard/                # Live web dashboard (Vercel-deployed)
├── docs/                     # Executive summary, recipes, memos, reports
│   └── recipes/              # Workflow playbooks — read these
├── examples/                 # Demo project (optional, delete when ready)
└── scripts/                  # Utility scripts
```

---

## Project types

The `/onboard` wizard configures the stack based on your project type. Each type has its own scoring dimensions, default kill conditions, and **"your next 3 moves"** completion message.

| Type | Discovery | Pipeline | Dashboard | Best for |
|------|:---------:|:--------:|:---------:|----------|
| Market Entry | Yes | Yes | Yes | New market or product evaluation |
| Growth Strategy | Yes | Yes | Yes | Existing product, new channels or segments |
| Competitor Research | No | No | Yes | Competitive intelligence and landscape mapping |
| Product Launch / GTM | Yes | Yes | Yes | Bringing a product or feature to market |
| Internal Implementation | No | Yes | Yes | Rolling out a system, process, or initiative |
| Vendor / Partner Evaluation | Yes | Yes | Yes | Selecting tools, platforms, or partners |
| Due Diligence | Yes | Yes | Yes | M&A, investment, or acquisition evaluation |
| Business Case | No | No | Optional | Building a case for investment or change |
| Transformation / Change | Yes | Yes | Yes | Organisational or process transformation |
| Custom | Choose | Choose | Choose | Anything else |

---

## Dashboard

- **7 pages**: Overview, Pipeline, Competitors, Decisions, Scoring, Timeline, Research Hub
- Warm cream/teal editorial design with dark mode
- Auto-rebuilds from markdown/CSV source files
- Deploys to Vercel on push

> The dashboard is intentionally a **101-level starting point**. Every project is different — we'd encourage you to add custom pages, new data flows, and visualisations that fit your specific context. The [Skill Authoring Guide](docs/skill-authoring-guide.md) and [Dashboard Architecture](dashboard/CLAUDE.md) explain how to extend both. Ask Claude to help — "add a new dashboard page that shows X" works great.

---

## Requirements

- [Claude Code](https://claude.ai/code) CLI
- Node.js 18+ (for dashboard)
- Git

---

## Documentation

- **[Getting Started Guide](docs/getting-started.md)** — step-by-step setup for non-technical users (install, configure, deploy)
- **[Recipes](docs/recipes/)** — narrative workflow playbooks (read these before running real work)
- [Dashboard Deployment](dashboard/DEPLOY.md) — quick reference for deploying to Vercel
- [Executive Summary Template](docs/executive-summary.md) — master hypothesis and strategy memo
- [Evidence Grading Rules](docs/memos/evidence-grading.md) — how claims are tagged and verified
- [Skill Authoring Guide](docs/skill-authoring-guide.md) — build your own skills for the stack
- [Dashboard Architecture](dashboard/CLAUDE.md) — how the dashboard reads, builds, and renders data

---

## Contributing

Contributions are welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues, proposing features, and opening pull requests.

---

## Licence

MIT — see [LICENSE](LICENSE).
