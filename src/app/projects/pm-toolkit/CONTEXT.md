# Assumption Mapper — Project Context

## How to use this file

Read this file at the start of every session. Update it at the end of every session — decisions made, things built, things changed. If a decision from an earlier session gets reversed, overwrite it here. Do not preserve old decisions for historical record — this file should always reflect the current state, not the history. History lives in git.

---

## What this is and why it exists

A live interactive PM demo tool at `/projects/pm-toolkit` on nickomori.com. The goal is to showcase how Nick uses AI in his real PM workflow — specifically to accelerate the 0→1 phase of product solutioning where the blank page is hardest.

The core thesis (worth knowing for any copy or UI work): **AI is best at generating the raw material. The PM does the actual thinking.** This comes from Stanford d.school design thinking — "yes-and" — where kickstarting the brainstorm is the hardest part, and iteration is much easier once you have something to react to.

This is one of the core working tools in "Constructive Distractions" (`/projects`) and a concrete example of Nick's AI-assisted PM practice.

---

## What's been built

### The flow

Two input modes on step 1:
- **"I have an idea"** — user describes idea in 1–2 sentences → AI generates the happy path (swim lanes) → user reviews → AI generates assumptions
- **"I'll describe the happy path"** — user writes the full happy path themselves → skips swim lane review → goes straight to assumptions

Steps after input:
1. **Happy Path review** (simple mode only): swim lane steps displayed as cards with actor badges (User, Platform, Third-Party Service, Other User, Admin). Color-coded by actor.
2. **Assumption Map**: 30–40 assumptions generated across 5 Teresa Torres dimensions:
   - Desirability (8–10 assumptions)
   - Feasibility (6–8)
   - Usability (6–8)
   - Viability (4–6)
   - Ethical/Legal (3–5)
   Each assumption has a `label` (4–6 word sticky-note version) and full `text`, plus `importance` and `confidence` scores (1–10).
3. **Priority Matrix**: 2x2 grid. X axis = Confidence (left = high confidence, right = low confidence). Y axis = Importance (top = high). Top-right = "Validate First" zone. Each assumption rendered as a color-coded chip with its label always visible; hover shows full text + scores.
4. **Export as Markdown**: downloads a `.md` file with swim lanes, full assumption list by dimension, and sorted priority table.

### Access control

- 2 free API calls per browser session (cookie `demo-uses`, 24h expiry)
- After that: password modal prompts for the demo code
- Password validated against `DEMO_PASSWORD` env var; sets `demo-auth` cookie (30 days) on success
- The password retry is wired through a `useRef` callback so the exact pending action retries with the password automatically

### Key files

| File | Purpose |
|---|---|
| `src/app/projects/pm-toolkit/PMToolkitClient.tsx` | Full interactive flow (client component) |
| `src/app/projects/pm-toolkit/page.tsx` | Thin server wrapper with metadata |
| `src/app/api/pm-toolkit/route.ts` | OpenAI POST handler — handles `generate-happy-path` and `generate-assumptions` actions, access control, cookie management |
| `src/lib/pm-toolkit-types.ts` | Shared types: `HappyPathStep`, `Assumption`, `Dimension`, `DIMENSION_COLORS` |

---

## Current status

**Operational in production.** The full OpenAI flow is working at `/projects/pm-toolkit`, including the free-use limit and shared demo-code gate.

`OPENAI_API_KEY` and `DEMO_PASSWORD` must remain configured in the relevant Vercel environments and in `.env.local` for local testing. Do not record their values in this file.

---

## Key decisions made

**OpenAI GPT-4o (not mini)** — better reasoning for generating nuanced assumptions across dimensions. ~$0.005 per full demo run (two API calls).

**No Miro/FigJam integration in v1** — would require OAuth and significant API work. Export as Markdown bridges the gap for now. Marked as v2.

**No learning plan generator in v1** — this is the natural step 5 after the priority matrix (grouping top-right quadrant assumptions into pre-launch and post-launch validation activities). Marked as v2.

**Simple shared demo password** — Nick distributes this on his resume or in person. Not sophisticated, but correct for a personal portfolio site. No user accounts, no database.

**Standalone tool** — the output lives entirely in-browser. Nothing is saved or persisted between sessions.

**Framework credit is a feature, not a footnote** — the UI explicitly names Teresa Torres / Continuous Discovery Habits and Stanford d.school. These are credibility signals for PM readers.

**Confidence axis direction** — X axis: left = high confidence, right = low confidence. This puts high-importance + low-confidence items in the top-right, which Nick confirmed as the intended "Validate First" zone.

---

## Known issues / gotchas

**Priority matrix gets crowded** — with 30–40 chips on a single canvas, overlapping is common in dense zones. This is acceptable for a POC and demo context. v2 consideration: better layout (force-directed, or filter by quadrant).

**Demo password is per-session, not per-visit** — the `demo-uses` cookie is 24h. Someone who clears cookies gets fresh free uses. This is intentional and fine.

**The `applyCookies` function** in `route.ts` uses a type assertion to access `currentUses` from the `checkAccess` return type. It works and TypeScript passes, but it's slightly awkward — worth cleaning up if the access control logic ever changes.

**The homepage (`/`) uses the shared semantic design tokens.** Keep it consistent with the warm editorial system while allowing its layout to remain more expressive than document-style project pages.

---

## Design system note

The site uses the warm editorial semantic tokens defined in `src/app/globals.css`, with light mode as the default and a user-controlled dark variant. All inner pages should use `border-border bg-card` for surfaces, `text-foreground` for primary text, and `text-muted-foreground` for secondary text. Do not hardcode neutral palette classes that bypass the shared theme.

---

## Next steps (v2)

1. **Learning plan generator** — take the top-right quadrant assumptions, group them into pre-launch and post-launch validation activities, and assign likely owners
2. **Miro/FigJam export** — push swim-lane steps and assumption chips into a board as sticky notes
3. **Matrix UX improvements** — filter by quadrant, reduce overlapping chips, and improve the mobile layout
4. **Usage-led refinement** — observe real demo usage and improve the input, output quality, and explanation of the framework
