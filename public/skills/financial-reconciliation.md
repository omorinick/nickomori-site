---
name: financial-reconciliation
description: >
  Analyzes financial reconciliation matching requirements. Validates against a library of existing
  stored procedures to determine reuse vs. new build, generates and runs validation queries, and
  produces production-ready SQL. Template — populate with your schema and procedure library before
  use. Requires a capable model; will refuse to run on a less capable one.
---

# Financial Reconciliation Skill

Encodes the logic for financial reconciliation matching: extracting criteria from ticket
descriptions, validating against your existing stored procedure library, generating validation
queries against live data, and producing production-ready SQL.

**This is a template.** The skill's value comes from the institutional knowledge you populate below:
your schema, your procedure patterns, your vendor naming conventions. Without this, it's a process
skeleton. With it, it replaces the specialist.

**Model requirement:** This skill requires a capable reasoning model (Claude Opus or equivalent).
If running on a less capable model, state this and instruct the user to switch before proceeding.

---

## Setup

### Required MCPs
- **Database MCP** — connecting to your financial database (Postgres, SQL Server, Snowflake, etc.)
  - For Postgres: `@modelcontextprotocol/server-postgres`
  - For SQL Server: various community implementations — search npm/github for your platform
- **Filesystem MCP** — `@modelcontextprotocol/server-filesystem`

### Configuration
```
DB_CONNECTION: [your database MCP connection name]
PROCEDURE_LIBRARY_PATH: ~/notes/stored-procedures-index.md  # Your procedure index (see below)
SCHEMA: [your financial schema name]
OUTPUT_DIR: ~/notes/reconciliation/
```

---

## Procedure Library Index

**Fill this in.** The core of the skill is knowing what already exists. List your stored procedures
in a format that enables pattern matching:

```
Procedure name           | Type                    | Pattern                        | Last used
-------------------------|------------------------|--------------------------------|----------
[SP_VENDOR_MATCH_EXACT]  | One-to-one matching    | Single vendor, exact name match | [date]
[SP_AGGREGATE_RECONCILE] | Aggregated matching    | Sum-based, multiple records    | [date]
[SP_INVOICE_MATCH_V2]    | [deprecated]           | Replaced by SP_VENDOR_MATCH_EXACT | —
[add your procedures]
```

The more procedures you document, the more useful this skill becomes. Add a new entry each time
you build or discover a procedure.

---

## Vendor Naming Conventions

**Fill this in.** Vendor name formatting rules are some of the most painful institutional knowledge
to lose. Document exact string rules here.

```
Vendor category      | Naming rule                                    | Example
---------------------|-----------------------------------------------|--------
[Category A]         | [rule — e.g., "truncate to first 20 chars"]   | "Acme Corp Internati" not "Acme Corp International"
[Category B]         | [rule]                                         | [example]
```

**Truncation rules are critical.** A truncated vendor name returns zero results and fails silently.
Always validate the exact string before running a reconciliation query.

---

## Schema Reference

**Fill this in.** Key tables and columns your queries will use:

```
Table                  | Key columns                          | Notes
-----------------------|--------------------------------------|------
[vendor_invoices]      | vendor_name, invoice_id, amount, ... | [notes]
[purchase_orders]      | po_number, line_item, amount, ...    | [notes]
[reconciliation_log]   | match_id, status, matched_at, ...    | [notes]
```

---

## Pattern Recognition

Two primary matching patterns. Identify which applies before generating SQL:

**One-to-one record matching:** Each invoice maps to exactly one PO line item. Use exact-match
stored procedures where available. Query pattern: `WHERE invoice_id = po_line_id`.

**Aggregated matching:** Multiple invoices or records are summed to match a PO total. Use
aggregate stored procedures. Query pattern: `SUM(invoice_amount) = po_total`.

Signs it's aggregated: ticket description mentions "total," "sum," "combined," multiple invoice
references for one PO, tolerance thresholds.

---

## Instructions

### Step 1: Parse the ticket
Read the reconciliation requirement from the ticket or user description. Extract:
- Vendor name (exact string — validate against naming conventions)
- Matching type (one-to-one vs. aggregated)
- Source table and target table
- Any specific filters (date range, status, amount range)

### Step 2: Validate vendor string
Before anything else, check the vendor name against the Vendor Naming Conventions table.
If truncation rules apply, apply them. Note the validated string.

### Step 3: Search procedure library
Check the Procedure Library Index for existing procedures that match:
- Same matching type (one-to-one vs. aggregated)
- Similar filter combination

If a match exists: propose reuse with any necessary parameter changes.
If no match: proceed to generate new SQL.

### Step 4: Run a validation query first
Before generating the full reconciliation SQL, always validate that data exists:

```sql
SELECT COUNT(*) FROM [relevant_table]
WHERE vendor_name = '[validated_vendor_string]'
AND status = 'UNMATCHED'
[other relevant filters]
```

State the count result. If zero records found, stop and investigate the vendor string or filters
before proceeding. Do not generate full SQL against empty result sets.

### Step 5: Generate production SQL
Only after the validation query confirms data exists. Structure:
- Clear comments at the top: purpose, vendor, matching type, date generated
- Parameterized where possible
- Include the validated vendor string, not the original input

### Step 6: Output
Save the generated SQL to OUTPUT_DIR as `reconciliation-[vendor]-[YYYY-MM-DD].sql`.
Present it for review before any execution against production data.

### Rules
- Never run against production without a validation query first.
- Always validate vendor naming conventions before any query — truncated names fail silently.
- Propose procedure reuse before generating new SQL.
- Flag if running on a non-capable model and instruct the user to switch.
