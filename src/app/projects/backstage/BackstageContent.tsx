'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

const panelParts = [
  {
    name: 'Inspector',
    fraction: 'Top third',
    description:
      'Hover or click any annotated element. The inspector shows where that element\'s data comes from — which API, database, or service — what\'s computed, a sample request and response, and a one-line note to say aloud. Each element carries a status badge.',
  },
  {
    name: 'Event log',
    fraction: 'Bottom two-thirds',
    description:
      'Every click on an annotated element appends a card narrating the backend story. "User clicked Verify → POST /kyc/verify → awaiting pass/fail." Newest on top. Builds a running transcript of the demo as you go.',
  },
]

const statuses = [
  {
    label: 'live',
    color: 'bg-success-subtle text-success',
    meaning: 'Source confirmed — wired or wireable',
    when: 'You can point to the real endpoint or table.',
  },
  {
    label: 'mock',
    color: 'bg-warning-subtle text-warning',
    meaning: 'Stubbed, but the real source is known',
    when: 'Data is faked for the demo, but you know where it\'ll come from.',
  },
  {
    label: 'tbd',
    color: 'bg-secondary text-muted-foreground',
    meaning: 'Source not yet identified',
    when: 'You\'re guessing. Say so, and add an open question.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Tag elements',
    body: 'Add a data-backstage="<id>" attribute to the elements a presenter would point at. Aim for 6–12 per prototype — the ones that carry the demo. Not every div.',
  },
  {
    num: '02',
    title: 'Write annotations',
    body: 'In a separate file, map each id to its backend description: where the data comes from, what\'s computed, a sample request/response, a line to say aloud, and any open questions. Pre-fill what you know; set status to tbd for the rest.',
  },
  {
    num: '03',
    title: 'Init the overlay',
    body: 'Load the engine and call Backstage.init(annotations) once after the DOM loads (vanilla), or render <Backstage annotations={...} /> at the app root (React). Off by default — the prototype looks clean until the presenter pulls the curtain back.',
  },
]

const implementations = [
  {
    name: 'Vanilla JS',
    badge: 'No dependencies',
    description: 'A single self-contained script. Load it and call Backstage.init(). Injects its own styles. Works in plain HTML, Vue, Svelte, or any framework where you just want a drop-in script.',
    files: ['backstage.js'],
  },
  {
    name: 'React / TypeScript',
    badge: 'Tailwind',
    description: 'A typed React component with Tailwind styling. Render <Backstage annotations={...} /> at the app root. Same structure as the vanilla version — restyle freely, keep the annotation schema.',
    files: ['Backstage.tsx', 'types.ts', 'annotations.example.ts'],
  },
]

export function BackstageContent() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Backstage' },
          ]}
        />

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Constructive Distractions
          </p>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">
            Backstage
          </h1>
          <p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
            An overlay that turns any prototype into a self-explaining demo — showing stakeholders exactly where data comes from, what&apos;s real, what&apos;s mocked, and what&apos;s still open.
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Built for the moment when an engineer in the room asks &ldquo;is that number real?&rdquo; and you want a better answer than &ldquo;yes&rdquo; or a fumbled explanation.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/backstage-demo.html"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              View live demo →
            </Link>
            <a
              href="/skills/backstage.md"
              download
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ↓ Download skill file
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {/* How it works */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">How it works</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                A tab peeks on the right edge of the prototype. Clicking it slides open a dark panel — invisible until needed, so the prototype looks clean for the parts of the demo that don&apos;t need narration.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {panelParts.map((part, i) => (
                <Reveal key={part.name} delay={i * 80}>
                  <div className="rounded-xl border border-border bg-card px-5 py-4 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold text-foreground">{part.name}</p>
                      <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                        {part.fraction}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{part.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={160}>
              <p className="text-xs text-muted-foreground max-w-2xl">
                The panel reads from a separate annotations file — one file maps element IDs to their backend descriptions. The prototype markup only gets{' '}
                <code className="font-mono text-foreground-subtle bg-secondary px-1 py-0.5 rounded text-[11px]">data-backstage=&quot;id&quot;</code>{' '}
                attributes. Everything else is declarative.
              </p>
            </Reveal>
          </section>

          {/* Status system */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">The status system</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                Every annotated element carries one of three statuses. The honest gap isn&apos;t a problem to hide — it&apos;s the most useful thing to surface live, because it&apos;s usually the decision that needs the room&apos;s input.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-3 border-b border-border bg-secondary px-4 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Meaning</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">When to use</p>
                </div>
                {statuses.map((s, i) => (
                  <div
                    key={s.label}
                    className={`grid grid-cols-3 px-4 py-3 gap-4 items-start ${i < statuses.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <span className={`${s.color} px-2 py-0.5 rounded text-xs font-mono font-semibold w-fit`}>
                      {s.label}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.meaning}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.when}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs text-muted-foreground mt-3 max-w-2xl">
                When in doubt, prefer <span className="font-mono text-foreground-subtle">tbd</span>. A demo full of confident-but-fake &ldquo;live&rdquo; endpoints falls apart the moment an engineer asks a pointed question.
              </p>
            </Reveal>
          </section>

          {/* Adding it */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">Adding it to a prototype</h2>
              <p className="text-xs text-muted-foreground mb-6">
                Three steps. The annotation file is the only thing that needs ongoing editing.
              </p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 80}>
                  <div className="rounded-xl border border-border bg-card px-5 py-4 flex gap-5">
                    <span className="text-[10px] font-mono text-muted-foreground pt-0.5 flex-shrink-0 w-5">
                      {step.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Implementations */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">Implementations</h2>
              <p className="text-xs text-muted-foreground mb-6">
                Two reference implementations — adapt them to match the prototype&apos;s conventions. Keep the annotation schema; change the styling freely.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {implementations.map((impl, i) => (
                <Reveal key={impl.name} delay={i * 80}>
                  <div className="rounded-xl border border-border bg-card px-5 py-4 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold text-foreground">{impl.name}</p>
                      <span className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-xs">
                        {impl.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{impl.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {impl.files.map((f) => (
                        <a
                          key={f}
                          href={`/skills/backstage/${f}`}
                          download
                          className="font-mono text-[11px] bg-background border border-border text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors px-2 py-0.5 rounded"
                        >
                          ↓ {f}
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Closing */}
          <Reveal className="pb-10">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              The annotation file is the artifact that persists after the demo. It&apos;s a record of what was real, what was mocked, and what questions were still open — useful for whoever picks up the engineering work next.
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
