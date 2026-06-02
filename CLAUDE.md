@AGENTS.md

# nickomori.com — Claude Code Instructions

## What this project is
Personal website for Nick Omori (PM). Public-facing sections (Constructive Distractions, Projects) and a private vault for personal AI artifacts. Hosted on Vercel, domain on Cloudflare, repo on GitHub.

## Stack
- Next.js 16.2.4 (App Router) — NOTE: `middleware` is now called `proxy` in this version, see AGENTS.md
- React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` — no config file)
- shadcn/ui — components in `src/components/ui/`, install with `npx shadcn@latest add [component]`
- `cn()` utility in `src/lib/utils.ts` for conditional class merging
- Vercel (hosting + env vars), GitHub (source), Cloudflare (DNS)

## Commands
```bash
npm run dev        # start local dev server at localhost:3000
npm run build      # production build
npx tsc --noEmit   # type-check without building
```

## Deployment
Push to `main` → Vercel auto-deploys.
```bash
git add <files>
git commit -m "description"
git push
```

## Route Model
| Route | Public label | Access | Purpose |
|---|---|---|---|
| `/` | — | Public | Homepage |
| `/portfolio` | Constructive Distractions | Public | PM projects, automations, demos |
| `/portfolio/[slug]` | — | Public | Individual project page |
| `/projects` | Projects | Public | Side projects |
| `/projects/[slug]` | — | Public or pw-gated | Individual project |
| `/vault` | Vault | Password-gated | Personal AI artifacts |
| `/vault/[slug]` | — | Password-gated | Individual artifact |

## Authentication
- Vault gate: `src/proxy.ts` (Next.js 16 renamed middleware → proxy)
- Passphrase: `VAULT_PASSWORD` env var (`.env.local` locally, Vercel dashboard in prod)
- Cookie: `vault-auth`, 30-day expiry, httpOnly
- Server actions: `src/app/vault/actions.ts`

## Environment Variables
| Variable | Purpose |
|---|---|
| `VAULT_PASSWORD` | Vault login passphrase |
| `OPENAI_API_KEY` | OpenAI GPT-4o-mini for trip briefing API route |

## Key Components & Patterns
- `src/components/PageBreadcrumb.tsx` — shared breadcrumb nav used on all inner pages
- `src/components/trip/` — Japan itinerary components (generic, reusable for future trips)
- `src/data/trips/japan-2026.ts` — trip data types and JAPAN_2026 export
- `src/app/api/trip/briefing/route.ts` — OpenAI POST handler (instantiate client inside handler, not at module level)
- `src/app/icon.png` — ramen bowl favicon (no icon.tsx — static PNG takes precedence)
- Dark mode forced globally via `class="dark"` on `<html>` in `src/app/layout.tsx`

## Architectural Rules — do not break these
1. **AI API calls are server-side only.** Any OpenAI/Anthropic call goes through `/app/api/`. Never `NEXT_PUBLIC_` on keys. Never call AI from a client component.
2. **Secrets in env vars only.** Never hardcode. Never commit `.env.local`. Add to Vercel dashboard AND `.env.local`.
3. **OpenAI client inside handler.** Instantiate `new OpenAI(...)` inside the POST function, not at module level — Next.js evaluates module-level code at build time when the key isn't available.
4. **Validate inputs server-side** before any API call.
5. **Keep proxy.ts lean.** No heavy logic, no imports from app code.

## What NOT to do
- Don't add auth libraries (Clerk, NextAuth) — cookie gate is intentional
- Don't add a database yet — file-based content until volume justifies it
- Don't use `NEXT_PUBLIC_` on anything sensitive
- Don't add comments explaining what code does — only comment on non-obvious *why*
- Don't modify Japan itinerary component internals without reading the data model first
