'use client'

import { useState, useEffect, useRef } from 'react'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import Link from 'next/link'

// --- Hooks ---

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

function useCountUp(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

// --- Primitives ---

function Stat({
  prefix = '',
  target,
  suffix = '',
  decimals = 0,
  label,
  delay = 0,
}: {
  prefix?: string
  target: number
  suffix?: string
  decimals?: number
  label: string
  delay?: number
}) {
  const { ref, inView } = useInView(0.3)
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive(true), delay)
    return () => clearTimeout(t)
  }, [inView, delay])
  const val = useCountUp(target, 1600, active)
  const display = decimals === 1 ? (val / 10).toFixed(1) : val.toString()
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span className="text-5xl font-bold font-heading text-primary tracking-tight leading-none tabular-nums">
        {prefix}{display}{suffix}
      </span>
      <span className="text-xs text-muted-foreground leading-snug">{label}</span>
    </div>
  )
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
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">{children}</p>
  )
}

// --- Gap matrix ---

type Cov = 'yes' | 'partial' | 'none'

function Dot({ status }: { status: Cov }) {
  if (status === 'yes')
    return <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0 inline-block" />
  if (status === 'partial')
    return <span className="w-3 h-3 rounded-full border-2 border-muted-foreground flex-shrink-0 inline-block" />
  return <span className="w-3 h-3 rounded-full border border-border flex-shrink-0 inline-block" />
}

const COMPETITORS: { cat: string; a: Cov; b: Cov; c: Cov; d: Cov }[] = [
  { cat: 'Log & reminder apps', a: 'partial', b: 'partial', c: 'none', d: 'none' },
  { cat: 'OBD dongle apps', a: 'none', b: 'none', c: 'none', d: 'none' },
  { cat: 'CARFAX Car Care', a: 'partial', b: 'partial', c: 'none', d: 'none' },
  { cat: 'RepairPal', a: 'none', b: 'none', c: 'none', d: 'partial' },
  { cat: 'On-demand mechanics', a: 'none', b: 'none', c: 'none', d: 'none' },
  { cat: 'Car super-apps', a: 'partial', b: 'none', c: 'none', d: 'none' },
]

const PROBLEMS = [
  { key: 'a' as const, label: 'Know your schedule' },
  { key: 'b' as const, label: "See what's coming" },
  { key: 'c' as const, label: 'Real-time at the shop', highlight: true },
  { key: 'd' as const, label: 'Evaluate the rec.' },
]

function GapMatrix() {
  const { ref, inView } = useInView(0.05)
  return (
    <div ref={ref} className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px]">
          <thead>
            <tr className="bg-card border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-normal text-muted-foreground w-44" />
              {PROBLEMS.map(({ key, label, highlight }) => (
                <th
                  key={key}
                  className={`px-3 py-3 text-xs font-medium text-center ${highlight ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {highlight ? (
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {label}
                    </span>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((row, i) => (
              <tr
                key={row.cat}
                className="border-t border-border bg-background transition-all duration-500"
                style={{
                  opacity: inView ? 1 : 0,
                  transitionDelay: inView ? `${i * 60}ms` : '0ms',
                }}
              >
                <td className="px-4 py-3 text-sm text-muted-foreground">{row.cat}</td>
                {PROBLEMS.map(({ key }) => (
                  <td
                    key={key}
                    className={`px-3 py-3 text-center ${key === 'c' ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex justify-center">
                      <Dot status={row[key]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {/* Backseat Driver row */}
            <tr
              className="border-t-2 border-primary/30 bg-card transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: inView ? `${COMPETITORS.length * 60}ms` : '0ms',
              }}
            >
              <td className="px-4 py-3 text-sm font-semibold text-foreground">
                Backseat Driver
              </td>
              {PROBLEMS.map(({ key }) => (
                <td
                  key={key}
                  className={`px-3 py-3 text-center ${key === 'c' ? 'bg-primary/10' : ''}`}
                >
                  <div className="flex justify-center">
                    <Dot status="yes" />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 bg-card border-t border-border flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Solved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-muted-foreground inline-block" /> Partial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-border inline-block" /> Not solved
        </span>
      </div>
    </div>
  )
}

// --- Main ---

export function BusinessCaseContent() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Backseat Driver', href: '/projects/backseat-driver' },
            { label: 'The Business Case' },
          ]}
        />
      </div>

      {/* ── 1. Hero / Situation ── */}
      <section className="max-w-4xl mx-auto px-6 pt-6 pb-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
          The Business Case
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.05] mb-8 max-w-3xl">
          A $199B market where 78% of customers don&apos;t trust the product.
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-16">
          US auto repair runs on an aging fleet, rising costs, and a trust deficit that every existing app has failed — or chosen not — to fix. Here&apos;s why the white space exists, and why the incentive structure is the product.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-t border-b border-border">
          <Stat prefix="$" target={199} suffix="B" label="US auto repair market, 2025" delay={0} />
          <Stat target={289} suffix="M" label="light vehicles on US roads" delay={150} />
          <Stat target={78} suffix="%" label="of drivers distrust mechanics" delay={300} />
          <Stat target={128} suffix=" yrs" decimals={1} label="avg vehicle age — a record high" delay={450} />
        </div>
      </section>

      {/* ── 2. Complication — The four problems ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <SectionLabel>The Complication</SectionLabel>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight mb-6">
            Four problems. One moment where they all collide.
          </h2>
        </Reveal>

        {/* Waiting room callout */}
        <Reveal delay={100} className="mb-10">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
            <p className="text-sm text-foreground leading-relaxed mb-3">
              Picture it: you&apos;re in the oil-change waiting room. The service advisor comes out with a clipboard. Your cabin air filter is &ldquo;really dirty.&rdquo; Your brake fluid is &ldquo;discolored.&rdquo; They recommend a flush — $340 all-in.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              You have no idea if any of it is true, urgent, or fairly priced. You can&apos;t exactly jack the car up yourself to check. So you either pay and feel played, or decline and spend the next week wondering if your brakes are quietly failing.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary font-semibold">83% of drivers</span> consult someone else after a mechanic&apos;s recommendation — a parent, a friend, a frantic Google search in the parking lot. The behavior already exists. The product doesn&apos;t.
            </p>
          </div>
        </Reveal>

        {/* Four problems */}
        <div className="border-t border-border">
          {[
            {
              num: '01',
              label: "You don't know your schedule",
              detail: "Most owners have no idea what the manufacturer actually recommends at a given mileage — what's real vs. what's marketing.",
            },
            {
              num: '02',
              label: "You can't see what's coming",
              detail: "There's a timeline of upcoming work — some expensive — with no tool that surfaces it proactively.",
            },
            {
              num: '03',
              label: "You're captive at the shop",
              detail: "Upsells arrive when the car is on the lift and leaving costs time. No low-pressure way to evaluate what you're being told.",
            },
            {
              num: '04',
              label: "You can't evaluate a recommendation",
              detail: "Is it real? How urgent? What's fair to pay? Does declining risk the warranty? No app answers this in real time.",
            },
          ].map(({ num, label, detail }, i) => (
            <Reveal key={num} delay={i * 80}>
              <div className="flex gap-5 py-5 border-b border-border">
                <span className="text-[10px] font-mono text-muted-foreground pt-0.5 flex-shrink-0 w-5">{num}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3. The Landscape — Gap matrix ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <SectionLabel>The Landscape</SectionLabel>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight mb-3">
            Six categories of apps. None solve the moment that matters.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Each player solves a slice. Map the four user problems against the landscape and the white space becomes impossible to miss.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <GapMatrix />
        </Reveal>
        <Reveal delay={150} className="mt-6">
          <div className="bg-primary/8 border border-primary/20 rounded-xl px-5 py-4 max-w-2xl">
            <p className="text-sm font-semibold text-foreground mb-1">
              &ldquo;Real-time at the shop&rdquo; is completely vacant.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No product answers, in the waiting room, in real time: <em>&ldquo;Is this recommendation real, fair, and urgent?&rdquo;</em> Problem C has no incumbent. That&apos;s the gap.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Why the gap persists — Economic capture ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <SectionLabel>Why the gap persists</SectionLabel>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight mb-3">
            Every app that gets close gets captured.
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            The natural monetization in this space is shop referrals, dealer partnerships, or parts affiliate revenue. The pattern is consistent enough to be predictable.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {[
            {
              name: 'FIXD',
              promise: 'Know what your warning light really means',
              capture: 'Devolved into dark patterns and subscription traps — optimized for revenue extraction, not user trust',
            },
            {
              name: 'CARFAX',
              promise: 'Passive service history you can trust',
              capture: 'Consumer app steers toward dealers and dealer-adjacent shops — the supply side it shows is also its distribution partner',
            },
            {
              name: 'RepairPal',
              promise: 'Price transparency for any repair',
              capture: 'Shops pay to be listed as "RepairPal Certified" — the recommender is funded by the recommended',
            },
          ].map(({ name, promise, capture }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{name}</p>
                  <p className="text-sm font-medium text-foreground leading-snug">&ldquo;{promise}&rdquo;</p>
                </div>
                <div className="mt-auto pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">→ {capture}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="border-l-2 border-primary pl-5 py-1 max-w-2xl">
            <p className="text-base font-semibold text-foreground leading-snug mb-1">
              The product that solves problem C can&apos;t be funded by shops without poisoning itself.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conclusion: the consumer must be the customer. That&apos;s not just an ethical stance — it&apos;s the only model where the incentives stay clean enough for the product to actually work.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── 5. The Answer — Business model ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <SectionLabel>The Answer</SectionLabel>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight mb-3">
            The incentive structure is the product.
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Every revenue decision flows from one rule: we work for the owner, not the shop.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3 mb-10">
          <Reveal>
            <div className="bg-card border border-border rounded-xl px-5 py-5">
              <div className="flex items-baseline gap-3 mb-2">
                <p className="text-sm font-semibold text-foreground">Consumer subscription</p>
                <p className="text-xs text-muted-foreground">~$5–10/mo</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Schedule and reminders are free. Decision support (the Second Opinion flow) and the record vault are paid. No shop relationships. No referral revenue. The subscription is the only line of business — which means there&apos;s nothing to compromise the recommendation engine.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="bg-card border border-border rounded-xl px-5 py-5">
              <p className="text-sm font-semibold text-foreground mb-2">Data flywheel — community pricing</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload your receipt → see what others paid for the same job, same region, same vehicle. The give-to-get mechanic solves cold-start for price data and builds a compounding moat — consumer-sourced, not shop-sourced. Designed from day one; meaningful at scale.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="bg-card border border-border rounded-xl px-5 py-5">
              <div className="flex items-baseline gap-3 mb-2">
                <p className="text-sm font-semibold text-foreground">Shop/dealer promotions</p>
                <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded">Deliberately parked</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There&apos;s an obvious revenue line in connecting shops to users who are due for service. It&apos;s parked. It recreates the exact conflict of interest the product exists to fix — and users would be right not to trust recommendations from an app that takes money from the shops making those recommendations. If ever revisited: opt-in only, clearly labeled, structurally firewalled from any recommendation output. For now, the cleaner call is not to go there. Reasoning about why <em>not</em> to take revenue is the judgment the product depends on.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Close ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="border-t border-border pt-12">
            <p className="text-2xl font-bold font-heading text-foreground tracking-tight mb-4 max-w-2xl">
              The behavior — consulting a second opinion — already exists at scale. What doesn&apos;t exist is a product built to serve it honestly.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mb-8">
              The market is large, the trust gap is documented, and every existing player has chosen revenue over the problem. That&apos;s the white space.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/projects/backseat-driver"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                ← Full case study
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Sources */}
        <Reveal delay={100} className="mt-16">
          <p className="text-xs text-muted-foreground mb-3">Sources</p>
          <ul className="flex flex-col gap-1.5">
            {[
              { label: 'ConsumerAffairs — driver trust study', href: 'https://www.consumeraffairs.com/automotive/auto-mechanics-trust-issues.html' },
              { label: 'Jerry — Americans United in Confusion, Distrust Over Car Repair Costs', href: 'https://jerry.ai/studies/americans-united-in-confusion-distrust-over-car-repair-costs/' },
              { label: 'Mordor Intelligence — US Automotive Service Market', href: 'https://www.mordorintelligence.com/industry-reports/united-states-automotive-service-market' },
              { label: 'S&P Global Mobility — US vehicle age hits 12.8 years (2025)', href: 'https://press.spglobal.com/2025-05-21-U-S-Vehicle-Age-Rises-Again-to-12-8-Years-in-2025,-According-to-S-P-Global-Mobility' },
              { label: 'RepairPal Fair Price Guarantee', href: 'https://repairpal.com/repairpal-fair-price-guarantee' },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </main>
  )
}
