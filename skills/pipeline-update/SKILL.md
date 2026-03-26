---
name: pipeline-update
description: Use when the user reports a pipeline status change — intro received, meeting booked, outreach sent, response received, entity goes cold or dead. Executes all pipeline update steps in order without manual prompting.
---

# Pipeline Update

**Rigid skill** — execute ALL steps in order. Do not skip steps or ask whether to proceed.

---

## Status Lifecycle

| From | To | Trigger |
|------|----|---------|
| (new) | Not started | Entity added to pipeline |
| Not started | Contacted | Outreach sent (any channel) |
| Not started | Engaged | Inbound interest or warm intro |
| Contacted | Engaged | Response received |
| Engaged | Meeting booked | Call/meeting scheduled |
| Meeting booked | Meeting completed | Call/meeting happened |
| Any | Dead | Disqualified, unresponsive, or explicitly declined |

### Alternative Lifecycle (for implementation, transformation, and internal projects)

| From | To | Trigger |
|------|----|---------|
| (new) | Not started | Entity/workstream added to pipeline |
| Not started | In progress | Work has begun |
| In progress | Blocked | Dependency or issue preventing progress |
| Blocked | In progress | Blocker resolved |
| In progress | Completed | Work finished and verified |
| Any | Cancelled | Workstream deprioritised or abandoned |

Use this lifecycle when the project type is **Internal Implementation**, **Transformation / Change**, or any project where entities represent workstreams or initiatives rather than outreach targets.

The project type is stored in `project.config.json` under `projectType`. Check this to determine which lifecycle to use.

---

## Step 0 — Identify the Event

What happened? Map it to a status transition from the table above. If ambiguous, ask the user.

Check `project.config.json` `projectType` to determine which status lifecycle to use (outreach vs implementation).

## Step 1 — Check if New Entity

If this {{ENTITY_TYPE}} doesn't exist in the source of truth yet:
- Add to `{{PIPELINE_SOURCE_OF_TRUTH}}` (CSV is source of truth — never add only to JSON)
- Fill all available columns

## Step 2 — Update Pipeline Tracker

Update the tracker data with:
- New status
- Last contact date
- Next action and due date
- Channel used
- Any notes

## Step 3 — Update Memory

Update `memory/discovery.md` Outreach Log with:
- Date, {{ENTITY_TYPE}}, channel, action, result, next step

Update `memory/MEMORY.md` Discovery line if the count or status summary has changed.

## Step 4 — Create Prep File (if meeting booked)

If status → Meeting booked:
- Create `discovery/prep/{{ENTITY_SLUG}}-prep.md` using `templates/call-prep.md`
- Research the {{ENTITY_TYPE}} before filling the prep template

## Step 5 — Handle Dead Status

If status → Dead:
- Note reason in memory/discovery.md Outreach Log
- Update MEMORY.md to remove from active lists
- No prep file needed

## Step 6 — Rebuild Dashboard

```bash
cd dashboard && node build-data.js
```

## Step 7 — Confirm to User

Report: what changed, what files were updated, what the next action is.
