# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] — 2026-03-26

### Added
- 6 new project types: Competitor Research, Product Launch / GTM, Internal Implementation, Vendor / Partner Evaluation, Due Diligence, Business Case, Transformation / Change
- Alternative pipeline lifecycle for non-outreach projects (Not started → In progress → Blocked → Completed → Cancelled)
- `projectType` field in project.config.json
- Type-specific scoring dimensions and kill condition examples for all 10 types

### Changed
- Replaced "Corporate Strategy" with more specific types: Business Case and Transformation / Change
- Onboarding now offers 10 project types with tailored defaults for each

## [1.1.0] — 2026-03-26

### Added
- Getting Started guide for non-technical users (`docs/getting-started.md`)
- Dashboard deployment guide (`dashboard/DEPLOY.md`)
- Onboarding now asks about user goals (learning, real project, team coordination, exploration)
- Onboarding now asks about experience level and feature selection (Full, Essentials, Minimal)
- Feature toggles in `project.config.json` (scoring, kill conditions, evidence grading, weekly reports, context snapshots)

### Changed
- Simplified `/critical-reasoning` from 6 specialised lenses + leader frameworks to 4 accessible lenses (Is It True?, What Happens Next?, What Could Go Wrong?, Can It Actually Be Done?)
- Onboarding Quick Start expanded from 5 to 7 questions (added goal and structure level)
- Onboarding Full Setup expanded from 13 to 16 questions (added goals, experience, feature selection)

## [1.0.0] — 2026-03-26

### Added
- Initial open-source release
- 14-skill library (onboard, session-start, session-end, health-check, rebuild-snapshots, pipeline-update, outreach-sequence, process-call, enrich-entity, synthesise, critical-reasoning, decision, compare-options, weekly-report)
- Live dashboard with 7 pages (overview, pipeline, competitors, decisions, scoring, timeline, research hub)
- Memory layer with 5 persistent files
- Context snapshot system (4 pre-computed snapshots)
- 3 templates (call-prep, call-notes, entity-teardown)
- Evidence grading system
- Multi-agent coordination via STATUS.md
- Vercel deployment support
- Project template
