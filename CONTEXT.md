# Project Context — nickomori.com

> Update this file at the end of every session. Read it at the start of every session.

## Current Status
Site is live at nickomori.com and www.nickomori.com.

## What's Been Built
- Homepage (`/`) — name, tagline placeholder, nav cards to Portfolio and Vault
- Vault (`/vault`) — password-gated with cookie auth, sign out button, placeholder content
- Vault login (`/vault/login`) — passphrase form with error state
- `/projects` — stub page (empty state, no projects yet)
- Auth system — `src/proxy.ts` gates `/vault/*`, server actions in `src/app/vault/actions.ts`
- GitHub repo: https://github.com/omorinick/nickomori-site
- Vercel project: nickomori-site (auto-deploys on push to main)
- `VAULT_PASSWORD` set in Vercel environment variables

## Still Needs Doing (Homepage)
- [ ] Replace "Your tagline here." with real tagline in `src/app/page.tsx`

## Next Up
1. First portfolio entry — pick one AI workflow or case study to build out `/portfolio/[slug]`
2. First vault artifact — Japan trip itinerary is the obvious candidate for `/vault/[slug]`
3. First project — pick a side project to stub under `/projects/[slug]`

## Active Decisions / Constraints
- Side projects live under `/projects`, not `/portfolio`
- Content starts private (vault or unlisted), flip to public when ready
- No database yet — using file-based or static content until volume justifies it
- No additional auth libraries until there's a multi-user need

## Session Log
- **2026-05-24** — Built vault + auth, initialized GitHub repo, deployed to Vercel, connected Cloudflare DNS, built homepage, set up CLAUDE.md + CONTEXT.md documentation system
