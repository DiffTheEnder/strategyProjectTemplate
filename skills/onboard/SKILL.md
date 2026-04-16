---
name: onboard
description: One-time setup skill. Guides the user through a series of questions to configure this project template for their specific strategy project. Run once at the start of a new project, then delete or archive this skill.
---

# Project Onboarding

**One-time use** — run this when starting a new project from the strategy template. It replaces all `{{PLACEHOLDER}}` values and configures optional modules.

---

## Setup Mode Selection

Before starting, ask the user which mode they prefer:

> **Quick Start** or **Full Setup**?
>
> - **Quick Start** — 7 questions only. I'll auto-fill sensible defaults for everything else. Good if you want to get going fast and fine-tune later.
> - **Full Setup** — All questions across all groups. Full control over every setting.

### Quick Start Mode

Ask only these 7 questions:

1. **What's the project name?** (e.g., "Immutable Audience — Mobile")
2. **One-line description** — what is this project about in one sentence? (e.g., "Evaluate the mobile gaming market for audience monetisation opportunities")
3. **What's the core hypothesis or strategic bet?** (e.g., "Mobile gamers aged 18–30 will pay for premium audience insights if delivered in-app")
4. **What type of project is this?**
   - **Market entry** — evaluating a new market or product opportunity
   - **Growth strategy** — expanding an existing product into new channels or segments
   - **Competitor research** — mapping the competitive landscape and intelligence gathering
   - **Product launch / GTM** — bringing a product or feature to market
   - **Internal implementation** — rolling out a new system, process, or initiative
   - **Vendor / partner evaluation** — selecting tools, platforms, or partners
   - **Due diligence** — M&A, investment, or acquisition evaluation
   - **Business case** — building a case for investment or strategic change
   - **Transformation / change** — organisational or process transformation
   - **Custom** — something else (you'll choose which modules to include)
5. **What's the primary entity you're tracking?** (e.g., "studio", "customer", "partner") — enter "none" to skip the discovery module entirely

6. **What's your main goal?** (Pick one)
   - **Learning** — I want to explore the template and understand how it works
   - **Real project** — I have a specific strategy project to run
   - **Team coordination** — I need a shared workspace for my team's strategy work
   - **Exploration** — I'm evaluating whether this tool fits my needs

7. **How much structure do you want?**
   - **Full** — All features: scoring, kill conditions, evidence grading, weekly reports, context snapshots
   - **Essentials** — Core features: research, pipeline, decisions, dashboard (skip scoring, kill conditions, evidence grading)
   - **Minimal** — Bare bones: research and notes only (skip pipeline, scoring, kill conditions, dashboard)

#### Goal-based guidance

When goal is **Learning**:
- Suggest browsing the getting-started guide: "See `docs/getting-started.md` for a walkthrough."

#### Structure-based configuration

When structure is **Full**:
- Proceed with all defaults as normal.

When structure is **Essentials**:
- Skip Group 5 (scoring dimensions) and Group 6 (kill conditions)
- Set default scoring dimensions but don't ask
- Set kill conditions to empty (can be added later)
- Remove `/compare-options` from CLAUDE.md skills table reference
- Set features in `project.config.json`: `scoring: false`, `killConditions: false`, `evidenceGrading: false`, `weeklyReports: true`, `contextSnapshots: true`

When structure is **Minimal**:
- Skip Groups 3–6 entirely
- Disable discovery module, pipeline, dashboard, scoring, kill conditions
- Only keep: `research/`, `memory/MEMORY.md`, `memory/research.md`, `memory/decisions.md`, `docs/`
- Set features in `project.config.json`: `scoring: false`, `killConditions: false`, `evidenceGrading: false`, `weeklyReports: false`, `contextSnapshots: false`

After auto-filling defaults for **Essentials** or **Minimal**, tell the user: "You can always add more features later by editing `project.config.json` and running `/health-check`."

Then auto-fill defaults:
- `{{GOAL}}` → "Validate hypothesis and produce a go/no-go recommendation within 8 weeks"
- `{{TEAM}}` → "TBD — update in MEMORY.md"
- `{{SCOPE_DEFINITION}}` → "Defined by hypothesis — refine after initial discovery"
- `{{OUT_OF_SCOPE}}` → "TBD — update in MEMORY.md"
- `{{ICP_DESCRIPTION}}` → "TBD — update in MEMORY.md"
- `{{PIPELINE_SOURCE_OF_TRUTH}}` → `data/entities.csv`
- `{{DASHBOARD_URL}}` → "TBD"
- Scoring dimensions → based on project type (see Group 5 defaults)
- Kill conditions → "TBD — define within first week"
- Discovery module → included unless user answered "none" for entity type (or "Minimal" structure)
- Dashboard module → included by default (unless "Minimal" structure)

After auto-filling, proceed to the **Optional Seed Phase**, then the **Validation / Dry-Run Step**, then continue with replacement.

### Full Setup Mode

Run the complete question flow below (Group 0 through Group 6, including Groups 1A and 3A).

---

## How to Run

Tell the user: "I'll walk you through setting up this project. I'll ask a series of questions, then update all template files with your answers."

---

## Question Flow

Ask these questions **one group at a time**. Wait for answers before proceeding.

### Group 0: Prerequisites Check

Before asking any project questions, verify the environment is ready.

1. **Check Node.js is installed**:
   ```bash
   node --version
   ```
   If not found, warn: "Node.js is required for building the dashboard. Install it from https://nodejs.org before continuing, or skip the dashboard module."

2. **Check for fresh template**:
   Scan `memory/MEMORY.md` for any non-placeholder content — if the template placeholders (`{{PROJECT_NAME}}`, `{{GOAL}}`, etc.) are already gone (i.e., replaced with real values), warn:
   > "This doesn't look like a fresh template — MEMORY.md already contains non-placeholder content. Are you sure you want to continue? This may overwrite existing project data."

   Wait for confirmation before proceeding.

3. **Check git is configured**:
   ```bash
   git config user.name
   ```
   If empty, warn: "Git user.name is not set. Run `git config --global user.name 'Your Name'` to configure it."

Once all checks pass (or the user acknowledges warnings), proceed to Group 1.

---

### Group 1: Project Identity

1. **What's the project name?** (e.g., "Immutable Audience — Mobile", "Acme Growth Strategy")
2. **One-line description** — what is this project about in one sentence? (e.g., "Evaluate the mobile gaming market for audience monetisation opportunities")
3. **What's the goal?** — a specific, measurable objective with a deadline (e.g., "Validate product-market fit with 20 customer interviews and a go/no-go recommendation by 30 June 2026")
4. **Who's on the team?** — names and roles (e.g., "Dhanish (discovery), Sherry & Jeet (product)")

### Group 1A: Goals & Experience

14. **What's your main goal with this project?**
    - Learning how to run a strategy project
    - Running a real strategy project with deliverables
    - Coordinating a team around shared strategic work
    - Exploring and evaluating this tool
    (e.g., "Running a real project — we need to decide whether to enter the mobile gaming market by Q3")

15. **How familiar are you with strategy frameworks?**
    - **New to this** — I haven't used formal strategy tools before
    - **Some experience** — I've done market research or competitive analysis
    - **Experienced** — I regularly work with strategic frameworks and hypothesis-driven methods

    If "New to this": onboarding will include extra guidance in template files and suggest starting with the getting-started guide.
    If "Experienced": standard templates, no extra guidance.

### Group 2: Strategic Context

5. **What's the scope?** — what's in scope and what's explicitly out of scope? (e.g., In scope: "ANZ mobile gaming studios with >$1M revenue." Out of scope: "Console gaming, studios outside ANZ")
6. **What's the core hypothesis or strategic bet?** — the thing you're trying to prove or disprove (e.g., "Mid-tier mobile studios will pay $2k+/mo for real-time audience analytics because existing tools have a 48-hour lag")
7. **Who's the target customer/ICP?** — describe the ideal customer profile (e.g., "Head of Growth at a mobile gaming studio, 10–50 employees, $1M–$10M ARR, currently using Firebase + manual spreadsheets")

### Group 3: Project Type & Modules

8. **What type of project is this?**
   - **Market entry** (new market, new product) → all modules, entity type: "prospect"
   - **Growth strategy** (existing product, new channels/segments) → all modules, entity type: "prospect"
   - **Competitor research** (competitive intelligence, landscape mapping) → no discovery/pipeline, dashboard on, entity type: "competitor"
   - **Product launch / GTM** (go-to-market planning) → all modules, entity type: "prospect"
   - **Internal implementation** (system rollout, process change) → pipeline + dashboard, no discovery, entity type: "workstream"
   - **Vendor / partner evaluation** (tool or partner selection) → all modules, entity type: "vendor"
   - **Due diligence** (M&A, investment evaluation) → all modules, entity type: "target"
   - **Business case** (investment decision, strategic proposal) → no discovery/pipeline, optional dashboard, entity type: "option"
   - **Transformation / change** (organisational transformation) → all modules, entity type: "initiative"
   - **Custom** → ask which modules to include

   (e.g., "Internal implementation — we're rolling out a new CRM across the sales team")

9. **Do you need a discovery/outreach pipeline?** (Yes/No)
   - If yes: What's the primary entity you're tracking? (e.g., "studio", "customer", "partner", "company")
   - If no: Will skip discovery/, pipeline, outreach-sequence skill, gtm-specialist agent, discovery-strategist agent

10. **Do you have a CSV source-of-truth file yet?** (Yes/path or No)
    - If yes: use that path for `{{PIPELINE_SOURCE_OF_TRUTH}}` (e.g., "data/gaming-studios.csv")
    - If no: default to `data/entities.csv`

### Group 3A: Feature Selection

16. **Which features do you want to use?** (You can always enable more later)

    | Feature | What it does | Default |
    |---------|-------------|---------|
    | Scoring matrix | Score and compare strategic options on custom dimensions | On |
    | Kill conditions | Define falsifiable thresholds that signal when to stop or pivot | On |
    | Evidence grading | Tag every claim with [CONFIRMED], [SECONDARY], [INFERENCE], or [ASSUMPTION] | On |
    | Weekly reports | Generate periodic stakeholder summaries via `/weekly-report` | On |
    | Context snapshots | Pre-computed summaries for fast session loading | On |
    | Discovery pipeline | Track outreach, calls, and entity status | Based on Q9 |
    | Dashboard | Live web dashboard deployed to Vercel | Based on Q11 |

    Ask: "Are there any features you'd like to turn OFF? (Enter numbers, or 'all on' to keep defaults)"
    (e.g., "Turn off scoring and weekly reports — we're just doing research for now")

### Group 4: Dashboard & Deployment

11. **Do you want a live dashboard?** (Yes/No)
    - If yes: What Vercel project name or URL? → sets `{{DASHBOARD_URL}}` (e.g., "https://acme-strategy.vercel.app")
    - If no: Dashboard files can be deleted

### Group 5: Scoring Dimensions

12. **What dimensions do you want to score your strategic options on?** (e.g., White Space, Urgency, Feasibility, Defensibility, Revenue Potential)
    - Suggest defaults based on project type:
      - Market entry: White Space, Urgency, Feasibility, Defensibility, Revenue Potential
      - Growth: Growth Potential, CAC Efficiency, Retention Impact, Speed to Market, Scalability
      - Competitor research: Market Share, Product Strength, Pricing Power, Growth Trajectory, Threat Level
      - Product launch / GTM: Market Readiness, Channel Fit, Competitive Timing, Resource Requirement, Revenue Impact
      - Internal implementation: Business Impact, Technical Complexity, Change Readiness, Resource Cost, Timeline Risk
      - Vendor / partner evaluation: Capability Fit, Total Cost, Integration Effort, Vendor Stability, Lock-in Risk
      - Due diligence: Strategic Fit, Financial Health, Integration Risk, Synergy Potential, Cultural Alignment
      - Business case: ROI Potential, Strategic Alignment, Execution Risk, Stakeholder Support, Opportunity Cost
      - Transformation / change: Impact Scope, Organisational Readiness, Resource Requirement, Risk Level, Time to Value
    - Update `memory/scoring.md` with chosen dimensions
    - Example: "We use: Market Size, Willingness to Pay, Technical Feasibility, Speed to Launch, Defensibility"

### Group 6: Kill Conditions

13. **Define 4–6 kill conditions** — falsifiable thresholds that, if crossed, mean the project should stop or pivot. Each should be specific and measurable.
    - Provide examples based on project type:
      - Market entry: "<4/15 prospects rank pain in top 3", "No WTP signal above $12k/yr after 10 calls"
      - Growth: "CAC exceeds $120 after 3 months", "Conversion rate below 2% after 500 trials"
      - Competitor research: "Fewer than 3 viable competitors identified after 4 weeks", "No clear white space found in the landscape"
      - Product launch / GTM: "Pre-launch signups below 500 after 6 weeks", "Channel partner conversion below 5%"
      - Internal implementation: "User adoption below 40% after 3 months", "Integration costs exceed budget by >30%"
      - Vendor / partner evaluation: "No vendor scores above 3/5 on critical requirements", "Total cost exceeds budget ceiling"
      - Due diligence: "Revenue claims can't be verified from available data", "Cultural alignment scores below threshold after site visits"
      - Business case: "Board rejects proposal at Q2 review", "ROI falls below 15% in revised model"
      - Transformation / change: "Key sponsor leaves the organisation", "Employee engagement scores drop >10 points"
    - Example answer: "1. Fewer than 3/10 studios rank our pain point in their top 3. 2. No willingness-to-pay signal above $1k/mo after 15 discovery calls. 3. TAM estimate falls below $50M. 4. Unable to secure 5 design partners in 6 weeks."

---

## Optional Seed Phase — Seed Your Second Brain (~5 min)

**Run this for BOTH Quick Start and Full Setup**, after the structural questions and before the validation table. First ask: "Want to spend ~5 minutes seeding your project with any material you already have? (y/n — skip is fine, you can seed anytime later.)" If `n`, proceed directly to the validation step. If `y`, ask questions S1–S5 below.

Explain to the user:

> The system's real value shows up once it's populated — memory that carries across sessions, evidence trails, hypotheses that get pressure-tested. If you have *any* existing material (even messy notes), we can seed it now so the next session starts warm instead of empty.
>
> Everything below is **optional** — skip anything you don't have. Skipped items become TODO markers that `/session-start` will surface later so you don't forget.

Ask these 5 questions in order. Each accepts a single-word skip (`skip`, `none`, or empty).

**S1. Existing research / raw material**
> "Paste any existing research, memos, bullet points, links, competitor notes, transcripts — anything you've already collected about this project. Messy is fine; we won't restructure on import."

- If answered: append verbatim to `memory/research.md` under a new section `## Raw material (imported {{DATE}})` with a provenance header noting "imported during onboard — not yet graded for evidence". Do **not** reformat.
- If skipped: add `- [ ] Seed memory/research.md with any existing material you have` to the `## Seed TODOs` section of `memory/MEMORY.md` (create the section if missing).

**S2. Known entities**
> "Name 3–5 {{ENTITY_TYPE_PLURAL}} you already know you care about. One per line. A one-line note after each (optional) helps future-you remember why."
>
> Example:
> ```
> Acme Corp — current market leader, pricing opaque
> Nexus Payments — intro from Jane last month
> DentaSync — similar model in adjacent vertical
> ```

- If answered: for each entity:
  - Append a row to `{{PIPELINE_SOURCE_OF_TRUTH}}` (usually `data/entities.csv`) with `name`, auto-generated `slug`, `status: "Not started"`, and the user's one-liner in the `notes` column. Other columns blank.
  - Create stub file `research/entities/<slug>.md` containing:
    ```
    # <name>

    _Added during onboard on {{DATE}}. Notes: <user's one-liner>_

    _TODO: run `/enrich-entity <slug>` to populate this teardown._
    ```
  - If the file `research/entities/<slug>.md` already exists from a previous run, skip (do not overwrite).
- If skipped: add `- [ ] Add your first {{ENTITY_TYPE_PLURAL}} to {{PIPELINE_SOURCE_OF_TRUTH}}` to `## Seed TODOs`.

**S3. Gut hypothesis**
> "In one sentence, what do you currently *believe* about this problem or market? Even if you're unsure — we'll pressure-test it later. This becomes your working hypothesis, tagged `[ASSUMPTION]` until evidence changes it."

- If answered AND different from the formal `strategicHypothesis` (Q6), append to `memory/decisions.md` under a new entry:
  ```
  ## {{DATE}} — Initial working hypothesis [ASSUMPTION]

  <user's sentence>

  **Status**: Unvalidated. Pressure-test with `/critical-reasoning` once seed discovery is underway.
  ```
- If the user's sentence matches Q6 (the formal hypothesis), skip this write — it's already captured.
- If skipped: add `- [ ] Write an initial working hypothesis to memory/decisions.md` to `## Seed TODOs`.

**S4. One question for this week**
> "What's ONE question you need answered in the next 7 days? This becomes your first priority in STATUS.md so `/session-start` surfaces it every session until it's resolved."

- If answered: add a row to `STATUS.md` "In Progress" with:
  - Workstream: `Discovery` (or `Research` if discovery module is disabled)
  - Item: the user's question
  - Owner: first name from `{{TEAM}}` (or `"TBD"`)
  - Started: `{{DATE}}`
  - Notes: `Seeded at onboard`
- If skipped: add `- [ ] Pick one question to focus on this week and add it to STATUS.md` to `## Seed TODOs`.

**S5. Top worry**
> "What would make you kill this project? One sentence. (If it's already in your kill conditions from Q13, just say 'covered'.)"

- If answered AND meaningfully different from existing kill conditions: append to the `memory/MEMORY.md` Kill Conditions table as a candidate row with status `UNTESTED` and a note "Surfaced during onboard — refine into falsifiable threshold".
- If "covered" or skipped: no action, no TODO.

After Phase 3, proceed to the Validation table below.

---

## Validation / Dry-Run Step

After all answers are collected (whether via Quick Start or Full Setup) but **before** any file replacement, present a summary table to the user for confirmation:

> **Here's what I'm about to set. Please confirm or request changes.**
>
> | Placeholder | Value |
> |---|---|
> | `{{PROJECT_NAME}}` | _answer_ |
> | `{{PROJECT_SLUG}}` | _auto-generated_ |
> | `{{ONE_LINE_DESCRIPTION}}` | _answer_ |
> | `{{GOAL}}` | _answer_ |
> | `{{TEAM}}` | _answer_ |
> | `{{SCOPE_DEFINITION}}` | _answer_ |
> | `{{OUT_OF_SCOPE}}` | _answer_ |
> | `{{STRATEGIC_HYPOTHESIS}}` | _answer_ |
> | `{{ICP_DESCRIPTION}}` | _answer_ |
> | `{{ENTITY_TYPE}}` | _answer_ |
> | `{{ENTITY_TYPE_PLURAL}}` | _auto-generated_ |
> | `{{PIPELINE_SOURCE_OF_TRUTH}}` | _answer or default_ |
> | `{{DASHBOARD_URL}}` | _answer or default_ |
> | `{{DIM_1}}` – `{{DIM_6}}` | _listed dimensions_ |
> | `{{DATE}}` | _today's date_ |
> | **Modules included** | discovery: yes/no, dashboard: yes/no |
> | **Kill conditions** | _listed_ |
> | **Goal** | _{answer from Q14 or Quick Start Q6}_ |
> | **Experience level** | _{answer from Q15, or "Not asked" if Quick Start}_ |
> | **Features disabled** | _{list of disabled features, or "None"}_ |
> | **Seed — raw material** | _{word-count of pasted material, or "skipped"}_ |
> | **Seed — entities** | _{count of entities seeded, or "skipped"}_ |
> | **Seed — working hypothesis** | _{"yes" if distinct from formal hypothesis, else "same as formal", else "skipped"}_ |
> | **Seed — this-week question** | _{the question, or "skipped"}_ |
> | **Seed — top worry** | _{"added to kill conditions", or "covered", or "skipped"}_ |
>
> **Proceed?** (Yes / Edit a value / Start over)

Only proceed with file modifications once the user confirms.

---

## After Questions — Bulk Replace

Once the user confirms and all answers are finalised:

1. **Search and replace all `{{PLACEHOLDER}}` values** across every file in the project:
   - `{{PROJECT_NAME}}` → answer to Q1
   - `{{PROJECT_SLUG}}` → lowercase, hyphenated version of Q1
   - `{{ONE_LINE_DESCRIPTION}}` → Q2
   - `{{GOAL}}` → Q3
   - `{{TEAM}}` → Q4
   - `{{SCOPE_DEFINITION}}` → Q5 (in-scope part)
   - `{{OUT_OF_SCOPE}}` → Q5 (out-of-scope part)
   - `{{STRATEGIC_HYPOTHESIS}}` → Q6
   - `{{ICP_DESCRIPTION}}` → Q7
   - `{{ENTITY_TYPE}}` → Q9 entity name (singular)
   - `{{ENTITY_TYPE_PLURAL}}` → Q9 entity name (plural)
   - `{{PIPELINE_SOURCE_OF_TRUTH}}` → Q10
   - `{{DASHBOARD_URL}}` → Q11
   - `{{DIM_1}}` through `{{DIM_6}}` → Q12 dimensions
   - `{{DATE}}` → today's date

2. **Populate kill conditions** in:
   - `memory/MEMORY.md` Kill Conditions table
   - `docs/executive-summary.md` §6 Kill Conditions table
   - `memory/discovery.md` Kill Condition Tracker (if discovery module active)
   - `context/project-state.md` Kill Conditions table

3. **Remove optional modules** based on project type (Q8) and user answers (Q9):

   Module defaults by project type:
   - Market entry → discovery: yes, pipeline: yes, dashboard: yes
   - Growth strategy → discovery: yes, pipeline: yes, dashboard: yes
   - Competitor research → discovery: no, pipeline: no, dashboard: yes
   - Product launch / GTM → discovery: yes, pipeline: yes, dashboard: yes
   - Internal implementation → discovery: no, pipeline: yes, dashboard: yes
   - Vendor / partner evaluation → discovery: yes, pipeline: yes, dashboard: yes
   - Due diligence → discovery: yes, pipeline: yes, dashboard: yes
   - Business case → discovery: no, pipeline: no, dashboard: optional
   - Transformation / change → discovery: yes, pipeline: yes, dashboard: yes
   - Custom → ask user

   Apply removals:
   - If no discovery: delete `discovery/`, `memory/discovery.md`, `context/pipeline-state.md`, `dashboard/pipeline.html`, `skills/pipeline-update/`, `skills/outreach-sequence/`, `.claude/agents/discovery-strategist.md`, `.claude/agents/gtm-specialist.md`
   - If no pipeline: delete `skills/pipeline-update/`, `skills/outreach-sequence/`, `.claude/agents/gtm-specialist.md`
   - If no dashboard: delete `dashboard/`

4. **Apply feature-level removals** based on Q16 (Full Setup) or structure selection (Quick Start):

   - **Scoring off**: Skip Group 5, remove `memory/scoring.md`, remove `dashboard/scoring.html`, skip `/compare-options` skill mention in CLAUDE.md skills table
   - **Kill conditions off**: Skip Group 6, remove kill condition sections from template files (leave the table headers but mark as "Not configured — enable kill conditions in project.config.json to use this feature")
   - **Evidence grading off**: Add a note to CLAUDE.md: "Evidence grading is disabled for this project. Claims are not tagged with confidence grades."
   - **Weekly reports off**: Remove `/weekly-report` skill reference
   - **Context snapshots off**: Remove `context/` directory, update CLAUDE.md to note snapshots are disabled
   - **Minimal mode**: Removes `discovery/`, `dashboard/`, pipeline skills, scoring, kill conditions, evidence grading, weekly reports, context snapshots — keeps only `research/`, `memory/` (MEMORY.md, research.md, decisions.md), `docs/`, and basic skills (onboard, session-start, session-end, health-check, enrich-entity, critical-reasoning, decision, synthesise)

5. **Remove remaining `{{PLACEHOLDER}}` markers** — scan all files for any unreplaced `{{` patterns and either fill them with sensible defaults or flag them for the user.

### Step 5.5: Generate Sample Entity CSV

If the discovery module is active and no existing CSV was provided (Q10 = No), create `data/entities.csv` with the correct headers and 2 example rows so the user can see the expected format:

```csv
name,slug,status,tier,category,last_contact,next_action,channel,notes
Example Corp,example-corp,Not started,Tier 2,Direct competitor,,Research website,Web,Added as example — delete this row
Demo Inc,demo-inc,Not started,Tier 3,Adjacent,,Initial research,Web,Added as example — delete this row
```

Ensure the `data/` directory exists before writing the file.

### Step 5.6: Generate project.config.json

Write the project configuration to `project.config.json` at the repo root using the collected answers. Follow this schema:

```json
{
  "templateVersion": "1.0.0",
  "templateSource": "github.com/DiffTheEnder/DSS-Claude-Stack",
  "projectName": "<Q1>",
  "projectSlug": "<auto-generated slug>",
  "projectType": "{selected type}",
  "oneLineDescription": "<Q2>",
  "goal": "<Q3>",
  "team": "<Q4>",
  "scope": "<Q5 in-scope>",
  "outOfScope": "<Q5 out-of-scope>",
  "strategicHypothesis": "<Q6>",
  "icpDescription": "<Q7>",
  "entityType": "<Q9 singular>",
  "entityTypePlural": "<Q9 plural>",
  "pipelineSourceOfTruth": "<Q10 or default>",
  "dashboardUrl": "<Q11 or default>",
  "modules": {
    "discovery": true/false,
    "pipeline": true/false,
    "dashboard": true/false
  },
  "features": {
    "scoring": true/false,
    "killConditions": true/false,
    "evidenceGrading": true/false,
    "weeklyReports": true/false,
    "contextSnapshots": true/false
  },
  "scoringDimensions": ["<Q12 dimensions>"],
  "killConditions": ["<Q13 conditions>"]
}
```

6. **Run verification**:
   ```bash
   grep -r "{{" --include="*.md" --include="*.js" --include="*.html" .
   ```
   Should return zero results (all placeholders replaced).

### Step 6.3: Write seed material (from Optional Seed Phase)

Apply the writes described in the Optional Seed Phase above. The ordering matters — do these **after** placeholder replacement so `{{DATE}}`, `{{PIPELINE_SOURCE_OF_TRUTH}}`, `{{ENTITY_TYPE}}`, `{{ENTITY_TYPE_PLURAL}}`, and `{{TEAM}}` resolve correctly:

- **S1 raw material** → append to `memory/research.md`
- **S2 entities** → append rows to `data/entities.csv` (or configured `pipelineSourceOfTruth`) **and** create `research/entities/<slug>.md` stubs. Create `research/entities/` if it doesn't exist.
- **S3 working hypothesis** → append to `memory/decisions.md` (only if distinct from formal hypothesis)
- **S4 this-week question** → append row to `STATUS.md` In Progress
- **S5 top worry** → append candidate row to `memory/MEMORY.md` Kill Conditions table

For every **skipped** S-question, ensure `memory/MEMORY.md` has a `## Seed TODOs` section with the corresponding `- [ ]` item. Create the section just above the `## Important File Paths` section if missing.

### Step 6.5: Transform README

After verification, replace the open-source template README with a project-instance README. Generate a new `README.md` at the repo root containing:

- **Project name** as the top-level heading
- **Description** — the one-liner from Q2
- **Goal** — the measurable objective from Q3
- **Team** — from Q4
- **Status** — "Initialised — onboarding complete, discovery not yet started"
- **Folder map** — a brief overview of the directory structure and what each folder contains
- **Key docs** — links to:
  - `memory/MEMORY.md` (project memory)
  - `docs/executive-summary.md` (executive summary)
  - `context/project-state.md` (current state)
  - `memory/scoring.md` (scoring framework)
  - `memory/discovery.md` (discovery tracker, if active)
- **Dashboard** — link to `{{DASHBOARD_URL}}` if the dashboard module is active, otherwise note "Dashboard not configured"
- **Generated by** — "Initialised from DS Strategy Stack on `{{DATE}}`"

Do **not** include template-level instructions, contribution guidelines, or licence information from the original README — this is now a project-specific document.

7. **Rebuild dashboard** (if kept):
   ```bash
   cd dashboard && npm install && node build-data.js
   ```

8. **Report completion** to the user using the structured template below (don't free-form it).

### Step 8: Completion report — "Your Next 3 Moves"

Print this structured report. The "Your Next 3 Moves" section is **dispatched by project type** — use the table below.

```
  Onboarding complete.

  Project:     {{PROJECT_NAME}}
  Type:        {selected type label}
  Modules:     discovery={yes/no}, pipeline={yes/no}, dashboard={yes/no}
  Features:    {comma-separated list of enabled features}
  Seed data:   {count of seeded items, or "none — see Seed TODOs in memory/MEMORY.md"}
  Files:       project.config.json, README.md, memory/, data/entities.csv

  ───────── Your next 3 moves ─────────
  {project-type-dispatched block from the table below}

  ───────── Or take the guided tour ─────────
  Run /tour for a ~15-minute walkthrough on your real seed data.
  It runs /enrich-entity, /critical-reasoning, and /session-end
  end-to-end so you feel the loop before working for real.

  ───────── Docs worth reading now ─────────
  - docs/recipes/                    — workflow recipes for common scenarios
  - docs/memos/evidence-grading.md   — how claims get tagged
  - README.md "Your first 30 minutes" — narrative onboarding recap

  This skill is no longer needed. You can delete `skills/onboard/`.
```

**Project-type → "Your Next 3 Moves" dispatch table.** Use the row for the project type selected in Q8 (or Quick Start Q4).

| Project type | Move 1 | Move 2 | Move 3 |
|---|---|---|---|
| Market Entry | `/bottom-up-tam` on your target market (user-level skill) | `/critical-reasoning` on your working hypothesis | `/compare-options` on 2–3 entry modes (direct, partner, acquire) |
| Growth Strategy | `/critical-reasoning` on current growth hypothesis | `/enrich-entity` on top 3 competitors | `/gtm-playbook` (user-level) for the chosen motion |
| Competitor Research | `/enrich-entity <first seeded entity>` | Repeat `/enrich-entity` for each seeded entity | `/synthesise` across the enriched set to find white space |
| Product Launch / GTM | `/critical-reasoning` on positioning statement | `/gtm-playbook` (user-level) | `/pricing-packaging` (user-level) |
| Internal Implementation | `/critical-reasoning` on rollout plan | `/burning-platform` (user-level) for the change narrative | `/decision` to lock phase 1 scope |
| Vendor / Partner Evaluation | `/enrich-entity` on each seeded vendor | `/compare-options` across vendors on your scoring dimensions | `/decision` on the chosen vendor with full rationale |
| Due Diligence | `/enrich-entity` on the target | `/critical-reasoning` on the investment thesis | `/synthesise` into a go/no-go memo |
| Business Case | `/critical-reasoning` on the thesis | `/unit-economics-modeler` (user-level) for CAC/LTV/payback | `/compare-options` on 2–3 paths |
| Transformation / Change | `/burning-platform` (user-level) | `/partnership-ecosystem-strategy` (user-level) | `/product-roadmap-prioritisation` (user-level) for the sequenced plan |
| Custom | `/session-start` (orient) | `/critical-reasoning` on your hypothesis | `/synthesise` of anything you have so far |

If any move references a seeded entity or hypothesis that the user *did not* provide in Phase 3, substitute a fallback:
- Missing entity → "Add your first {{ENTITY_TYPE}} to `{{PIPELINE_SOURCE_OF_TRUTH}}`, then run `/enrich-entity`"
- Missing hypothesis → "Write your first working hypothesis to `memory/decisions.md`, then `/critical-reasoning` on it"

---

## After Onboarding

This skill is no longer needed. The user can:
- Delete the `skills/onboard/` directory
- Or keep it for reference

Suggest: "Onboarding complete. You can delete `skills/onboard/` — it's no longer needed."
