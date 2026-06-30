---
name: analytics-query
description: >
  Encodes the query grammar of your BI platform — which data models to use for which question types,
  metric definitions, hierarchy selection logic, default filters, and guardrails against common
  mistakes. Use when asked to query, analyze, or pull data from your internal analytics platform.
  This is a template — populate the sections below with your platform's specifics before use.
---

# Analytics Query Skill

Encodes institutional knowledge about your BI platform so every query session starts from the right
model, with the right filters, using the right metric definitions — rather than reconstructing this
from scratch each time.

**This is a template.** The value comes from populating it with your specific data models, KPI
definitions, and the institutional knowledge that lives in your team's heads. Instructions for
what to fill in are in each section.

---

## Setup

### Required MCPs
This depends on your BI platform:
- **Tableau MCP** — if available for your Tableau instance
- **Looker MCP** — if using Looker (check your Looker admin for API access)
- **Mode / Metabase / Redash** — check each for MCP or API integration
- **Direct DB access** — if your BI platform doesn't have an MCP, a Database MCP pointing to
  the underlying warehouse (Snowflake, BigQuery, Redshift) may work

### Configuration
```
PLATFORM: [Tableau / Looker / Mode / Snowflake / BigQuery / other]
CONNECTION: [connection string or MCP name]
DEFAULT_DATE_RANGE: last 30 days
MAX_GRANULARITY_WINDOW: 180 days   # Don't run high-granularity queries beyond this window
```

---

## Data Model Reference

**Fill this in with your platform's models.** List each model, what it's for, and when to use it vs.
similar models. Example format:

```
Model name         | Use for                                    | Don't use for
-------------------|-------------------------------------------|---------------------------
[Model A]          | [question type it answers]                 | [what it doesn't cover]
[Model B]          | [question type it answers]                 | [what it doesn't cover]
[Model C]          | [question type it answers]                 | [what it doesn't cover]
```

Common mistake to document here: models that look similar but return different numbers because of
how they define the base population (e.g., "all users" vs. "active users" vs. "paying users").

---

## Metric Definitions

**Fill this in with your exact KPI names and definitions.** Include: the metric name as it appears
in the platform, what it actually measures, how it's calculated, and any common misinterpretations.

```
Metric name (exact)  | Measures                        | Calculated as          | Common mistake
---------------------|--------------------------------|------------------------|----------------
[Metric A]           | [what it measures]              | [formula or logic]     | [gotcha]
[Metric B]           | [what it measures]              | [formula or logic]     | [gotcha]
```

---

## Hierarchy & Dimension Logic

**Fill this in.** Many platforms have multiple ways to slice the same data that return different
numbers. Document which slice to use for which question type.

Example of what to document:
- Routing-based hierarchy vs. org-based hierarchy — when each is correct
- Queue-level vs. agent-level — when each is valid
- Date dimension rules that vary by model (e.g., "use resolved date in Model A, created date in Model B")

---

## Default Filters

**Fill this in.** Filters that should almost always be applied — the ones that, if omitted, return
misleading numbers.

```
Filter              | Default value       | Why
--------------------|---------------------|------------------------------------------
[Filter A]          | [default]           | [what gets skewed without it]
[Filter B]          | [default]           | [what gets skewed without it]
```

---

## Clarification Priority System

Before running any query, apply this priority system:

**Always ask before querying:**
- [Fill in: the decisions that, if wrong, would make the entire query useless]

**Best-guess and confirm:**
- [Fill in: assumptions that are usually right but worth stating — user can override]

**Never assume:**
- [Fill in: the choices that seem obvious but have specific correct answers in your data model]

---

## Guardrails

- **High-granularity queries:** Do not run row-level or agent-level queries beyond MAX_GRANULARITY_WINDOW.
  Aggregate first, then drill in if needed.
- **Model selection:** When in doubt about which model to use, ask — don't guess. Different models
  can return numbers that differ by 10–30% on the same question.
- **Metric names:** Use exact metric names from the Metric Definitions table. Small naming variations
  ("handle time" vs. "average handle time" vs. "AHT") may return different fields.

---

## Instructions

When asked to query:
1. Identify the question type and select the correct model from the Data Model Reference
2. Apply the Clarification Priority System — ask what needs asking, state assumptions
3. Apply default filters unless explicitly told otherwise
4. Run the query
5. Return results with: the model used, filters applied, and any caveats about the data
