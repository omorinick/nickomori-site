---
name: weekly-ship-log
description: >
  Runs Friday mornings. Scans the week's activity for work that shipped, was completed, or was
  delivered in support of another team. Proposes structured ship log entries and waits for approval
  before writing anything. Trigger phrases: "run the ship log," "capture this week's work," or
  scheduled automatically each Friday.
---

# Weekly Ship Log

Scans the week for completed and delivered work, then proposes structured entries for a running
ship log. Specifically hunts for work done in support of other teams — the category most likely to
go undocumented.

**Does not write to the file until you approve.** Presents proposals and waits.

---

## Setup

### Required MCPs
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)
- **Slack MCP** — `@modelcontextprotocol/server-slack`
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
JIRA_PROJECTS: [PROJ-A, PROJ-B]       # Your project keys
SHIP_LOG_PATH: ~/notes/ship-log.md    # Path to your running ship log
SELF_JIRA_USERNAME: your.name         # Your Jira username/email for filtering
LOOKBACK_DAYS: 7
```

### Ship log file format
The ship log is a running markdown file. If it doesn't exist, create it with this header:

```markdown
# Ship Log

A longitudinal record of completed work with success criteria and checkpoint dates.

---
```

---

## Instructions

### 1. Read the existing ship log
Use `read_file` on SHIP_LOG_PATH. Note what's already there to avoid duplicates.

### 2. Scan Jira for completed work
Use `jira_search_issues` with JQL:
```
assignee = currentUser() AND (status changed to Done OR status changed to "Closed" OR status changed to "Released") AND updated >= -7d
```
Also search for issues where you're a contributor but not assignee:
```
comment ~ "your.name" AND updated >= -7d AND project in (JIRA_PROJECTS)
```

For each relevant issue, note: what it was, your role, any stated success criteria or outcomes.

### 3. Scan Slack for delivered work signals
Use `slack_search_messages` for your name + delivery-related terms over the past 7 days.
Look for: "shipped," "launched," "delivered," "went live," "published," your name mentioned in
announcements, or you being thanked for something.

Use `slack_get_channel_history` on any team announcement channels to catch launches you supported.

### 4. Determine contribution shape
For each piece of work, classify:
- **Drove** — you owned it end-to-end
- **Supported** — you contributed meaningfully to someone else's work
- **Contributed** — you provided input, review, or a specific artifact

### 5. Propose entries

For each piece of work worth capturing, draft a proposed ship log entry:

```
PROPOSED ENTRY
What: [specific description of what shipped or was delivered]
Contribution: Drove / Supported / Contributed
Success criteria: [how you'll know if this worked — be specific]
Checkpoints: [MM/DD] (30-day) · [MM/DD] (90-day)
Source: [Jira issue key or Slack reference]
```

If you can't determine success criteria, write: `SUCCESS CRITERIA NEEDED — define before the 30-day check.`

Present all proposals, then ask: **Ready to write [N] entries to the ship log. Approve?**

### 6. After approval
Use `edit_file` or `write_file` to append approved entries to SHIP_LOG_PATH in this format:

```markdown
## [YYYY-MM-DD] — [What shipped]

**Contribution:** Drove / Supported / Contributed
**Success criteria:** [criteria]
**Checkpoints:** [date] (30-day) · [date] (90-day)
**Source:** [reference]

---
```
