'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

// Built from the content brief at ~/Documents/Substack_PM_Case_Study_Content_Brief.md plus the
// artifact reconstruction ledger (project memory: pricing-reconstruction-ledger.md).
// Brand: PayPal blues (deep #002991 accents, #0070E0 fills), matching churn-case precedent.
//
// Three content layers:
//   1. Core states — one claim, one dominant visual, minimal supporting words.
//   2. Evidence drawers (Rib) — tables, methodology, caveats, extra quotes.
//   3. Presenter notes (Note) — spoken context; visible only via the Notes toggle, which exists
//      only while REVIEW_TOOLS is true.
//
// The pricing deep dive is an expandable full-page sub-presentation between the wedge and the
// research turn. The research turn itself is a three-stage progressive reveal.
// All working-process artifacts are sanitized recreations — no original images, dates, or names.
//
// Before Nick presents live: flip REVIEW_TOOLS to false and deploy — review chips, guardrails,
// and presenter notes all disappear.
const REVIEW_TOOLS = true

const ACCENT = '#002991' // PayPal deep blue — text accents on light surfaces
const FILL = '#0070E0' // PayPal bright blue — bars, dots, buttons
const ACCENT_DARK = '#8FBCFF' // accent on dark surfaces
const TINT = '#EAF2FD' // light blue tint backgrounds
const INK = '#181818'

// ---------- review mode / notes ----------

const ReviewCtx = createContext(false)
const NotesCtx = createContext(false)

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

function Note({ children }: { children: React.ReactNode }) {
  const on = useContext(NotesCtx)
  if (!on) return null
  return (
    <div className="mt-10 rounded-lg border border-dashed border-neutral-300 bg-neutral-50/80 px-4 py-3 text-sm text-neutral-600 max-w-3xl">
      <span className="font-bold uppercase tracking-wide text-[10px] mr-2 text-neutral-400">Presenter note</span>
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
      style={dark ? { background: '#0b0d12' } : { color: INK }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {kicker && (
          <p className="font-semibold tracking-[0.18em] uppercase text-xs mb-6" style={{ color: dark ? ACCENT_DARK : ACCENT }}>
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
    <div className="mt-10 rounded-xl border border-neutral-200 overflow-hidden" style={{ borderLeft: `4px solid ${FILL}` }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Evidence · {branch}
          </span>
          <span className="font-bold text-base" style={{ color: INK }}>
            {title}
          </span>
        </span>
        <span className="text-xl font-light shrink-0" style={{ color: FILL }}>
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

const STICKY_TONES = {
  yellow: '#FFF3D6',
  green: '#E7F4E4',
  orange: '#FFE7DA',
  purple: '#EFE9FB',
  blue: '#E3F0FC',
  gray: '#f1efe9',
} as const

function Sticky({
  children,
  tone = 'yellow',
  tilt = -0.6,
  highlight,
  className = '',
}: {
  children: React.ReactNode
  tone?: keyof typeof STICKY_TONES
  tilt?: number
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-sm px-3.5 py-3 text-[13px] leading-snug shadow-[0_2px_6px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        background: STICKY_TONES[tone],
        transform: `rotate(${tilt}deg)`,
        border: highlight ? `1.5px solid ${FILL}` : '1px solid rgba(0,0,0,0.05)',
      }}
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
  { name: 'Risk & limitations', amt: 1750, kind: 'addressable' as const, note: 'Holds, reserves, limitations felt as punishment' },
  { name: 'Macro — bankruptcy, inactive, seasonal', amt: 942, kind: 'macro' as const, note: '~6% — not controllable' },
  { name: 'Not yet attributed', amt: 5815, kind: 'untagged' as const, note: 'The young model’s honest ~37%' },
]

const STAGES = [
  { name: 'Concierge MVP', cohort: '2,000', how: 'Phone outreach, manual offers — the pilot was also the research instrument', rate: 5 },
  { name: 'Product-assisted', cohort: '20,000', how: 'In-product experience, manually batched fulfillment', rate: 10 },
  { name: 'Automated platform', cohort: '100,000', how: 'Automated eligibility, acceptance, fulfillment', rate: 17 },
]

const FINDINGS = [
  { label: 'Clearly positive reaction to the offer', n: 15 },
  { label: 'Discussed their standing with PayPal', n: 13 },
  { label: 'No obvious mechanism for moving payment volume', n: 15 },
  { label: 'Showed clear active diversion to other processors', n: 2 },
]

const CLUSTERS = [
  { name: 'Value Realization', q: 'Do merchants understand what they get for what they pay?' },
  { name: 'Competitive Clarity', q: 'Do we get a chance to compete?' },
  { name: 'Right Offer, Right Time', q: 'Are we reaching at-risk merchants fast enough?' },
  { name: 'Transparency Without Backfire', q: 'Honesty without creating new problems?' },
  { name: 'Relationship & Loyalty', q: 'Do merchants feel valued, or just transactional?', gap: true },
  { name: 'Channel & Persona Fit', q: 'Where and how do merchants want to hear from us?' },
  { name: 'System Integrity', q: 'How do we prevent gaming?' },
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
  { layer: 'Eligibility policy', detail: 'Value tier · supported geo/product · headline-rate status · tenure · exclusions: sales-managed, unresolved holds', reused: true },
  { layer: 'Offer decisioning', detail: 'Tiering by volume · personalized savings calc · expiry · competitor-rate counter path (designed) · no escalation ladders', reused: true },
  { layer: 'Merchant experience', detail: 'Multi-channel reach → portal surfaces → offer in dollars, not bps → accept / talk to a human', reused: false },
  { layer: 'Fulfillment', detail: 'Manual queue → batched → automated repricing, with rate-verification QA', reused: true },
  { layer: 'Measurement & learning', detail: 'Savings visibility · 30/60/90-day cohorts vs holdout · learning from rejectors', reused: true },
]

const CATEGORIES = [
  { name: 'Desirability', color: '#E8503A', tone: 'orange' as const, ex: '“Merchants want to be recognized as valuable — not treated generically.”' },
  { name: 'Usability', color: '#E89B3A', tone: 'yellow' as const, ex: '“Merchants won’t feel surveilled by us knowing they’re at risk.”' },
  { name: 'Feasibility', color: '#8B5CF6', tone: 'purple' as const, ex: '“We can identify why they’re declining — pricing vs performance vs risk.”' },
  { name: 'Viability', color: '#3B82F6', tone: 'blue' as const, ex: '“We’re not lowering pricing for people who wouldn’t have churned.”' },
  { name: 'Legal & ethical', color: '#22A06B', tone: 'green' as const, ex: '“Personalized pricing doesn’t discriminate; urgency is truthful.”' },
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
  { name: 'Economic recognition', note: 'Tiers, earn-backs, milestones, bundles' },
  { name: 'Protection & trust', note: 'Covered disputes, faster risk review' },
  { name: 'Operational confidence', note: 'Integration health, support, invoicing' },
  { name: 'Growth enablement', note: 'BNPL, capital, AI assistant, ads' },
  { name: 'Recognition & progress', note: 'Standing, progress, value framing' },
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
    learning: 'Incentives worked best when they unlocked a visible business outcome, not product count.',
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
    learning: 'Loyalty benefits were most powerful resolving a moment where a good merchant felt unfairly treated.',
  },
  {
    tab: 'Value communication',
    hmw: 'How might we make PayPal’s value as legible as its fees?',
    target: 'Scope/schedule-centric, stability-minded, high-tenure merchants — fee-sensitive but with limited ability to reroute volume.',
    treatment:
      'Instead of only “you paid $X,” show what the spend delivered: uptime, fraud prevented, disputes resolved, BNPL-associated AOV, payout performance, analytics, tax support.',
    results: [
      { text: '~2× engagement with benefit-detail content', kind: 'assumption' as const },
      { text: '~10–15% lift in relevant product exploration', kind: 'assumption' as const },
      { text: 'No statistically meaningful immediate TPV movement', kind: 'assumption' as const },
    ],
    learning: 'Relationship treatments can create value without immediate transaction movement — but need different success metrics.',
  },
]

const PROFILES = [
  { name: 'Scope-centric', pct: 34, note: 'Projects & consulting — invoices, scope, tax clarity' },
  { name: 'Orders-centric', pct: 29, note: 'Retail & ecommerce — checkout, disputes, conversion' },
  { name: 'Schedule-centric', pct: 16, note: 'Appointments & services — booking, cash-flow' },
  { name: 'Logistics-centric', pct: 10, note: 'Manufacturing & wholesale — reliability, reconciliation' },
]

const QUOTES = [
  '“It’s about time PayPal recognized my loyalty. Thank you.”',
  '“It forces me to stay and feel appreciated…it really enforces my stay with you guys.”',
  '“With an offer like this I’m less worried about moving my customers to Zelle and Venmo because of fees.”',
  '“Are these disputes going to lower my ranking in PayPal…are they going to see me as a problem customer?”',
]

const PRINCIPLES = [
  'Choose the first bet for learning-adjusted leverage.',
  'Quantitative evidence locates the problem; qualitative evidence interprets it.',
  'Customer success is the monetization model — deliver value, and make it legible.',
]

const DIVE_STEPS = [
  { id: 'dive-b1', short: 'Decompose' },
  { id: 'dive-b2', short: 'Diverge' },
  { id: 'dive-b3', short: 'Converge' },
  { id: 'dive-b4', short: 'Design' },
  { id: 'dive-b5', short: 'De-risk' },
  { id: 'dive-b6', short: 'Plan' },
  { id: 'dive-b7', short: 'Scale' },
  { id: 'dive-b8', short: 'Results' },
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
            <span className="text-sm font-black whitespace-nowrap" style={{ color: r.kind === 'addressable' ? ACCENT : '#a3a3a3' }}>
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
                    ? FILL
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
        ~$15.9B annualized · ~87% concentrated in high-value merchants
        <Flag kind="assumption" note="Naive ×12 annualization of a single-month snapshot; simplified from fuller churn+decline constructs" />
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
                <p className="font-black text-4xl" style={{ color: ACCENT }}>
                  {s.rate}%
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-neutral-200">
              <div className="h-2 rounded-full" style={{ width: `${(s.rate / 20) * 100}%`, background: FILL }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-neutral-500">
        Every stage gate: evidence bought the next investment.
        <Flag kind="assumption" note="Opt-in = accepted and repriced, per Nick's recollection — validate against records" />
      </p>
    </div>
  )
}

function InterviewGrid() {
  const [active, setActive] = useState(3)
  const f = FINDINGS[active]
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="grid grid-cols-5 gap-3 max-w-xs">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-full transition-colors duration-300"
              style={{ background: i < f.n ? FILL : '#e5e5e5' }}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          <strong style={{ color: INK }}>{f.n} of 20</strong> — {f.label.toLowerCase()}
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
            style={i === active ? { background: TINT, borderColor: FILL } : undefined}
          >
            <span className="font-bold mr-2" style={{ color: ACCENT }}>
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
              style={{ width: seen ? `${r.pct * 3}%` : '0%', background: r.hot ? FILL : '#a3a3a3' }}
            />
          </div>
        </div>
      ))}
      <p className="text-sm text-neutral-500">
        Reached EHV/HV within 180 days — ~1.8×.
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
      <rect x={50 + (W - 90) / 2} y={12} width={(W - 90) / 2} height={(H - 80) / 2 + 21} fill={TINT} rx={6} />
      <line x1={50} y1={H - 45} x2={W - 40} y2={H - 45} stroke="#d4d4d4" strokeWidth={1.5} />
      <line x1={50} y1={H - 45} x2={50} y2={12} stroke="#d4d4d4" strokeWidth={1.5} />
      <text x={(W + 10) / 2} y={H - 16} textAnchor="middle" fontSize={11} fill="#737373">
        Uncertainty → (poorly understood)
      </text>
      <text x={16} y={H / 2} textAnchor="middle" fontSize={11} fill="#737373" transform={`rotate(-90 16 ${H / 2})`}>
        Importance → (critical)
      </text>
      <text x={W - 46} y={26} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
        TEST FIRST
      </text>
      {QUADRANT.map((d) => (
        <g key={d.id}>
          <circle
            cx={px(d.x, d.dx)}
            cy={py(d.y, d.dy)}
            r={d.hero ? 9 : 6}
            fill={d.hero ? FILL : '#181818'}
            opacity={d.hero ? 1 : 0.75}
          />
          <text x={px(d.x, d.dx) + (d.hero ? 13 : 9)} y={py(d.y, d.dy) + 4} fontSize={10.5} fontWeight={d.hero ? 700 : 500} fill={d.hero ? ACCENT : '#404040'}>
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
        <p className="font-semibold leading-snug" style={{ color: ACCENT }}>
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
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: FILL }} />
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

// ---------- the research turn (progressive reveal) ----------

function ResearchTurn() {
  const [stage, setStage] = useState(0)
  return (
    <div>
      <div className="flex gap-2 mb-10">
        {['It worked', 'The interviews', 'The insight'].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStage(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              i === stage ? 'text-black' : i < stage ? 'text-neutral-300' : 'text-neutral-500'
            }`}
            style={i === stage ? { background: ACCENT_DARK } : { background: 'rgba(255,255,255,0.08)' }}
          >
            {i + 1} · {label}
          </button>
        ))}
      </div>

      {stage === 0 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">The pricing wedge worked.</h2>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl">
            {[
              ['5% → 17%', 'acceptance, calls to automation'],
              ['~$100M', 'recovered TPV, early cohorts'],
              ['~$2M', 'net margin after discount cost'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-black text-3xl md:text-5xl" style={{ color: ACCENT_DARK }}>
                  {v}
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  {l}
                  {l.startsWith('recovered') && <Flag kind="assumption" note="Recollection; counterfactual method to validate" />}
                  {l.startsWith('net margin') && <Flag kind="assumption" note="Net of discount per Nick; method to validate" />}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-lg text-neutral-300 max-w-2xl">Scale earned. Investment unlocked.</p>
          <button
            type="button"
            onClick={() => setStage(1)}
            className="mt-8 px-6 py-3 rounded-full font-bold text-sm text-black"
            style={{ background: ACCENT_DARK }}
          >
            Then we talked to twenty merchants →
          </button>
        </div>
      )}

      {stage === 1 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Twenty interviews broke our explanation.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl">
            We assumed merchants were diverting volume over price. Explore what they actually said:
          </p>
          <div className="text-black rounded-2xl bg-white p-8 mt-8">
            <InterviewGrid />
          </div>
          <button
            type="button"
            onClick={() => setStage(2)}
            className="mt-8 px-6 py-3 rounded-full font-bold text-sm text-black"
            style={{ background: ACCENT_DARK }}
          >
            So what was the offer actually doing? →
          </button>
        </div>
      )}

      {stage === 2 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            They didn&apos;t want a discount. They wanted <span style={{ color: ACCENT_DARK }}>recognition</span>.
          </h2>
          <blockquote
            className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-8 text-2xl md:text-3xl leading-snug font-bold text-white max-w-3xl"
            style={{ borderLeft: `5px solid ${ACCENT_DARK}` }}
          >
            {QUOTES[0]}
          </blockquote>
          <div className="mt-10 rounded-2xl p-7 max-w-3xl" style={{ background: 'rgba(143,188,255,0.08)', border: '1px solid rgba(143,188,255,0.25)' }}>
            <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
              The new product question
            </p>
            <p className="text-lg md:text-xl font-bold leading-snug text-white">
              How might we help merchants understand where they stand, recognize the value they&apos;ve built, and
              receive benefits their businesses actually need?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- the deep dive (expandable full-page sub-presentation) ----------

function DivePanel({
  id,
  num,
  step,
  title,
  tint,
  children,
}: {
  id: string
  num: string
  step: string
  title: string
  tint?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-slide-id={id}
      className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-20 py-20 scroll-mt-16"
      style={{ background: tint ? '#f4f7fb' : 'white', color: INK }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-6xl md:text-7xl leading-none select-none" style={{ color: '#dbe5f2' }}>
            {num}
          </span>
          <p className="font-semibold tracking-[0.18em] uppercase text-xs" style={{ color: ACCENT }}>
            {step}
          </p>
        </div>
        <h3 className="font-extrabold tracking-tight text-3xl md:text-5xl mt-3 mb-12 max-w-4xl">{title}</h3>
        {children}
      </div>
    </section>
  )
}

function DeepDive({ onBack }: { onBack: () => void }) {
  return (
    <div id="deep-dive">
      <div className="sticky top-0 z-40 border-b border-neutral-200" style={{ background: 'rgba(240,244,250,0.97)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white hover:border-neutral-500 transition-colors whitespace-nowrap"
          >
            ← Back to the presentation
          </button>
          <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-neutral-500 overflow-x-auto">
            {DIVE_STEPS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="px-2 py-1 rounded hover:text-black whitespace-nowrap">
                <span style={{ color: ACCENT }}>{i + 1}</span> {s.short}
              </a>
            ))}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 whitespace-nowrap hidden sm:block">
            Deep dive
          </span>
        </div>
      </div>

      <section className="px-6 md:px-20 pt-16 pb-10" style={{ background: '#f0f4fa', color: INK }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-semibold tracking-[0.18em] uppercase text-xs" style={{ color: ACCENT }}>
            The first bet · deep dive
          </p>
          <h2 className="font-black tracking-tight text-4xl md:text-6xl mt-3 max-w-4xl">
            How the bet was chosen, de-risked, and earned its way to scale.
          </h2>
          <p className="mt-5 text-sm text-neutral-500 max-w-2xl">
            Sanitized reconstruction of the working process; labels and groupings simplified for confidentiality.
          </p>
        </div>
      </section>

      {/* 01 — decompose */}
      <DivePanel id="dive-b1" num="01" step="Decompose" title="From distant outcomes to metrics a team can move">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div className="space-y-3 text-[15px]">
            {[
              ['Business outcome', 'Portfolio TPV decline — lagging'],
              ['Economic attribution', 'Contraction $ by tier × geo × reason'],
              ['Problem spaces', 'Six ownable spaces + honest untagged'],
              ['Problem indicators', 'Exposure flags, not diagnoses'],
              ['Controllable metrics', 'Funnels a team moves next sprint'],
              ['Guardrails', 'Margin, gaming, support noise'],
            ].map(([k, v], i) => (
              <div key={k} className="flex gap-4 items-baseline">
                <span className="font-black text-sm w-6 text-right shrink-0" style={{ color: ACCENT }}>
                  L{i}
                </span>
                <div>
                  <span className="font-bold">{k}.</span> <span className="text-neutral-600">{v}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
              <p className="font-bold mb-2">
                Pricing — a <span style={{ color: ACCENT }}>perception</span> funnel
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                understand fees → see the value behind them → shown a proactive offer → actioned → speed from signal
                to offer
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
              <p className="font-bold mb-2">
                Risk — an <span style={{ color: ACCENT }}>operational</span> funnel
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                surfaced in 24h → actually seen → acted on in 24/48/72h → resolved before account impact → self-serve
              </p>
            </div>
          </div>
        </div>
        <p className="mt-10 text-lg font-bold max-w-3xl">
          Same method, different problems — <span style={{ color: ACCENT }}>several teams, one economic target.</span>
        </p>
        <Note>
          “Is pricing causing churn?” lives at L0 — no team can act on it. The whole move is walking it down to L4:
          metrics with agency. Emphasize the tags are correlational exposure flags — that honesty sets up the pivot.
        </Note>
      </DivePanel>

      {/* 02 — diverge */}
      <DivePanel id="dive-b2" num="02" step="Diverge" title="Seven clusters, about forty candidate bets" tint>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CLUSTERS.map((c, i) => (
            <Sticky key={c.name} tone={c.gap ? 'orange' : 'green'} tilt={[-1.2, 0.8, -0.6, 1.1, -0.9, 0.7, -1.4][i]} highlight={c.gap}>
              <p className="font-bold text-sm mb-1">{c.name}</p>
              <p className="text-xs text-neutral-600 leading-snug">{c.q}</p>
              {c.gap && (
                <p className="text-xs font-bold mt-2" style={{ color: ACCENT }}>
                  “Gap — no direct metric.” Remember this one.
                </p>
              )}
            </Sticky>
          ))}
        </div>
        <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                <th className="px-5 py-3 font-semibold">Candidate bet</th>
                <th className="px-3 py-3 font-semibold whitespace-nowrap">Triage</th>
                <th className="px-3 py-3 font-semibold">Votes</th>
                <th className="px-5 py-3 font-semibold">Fate</th>
              </tr>
            </thead>
            <tbody>
              {BETS.map((b) => (
                <tr key={b.bet} className={`border-b border-neutral-100 ${b.dead ? 'text-neutral-400' : ''}`} style={b.hot ? { background: TINT } : undefined}>
                  <td className={`px-5 py-3 ${b.hot ? 'font-bold' : ''}`}>{b.bet}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{b.triage}</td>
                  <td className="px-3 py-3 whitespace-nowrap tracking-tighter" style={{ color: FILL }}>
                    {'●'.repeat(b.votes) || '—'}
                  </td>
                  <td className="px-5 py-3">{b.fate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
          The most-voted idea never shipped.{' '}
          <span style={{ color: ACCENT }}>Votes located conviction — judgment did the sequencing.</span>
        </p>
      </DivePanel>

      {/* 03 — converge */}
      <DivePanel id="dive-b3" num="03" step="Converge" title="The wedge decision — reasoning, reconstructed">
        <div className="rounded-2xl bg-white border border-neutral-200 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[620px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest border-b border-neutral-200">
                <th className="px-5 py-3"></th>
                {MATRIX.cols.map((c, i) => (
                  <th key={c} className="px-4 py-3 font-semibold" style={i === 0 ? { color: ACCENT } : { color: '#a3a3a3' }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.rows.map((r) => (
                <tr key={r.c} className="border-b border-neutral-100">
                  <td className="px-5 py-3 font-bold whitespace-nowrap">{r.c}</td>
                  {r.v.map((v, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-semibold' : 'text-neutral-500'}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xl md:text-2xl font-black max-w-4xl">
          We didn&apos;t know price caused decline. We knew this was the{' '}
          <span style={{ color: ACCENT }}>fastest reversible test</span> of whether proactive treatment could bend a
          trajectory at all.
        </p>
        <Note>
          Point at the tech column first: bigger pool, zero margin risk — and still not first. It ran as a parallel
          track. Pricing swept every learning-speed row. The matrix is labeled a reconstruction; the inputs are from
          the real boards.
        </Note>
      </DivePanel>

      {/* 04 — design */}
      <DivePanel id="dive-b4" num="04" step="Design" title="The flow, in separable layers" tint>
        <div className="space-y-3">
          {FLOW_LAYERS.map((l, i) => (
            <div key={l.layer} className="rounded-xl bg-white border border-neutral-200 px-6 py-4 flex items-start gap-5 shadow-sm">
              <span className="font-black text-lg mt-0.5 w-5 shrink-0" style={{ color: ACCENT }}>
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-bold">
                  {l.layer}
                  {l.reused && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded align-middle" style={{ background: TINT, color: ACCENT }}>
                      later reused
                    </span>
                  )}
                </p>
                <p className="text-sm text-neutral-600 mt-1">{l.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
          Signal says <em>who&apos;s declining</em>; policy says <em>who safely gets a rate change</em>.{' '}
          <span style={{ color: ACCENT }}>That separation made reuse possible.</span>
        </p>
      </DivePanel>

      {/* 05 — de-risk */}
      <DivePanel id="dive-b5" num="05" step="De-risk" title="What had to be true — ~200 assumptions, five categories">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            {CATEGORIES.map((c, i) => (
              <div key={c.name} className="flex gap-3 items-stretch">
                <div className="w-1.5 rounded-full shrink-0" style={{ background: c.color }} />
                <div className="flex-1">
                  <p className="font-bold text-xs uppercase tracking-wide mb-1" style={{ color: c.color }}>
                    {c.name}
                  </p>
                  <Sticky tone={c.tone} tilt={[-0.8, 0.6, -0.5, 0.9, -0.7][i]}>{c.ex}</Sticky>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-sm">
              <Quadrant />
            </div>
            <div className="mt-4 rounded-xl border px-5 py-4" style={{ borderColor: FILL, background: TINT }}>
              <p className="text-sm">
                <strong style={{ color: ACCENT }}>V1 — untestable before launch:</strong> could targeted merchants{' '}
                <em>actually respond</em>? So research was bolted to the pilot from day one.
              </p>
            </div>
          </div>
        </div>
        <Note>
          Scores are a reconstructed prioritization of the historical map — the board itself carried no numbers. If
          probed on rigor: importance × uncertainty, judgment applied after, org-approval and legal rows treated as
          binary gates, not experiments.
        </Note>
      </DivePanel>

      {/* 06 — plan */}
      <DivePanel id="dive-b6" num="06" step="Plan the learning" title="Know before launch vs. learn only by launching" tint>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 p-6" style={{ background: '#FDF8EC' }}>
            <p className="font-black text-sm mb-4">Before launch</p>
            <div className="space-y-3">
              <div className="rounded-lg p-4" style={{ background: '#F3EFFB' }}>
                <p className="font-bold text-sm">“Just Ask”</p>
                <p className="text-xs text-neutral-600 mt-1">
                  Data · legal · engineering · marketing · pricing · commercial. Asking retired more risk than any
                  spike.
                </p>
              </div>
              <div className="rounded-lg p-4 bg-white/70">
                <p className="font-bold text-sm">UX testing</p>
                <p className="text-xs text-neutral-600 mt-1">Do the terms play back correctly?</p>
              </div>
              <div className="rounded-lg p-4 bg-white/70">
                <p className="font-bold text-sm">Bound the unknowable</p>
                <p className="text-xs text-neutral-600 mt-1">Backtest, ops dry run, margin caps + holdouts.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6" style={{ background: '#EAF4FD' }}>
            <p className="font-black text-sm mb-4">Only by launching</p>
            <div className="space-y-3">
              <div className="rounded-lg p-4 bg-white/70">
                <p className="font-bold text-sm">Reaction-coded calls</p>
                <p className="text-xs text-neutral-600 mt-1">Recognition — or desperation?</p>
              </div>
              <div className="rounded-lg p-4 bg-white/70">
                <p className="font-bold text-sm">Treatment vs. holdout</p>
                <p className="text-xs text-neutral-600 mt-1">Are we subsidizing stayers?</p>
              </div>
              <div className="rounded-lg p-4 bg-white/70">
                <p className="font-bold text-sm">30/60/90-day cohorts</p>
                <p className="text-xs text-neutral-600 mt-1">Do saves persist?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-6 items-start">
          <Sticky tone="orange" highlight tilt={-1} className="max-w-xs">
            <strong>From the actual plan:</strong> “If pricing wasn&apos;t actually their primary concern, we&apos;ll
            figure out what is.”
          </Sticky>
          <p className="text-sm text-neutral-600 flex-1 max-w-xl">
            The pivot was pre-registered. Manual operations were the learning strategy — engineering waited until the
            gates were passed.
          </p>
        </div>
      </DivePanel>

      {/* 07 — scale */}
      <DivePanel id="dive-b7" num="07" step="Earn scale" title="Phone calls → product-assisted → automated">
        <StageLadder />
        <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
          <span style={{ color: ACCENT }}>Automation wasn&apos;t delayed — it was withheld until earned.</span>
        </p>
      </DivePanel>

      {/* 08 — results */}
      <DivePanel id="dive-b8" num="08" step="Read the results honestly" title="What the numbers said — and didn’t" tint>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-base text-neutral-700">
              ~<strong>$100M recovered TPV</strong>
              <Flag kind="assumption" note="Recollection; counterfactual method to validate" /> · ~
              <strong>$2M net margin after discount</strong>
              <Flag kind="assumption" note="Net-of-discount per Nick; method to validate" /> — from merchants who had
              been declining or plateauing, read against comparison groups.
            </p>
            <Guardrail>
              That opt-in alone proved behavior change, or that observed TPV was automatically incremental.
            </Guardrail>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">
              Four outcome groups kept us honest
            </p>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><strong>Rescued</strong> — declining before, recovered after.</li>
              <li><strong>Lost cause</strong> — declining before and after.</li>
              <li><strong>Star</strong> — growing anyway. Not our win.</li>
              <li><strong>Declining anyway</strong> — stable before, declined after.</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xl md:text-2xl font-black max-w-3xl">
          The numbers said: continue. They did not say <em>why</em> —{' '}
          <span style={{ color: ACCENT }}>and we had planned for exactly that question.</span>
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-10 px-6 py-3 rounded-full text-white font-bold text-sm"
          style={{ background: ACCENT }}
        >
          ← Back to the presentation — the research turn
        </button>
      </DivePanel>
    </div>
  )
}

// ---------- main ----------

export default function SubstackCaseContent() {
  const [review, setReview] = useState(false)
  const [notes, setNotes] = useState(false)
  const [diveOpen, setDiveOpen] = useState(false)
  const teaserRef = useRef<HTMLElement>(null)

  const openDive = () => {
    setDiveOpen(true)
    requestAnimationFrame(() => {
      setTimeout(() => document.getElementById('deep-dive')?.scrollIntoView({ behavior: 'smooth' }), 60)
    })
  }

  const closeDive = () => {
    teaserRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    setDiveOpen(false)
  }

  return (
    <ReviewCtx.Provider value={review}>
      <NotesCtx.Provider value={notes}>
        <main className="font-sans" style={{ color: INK }}>
          {/* S1 — title */}
          <Spine id="title" kicker="Nick Omori · Senior Product Manager — Technical, PayPal">
            <h1 className="font-black tracking-tight leading-[0.95] text-4xl md:text-7xl max-w-4xl">
              Building PayPal&apos;s Merchant Trajectory System
            </h1>
            <p className="mt-8 text-xl md:text-2xl max-w-3xl text-neutral-600">
              Reactive churn prevention, rebuilt as a merchant-success platform.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">Pricing was the wedge</span>
              <span style={{ color: FILL }}>→</span>
              <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">Recognition was the insight</span>
              <span style={{ color: FILL }}>→</span>
              <span className="px-3 py-1.5 rounded-full text-white" style={{ background: ACCENT }}>
                A reusable system was the outcome
              </span>
            </div>
            <Note>
              Open with: “The most important part of this story — our first experiment worked, but not for the reason
              we expected. That changed the strategy.” Then: “To see why we started, look at what PayPal was measuring
              — and what that missed.”
            </Note>
          </Spine>

          {/* S2 — mandate */}
          <Spine id="mandate" kicker="Context & mandate">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              I owned the merchant lifecycle — across direct and partner surfaces.
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-5 max-w-4xl">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Lifecycle</p>
                <p className="font-semibold text-sm">Activation → growth → retention → win-back</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Surfaces</p>
                <p className="font-semibold text-sm">Homepage · notifications · lifecycle · Partner Portal</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Role</p>
                <p className="font-semibold text-sm">Portfolio lead — specialist teams owned their systems</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-neutral-500">
              {['M0 · diagnosis', 'M2 · concierge pilot', 'M4 · product-assisted', 'M5 · research pivot', 'M8 · automated scale', 'M10+ · upstream & partners'].map((m) => (
                <span key={m} className="px-2.5 py-1 rounded-full bg-neutral-100">
                  {m}
                </span>
              ))}
            </div>
            <Note>
              Spoken: broad directive — improve activation, growth, retention. I chose retention first: mature and
              declining merchants held the richest evidence of durable value. Sponsorship: a director + a commercial
              VP. Boundaries: Data Science owned models, Pricing owned margin, Ops fulfilled — I owned how it came
              together into strategy, experience, and portfolio.
            </Note>
          </Spine>

          {/* S3 — reframing */}
          <Spine id="reframing" kicker="Problem reframing" dark>
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              By the time a merchant churned, the damage was already done.
            </h2>
            <div className="mt-12 flex items-end gap-4">
              <p className="font-black text-6xl md:text-8xl">
                ~$16<span style={{ color: ACCENT_DARK }}>B</span>
              </p>
              <p className="text-neutral-400 mb-3 max-w-sm text-sm">
                annualized contraction — mostly merchants still transacting, still recoverable
                <Flag kind="assumption" note="~$15.9B — annualized ×12 from a single-month snapshot; simplified construct" />
              </p>
            </div>
            <p className="mt-10 text-xl md:text-2xl max-w-3xl font-bold">
              New question: <span style={{ color: ACCENT_DARK }}>who&apos;s entering a preventable trajectory</span> —
              not “why did they leave?”
            </p>
            <Guardrail>That the full pool was recoverable. It sizes the problem, not the addressable opportunity.</Guardrail>
            <Note>
              Spoken: churn was defined as 12 months at zero volume — by then nothing product could do would matter.
              Decline is a trajectory: minor contraction → contraction → extreme → gone. Intervene while the
              relationship is alive.
            </Note>
          </Spine>

          {/* S4 — segmentation */}
          <Spine id="segmentation" kicker="Portfolio diagnosis">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              Six questions turned one pool into a decision system.
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
              {SIX_QUESTIONS.map((r, i) => (
                <div key={r.q} className="rounded-xl border border-neutral-200 p-5">
                  <p className="font-black text-lg mb-1" style={{ color: ACCENT }}>
                    {i + 1}
                  </p>
                  <p className="font-bold text-sm leading-snug">{r.q}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xl md:text-2xl font-bold max-w-3xl">
              Value told us <span style={{ color: ACCENT }}>who</span>. Trajectory told us{' '}
              <span style={{ color: ACCENT }}>when</span>. Cause told us <span style={{ color: ACCENT }}>why</span>.
              Research eventually told us <span style={{ color: ACCENT }}>how</span>.
            </p>
            <Rib branch="Diagnosis" title="The full diagnostic grid, trajectory taxonomy, and model mechanics">
              <div className="space-y-6">
                <table className="w-full text-sm border-collapse min-w-[520px]">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                      <th className="py-2 pr-4 font-semibold">Question</th>
                      <th className="py-2 pr-4 font-semibold">Signal</th>
                      <th className="py-2 font-semibold">Decision enabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIX_QUESTIONS.map((r) => (
                      <tr key={r.q} className="border-b border-neutral-100">
                        <td className="py-2 pr-4 font-bold whitespace-nowrap">{r.q}</td>
                        <td className="py-2 pr-4 text-neutral-600">{r.signal}</td>
                        <td className="py-2 text-neutral-600">{r.decision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-wrap gap-2">
                  {TRAJECTORIES.map((t, i) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={i < 4 ? { borderColor: FILL, color: ACCENT, background: TINT } : { borderColor: '#d4d4d4', color: '#737373' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="font-bold mb-2">Model mechanics</p>
                  <p>
                    Tree-based classifier, ~403K merchants, consolidating five fragmented models. <strong>~89% recall,
                    ~62% precision</strong> — good enough to detect, not to spend on. So treatment decisioning layered
                    over model output: low confidence → cheap education; moderate + addressable → product-specific
                    guidance; high confidence + high value + addressable → pricing, protection, or high touch;
                    non-addressable → suppress spend, collect learning. Data Science owned the model; the program owned
                    what its output was allowed to trigger.
                  </p>
                </div>
              </div>
            </Rib>
          </Spine>

          {/* S5 — money map */}
          <Spine id="money-map" kicker="Where the money was going">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              We attributed the contraction before we treated it.
            </h2>
            <MoneyMap />
            <Note>
              Spoken transition: three addressable drivers, a small macro slice, and an honest untagged third. We
              needed a fast first intervention to prove decline was addressable at all — and to earn investment in a
              cross-functional portfolio.
            </Note>
          </Spine>

          {/* S6 — wedge */}
          <Spine id="wedge" kicker="The first bet">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Pricing had the highest <span style={{ color: ACCENT }}>learning-adjusted leverage</span> — not the
              biggest pool.
            </h2>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {['Fast to test manually', 'Reversible & capped', 'Cleanly measurable', 'Operationally ready', 'Earns broader investment'].map((p) => (
                <span key={p} className="px-4 py-2 rounded-full text-sm font-bold border" style={{ borderColor: FILL, color: ACCENT, background: TINT }}>
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-8 text-lg text-neutral-600 max-w-3xl">
              The bet wasn&apos;t that price caused decline — it was that proactive treatment could work at all.
            </p>
            <p className="mt-6 text-2xl md:text-3xl font-black max-w-3xl">
              We earned permission to scale by <span style={{ color: ACCENT }}>reducing the cost of being wrong</span>.
            </p>
            <Rib branch="Conflict & alignment" title="The margin fight — and how alignment was actually earned">
              <div className="space-y-3">
                <p>
                  Pricing Strategy and business GMs pushed back hard: margin was the most important business metric, a
                  discount might subsidize merchants who would stay anyway, and product-led pricing risked
                  inconsistency with negotiated enterprise contracts.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Narrow eligibility via merchant scoring; sales-managed contracts carved out entirely.</li>
                  <li>A reversible 2,000-merchant calling experiment before any product build.</li>
                  <li>Control and comparison populations preserved at every stage.</li>
                  <li>Adoption and trajectory evidence required before automation investment.</li>
                  <li>Director + commercial VP sponsorship to align dependencies.</li>
                </ul>
                <p className="text-neutral-500">
                  The finance conversation in one line: the subsidy risk couldn&apos;t be known pre-launch, but it
                  could be <em>bounded</em> pre-launch — guardrails were the price of permission.
                </p>
              </div>
            </Rib>
          </Spine>

          {/* S6b — deep dive teaser */}
          <section
            ref={teaserRef}
            data-slide-id="first-bet"
            className="relative px-6 md:px-20 py-24 scroll-mt-4"
            style={{ background: '#f0f4fa', color: INK }}
          >
            <div className="max-w-5xl mx-auto w-full">
              <p className="font-semibold tracking-[0.18em] uppercase text-xs" style={{ color: ACCENT }}>
                The first bet · deep dive
              </p>
              <h2 className="font-black tracking-tight text-3xl md:text-5xl mt-4 max-w-4xl">
                How the bet was chosen, de-risked, and earned its way to scale.
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {DIVE_STEPS.map((s, i) => (
                  <span key={s.id} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-neutral-200 text-neutral-600">
                    <span className="font-black mr-1" style={{ color: ACCENT }}>
                      {i + 1}
                    </span>
                    {s.short}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {!diveOpen ? (
                  <button
                    type="button"
                    onClick={openDive}
                    className="px-7 py-3.5 rounded-full text-white font-bold text-base shadow-sm hover:opacity-90 transition-opacity"
                    style={{ background: FILL }}
                  >
                    Explore the working process →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openDive}
                    className="px-7 py-3.5 rounded-full font-bold text-base border bg-white hover:border-neutral-500 transition-colors"
                    style={{ borderColor: FILL, color: ACCENT }}
                  >
                    Deep dive open below ↓
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* THE DEEP DIVE (expanded in place) */}
          {diveOpen && <DeepDive onBack={closeDive} />}

          {/* S7 — research turn, progressive */}
          <Spine id="research-pivot" kicker="The turn" dark>
            <ResearchTurn />
            <Rib branch="Research" title="Methodology, all four quotes, and the clues we’d left ourselves">
              <div className="space-y-5 text-neutral-700">
                <div>
                  <p className="font-bold mb-1.5">The clues were already in our artifacts</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The original problem-space map had no recognition space at all.</li>
                    <li>The Relationship &amp; Loyalty cluster carried “Gap — no direct metric.”</li>
                    <li>The learning plan pre-registered: “If pricing wasn’t their primary concern, we’ll figure out what is.”</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-1.5">Method</p>
                  <p>
                    Twenty 1:1 moderated interviews, positioned broadly as a UX/offer review to avoid priming; mixed
                    scope-, schedule-, logistics-, and order-centric businesses. Limitations owned: n=20 finds
                    mechanisms, not effect sizes; recruiting from recipients skews engaged.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {QUOTES.map((q) => (
                    <blockquote key={q} className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 text-sm" style={{ borderLeft: `3px solid ${FILL}` }}>
                      {q}
                    </blockquote>
                  ))}
                </div>
                <p>
                  <strong>“Why not stop the program?”</strong> The interviews didn&apos;t invalidate the result — they
                  changed the interpretation and the targeting. Triangulate; don&apos;t let either evidence type
                  overrule the other.
                </p>
              </div>
            </Rib>
          </Spine>

          {/* S8 — portfolio expansion */}
          <Spine id="expansion" kicker="Zoom back out">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              One insight became five families of differentiated value.
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-5 gap-3">
              {FAMILIES.map((f, i) => (
                <div key={f.name} className="rounded-xl border border-neutral-200 p-4">
                  <p className="font-black text-xl mb-1" style={{ color: ACCENT }}>
                    {i + 1}
                  </p>
                  <p className="font-bold text-sm leading-tight">{f.name}</p>
                  <p className="text-xs text-neutral-500 mt-1.5">{f.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-neutral-700 max-w-3xl">
              Multiple PMs took tracks; my role moved to <strong>portfolio direction and shared decisioning</strong>.
            </p>
            <Rib branch="Segmentation" title="Four operating profiles and three treatment deep dives">
              <p className="mb-4">Research-derived operating profiles (growth vs. stability mindsets layered on top; ~11% mixed):</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {PROFILES.map((p) => (
                  <div key={p.name} className="rounded-xl border border-neutral-200 p-4">
                    <p className="font-black text-2xl" style={{ color: ACCENT }}>
                      {p.pct}%
                    </p>
                    <p className="font-bold text-sm mt-1">{p.name}</p>
                    <p className="text-xs text-neutral-500 mt-1">{p.note}</p>
                  </div>
                ))}
              </div>
              <DeepDives />
            </Rib>
            <Note>
              Ownership language, spoken: “I initiated the investigation, set the strategy, prioritized the portfolio,
              led lifecycle delivery, and aligned the functional owners. Data Science owned models; Pricing Strategy
              owned margin; Pricing Ops executed; feature teams owned their capabilities. Equal TPV never meant equal
              needs — that&apos;s why families, not one save offer.”
            </Note>
          </Spine>

          {/* S9 — upstream */}
          <Spine id="upstream" kicker="Reuse №1 · move upstream" dark>
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Why wait for value signals to weaken before acting?
            </h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
              The decline model, inverted: score <strong className="text-white">high potential</strong> at day 14 —
              deliver proven value in the first 90 days.
              <Flag kind="assumption" note="~600K newly active merchants scored annually — working assumption" />
            </p>
            <div className="rounded-2xl bg-white text-black p-8 mt-10">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">
                Reached EHV/HV within 180 days
              </p>
              <UpstreamBars />
            </div>
            <p className="mt-8 text-xl md:text-2xl font-bold max-w-3xl">
              Activation, retention, win-back — <span style={{ color: ACCENT_DARK }}>one value system</span>.
            </p>
            <Note>
              First-90-day treatments: relevant milestones, profile-based bundles, integration health, Working Capital
              qualification, standing communication. Nuance to volunteer if probed: monetary-only “high potential”
              undervalued durable service businesses; and this idea sat on the ideation board as “measuring
              pre-decliners — deferred” until retention taught us what durable value was.
            </Note>
          </Spine>

          {/* S10 — partner */}
          <Spine id="partner" kicker="Reuse №2 · across channels">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Shared intelligence. Channel-specific delivery.
            </h2>
            <div className="mt-10 grid md:grid-cols-[1.1fr_auto_1fr] gap-6 items-center max-w-4xl">
              <div className="rounded-2xl p-7 text-white" style={{ background: '#0b0d12' }}>
                <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
                  Shared platform
                </p>
                <p className="text-sm text-neutral-300">
                  Scoring · segments &amp; eligibility · offer configuration · fulfillment · measurement
                </p>
              </div>
              <div className="hidden md:flex flex-col gap-6 text-2xl font-black" style={{ color: FILL }}>
                <span>→</span>
                <span>→</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-sm">Direct delivery</p>
                  <p className="text-xs text-neutral-500 mt-1">PayPal surfaces, PayPal brand, PLG + AE-assisted</p>
                </div>
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-sm">Partner-branded delivery</p>
                  <p className="text-xs text-neutral-500 mt-1">Partner identity, consent, economics, and CTA</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-end gap-4">
              <p className="font-black text-6xl md:text-7xl">
                10<span style={{ color: ACCENT }}>%</span>
              </p>
              <p className="text-neutral-500 mb-2 max-w-sm text-sm">
                of partners adopted in three months — many took the intelligence and ran their own interventions
                <Flag kind="confirmed" note="Denominator and definition of adoption still to be confirmed" />
              </p>
            </div>
            <Rib branch="Partner architecture" title="What flowed where, and what adoption looked like">
              <div className="space-y-4">
                <p>
                  Partners received: risk/potential band, leading reason codes, eligibility decision, recommended next
                  action, merchant lists via dashboard/export, campaign configuration with their own branding and CTA,
                  and outcome reporting.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    ~2× more at-risk merchants reached than prior manual identification.
                    <Flag kind="assumption" />
                  </li>
                  <li>
                    Partner pricing campaigns: low-double-digit acceptance.
                    <Flag kind="assumption" />
                  </li>
                  <li>
                    Intelligence-only adoption exceeded full-campaign adoption — validating detection separated from
                    delivery.
                    <Flag kind="assumption" note="Consistent with supplied behavior" />
                  </li>
                </ul>
                <p className="text-neutral-500">
                  Open questions owned honestly: entity-grain mapping, model confidence on sparser partner data,
                  exported intelligence as platform win vs. loss of control.
                </p>
              </div>
            </Rib>
          </Spine>

          {/* S11 — impact + misses */}
          <Spine id="impact" kicker="Impact & honest misses">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Three levels of value — and what didn&apos;t work.
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
              {[
                ['5% → 17%', 'acceptance, calls → automation', 'confirmed' as const],
                ['~$2M', 'net margin, early cohorts', 'assumption' as const],
                ['~$500M', 'TPV protected across portfolio', 'assumption' as const],
                ['10%', 'partner adoption in 3 months', 'confirmed' as const],
              ].map(([v, l, k]) => (
                <div key={l as string}>
                  <p className="font-black text-3xl md:text-4xl" style={{ color: ACCENT }}>
                    {v}
                  </p>
                  <p className="mt-1.5 text-xs text-neutral-500">
                    {l}
                    <Flag kind={k as 'confirmed' | 'assumption'} />
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl p-6 text-white max-w-3xl" style={{ background: '#0b0d12' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
                What didn&apos;t work
              </p>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>The model confused contraction with active switching.</li>
                <li>Pricing moved emotion — not always behavior.</li>
                <li>Basis-point communication genuinely confused merchants.</li>
              </ul>
            </div>
            <p className="mt-10 text-2xl md:text-3xl font-black max-w-4xl">
              The product wasn&apos;t a discount. It was the{' '}
              <span style={{ color: ACCENT }}>system</span> — intelligence to measurement.
            </p>
            <Rib branch="Impact detail" title="Strategic learning and the full miss list">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-bold mb-2">Strategic learning</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Decline is a trajectory, not a binary event.</li>
                    <li>Pricing is an economic lever <em>and</em> a relationship signal.</li>
                    <li>Standing, trust, and recognition are product surface area.</li>
                    <li>Segment by need, trajectory, and ability to act — not only size.</li>
                    <li>Retention reveals durable value worth moving upstream.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">Additional misses</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Generic feature access felt like a catalog, not personalization.</li>
                    <li>Monetary-only “high potential” undervalued durable service businesses.</li>
                    <li>~$100M recovered TPV in early cohorts — counterfactual method still to be validated.</li>
                  </ul>
                </div>
              </div>
            </Rib>
          </Spine>

          {/* S12 — Substack close */}
          <Spine id="close" kicker="What this means for Substack">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              When the platform wins only if the customer wins, customer success{' '}
              <em style={{ color: ACCENT }}>is</em> the monetization model.
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-3xl">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-black text-2xl mb-2" style={{ color: ACCENT }}>
                  1
                </p>
                <p className="font-bold">Deliver real customer value.</p>
                <p className="text-sm text-neutral-600 mt-2">
                  Merchants: fraud prevented, trust, funding. Creators: discovery, reader conversion, monetization
                  infrastructure.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-black text-2xl mb-2" style={{ color: ACCENT }}>
                  2
                </p>
                <p className="font-bold">Make that value legible.</p>
                <p className="text-sm text-neutral-600 mt-2">
                  Fees were legible; value wasn&apos;t. Value-attribution reporting —{' '}
                  <span className="font-semibold" style={{ color: ACCENT }}>
                    in development, not shipped
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="mt-12 rounded-2xl p-8 md:p-10 text-white" style={{ background: '#0b0d12' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-5" style={{ color: ACCENT_DARK }}>
                Three principles I&apos;d bring
              </p>
              <ol className="space-y-3 text-lg text-neutral-200 list-decimal pl-5 max-w-3xl font-semibold">
                {PRINCIPLES.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
                Understand what makes your best customers successful — deliver it earlier, defend it when it weakens,{' '}
                <span style={{ color: ACCENT_DARK }}>and scale the system that does both</span>.
              </p>
            </div>
            <Note>
              If asked about other platforms: same pattern held at every success-based business I&apos;ve touched —
              the customer isn&apos;t buying software access; the platform earns when they do. Close: “That&apos;s the
              operating model I&apos;d bring to creators — without forcing independents and big publishers into
              identical experiences.”
            </Note>
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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReview(!review)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold border shadow-sm transition-colors ${
                    review ? 'text-white border-transparent' : 'bg-white border-neutral-300 text-neutral-600 hover:border-neutral-500'
                  }`}
                  style={review ? { background: FILL } : undefined}
                >
                  {review ? 'Review mode on' : 'Review mode'}
                </button>
                <button
                  type="button"
                  onClick={() => setNotes(!notes)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold border shadow-sm transition-colors ${
                    notes ? 'text-white border-transparent' : 'bg-white border-neutral-300 text-neutral-600 hover:border-neutral-500'
                  }`}
                  style={notes ? { background: ACCENT } : undefined}
                >
                  {notes ? 'Notes on' : 'Notes'}
                </button>
              </div>
            </div>
          )}
        </main>
      </NotesCtx.Provider>
    </ReviewCtx.Provider>
  )
}
