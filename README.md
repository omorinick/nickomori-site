# nickomori.com

Nick Omori's personal website: a digital sandbox for product ideas, small tools, AI workflows, interactive narratives, and other constructive distractions.

The site is intentionally broader than a traditional portfolio. It is a place to build in public, follow curiosities, and share working concepts. The work offers a view into how Nick approaches product problems without turning the site into a polished résumé in website form.

## What is here

- **Constructive Distractions** — public experiments, product concepts, AI tools, and reusable skills
- **Writing** — a future home for writing published through Substack
- **Vault** — password-gated personal artifacts and interactive tools

Current public projects include the Assumption Mapper, AI Skills & Automations, Backstage, Living Presentation, DrugX, Theme Playground, and Backseat Driver.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS v4 and shadcn/ui
- OpenAI for server-side AI features
- Recharts and Three.js for interactive visualizations
- Vercel hosting, GitHub source control, and Cloudflare DNS

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment variables

Create `.env.local` with the variables needed for the features you are running:

```bash
VAULT_PASSWORD=
OPENAI_API_KEY=
DEMO_PASSWORD=
```

- `VAULT_PASSWORD` gates `/vault`.
- `OPENAI_API_KEY` powers the trip briefing and Assumption Mapper API routes.
- `DEMO_PASSWORD` unlocks the Assumption Mapper after its free demo uses.

Never commit `.env.local` or expose these values through `NEXT_PUBLIC_` variables.

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Homepage and featured projects |
| `/projects` | Public | Constructive Distractions index |
| `/projects/[slug]` | Public | Individual projects and experiments |
| `/vault` | Password-gated | Personal artifacts and tools |
| `/vault/[slug]` | Password-gated | Individual Vault artifacts |

## Deployment

The production site is hosted on Vercel at [nickomori.com](https://nickomori.com). Pushes to `main` deploy through the connected GitHub repository.
