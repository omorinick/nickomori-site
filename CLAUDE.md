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
| `/projects` | Constructive Distractions | Public | PM projects, automations, demos |
| `/projects/[slug]` | — | Public or pw-gated | Individual project |
| `/vault` | Vault | Password-gated | Personal AI artifacts (linked from footer) |
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
| `OPENAI_API_KEY` | OpenAI GPT-4o for trip briefing + PM Toolkit API routes |
| `DEMO_PASSWORD` | Demo access gate for AI-powered portfolio tools |

## Design System — Dark Mode Palette

Reference: Linear / Figma dark mode. Three visible surface layers plus a clear text hierarchy.

### CSS Variables (defined in `src/app/globals.css` `.dark` block)
| Token | Approx hex | Use |
|---|---|---|
| `--background` | `#141414` | Page background — dark but not pitch black |
| `--card` | `#222222` | Cards, panels — clearly lifted above background |
| `--secondary` / `--muted` | `#2e2e2e` | Inputs, hover states, elevated surfaces |
| `--border` | `#393939` | Borders — use for all dividers and card outlines |
| `--foreground` | `#ededed` | Primary text |
| `--muted-foreground` | `#888888` | Secondary text, labels, hints |

### Rules — follow these on every page and component
1. **Use semantic tokens, not hardcoded neutrals.** Use `border-border`, `bg-card`, `bg-background`, `text-foreground`, `text-muted-foreground`. Never hardcode `border-neutral-800` or similar — those bypass the palette.
2. **Cards always need a background.** A card or surface with only a border is invisible on a dark background. Always pair `border-border` with `bg-card`.
3. **Three text weights only.** Primary content → `text-foreground`. Supporting labels, metadata, descriptions → `text-muted-foreground`. Disabled/decorative → muted at lower opacity.
4. **Homepage is exempt.** `/` uses hardcoded `bg-neutral-950` and `border-neutral-800` intentionally — it's a distinct design. Don't apply these rules there.
5. **The homepage nav card pattern** (`border-neutral-800 hover:border-neutral-600`) can be reused for nav-style link cards. For content cards (displaying data), use `bg-card border-border`.

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
