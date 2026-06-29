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

## Design System — Warm Editorial (Light Mode)

Palette: Warm cream backgrounds, rich dark brown text, copper accent. Headings in Cormorant Garamond, body in Libre Baskerville. Surface depth through luminance elevation; no shadows. All tokens defined in `src/app/globals.css`.

**Fonts:** `font-heading` = Cormorant Garamond (display headings, 大森 logo). `font-sans` = Libre Baskerville (body text, default). Applied via `--font-cormorant` and `--font-libre-baskerville` CSS variables set in `layout.tsx`.

**Dark mode note:** The `.dark` CSS block still exists and is used explicitly by DrugX (`/projects/compliant-market`), which wraps its content in `<div className="dark">` to preserve its dark marketplace aesthetic. Do not add `class="dark"` to the global html element.

### Surface Hierarchy
Four elevation levels — each step is a slightly deeper warm cream:

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--background` | `bg-background` | `#f9f5ef` | Page background (warm cream) |
| `--card` | `bg-card` | `#f0ebe0` | Cards, panels, lifted surfaces |
| `--secondary` / `--muted` | `bg-secondary` / `bg-muted` | `#e6dfd0` | Inputs, hover bg, embedded surfaces |
| `--surface-overlay` | `bg-surface-overlay` | `#e0d8c8` | Modals, tooltips, dropdowns above cards |

### Text Hierarchy
Three levels only — use nothing outside these:

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--foreground` | `text-foreground` | `#1c1815` | Primary content, headings, values |
| `--muted-foreground` | `text-muted-foreground` | `#5e5149` | Labels, descriptions, metadata |
| `--foreground-subtle` | `text-foreground-subtle` | `#b0a898` | Disabled, decorative, placeholder — non-informational only |

### Borders & Interactive States

| Token | Tailwind class | Approx hex | Use |
|---|---|---|---|
| `--border` | `border-border` | `#ddd5c4` | Default borders on cards and dividers |
| `--border-hover` | `border-border-hover` | `#c4b8a4` | Hover state on interactive cards/links |
| `--ring` | `ring-ring` | `#b87333` | Focus ring on inputs (copper) |

Accent / brand color: `--primary` = `#b87333` (copper). Used as `bg-primary text-primary-foreground` for filled buttons and interactive accents.

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
2. **Cards always need a background.** Pair `border-border` with `bg-card`.
3. **Text is exactly three levels.** `text-foreground` → `text-muted-foreground` → `text-foreground-subtle`. Nothing outside these.
4. **Interactive borders use `border-border-hover`.** Any clickable card or link block: `border-border hover:border-border-hover`.
5. **Status colors follow the solid/tinted pattern.** Don't invent one-off colored elements — use the status system.
6. **All pages use the design system, including the homepage.** No exemptions. The homepage was redesigned as part of the warm editorial rebrand.
7. **Never add `class="dark"` to the html element.** The site is light mode. DrugX uses dark mode locally via its own wrapper div.

### Project Page Hero Pattern
Document-style project pages (case studies, project write-ups) must use this hero structure to establish visual hierarchy. **The h1 being dramatically larger than everything else is what makes a page feel designed.**

```tsx
{/* Category label — always "Constructive Distractions" for /projects pages */}
<p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Constructive Distractions</p>

{/* Title — font-heading for Cormorant Garamond, text-4xl minimum */}
<h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">Project Name</h1>

{/* Hook line — text-foreground (dark brown), NOT muted. This is the pitch. */}
<p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
  The one-sentence value prop or framing.
</p>

{/* Supporting context — muted is fine here */}
<p className="text-sm text-muted-foreground mb-8 max-w-2xl">
  Stat, qualifier, or secondary framing.
</p>
```

**Key rules:** (1) Add `font-heading` to all h1 elements — this applies Cormorant Garamond. (2) Hook text immediately under the title is `text-foreground` (dark brown). Making it muted buries the lede. Only secondary context drops to `text-muted-foreground`.

## Key Components & Patterns
- `src/components/SiteHeader.tsx` — sticky site header with 大森 logo, auto-hides on `/` and DrugX pages
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
