# MEMORY.md — DentaSync — ANZ Market Entry

**Project**: Evaluate ANZ market entry for an AI-first dental practice management add-on
**Goal**: Validate hypothesis and produce a go/no-go recommendation by 2026-02-28 based on 15+ discovery calls and a design-partner LOI
**Team**: Sam (discovery/GTM), Priya (product/tech)
**Current phase**: Phase 2 — Discovery & Validation (mid-flight)
**Last updated**: 2025-12-08

---

## Project State

- **Research**: Complete for 4 competitors (DentalStack, Curve Dental, Dentrix Ascend, Open Dental). ANZ-specific market sizing done. Refreshing DentalStack teardown after their ANZ expansion announcement (2025-12-08).
- **Leading hypothesis**: **Shifted** from full PMS add-on at $600-$1,200/mo to **recall-only** automation at $300-$500/mo, pending 4 more calls. Original hypothesis in `memory/decisions.md` D-001; current working version in D-003.
- **Discovery**: 3 of 15 target calls done. 4 more scheduled for Dec 10–19. Group-practice (2+ locations) segment explicitly targeted in next round to test whether WTP increases.
- **Build/Prototype**: Recall-only UX flow in Figma. Clickable prototype expected 2025-12-20.

## Current Priority

1. **Run the 4 scheduled discovery calls** — especially the 2 practice-group calls. These drive the pivot decision.
2. **Decide by 2025-12-20**: go/no-go on the $300-$500 recall-only product, or kill the thesis entirely.

---

## Memory File Index (Layer 2 — load when topic is active)

| File | Contents | Load when |
|------|----------|-----------|
| `memory/research.md` | Competitor map, ANZ dental market sizing, entity list, technical findings | Competitor/market questions |
| `memory/discovery.md` | Kill conditions, call log, WTP signals, pain rankings | Discovery/call work |
| `memory/decisions.md` | 3 strategic decisions logged — initial hypothesis, pain-ranking pivot, recall-only narrowing | Questioning the strategy |
| `memory/scoring.md` | Entry mode scoring (direct / via-PMS-partner / acquire-distribution), recommended: direct | Hypothesis/positioning work |

---

## Key Facts

- **Target**: Independent ANZ dental practices, 2-8 chairs, principal-dentist or practice-manager buyer
- **TAM (ANZ)**: ~11,500 dental practices total (8,500 AU + 3,000 NZ). SAM (2-8 chair independents): ~6,500. SOM (year 3 target): 250 practices = ~$1.5M ARR at $500/mo average [SECONDARY, IBISWorld 2024]
- **Price tested**: $600-$1,200/mo (original); shifting to $300-$500/mo (recall-only) after discovery feedback
- **Top pain (from 3 calls)**: Recall automation — all 3 practices ranked it top-2. Billing/claims second. Appointment scheduling distant third.
- **Max WTP observed**: $500/mo (Bayside Smiles, for recall-only tool). $800/mo threshold (KC-2) currently FAILING.
- **Closest competitor**: DentalStack (US-based, $600-$900/mo, maturing, just announced ANZ expansion 2025-12-08 — threat-level INCREASED)
- **Moat hypothesis**: ANZ-specific Medicare/private-health claim integration + dentist-friendly onboarding (48h setup vs. Curve's 6-week implementation)
- **Convergence window**: Before DentalStack lands ANZ sales presence (estimated Q2 2026)

---

## Key Decisions (one-liners — full rationale in `memory/decisions.md`)

1. D-001 (2025-10-01): Start with market-entry evaluation, not directly building. 6-week discovery sprint before any code.
2. D-002 (2025-11-22): Refocus discovery on recall pain after 3/3 calls ranked it #1. Drop billing/scheduling from Phase 2 scope.
3. D-003 (2025-12-05): Consider pivot to recall-only product at $300-$500/mo. Final call by 2025-12-20 after 4 more calls.

---

## Kill Conditions

| # | Condition | Status |
|---|-----------|--------|
| 1 | Fewer than 4 of 10 discovery practices rank recall automation in their top-3 pains | PASSING (3/3 so far) |
| 2 | No willingness-to-pay signal above $800/mo after 10 discovery calls | **FAILING** (max $500/mo after 3 calls) |
| 3 | TAM estimate falls below $50M AUD ARR | PASSING (est. $95M ARR) |
| 4 | Unable to secure 2 design-partner LOIs within 6 weeks | PASSING (2 tentative yes — Greenway, Bayside) |

**Note on KC-2**: The $800/mo threshold was set when we believed this was a full PMS add-on. The recall-only reframe (D-003) suggests a $400/mo threshold would be more appropriate. We'll decide whether to formally revise KC-2 after 4 more calls, via `/critical-reasoning`.

---

## Seed TODOs

<!-- Items surfaced by onboard or session-start that still need attention -->

- [ ] Revise KC-2 threshold in light of D-003, after 4 more calls (decision point: 2025-12-20)

---

## Important File Paths

| Asset | Path |
|-------|------|
| Executive summary | `docs/executive-summary.md` |
| Status board | `STATUS.md` |
| Option scoring | `memory/scoring.md` |
| Competitor synthesis | `research/entities/` |
| Market sizing | `memory/research.md` §ANZ Market |
| Target entities (CSV) | `data/entities.csv` |
| Most recent weekly | `docs/output/weekly-synthesis-2025-12-05.md` |
