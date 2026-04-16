# Research — DentaSync ANZ Market Entry

**Last updated**: 2025-12-08

---

## ANZ Dental Market (sizing & dynamics)

### Market size

- **Total ANZ dental practices**: ~11,500 (8,500 AU + 3,000 NZ) [SECONDARY, IBISWorld Australia 2024, NZ Ministry of Health 2024]
- **2-8 chair independents (SAM)**: ~6,500 (56% of total) [INFERENCE, derived from ADA size survey 2023]
- **Average annual revenue per practice**: $2.3M AUD [SECONDARY, ADA Practice Income Survey 2023]
- **Practice management software spend**: $8k-$18k AUD per practice per year, typical [INFERENCE, triangulated from 3 competitor pricing pages + discovery call at Greenway]

### TAM calculation (bottom-up)

- SAM: 6,500 practices × $14,400 annual average spend = **$94M AUD ARR TAM**
- SOM (year 3 realistic): 4% market penetration = 260 practices × $6,000 ARR (at $500/mo recall-only price) = **$1.56M ARR**
- [CONFIRMED via Priya's bottom-up, cross-referenced with IBISWorld industry-spend data]

### Market dynamics

- **Consolidation**: DSO/corporate chains (Pacific Smiles, 1300Smiles) now ~11% of ANZ practices, growing ~2% per year [SECONDARY, AFR 2024]. Out of scope for DentaSync — they run Dentrix Enterprise or similar.
- **Legacy PMS lock-in**: Most independents use Dentrix, Oasis, Praktika, or D4W. Switching is painful (6-12 week migrations, data loss risk). This is why add-on strategy > replacement strategy. [CONFIRMED via Greenway call; consistent across all 3 discovery calls]
- **Medicare Child Dental Benefits Schedule** + private health insurer e-claim integrations are ANZ-specific complexity. US-built tools (DentalStack, Curve) lack native support. [INFERENCE; requires verification via tech review of DentalStack's ANZ announcement]

### Tailwinds

- Dentists aged 45+ now tech-fatigued, willing to pay for "one less thing" tools [INFERENCE, 2 of 3 calls]
- Post-COVID: recall gaps compound — practices have 3-5 years of deferred maintenance patients [CONFIRMED, discussed at Greenway and Bayside]
- Private equity rolling up PMS incumbents (Henry Schein owns Dentrix); innovation velocity slowing [SECONDARY, Reuters 2023]

### Headwinds

- Dental practice owners are notoriously slow software buyers — 3-6 month sales cycles typical [INFERENCE, all 3 calls suggested they'd "think about it" over multiple weeks]
- Budget authority is often split between principal (clinical) and practice manager (operational) — complex buying committee [CONFIRMED, Northside Family Dental call]
- Existing PMS vendors bundling AI features in 2025/2026 roadmaps [SECONDARY, Dentrix Ascend announcement]

---

## Competitor Map

See also: `research/entities/` for full teardowns.

| Competitor | Model | ANZ presence | Est. ANZ revenue | Threat level | Teardown |
|---|---|---|---|---|---|
| DentalStack | AI-first PMS add-on, US-based | Just announced (2025-12-08) | ~$0 (launching) | **HIGH (rising)** | `research/entities/dentalstack.md` |
| Curve Dental | Cloud PMS (enterprise-skew) | Yes, via reseller | ~$2-4M ARR est. | MEDIUM | `research/entities/curve-dental.md` |
| Dentrix Ascend | Cloud PMS (legacy migration) | Yes, direct + reseller | $8-15M ARR est. | LOW (innovation speed) | `research/entities/dentrix-ascend.md` |
| Open Dental | Open-source self-host | ~50 practices AU estimate | Near-zero | LOW (technical barrier) | `research/entities/open-dental.md` |

### White space hypothesis

1. **ANZ-native compliance** (Medicare CDBS, HICAPS e-claim) — no competitor handles this well out of the box [CONFIRMED via vendor documentation review]
2. **Add-on (not replacement) positioning** — all 4 main competitors are full PMS plays. None position as "layer on top of your existing Dentrix/Oasis" [CONFIRMED via vendor sites]
3. **Recall-only price point** — no competitor prices below $400/mo for a dedicated recall solution. Closest is standalone recall tools like LocalRecall ($150/mo) but those don't integrate with clinical data [INFERENCE, web search + 3 vendor reviews]

---

## Technical Findings

- **Integration surfaces needed**:
  - Dentrix (SQL-based local install): HL7 FHIR-esque export, requires agent install [INFERENCE, based on Dentrix integration partner docs]
  - Oasis (Henry Schein — cloud): REST API, tier pricing $200/mo [CONFIRMED, Oasis partner portal]
  - D4W (local): CSV export only, no API [CONFIRMED, D4W docs]
  - Praktika (NZ-heavy): REST API [SECONDARY, Praktika website]
- **Authentication**: OAuth2 via practice-level accounts. SSO via Microsoft 365 common request [INFERENCE, 2 of 3 calls]
- **Build estimate (recall-only, MVP)**: 8-10 weeks to beta with 2 integrations (Oasis + Dentrix) [Priya's estimate, 2025-12-01]

---

## Raw material (imported 2025-10-02 from original onboard)

> Initial notes pre-project: Sam's prior experience at a SaaS company that had to support ANZ-specific private health insurance integrations showed that this is a moat that US-only vendors underestimate. Three dentist friends (Greenway, Bayside, and a family connection in Auckland) were willing to take intro calls. Priya previously built a calendaring/reminder product and found recall workflows specifically underserved.

---

## Open Questions

- [ ] Will practice groups (2+ locations) show higher WTP than single-practice owners? Testing in next 4 calls.
- [ ] How hard is HICAPS integration actually? Awaiting technical spike from Priya (2025-12-15).
- [ ] What is DentalStack's actual ANZ launch plan? Public announcement was thin on detail.
- [ ] Does the recall-only pivot still need CDBS support, or is that a Phase 2 nice-to-have?
