# Example Project — DentaSync

**This is a demo, not your project.** It's a fully-populated example project — memory, discovery calls, competitor teardowns, decisions, a weekly synthesis memo — so you can see what the DS Strategy Stack looks like *after* a few weeks of real work, before doing your own.

Delete it any time with `rm -rf examples/demo`. It costs nothing to keep around — it's a few hundred KB of markdown.

---

## The scenario

**DentaSync** is (fictional) a two-person team evaluating whether to build an AI-first practice management SaaS for mid-sized independent dental practices in Australia and New Zealand. Their working hypothesis:

> Mid-sized independent ANZ dental practices (2–8 chairs) will pay $600–$1,200/month for an AI-first practice management add-on that automates recall and billing, because existing PMSs have a 10-year UX gap and dentists want to stop fighting their software.

This is a realistic but **invented** scenario. Any resemblance to real dental software companies is coincidental — pricing, product details, and quotes are fabricated for illustrative purposes.

## What's populated

- `project.config.json` — market-entry project type, all modules/features on
- `memory/` — all 5 files with 6 weeks of research, discovery findings, decisions, scoring
- `context/` — all 4 snapshots, current as of 2025-12-08
- `discovery/calls/` — 3 processed discovery calls showing the evidence-graded format
- `research/entities/` — 4 enriched competitor teardowns (DentalStack, Curve Dental, Dentrix Ascend, Open Dental)
- `data/entities.csv` — 8 rows of competitors and prospective design partners
- `docs/executive-summary.md` — complete 8-section summary
- `docs/output/weekly-synthesis-2025-12-05.md` — last Friday's synthesis memo
- `STATUS.md` — current in-progress / completed / blocked items

## What's *interesting* in this demo

1. **Kill condition #2 is FAILING.** The team's WTP hypothesis ($800+/mo) isn't surviving discovery — max seen so far is $500/mo. The executive summary, weekly synthesis, and decisions log all show how this is being tracked transparently rather than rationalised away.

2. **The hypothesis has shifted.** `memory/decisions.md` has three entries showing hypothesis evolution: initial bet → observation that recall is the only ranked pain → consideration of a narrower "recall only" product at lower price point.

3. **Evidence grading in action.** Every claim in the competitor teardowns is tagged `[CONFIRMED]`, `[SECONDARY]`, `[INFERENCE]`, or `[ASSUMPTION]`. The synthesis memo shows distribution across grades — this is what lets you know when you've done enough research vs. when you're still guessing.

4. **The loop is visible.** You can trace a single finding (e.g., "recall is the top pain") from a call note → into `memory/discovery.md` pain rankings → into the weekly synthesis → into `memory/decisions.md` → into `docs/executive-summary.md`. The memory cascade is what the stack is actually selling.

## How to use this demo

Browse, don't execute. The files here reference paths relative to `examples/demo/` — running skills against them won't work (the skills operate on the project root). Treat this as a read-only reference.

Suggested reading order:
1. `docs/executive-summary.md` — the story in 3 minutes
2. `memory/MEMORY.md` — the current state
3. `docs/output/weekly-synthesis-2025-12-05.md` — the most recent thinking
4. One of the discovery calls, then `memory/discovery.md` to see how the call flowed into synthesis
5. One competitor teardown — note the evidence grades and Open Questions section

When you're oriented, delete the demo and start on your own project.
