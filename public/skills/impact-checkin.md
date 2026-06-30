---
name: impact-checkin
description: >
  Runs Monday mornings, the week following the ship log. Reads the ship log, finds entries whose
  checkpoint dates have arrived or are within 14 days, and surfaces specific follow-up reminders.
  Trigger phrases: "run the impact check-in," "what impact checks are due," or scheduled automatically
  each Monday following a ship log run.
---

# Impact Check-In

Reads the ship log and surfaces reminders for entries whose checkpoint dates have arrived or are
within 14 days. Each reminder is specific: the original success criteria, what to look for, who
to ask if you don't own the data, and which checkpoint this is.

Also flags entries where success criteria were never defined — a forcing function to close that gap
before too much time passes.

---

## Setup

### Required MCPs
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
SHIP_LOG_PATH: ~/notes/ship-log.md    # Path to your running ship log
LOOKAHEAD_DAYS: 14                    # Surface checkpoints due within this many days
TODAY: [current date — filled automatically]
```

---

## Instructions

### 1. Read the ship log
Use `read_file` on SHIP_LOG_PATH. Parse all entries.

### 2. Identify due checkpoints
For each entry:
- Parse the checkpoint dates (30-day, 90-day, annual)
- Flag any checkpoint that is today, overdue, or within LOOKAHEAD_DAYS
- Note whether success criteria are defined

### 3. Flag missing success criteria
Any entry with "SUCCESS CRITERIA NEEDED" or blank success criteria gets flagged separately,
regardless of checkpoint date. These need to be defined before the next checkpoint arrives.

### 4. Produce the check-in

Format:

```
IMPACT CHECK-IN — [Day, Month DD]

DUE NOW (overdue or today)
[What shipped] (shipped [date], [30-day / 90-day] check)
→ Success criteria: [original criteria from ship log]
→ Where to look: [specific metric, report, or person to ask]
→ Checkpoint: [30-day / 90-day / annual]

DUE SOON (within 14 days)
[same format, with due date noted]
→ Due: [date]

⚠ MISSING SUCCESS CRITERIA
[What shipped] (shipped [date]) — success criteria were never defined.
→ Define them now before the [next checkpoint date] check.

[If nothing is due: "No checkpoints due in the next 14 days."]
```

### Rules
- "Where to look" should be specific: name a metric, a dashboard, a team, or a person — not
  generic advice like "check the data."
- If the entry has enough context to suggest who owns the relevant data, name them.
- Don't prompt for action on items that aren't due yet (beyond the 14-day window).
