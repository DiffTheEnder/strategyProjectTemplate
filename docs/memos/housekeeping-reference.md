# End-of-Session Housekeeping — Full Reference

Every session that produces or modifies files MUST run this checklist before finishing.

---

## Step 1: File Placement Audit

Scan all files created or modified this session. Verify each one:

| File type | Correct location | Template used? |
|-----------|-----------------|----------------|
| Entity teardown | `research/competitors/<slug>.md` | `templates/entity-teardown.md` |
| Market/TAM research | `research/market/` | — |
| Technical research | `research/technical/` | — |
| Call notes | `discovery/calls/<entity>-<date>.md` | `templates/call-notes.md` |
| Call prep | `discovery/prep/<entity>-prep.md` | `templates/call-prep.md` |
| Strategy memo | `docs/memos/` | — |
| Deck/presentation | `docs/decks/` | — |
| Data file (CSV/Excel) | `data/` | — |

If a file is in the wrong place, move it now. If created without the correct template, flag it.

## Step 2: Memory Cascade Update

| Work done | Update required |
|-----------|----------------|
| Competitor/entity research | Add/update row in `memory/research.md` |
| New target {{ENTITY_TYPE_PLURAL}} found | Update Target Entity List in `memory/research.md` |
| Technical pathway research | Update Technical Findings in `memory/research.md` |
| Outreach sent (any channel) | Update Outreach Log in `memory/discovery.md` + update `memory/MEMORY.md` Discovery line |
| Call prep created | Note in pipeline tracker for the matching {{ENTITY_TYPE}} entry |
| Call notes processed | Note in pipeline tracker for the matching {{ENTITY_TYPE}} entry |
| {{ENTITY_TYPE}} disqualified | Update `memory/MEMORY.md` Discovery line + note reason in `memory/discovery.md` Outreach Log |
| Customer discovery call | Update Pain Point Rankings + WTP Signals in `memory/discovery.md`. Update `memory/MEMORY.md` Discovery line. |
| Kill condition evidence changed | Update Kill Condition Tracker in `memory/discovery.md` + update `memory/MEMORY.md` Kill Conditions table |
| Strategic decision made | Add entry to `memory/decisions.md` + one-liner to `memory/MEMORY.md` |
| Option scoring changed | Update `memory/scoring.md` |

## Step 3: Hypothesis Review & Executive Summary Update

Ask: "Did this session produce new evidence that could affect hypothesis confidence?"

- If **YES** → run `/critical-reasoning` before updating exec summary. Only update after user confirms the briefing.
- If **NO** (structural/setup work) → skip to Step 4.

## Step 4: Status Blurb Update

Update `docs/output/status-blurb.md` every session. Rules:
- Max 4 sentences
- Plain English — no jargon (no technical codes, no internal terminology)
- Never mention internal tooling, agent workflows, file reorganisation, or process changes
- Cover: current phase, what's active, key unknown, any blockers

## Step 4b: README.md Status Sync

Copy the content of `docs/output/status-blurb.md` into the `<!-- STATUS:START -->` / `<!-- STATUS:END -->` block in `README.md`. This keeps the GitHub landing page current.

## Step 5: Project Activity Update

Assess whether this session produced exec-worthy progress. Apply the filter:
- **Log**: Concrete deliverables, milestones reached, external-facing actions (outreach sent, calls completed, research synthesis, memos)
- **Skip**: Dashboard UI work, CSS fixes, skill creation/updates, data schema changes, call prep creation, internal tooling, maintenance, housekeeping
- **Rule of thumb**: If you wouldn't mention it in a 2-minute standup with an investor, don't log it

## Step 6: STATUS.md & Work Log Update

Every session that completes work items MUST do ALL of the following:

a) Move completed "In Progress" rows → STATUS.md "Completed Recently"
b) Append the SAME rows to `docs/output/work-log.md` (append-only, never trim)
c) Trim STATUS.md "Completed Recently" entries older than 1 week
   (safe to trim — they're permanently in work-log.md)
d) Remove "Blocked / Waiting" entries that are resolved

Steps (a) and (b) happen together — never do one without the other.

## Step 7: Rebuild Dashboard Data

Always run `cd dashboard && node build-data.js` before committing. This regenerates all dashboard JSON from source-of-truth files. Include regenerated `dashboard/data/*.json` files in the commit.

## Step 8: Structure Health Check

Run only if 3+ new files created or project has grown significantly:
- Files in root that belong in a subfolder?
- Files in wrong subfolder?
- Duplicates that should be merged?
- **Versioned files (v2, v3, _old, _new, _backup)?** Keep only latest, rename clean, delete outdated.
- Templates need updating?
- `memory/MEMORY.md` still under 200 lines?

## Step 9: Commit & Push

After all updates are complete:
1. Stage all files modified during the session and housekeeping, **including regenerated `dashboard/data/*.json` files** (use specific file paths, never `git add -A`)
2. Commit with a concise message summarising the session's work (not the housekeeping itself)
3. Push to remote

## Step 10: Report

Report housekeeping outcome to user.
