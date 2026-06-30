---
name: daily-context-brief
description: >
  Runs each weekday morning. Synthesizes overnight activity across calendar, email, project tickets,
  and Slack into a structured start-of-day briefing. Trigger phrases: "run my morning brief,"
  "what's on my plate today," "daily brief," or run automatically on a schedule.
---

# Daily Context Brief

Synthesizes overnight activity into a structured start-of-day briefing. Produces two outputs: a
prioritized action list with source attribution and a set of thinking prompts — strategic questions
emerging from patterns across channels. Ends with a single bolded sentence: the one thing to
accomplish today.

---

## Setup

### Required MCPs
- **Slack MCP** — `@modelcontextprotocol/server-slack` or the official Slack MCP server
- **Google Calendar MCP** — `nspady-google-calendar-mcp` (github.com/nspady/google-calendar-mcp)
- **Gmail MCP** — Official Google Workspace MCP (developers.google.com/workspace/gmail/api/reference/mcp)
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
Edit these values before first use:

```
CAPTURE_CHANNEL: #self-notes          # Slack channel where you drop raw notes to yourself
JIRA_PROJECTS: [PROJ-A, PROJ-B]       # Project keys to scan for assigned issues with updates
CALENDAR_LOOKBACK_HOURS: 12           # How far back to look for overnight calendar changes
EMAIL_SINCE: yesterday 6pm            # Gmail search cutoff (adjust to your work schedule)
SHIP_LOG_PATH: ~/notes/ship-log.md    # Path to your running ship log (used for context)
```

---

## Instructions

Run these steps in order each morning:

### 1. Calendar scan
Use `list_events` to pull today's events. Flag:
- Back-to-back meetings with less than 10 minutes between them
- Meetings with no description or agenda (title-only)
- Meetings added or changed since yesterday 5pm

### 2. Email scan
Use `search_threads` with query: `after:YESTERDAY_6PM is:unread` (adjust cutoff from config).
Identify:
- Threads requiring a reply from you (look for direct questions, action items, your name)
- Threads where you're the blocker for someone else
- Announcements from leadership or cross-functional partners

### 3. Jira scan
Use `jira_search_issues` with JQL: `project in (JIRA_PROJECTS) AND assignee = currentUser() AND updated >= -1d`
Pull: issues updated overnight, new comments on your tickets, status changes.

### 4. Slack capture channel scan
Use `slack_get_channel_history` on CAPTURE_CHANNEL. Pull all messages from the past 48 hours.
These are raw self-notes — surface anything that looks like an open action item or follow-up.

### 5. Synthesize

Produce the brief in this exact format:

```
DAILY BRIEF — [Day, Month DD]

ACTIONS
[Source tag, 10 chars max]  [Action item — specific and ownable]
[Source tag]                [Action item]
...

Sorted by urgency. Source tags: [Jira] [Email] [Slack] [Cal] [Self-note]
Flag time-sensitive items with "(today)" at the end.

THINKING PROMPTS
→ [Strategic question emerging from patterns you noticed across channels — not an action, a question]
→ [Another if warranted — max 3 total]

**TODAY**
**[One bolded sentence. The single most important thing to walk away having accomplished.]**
```

### Rules
- Actions list: max 8 items. If there are more, apply judgment — surface what's most important.
- Thinking prompts: only include if you genuinely see a pattern worth flagging. Don't manufacture them.
- The TODAY sentence must be specific and completable by end of day.
- Don't surface calendar events as actions unless something is required from you before them.
