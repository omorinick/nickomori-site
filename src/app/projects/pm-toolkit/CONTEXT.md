# Assumption Mapper — Project Context

## How to use this file

Read this file at the start of every session. Update it at the end of every session — decisions made, things built, things changed. If a decision from an earlier session gets reversed, overwrite it here. Do not preserve old decisions for historical record — this file should always reflect the current state, not the history. History lives in git.

---

## What this is and why it exists

A live interactive PM demo tool at `/projects/pm-toolkit` on nickomori.com. The goal is to showcase how Nick uses AI in his real PM workflow — specifically to accelerate the 0→1 phase of product solutioning where the blank page is hardest.

The core thesis (worth knowing for any copy or UI work): **AI is best at generating the raw material. The PM does the actual thinking.** This comes from Stanford d.school design thinking — "yes-and" — where kickstarting the brainstorm is the hardest part, and iteration is much easier once you have something to react to.

This is the flagship demo in "Constructive Distractions" (`/projects`). It's the thing Nick would point a recruiter or PM peer to.

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

**Code is complete and committed. Not yet tested end-to-end with a live OpenAI response.**

The OpenAI API key in `.env.local` is hitting a **429 quota error** (billing limit exceeded on the account). The code handles this gracefully (shows "AI service temporarily unavailable" message), but the tool won't actually work until this is resolved.

**Before pushing to production, two things are required:**
1. Add billing credits at [platform.openai.com](https://platform.openai.com) → Billing
2. Add `DEMO_PASSWORD` to Vercel dashboard: Settings → Environment Variables → Production + Preview

The local placeholder is `DEMO_PASSWORD=letmein2026` in `.env.local`.

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

**The homepage (`/`) uses hardcoded Tailwind neutral colors**, not the semantic design tokens. That's intentional — it's a different design. Don't apply the card/surface token rules there.

---

## Design system note

The site uses a three-layer dark surface hierarchy (defined in `src/app/globals.css`):
- Background: `#161616`
- Card/panel: `#242424`
- Input/elevated: `#2E2E2E`
- Border: `#393939`

All inner pages (everything under `/projects`) should use `border-border bg-card` for surfaces, `text-foreground` for primary text, `text-muted-foreground` for secondary. Never hardcode `border-neutral-800` on inner pages — it won't follow the palette.

---

## Next steps (v2)

1. **Fix OpenAI billing** → end-to-end test the tool
2. **Add `DEMO_PASSWORD` to Vercel** → push to production
3. **Learning plan generator** — the natural v2 feature: take the top-right quadrant assumptions, group into pre-launch and post-launch validation activities (interviews, prototypes, metric monitors, experiments, etc.), assign to PM/Designer/Eng
4. **Miro/FigJam export** — use Miro REST API or FigJam plugin to push swim lane steps and assumption chips directly into a board as sticky notes
5. **Matrix UX improvements** — filter by quadrant, de-clutter overlapping chips, mobile layout
