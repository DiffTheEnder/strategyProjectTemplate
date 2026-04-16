# Decisions — DentaSync

Append-only log of strategic decisions with full rationale. Each decision references the evidence that supported it at the time.

---

## D-001 — 2025-10-01 — Start with market-entry evaluation, not direct build

**Context**
Sam and Priya identified dental PMS as an interesting vertical-SaaS opportunity based on prior work experience. Temptation to just start building the MVP immediately — Priya had a working prototype concept.

**Decision**
Run a 6-week discovery sprint (15 target interviews) before writing production code. Allocate $0 engineering budget during this phase. Priya to prototype in Figma only until hypothesis is validated.

**Alternatives considered**
- **Build and ship to 3 friendly practices** — Rejected: too high a commitment ($15-20k of engineering) before validating WTP. Prior experience: we shipped fast at Sam's previous company and validated too late.
- **Do a 2-week survey-only discovery** — Rejected: surveys systematically under-represent the "actually have money and will sign" signal.

**Evidence**
[INFERENCE] Prior experience at two startups where early-build decisions caused 6-12 month delays when the initial hypothesis was wrong.

**Reversibility**
High. We can always start building at week 7 if discovery is green across all kill conditions.

**Kill-condition impact**
Set the 4 initial kill conditions ($800 WTP, 4/10 recall ranking, $50M TAM floor, 2 LOIs in 6 weeks).

---

## D-002 — 2025-11-22 — Refocus discovery on recall pain

**Context**
After 3 calls (Greenway Oct 14, Bayside Nov 3, Northside Nov 21), a strong pattern emerged: all 3 ranked recall as a top-2 pain, while billing and scheduling were variable. Time spent on other pain areas was showing low ROI.

**Decision**
For the remaining 12 planned calls, reduce time spent probing billing/scheduling pain. Increase time on:
- Depth of recall pain (current workaround, weekly hours lost, WTP specifically for recall)
- Buying process (who decides, how long, what triggers a purchase)

Drop billing and scheduling from Phase 2 product scope to simplify the build estimate. Billing can return as Phase 3 if Phase 2 works.

**Alternatives considered**
- **Keep the full three-pillar scope (recall + billing + scheduling)** — Rejected: 3/3 calls said recall alone would drive a purchase. Billing was nice-to-have. Scope was driving build estimate to 20+ weeks.
- **Narrow to billing-only** — Rejected: only 2/3 flagged billing, and even those prioritised recall. Billing is a harder integration (HICAPS, private-health APIs).

**Evidence**
- [CONFIRMED] 3/3 pain rankings from `discovery/calls/`
- [CONFIRMED] 3/3 WTP anchors referenced recall specifically
- [INFERENCE] Faster time-to-MVP with narrower scope (Priya: 20wks → 10wks)

**Reversibility**
Medium. We can re-add billing in the product roadmap if post-launch data supports it, but can't easily re-test billing-specific WTP in discovery without reopening already-completed calls.

**Kill-condition impact**
None directly. KC-1 (recall ranking) is reinforced by this decision.

---

## D-003 — 2025-12-05 — Consider pivot to recall-only product at $300-$500/mo

**Context**
Weekly synthesis (`docs/output/weekly-synthesis-2025-12-05.md`) flagged that KC-2 ($800 WTP threshold) is FAILING after 3 calls with max observed WTP at $500. The recall-only narrowing in D-002 shifted the implicit product framing, and the price-point anchor shifted with it. Three options are now on the table.

**Decision (provisional — final call 2025-12-20)**
Provisionally pivot to a **recall-only product at $300-$500/mo**, to be confirmed after the 4 currently-scheduled discovery calls (Dec 10, 12, 17, 19). Pivot decision review on 2025-12-20 via `/critical-reasoning` + `/compare-options` + `/decision`.

Concurrent workstream: Priya builds a clickable Figma prototype of the recall-only flow to test in the next 4 calls.

**Alternatives considered**
- **Kill the thesis entirely** — WTP below original threshold + DentalStack ANZ expansion creates real pressure. Rejected for now because KC-1, KC-3, KC-4 still PASSING and recall pain signal is unusually clean (3/3 universal).
- **Hold the $800 price point and keep searching** — Rejected: we'd be searching for a willing outlier rather than a market.
- **Pivot to enterprise / DSO segment** — Out of scope per D-001 (independent practices only); re-opening scope this early is scope-thrashing.

**Evidence**
- [CONFIRMED] 3 WTP signals all below $800 (Greenway ~$400, Bayside $500, Northside $300)
- [CONFIRMED] 3/3 price anchors were recall-specific, not PMS-wide
- [SECONDARY] Standalone recall tools in adjacent markets (US chiropractic, UK vet) price in the $300-500/mo range
- [INFERENCE] Lower price point + narrower scope = shorter sales cycle; could compress 4-month cycle to 6-8 weeks

**Reversibility**
Provisional. A confirming decision on 2025-12-20 will convert this into a formal decision. If the next 4 calls show higher WTP in the group-practice segment, we could stretch back toward $600+/mo for multi-location practices.

**Kill-condition impact**
- KC-2 threshold likely needs revision from $800 → $400 to reflect narrower scope. Decision to be made alongside 2025-12-20 pivot call.
- No impact on KC-1, KC-3, KC-4.

**Stakeholders informed**
- Priya (building the Figma prototype)
- Greenway Dental (Dr. Anderton) — told informally that we're simplifying; positive reaction
