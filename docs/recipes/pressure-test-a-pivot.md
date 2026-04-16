# Recipe — Pressure-Test a Pivot (Before You Lock It In)

**When to reach for this**: You're considering a meaningful change in direction — pivoting the ICP, killing a feature, switching vendors, changing the go-to-market motion, or abandoning a kill condition. Before you commit, this loop forces you to see what you don't want to see.

**Time**: ~90 minutes. **Skills used**: `/critical-reasoning`, `/compare-options`, `/decision`. **Project types**: all.

---

## The loop

```
  Write the pivot  →  /critical-reasoning  →  /compare-options  →  /decision
   (as claim)         (stress-test it)        (score alternatives)  (lock it in)
```

---

## Step 0 — Name the pivot as a falsifiable claim (~5 min)

Don't write a pivot as a plan. Write it as a *claim* someone could prove wrong. Examples:

- ❌ "We should move to enterprise."
- ✅ "Mid-market adoption is capped at ~15 logos/quarter; moving the ICP to enterprise unlocks 3x revenue per logo at acceptable CAC within 6 months."
- ❌ "Let's try a product-led motion."
- ✅ "A self-serve product-led motion will produce positive contribution margin per signup by month 3 and be defensible against our current sales-led incumbents' response."

The falsifiable version is what `/critical-reasoning` can test. The plan version is cope.

Write the claim. Save it somewhere you can paste into the next step.

---

## Step 1 — Pressure-test the claim (~20 min)

```
/critical-reasoning "<your falsifiable claim>"
```

The skill runs 4 lenses:

1. **Truth** — What evidence supports this? What evidence contradicts it? What's the strongest counter-argument?
2. **Consequences** — If true, what follows? If false, what breaks? What are the 2nd-order effects?
3. **Risks** — Top 3 risks, ranked. What would have to be true for each risk to *not* matter?
4. **Feasibility** — Can we actually execute? What's the hardest-to-reverse commitment this requires?

Output is a memo at `docs/output/critical-reasoning-<claim-slug>.md` with load-bearing assumptions called out explicitly.

**Read it twice.** Note specifically:
- Load-bearing assumptions (LBAs) — if any of these break, the claim breaks
- Disconfirming evidence — from your own research files
- The strongest objection

**If the pivot doesn't survive**: stop here. Log a `/decision` recording "considered and rejected" with the critical-reasoning memo as evidence. This is a *win* — you avoided a costly mistake. Most pivots should fail this step.

**If the pivot survives**: proceed to Step 2.

---

## Step 2 — Score the pivot against 2–4 alternatives (~30 min)

A pivot surviving `/critical-reasoning` doesn't mean it's the *best* path. Compare it against alternatives before committing.

```
/compare-options
```

Walk the skill through 2–4 options:

1. **Your pivot** (the surviving claim)
2. **Status quo, continued** — the boring option. Always include this. It's the baseline.
3. **Alternative 1** — another plausible response to the situation you're reacting to
4. **Alternative 2** (optional) — a third path

Score each on your project's scoring dimensions (in `memory/scoring.md`). The skill asks for evidence-graded scores, not gut feels — score 4/5 on "Revenue Potential" needs a `[CONFIRMED]` or `[SECONDARY]` source.

Output: `memory/scoring.md` is updated with the comparison and a recommendation.

**Red flag**: if your pivot only wins by margins of 0.5–1 on a 5-point scale, you're probably rationalising. Clear pivots win by 1.5+ on multiple dimensions.

---

## Step 3 — Lock the decision (~15 min)

If after Step 2 the pivot is still the right call:

```
/decision
```

The skill captures:

- **Context** — what triggered this? What evidence forced the question?
- **Decision** — what we're doing, in one paragraph
- **Alternatives considered** — paste from `/compare-options` output
- **Evidence** — link to critical-reasoning memo + synthesis + specific call numbers
- **Kill conditions impacted** — does this create, update, or retire any?
- **Reversibility** — when and on what signal would we revisit this?
- **Who knows** — which stakeholders need to hear this, in what form

Writes to `memory/decisions.md` with full rationale. This is the artefact you'll reference 6 months from now when someone asks "why did we pivot?"

---

## Step 4 — Propagate (~15 min)

A pivot that stays in `memory/decisions.md` is a secret. Propagate:

1. **`docs/executive-summary.md`** — §1 (Thesis) and §6 (Kill Conditions) need updates to reflect new direction
2. **`memory/MEMORY.md`** — leading hypothesis line, key facts, current priority
3. **Entity CSV** — if the ICP changed, re-tier existing entities in `data/entities.csv` or flag them for re-qualification
4. **`STATUS.md`** — add "Re-aligning work to pivot" as an in-progress item
5. **`/weekly-report`** — the next one should lead with the pivot, not bury it

Then `/session-end` to commit and push. The commit message should include "Decision: pivot to <X>" so git log tells the story too.

---

## When to skip this recipe

Not every decision needs 90 minutes. Skip this recipe when:

- The change is easily reversible (trying a new outreach template, testing a landing page copy variation)
- The stakes are low ($<5k, <1 week of time)
- The decision is forced by a hard constraint (runway, deadline) and there's no real choice

Use it when:

- The decision is hard to reverse (changing ICP, killing a product line, switching vendors, changing co-founders' roles)
- The stakes are >$50k or >1 month of effort
- There are genuinely multiple plausible paths
- You're uncomfortable and want to make sure you're not just rationalising

---

## Common mistakes

- **Writing the pivot as a plan, not a claim.** Plans can't be tested. Claims can. Always start with the falsifiable version.
- **Skipping `/compare-options`.** Pivots that survive critical-reasoning can still be strictly dominated by the status quo. Compare.
- **Using gut-feel scores in `/compare-options`.** The whole point is evidence-graded scoring. If you can't source a score, that's a signal you don't know enough yet.
- **Not logging rejected pivots.** A pivot you *almost* made, rejected, and didn't record will get re-proposed in 3 months. Log the rejection with reasoning so future-you (or your team) doesn't waste the cycle.
- **Deciding solo when you shouldn't.** If the pivot affects co-founders, team, or key stakeholders — run the recipe, then share the memo with them and run a 30-minute decision meeting. The artefact makes the meeting faster.
