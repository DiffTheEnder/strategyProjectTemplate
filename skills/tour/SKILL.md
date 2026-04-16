---
name: tour
description: 15-minute guided first-session walkthrough for new projects. Runs the core loop (/enrich-entity → /critical-reasoning → /session-end) on the user's real seed data so they feel the full system before working on it for real. Safely deletable after first run.
---

# Project Tour — Your First Guided Session

**When to run**: Once, right after `/onboard`. This dramatises the full loop — memory, evidence grading, hypothesis pressure-testing, session housekeeping — on your own seeded material so you leave the tour with a populated project and a felt understanding of how the pieces fit.

**Time**: ~15 minutes. **Model**: Sonnet is fine. **After the tour**: delete `skills/tour/` if you want to tidy up — it only runs once.

---

## Preamble

Print this to the user verbatim before starting:

```
  Welcome. This is a 15-minute guided tour of the loop.

  By the end you will have:
    - Experienced a warm session start on your real data
    - Run /enrich-entity on a real entity you care about
    - Pressure-tested your working hypothesis with /critical-reasoning
    - Closed the loop with /session-end and seen memory persist

  You can stop at any step and come back later — each step writes
  its output to disk, so nothing is lost if you exit mid-tour.

  Ready? (y/n)
```

Wait for `y`. If `n`, exit gracefully with: "No worries. Run `/tour` whenever you're ready."

---

## Step 1 — The warm start (2 min)

**What you do**: Run the equivalent of `/session-start` and narrate what the user is seeing.

1. Read `STATUS.md`, `memory/MEMORY.md`, and the active context snapshot in `context/project-state.md` (if it exists).
2. Show the user a condensed **session briefing**:
   ```
   Session briefing — {today's date}
   - Project: {{from project.config.json projectName}}
   - Current phase: Phase 1 — Setup
   - Seed material: {count of seed items from onboard}
   - Open TODOs: {count from memory/MEMORY.md ## Seed TODOs}
   - This-week question: {the S4 question from onboard, or "not set"}
   ```
3. Narrate:
   > "This is what every future session starts with. Right now it's thin — by week 2, with a few calls processed and a couple of synthesis memos, it'll be rich. The point is: you never brief me from scratch again. Memory carries."

---

## Step 2 — Pick a real entity to enrich (1 min)

**What you do**: Offer the user a choice.

Read `data/entities.csv` (or `{{pipelineSourceOfTruth}}` from `project.config.json`). List any entities that have `status = "Not started"` and a stub file at `research/entities/<slug>.md`.

Ask:
> "Which of these would you like me to enrich? I'll do a real research pass on it and populate its teardown. Pick one:"

Present numbered list. If the CSV is empty (user skipped S2 in onboard), ask:
> "You didn't seed any entities during onboard. Name one company/competitor/target you'd like me to research right now. Just the name is fine."

Once the user picks, confirm and move to Step 3.

---

## Step 3 — Run /enrich-entity on the chosen entity (5 min)

**What you do**: Invoke the `/enrich-entity` skill on the selected entity. Follow that skill's own instructions — this step is just a thin wrapper.

After `/enrich-entity` finishes, **pause and narrate**:

> "Notice three things:
>
> 1. Every claim in the teardown is tagged — `[CONFIRMED]`, `[SECONDARY]`, `[INFERENCE]`, or `[ASSUMPTION]`. That's the filter between signal and noise. When you review this later, you'll know exactly which claims are load-bearing vs. which need verification.
>
> 2. A row was added (or updated) in the dashboard data. If your dashboard is running, that entity is now browsable in the Competitors or Pipeline page.
>
> 3. The teardown lives at `research/entities/<slug>.md`. Any future session that touches this entity will load this file via Standard or Deep mode. You never redo this work."

Ask: "Ready for the next step?" Wait for confirmation.

---

## Step 4 — Pressure-test your hypothesis with /critical-reasoning (4 min)

**What you do**: Find the user's working hypothesis to pressure-test.

Priority order:
1. The S3 hypothesis from onboard, stored in `memory/decisions.md` under the `[ASSUMPTION]` tag, OR
2. The formal `strategicHypothesis` from `project.config.json`, OR
3. Ask the user: "What claim do you want me to stress-test? One sentence."

Invoke the `/critical-reasoning` skill on that claim. Follow that skill's own 4-lens flow (truth / consequences / risks / feasibility).

After `/critical-reasoning` finishes, **pause and narrate**:

> "This is the tool to reach for before any non-trivial decision. Notice:
>
> - It surfaced **load-bearing assumptions** — the bits of your hypothesis that everything else depends on. If any of these break, the bet breaks.
> - It ranked **top risks** — not every risk, just the ones that matter.
> - It found **the strongest objection** someone hostile would raise. You want to see this *before* a board meeting, not during.
>
> Run this before pivots, before big spend commitments, before strategy reviews. The output persists — rerun it in 4 weeks and diff."

Ask: "Ready to close the loop?" Wait for confirmation.

---

## Step 5 — Close with /session-end (2 min)

**What you do**: Invoke `/session-end` and let it run its 10-step housekeeping. Follow that skill's own instructions — this step is just a thin wrapper.

After `/session-end` completes, **pause and narrate**:

> "That's the full loop. What just happened:
>
> - `memory/MEMORY.md` was updated with today's activity.
> - Any hypothesis shifts from /critical-reasoning were recorded in `memory/decisions.md`.
> - Context snapshots were regenerated so next session starts warm.
> - A commit was made (check `git log`) bundling everything from this session.
>
> **This is why `/session-end` is non-optional** — it's what keeps memory warm. If you skip it, next session starts cold and you lose the compounding effect that makes the stack valuable."

---

## Step 6 — Close the tour (1 min)

Print this closing message:

```
  You've done the tour.

  What you built during this session:
    - 1 enriched entity:     research/entities/<slug>.md
    - 1 pressure-tested claim (see memory/decisions.md)
    - 1 closed session with git commit

  What to do tomorrow:
    1. Start with /session-start — it'll surface your seed TODOs
    2. Work on your this-week question (in STATUS.md)
    3. End with /session-end — always

  Your next moves by project type are printed at the top of
  memory/MEMORY.md. When in doubt, start there.

  Worth reading now:
    - docs/recipes/competitive-landscape.md
    - docs/recipes/first-discovery-call.md
    - docs/recipes/weekly-strategic-review.md
    - docs/recipes/pressure-test-a-pivot.md

  This skill has served its purpose. You can safely delete it:
      rm -rf skills/tour/

  Or keep it around as a reference — it's just a markdown file.
```

---

## Guardrails

- **Don't re-run if already run.** Before starting, check whether `memory/MEMORY.md` has a `## Tour completed` marker. If yes, ask: "Looks like you've already run the tour. Re-run anyway? (y/n)". After successful completion (Step 6), append to `memory/MEMORY.md`:
  ```
  ## Tour completed
  {today's date} — /tour walked through /enrich-entity → /critical-reasoning → /session-end.
  ```
- **Don't fabricate.** If the user has no seeded entity and refuses to name one in Step 2, exit gracefully: "No entity to enrich, no tour. Come back when you have one name — even a rough guess is fine."
- **Don't skip `/session-end`.** Step 5 is the whole point of teaching the loop. If the user tries to exit before it, warn once: "The last step is what teaches memory persistence — it's 2 minutes. Run it?"
- **Use existing skills, don't reimplement them.** Steps 3, 4, and 5 delegate to `/enrich-entity`, `/critical-reasoning`, and `/session-end` respectively. If any of those skills don't exist in the project (e.g., Minimal structure removed them), skip that step and note it: "Your project structure doesn't include `/enrich-entity` — skipping to Step 4."
