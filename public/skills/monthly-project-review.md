---
name: monthly-project-review
description: >
  Runs on the 1st of each month. Reads a current-projects reference file, researches what changed
  over the past 30 days, and proposes a clean diff. Waits for approval before writing anything.
  After approval, generates a condensed version formatted for AI context. Trigger phrases: "run the
  monthly project review," "update my project context," or scheduled automatically on the 1st.
---

# Monthly Project Review

Keeps your current-projects reference file current. Reads what you have, researches what changed,
and proposes a structured diff (ADD / UPDATE / REMOVE / NO CHANGE). Writes nothing until you
approve. After approval, also generates a condensed version formatted for your AI context settings.

---

## Setup

### Required MCPs
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)
- **Confluence MCP** — `@dsazz/mcp-confluence`
- **Slack MCP** — `@modelcontextprotocol/server-slack`
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
PROJECTS_FILE: ~/notes/current-projects.md   # Your source-of-truth project reference file
CONTEXT_FILE: ~/notes/ai-context.md          # Condensed version for AI context
JIRA_PROJECTS: [PROJ-A, PROJ-B, PROJ-C]      # All project keys to scan
CONFLUENCE_SPACES: [PROD, ENG, STRAT]        # Space keys to search for new docs
SCAN_CHANNELS: [#product, #announcements, #leadership-updates]
LOOKBACK_DAYS: 30
```

### Projects file format
The projects file should have one section per active project:

```markdown
# Current Projects — [last updated date]

## Project Name
**Status:** [Active / On hold / Winding down]
**Owner:** [you or someone else]
**Summary:** [2–3 sentences on what this is and where it stands]
**Key links:** [Jira epic, Confluence page, etc.]
**Last updated:** [date]
```

---

## Instructions

### 1. Read the current projects file
Use `read_file` on PROJECTS_FILE. This is your baseline.

### 2. Research changes in Jira
For each project in JIRA_PROJECTS, use `jira_search_issues` to find:
- New epics created in the past 30 days
- Epics or initiatives closed/resolved in the past 30 days
- Major scope changes (large batches of issues added or removed, sprint scope changes)
- Status or ownership changes on tracked initiatives

### 3. Research changes in Confluence
Use `confluence_search` for each space in CONFLUENCE_SPACES:
- New pages created in the past 30 days (strategy docs, PRDs, decision records)
- Significant updates to existing pages linked in your projects file
- Look for pages whose titles suggest new initiatives or cancelled work

### 4. Research changes in Slack
Use `slack_get_channel_history` on SCAN_CHANNELS for the past 30 days.
Look for: priority shifts, new initiative announcements, project cancellations, leadership direction
changes, ownership transfers.

### 5. Propose the diff

Classify each change:
- **ADD** — a project or initiative that should be added to your reference file
- **UPDATE** — a project that's changed in scope, status, owner, or summary
- **REMOVE** — a project that's closed, cancelled, or no longer relevant to track
- **NO CHANGE** — projects that don't need edits (list them briefly for completeness)

For each ADD or UPDATE, include the source (Jira issue key, Confluence page, Slack channel + date).

Present the full proposed diff:

```
MONTHLY PROJECT REVIEW — [Month YYYY]

ADD
→ [Project name]
   Source: [Jira epic / Confluence page / Slack reference]
   Suggested summary: [2-3 sentences]

UPDATE
→ [Project name]: [what changed]
   Source: [reference]
   Suggested new summary: [updated text]

REMOVE
→ [Project name]
   Source: [why — closed, cancelled, merged into another]

NO CHANGE: [N] projects — [list names]

Approve to write? A condensed AI context version will also be generated.
```

### 6. After approval
**Step 1:** Use `write_file` to update PROJECTS_FILE with all approved changes. Update the
"last updated" date at the top.

**Step 2:** Generate a condensed version for AI context. This should be:
- One short paragraph per active project (1–2 sentences max)
- Status and key facts only — no links, no formatting
- Total length: under 500 words

Write the condensed version to CONTEXT_FILE with instructions:
```
# AI Context — Current Projects [Month YYYY]
# Copy the section below into your Claude project instructions or system prompt.

[condensed project summaries]
```
