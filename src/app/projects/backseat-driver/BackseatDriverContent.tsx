'use client'

import { useState, useEffect, useRef } from 'react'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

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

// --- Components ---

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
      <span className="text-4xl font-bold font-heading text-primary tracking-tight leading-none tabular-nums">
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
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
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
        <table className="w-full min-w-[560px]">
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
                  ) : label}
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
                  <td key={key} className={`px-3 py-3 text-center ${key === 'c' ? 'bg-primary/5' : ''}`}>
                    <div className="flex justify-center"><Dot status={row[key]} /></div>
                  </td>
                ))}
              </tr>
            ))}
            <tr
              className="border-t-2 border-primary/30 bg-card transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: inView ? `${COMPETITORS.length * 60}ms` : '0ms',
              }}
            >
              <td className="px-4 py-3 text-sm font-semibold text-foreground">Backseat Driver</td>
              {PROBLEMS.map(({ key }) => (
                <td key={key} className={`px-3 py-3 text-center ${key === 'c' ? 'bg-primary/10' : ''}`}>
                  <div className="flex justify-center"><Dot status="yes" /></div>
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

// --- Page ---

export function BackseatDriverContent() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Backseat Driver' },
          ]}
        />

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Constructive Distractions</p>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">Backseat Driver</h1>
          <p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
            A car-maintenance advisor that works for the owner, not the shop.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            US auto repair is a $199B market built on 289M vehicles with an average age of 12.8 years — the oldest ever recorded. 78% of drivers distrust the shops they depend on. The app that actually fixes this doesn&apos;t exist yet.
          </p>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
            Build in progress
          </span>
        </div>

        {/* Stats — count up on scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-t border-b border-border mb-16">
          <Stat target={78} suffix="%" label="of drivers distrust mechanics" delay={0} />
          <Stat target={83} suffix="%" label="consult someone after a recommendation" delay={150} />
          <Stat prefix="$" target={199} suffix="B" label="US auto repair market (2025)" delay={300} />
          <Stat target={128} suffix=" yrs" decimals={1} label="avg US vehicle age — a record high" delay={450} />
        </div>

        <div className="flex flex-col gap-20">

          {/* ── The moment that matters ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-4">The moment that matters</h2>
              <p className="text-sm text-foreground leading-relaxed max-w-2xl mb-4">
                Picture it: you&apos;re in the oil-change waiting room. The service advisor comes out with a clipboard. Your cabin air filter is &ldquo;really dirty.&rdquo; Your brake fluid is &ldquo;discolored.&rdquo; They recommend a flush — $340 all-in. You have no idea if any of it is true, urgent, or fairly priced. So you either pay and feel played, or decline and spend the next week wondering if your brakes are quietly failing.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
                83% of drivers consult someone else after a mechanic&apos;s recommendation — a parent, a friend, a frantic Google search in the parking lot. The behavior already exists. The product doesn&apos;t.
              </p>
            </Reveal>

            <div className="border-t border-border">
              {[
                { num: '01', label: "You don't know your schedule", detail: "Most owners have no idea what the manufacturer actually recommends at a given mileage — what's real vs. what's marketing." },
                { num: '02', label: "You can't see what's coming", detail: "There's a timeline of upcoming work — some expensive — with no tool that surfaces it proactively." },
                { num: '03', label: "You're captive at the shop", detail: "Upsells arrive when the car is on the lift and leaving costs time. No low-pressure way to evaluate what you're being told." },
                { num: '04', label: "You can't evaluate a recommendation", detail: "Is it real? How urgent? What's fair to pay? Does declining risk the warranty? No app answers this in real time." },
              ].map(({ num, label, detail }, i) => (
                <Reveal key={num} delay={i * 80}>
                  <div className="flex gap-5 py-4 border-b border-border">
                    <span className="text-[10px] font-mono text-muted-foreground pt-1 flex-shrink-0 w-5">{num}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-0.5">{label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Personal story ── */}
          <section>
            <Reveal>
              <blockquote className="border-l-2 border-warning pl-5 py-1">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  &ldquo;My 2013 Hyundai Sonata engine seized one mile from the dealership. I&apos;d just gotten married, joined a pre-revenue startup, and my wife was the breadwinner. The dealership claimed the seizure was due to faulty maintenance and asked for records I didn&apos;t have — most of the work had been done by a family friend with paper receipts only. Credit card statements and a signed letter weren&apos;t enough. The dealership had no incentive to push the claim through.
                </p>
                <p className="text-sm text-foreground leading-relaxed mb-2">
                  Seven months later, a service advisor twenty miles away told us something the first one didn&apos;t: you can photograph the engine internals to show the oil passages are clean — proof the seizure wasn&apos;t from neglect, regardless of paper records. We were lucky. Without him, I had no way to prove I&apos;d taken care of my car.&rdquo;
                </p>
                <p className="text-xs text-muted-foreground">(The engine was notorious for seizing — Hyundai had already faced a lawsuit — which is why the extended warranty existed. The records problem was still nearly enough to sink a claim I was legally entitled to.)</p>
              </blockquote>
            </Reveal>
          </section>

          {/* ── What's already out there — Gap matrix ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">What&apos;s already out there</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Fragmented. Each app solves a slice. None solve the moment that matters.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <GapMatrix />
            </Reveal>
            <Reveal delay={120} className="mt-4">
              <div className="bg-primary/8 border border-primary/20 rounded-xl px-5 py-4 max-w-2xl">
                <p className="text-sm font-medium text-foreground mb-1">
                  &ldquo;Real-time at the shop&rdquo; is completely vacant.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No product answers, in the waiting room, in real time: <em>&ldquo;Is this recommendation real, fair, and urgent?&rdquo;</em> Problem C has no incumbent.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ── Why the gap persists ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">Why the gap persists</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                Every app that gets close to the trust problem gets economically captured by the supply side it&apos;s supposed to police.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {[
                { name: 'FIXD', promise: 'Know what your warning light really means', capture: 'Devolved into dark patterns and subscription traps — optimized for revenue, not user trust' },
                { name: 'CARFAX', promise: 'Passive service history you can trust', capture: 'Consumer app steers toward dealers — the supply side it surfaces is also its distribution partner' },
                { name: 'RepairPal', promise: 'Price transparency for any repair', capture: 'Shops pay to be listed as "RepairPal Certified" — the recommender is funded by the recommended' },
              ].map(({ name, promise, capture }, i) => (
                <Reveal key={name} delay={i * 80}>
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
            <Reveal delay={100}>
              <div className="border-l-2 border-primary pl-5 py-1 max-w-2xl">
                <p className="text-sm font-semibold text-foreground leading-snug mb-1">
                  The product that solves problem C can&apos;t be funded by shops without poisoning itself.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Conclusion: the consumer must be the customer. That&apos;s not just an ethical stance — it&apos;s the only model where the incentives stay clean enough for the product to work.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ── The product ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">The product</h2>
              <p className="text-sm text-muted-foreground mb-5">Three moments. Three distinct jobs.</p>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                { moment: 'At home', description: 'Enter your VIN → your actual maintenance schedule in plain English. What each item is, why it matters, what it costs. Reminders adapt to mileage.' },
                { moment: 'At the shop', description: 'They recommend something → open the app → legitimacy, urgency, fair price range, and exactly what to say to the advisor. The second opinion that already exists as a behavior.' },
                { moment: 'After', description: 'Snap the receipt → record vault updated. Warranty-grade documentation whether the work was done at a dealer or by a family friend with paper receipts.' },
              ].map(({ moment, description }, i) => (
                <Reveal key={moment} delay={i * 80}>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs font-medium text-muted-foreground mb-2">{moment}</p>
                    <p className="text-sm text-foreground leading-relaxed">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <Reveal>
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-medium text-success mb-3">Now — MVP</p>
                  <ul className="flex flex-col gap-2">
                    {['VIN → maintenance schedule', 'Smart reminders (mileage + time)', 'Second Opinion flow', 'Record vault'].map((feat) => (
                      <li key={feat} className="text-sm text-foreground">{feat}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-medium text-info mb-3">Next</p>
                  <ul className="flex flex-col gap-2">
                    {['Community pricing (Glassdoor for mechanics)', 'Warranty-aware guidance'].map((feat) => (
                      <li key={feat} className="text-sm text-foreground">{feat}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Later</p>
                  <ul className="flex flex-col gap-2">
                    {['ML on uploaded photos', 'Shop-side verified records'].map((feat) => (
                      <li key={feat} className="text-sm text-foreground">{feat}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Business model ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">The business model</h2>
              <p className="text-sm text-muted-foreground mb-5">The incentive structure is the product. Every revenue decision flows from that.</p>
            </Reveal>
            <div className="flex flex-col gap-3">
              <Reveal>
                <div className="bg-card border border-border rounded-xl px-5 py-4">
                  <p className="text-sm font-medium text-foreground mb-1">Consumer subscription — ~$5–10/mo</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Schedule and reminders are free. Decision support and the record vault are paid. No shop relationships. No referral revenue. The subscription is the only line of business — which means there&apos;s nothing to compromise the recommendation engine.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="bg-card border border-border rounded-xl px-5 py-4">
                  <p className="text-sm font-medium text-foreground mb-1">Data flywheel — community pricing</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upload receipts → see what others paid for the same job, same region, same vehicle. The give-to-get mechanic solves cold-start for price data and builds a compounding moat — consumer-sourced, not shop-sourced.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="bg-card border border-border rounded-xl px-5 py-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="text-sm font-medium text-foreground">Shop/dealer promotions</p>
                    <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded">Deliberately parked</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    There&apos;s an obvious revenue line in connecting shops to users who are due for service. It&apos;s parked. It recreates the exact conflict of interest the product exists to fix. If ever revisited: opt-in only, clearly labeled, structurally firewalled from any recommendation output. Reasoning about why <em>not</em> to take revenue is the judgment the product depends on.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Tradeoffs ── */}
          <section>
            <Reveal>
              <h2 className="text-base font-semibold text-foreground mb-1">Tradeoffs & risks</h2>
              <p className="text-sm text-muted-foreground mb-5">The honest version of a case study includes what could go wrong.</p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {[
                { risk: 'Accuracy is existential', detail: 'Wrong advice about a brake job is worse than no advice. Mitigation: conservative urgency framing, OEM schedule data as ground truth, clear "advisory, not diagnosis" language throughout.' },
                { risk: 'Cold start on pricing data', detail: 'Fair-price ranges need data before the community exists. Mitigation: seed from public estimator sources; community data refines over time.' },
                { risk: 'Engagement is inherently episodic', detail: 'People think about car maintenance a few times a year. Retention design must respect that — reminders + vault as the heartbeat — rather than manufacturing fake daily engagement.' },
                { risk: 'Willingness to pay is unproven', detail: 'Consumers say they distrust mechanics; whether they\'ll pay $7/mo to fix it is the core market risk. This is a hobby project — the honest framing is: this is the riskiest assumption.' },
                { risk: 'Liability surface', detail: 'Advice that intersects with safety and warranties needs careful language standards and probably legal review before anything is customer-facing.' },
              ].map(({ risk, detail }, i) => (
                <Reveal key={risk} delay={i * 60}>
                  <div className="bg-card border border-border rounded-xl px-5 py-4">
                    <p className="text-sm font-medium text-foreground mb-1">{risk}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Sources ── */}
          <section className="pb-8">
            <Reveal>
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
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </div>
    </main>
  )
}
