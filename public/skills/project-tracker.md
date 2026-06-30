---
name: project-tracker
description: >
  Two utilities for working with a large enterprise Jira instance. (1) Field lookup: search any
  custom field by name, ID, or JQL clause — including which fields are required, which are vestigial,
  and which are team-specific. (2) Story creation: structured intake, mandatory human review, and
  automatic resolution of tricky fields before any API call is made. Use when looking up Jira fields
  or creating issues.
---

# Project Tracker Skill

Two utilities in one:

1. **Field lookup** — a searchable index of custom fields in your Jira instance, including
   institutional knowledge about which fields are required, vestigial, or team-specific.
2. **Story creation** — a structured intake workflow with a mandatory preview step. Nothing is
   sent to Jira until you've reviewed exactly what will be submitted.

---

## Setup

### Required MCPs
- **Jira MCP** — Atlassian remote MCP (mcp.atlassian.com)

### Configuration

This skill is a template. Before use, populate the FIELD INDEX section below with your instance's
custom fields. The easiest way: in Jira, go to Settings → Issues → Custom fields, export the list,
then add your most-used fields here with their IDs and any institutional notes.

```
JIRA_BASE_URL: https://yourcompany.atlassian.net
DEFAULT_PROJECT: PROJ
```

---

## Field Index

Replace this section with your instance's actual custom fields. Format:

```
Field name         | Field ID              | Type          | Notes
-------------------|----------------------|---------------|----------------------------------
Customer Impact    | customfield_XXXXX     | Single select | Required on P1/P2 tickets
Sprint             | customfield_XXXXX     | Sprint        | Use sprint name, not ID
Team               | customfield_XXXXX     | User/Group    | Requires UUID — see Team IDs below
Story Points       | customfield_XXXXX     | Number        | Required before sprint assignment
Epic Link          | customfield_XXXXX     | Epic Link     | Use epic issue key (e.g., PROJ-123)
[add your fields]
```

### Team IDs (if your instance uses UUIDs for team assignment)
UUIDs are required for team fields and fail silently if passed as display names. List them here:
```
Team Name         | UUID
------------------|--------------------------------------
Platform          | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Growth            | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
[add your teams]
```

---

## Instructions

### Utility 1: Field lookup

When asked to look up a field:
1. Search the Field Index above by name, ID, or description of what it does
2. Return: field name, ID, type, required status, team specificity, and any gotchas
3. If the field isn't in the index, use `jira_search_issues` to find an example issue that likely
   uses it and inspect its field structure

### Utility 2: Story creation

**Step 1 — Intake.** Ask for all required fields at once. Don't submit a partial ticket and fail.
Minimum required for most instances:
- Summary (title)
- Project key
- Issue type (Story / Bug / Task / Epic)
- Assignee
- Any instance-specific required fields from the Field Index

**Step 2 — Resolve tricky fields.**
- Team assignment: look up the UUID from the Team IDs table. Never pass a display name.
- Epic link: confirm the epic key exists before linking.
- Sprint: verify the sprint is active in the target project.

**Step 3 — Preview.** Before making any API call, show the user exactly what will be sent:

```
Here's what will be sent to Jira:

  Summary:          [title]
  Project:          [key]
  Type:             [Story / Bug / Task]
  Assignee:         [name] (UUID: xxxx...)
  [Required field]: [value]
  [Other fields]:   [values]

Review carefully. Send to Jira?
```

**Step 4 — Create.** Only after explicit approval, use `jira_create_issue` to submit.
Return the created issue key and URL.

### Rules
- Never submit to Jira without the Step 3 preview and explicit user approval.
- If a required field is missing from the intake, ask for it before proceeding — don't guess.
- If a UUID lookup fails, tell the user rather than passing a display name that will fail silently.
