@AGENTS.md

# nickomori.com — Claude Code Instructions

## What this project is
Personal website for Nick Omori (PM). Two purposes: public portfolio (PM work, AI workflow demos, side projects) and private vault (personal AI artifacts). Hosted on Vercel, domain on Cloudflare, repo on GitHub.

## Stack
- Next.js 16.2.4 (App Router) — NOTE: `middleware` is now called `proxy` in this version, see AGENTS.md
- React 19, TypeScript, Tailwind CSS v4
- Vercel (hosting + env vars), GitHub (source), Cloudflare (DNS)

## Commands
```bash
npm run dev        # start local dev server at localhost:3000
npm run build      # production build (run before deploying manually)
npx tsc --noEmit   # type-check without building
```

## Deployment
Push to `main` → Vercel auto-deploys. No manual deploy needed.
```bash
git add <files>
git commit -m "description"
git push
```

## Content & Route Model
| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Homepage |
| `/portfolio` | Public | PM case studies, AI workflow demos |
| `/portfolio/[slug]` | Public | Individual case study |
| `/projects` | Public index | Side projects (only shows public ones) |
| `/projects/[slug]` | Public or pw-gated | Individual project |
| `/vault` | Password-gated | Personal AI artifacts |
| `/vault/[slug]` | Password-gated | Individual artifact |

## Authentication
- Vault gate lives in `src/proxy.ts` (Next.js 16 renamed middleware → proxy)
- Passphrase stored in `VAULT_PASSWORD` env var (`.env.local` locally, Vercel dashboard in production)
- Cookie name: `vault-auth`, 30-day expiry, httpOnly
- Server actions for login/logout in `src/app/vault/actions.ts`

## Architectural Rules — do not break these
1. **AI API calls are server-side only.** Any call to Claude, OpenAI, or any AI API goes through `/app/api/`. Never use `NEXT_PUBLIC_` on an API key. Never call an AI API from a client component.
2. **Secrets live in environment variables only.** Never hardcode keys. Never commit `.env.local`. Add new keys to Vercel dashboard AND `.env.local`.
3. **Validate inputs server-side** before any API call or database write, even if there's also client-side validation.
4. **Keep proxy.ts lean.** It runs on every request to matched routes. No heavy logic, no imports from app code.

## What NOT to do
- Don't add auth libraries (Clerk, NextAuth) until there's a real multi-user need — current cookie gate is intentional
- Don't add a database until content volume justifies it — start with file-based or static content
- Don't use `NEXT_PUBLIC_` prefix on anything sensitive
- Don't add comments explaining what code does — only comment on non-obvious *why*
