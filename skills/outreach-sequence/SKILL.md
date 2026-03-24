---
name: outreach-sequence
description: Use when designing or reviewing an outreach cadence for a set of {{ENTITY_TYPE_PLURAL}}, or when the user asks "what should I send next to X". Produces a sequenced, personalised multi-touch plan with draft messages.
---

# Outreach Sequence

**Flexible skill** — adapt the structure to the project context and {{ENTITY_TYPE}}.

---

## Sequence Types

| Type | When | Touches | Spacing |
|------|------|---------|---------|
| Cold | No prior relationship | 3–4 | 3–5 days |
| Warm intro follow-up | Mutual connection made intro | 2–3 | 2–3 days |
| Post-non-response | Sent outreach, no reply | 2–3 | 5–7 days |
| Post-meeting follow-up | After a call/meeting | 2–3 | 1–3 days |
| Re-engagement | Gone cold after prior contact | 2 | 7–14 days |

---

## Voice Standards

All outreach must follow these rules:

- **Short sentences**. No compound sentences with multiple clauses.
- **Plain words**. No corporate filler ("leverage", "synergise", "circle back", "deep dive").
- **Under 100 words** per message. Shorter is better.
- **One ask per message**. Never combine "can we chat?" with "also could you share X?"
- **Personalised opening**. Reference something specific to the {{ENTITY_TYPE}} — a recent event, their product, a shared connection.
- **Clear next step**. Every message ends with a specific, easy-to-action request.
- **No attachments on first touch**. Earn attention before sending materials.

---

## Personalisation Rules

For each {{ENTITY_TYPE}}, personalise based on:

1. **Their recent activity** — product launches, funding, hiring, press mentions
2. **Their specific pain** — if known from research, reference it directly
3. **Mutual connections** — if any exist, lead with the introduction
4. **Their role** — adapt language for C-level vs practitioner vs technical buyer
5. **Channel norms** — email is more formal; LinkedIn is more conversational

---

## Output Format

For each {{ENTITY_TYPE}}, produce:

```markdown
## {{ENTITY_NAME}} — {{SEQUENCE_TYPE}} Sequence

**Channel**: Email / LinkedIn / Intro request
**Personalisation hook**: [what makes this outreach specific to them]

### Touch 1 (Day 0)
Subject: [if email]
Body: [draft message]

### Touch 2 (Day X)
Subject: [if email]
Body: [draft message]

### Touch 3 (Day X) — optional
Subject: [if email]
Body: [draft message]
```

---

## After Drafting

1. Update pipeline tracker with outreach status
2. Update `memory/discovery.md` Outreach Log
3. If outreach requires call prep, create `discovery/prep/{{ENTITY_SLUG}}-prep.md`
