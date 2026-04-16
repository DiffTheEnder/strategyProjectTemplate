# Recipe — Run Your First Discovery Call (End-to-End)

**When to reach for this**: You've booked a call with a prospective customer, design partner, or target interviewee and want the full loop: prep → call → process → update hypothesis. This is the workflow that shows the stack at its best.

**Time**: ~45 min prep, 45–60 min call, ~20 min processing. **Skills used**: `/outreach-sequence` (optional), `/process-call`, `/critical-reasoning`. **Project types this fits**: Market Entry, Growth Strategy, Product Launch / GTM, Vendor Evaluation, Due Diligence, Transformation.

---

## The loop

```
  /outreach-sequence  →  templates/call-prep.md  →  CALL  →  /process-call  →  /critical-reasoning?
     (book the call)        (prep the call)                   (structure notes)   (if hypothesis shifts)
```

---

## Step 0 — Book the call (skip if already booked)

If you haven't reached out yet, run:

```
/outreach-sequence <entity-slug>
```

The skill drafts a 3-touch cadence (LinkedIn → email → follow-up email) personalised with whatever's in `research/entities/<slug>.md`. Review, tweak, send. Update the entity row in `data/entities.csv` with `status: Contacted` and `last_contact: <date>`.

---

## Step 1 — Prep the call (~45 min)

Create `discovery/calls/<date>-<entity-slug>-prep.md` from `templates/call-prep.md`. The template has sections:

- **Entity snapshot** — pull from `research/entities/<slug>.md`
- **Why this entity** — the specific reason you want to talk to *them*, not just "a customer"
- **Their stack / current workflow** — what you think they're doing today
- **Hypotheses to test** — the 3–5 things you want to learn (not "do they want this", but "is their pain what I think it is")
- **Questions to ask** — open-ended, layered, ranked by importance
- **Risks** — what could go wrong on the call (they're rushed, they don't actually use the thing, wrong seniority)

**Tip**: Ask Claude to draft the prep for you:

```
Prep me for my call with Acme Corp tomorrow. Pull from their entity teardown and
our strategic hypothesis. Output the 5 most important questions, layered.
```

Claude reads `research/entities/acme-corp.md`, `memory/MEMORY.md` (hypothesis), and `memory/discovery.md` (prior call patterns) and drafts a prep doc you can edit in 10 minutes instead of writing from scratch in 45.

---

## Step 2 — The call itself

Record if allowed (ask!). Take rough notes — full sentences aren't necessary. Mark verbatim quotes in quotes: these are gold for `/process-call` evidence extraction.

Three things to capture above all else:
1. **Pain ranking** — if they had to rank 3 problems by how much they bleed, what's the ranking?
2. **WTP signals** — any mention of budget, current spend on adjacent tools, or "we'd pay for X"
3. **Disconfirming signals** — anything that contradicts your hypothesis. These matter more than confirmations.

---

## Step 3 — Process the call (~20 min)

Paste the call notes (or transcript) and run:

```
/process-call discovery/calls/<date>-<entity-slug>.md
```

The skill:
- Reads your notes
- Extracts pain points (ranked) and writes to `memory/discovery.md` Pain Rankings
- Extracts WTP signals and writes to `memory/discovery.md` WTP Signals
- Scans for kill-condition evidence and updates `memory/MEMORY.md` Kill Conditions table
- If discovery module is active, updates the entity status to `Meeting done` in `data/entities.csv`
- Tags every extracted claim with an evidence grade
- Regenerates `context/project-state.md` so the dashboard reflects the new call

**What you'll see**: a structured summary of what was learned, *with contradictions flagged*. If this call contradicts prior calls, `/process-call` tells you.

---

## Step 4 — Pressure-test if the hypothesis moved (~15 min, only if needed)

If `/process-call` flagged a kill-condition status change or a hypothesis shift, stop and pressure-test before carrying on:

```
/critical-reasoning "Our hypothesis now reads: <updated version>. Does the evidence support it?"
```

This prevents the drift-by-a-thousand-calls failure mode where each call shifts the hypothesis slightly and you end up 6 months in with something unrecognisable.

---

## Step 5 — Update the summary

The executive summary is the single source of truth. After every call:

1. Update `docs/executive-summary.md` §4 (Discovery) with what was learned.
2. If a kill condition changed state, update §6 (Kill Conditions).
3. If a decision was made on the call ("we're going to focus on X segment"), run `/decision`.

Then `/session-end` to commit the whole lot.

---

## What this looks like after 10 calls

By the time you've run this loop 10 times:

- `memory/discovery.md` has ranked pain points across 10 interviews with frequency counts
- `data/entities.csv` has 10 rows in `Meeting done` status with next actions
- `memory/MEMORY.md` Kill Conditions table shows which are `PASSING`, `FAILING`, or `WATCH`
- Your synthesis memo (`/synthesise discovery/calls/`) tells you what 80% of prospects agree on vs. what's contested
- `docs/executive-summary.md` reads as a coherent story, not a pile of notes

This is the "second brain, after a week" state the README promises.

---

## Common mistakes

- **Skipping prep.** Without `call-prep.md`, you can't remember afterwards whether you asked the right questions. Prep forces the test to be specific.
- **Processing calls in batches.** Process each call within 24 hours. The verbatim quotes and nuance decay fast.
- **Reacting to single calls.** One call is not a signal; three calls with the same contradiction is. Let `/process-call` and `/synthesise` do the aggregation.
- **Not closing the session.** `/session-end` regenerates snapshots. Skip it and next session loads stale context.
