# Project Context — nickomori.com

> Current-state reference for future sessions. Update this file when shipped behavior, active decisions, or near-term priorities change. Product intent belongs in `VISION.md`; technical rules belong in `CLAUDE.md`; history belongs in git.

## Current status

- Live at [nickomori.com](https://nickomori.com)
- Source is on GitHub; pushes to `main` deploy through Vercel
- Public site, public project library, and password-gated Vault are operational
- Assumption Mapper is operational in production
- Writing is a placeholder awaiting a Substack connection
- Backseat Driver is a business case and in-progress product concept, not yet a mobile app

## Product positioning

This is Nick's personal website and digital sandbox, not a conventional résumé site. It holds hobbies, experiments, useful tools, and working concepts. Nick shares it with recruiters, but the career signal should emerge from the work rather than explicit portfolio framing.

## Shipped public experience

### Homepage (`/`)

- Nick Omori hero and “Digital sandbox & working concepts” positioning
- Featured Constructive Distractions with an expandable project list
- LinkedIn link and Vault entry point
- Writing placeholder
- Sticky site header with theme and cursor-effect controls

### Constructive Distractions (`/projects`)

- **Assumption Mapper** (`/projects/pm-toolkit`) — live AI tool that generates a happy path, assumptions across five Teresa Torres dimensions, a priority matrix, and a Markdown export. Two free calls are available before the shared demo-code gate.
- **DrugX** (`/projects/compliant-market`) — satirical StockX-style pharmaceutical marketplace with dosage interactions, market data, a Three.js pill, and deliberately deadpan product copy. No transactions occur.
- **AI Skills & Automations** (`/projects/ai-skills-automations`) — working library of reusable PM workflows and downloadable skill files.
- **Backstage** (`/projects/backstage`) — reusable prototype overlay exposing live, mocked, and unresolved data sources; includes a live demo and downloadable vanilla/React implementations.
- **Living Presentation** (`/projects/living-prototype`) — method and reusable skill for turning raw material into interactive web-native narratives.
- **Backseat Driver** (`/projects/backseat-driver`) — owner-aligned car-maintenance concept and supporting business case; marked as in progress.
- **Theme Playground** (`/theme-playground.html`) — standalone palette, typography, interaction, and CSS-token exploration tool.

### Design system

- Warm editorial palette with cream, dark brown, and copper semantic tokens
- Inter body text, Libre Baskerville headings, and Cormorant Garamond display accents
- Light mode by default with a user-controlled dark mode
- Optional cursor glow, magnetic, custom-cursor, and parallax effects; default is none
- Shared shadcn/ui primitives and semantic surface, text, border, and status tokens

## Shipped private experience

### Vault (`/vault/*`)

- Lightweight passphrase gate implemented by `src/proxy.ts` and server actions
- Thirty-day HTTP-only authentication cookie
- Intended to discourage indexing and casual access, not protect highly sensitive data

### Japan 2026 (`/vault/japan`)

- File-based trip covering Tokyo, Hakone, Kyoto, and Hiroshima
- Itinerary, Today, Morning, and Evening views
- Activity completion and trip state persisted in `localStorage`
- GPT-4o-mini morning briefing through `/api/trip/briefing`
- Evening rating and day-advancement flow
- Generic trip components that can support future itineraries

### Churn & Decline Case (`/vault/churn-case`)

- Interactive leadership case delivered as a self-contained HTML artifact
- Uses an SCQA narrative and spine-and-ribs presentation structure

## Shipped shareable experience

### Case Studies (`/case-studies/[slug]`)

- Reusable infrastructure for sending a single past-project case study to one external reviewer (e.g. a hiring manager) without exposing the Vault
- Each slug has its own passphrase (`CASE_STUDY_PASSWORD_<SLUG>` env var) and its own cookie, gated in `src/proxy.ts` alongside the Vault gate but independent of it
- Registry of known slugs lives in `src/data/case-studies/registry.ts`; content is bespoke TSX per case study (not a shared template), each section wrapped in a `data-slide-id` container
- Figma-style floating comment pins (`src/components/case-study/CommentLayer.tsx`): click to place, hover to expand from an initials avatar into name/date/text, edit/delete your own comment (no replies/threads), ~3s polling so viewers see updates without refreshing
- Comment identity is a typed name + a random token stored in the browser's `localStorage` — no accounts; edit/delete are enforced server-side by token match, not just hidden client-side
- First real backing datastore on this site (Upstash Redis via the Vercel Marketplace, `src/lib/redis.ts`) — a deliberate, scoped exception to the "no database" rule below, made because comments must be visible across different people's devices and persist over days, which `localStorage` can't do

## Active technical decisions

- No database for project/trip content: it stays file-based, and client-only state uses `localStorage`. The one exception is case-study comments (above), which need cross-device shared state.
- No full authentication product: shared cookie gates are intentional at the site's current sensitivity and scale — this now includes per-slug case-study passwords, not just the single Vault password.
- AI calls remain server-side under `src/app/api/`; secrets never use `NEXT_PUBLIC_` variables.
- OpenAI clients are instantiated inside request handlers so builds do not require runtime secrets. The Redis client (`src/lib/redis.ts`) follows the same lazy-init pattern.
- `/projects` is the canonical public project route; “Constructive Distractions” is its editorial label.
- DrugX intentionally has an isolated dark visual treatment and several visual-only marketplace controls.

## Environment variables

| Variable | Purpose |
|---|---|
| `VAULT_PASSWORD` | Shared passphrase for the private Vault |
| `OPENAI_API_KEY` | Trip briefing and Assumption Mapper API calls |
| `DEMO_PASSWORD` | Assumption Mapper access after free demo uses |
| `CASE_STUDY_PASSWORD_<SLUG>` | Passphrase for one case study page, e.g. `CASE_STUDY_PASSWORD_ACME` gates `/case-studies/acme` |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis (case-study comments), auto-provisioned via `vercel integration add upstash/upstash-kv` |

Variables must exist in `.env.local` for local work and in the relevant Vercel environments for deployed features.

## Near-term direction

- Connect the Writing section to Nick's Substack
- Develop Backseat Driver into a mobile app
- Improve the Assumption Mapper based on usage
- Continue adding reusable AI skills and automations
- Potentially create a football or fantasy-football game inspired by 82-0

## Known limitations

- Writing has no published integration yet.
- Backseat Driver is not yet an application.
- Vault authentication is intentionally lightweight.
- Assumption Mapper output is session-only and its matrix can become crowded with large assumption sets.
- Several DrugX interactions are intentionally non-functional because it is a satirical portfolio artifact, not a marketplace.
- There is no automated application test suite currently configured.
