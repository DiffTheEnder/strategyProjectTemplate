# Executive Summary — DentaSync (ANZ Market Entry)

**Status as of**: 2025-12-08
**Phase**: Discovery & Validation (week 9 of 12-16)
**Decision point**: 2025-12-20 — pivot or kill

---

## 1. Thesis

**Original (D-001)**: Mid-sized independent ANZ dental practices (2-8 chairs) will pay $600-$1,200/mo for an AI-first practice management add-on that automates recall and billing, because existing PMSs have a 10-year UX gap.

**Current working (D-003, provisional)**: Mid-sized independent ANZ practices (2-4 chairs) will pay $300-$500/mo for a **recall-only** automation product that layers on their existing PMS (Dentrix, Oasis, Praktika). Formal confirm or kill on 2025-12-20 after 4 more calls.

## 2. Market

- **TAM**: $94M AUD ARR (6,500 SAM practices × $14,400/yr avg PMS+addon spend)
- **SOM year 3**: $1.56M ARR at $400/mo × 260 practices (4% penetration)
- **Tailwinds**: post-COVID recall backlog, dentist tech fatigue, PE-backed incumbents slowing innovation
- **Headwinds**: long sales cycles (3-6 months typical), two-person buying committees, existing-PMS lock-in

Full sizing in `memory/research.md` §ANZ Market.

## 3. Competitive Landscape

4 competitors mapped (`research/entities/`):

- **DentalStack (HIGH, rising)** — AI-first US competitor; announced ANZ expansion 2025-12-08. Well-funded ($24M), ~2 quarters before landed ANZ sales presence.
- **Curve Dental (MEDIUM)** — enterprise-skewed cloud PMS, present in ANZ via Henry Schein, not perceived as recall-tool by our ICP.
- **Dentrix Ascend (LOW, MEDIUM-by-2026)** — legacy PMS going cloud. Dominant installed base. 2026 AI roadmap will eventually include recall automation.
- **Open Dental (LOW)** — open-source niche, not overlapping ICP.

**White space**: ANZ compliance (CDBS, HICAPS), add-on positioning (not replacement), recall-only pricing band ($300-$500).

## 4. Discovery Findings (3 of 15 calls done)

- **Recall is universally the top-2 pain** across 3 practices of different sizes and locations (Sydney/Melbourne/Brisbane). KC-1 passing cleanly.
- **WTP signals sit between $300 and $500/mo**. Maximum observed: $500. Original hypothesis ($800+) is **failing** (KC-2).
- **Buying committees** are real for 4+ chair practices (principal + practice manager). Single-chair practices are principal-only.
- **Practice scale effect**: larger practices (5+) with dedicated practice managers absorb recall pain operationally. Our ICP may need to tighten from 2-8 to 2-4 chairs.
- **Category anchor**: price anchors form around standalone recall tools ($150/mo), not PMS add-ons. We're fighting gravity if we price above $500.

Processed call notes: `discovery/calls/`. Cross-call synthesis: `memory/discovery.md`.

## 5. Product

- Phase 2 scope narrowed to **recall automation only** (per D-002). Billing and scheduling deferred.
- Integration stack for MVP: Oasis (REST API), Dentrix (local-agent install).
- Build estimate: 8-10 weeks to beta (Priya, 2025-12-01).
- Clickable Figma prototype in progress (target 2025-12-20).

## 6. Kill Conditions

| # | Condition | Status | Trend |
|---|-----------|--------|--------|
| 1 | <4/10 practices rank recall in top-3 pains | **PASSING** (3/3) | Stable |
| 2 | No WTP signal >$800/mo after 10 calls | **FAILING** | Worsening — max $500 |
| 3 | TAM <$50M AUD ARR | **PASSING** (~$95M) | Stable |
| 4 | Unable to secure 2 design-partner LOIs within 6 weeks | **PASSING** (2 tentative) | On track |

**KC-2 revision under consideration**: threshold likely needs adjustment from $800 → $400 to reflect D-003 narrowing. Formal decision alongside 2025-12-20 pivot review.

## 7. Risks

1. **DentalStack ANZ landing** — estimated 2 quarters before they have sales presence. Must ship beta before Q2 2026. Mitigation: aggressive beta timeline.
2. **Dentrix Ascend 2026 AI recall** — announced, not shipped. If they ship recall automation *in* Dentrix, we lose differentiation. Mitigation: ship and land design partners before Dentrix's announcement becomes reality.
3. **WTP anchoring below sustainability** — if $400/mo is the ceiling, unit economics need careful modelling. CAC must stay under 6-month payback.
4. **Buying-committee complexity** — two-person decisions at 4+ chair practices add time; factor into CAC modelling.

## 8. Team & Timeline

**Team**: Sam (discovery, GTM), Priya (product, tech).

**Timeline**:
- Phase 1 (Oct 1 – Nov 15): Market mapping, competitor research — ✅ complete
- Phase 2 (Nov 15 – Feb 28): Discovery (15 calls) + pivot decision + Figma prototype — **in-flight** (week 9)
- Phase 3 (Mar 1 – May 15): Build beta (if go) / deliver no-go memo (if no-go)
- Phase 4 (May 15 – Aug 30): Beta with 5 design partners (if go)

**Decision gate**: 2025-12-20 pivot or kill review. Go-path by 2026-02-28 requires KC-2 revised and met, 2 signed LOIs, and successful Figma-prototype feedback.
