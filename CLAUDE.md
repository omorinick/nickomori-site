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

Reference: Linear / Figma dark mode. Surface depth through luminance elevation; no shadows. All tokens defined in `src/app/globals.css`.

### Surface Hierarchy
Four elevation levels — each step is a lighter gray:

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--background` | `bg-background` | `#1c1c1c` | Page background |
| `--card` | `bg-card` | `#272727` | Cards, panels, lifted surfaces |
| `--secondary` / `--muted` | `bg-secondary` / `bg-muted` | `#303030` | Inputs, hover bg, embedded surfaces |
| `--surface-overlay` | `bg-surface-overlay` | `#3a3a3a` | Modals, tooltips, dropdowns above cards |

### Text Hierarchy
Three levels only — use nothing outside these:

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--foreground` | `text-foreground` | `#ededed` | Primary content, headings, values |
| `--muted-foreground` | `text-muted-foreground` | `#888888` | Labels, descriptions, metadata |
| `--foreground-subtle` | `text-foreground-subtle` | `#4a4a4a` | Disabled, decorative, placeholder — non-informational only |

### Borders & Interactive States

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--border` | `border-border` | `#3d3d3d` | Default borders on cards and dividers |
| `--border-hover` | `border-border-hover` | `#545454` | Hover state on interactive cards/links |
| `--ring` | `ring-ring` | `~#808080` | Focus ring on inputs |

Standard interactive card pattern:
```tsx
className="border border-border bg-card hover:border-border-hover transition-colors"
```

Modal pattern — the one place shadows are appropriate (they signal elevation above a scrim):
```tsx
{/* scrim */}
<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
  {/* panel */}
  <div className="bg-surface-overlay border border-border rounded-2xl p-8 shadow-2xl shadow-black/60">
    <h2 className="text-base font-semibold text-foreground">Title</h2>
    <p className="text-sm text-foreground leading-relaxed">Body text — always text-foreground, not muted.</p>
  </div>
</div>
```

### Status Colors
Each status has three variants for different contexts:

| Status | Solid (`bg-X text-X-foreground`) | Tinted (`bg-X-subtle text-X`) | Text only (`text-X`) |
|---|---|---|---|
| `success` | Filled green bg | Dark green tint + green text | Green label |
| `warning` | Filled amber bg | Dark amber tint + amber text | Amber label |
| `info` | Filled blue bg | Dark blue tint + blue text | Blue label |
| `destructive` | Filled red bg (shadcn built-in) | — | Red label |

Usage examples:
```tsx
// Solid badge (high-prominence status)
<span className="bg-success text-success-foreground px-2 py-0.5 rounded text-xs">Live</span>

// Tinted chip (standard status indicator)
<span className="bg-success-subtle text-success px-2 py-0.5 rounded text-xs">Active</span>

// Inline text label
<span className="text-warning text-sm">Pending review</span>
```

### Rules — follow on every page and component
1. **Use semantic tokens, not hardcoded neutrals.** Never use `bg-neutral-800`, `text-gray-400`, `border-neutral-700`, etc. Always use the tokens above.
2. **Cards always need a background.** Pair `border-border` with `bg-card` — a border without a bg is invisible on dark.
3. **Text is exactly three levels.** `text-foreground` → `text-muted-foreground` → `text-foreground-subtle`. Nothing outside these.
4. **Interactive borders use `border-border-hover`.** Any clickable card or link block: `border-border hover:border-border-hover`.
5. **Status colors follow the solid/tinted pattern.** Don't invent one-off colored elements — use the status system.
6. **Homepage is exempt.** `/` uses hardcoded `bg-neutral-950` and `border-neutral-800` intentionally — it's a distinct design. Don't apply these rules there.

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
