import Link from 'next/link'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

const capabilities = [
  {
    title: 'Animated data',
    description:
      'Charts that draw themselves on scroll, counters that count up when they enter view. The data reveals instead of sitting static.',
  },
  {
    title: 'Interactive exploration',
    description:
      'Parameter sliders that let the audience drag through assumptions. Carousels for stepping through a set of ideas. Click-to-expand cards for optional depth.',
  },
  {
    title: 'Live demos',
    description:
      'Actual working component behavior in the presentation itself — not a screenshot of what it would do. A notification that fires and auto-dismisses. A side panel that slides in.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Intake',
    body: 'Nail the ask, the audience, and the raw material before touching the layout. What single decision or belief does this need to create? Who is in the room? How are they consuming it — presented live or read async?',
  },
  {
    num: '02',
    title: 'Shape',
    body: 'Pick a narrative structure. For leadership: SCQA (Situation → Complication → Question → Answer), answer-first. For vision or change: Sparkline (oscillate between what-is and what-could-be). For walkthroughs: 3-act. The throughline — the one sentence the audience repeats afterward — gets written before anything is built.',
  },
  {
    num: '03',
    title: 'Layout',
    body: 'Pick the spatial grammar based on how it\'ll be consumed. Vertical scroll for async reads and data-rich stories. Horizontal sequence for live, controlled delivery. Spine-and-ribs when there\'s a clear arc with sections that reward exploration — a vertical scroll carries the story, horizontal and expandable "ribs" hold detail and interactive sections, then return to the spine.',
  },
  {
    num: '04',
    title: 'Propose',
    body: 'Write a short treatment — one paragraph naming each section\'s narrative beat and layout pattern. Surface 2–3 real choices, not open questions. The user decides what matters; everything else gets built.',
  },
  {
    num: '05',
    title: 'Render',
    body: 'Build a single self-contained HTML file. React + Tailwind via CDN, no build step, opens on double-click. Patterns are copied in from the storybook, not imported — so the file stays portable and self-contained.',
  },
  {
    num: '06',
    title: 'Self-check',
    body: 'Can a stranger state the throughline after one pass? Is the ask visible early? One idea per view? Does every section move the throughline, or does something need to be cut? Opens and runs from a double-click at presentation size?',
  },
]

const grammars = [
  {
    situation: 'Presented live, tight time, one idea at a time',
    layout: 'Horizontal sequence',
    why: 'Discrete beats you control; big type; feels like slides but cleaner',
  },
  {
    situation: 'Sent to read async, data-rich, making a complex thing simple',
    layout: 'Vertical scroll',
    why: 'Reader controls pace; progressive disclosure; numbers reveal as they scroll',
  },
  {
    situation: 'You need them to believe a model, tradeoff, or number',
    layout: 'Interactive explorable',
    why: 'Let them drag the assumptions — belief beats assertion',
  },
  {
    situation: 'Demonstrating an actual product experience',
    layout: 'Demo / embedded UI',
    why: 'Show the real thing, don\'t describe it',
  },
  {
    situation: 'A narrative spine with optional deep-dives',
    layout: 'Spine-and-ribs',
    why: 'Vertical scroll carries the arc; horizontal and expandable ribs hold detail',
  },
]

export function LivingPrototypeContent() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Living Presentation' },
          ]}
        />

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Constructive Distractions
          </p>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">
            Living Presentation
          </h1>
          <p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
            A skill for turning raw content — a Confluence page, a data pull, a rough narrative — into an interactive web presentation.
          </p>
          <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
            Built for leadership communication, where the medium usually defaults to a deck. A browser isn't a deck.
          </p>
          <a
            href="/skills/living-prototype.md"
            download
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ↓ Download skill file
          </a>
        </div>

        {/* The problem with slides */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">Why not slides</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">
            Slides force every story into the same vehicle: a horizontal sequence of static rectangles. That format works for some things and fights against others. When the story has data worth exploring, or a model worth poking, or a product experience worth showing — slides describe it. A browser can do the thing itself.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-xl border border-border bg-card px-5 py-4">
                <p className="text-sm font-semibold text-foreground mb-1.5">{cap.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The process */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">The process</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Six steps, in order. Skipping the intake is the most expensive mistake.
          </p>
          <div className="flex flex-col gap-3">
            {steps.map((step) => (
              <div key={step.num} className="rounded-xl border border-border bg-card px-5 py-4 flex gap-5">
                <span className="text-[10px] font-mono text-muted-foreground pt-0.5 flex-shrink-0 w-5">
                  {step.num}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spatial grammars */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">Choosing the layout</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Narrative first, layout second. The spatial grammar serves the story — it isn't picked for novelty.
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border bg-secondary px-4 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Situation</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Layout</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Why</p>
            </div>
            {grammars.map((row, i) => (
              <div
                key={row.layout}
                className={`grid grid-cols-3 px-4 py-3 gap-4 ${i < grammars.length - 1 ? 'border-b border-border' : ''}`}
              >
                <p className="text-xs text-muted-foreground leading-relaxed">{row.situation}</p>
                <p className="text-xs font-medium text-foreground">{row.layout}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{row.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pattern library */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">Pattern library</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
            A small vocabulary of reusable interaction patterns — each one named, described, and running live in a storybook. When building a prototype, each section maps to an intent, picks a named pattern, copies it in, and sets its knobs. The library stays small: patterns earn their place by recurring across real work.
          </p>
          <Link
            href="/projects/pattern-gallery"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse the pattern storybook →
          </Link>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-foreground mb-1">Examples</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Built with this skill. Both are single self-contained HTML files.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/vault/churn-case"
              target="_blank"
              className="group rounded-xl border border-border bg-card px-5 py-4 hover:border-border-hover transition-colors block"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">Churn & Decline Case</p>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm flex-shrink-0">→</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                A leadership case for prioritizing product depth as a retention lever. SCQA structure, spine-and-ribs layout. Six patterns: metric reveal, animated chart, horizontal carousel, parameter slider, master-detail panel, live notification demo.
              </p>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                Vault access required
              </span>
            </Link>

            <Link
              href="/pattern-gallery.html"
              target="_blank"
              className="group rounded-xl border border-border bg-card px-5 py-4 hover:border-border-hover transition-colors block"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">Pattern Storybook</p>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm flex-shrink-0">→</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Every interaction pattern running live. Drag the sliders, click the panels, replay the animations. Also the source file — patterns are copied from here directly into prototypes.
              </p>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-success bg-success-subtle px-2 py-0.5 rounded">
                Public
              </span>
            </Link>
          </div>
        </section>

        {/* Closing */}
        <div className="pb-10">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            The output is always a single file that opens on double-click and presents at whatever size it'll be shown. No build step, no dependencies, no deploy. If the team wants to take it into a production stack, the component structure ports cleanly into any React + Tailwind setup.
          </p>
        </div>
      </div>
    </main>
  )
}
