'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

// Built from the content brief at ~/Documents/Substack_PM_Case_Study_Content_Brief.md.
// Substack-flavored brand (white / near-black / #FF6719 accent) — external-audience
// deck, so it deliberately does not use the site's warm-editorial tokens, same
// precedent as churn-case keeping PayPal blue.
//
// REVIEW_TOOLS gates the reviewer-facing evidence-status layer (chips + toggle).
// Before Nick presents this live, flip to false and deploy — the toggle and every
// chip disappear from the page entirely. No per-user logic on purpose.
const REVIEW_TOOLS = true

const ORANGE = '#FF6719'
const INK = '#181818'

// ---------- review mode ----------

const ReviewCtx = createContext(false)

const FLAG_STYLES = {
  confirmed: { label: 'Confirmed', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  assumption: { label: 'Working assumption', cls: 'bg-amber-50 text-amber-700 border-amber-300' },
  unresolved: { label: 'Unresolved', cls: 'bg-red-50 text-red-700 border-red-300' },
} as const

function Flag({ kind, note }: { kind: keyof typeof FLAG_STYLES; note?: string }) {
  const on = useContext(ReviewCtx)
  if (!on) return null
  const s = FLAG_STYLES[kind]
  return (
    <span
      title={note}
      className={`inline-block align-middle ml-2 px-1.5 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${s.cls}`}
    >
      {s.label}
    </span>
  )
}

function Guardrail({ children }: { children: React.ReactNode }) {
  const on = useContext(ReviewCtx)
  if (!on) return null
  return (
    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span className="font-bold uppercase tracking-wide text-[11px] mr-2">Do not claim</span>
      {children}
    </div>
  )
}

// ---------- layout primitives ----------

function Spine({
  id,
  kicker,
  dark,
  children,
}: {
  id: string
  kicker?: string
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      data-slide-id={id}
      className={`relative min-h-[70vh] flex flex-col justify-center px-6 md:px-20 py-20 ${
        dark ? 'text-white' : 'bg-white'
      }`}
      style={dark ? { background: '#141414' } : { color: INK }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {kicker && (
          <p className="font-semibold tracking-[0.18em] uppercase text-xs mb-6" style={{ color: ORANGE }}>
            {kicker}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

function Rib({ branch, title, children }: { branch: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-10 rounded-xl border border-neutral-200 overflow-hidden" style={{ borderLeft: `4px solid ${ORANGE}` }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Appendix · {branch}
          </span>
          <span className="font-bold text-base" style={{ color: INK }}>
            {title}
          </span>
        </span>
        <span className="text-xl font-light shrink-0" style={{ color: ORANGE }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <div className="px-5 py-6 bg-white text-sm leading-relaxed text-neutral-700">{children}</div>}
    </div>
  )
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, seen }
}

// ---------- slide-specific data ----------

const SIX_QUESTIONS = [
  { q: 'Who should we prioritize?', signal: 'Current value and TPV concentration', decision: 'Expected economic impact' },
  { q: 'What is happening?', signal: 'Growth, stability, contraction, or churn', decision: 'Intervention timing' },
  { q: 'Why might it be happening?', signal: 'Pricing, risk, disputes, technical issues, seasonality', decision: 'Problem-specific treatment' },
  { q: 'Can we change it?', signal: 'Addressability and ability to act', decision: 'Avoid waste and false positives' },
  { q: 'How should we help?', signal: 'Business profile and mindset', decision: 'Relevant value proposition' },
  { q: 'Where should it appear?', signal: 'Direct merchant or partner channel', decision: 'Delivery and ownership model' },
]

const TRAJECTORIES = [
  'Churn',
  'Extreme contraction',
  'Contraction',
  'Minor contraction',
  'Minor growth',
  'Growth',
  'Extreme growth',
  'Reactivation / new',
]

const STAGES = [
  { name: 'Concierge MVP', cohort: '2,000', how: 'Phone outreach, manual offer', rate: 5 },
  { name: 'Product-assisted MVP', cohort: '20,000', how: 'In-product experience, manually batched fulfillment', rate: 10 },
  { name: 'Automated platform', cohort: '100,000', how: 'Automated eligibility, acceptance, and pricing fulfillment', rate: 17 },
]

const FINDINGS = [
  { label: 'Clearly positive reaction to the offer', n: 15 },
  { label: 'Discussed their standing with PayPal', n: 13 },
  { label: 'No obvious mechanism for moving payment volume', n: 15 },
  { label: 'Showed clear active diversion to other processors', n: 2 },
]

const QUOTES = [
  '“It’s about time PayPal recognized my loyalty. Thank you.”',
  '“With an offer like this I’m less worried about moving my customers to Zelle and Venmo because of fees.”',
  '“It forces me to stay and feel appreciated…it really enforces my stay with you guys.”',
  '“Are these disputes going to lower my ranking in PayPal…are they going to see me as a problem customer?”',
]

const PROFILES = [
  { name: 'Scope-centric', pct: 34, note: 'Projects, consulting, freelance — invoices, scope, payment tracking, tax clarity' },
  { name: 'Orders-centric', pct: 29, note: 'Retail, ecommerce, social — checkout, inventory, integrations, disputes, conversion' },
  { name: 'Schedule-centric', pct: 16, note: 'Appointments, classes, services — booking, cash-flow predictability, customer management' },
  { name: 'Logistics-centric', pct: 10, note: 'Manufacturing, wholesale — reliability, reconciliation, streamlining operations' },
  { name: 'Mixed', pct: 11, note: 'Combinations of the above' },
]

const FAMILIES = [
  {
    name: 'Economic recognition',
    examples: 'Volume-based tiers, earn-back rebates, adoption incentives, bundle discounts, milestone pricing',
    fit: 'Growth-oriented order/logistics merchants able to route volume',
  },
  {
    name: 'Protection & trust',
    examples: 'Covered disputes for good standing, faster risk review, reduced hold friction, proactive fraud insight',
    fit: 'HV/EHV merchants declining after dispute or risk shocks',
  },
  {
    name: 'Operational confidence',
    examples: 'Integration-health monitoring, priority support, faster payouts, invoicing/tax/reconciliation tools',
    fit: 'Stability-minded scope and schedule merchants, long tenure',
  },
  {
    name: 'Growth enablement',
    examples: 'BNPL insights, Working Capital, AI assistant, Invoicing+, catalog & payment links, Ads, integrations',
    fit: 'Growth-mindset, high-potential, multi-product merchants',
  },
  {
    name: 'Recognition & progress',
    examples: 'Good-standing status, progress to next benefit, business-impact summary, beta access, value framing',
    fit: 'Every segment — the connective tissue across the portfolio',
  },
]

const DIVES = [
  {
    tab: 'Pricing & bundles',
    hmw: 'How might we reward merchants for deepening their PayPal relationship while helping them reach their next growth milestone?',
    target: 'Growth-oriented order/logistics merchants using one product deeply, with clear adjacent-product potential.',
    treatment:
      'Temporary 25bps incentive for adopting an additional capability; volume milestones unlocking preferred pricing; bundles built on complementary products, not raw product count.',
    results: [
      { text: '~20% relative lift in second-product activation', kind: 'assumption' as const },
      { text: '~6–8% incremental TPV over 90 days', kind: 'assumption' as const },
    ],
    learning: 'Incentives worked best when they unlocked a visible business outcome, not when they rewarded product count alone.',
  },
  {
    tab: 'Dispute protection',
    hmw: 'How might we recognize good-standing merchants by absorbing specific shocks that threaten an otherwise healthy relationship?',
    target: 'HV/EHV orders and logistics merchants with strong tenure and standing, declining after dispute losses.',
    treatment:
      'PayPal covered selected lost disputes, with guardrails on tenure, fraud, dispute-loss rate, reason code, history, duration, and amount. Proactive reporting made the protection visible.',
    results: [
      { text: '+8pp 90-day TPV retention vs. holdout', kind: 'assumption' as const },
      { text: '15–20% fewer eligible merchants entered extreme contraction', kind: 'assumption' as const },
      { text: '~2× contribution-margin return relative to covered losses', kind: 'assumption' as const },
    ],
    learning: 'Loyalty benefits were most powerful when they resolved a concrete moment where a good merchant felt unfairly treated.',
  },
  {
    tab: 'Value communication',
    hmw: 'How might we make PayPal’s value as legible as its fees?',
    target: 'Scope/schedule-centric, stability-minded, high-tenure merchants — fee-sensitive but with limited ability to reroute volume.',
    treatment:
      'Instead of only “you paid $X,” show what the spend delivered: uptime, fraud prevented, disputes resolved, BNPL-associated AOV, payout performance, analytics, tax support, consumer trust.',
    results: [
      { text: '~2× engagement with benefit-detail content', kind: 'assumption' as const },
      { text: '~10–15% lift in relevant product exploration', kind: 'assumption' as const },
      { text: 'No statistically meaningful immediate TPV movement', kind: 'assumption' as const },
    ],
    learning: 'Relationship treatments can create value without immediate transaction movement — but they need different success metrics.',
  },
]

// ---------- interactive pieces ----------

function DeclineSplit() {
  const { ref, seen } = useInView()
  return (
    <div ref={ref} className="mt-10">
      <p className="text-sm text-neutral-400 mb-3">
        Share of the erased-TPV pool
        <Flag kind="assumption" note="~95% decline vs terminal churn is a working interpretation of the supplied visual" />
      </p>
      <div className="flex h-16 rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-center text-sm font-bold text-black transition-all duration-1000 ease-out"
          style={{ width: seen ? '95%' : '0%', background: ORANGE }}
        >
          ~95% gradual decline — merchants still active
        </div>
        <div className="flex-1 flex items-center justify-center text-xs font-semibold bg-neutral-700 text-neutral-300">
          churn
        </div>
      </div>
      <p className="mt-3 text-sm text-neutral-400">
        Pure 12-month-zero-volume churn was the small slice. The rest was contraction — happening while the relationship
        was still recoverable.
      </p>
    </div>
  )
}

function StageLadder() {
  return (
    <div className="grid md:grid-cols-3 gap-5 mt-10">
      {STAGES.map((s, i) => (
        <div key={s.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Stage {i + 1}</p>
          <h3 className="font-bold text-lg mt-1">{s.name}</h3>
          <p className="text-sm text-neutral-500 mt-2 flex-1">{s.how}</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-xs text-neutral-500">cohort</p>
              <p className="font-bold text-xl">{s.cohort}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">opt-in</p>
              <p className="font-black text-4xl" style={{ color: ORANGE }}>
                {s.rate}%
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-neutral-200">
            <div className="h-2 rounded-full" style={{ width: `${(s.rate / 20) * 100}%`, background: ORANGE }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function InterviewGrid() {
  const [active, setActive] = useState(0)
  const f = FINDINGS[active]
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center mt-10">
      <div>
        <div className="grid grid-cols-5 gap-3 max-w-xs">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-full transition-colors duration-300"
              style={{ background: i < f.n ? ORANGE : '#e5e5e5' }}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          <strong style={{ color: INK }}>{f.n} of 20</strong> merchants interviewed — {f.label.toLowerCase()}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {FINDINGS.map((x, i) => (
          <button
            key={x.label}
            type="button"
            onClick={() => setActive(i)}
            className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
              i === active ? 'border-transparent text-black font-semibold' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
            }`}
            style={i === active ? { background: '#FFF1EA', borderColor: ORANGE } : undefined}
          >
            <span className="font-bold mr-2" style={{ color: ORANGE }}>
              {x.n}/20
            </span>
            {x.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function UpstreamBars() {
  const { ref, seen } = useInView()
  const rows = [
    { label: 'Treated high-potential merchants', pct: 22, hot: true },
    { label: 'Control', pct: 12, hot: false },
  ]
  return (
    <div ref={ref} className="mt-8 space-y-4 max-w-2xl">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-600">{r.label}</span>
            <span className="font-bold">{r.pct}%</span>
          </div>
          <div className="h-5 rounded bg-neutral-100">
            <div
              className="h-5 rounded transition-all duration-1000 ease-out"
              style={{ width: seen ? `${r.pct * 3}%` : '0%', background: r.hot ? ORANGE : '#a3a3a3' }}
            />
          </div>
        </div>
      ))}
      <p className="text-sm text-neutral-500">
        Reached EHV/HV criteria within 180 days — roughly 1.8×.
        <Flag kind="assumption" note="Working assumption; depends on timeline validation (March 2025 vs 2026 start)" />
      </p>
    </div>
  )
}

function DeepDives() {
  const [tab, setTab] = useState(0)
  const d = DIVES[tab]
  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2">
        {DIVES.map((x, i) => (
          <button
            key={x.tab}
            type="button"
            onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              i === tab ? 'text-white border-transparent' : 'border-neutral-300 text-neutral-600 hover:border-neutral-500'
            }`}
            style={i === tab ? { background: INK } : undefined}
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-neutral-200 p-8">
        <p className="font-semibold text-lg leading-snug" style={{ color: ORANGE }}>
          {d.hmw}
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-6 text-sm leading-relaxed text-neutral-700">
          <div>
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Who</p>
            <p>{d.target}</p>
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2 mt-5">Treatment</p>
            <p>{d.treatment}</p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Working results</p>
            <ul className="space-y-2">
              {d.results.map((r) => (
                <li key={r.text} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
                  <span>
                    {r.text}
                    <Flag kind={r.kind} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg bg-neutral-50 border border-neutral-200 px-4 py-3">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-1">Learning</p>
              <p className="italic">{d.learning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- main ----------

export default function SubstackCaseContent() {
  const [review, setReview] = useState(false)

  return (
    <ReviewCtx.Provider value={review}>
      <main className="font-sans" style={{ color: INK }}>
        {/* 1 — title */}
        <Spine id="title" kicker="Nick Omori · Senior Product Manager — Technical, PayPal">
          <h1 className="font-black tracking-tight leading-[0.95] text-4xl md:text-7xl max-w-4xl">
            Building PayPal&apos;s Merchant Trajectory System
          </h1>
          <p className="mt-8 text-xl md:text-2xl max-w-3xl text-neutral-600">
            How we turned reactive churn prevention into a segmented merchant-success platform.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-500">Reactive churn prevention</span>
            <span style={{ color: ORANGE }}>→</span>
            <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-500">Segmented loyalty strategy</span>
            <span style={{ color: ORANGE }}>→</span>
            <span className="px-3 py-1.5 rounded-full text-white" style={{ background: INK }}>
              Proactive merchant-success platform
            </span>
          </div>
          <p className="mt-10 text-base text-neutral-500 max-w-2xl">
            The most important part of this story: our first experiment worked — but not for the reason we expected. That
            changed the strategy.
          </p>
        </Spine>

        {/* 2 — mandate */}
        <Spine id="mandate" kicker="Context & mandate">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            My mandate covered the merchant lifecycle across direct and partner experiences.
          </h2>
          <ul className="mt-8 space-y-4 text-lg text-neutral-700 max-w-3xl">
            <li className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
              Product and portfolio lead for merchant lifecycle: activation, growth, retention, and win-back.
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
              Owned homepage, notifications, lifecycle surfaces, navigation and IA, and the Partner Portal experience.
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
              Led the cross-functional decline program — Data Science and platform teams owned their specialized systems.
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
              Secured sponsorship from a director and a commercial VP to align dependencies.
            </li>
          </ul>
          <p className="mt-8 text-base text-neutral-500 max-w-3xl">
            I chose to begin with retention: mature and declining merchants gave us the richest evidence about what
            durable value looked like.
          </p>
        </Spine>

        {/* 3 — reframing */}
        <Spine id="reframing" kicker="Problem reframing" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            By the time a merchant churned, most of the damage had already happened.
          </h2>
          <div className="mt-10 flex items-end gap-4">
            <p className="font-black text-6xl md:text-8xl">
              $33<span style={{ color: ORANGE }}>B</span>
            </p>
            <p className="text-neutral-400 mb-3 max-w-xs text-sm">
              in annual TPV erased through churn and decline
              <Flag kind="confirmed" note="Confirmed from supplied materials; exact definition still to be reconciled" />
            </p>
          </div>
          <DeclineSplit />
          <p className="mt-10 text-lg md:text-xl max-w-3xl text-neutral-300">
            We shifted the operating question from{' '}
            <em className="text-neutral-500 not-italic line-through">“Why did this merchant leave?”</em> to{' '}
            <strong className="text-white">
              “Which merchants are entering a preventable negative trajectory — and what can we do while they are still
              active?”
            </strong>
          </p>
          <Guardrail>That all $33B was recoverable. The pool sizes the problem, not the addressable opportunity.</Guardrail>
        </Spine>

        {/* 4 — segmentation */}
        <Spine id="segmentation" kicker="Opportunity segmentation">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            The same outcome hid several different customer problems.
          </h2>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Six questions turned one undifferentiated pool into a decision system:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                  <th className="py-3 pr-4 font-semibold">Question</th>
                  <th className="py-3 pr-4 font-semibold">Signal</th>
                  <th className="py-3 font-semibold">Decision enabled</th>
                </tr>
              </thead>
              <tbody>
                {SIX_QUESTIONS.map((r) => (
                  <tr key={r.q} className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-bold whitespace-nowrap">{r.q}</td>
                    <td className="py-3 pr-4 text-neutral-600">{r.signal}</td>
                    <td className="py-3 text-neutral-600">{r.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              ['70%+', 'of contraction concentrated in HV/EHV merchants'],
              ['85 / 15', 'of branded-checkout TPV came from ~15% of merchants'],
              ['65%', 'of decline drag concentrated in three major markets'],
            ].map(([num, note]) => (
              <div key={note} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="font-black text-3xl" style={{ color: ORANGE }}>
                  {num}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {TRAJECTORIES.map((t, i) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={
                  i < 4
                    ? { borderColor: ORANGE, color: ORANGE, background: '#FFF6F1' }
                    : { borderColor: '#d4d4d4', color: '#737373' }
                }
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-8 text-xl font-bold max-w-3xl">
            Value told us <span style={{ color: ORANGE }}>who</span>. Trajectory told us{' '}
            <span style={{ color: ORANGE }}>when</span>. Cause told us <span style={{ color: ORANGE }}>why</span>.
            Research eventually told us <span style={{ color: ORANGE }}>how</span>.
          </p>
          <Rib branch="Branch B" title="Churn-model mechanics — how detection actually worked">
            <div className="space-y-4">
              <p>
                Tree-based classifier over an initial population of ~403,000 merchants, consolidating five previously
                fragmented models into one, feeding lifecycle and in-product surfaces. Performance:{' '}
                <strong>~89% recall, ~62% precision</strong>.
              </p>
              <p>
                <strong>The product judgment:</strong> high recall was useful for detection but 62% precision was not
                good enough for expensive treatment. So treatment decisioning was layered over model output:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Lower-confidence risk → low-cost education, value communication, or a research invitation.</li>
                <li>Moderate-confidence, addressable risk → feature guidance or product-specific treatment.</li>
                <li>High-confidence, high-value, addressable risk → pricing, protection, or higher-touch support.</li>
                <li>Non-addressable decline → suppress expensive treatment; collect learning where useful.</li>
              </ul>
              <p className="text-neutral-500">
                Data Science owned model development and modification; the program shaped what the model needed to
                answer and how its output was allowed to trigger spend.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* 5 — pricing first */}
        <Spine id="pricing-first" kicker="First decision">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Pricing was our fastest test of whether PayPal could change a merchant&apos;s trajectory.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-neutral-200 p-7">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">Why pricing first</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>Large estimated opportunity, highly salient customer pain.</li>
                <li>Existing platform infrastructure could be repurposed.</li>
                <li>A reversible pilot could cap margin risk.</li>
                <li>Gave us a reason to re-engage merchants and learn directly from them.</li>
              </ul>
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3 mt-6">The offer</p>
              <p className="text-sm text-neutral-700">
                Lower pricing on branded checkout (and BNPL where relevant) for merchants paying headline rates —
                roughly 15/25/35/45bps off based on volume. Accepted pricing was ongoing, not a temporary coupon.
              </p>
            </div>
            <div className="rounded-2xl p-7 text-white" style={{ background: '#141414' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ORANGE }}>
                The conflict
              </p>
              <p className="text-sm text-neutral-300">
                Pricing Strategy and business GMs pushed back: margin was the most important business metric, a discount
                might subsidize merchants who would stay anyway, and product-led pricing risked inconsistency with
                negotiated enterprise contracts.
              </p>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-3 mt-6" style={{ color: ORANGE }}>
                How alignment was earned
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-300 list-disc pl-5">
                <li>Narrow eligibility via merchant scoring</li>
                <li>Reversible 2,000-merchant calling experiment first</li>
                <li>Control and comparison populations preserved</li>
                <li>Adoption and trajectory evidence before automation investment</li>
                <li>Director + commercial VP sponsorship for dependencies</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 text-2xl md:text-3xl font-black max-w-3xl">
            We earned permission to scale by <span style={{ color: ORANGE }}>reducing the cost of being wrong</span>.
          </p>
        </Spine>

        {/* 6 — productization */}
        <Spine id="productization" kicker="0→1 productization">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            We moved from phone validation to an automated product experience.
          </h2>
          <p className="mt-4 text-neutral-500">
            Eligible population: ~300,000 merchants.
            <Flag kind="confirmed" />
          </p>
          <StageLadder />
          <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-lg text-neutral-700">
                Early experiments were associated with roughly{' '}
                <strong>$100M recovered TPV and $2M added margin</strong>
                <Flag kind="unresolved" note="Confirmed as recollection; calculation and counterfactual method unresolved" />
                , and the broader program with ~5× that TPV impact and ~$10–12M incremental margin/revenue.
                <Flag kind="assumption" />
              </p>
              <Guardrail>
                “30% of merchants were rescued” (likely a contraction threshold, not a result) — or that opt-in alone
                proved pricing changed behavior, or that observed TPV was automatically incremental.
              </Guardrail>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">
                How we kept ourselves honest — four outcome groups
              </p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>
                  <strong>Rescued</strong> — declining before, stabilized or recovered after.
                </li>
                <li>
                  <strong>Lost cause</strong> — declining before, kept declining.
                </li>
                <li>
                  <strong>Star</strong> — already growing, kept growing. Not our win.
                </li>
                <li>
                  <strong>Declining anyway</strong> — stable before, declined after.
                </li>
              </ul>
            </div>
          </div>
          <Rib branch="Branch C" title="Pricing-experiment mechanics — eligibility, controls, economics">
            <div className="space-y-4">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Eligibility:</strong> merchants paying headline rates, scored for value and decline risk;
                  narrow at first by design.
                </li>
                <li>
                  <strong>Offer economics:</strong> ~15/25/35/45bps reductions tiered by volume; early acceptance window
                  ~3 months, tightened to ~60 days in the automated version; accepted pricing was ongoing.
                </li>
                <li>
                  <strong>Controls:</strong> comparison populations preserved at each stage so recovered TPV could be
                  read against a counterfactual rather than raw before/after.
                </li>
                <li>
                  <strong>Manual → automated:</strong> Pricing Operations fulfilled changes by hand for the 2K and 20K
                  cohorts; that validated the workflow and earned the automation investment for the 100K stage
                  (eligibility, acceptance, and fulfillment all product-led).
                </li>
                <li>
                  <strong>Outcome taxonomy:</strong> the rescued / lost-cause / star / declining-anyway groups above,
                  to separate treatment effect from momentum.
                </li>
              </ul>
              <p className="text-neutral-500">
                Open items flagged for validation: exact opt-in definition (click vs. terms acceptance vs. completed
                pricing change), and whether the $2M margin figure is net of the discount.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* 7 — research pivot */}
        <Spine id="research-pivot" kicker="The pivot" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The offer landed well — but not because most merchants were actively leaving.
          </h2>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            We expected: merchants divert volume because pricing is uncompetitive; a discount brings it back. Twenty
            moderated 1:1 interviews said otherwise.
          </p>
          <div className="text-black rounded-2xl bg-white p-8 mt-10">
            <InterviewGrid />
          </div>
          <p className="mt-10 text-xl md:text-2xl max-w-3xl font-bold">
            The offer worked more clearly as a <span style={{ color: ORANGE }}>relationship builder</span> than as a
            countermeasure to diverted payments.
          </p>
          <p className="mt-6 text-neutral-400 max-w-3xl text-base">
            The interviews didn&apos;t invalidate the business result — they changed our interpretation and improved our
            targeting. The right response was to triangulate the evidence and redesign the program around a more
            accurate theory of value.
          </p>
          <Rib branch="Branch D" title="Research methodology — how we avoided leading the witness">
            <div className="space-y-4 text-neutral-700">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Twenty 1:1 moderated interviews, positioned broadly as a UX and offer review to avoid priming a
                  retention explanation.
                </li>
                <li>
                  Participants walked through their business, PayPal history, reaction to the offer, and future payment
                  decisions.
                </li>
                <li>Deliberate mix of scope-, schedule-, logistics-, and order-centric businesses.</li>
                <li>
                  Limitations owned openly: n=20 is a mechanism-finding sample, not an effect-size estimate; recruiting
                  from offer recipients skews toward engaged merchants.
                </li>
              </ul>
              <p>
                <strong>“Why not stop the program once the mechanism was challenged?”</strong> Because the causal
                evidence and the qualitative evidence answer different questions. Experiments told us the intervention
                moved outcomes; research told us why — and the why redirected the next dollar of investment, not the
                existing result.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* 8 — merchant voice */}
        <Spine id="merchant-voice" kicker="Merchant voice">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            Merchants wanted PayPal to recognize what they had built.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {QUOTES.map((q) => (
              <blockquote
                key={q}
                className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 text-lg leading-snug font-medium"
                style={{ borderLeft: `4px solid ${ORANGE}` }}
              >
                {q}
              </blockquote>
            ))}
          </div>
          <div className="mt-12 rounded-2xl p-8 text-white" style={{ background: '#141414' }}>
            <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ORANGE }}>
              The new product question
            </p>
            <p className="text-xl md:text-2xl font-bold leading-snug">
              How might we help merchants understand where they stand with PayPal, recognize the value they&apos;ve
              built, and receive benefits that reflect what their businesses actually need?
            </p>
          </div>
        </Spine>

        {/* 9 — richer segmentation */}
        <Spine id="profiles" kicker="Richer segmentation">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            Equal TPV did not mean equal needs.
          </h2>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Two merchants can be down 25% year-over-year with identical TPV — one an ecommerce business fighting
            disputes and integration health, the other a consultant who cares about invoicing and payout
            predictability. A single save offer would be both wasteful and impersonal.
          </p>
          <div className="mt-10 space-y-4 max-w-3xl">
            {PROFILES.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-sm">{p.name}</span>
                  <span className="text-sm font-black" style={{ color: ORANGE }}>
                    {p.pct}%
                  </span>
                </div>
                <div className="h-3 rounded bg-neutral-100 mb-1">
                  <div className="h-3 rounded" style={{ width: `${p.pct * 2.5}%`, background: ORANGE, opacity: 0.85 }} />
                </div>
                <p className="text-xs text-neutral-500">{p.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-3xl">
            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="font-bold">
                Growth mindset — <span className="font-medium text-neutral-500">“How can I make this work?”</span>
              </p>
              <p className="text-sm text-neutral-600 mt-2">Seeks customers, funding, new channels, expansion.</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="font-bold">
                Stability mindset —{' '}
                <span className="font-medium text-neutral-500">“How can I maintain business as usual?”</span>
              </p>
              <p className="text-sm text-neutral-600 mt-2">Seeks autonomy, reliability, continuity, less disruption.</p>
            </div>
          </div>
        </Spine>

        {/* 10 — treatment families */}
        <Spine id="treatments" kicker="Differentiated treatments">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            We matched existing PayPal capabilities to different definitions of merchant value.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FAMILIES.map((f, i) => (
              <div key={f.name} className="rounded-2xl border border-neutral-200 p-6 flex flex-col">
                <p className="font-black text-2xl mb-2" style={{ color: ORANGE }}>
                  {i + 1}
                </p>
                <h3 className="font-bold text-lg">{f.name}</h3>
                <p className="text-sm text-neutral-600 mt-2 flex-1">{f.examples}</p>
                <p className="text-xs text-neutral-400 mt-4 pt-3 border-t border-neutral-100">
                  <span className="font-semibold uppercase tracking-wide">Best fit · </span>
                  {f.fit}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-lg md:text-xl max-w-3xl text-neutral-700">
            We did not need to build every benefit from scratch. The 0→1 work was the{' '}
            <strong>intelligence, eligibility, orchestration, and lifecycle experience</strong> that made existing
            capabilities feel personalized and coherent.
          </p>
        </Spine>

        {/* 11 — deep dives */}
        <Spine id="deep-dives" kicker="Three treatments, three definitions of success">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The best treatment depended on both the problem and the merchant&apos;s ability to act.
          </h2>
          <DeepDives />
        </Spine>

        {/* 12 — upstream */}
        <Spine id="upstream" kicker="Move upstream" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Retention became a value-discovery engine for the first 90 days.
          </h2>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            Why wait for durable-value signals to weaken before acting on them? We inverted the decline model into a{' '}
            <strong className="text-white">High-Potential Merchant Score</strong>
            <Flag kind="assumption" note="~600K newly active merchants scored annually; treatment from days 14–30 — working assumptions" />{' '}
            and moved the treatments we trusted into the first 90 days: relevant volume milestones, profile-based
            bundles, integration-health monitoring, Working Capital qualification, progress and standing communication.
          </p>
          <div className="rounded-2xl bg-white text-black p-8 mt-10">
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">
              Reached EHV/HV within 180 days
            </p>
            <UpstreamBars />
          </div>
          <p className="mt-8 text-base text-neutral-400 max-w-3xl">
            One nuance we caught: orders/logistics merchants hit TPV thresholds faster, while scope/schedule merchants
            grew slower but showed strong retention and product depth. A purely monetary definition of “high potential”
            risked undervaluing durable service businesses.
          </p>
          <p className="mt-8 text-xl md:text-2xl font-bold max-w-3xl">
            Activation, retention, and win-back were different moments in{' '}
            <span style={{ color: ORANGE }}>the same value system</span>.
          </p>
        </Spine>

        {/* 13 — partner reuse */}
        <Spine id="partner" kicker="Partner reuse">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            We separated reusable merchant intelligence from channel-specific delivery.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7 text-white" style={{ background: '#141414' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-4" style={{ color: ORANGE }}>
                Shared platform — reused as-is
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-300 list-disc pl-5">
                <li>Model service and merchant scoring</li>
                <li>Segment assignment</li>
                <li>Eligibility rules</li>
                <li>Offer configuration</li>
                <li>Pricing fulfillment</li>
                <li>Measurement</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-7">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-4">
                Channel-specific — rebuilt per partner
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-700 list-disc pl-5">
                <li>Merchant identity mapping</li>
                <li>Consent and data availability</li>
                <li>Branding and language</li>
                <li>Partner economics</li>
                <li>Delivery channel</li>
                <li>Support and sales escalation</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex items-end gap-4">
            <p className="font-black text-6xl md:text-7xl">
              10<span style={{ color: ORANGE }}>%</span>
            </p>
            <p className="text-neutral-500 mb-2 max-w-sm text-sm">
              of partners adopted within three months
              <Flag kind="confirmed" note="Denominator and definition of adoption still to be confirmed" />
              — and many used our intelligence while designing their own interventions.
            </p>
          </div>
          <p className="mt-8 text-lg md:text-xl max-w-3xl text-neutral-700">
            The intelligence layer was more broadly reusable than the pricing treatment. That validated the decision to{' '}
            <strong>separate detection from delivery</strong>.
          </p>
          <Rib branch="Branch H" title="Partner architecture — what flowed where, and what adoption looked like">
            <div className="space-y-4">
              <p>
                Platform partners distribute PayPal to their own merchant bases; those merchants may never touch
                PayPal&apos;s direct surfaces but exhibit the same risk, potential, and value signals. Partners
                received: risk/potential band, leading reason codes, eligibility decision, recommended next action,
                merchant lists via dashboard/export, basic campaign configuration with their own branding and CTA, and
                outcome reporting.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Participating partners reached ~2× more at-risk merchants than through prior manual identification.
                  <Flag kind="assumption" />
                </li>
                <li>
                  Partner pricing campaigns achieved low-double-digit merchant acceptance.
                  <Flag kind="assumption" />
                </li>
                <li>
                  Intelligence-only adoption exceeded full-campaign adoption — many partners were hesitant to run
                  proactive pricing but exported the signals into their own interventions.
                  <Flag kind="assumption" note="Consistent with supplied behavior" />
                </li>
              </ul>
              <p className="text-neutral-500">
                Honest open questions: entity-grain mapping across partner merchant accounts, model confidence
                degradation on sparser partner data, and whether exported intelligence is a platform win or a loss of
                product control.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* 14 — impact */}
        <Spine id="impact" kicker="Impact synthesis">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The program created value at three levels.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-4">Outcomes</p>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li>
                  Opt-in <strong>5% → 17%</strong> from calls to automation
                  <Flag kind="confirmed" />
                </li>
                <li>
                  ~$100M recovered TPV, ~$2M margin in early cohorts
                  <Flag kind="unresolved" note="Recollection; calculation unresolved" />
                </li>
                <li>
                  ~$500M protected/recovered TPV, ~$10–12M margin across the portfolio
                  <Flag kind="assumption" />
                </li>
                <li>
                  ~10% partner adoption in three months
                  <Flag kind="confirmed" />
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-4">Strategic learning</p>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li>Decline is a trajectory, not a binary churn event.</li>
                <li>Pricing is an economic lever <em>and</em> a relationship signal.</li>
                <li>Standing, trust, and recognition are product surface area.</li>
                <li>Segment by need, trajectory, and ability to act — not only size.</li>
                <li>Retention reveals durable value worth moving upstream.</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 text-white" style={{ background: '#141414' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-4" style={{ color: ORANGE }}>
                Platform leverage
              </p>
              <ul className="space-y-3 text-sm text-neutral-300">
                <li>One intelligence layer.</li>
                <li>Multiple treatment families.</li>
                <li>Direct, enterprise, and partner delivery experiences.</li>
                <li>Shared learning across channels and lifecycle stages.</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 text-2xl md:text-3xl font-black max-w-4xl">
            The final product was not a discount. It was a system connecting{' '}
            <span style={{ color: ORANGE }}>
              intelligence, segmentation, eligibility, treatment, delivery, and measurement
            </span>
            .
          </p>
        </Spine>

        {/* 15 — reflection + Substack bridge */}
        <Spine id="reflection" kicker="Reflection · and what I'd bring to Substack">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The best growth systems deliver the right value earlier — not merely more messages.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">What didn&apos;t work perfectly</p>
              <ul className="space-y-2 text-sm text-neutral-700 list-disc pl-5">
                <li>The initial model confused contraction with active switching.</li>
                <li>Pricing generated positive emotion without universal behavior change.</li>
                <li>Basis-point communication was genuinely hard to understand.</li>
                <li>Generic feature access risked feeling like a catalog, not personalization.</li>
                <li>A monetary-only definition of high potential undervalued service businesses.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">What I&apos;d do differently</p>
              <ul className="space-y-2 text-sm text-neutral-700 list-disc pl-5">
                <li>Generative research before the first broad pricing treatment.</li>
                <li>Instrument ability-to-act and share-of-wallet signals earlier.</li>
                <li>Separate metrics for economic recovery, relationship health, and engagement.</li>
                <li>Build channel-agnostic decisioning earlier.</li>
                <li>Define high-potential success using multiple forms of durable value.</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 rounded-2xl p-8 md:p-10 text-white" style={{ background: '#141414' }}>
            <p className="font-bold uppercase tracking-wide text-[11px] mb-5" style={{ color: ORANGE }}>
              The pattern I&apos;d bring to the Creator team
            </p>
            <ol className="space-y-3 text-base text-neutral-200 list-decimal pl-5 max-w-3xl">
              <li>Segment creators by trajectory and intent, not only current audience size.</li>
              <li>Retention and activation are connected — established creators reveal the durable value new creators should feel sooner.</li>
              <li>Enterprise publisher requests should inform reusable platform primitives, not fork the product.</li>
              <li>Pair causal evidence with customer understanding — experiments say whether, research says why.</li>
              <li>Progress and recognition are product capabilities, not marketing.</li>
            </ol>
            <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
              If you understand what makes your best customers successful, you can deliver that value earlier, intervene
              when it weakens, and scale the underlying capabilities across segments and channels{' '}
              <span style={{ color: ORANGE }}>without forcing everyone into identical experiences</span>.
            </p>
          </div>
        </Spine>

        {REVIEW_TOOLS && (
          <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
            {review && (
              <div className="rounded-lg bg-white border border-neutral-200 shadow-lg px-3 py-2 text-[11px] text-neutral-600 space-y-1">
                <p className="font-semibold text-neutral-800">Evidence status — pin comments on anything flagged</p>
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  Confirmed from source material
                </p>
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                  Working assumption — validate before presenting
                </p>
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5" />
                  Unresolved — could change the claim
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setReview(!review)}
              className={`rounded-full px-4 py-2 text-xs font-semibold border shadow-sm transition-colors ${
                review ? 'text-white border-transparent' : 'bg-white border-neutral-300 text-neutral-600 hover:border-neutral-500'
              }`}
              style={review ? { background: ORANGE } : undefined}
            >
              {review ? 'Review mode on' : 'Review mode'}
            </button>
          </div>
        )}
      </main>
    </ReviewCtx.Provider>
  )
}
