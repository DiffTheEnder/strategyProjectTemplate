# Recipe — The Weekly Strategic Review (Friday Loop)

**When to reach for this**: End of every work-week, or before any check-in with stakeholders. This is the repeating cadence that keeps the project legible — to yourself, to your team, and to anyone asking "how's it going?"

**Time**: ~45 minutes. **Skills used**: `/session-start`, `/synthesise`, `/critical-reasoning`, `/weekly-report`, `/session-end`. **Project types**: all.

---

## The loop

```
  /session-start  →  Review  →  /synthesise  →  /critical-reasoning  →  /weekly-report  →  /session-end
     (orient)       (context)   (what changed)   (drift check)          (stakeholder copy)  (close)
```

---

## Step 1 — Start warm (~3 min)

```
/session-start
```

Tell it "Weekly strategic review." That routes to **Standard** mode — loads `context/project-state.md` so you have the current hypothesis, phase, and kill-condition status at the top of context.

Scan:
- Any kill conditions in `FAILING` status? (urgent)
- Any overdue next-actions? (chase)
- Any entities stuck in `Meeting booked` >7 days? (follow up)

---

## Step 2 — Read the week's raw activity (~10 min)

Before synthesising, *read* what actually happened:

- **Calls this week**: `ls discovery/calls/ | tail -5`
- **Research added**: `ls research/entities/ | head -10`
- **Decisions logged**: last N entries in `memory/decisions.md`
- **Dashboard changes**: pull up the live dashboard (or `data/entities.csv`)

Why read raw? Snapshots tell you what was concluded. The raw evidence is where disconfirmations and hedged language live. 10 minutes of reading is worth more than 30 minutes of re-synthesis.

---

## Step 3 — Synthesise the week (~10 min)

```
/synthesise --since "last friday"
```

(Or scope by folder: `/synthesise discovery/calls/` for just this week's calls.)

Output: a memo at `docs/output/weekly-synthesis-<date>.md` with:
- What we learned (pattern-level, not call-by-call)
- What changed (hypothesis, kill conditions, scoring)
- What we still don't know (gaps)
- Evidence distribution (confidence meter)

Read this memo. It's written for you — not for stakeholders yet.

---

## Step 4 — Drift check with /critical-reasoning (~10 min)

This is the step most people skip and shouldn't. Ask one question:

> "Given this week's synthesis, has our strategic hypothesis drifted? If yes, is the drift justified by evidence, or are we rationalising?"

Run:

```
/critical-reasoning "Our working hypothesis is <current version>. Given this week's findings (see docs/output/weekly-synthesis-<date>.md), is it still right, or has it quietly moved?"
```

The 4-lens pass will tell you if you're adapting to evidence (good) or retrofitting your hypothesis to justify continued work (bad).

If drift is real and justified → update `memory/MEMORY.md` hypothesis line and log a `/decision`. If drift is real and *not* justified → flag it, consider a /compare-options pass on whether to continue.

---

## Step 5 — Generate the stakeholder report (~8 min)

Now that you've done the thinking for yourself, write for others:

```
/weekly-report
```

Output: `docs/output/weekly-<date>.md` — a 2–3-paragraph stakeholder summary with:
- TL;DR
- Key findings (evidence-graded)
- Kill-condition status snapshot
- Next week's priorities
- Asks / blockers (if any)

Review, edit, send. This is copy-pasteable into Slack/email/Notion.

---

## Step 6 — Close the session (~4 min)

```
/session-end
```

Runs the 10-step housekeeping: file audit, memory cascade, status board sync, rebuild-snapshots, commit, push. Nothing is lost; next Monday starts with this week's synthesis pre-loaded in `context/project-state.md`.

---

## The compounding effect

Run this loop every Friday for 6 weeks and you have:

- 6 weekly synthesis memos showing how thinking evolved
- 6 stakeholder reports proving you were transparent week-by-week
- A `memory/decisions.md` that's the story of the project
- `context/project-state.md` that is *always* <7 days old and trustworthy

This is the compounding effect. Skip a week's close and the context goes cold; skip two and you start to lose the plot. The loop is the product.

---

## Variations

- **Solo founder project**: Skip Step 5 (weekly-report). You don't have stakeholders. Keep the rest — Step 4 (drift check) is the most important.
- **Consulting engagement**: Step 5's output goes straight to the client as the weekly update. Author it more formally.
- **Team project**: Have each team member run Step 1–2 in their area, then meet to discuss synthesis before running Steps 3–6 together.
- **Quieter week**: If nothing happened, still run it. A 4-line weekly report noting "no movement — here's why and what changes next week" is still valuable. Skipping signals erosion.

---

## Common mistakes

- **Running /weekly-report without Steps 1–4.** You get polished prose that sounds good but hasn't survived drift-check. Don't.
- **Treating the synthesis as the decision.** Synthesis surfaces patterns. Decisions need `/critical-reasoning` + `/decision`. Keep them separate.
- **Doing this bi-weekly.** The cadence matters. Weekly synthesis is what prevents 6-week surprises.
- **Forgetting `/session-end`.** Always. Always.
