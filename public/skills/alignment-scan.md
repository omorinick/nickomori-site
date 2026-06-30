---
name: alignment-scan
description: >
  Runs Monday mornings. Scans the past 7 days across Slack, Jira, Confluence, and email for signals
  of cross-functional misalignment with active initiatives. Outputs a severity-tiered report saved
  as a dated file. Trigger phrases: "run the alignment scan," "check for misalignment," or scheduled
  automatically each Monday.
---

# Cross-Functional Alignment Scan

Scans the past 7 days for signals of cross-functional misalignment with active initiatives.
First reads declared intent (PRD/strategy docs) to establish a baseline, then searches broadly
for divergence. Output is a severity-tiered report saved as a dated file.

Key guardrail: **Flag potential misalignment, don't adjudicate it. Surface the question, not the
answer.** Every finding is a question to bring to a human, not a conclusion.

---

## Setup

### Required MCPs
- **Slack MCP** — `@modelcontextprotocol/server-slack`
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)
- **Confluence MCP** — `@dsazz/mcp-confluence` (github.com/Dsazz/mcp-confluence)
- **Gmail MCP** — Official Google Workspace MCP
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
ACTIVE_INITIATIVES: [PROJ-A, PROJ-B]     # Jira project keys for your active initiatives
PRD_PAGE_IDS: [12345, 67890]             # Confluence page IDs for your current PRDs/strategy docs
SCAN_CHANNELS: [#product, #eng-general, #announcements, #leadership-updates]
                                          # Slack channels to scan for signals
OUTPUT_DIR: ~/notes/alignment-scans/     # Where to save dated reports
LOOKBACK_DAYS: 7
```

---

## Instructions

### 1. Establish the baseline
For each item in PRD_PAGE_IDS, use `confluence_get_page` to read the current declared intent.
Extract and note:
- Stated goals and success metrics
- Owners and responsible parties
- Timeline and milestone commitments
- Scope boundaries (what's explicitly in/out)

### 2. Scan Jira for divergence signals
Use `jira_search_issues` for each project in ACTIVE_INITIATIVES:
- New epics or initiatives created in the past 7 days that overlap in scope
- Issues where ownership fields changed
- Tickets referencing your initiatives from other teams' projects
- Scope changes (issues added/removed from current sprint or release)

Look for: duplicate work, conflicting ownership, scope expansion without documented decision.

### 3. Scan Slack channels
Use `slack_get_channel_history` for each channel in SCAN_CHANNELS, covering the past 7 days.
Use `slack_search_messages` for keywords from your initiative names and key features.
Look for:
- Decisions made in channels without documented outcomes
- References to your initiatives from teams you haven't coordinated with
- Announcements of direction changes that may affect your work
- Meetings or reviews that happened without you that touched your scope

### 4. Scan email
Use `search_threads` with query: `after:7_DAYS_AGO` filtered to relevant sender domains/names.
Look for email threads where decisions were made that affect your initiatives.

### 5. Synthesize and tier

Classify each finding:
- 🔴 **Needs immediate attention** — active conflict, duplicate work in progress, timeline collision
- 🟡 **Watch (next 1–2 weeks)** — directional divergence, undocumented decision, signal worth monitoring
- 🟢 **Ambient awareness** — new initiative that might intersect, context worth having

For each finding, write:
- **Surface**: what area of work this touches
- **Signal**: specifically what you found and where (channel name, issue key, etc.)
- **Question**: the specific question to bring to a human

### 6. Save the report
Use `write_file` to save to OUTPUT_DIR with filename `alignment-scan-YYYY-MM-DD.md`.

Report format:
```
ALIGNMENT SCAN — [Day, Month DD, YYYY]

🔴  NEEDS IMMEDIATE ATTENTION
Surface: [area]
Signal: [what you found, with specific source reference]
Question: [the question to bring to a human]

🟡  WATCH (next 1-2 weeks)
[same format]

🟢  AMBIENT AWARENESS
[brief notes, one line each]

Saved: alignment-scan-YYYY-MM-DD.md
```

If nothing warrants a finding in a tier, omit that tier.
