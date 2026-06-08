'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

const cadenceSlots = [
  {
    timeLabel: 'MON AM',
    isMonthly: false,
    automations: ['Alignment Scan', 'Daily Context Brief'],
  },
  {
    timeLabel: 'FRI AM',
    isMonthly: false,
    automations: ['Weekly Ship Log'],
  },
  {
    timeLabel: 'MON AM (following)',
    isMonthly: false,
    automations: ['Impact Check-In'],
  },
  {
    timeLabel: '1ST OF MONTH',
    isMonthly: true,
    automations: ['Monthly Project Review'],
  },
]

const automations = [
  {
    name: 'Daily Context Brief',
    timing: 'Weekday mornings',
    isMonthly: false,
    summary:
      'Synthesizes overnight activity into a structured start-of-day briefing. Surfaces action items, flags calendar issues, and closes with a single priority for the day.',
    description:
      'Pulls from calendar, email, project tickets, and team communication channels into a structured start-of-day briefing. It flags back-to-backs and meetings without agendas, surfaces action items from a personal Slack capture inbox (self-messages used as a scratchpad for raw notes and mid-meeting thoughts), and organizes everything into two outputs: a prioritized action list with source attribution (e.g., [Jira], [Email], [Self-note]) and a set of thinking prompts — strategic questions that emerge from patterns across channels. Ends with a single bolded sentence: the one thing to walk away having accomplished that day.',
    problemSolves:
      'Starting the day without a clear picture of what moved overnight, or without surfacing raw notes dropped into a capture channel that would otherwise sit unprocessed.',
    tools: ['Slack MCP', 'Google Calendar MCP', 'Gmail MCP', 'Jira MCP'],
    example: `DAILY BRIEF — Thursday, March 13

ACTIONS
[Email]     Reply to Sarah re: Q2 roadmap review — flagged as blocking her sprint planning (today)
[Jira]      GROWTH-1147 acceptance criteria updated overnight — review before standup (10am)
[Self-note] "check on API deprecation timeline w/ platform team" — captured Tuesday, still open
[Calendar]  2:30pm sync has no agenda and 5 attendees. Send one by noon or reschedule.

THINKING PROMPTS
→ Three separate threads this week mention the mobile team's Q2 scope without cross-referencing the platform dependency. Worth checking before Friday's leadership review.
→ The escalation pattern on GROWTH-1147 matches two resolved issues from last quarter — might be the same root cause.

TODAY
Get the API governance doc to a reviewable state before the 2:30pm sync.`,
  },
  {
    name: 'Cross-Functional Alignment Scan',
    timing: 'Monday mornings',
    isMonthly: false,
    summary:
      'Scans the past 7 days for signals of cross-functional misalignment with active initiatives. Outputs a severity-tiered report saved with the date.',
    description:
      'First reads the declared intent (PRD/strategy documents) to establish a baseline, then searches broadly across channels, email threads, and calendar meetings that happened without me, looking for divergence. Output is a severity-tiered report (🔴 needs immediate attention, 🟡 watch over next 1-2 weeks, 🟢 ambient awareness), saved as a file with the date. Key guardrail baked into the instructions: "Flag potential misalignment, don\'t adjudicate it. Your job is to surface the question, not answer it."',
    problemSolves:
      'Misalignment compounds quietly. By the time it surfaces, it\'s expensive. This catches conflicting ownership of surfaces, things shipping before governance frameworks are in place, executive direction changes that haven\'t been communicated downward, and duplicate work being built in parallel.',
    tools: ['Slack MCP', 'Jira MCP', 'Confluence MCP', 'Gmail MCP', 'Filesystem MCP'],
    example: `ALIGNMENT SCAN — Monday, March 10

🔴  NEEDS IMMEDIATE ATTENTION
Surface: Notification framework ownership
Signal: Active epics on both GROWTH-441 and PLATFORM-892 for the same feature, created 10 days apart with no cross-reference.
Question: Has ownership been decided? Was the split intentional?

🟡  WATCH (next 1-2 weeks)
Surface: Pricing tier launch timeline
Signal: Finance referenced a Q2 launch in three Slack messages this week. Current PRD states Q3. No documented update found.
Question: Has the timeline changed and not been reflected in the PRD?

🟢  AMBIENT AWARENESS
Leadership all-hands Monday mentioned a "platform consolidation" initiative. No initiative found in the project tracker yet.

Saved: alignment-scan-2025-03-10.md`,
  },
  {
    name: 'Weekly Ship Log',
    timing: 'Friday mornings',
    isMonthly: false,
    summary:
      'Proposes structured ship log entries for the week\'s completed and delivered work. Waits for approval before writing anything.',
    description:
      'Scans the week\'s activity for work that shipped, was completed, or was delivered in support of another team, and proposes structured entries for a running ship log. Each proposed entry includes: what shipped, the shape of my contribution (Drove / Supported / Contributed), success criteria, and suggested checkpoint dates (default: 30 days and 90 days) for following up on impact. It specifically looks for work done in support of other teams, which tends to go undocumented. Does not write to the file until I approve.',
    problemSolves:
      'Without deliberate capture, shipped work disappears into the past. This creates a longitudinal record that feeds retrospectives, performance conversations, and portfolio documentation, and forces the definition of success criteria while the context is still fresh.',
    tools: ['Jira MCP', 'Slack MCP', 'Filesystem MCP'],
    example: `SHIP LOG PROPOSALS — Week of March 10

ENTRY 1
What: API governance framework v1 — published to internal wiki
Contribution: Drove
Success criteria: Referenced as the standard in 3+ eng team kickoffs within 30 days
Checkpoints: April 9 (30-day) · June 8 (90-day)

ENTRY 2
What: Supported Growth team's notification experiment — reviewed PRD, gave feedback on measurement plan
Contribution: Supported
Success criteria: Final PRD includes baseline + holdout group structure (confirmed)
Checkpoints: April 9 (30-day)

Ready to write 2 entries. Approve?`,
  },
  {
    name: 'Impact Check-In',
    timing: 'Monday mornings',
    isMonthly: false,
    summary:
      'Reads the ship log and surfaces reminders for entries whose checkpoint dates have arrived or are within 14 days. Includes the original success criteria and where to find the data.',
    description:
      'Reads the ship log, identifies entries whose checkpoint dates have arrived or are coming up within 14 days, and surfaces specific reminders. Each reminder includes the original success criteria, the specific metric or outcome to look for, who to ask if I don\'t own the data directly, and whether this is a 30-day, 90-day, or annual check. Also flags entries where success criteria were never defined, prompting closure before too much time passes.',
    problemSolves:
      'The feedback loop between what shipped and what actually happened rarely closes on its own. This automation is the mechanism for closing it.',
    tools: ['Filesystem MCP'],
    example: `IMPACT CHECK-IN — Monday, March 10

DUE NOW
API governance framework (shipped Feb 7, 30-day check)
→ Success criteria: Referenced in 3+ eng team kickoffs
→ Where to look: Search Confluence for doc references; ask Marcus if he's used it recently
→ ⚠ No success criteria recorded — define it now before the 90-day check

DUE SOON (within 14 days)
Notification experiment measurement plan (shipped Feb 24, 30-day = March 26)
→ Success criteria: Final PRD includes baseline + holdout group
→ Where to look: Confirm in Confluence; check with Growth team directly`,
  },
  {
    name: 'Monthly Project Review',
    timing: '1st of each month',
    isMonthly: true,
    summary:
      'Researches what changed across active projects over the past 30 days and proposes a clean diff. Waits for approval before writing, then generates a condensed version for AI context.',
    description:
      'Reads a current-projects reference file, then researches what\'s changed over the past 30 days, pulling from project tickets (new epics, resolved initiatives, scope changes), documentation (new strategy docs, updated PRDs), and team channels (announcements, priority shifts). Categorizes proposed changes as ADD, UPDATE, REMOVE, or NO CHANGE, with source citations for each. Presents a clean diff and waits for approval before writing anything. After approval, it generates a condensed version formatted for AI context settings, with instructions for how to apply it.',
    problemSolves:
      "An AI assistant is only as useful as the context it's operating from, and that context goes stale fast. This keeps the source of truth current without requiring manual maintenance.",
    tools: ['Jira MCP', 'Confluence MCP', 'Slack MCP', 'Filesystem MCP'],
    example: `PROJECT REVIEW — March 1, 2025

ADD
→ Platform API Consolidation
   Source: New epic PLATFORM-1100 (Feb 18) + 3 channel announcements
   Summary: Multi-quarter initiative to consolidate 4 internal APIs into a unified gateway

UPDATE
→ Notification Framework: owner changed from Platform to Growth
   Source: #product-updates, Feb 22 — confirmed in Jira PLATFORM-892

REMOVE
→ Legacy Reporting Dashboard
   Source: Closed as "won't do" in Jira (Feb 28) + #platform-eng announcement

NO CHANGE: 6 projects

Approve to write? A condensed version for your AI context will be generated after confirmation.`,
  },
]

const skills = [
  {
    name: 'Analytics Query Skill',
    summary:
      'Encodes the full query grammar of a complex enterprise BI platform, including metric definitions, model selection logic, and guardrails against common mistakes.',
    description:
      'The full query grammar of a complex enterprise BI platform: which data models to use for which question types, exact metric names and definitions (20+ KPIs), hierarchy selection logic (routing-based vs. org-based views), default filters, date dimension rules that vary by data model, and a hard restriction on high-granularity queries outside a 6-month window. Also encodes a clarification priority system: what to always ask before querying, what to best-guess and confirm, and what to never assume.',
    replaces:
      'Having to re-explain a complex data schema and the institutional knowledge about which fields mean what. Without it, every query session starts with 5 minutes of "remind me which model has FCR" and "wait, is that the queue view or the employee view?"',
    tools: ['BI Platform MCP'],
    example: `User: Break down resolved tickets by queue and handle time bucket for last month.

Before querying — confirming a few things:
• Model: Service Operations (for resolved tickets; use Deflection model for deflections)
• Hierarchy: Queue-based view (vs. org-based — these return different numbers)
• Date filter: Resolved Date, not Created Date (divergence is significant at month end)
• Handle time buckets: Standard FCR tiers (0-3 min / 3-8 min / 8-15 min / 15+ min)?

Running with those assumptions...

  Queue        | 0-3m  | 3-8m  | 8-15m | 15m+  | Total
  Billing      | 1,204 |   892 |   541 |   312 | 2,949
  Technical    |   443 |   711 |   938 |   604 | 2,696
  Account      |   892 |   634 |   287 |    98 | 1,911

Note: Agent-level breakdown omitted per 6-month query policy.`,
  },
  {
    name: 'Internal Documentation Search',
    summary:
      'Maps the structure of a large internal documentation hub with a fast-path index of commonly referenced pages. Falls back to targeted queries when the fast path doesn\'t match.',
    description:
      'The structure, naming conventions, and key pages of a large internal documentation hub, with a fast-path index of the 15+ most commonly referenced pages (maps common question types directly to the right page without a live search), falling back to targeted CQL queries when the fast path doesn\'t match. Returns results as ranked entries with one-line summaries and direct links.',
    replaces:
      'The 20-minute "does this documentation exist?" search that ends with "I\'ll just ask someone on Slack."',
    tools: ['Confluence MCP'],
    example: `User: Where's the policy on data retention for customer records?

Fast-path match: Data Governance > Retention Policies

Top result:
  Customer Data Retention Policy — last updated Feb 2025
  [link to page]
  "Defines retention windows for customer PII, transaction records, and behavioral data across storage tiers."

Related:
  Data Classification Framework [link]
  GDPR Compliance Runbook [link]`,
  },
  {
    name: 'Project Tracker Skill',
    summary:
      'A searchable database of 4,500+ custom fields in an enterprise project tracker, plus a story creation workflow with mandatory human review checkpoints.',
    description:
      'Two utilities in one. (1) A searchable database of 4,500+ custom fields in a large enterprise project tracker. Look up any field by name, ID, or query clause, including the institutional knowledge about which fields are required, which are vestigial, and which are specific to certain teams. (2) A story creation workflow with mandatory human review checkpoints: a structured intake to gather all required fields at once, a full preview of exactly what will be sent before any API call is made, and automatic resolution of the team assignment field (which requires a UUID, not a name, and fails silently if passed in the wrong format).',
    replaces:
      "Creating a ticket, having it fail on a required field you didn't know existed, then creating it again with missing metadata because you didn't know the field IDs. A cycle most PMs in complex enterprise instances know well.",
    tools: ['Jira MCP'],
    example: `User: What's the field ID for "Customer Impact"?

Field: Customer Impact
ID: customfield_14892 · Type: Single select
Required: Yes (P1/P2 tickets only)
Teams: Used by Product and Engineering; vestigial in Design board
Options: Low / Medium / High / Critical

---

[Story creation mode — intake complete]

Here's what will be sent to Jira:

  Summary:         Add rate limiting to the public API
  Project:         PLATFORM
  Type:            Story
  Assignee:        Tyler Chen (UUID: a3f9...)
  Customer Impact: Medium
  Sprint:          Platform Q2 Sprint 4
  Labels:          api, rate-limiting

Review carefully. Send to Jira?`,
  },
  {
    name: 'Financial Reconciliation Skill',
    summary:
      'Encodes the logic for financial reconciliation matching against a library of 2,567 stored procedures. Produces validated, production-ready SQL.',
    description:
      'The logic for analyzing financial reconciliation matching: extracting matching criteria from ticket descriptions, validating against a knowledge base of 2,567 existing stored procedures to determine if logic can be reused vs. built new, generating and executing validation queries against live data, and producing production-ready SQL. Encodes pattern recognition (aggregated matching vs. one-to-one record matching), common filter combinations validated against the full procedure library, vendor naming conventions with exact string rules (a truncated vendor name returns zero results; the skill guards against this), and a staged workflow that always validates data exists before generating full SQL. Includes a model requirement guardrail: it refuses to run on a less-capable model and tells you how to switch.',
    replaces:
      "A specialist who knows the financial system's schema, the existing procedure patterns, and the exact rules for when vendor names get truncated. None of it lives in any document.",
    tools: ['Database MCP', 'Filesystem MCP'],
    example: `User: Match vendor invoices to PO line items for "Acme Corp International."

Vendor string check: "Acme Corp International" — passes truncation validation.

Searching procedure library (2,567 procedures)...
Relevant matches:
  SP_VENDOR_MATCH_EXACT (last used Dec 2024) — one-to-one matching
  SP_PO_LINE_RECONCILE_AGG — aggregated matching (not applicable here)
  SP_INVOICE_MATCH_V2 — deprecated

Pattern: one-to-one record matching
Recommended: SP_VENDOR_MATCH_EXACT

Running validation query first:
  SELECT COUNT(*) FROM vendor_invoices
  WHERE vendor_name = 'Acme Corp International' AND status = 'UNMATCHED'

→ 47 records found. Proceeding to generate full reconciliation SQL.`,
  },
  {
    name: 'PM Framework Skill',
    summary:
      'Encodes the full Pragmatic Product Management Framework across nine disciplines with a 5-level maturity model.',
    description:
      'The full Pragmatic Product Management Framework across nine disciplines (Foundations, Focus, Build, Market, Price, Launch, Design, Insight, Operations), each with a 5-level maturity model graded across five dimensions: process maturity, artifacts, skills, tools, and business impact. Can run a full capability assessment, guide sequential implementation from scratch, or deep-dive into a single discipline. The master skill orchestrates; specialist sub-skills go deep on each area.',
    replaces:
      "Reconstructing a PM framework from scratch every time you need to assess a team's capabilities or onboard someone to a structured way of thinking about the work.",
    tools: [],
    example: `User: Run a capability assessment for my team.

Starting assessment across 9 disciplines. I'll ask a few questions per area — estimates are fine.

FOUNDATIONS (1 of 9)

1. Does your team have a documented product strategy reviewed in the last 90 days?
2. How are product decisions currently made, and who has final authority?
3. On a scale of 1-5, how clearly does your team understand the company's strategic priorities?

(Answer at whatever level of detail you have. We'll calibrate as we go.)`,
  },
  {
    name: 'Roadmap Generator',
    summary:
      'Transforms live project tracker data into two roadmap views: one customer-facing, one for the internal team. Validates data quality before generating.',
    description:
      'A workflow for transforming live project tracker data into interactive roadmap visualizations, including pillar categorization via keyword matching, progress estimation from status and due date, timeline positioning, and dependency/risk extraction from issue descriptions. Produces two artifacts: a customer-facing view (high-level timeline with pillar colors, priority badges, progress bars, and a forward-looking pipeline section) and an internal team view (tracker links, full descriptions, dependency tracking, risk flags, milestone timelines, filterable by priority/owner/status). Includes a data quality validation step that flags items with missing due dates, owners, or priorities before generating.',
    replaces:
      "Manual roadmap maintenance in a slide deck that's out of date before the meeting starts.",
    tools: ['Jira MCP', 'Filesystem MCP'],
    example: `Data quality check:
  ✓ 47 items processed
  ⚠ 3 items flagged — missing due date: GROWTH-1089, GROWTH-1104, PLATFORM-901
  ✓ All high-priority items have owners

Generating roadmaps...

CUSTOMER-FACING VIEW
  Q1  ████████████████  Platform Foundation    (4 items · 80% complete)
  Q2  ████████          Growth & Acquisition   (6 items · 35% complete)
  Q2  ████              Data & Insights         (3 items · 20% complete)
  Pipeline: 8 items planned, not yet scheduled

INTERNAL TEAM VIEW
  Full table with Jira links, dependencies, risk flags, and owner columns
  Filterable by: Priority · Owner · Status · Pillar`,
  },
  {
    name: 'Brand Standards Skill',
    summary:
      'Encodes a complete brand system: type rules, color proportions, accessibility requirements, and medium-specific usage patterns.',
    description:
      'A complete brand system: type scale and weight rules (specific fonts for specific use cases, with explicit rules like "never use Bold for headlines, use Black"), color palette with proportionality guidelines (approximately 44% white, 44% black, 4% each of three accent blues), accessibility requirements (WCAG contrast ratios per use case, with specific combinations that pass vs. fail), medium-specific patterns for presentations, emails, social posts, and website headers, and a validation checklist. Also encodes what to avoid: mixing accent colors, using the wrong type weight, using a blue that fails accessibility on white backgrounds.',
    replaces:
      'Looking up the brand style guide every time you make a deck or email, and the instinct to "just use the blue" without checking if it\'s accessible.',
    tools: [],
    example: `User: Making a header for the Q2 roadmap presentation. Font and color?

For a presentation header:
  Font:  Graphik Black — not Bold (Black is the correct weight for display use; difference is visible at large sizes)
  Color: Black (#000000) for primary headline text

If you need a color element in the same header:
  ✓ Blue 1 (#0047CC) passes WCAG AA on white
  ✗ Blue 3 (#66A3FF) fails WCAG AA on white — do not use for text

Proportionality check: if this slide uses color, black/white should still account for ~88% of the visual area.`,
  },
]

function AutomationCard({ automation }: { automation: (typeof automations)[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card px-5 py-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-sm font-semibold text-foreground">{automation.name}</p>
        <span
          className={
            automation.isMonthly
              ? 'bg-info-subtle text-info px-2 py-0.5 rounded text-xs flex-shrink-0'
              : 'bg-secondary text-muted-foreground px-2 py-0.5 rounded text-xs flex-shrink-0'
          }
        >
          {automation.timing}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{automation.summary}</p>

      {open && (
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              How it works
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{automation.description}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Problem it solves
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{automation.problemSolves}</p>
          </div>

          {automation.tools.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Tools & Connectors
              </p>
              <div className="flex flex-wrap gap-1.5">
                {automation.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Example Output
            </p>
            <pre className="text-xs text-muted-foreground bg-background rounded-lg px-4 py-4 overflow-x-auto leading-relaxed border border-border whitespace-pre-wrap font-mono">
              {automation.example}
            </pre>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-4"
      >
        <span>{open ? 'Show less' : 'View more'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

function SkillCard({ skill }: { skill: (typeof skills)[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card px-5 py-5 flex flex-col">
      <p className="text-sm font-semibold text-foreground mb-2">{skill.name}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{skill.summary}</p>

      {open && (
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              What it encodes
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Replaces
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{skill.replaces}</p>
          </div>

          {skill.tools.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Tools & Connectors
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Example
            </p>
            <pre className="text-xs text-muted-foreground bg-background rounded-lg px-4 py-4 overflow-x-auto leading-relaxed border border-border whitespace-pre-wrap font-mono">
              {skill.example}
            </pre>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-4"
      >
        <span>{open ? 'Show less' : 'View more'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export function HowIWorkContent() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'AI Skills & Automations' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground mb-2">AI Skills & Automations</h1>
          <p className="text-sm text-muted-foreground mb-3">
            A working library of automations and domain-encoded skills built at work.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            A catalog of automations and AI skills built at work. The automations run on a fixed
            schedule and address recurring operational problems. The skills encode domain knowledge
            so it can be applied repeatedly without reconstructing it each time.
          </p>
        </div>

        {/* The Automated Cadence */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">The Automated Cadence</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Five automations run on a fixed schedule. Each addresses a specific recurring problem.
          </p>

          {/* Cadence strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {cadenceSlots.map((slot) => (
              <div key={slot.timeLabel} className="rounded-xl border border-border bg-card px-4 py-3">
                {slot.isMonthly ? (
                  <span className="inline-block bg-info-subtle text-info px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider mb-1.5">
                    {slot.timeLabel}
                  </span>
                ) : (
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                    {slot.timeLabel}
                  </p>
                )}
                {slot.automations.map((name, i) => (
                  <div key={name}>
                    {i > 0 && <div className="border-t border-border pt-1.5 mt-1.5" />}
                    <p className="text-xs font-medium text-foreground leading-snug">{name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {automations.map((automation) => (
              <AutomationCard key={automation.name} automation={automation} />
            ))}
          </div>
        </section>

        {/* Domain-Encoded Skills */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">Domain-Encoded Skills</h2>
          <p className="text-xs text-muted-foreground mb-6 max-w-2xl">
            On-demand capabilities triggered as needed. Each one encodes something specific to a
            domain: the schema of a data platform, the field structure of a project tracker, the
            logic of a financial process, the visual rules of a brand system. Deep familiarity
            with a domain is worth encoding once and reusing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>

        {/* Closing */}
        <div className="pb-10">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            These were built incrementally as recurring problems surfaced. The specs reflect how
            each one actually works and what it was built to replace. The catalog grows as new
            problems come up.
          </p>
        </div>
      </div>
    </main>
  )
}
