---
name: roadmap-generator
description: >
  Transforms live Jira data into two roadmap views: a customer-facing timeline and an internal team
  view. Validates data quality before generating. Use when asked to generate a roadmap, create a
  roadmap view, or export project status into a visual format.
---

# Roadmap Generator

Pulls live data from Jira and produces two roadmap artifacts simultaneously:
1. **Customer-facing view** — high-level timeline by pillar, no Jira details
2. **Internal team view** — full detail with links, owners, dependencies, and risk flags

Includes a data quality check before generating. Flags items with missing due dates, owners, or
priorities so you can fix the data before it becomes a misleading roadmap.

---

## Setup

### Required MCPs
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
JIRA_PROJECTS: [PROJ-A, PROJ-B]          # Projects to pull from
PILLARS:                                  # How to categorize work into roadmap pillars
  - name: "Growth"
    keywords: [growth, acquisition, activation, referral]
  - name: "Platform"
    keywords: [platform, infrastructure, API, reliability]
  - name: "Experience"
    keywords: [UX, design, dashboard, notification]
  [add your pillars]
OUTPUT_DIR: ~/notes/roadmaps/
STATUS_MAPPING:                           # Map your Jira statuses to roadmap progress
  done: [Done, Released, Closed]
  in_progress: [In Progress, In Review, QA]
  planned: [To Do, Backlog, Planned]
```

---

## Instructions

### Step 1: Pull data from Jira
Use `jira_search_issues` with JQL:
```
project in (JIRA_PROJECTS) AND issuetype in (Epic, Initiative) ORDER BY duedate ASC
```
For each epic/initiative, collect: summary, status, assignee, due date, priority, description,
linked issues (for dependencies).

### Step 2: Data quality check
Before generating anything, flag issues with missing critical fields:

```
Data quality check:
  ✓ [N] items processed
  ⚠ [N] items flagged:
    - Missing due date: [PROJ-XXX, PROJ-XXX, ...]
    - Missing owner: [PROJ-XXX, ...]
    - Missing priority: [PROJ-XXX, ...]
  ✓ All high-priority items have owners [or flag if not]

Fix these before generating, or continue with flags noted in the output?
```

Wait for the user to respond before generating.

### Step 3: Categorize into pillars
For each item, match keywords from the summary and description against PILLARS configuration.
If an item doesn't match any pillar, put it in an "Other" category and flag it.

### Step 4: Estimate progress
For each item:
- **Done**: all sub-issues in done statuses → 100%
- **In progress**: ratio of done sub-issues to total, weighted by story points if available
- **Planned**: 0%, show target due date

### Step 5: Extract dependencies and risks
From issue descriptions and linked issues:
- Look for "depends on," "blocked by," "requires" language
- Look for "risk," "concern," "blocker" language
- Use `jira_search_issues` to find issues explicitly linked as "blocks" or "is blocked by"

### Step 6: Generate the two views

**Customer-facing view** (save as `roadmap-customer-YYYY-MM-DD.md`):
```markdown
# Product Roadmap — [Quarter YYYY]
*Generated [date]*

## [Pillar Name]
| Initiative | Status | Target |
|-----------|--------|--------|
| [title]   | 🟢 Complete / 🟡 In progress (X%) / ⬜ Planned | [Q1 / Q2 / H2] |

## Pipeline
[Items planned but not yet scheduled]
```

**Internal team view** (save as `roadmap-internal-YYYY-MM-DD.md`):
```markdown
# Roadmap — Internal — [Quarter YYYY]

## [Pillar Name]
| Initiative | Status | Owner | Due | Priority | Dependencies | Risks |
|-----------|--------|-------|-----|----------|-------------|-------|
| [PROJ-XXX] [title] | In progress (X%) | [name] | [date] | P[N] | [PROJ-XXX] | [flag if any] |
```

Use `write_file` to save both to OUTPUT_DIR.

### Rules
- Never hide data quality problems — surface them before generating.
- The customer-facing view must contain zero Jira issue keys or internal system references.
- Flag any item where progress estimation is uncertain (no sub-issues or story points to calculate from).
