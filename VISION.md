# nickomori.com — Project Vision & Roadmap

## What This Is

A personal website with two distinct purposes:

1. **Public portfolio** — PM work samples, case studies, and projects for recruiters and interviewers
2. **Private vault** — a personal repository of AI-generated artifacts (itineraries, research docs, interactive tools) accessible from anywhere, more useful than cloud storage for interactive or web-native content

The site should feel like a living, evolving product — not a static resume page.

---

## Core Design Decisions (Already Made)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (connected to GitHub, auto-deploys on push)
- **Domain:** nickomori.com via Cloudflare
- **Auth approach:** Lightweight passphrase-based cookie gate for `/vault` — not cryptographically serious, but sufficient to keep content off Google and away from casual visitors. Can upgrade to Clerk/NextAuth later if needed.
- **Design:** AI-led to start. May incorporate a theme from Google Stitch once visual direction is clearer.

---

## Route Structure

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Homepage, name, tagline, links to portfolio |
| `/portfolio` | Public | PM case studies, work samples, resume artifacts |
| `/vault` | Password-gated | Personal AI artifacts — itineraries, research, tools |
| `/vault/[slug]` | Password-gated | Individual artifact pages |

---

## What's Been Done

- [x] Node.js installed (v24)
- [x] Next.js project scaffolded with Tailwind, TypeScript, App Router, src/ dir
- [x] Dev server running locally at localhost:3000
- [x] GitHub account created
- [x] Vercel account created
- [x] Domain registered at Cloudflare (nickomori.com)
- [ ] Homepage scaffold (in progress)
- [ ] Vault page + password gate
- [ ] GitHub repo initialized and pushed
- [ ] Vercel connected to GitHub repo
- [ ] Cloudflare DNS pointed to Vercel

---

## Next Steps (Immediate)

1. **Finish homepage scaffold** — name, tagline, link to vault
2. **Build vault page** — password gate using middleware + cookie, placeholder artifact card inside
3. **Initialize git repo** → push to GitHub → connect to Vercel → point Cloudflare DNS
4. **Confirm nickomori.com is live**

---

## Phase 2 — AI Skills Portfolio (High Priority)

Inspired by the current PM market and AI adoption curve, the portfolio section should go beyond traditional case studies and become a demonstration of AI-augmented PM craft. Specifically:

### The Concept
Build a visible, structured collection of AI "skills" — each one showing:
- What the skill/workflow does
- What tools and prompts power it
- What output it produces (with real examples)
- Why it matters for product work

Think of it as: *an agent per skill, explaining how it was built, what it interacts with, what it produces.*

### Why This Matters
- Differentiates in interviews — shows AI fluency, not just awareness
- Signals that you're building new muscle, not just talking about AI
- Creates a compounding asset — each new thing you build with AI can become a portfolio entry
- Directly addresses what the market is starting to reward (see: Coinbase 14% layoff citing AI efficiency)

### Skill Categories to Build Toward
- **PM Research Agent** — competitive analysis, user insight synthesis
- **Narrative Generator** — takes raw data, outputs structured PRD sections or stakeholder memos
- **Trip/Event Planner** — interactive AI-generated itineraries (already have Japan trip as a real example)
- **Decision Frameworks** — structured tradeoff docs on demand
- **Meeting Prep** — generates context briefs from a company/role description

### Portfolio Entry Format (per skill)
```
/portfolio/skills/[skill-name]
- What it does (1 paragraph)
- How it works (tools, prompts, workflow diagram)
- Real output example (embedded or linked)
- What I'd build next
```

---

## Vault Content Ideas (Private)

- Japan trip itinerary (Tokyo, Hakone, Kyoto, Hiroshima) — already exists, good first artifact
- AI research documents
- MBA notes and frameworks
- Interactive planning tools

---

## Guiding Principles

- **No premature optimization** — get live first, iterate on design after
- **No design debt** — keep it minimal until there's a real visual direction
- **Portable by default** — code lives in GitHub, hosting is swappable, no platform lock-in
- **Each Claude Code session needs context** — always reference this file at the start of a new session
- **The site is a product** — treat it like one. Ship, observe, iterate.

---

## How to Work on This

Each Claude Code session, start with:
> "I'm working on nickomori.com. Read VISION.md first, then let's work on [specific thing]."

This keeps continuity without re-explaining from scratch.
