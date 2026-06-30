---
name: doc-search
description: >
  Fast internal documentation search. Uses a fast-path index of commonly referenced pages to answer
  the most frequent questions without a live search. Falls back to CQL queries for anything not in
  the index. Use when asked to find internal docs, policies, runbooks, or standards.
---

# Internal Documentation Search

Fast-path index of your most commonly referenced pages, with CQL fallback for anything not in the
index. Returns ranked results with one-line summaries and direct links.

The goal: answer "does this documentation exist and where is it?" in one shot, without a 20-minute
search that ends with "I'll just ask someone on Slack."

---

## Setup

### Required MCPs
- **Confluence MCP** — `@dsazz/mcp-confluence` (github.com/Dsazz/mcp-confluence)

### Configuration
```
CONFLUENCE_BASE_URL: https://yourcompany.atlassian.net/wiki
PRIMARY_SPACES: [PROD, ENG, HR, LEGAL]   # Space keys to search
```

---

## Fast-Path Index

This section is the skill's core value. Populate it with the 15–20 pages your team references most.
The format maps common question types directly to the right page, without a live search.

Replace all entries below with your own:

```
Question type / keyword              | Page title                    | Confluence page ID | Space
-------------------------------------|-------------------------------|-------------------|-------
data retention / customer records    | Customer Data Retention Policy | XXXXX             | LEGAL
onboarding / new hire setup          | New Hire IT Checklist          | XXXXX             | HR
incident / production outage         | Incident Response Runbook      | XXXXX             | ENG
API documentation / endpoints        | Internal API Reference         | XXXXX             | ENG
design system / brand standards      | Design System Guidelines       | XXXXX             | PROD
roadmap / current priorities         | Product Roadmap Q[X] YYYY      | XXXXX             | PROD
OKRs / goals                         | Company OKRs [YYYY]            | XXXXX             | STRAT
performance review / calibration     | Performance Review Process     | XXXXX             | HR
security / compliance                | Security Standards Overview    | XXXXX             | LEGAL
deployment / release process         | Release & Deploy Runbook       | XXXXX             | ENG
[add your pages]                     |                                |                   |
```

---

## Instructions

### Step 1: Check the fast-path index
Match the user's question against the Question type / keyword column.
If there's a match, use `confluence_get_page` with the page ID to confirm it's current, then return:

```
Fast-path match: [Space] > [Page title]

[Page title] — last updated [date]
[link to page]
"[First sentence or description of what the page covers]"
```

### Step 2: Fallback — CQL search
If the fast-path doesn't match, use `confluence_search` with:
```
text ~ "user's query terms" AND space in (PRIMARY_SPACES) ORDER BY lastmodified DESC
```

Return up to 5 results ranked by relevance and recency:

```
Search results for "[query]":

1. [Page title] ([Space]) — last updated [date]
   [link]
   "[One-line summary of what the page covers]"

2. [etc.]
```

### Step 3: If nothing found
If neither the fast-path nor CQL search returns a useful result:
- Tell the user no documentation was found
- Suggest: the specific Slack channels or people most likely to know
- Don't invent a page or summarize from general knowledge as if it were company documentation

### Rules
- Never hallucinate documentation. If it's not found, say so.
- Return direct links, not navigation paths ("go to Settings > ...").
- If a fast-path page hasn't been updated recently, note the date and suggest verifying it's current.
- Update the fast-path index whenever you discover a page that should be in it.
