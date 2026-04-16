# Recipe — Map a Competitive Landscape in One Afternoon

**When to reach for this**: You're entering a new market, evaluating a pivot, or need to produce a competitor memo for a partner/board. You have a rough list of 5–15 competitors and need to turn it into ranked intelligence with evidence grades.

**Time**: 2–4 hours end-to-end. **Skills used**: `/enrich-entity`, `/synthesise`, `/critical-reasoning`, `/decision`. **Project types this fits**: Competitor Research, Market Entry, Due Diligence, Vendor / Partner Evaluation.

---

## The loop

```
  List competitors  →  /enrich-entity (each)  →  /synthesise  →  /critical-reasoning  →  /decision
       ~15 min           ~20 min per entity       ~30 min         ~15 min             ~5 min
```

---

## Step 1 — Seed the list (~15 min)

Open `data/entities.csv` (or whatever `pipelineSourceOfTruth` points to in `project.config.json`). Add one row per competitor with just the name and a one-line note. Everything else stays blank — `/enrich-entity` fills it in.

```csv
name,slug,status,tier,category,last_contact,next_action,channel,notes
Acme Corp,acme-corp,Not started,,,,,,Current market leader — pricing opaque
Nexus Payments,nexus-payments,Not started,,,,,,Heard about them from Jane
DentaSync,dentasync,Not started,,,,,,Adjacent vertical — similar model
```

**Tip**: Don't overthink tiers or categories yet. You'll know what tier each is *after* enrichment. Tagging up front bakes in bias.

---

## Step 2 — Enrich each entity (~20 min per entity)

Run `/enrich-entity <slug>` for each row. You can batch these — the skill is stateless per entity.

```
/enrich-entity acme-corp
/enrich-entity nexus-payments
/enrich-entity dentasync
```

Each run:
- Pulls public research (pricing pages, LinkedIn, blog posts, funding news)
- Writes a teardown to `research/entities/<slug>.md` with sections: Overview, Product, Pricing, GTM, Team, Moats, Threats, Open Questions
- Tags every claim `[CONFIRMED]`, `[SECONDARY]`, `[INFERENCE]`, or `[ASSUMPTION]`
- Updates the entity row in `data/entities.csv` with tier, category, and contact status
- Regenerates the dashboard's Competitors page data

**Hidden cost warning**: Enrichment is token-heavy because it forces web research and structured output. Budget ~15–20k tokens per entity. For a 10-competitor landscape, that's 150–200k tokens total — plan the session accordingly.

**What to do if you hit a dead end**: If the skill can't find enough public info for a claim, it writes `[ASSUMPTION]` and flags it in the Open Questions section. Don't delete these — they're your next-round research queue.

---

## Step 3 — Synthesise across the set (~30 min)

Once all entities are enriched, run:

```
/synthesise research/entities/
```

This produces a cross-cutting memo at `docs/output/competitive-synthesis-<date>.md` with:

- **TL;DR** — 3 bullets
- **Findings** — pattern-level observations ("4 of 6 competitors lack X", "Pricing clusters around $Y/mo"), each with source citations
- **White space** — gaps where no competitor plays
- **Evidence distribution** — e.g., "63% of claims are `[CONFIRMED]`, 22% `[SECONDARY]`, 15% `[INFERENCE]`". This tells you how confident the synthesis is.
- **Contradictions** — where teardowns disagree (often the most interesting finding)
- **Open questions** — bundled from every teardown's Open Questions section

**Read this memo twice before going further.** The synthesis often surprises — you may find your "obvious" leader is weaker than you thought, or a peripheral entity has a moat you missed.

---

## Step 4 — Pressure-test any emergent hypothesis (~15 min)

If `/synthesise` surfaced a hypothesis worth acting on ("white space exists in <segment>"), pressure-test it:

```
/critical-reasoning "There is meaningful white space in mid-market vertical-SaaS where no incumbent offers X"
```

The 4-lens pass will:
- Pull from the synthesis memo automatically (it's in `docs/output/`)
- Surface load-bearing assumptions
- Rank top risks
- Find the strongest counter-argument

**Why this step matters**: `/synthesise` pattern-matches across evidence. `/critical-reasoning` forces devil's advocate. They cover different failure modes — skip one and you get confident-wrong answers.

---

## Step 5 — Decide (~5 min)

If the pressure-test survives, lock the finding:

```
/decision
```

Walk through the skill's prompts. Record:
- **Context**: "Competitive landscape mapping completed {date}"
- **Decision**: "Focus on <segment> as primary wedge"
- **Alternatives considered**: the 2–3 other segments you rejected
- **Evidence**: link to `docs/output/competitive-synthesis-<date>.md`
- **Reversibility**: when would we revisit?
- **Kill condition**: does this create or update a kill condition?

This writes to `memory/decisions.md` with full rationale and the evidence grades attached.

---

## Post-recipe checklist

After this loop:

- [ ] `docs/executive-summary.md` §3 (Competitive Landscape) updated with 1-paragraph summary
- [ ] `memory/MEMORY.md` "Key Facts" has 2–3 new one-liners from the synthesis
- [ ] `context/competitor-snapshot.md` regenerated (`/rebuild-snapshots`) so next session loads fast
- [ ] `/session-end` run to bundle everything into a single commit

---

## Common mistakes

- **Treating `/enrich-entity` output as gospel.** It's a starting point, not a conclusion. The `[INFERENCE]` and `[ASSUMPTION]` tags exist for a reason — follow them up.
- **Skipping `/synthesise`.** Ten enriched teardowns is not a landscape. The synthesis is what makes the set greater than the sum.
- **Deciding without `/critical-reasoning`.** The synthesis finds patterns; critical-reasoning finds the patterns you wanted to see but shouldn't trust.
- **Forgetting `/session-end`.** If you do all this and don't close the session, next week you'll reopen to cold context and redo work. Always close.
