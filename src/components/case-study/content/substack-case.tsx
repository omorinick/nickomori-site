'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

// Built from the content brief at ~/Documents/Substack_PM_Case_Study_Content_Brief.md plus the
// artifact reconstruction ledger (see project memory: pricing-reconstruction-ledger.md).
// Substack-flavored brand (white / near-black / #FF6719 accent) — external-audience deck.
//
// Spatial grammar: vertical spine (S1–S12) with a HORIZONTAL deep-dive branch (B1–B8) between the
// wedge decision and the research turn. All working-process artifacts are sanitized recreations —
// no original board images, no absolute dates, no colleague names.
//
// REVIEW_TOOLS gates the reviewer-facing evidence-status layer (chips + toggle). Before Nick
// presents this live, flip to false and deploy — toggle and chips disappear entirely.
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

function Sticky({ children, tone = 'orange', className = '' }: { children: React.ReactNode; tone?: 'orange' | 'gray' | 'accent'; className?: string }) {
  const bg = tone === 'accent' ? '#FFE7DA' : tone === 'gray' ? '#f1efe9' : '#FFF3E4'
  return (
    <div
      className={`rounded-sm px-3 py-2.5 text-[13px] leading-snug shadow-sm ${className}`}
      style={{ background: bg, transform: 'rotate(-0.5deg)', border: tone === 'accent' ? `1px solid ${ORANGE}` : '1px solid rgba(0,0,0,0.06)' }}
    >
      {children}
    </div>
  )
}

// ---------- data ----------

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

const MONEY_MAP = [
  { name: 'Technical issues', amt: 3750, kind: 'addressable' as const, note: 'Failed flows, conversion and auth degradation' },
  { name: 'Pricing', amt: 3625, kind: 'addressable' as const, note: 'Headline-rate exposure, recent fee increases' },
  { name: 'Risk & limitations', amt: 1750, kind: 'addressable' as const, note: 'Holds, reserves, and limitations felt as punishment' },
  { name: 'Macro — bankruptcy, inactive, seasonal', amt: 942, kind: 'macro' as const, note: '~6% of contraction — not controllable by PayPal' },
  { name: 'Not yet attributed', amt: 5815, kind: 'untagged' as const, note: 'Shown honestly: the model was young and ~37% was still unexplained' },
]

const STAGES = [
  { name: 'Concierge MVP', cohort: '2,000', how: 'Phone outreach and manual offer — the pilot was also the research instrument', rate: 5 },
  { name: 'Product-assisted', cohort: '20,000', how: 'In-product experience, manually batched fulfillment', rate: 10 },
  { name: 'Automated platform', cohort: '100,000', how: 'Automated eligibility, acceptance, and pricing fulfillment', rate: 17 },
]

const FINDINGS = [
  { label: 'Clearly positive reaction to the offer', n: 15 },
  { label: 'Discussed their standing with PayPal', n: 13 },
  { label: 'No obvious mechanism for moving payment volume', n: 15 },
  { label: 'Showed clear active diversion to other processors', n: 2 },
]

const CLUSTERS = [
  { name: 'Value Realization', q: 'Do merchants understand what they actually get for what they pay?' },
  { name: 'Competitive Clarity', q: 'Do merchants know how we compare — and do we get a chance to compete?' },
  { name: 'Right Offer, Right Time', q: 'Are we reaching at-risk merchants fast enough with the right offer?' },
  { name: 'Transparency Without Backfire', q: 'How do we get honest about pricing without creating problems we didn’t have?' },
  { name: 'Relationship & Loyalty', q: 'Do merchants feel valued, or just transactional?', gap: true },
  { name: 'Channel & Persona Fit', q: 'Are we reaching merchants where they are, how they prefer?' },
  { name: 'System Integrity', q: 'How do we prevent gaming and protect the business?' },
]

const BETS = [
  { bet: 'Rate reduction for detected decliners — “we can MVP with humans”', triage: 'Must Have', votes: 2, fate: 'Selected — the wedge', hot: true },
  { bet: 'Full-funnel tracking: offer → acceptance → 30/60/90-day retention', triage: 'Must Have', votes: 1, fate: 'Built alongside the pilot' },
  { bet: 'Post-save follow-on: “You’ve saved $342 this month with your new rate”', triage: 'Must Have', votes: 0, fate: 'Paired with the offer' },
  { bet: 'Multi-product value report (fraud prevented, disputes won, hours saved)', triage: 'Must Have', votes: 2, fate: 'Sequenced later → value communication' },
  { bet: 'Peer rate comparison — “merchants your size typically pay…”', triage: 'Won’t Have', votes: 3, fate: 'Rejected despite votes — data confidence; invites comparison shopping', dead: true },
  { bet: 'Escalating offer ladders (10bps → 20bps → rep call)', triage: 'Won’t Have', votes: 0, fate: 'Rejected — “too easy to game”', dead: true },
  { bet: 'Early-warning preemption — “measuring pre-decliners”', triage: 'Won’t Have', votes: 0, fate: 'Deferred deliberately — later became the upstream program', dead: true },
]

const MATRIX = {
  cols: ['Proactive pricing', 'Tech issues', 'Risk / limitations', 'Value communication'],
  rows: [
    { c: 'Attributed pool', v: ['◐ ~$3.6B', '● ~$3.8B', '○ ~$1.8B', '○ cuts across'] },
    { c: 'Speed to first learning', v: ['● calls in weeks', '○ eng discovery', '○ policy change', '◐'] },
    { c: 'Manually testable', v: ['● MVP with humans', '○', '◐', '◐'] },
    { c: 'Reversible, capped exposure', v: ['● narrow + caps', '●', '◐ loss exposure', '●'] },
    { c: 'Cleanly measurable', v: ['● holdouts, margin', '◐ messy attribution', '◐', '○ survey-based'] },
    { c: 'Operational readiness', v: ['● pricing ops existed', '○ many teams', '○ risk org owns', '○ data not plumbed'] },
    { c: 'Margin / downside risk', v: ['◐ real concession cost', '● none', '◐', '●'] },
  ],
}

const FLOW_LAYERS = [
  { layer: 'Predictive signal', detail: 'Decline & churn detection · reason attribution · re-decline detection after a save', reused: true },
  { layer: 'Eligibility policy', detail: 'Value tier · supported geo/product · headline-rate status · tenure · exclusions: sales-managed contracts, unresolved holds', reused: true },
  { layer: 'Offer decisioning', detail: 'Offer tiering by volume · personalized savings calc · expiry · competitor-rate counter path (designed) · no escalation ladders', reused: true },
  { layer: 'Merchant experience', detail: 'Multi-channel reach → portal surfaces (pop-up, banner, card) → offer in dollars, not bps → accept / talk to a human', reused: false },
  { layer: 'Fulfillment', detail: 'Manual queue at pilot scale → batched → automated repricing, with rate-verification QA', reused: true },
  { layer: 'Measurement & learning', detail: 'Savings visibility · 30/60/90-day cohorts vs holdout · learning from rejectors and saved-but-churned', reused: true },
]

const QUADRANT = [
  { id: 'D1', label: 'Offer lands as recognition, not insult', x: 4, y: 5, dx: -0.12, dy: 0.14 },
  { id: 'V1', label: 'Merchants can actually respond', x: 4, y: 5, dx: 0.18, dy: -0.1, hero: true },
  { id: 'V2', label: 'Not subsidizing stayers', x: 4, y: 5, dx: -0.05, dy: -0.22 },
  { id: 'V4', label: 'Saves persist over time', x: 4, y: 5, dx: 0.3, dy: 0.18 },
  { id: 'U2', label: 'Terms understood', x: 4, y: 4, dx: 0, dy: 0 },
  { id: 'F2', label: 'Attribution separates pricing-driven decline', x: 4, y: 4, dx: 0.25, dy: -0.2 },
  { id: 'O1', label: 'Leadership permits the experiment', x: 3, y: 5, dx: 0, dy: 0 },
]

const FAMILIES = [
  { name: 'Economic recognition', note: 'Tiers, earn-backs, milestone pricing, bundles' },
  { name: 'Protection & trust', note: 'Covered disputes, faster risk review, fewer false-positive holds' },
  { name: 'Operational confidence', note: 'Integration health, priority support, invoicing & reconciliation' },
  { name: 'Growth enablement', note: 'BNPL, Working Capital, AI assistant, catalog, ads' },
  { name: 'Recognition & progress', note: 'Standing, progress to next benefit, value framing' },
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

const PROFILES = [
  { name: 'Scope-centric', pct: 34, note: 'Projects, consulting, freelance — invoices, scope, tax clarity' },
  { name: 'Orders-centric', pct: 29, note: 'Retail and ecommerce — checkout, inventory, disputes, conversion' },
  { name: 'Schedule-centric', pct: 16, note: 'Appointments and services — booking, cash-flow predictability' },
  { name: 'Logistics-centric', pct: 10, note: 'Manufacturing and wholesale — reliability, reconciliation' },
  { name: 'Mixed', pct: 11, note: 'Combinations of the above' },
]

const QUOTES = [
  '“It’s about time PayPal recognized my loyalty. Thank you.”',
  '“It forces me to stay and feel appreciated…it really enforces my stay with you guys.”',
  '“With an offer like this I’m less worried about moving my customers to Zelle and Venmo because of fees.”',
  '“Are these disputes going to lower my ranking in PayPal…are they going to see me as a problem customer?”',
]

const PRINCIPLES = [
  'Choose the first bet for learning-adjusted leverage — not for theoretical size.',
  'Use quantitative evidence to locate a problem and qualitative evidence to interpret it.',
  'In success-based business models, value realization and value perception are both product problems.',
  'Build shared intelligence and capabilities across lifecycle stages and channels.',
  'Scale the operating system, not only the winning treatment.',
]

// ---------- interactive pieces ----------

function MoneyMap() {
  const { ref, seen } = useInView()
  const max = 5815
  return (
    <div ref={ref} className="mt-10 space-y-3">
      {MONEY_MAP.map((r) => (
        <div key={r.name}>
          <div className="flex justify-between items-baseline mb-1 gap-4">
            <span className={`text-sm font-bold ${r.kind === 'addressable' ? '' : 'text-neutral-500'}`}>{r.name}</span>
            <span className="text-sm font-black whitespace-nowrap" style={{ color: r.kind === 'addressable' ? ORANGE : '#a3a3a3' }}>
              ~${(r.amt / 1000).toFixed(1)}B
            </span>
          </div>
          <div className="h-5 rounded bg-neutral-100 overflow-hidden">
            <div
              className="h-5 rounded transition-all duration-1000 ease-out"
              style={{
                width: seen ? `${(r.amt / max) * 100}%` : '0%',
                background:
                  r.kind === 'addressable'
                    ? ORANGE
                    : r.kind === 'macro'
                      ? '#a3a3a3'
                      : 'repeating-linear-gradient(45deg, #d4d4d4, #d4d4d4 6px, #efefef 6px, #efefef 12px)',
              }}
            />
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">{r.note}</p>
        </div>
      ))}
      <p className="text-sm text-neutral-500 pt-2">
        Annualized run-rate from a single-month contraction snapshot — ~$15.9B across the portfolio, ~87% of it in
        high-value and emerging-high-value merchants.
        <Flag kind="assumption" note="Naive ×12 annualization of one month; simplified from fuller churn+decline constructs — reconciliation in appendix" />
      </p>
    </div>
  )
}

function StageLadder() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {STAGES.map((s, i) => (
          <div key={s.name} className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col relative">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Stage {i + 1}</p>
            <h3 className="font-bold text-lg mt-1">{s.name}</h3>
            <p className="text-sm text-neutral-500 mt-2 flex-1">{s.how}</p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-neutral-500">cohort</p>
                <p className="font-bold text-xl">{s.cohort}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500">accepted &amp; repriced</p>
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
      <p className="mt-4 text-sm text-neutral-500">
        Each arrow between stages was a gate: evidence from the smaller stage bought investment in the next.
        “Opt-in” means accepted <em>and</em> repriced at every stage.
        <Flag kind="assumption" note="Definition per Nick's recollection — validate acceptance vs completed-repricing split against records" />
      </p>
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
        <Flag kind="assumption" note="Working assumption; validate cohort window and criteria" />
      </p>
    </div>
  )
}

function Quadrant() {
  const W = 460
  const H = 340
  const px = (x: number, dx: number) => 50 + ((x + dx - 1) / 4) * (W - 90)
  const py = (y: number, dy: number) => H - 45 - ((y + dy - 1) / 4) * (H - 80)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg" role="img" aria-label="Assumption priority quadrant">
      <rect x={50 + (W - 90) / 2} y={12} width={(W - 90) / 2} height={(H - 80) / 2 + 21} fill="#FFF1EA" rx={6} />
      <line x1={50} y1={H - 45} x2={W - 40} y2={H - 45} stroke="#d4d4d4" strokeWidth={1.5} />
      <line x1={50} y1={H - 45} x2={50} y2={12} stroke="#d4d4d4" strokeWidth={1.5} />
      <text x={(W + 10) / 2} y={H - 16} textAnchor="middle" fontSize={11} fill="#737373">
        Uncertainty → (poorly understood)
      </text>
      <text x={16} y={H / 2} textAnchor="middle" fontSize={11} fill="#737373" transform={`rotate(-90 16 ${H / 2})`}>
        Importance → (critical)
      </text>
      <text x={W - 46} y={26} textAnchor="end" fontSize={10} fontWeight={700} fill={ORANGE}>
        TEST FIRST
      </text>
      {QUADRANT.map((d) => (
        <g key={d.id}>
          <circle
            cx={px(d.x, d.dx)}
            cy={py(d.y, d.dy)}
            r={d.hero ? 9 : 6}
            fill={d.hero ? ORANGE : '#181818'}
            opacity={d.hero ? 1 : 0.75}
          />
          <text x={px(d.x, d.dx) + (d.hero ? 13 : 9)} y={py(d.y, d.dy) + 4} fontSize={10.5} fontWeight={d.hero ? 700 : 500} fill={d.hero ? ORANGE : '#404040'}>
            {d.id}
          </text>
        </g>
      ))}
    </svg>
  )
}

function DeepDives() {
  const [tab, setTab] = useState(0)
  const d = DIVES[tab]
  return (
    <div className="mt-4">
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
      <div className="mt-4 rounded-xl border border-neutral-200 p-6">
        <p className="font-semibold leading-snug" style={{ color: ORANGE }}>
          {d.hmw}
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-4 text-sm leading-relaxed text-neutral-700">
          <div>
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Who / Treatment</p>
            <p>{d.target}</p>
            <p className="mt-3">{d.treatment}</p>
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
            <p className="mt-4 italic text-neutral-600">{d.learning}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- the horizontal deep-dive branch ----------

function BranchPanel({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-full snap-start px-6 md:px-16 py-10 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1">
        <p className="font-black text-sm mb-1" style={{ color: ORANGE }}>
          {step}
        </p>
        <h3 className="font-extrabold tracking-tight text-2xl md:text-3xl mb-6">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function Branch() {
  const scroller = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const COUNT = 8

  const go = (i: number) => {
    const el = scroller.current
    if (!el) return
    const target = Math.max(0, Math.min(COUNT - 1, i))
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    setIdx(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section data-slide-id="pricing-branch" className="relative py-16" style={{ background: '#f4f1ec', color: INK }}>
      <div className="px-6 md:px-20 max-w-5xl mx-auto w-full">
        <p className="font-semibold tracking-[0.18em] uppercase text-xs" style={{ color: ORANGE }}>
          Inside the first bet · the working process
        </p>
        <p className="mt-2 text-sm text-neutral-500 max-w-2xl">
          Sanitized reconstruction of the working process; selected labels and groupings simplified for
          confidentiality and presentation clarity. Navigate left to right — this section reads sideways.
        </p>
      </div>

      <div className="mt-8 relative">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* B1 */}
          <BranchPanel step="B1 · Decompose" title="From distant outcomes to metrics a team can move">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
              <div className="space-y-2 text-sm">
                {[
                  ['Business outcome', 'Portfolio TPV decline — lagging, nobody’s roadmap moves it'],
                  ['Economic attribution', 'Contraction $ by value tier × geography × reason code'],
                  ['Problem spaces', 'Six ownable spaces + an honest “not yet attributed”'],
                  ['Problem indicators', 'Rule-based tags — exposure flags, not diagnoses'],
                  ['Controllable metrics', 'The funnel each team can move next sprint'],
                  ['Guardrails', 'Margin, gaming, support noise — what must not degrade'],
                ].map(([k, v], i) => (
                  <div key={k} className="flex gap-3 items-baseline">
                    <span className="font-black text-xs w-5 text-right shrink-0" style={{ color: ORANGE }}>
                      L{i}
                    </span>
                    <div>
                      <span className="font-bold">{k}.</span> <span className="text-neutral-600">{v}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-neutral-200 p-4">
                  <p className="font-bold text-sm mb-2">
                    Pricing — a <span style={{ color: ORANGE }}>perception</span> funnel
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    % who understand their fees → % who’ve seen the value behind them → % of eligible shown a
                    proactive offer → % actioned → time from decline signal to offer
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-neutral-200 p-4">
                  <p className="font-bold text-sm mb-2">
                    Risk — an <span style={{ color: ORANGE }}>operational</span> funnel
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    % of limitations surfaced in 24h → % actually seen → % acted on in 24/48/72h → % resolved before
                    account impact → % self-serve
                  </p>
                </div>
                <p className="sm:col-span-2 text-sm text-neutral-600">
                  Same method, structurally different problems — which is how several teams attacked one economic
                  problem in parallel without sharing a playbook.
                </p>
              </div>
            </div>
          </BranchPanel>

          {/* B2 */}
          <BranchPanel step="B2 · Diverge" title="Seven clusters, about forty candidate bets">
            <div className="flex flex-wrap gap-2 mb-6">
              {CLUSTERS.map((c) => (
                <div
                  key={c.name}
                  className="rounded-lg border px-3 py-2 max-w-[240px]"
                  style={c.gap ? { borderColor: ORANGE, background: '#FFF6F1' } : { borderColor: '#e5e5e5', background: 'white' }}
                >
                  <p className="font-bold text-xs">{c.name}</p>
                  <p className="text-[11px] text-neutral-500 leading-snug">{c.q}</p>
                  {c.gap && (
                    <p className="text-[11px] font-bold mt-1" style={{ color: ORANGE }}>
                      “Gap — no direct metric.” Remember this one.
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white border border-neutral-200 overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                    <th className="px-4 py-2 font-semibold">Candidate bet</th>
                    <th className="px-2 py-2 font-semibold whitespace-nowrap">Triage</th>
                    <th className="px-2 py-2 font-semibold">Votes</th>
                    <th className="px-4 py-2 font-semibold">Fate</th>
                  </tr>
                </thead>
                <tbody>
                  {BETS.map((b) => (
                    <tr key={b.bet} className={`border-b border-neutral-100 ${b.dead ? 'text-neutral-400' : ''}`} style={b.hot ? { background: '#FFF6F1' } : undefined}>
                      <td className={`px-4 py-2 ${b.hot ? 'font-bold' : ''}`}>{b.bet}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{b.triage}</td>
                      <td className="px-2 py-2 whitespace-nowrap tracking-tighter" style={{ color: ORANGE }}>
                        {'●'.repeat(b.votes) || '—'}
                      </td>
                      <td className="px-4 py-2">{b.fate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-base font-bold max-w-3xl">
              The most-voted idea never shipped; a two-vote idea shipped first.{' '}
              <span style={{ color: ORANGE }}>Votes located conviction — judgment did the sequencing.</span>
            </p>
          </BranchPanel>

          {/* B3 */}
          <BranchPanel step="B3 · Converge" title="The wedge decision — reasoning, reconstructed">
            <div className="rounded-xl bg-white border border-neutral-200 overflow-x-auto">
              <table className="w-full text-[13px] min-w-[560px]">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                    <th className="px-4 py-2 font-semibold"></th>
                    {MATRIX.cols.map((c, i) => (
                      <th key={c} className={`px-3 py-2 font-semibold ${i === 0 ? '' : 'text-neutral-400'}`} style={i === 0 ? { color: ORANGE } : undefined}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.rows.map((r) => (
                    <tr key={r.c} className="border-b border-neutral-100">
                      <td className="px-4 py-2 font-bold whitespace-nowrap">{r.c}</td>
                      {r.v.map((v, i) => (
                        <td key={i} className={`px-3 py-2 ${i === 0 ? 'font-semibold' : 'text-neutral-500'}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Tech issues were the larger pool with less downside — and still weren’t first. They ran as a parallel
              track; this table is the honest reasoning, reconstructed from the working record.
            </p>
            <p className="mt-5 text-lg md:text-xl font-black max-w-3xl">
              We didn’t choose pricing because we knew price caused decline. We chose it because it was the{' '}
              <span style={{ color: ORANGE }}>fastest reversible test</span> of whether proactive treatment could bend
              a declining merchant’s trajectory at all.
            </p>
          </BranchPanel>

          {/* B4 */}
          <BranchPanel step="B4 · Design" title="The flow, in separable layers">
            <div className="space-y-2">
              {FLOW_LAYERS.map((l, i) => (
                <div key={l.layer} className="rounded-lg bg-white border border-neutral-200 px-4 py-3 flex items-start gap-4">
                  <span className="font-black text-xs mt-0.5 w-4 shrink-0" style={{ color: ORANGE }}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {l.layer}
                      {l.reused && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: '#FFF1EA', color: ORANGE }}>
                          later reused
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-base font-bold max-w-3xl">
              The model told us <em>who</em> was declining. Policy decided who could <em>safely receive</em> a rate
              change. <span style={{ color: ORANGE }}>Separating those layers is why the system was reusable later.</span>
            </p>
          </BranchPanel>

          {/* B5 */}
          <BranchPanel step="B5 · De-risk" title="What had to be true — ~200 assumptions, five categories">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="space-y-2">
                  {[
                    ['Desirability', '“Merchants want to be recognized as valuable — not treated generically.”'],
                    ['Usability', '“Merchants won’t feel surveilled by us knowing they’re at risk.”'],
                    ['Feasibility', '“We can identify why they’re declining — pricing vs performance vs risk.”'],
                    ['Viability', '“We’re not lowering pricing for people who wouldn’t have churned.”'],
                    ['Legal & ethical', '“Personalized pricing doesn’t discriminate; urgency is truthful.”'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3 items-baseline">
                      <span className="font-bold text-xs uppercase tracking-wide w-24 shrink-0 text-neutral-400">{k}</span>
                      <Sticky className="flex-1">{v}</Sticky>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-3">
                  Mapped across the journey — reach, present, negotiate, reinforce — then ranked by importance ×
                  uncertainty. Scores are a reconstructed prioritization of the historical map.
                </p>
              </div>
              <div>
                <Quadrant />
                <div className="mt-3 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: ORANGE, background: '#FFF6F1' }}>
                  <strong style={{ color: ORANGE }}>V1 — the one we couldn’t test before launch:</strong> that targeted
                  merchants could <em>actually respond</em> to better economics. So research was bolted to the pilot
                  from day one.
                </div>
              </div>
            </div>
          </BranchPanel>

          {/* B6 */}
          <BranchPanel step="B6 · Plan the learning" title="Know before launch vs. learn only by launching">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl bg-white border border-neutral-200 p-5">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">Before launch</p>
                <ul className="text-sm space-y-2 text-neutral-700">
                  <li>
                    <strong>“Just Ask”</strong> — data teams, legal, engineering, marketing, pricing, commercial.
                    Consultation retired more risk than any spike; the formal-spike bucket sat nearly empty.
                  </li>
                  <li>Script + prototype comprehension testing (do the terms play back correctly?)</li>
                  <li>Targeting backtest; ops dry run; margin caps and holdout design as the price of permission</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white border border-neutral-200 p-5">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">Only by launching</p>
                <ul className="text-sm space-y-2 text-neutral-700">
                  <li>Whether the offer lands as recognition or desperation — reaction-coded calls</li>
                  <li>Whether we’re subsidizing stayers — treatment vs. holdout margin</li>
                  <li>Whether saves persist — 30/60/90-day cohorts</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 flex flex-col md:flex-row gap-4 items-start">
              <Sticky tone="accent" className="max-w-xs">
                <strong>From the actual plan:</strong> “If pricing wasn’t actually their primary concern, we’ll figure
                out what is.”
              </Sticky>
              <p className="text-sm text-neutral-600 flex-1">
                The pivot wasn’t luck — the plan pre-registered the possibility that the mechanism was wrong. And
                engineering deliberately <em>waited</em>: manual operations were the learning strategy, not a
                workaround. Gates: permission → concierge results → 20K results → automation.
              </p>
            </div>
          </BranchPanel>

          {/* B7 */}
          <BranchPanel step="B7 · Earn scale" title="Phone calls → product-assisted → automated">
            <StageLadder />
            <p className="mt-5 text-base font-bold max-w-3xl">
              Each stage’s evidence bought the next stage’s investment.{' '}
              <span style={{ color: ORANGE }}>Automation wasn’t delayed — it was withheld until earned.</span>
            </p>
          </BranchPanel>

          {/* B8 */}
          <BranchPanel step="B8 · Read the results honestly" title="What the numbers said — and didn’t">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-base text-neutral-700">
                  Early cohorts: roughly <strong>$100M in recovered TPV</strong>
                  <Flag kind="assumption" note="Recollection; counterfactual method to validate" /> and{' '}
                  <strong>~$2M net margin after discount cost</strong>
                  <Flag kind="assumption" note="Net-of-discount per Nick; measured against declining/plateauing baseline — method to validate" />{' '}
                  — growth from merchants who had been declining or plateauing, read against comparison groups.
                </p>
                <Guardrail>
                  That opt-in alone proved behavior change, or that observed TPV was automatically incremental.
                </Guardrail>
              </div>
              <div className="rounded-xl bg-white border border-neutral-200 p-5">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">
                  Four outcome groups kept us honest
                </p>
                <ul className="space-y-1.5 text-sm text-neutral-700">
                  <li><strong>Rescued</strong> — declining before, recovered after.</li>
                  <li><strong>Lost cause</strong> — declining before and after.</li>
                  <li><strong>Star</strong> — growing anyway. Not our win.</li>
                  <li><strong>Declining anyway</strong> — stable before, declined after.</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-lg md:text-xl font-black max-w-3xl">
              The numbers said: continue. They did not say <em>why</em> it was working —{' '}
              <span style={{ color: ORANGE }}>and we had planned for exactly that question.</span>
            </p>
          </BranchPanel>
        </div>

        {/* branch nav */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            className="w-9 h-9 rounded-full border border-neutral-300 bg-white font-bold disabled:opacity-30"
            aria-label="Previous panel"
          >
            ←
          </button>
          <div className="flex gap-2">
            {Array.from({ length: COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to panel ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{ background: i === idx ? ORANGE : '#d4d4d4' }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            disabled={idx === COUNT - 1}
            className="w-9 h-9 rounded-full border border-neutral-300 bg-white font-bold disabled:opacity-30"
            aria-label="Next panel"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

// ---------- main ----------

export default function SubstackCaseContent() {
  const [review, setReview] = useState(false)

  return (
    <ReviewCtx.Provider value={review}>
      <main className="font-sans" style={{ color: INK }}>
        {/* S1 — title */}
        <Spine id="title" kicker="Nick Omori · Senior Product Manager — Technical, PayPal">
          <h1 className="font-black tracking-tight leading-[0.95] text-4xl md:text-7xl max-w-4xl">
            Building PayPal&apos;s Merchant Trajectory System
          </h1>
          <p className="mt-8 text-xl md:text-2xl max-w-3xl text-neutral-600">
            How we turned reactive churn prevention into a segmented merchant-success platform.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">Pricing was the wedge</span>
            <span style={{ color: ORANGE }}>→</span>
            <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">Recognition was the insight</span>
            <span style={{ color: ORANGE }}>→</span>
            <span className="px-3 py-1.5 rounded-full text-white" style={{ background: INK }}>
              A reusable merchant-success system was the outcome
            </span>
          </div>
          <p className="mt-10 text-base text-neutral-500 max-w-2xl">
            The most important part of this story: our first experiment worked — but not for the reason we expected.
            That changed the strategy.
          </p>
        </Spine>

        {/* S2 — mandate */}
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
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-neutral-500">
            {['M0 · diagnosis', 'M2 · concierge pilot', 'M4 · product-assisted', 'M5 · research pivot', 'M8 · automated scale', 'M10+ · upstream & partners'].map((m) => (
              <span key={m} className="px-2.5 py-1 rounded-full bg-neutral-100">
                {m}
              </span>
            ))}
          </div>
        </Spine>

        {/* S3 — reframing */}
        <Spine id="reframing" kicker="Problem reframing" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            By the time a merchant churned, most of the damage had already happened.
          </h2>
          <div className="mt-10 flex items-end gap-4">
            <p className="font-black text-6xl md:text-8xl">
              ~$16<span style={{ color: ORANGE }}>B</span>
            </p>
            <p className="text-neutral-400 mb-3 max-w-sm text-sm">
              annualized TPV contraction run-rate across the portfolio
              <Flag kind="assumption" note="~$15.9B — annualized ×12 from a single-month snapshot; simplified construct, reconciliation in appendix" />
            </p>
          </div>
          <p className="mt-8 text-lg md:text-xl max-w-3xl text-neutral-300">
            Traditional churn — twelve months at zero volume — was the small slice. The bulk was gradual contraction
            by merchants who were <strong className="text-white">still transacting, still reachable, still recoverable</strong>.
          </p>
          <p className="mt-8 text-lg md:text-xl max-w-3xl text-neutral-300">
            We shifted the operating question from{' '}
            <em className="text-neutral-500 not-italic line-through">“Why did this merchant leave?”</em> to{' '}
            <strong className="text-white">
              “Which merchants are entering a preventable negative trajectory — and what can we do while they are still
              active?”
            </strong>
          </p>
          <Guardrail>That the full pool was recoverable. It sizes the problem, not the addressable opportunity.</Guardrail>
        </Spine>

        {/* S4 — segmentation */}
        <Spine id="segmentation" kicker="Portfolio diagnosis">
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

        {/* S5 — money map */}
        <Spine id="money-map" kicker="Where the money was going">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
            We attributed the contraction before we treated it.
          </h2>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Rule-based reason codes located the loss — honestly, including the third we couldn&apos;t yet explain.
          </p>
          <MoneyMap />
          <p className="mt-8 text-lg md:text-xl max-w-3xl text-neutral-700">
            We needed a fast first intervention to prove decline was <strong>addressable at all</strong> — and to earn
            investment in a cross-functional portfolio.
          </p>
        </Spine>

        {/* S6 — wedge */}
        <Spine id="wedge" kicker="The first bet">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Pricing wasn&apos;t the biggest opportunity. It had the highest{' '}
            <span style={{ color: ORANGE }}>learning-adjusted leverage</span>.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-3xl">
            Fast to validate manually. Reversible and cappable. Cleanly measurable against holdouts. Backed by existing
            pricing operations and willing allies in Pricing. We were not betting that price caused decline — we were
            buying, at the lowest available cost, an answer to the question underneath the whole portfolio.
          </p>
          <p className="mt-8 text-2xl md:text-3xl font-black max-w-3xl">
            We earned permission to scale by <span style={{ color: ORANGE }}>reducing the cost of being wrong</span>.
          </p>
          <p className="mt-10 text-base text-neutral-500">
            ↓ The next section reads sideways — it&apos;s the working process itself: how the bet was chosen, de-risked,
            and earned its way to scale.
          </p>
          <Rib branch="Conflict & alignment" title="The margin fight — and how alignment was actually earned">
            <div className="space-y-3">
              <p>
                Pricing Strategy and business GMs pushed back hard: margin was the most important business metric, a
                discount might subsidize merchants who would stay anyway, and product-led pricing risked inconsistency
                with negotiated enterprise contracts.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Narrow eligibility via merchant scoring; sales-managed contracts carved out entirely.</li>
                <li>A reversible 2,000-merchant calling experiment before any product build.</li>
                <li>Control and comparison populations preserved at every stage.</li>
                <li>Adoption and trajectory evidence required before automation investment.</li>
                <li>Director + commercial VP sponsorship to align dependencies.</li>
              </ul>
              <p className="text-neutral-500">
                The finance conversation in one line: the subsidy risk couldn&apos;t be known pre-launch, but it could
                be <em>bounded</em> pre-launch — guardrails were the price of permission.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* THE BRANCH */}
        <Branch />

        {/* S7 — research turn */}
        <Spine id="research-pivot" kicker="The turn" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The offer landed well — but not because most merchants were actively leaving.
          </h2>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            Twenty moderated interviews, positioned broadly as a UX and offer review so we wouldn&apos;t prime the
            retention story we expected to hear.
          </p>
          <div className="text-black rounded-2xl bg-white p-8 mt-10">
            <InterviewGrid />
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {QUOTES.slice(0, 2).map((q) => (
              <blockquote
                key={q}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 text-lg leading-snug font-medium text-neutral-200"
                style={{ borderLeft: `4px solid ${ORANGE}` }}
              >
                {q}
              </blockquote>
            ))}
          </div>
          <p className="mt-10 text-xl md:text-2xl max-w-3xl font-bold">
            The offer worked more clearly as a <span style={{ color: ORANGE }}>relationship builder</span> than as a
            countermeasure to diverted payments.
          </p>
          <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6 max-w-3xl">
            <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ORANGE }}>
              We had left ourselves the clues
            </p>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                The original problem-space map had <strong className="text-white">no recognition space at all</strong> —
                the need research surfaced wasn&apos;t on our radar as a measurable problem.
              </li>
              <li>
                One ideation cluster — Relationship &amp; Loyalty — carried the note{' '}
                <strong className="text-white">“Gap: no direct metric.”</strong> We sensed it and couldn&apos;t measure
                it.
              </li>
              <li>
                And the learning plan had pre-registered the escape hatch:{' '}
                <strong className="text-white">
                  “If pricing wasn&apos;t actually their primary concern, we&apos;ll figure out what is.”
                </strong>
              </li>
            </ul>
          </div>
          <div className="mt-8 rounded-2xl p-7 text-white max-w-3xl" style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ORANGE }}>
              The new product question
            </p>
            <p className="text-lg md:text-xl font-bold leading-snug">
              How might we help merchants understand where they stand with PayPal, recognize the value they&apos;ve
              built, and receive benefits that reflect what their businesses actually need?
            </p>
          </div>
          <Rib branch="Branch D" title="Research methodology — and the full merchant voice">
            <div className="space-y-4 text-neutral-700">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Twenty 1:1 moderated interviews; deliberate mix of scope-, schedule-, logistics-, and order-centric businesses.</li>
                <li>
                  Limitations owned openly: n=20 is a mechanism-finding sample, not an effect-size estimate; recruiting
                  from offer recipients skews toward engaged merchants.
                </li>
              </ul>
              <div className="grid sm:grid-cols-2 gap-3">
                {QUOTES.map((q) => (
                  <blockquote key={q} className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 text-sm" style={{ borderLeft: `3px solid ${ORANGE}` }}>
                    {q}
                  </blockquote>
                ))}
              </div>
              <p>
                <strong>“Why not stop the program once the mechanism was challenged?”</strong> Because the interviews
                didn&apos;t invalidate the business result — they changed our interpretation and improved our
                targeting. The right response was to triangulate, not to let twenty interviews overrule a controlled
                result, or the result silence the interviews.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* S8 — portfolio expansion */}
        <Spine id="expansion" kicker="Zoom back out · the portfolio">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            The insight expanded into a portfolio of differentiated value.
          </h2>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            Equal TPV did not mean equal needs. The program grew from one save offer into five treatment families —
            most reusing capabilities PayPal already had, orchestrated by the same intelligence layer.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-5 gap-3">
            {FAMILIES.map((f, i) => (
              <div key={f.name} className="rounded-xl border border-neutral-200 p-4">
                <p className="font-black text-xl mb-1" style={{ color: ORANGE }}>
                  {i + 1}
                </p>
                <p className="font-bold text-sm leading-tight">{f.name}</p>
                <p className="text-xs text-neutral-500 mt-1.5">{f.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg text-neutral-700 max-w-3xl">
            Multiple PMs eventually led individual tracks. My role shifted toward{' '}
            <strong>portfolio direction, common segmentation, shared decisioning, and cross-team learning</strong> —
            Data Science owned the models, Pricing owned margin policy, feature teams owned their capabilities.
          </p>
          <Rib branch="Branches E–F" title="Segmentation detail and three treatment deep dives">
            <p className="mb-4">
              Research-derived operating profiles (with growth vs. stability mindsets layered on top):
            </p>
            <div className="space-y-3 max-w-2xl mb-6">
              {PROFILES.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-sm">{p.name}</span>
                    <span className="text-sm font-black" style={{ color: ORANGE }}>
                      {p.pct}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded bg-neutral-100">
                    <div className="h-2.5 rounded" style={{ width: `${p.pct * 2.5}%`, background: ORANGE, opacity: 0.85 }} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{p.note}</p>
                </div>
              ))}
            </div>
            <DeepDives />
          </Rib>
        </Spine>

        {/* S9 — upstream */}
        <Spine id="upstream" kicker="Reuse №1 · move upstream" dark>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Retention became a value-discovery engine for the first 90 days.
          </h2>
          <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
            Why wait for durable-value signals to weaken before acting on them? We inverted the decline model into a{' '}
            <strong className="text-white">High-Potential Merchant Score</strong>
            <Flag kind="assumption" note="~600K newly active merchants scored annually; treatment from days 14–30 — working assumptions" />{' '}
            and moved the treatments we trusted into the first 90 days: relevant milestones, profile-based bundles,
            integration-health monitoring, Working Capital qualification, progress and standing communication.
          </p>
          <div className="rounded-2xl bg-white text-black p-8 mt-10">
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">
              Reached EHV/HV within 180 days
            </p>
            <UpstreamBars />
          </div>
          <p className="mt-8 text-base text-neutral-400 max-w-3xl">
            One nuance we caught: a purely monetary definition of “high potential” undervalued durable service
            businesses that grow slower but retain better. Interesting problem — the early-warning idea had been on the
            ideation board and was deliberately deferred until retention taught us what durable value looked like.
          </p>
          <p className="mt-8 text-xl md:text-2xl font-bold max-w-3xl">
            Activation, retention, and win-back were different moments in{' '}
            <span style={{ color: ORANGE }}>the same value system</span>.
          </p>
        </Spine>

        {/* S10 — partner */}
        <Spine id="partner" kicker="Reuse №2 · across channels">
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
                <li>Segment assignment and eligibility rules</li>
                <li>Offer configuration and pricing fulfillment</li>
                <li>Measurement</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-7">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-4">
                Channel-specific — rebuilt per partner
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-700 list-disc pl-5">
                <li>Merchant identity mapping, consent, data availability</li>
                <li>Branding and language</li>
                <li>Partner economics and delivery channel</li>
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
                Partners received: risk/potential band, leading reason codes, eligibility decision, recommended next
                action, merchant lists via dashboard/export, campaign configuration with their own branding and CTA,
                and outcome reporting.
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
                  Intelligence-only adoption exceeded full-campaign adoption — many partners hesitated on proactive
                  pricing but exported the signals into their own interventions.
                  <Flag kind="assumption" note="Consistent with supplied behavior" />
                </li>
              </ul>
              <p className="text-neutral-500">
                Honest open questions: entity-grain mapping across partner accounts, model confidence on sparser
                partner data, and whether exported intelligence is a platform win or a loss of product control.
              </p>
            </div>
          </Rib>
        </Spine>

        {/* S11 — impact + misses */}
        <Spine id="impact" kicker="Impact & honest misses">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Three levels of value — and five things that didn&apos;t work.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-4">Outcomes</p>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li>
                  Acceptance <strong>5% → 17%</strong> from calls to automation
                  <Flag kind="confirmed" />
                </li>
                <li>
                  ~$100M recovered TPV, ~$2M net margin in early cohorts
                  <Flag kind="assumption" note="Net of discount per Nick; counterfactual method to validate" />
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
                <li>Decline is a trajectory, not a binary event.</li>
                <li>Pricing is an economic lever <em>and</em> a relationship signal.</li>
                <li>Standing, trust, and recognition are product surface area.</li>
                <li>Segment by need, trajectory, and ability to act — not only size.</li>
                <li>Retention reveals durable value worth moving upstream.</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 text-white" style={{ background: '#141414' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-4" style={{ color: ORANGE }}>
                What didn&apos;t work
              </p>
              <ul className="space-y-2.5 text-sm text-neutral-300">
                <li>The model confused contraction with active switching.</li>
                <li>Pricing produced emotion without universal behavior change.</li>
                <li>Basis-point communication was genuinely hard to understand.</li>
                <li>Generic feature access felt like a catalog, not personalization.</li>
                <li>Monetary-only “high potential” undervalued service businesses.</li>
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

        {/* S12 — Substack close */}
        <Spine id="close" kicker="What this means for Substack">
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            When the platform wins only if the customer wins, customer success{' '}
            <em style={{ color: ORANGE }}>is</em> the monetization model.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-neutral-700 max-w-3xl">
            Across PayPal — and every platform business I&apos;ve worked on or studied, Substack included — the
            customer isn&apos;t primarily buying software access. The platform makes more money when the customer
            becomes more successful. That creates two linked product responsibilities:
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-5 max-w-3xl">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-black text-2xl mb-2" style={{ color: ORANGE }}>
                1
              </p>
              <p className="font-bold">Deliver real customer value.</p>
              <p className="text-sm text-neutral-600 mt-2">
                For merchants: uptime, fraud prevention, consumer trust, BNPL lift, funding. For creators: discovery,
                reader conversion, audience relationships, monetization infrastructure, less operating complexity.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-black text-2xl mb-2" style={{ color: ORANGE }}>
                2
              </p>
              <p className="font-bold">Help customers correctly perceive and attribute that value.</p>
              <p className="text-sm text-neutral-600 mt-2">
                The research made this unavoidable: fees were legible, value wasn&apos;t. Value-attribution reporting is
                the work-in-progress successor to this insight —{' '}
                <span className="font-semibold" style={{ color: ORANGE }}>
                  a capability in development, not a shipped launch
                </span>
                .
              </p>
            </div>
          </div>
          <div className="mt-12 rounded-2xl p-8 md:p-10 text-white" style={{ background: '#141414' }}>
            <p className="font-bold uppercase tracking-wide text-[11px] mb-5" style={{ color: ORANGE }}>
              Five principles I&apos;d bring
            </p>
            <ol className="space-y-3 text-base text-neutral-200 list-decimal pl-5 max-w-3xl">
              {PRINCIPLES.map((p) => (
                <li key={p}>{p}</li>
              ))}
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
