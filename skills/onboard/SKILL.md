---
name: onboard
description: One-time setup skill. Guides the user through a series of questions to configure this project template for their specific strategy project. Run once at the start of a new project, then delete or archive this skill.
---

# Project Onboarding

**One-time use** — run this when starting a new project from the strategy template. It replaces all `{{PLACEHOLDER}}` values and configures optional modules.

---

## How to Run

Tell the user: "I'll walk you through setting up this project. I'll ask a series of questions, then update all template files with your answers."

---

## Question Flow

Ask these questions **one group at a time**. Wait for answers before proceeding.

### Group 1: Project Identity

1. **What's the project name?** (e.g., "Immutable Audience — Mobile", "Acme Growth Strategy")
2. **One-line description** — what is this project about in one sentence?
3. **What's the goal?** — a specific, measurable objective with a deadline
4. **Who's on the team?** — names and roles (e.g., "Dhanish (discovery), Sherry & Jeet (product)")

### Group 2: Strategic Context

5. **What's the scope?** — what's in scope and what's explicitly out of scope?
6. **What's the core hypothesis or strategic bet?** — the thing you're trying to prove or disprove
7. **Who's the target customer/ICP?** — describe the ideal customer profile

### Group 3: Project Type & Modules

8. **What type of project is this?**
   - Market entry (new market, new product) → include all modules
   - Growth strategy (existing product, new channels/segments) → include discovery + pipeline
   - Corporate strategy / planning (internal analysis) → skip discovery + pipeline
   - Custom → ask which modules to include

9. **Do you need a discovery/outreach pipeline?** (Yes/No)
   - If yes: What's the primary entity you're tracking? (e.g., "studio", "customer", "partner", "company")
   - If no: Will skip discovery/, pipeline, outreach-sequence skill, gtm-specialist agent, discovery-strategist agent

10. **Do you have a CSV source-of-truth file yet?** (Yes/path or No)
    - If yes: use that path for `{{PIPELINE_SOURCE_OF_TRUTH}}`
    - If no: default to `data/entities.csv`

### Group 4: Dashboard & Deployment

11. **Do you want a live dashboard?** (Yes/No)
    - If yes: What Vercel project name or URL? → sets `{{DASHBOARD_URL}}`
    - If no: Dashboard files can be deleted

### Group 5: Scoring Dimensions

12. **What dimensions do you want to score your strategic options on?** (e.g., White Space, Urgency, Feasibility, Defensibility, Revenue Potential)
    - Suggest defaults based on project type
    - Update `memory/scoring.md` with chosen dimensions

### Group 6: Kill Conditions

13. **Define 4–6 kill conditions** — falsifiable thresholds that, if crossed, mean the project should stop or pivot. Each should be specific and measurable.
    - Provide examples based on project type:
      - Market entry: "<X/10 prospects rank pain in top 3", "No WTP signal above $Y after Z calls"
      - Growth: "CAC exceeds $X after 3 months", "Conversion rate below X%"
      - Corporate: "Board rejects proposal", "ROI falls below X%"

---

## After Questions — Bulk Replace

Once all answers are collected:

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

3. **Remove optional modules** if not needed (Q8/Q9):
   - If no discovery: delete `discovery/`, `memory/discovery.md`, `context/pipeline-state.md`, `dashboard/pipeline.html`, `skills/pipeline-update/`, `skills/outreach-sequence/`, `.claude/agents/discovery-strategist.md`, `.claude/agents/gtm-specialist.md`
   - If no dashboard: delete `dashboard/`

4. **Remove remaining `{{PLACEHOLDER}}` markers** — scan all files for any unreplaced `{{` patterns and either fill them with sensible defaults or flag them for the user.

5. **Run verification**:
   ```bash
   grep -r "{{" --include="*.md" --include="*.js" --include="*.html" .
   ```
   Should return zero results (all placeholders replaced).

6. **Rebuild dashboard** (if kept):
   ```bash
   cd dashboard && npm install && node build-data.js
   ```

7. **Report completion** to the user with:
   - Summary of all values set
   - List of modules included/excluded
   - Suggested first actions (e.g., "Start with competitor research", "Define your first 10 targets")

---

## After Onboarding

This skill is no longer needed. The user can:
- Delete the `skills/onboard/` directory
- Or keep it for reference

Suggest: "Onboarding complete. You can delete `skills/onboard/` — it's no longer needed."
