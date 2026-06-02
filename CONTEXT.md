# Project Context — nickomori.com

> Update this file at the end of every session. Read it at the start of every session.

## Current Status
Live at nickomori.com. Dark mode, ramen favicon, full vault with Japan itinerary.

## What's Been Built

### Homepage (`/`)
- 大森 kanji display, "Nick Omori", tagline: "Digital sandbox & working concepts."
- Nav cards: Constructive Distractions (`/portfolio`) and Vault (`/vault`)
- Mouse spotlight animation (radial gradient follows cursor)
- LinkedIn footer link
- Ramen bowl favicon (`src/app/icon.png`)

### Design System
- shadcn/ui installed — Button, Card, Badge, Input, Textarea in `src/components/ui/`
- `cn()` utility in `src/lib/utils.ts`
- `PageBreadcrumb` component at `src/components/PageBreadcrumb.tsx` — used on all inner pages
- Dark mode forced globally via `class="dark"` on `<html>`

### Vault (`/vault/*`)
- Password-gated via `src/proxy.ts` + cookie auth
- Vault index shows Japan 2026 artifact card
- Login page at `/vault/login`

### Japan 2026 Living Itinerary (`/vault/japan`)
- Full trip data: `src/data/trips/japan-2026.ts` (16 cards, 4 cities, travel segments)
- 4-tab interface: Itinerary / Today / Morning / Evening
- Activity checkboxes with localStorage persistence
- Morning briefing via OpenAI GPT-4o-mini (`/api/trip/briefing`)
- Evening check-in with star rating + day advancement
- Generic components in `src/components/trip/` (reusable for future trips)

### Constructive Distractions (`/portfolio`)
- "Please request access." placeholder — ready to populate with projects

### Projects (`/projects`)
- Empty state stub with shadcn Card

## Active Decisions / Constraints
- No database — localStorage for trip state, file-based for content
- No auth libraries — cookie gate is intentional for now
- Portfolio route is `/portfolio` even though public label is "Constructive Distractions"
- Japan itinerary components are light-themed (dark mode not applied to trip UI)
- `OPENAI_API_KEY` must be instantiated inside the POST handler, not at module level

## Environment Variables (both .env.local and Vercel)
- `VAULT_PASSWORD` — vault passphrase
- `OPENAI_API_KEY` — GPT-4o-mini for morning briefing

## What's Next
- Populate Constructive Distractions with first real project
- Dark mode pass on Japan itinerary components (currently light-themed)
- Projects page first entry

## Session Log
- **2026-05-24** — Built vault + auth, GitHub repo, Vercel deploy, Cloudflare DNS, homepage, CLAUDE.md + CONTEXT.md system
- **2026-05-24** — Built Japan 2026 living itinerary: full data file, all components, OpenAI briefing, localStorage state
- **2026-05-24** — Added shadcn/ui, PageBreadcrumb, dark mode, ramen favicon, mouse spotlight, 大森, tagline, LinkedIn footer
- **2026-06-01** — Renamed Portfolio → Constructive Distractions, updated copy throughout
- **2026-06-02** — Updated global ~/.claude/CLAUDE.md, created ~/claude-playbook.md, refreshed CLAUDE.md + CONTEXT.md
