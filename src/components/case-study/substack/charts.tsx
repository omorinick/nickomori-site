'use client'

import { useState } from 'react'
import { Flag, useInView } from './primitives'
import {
  ASSUMPTIONS,
  ASSUMPTION_CATS,
  DIVES,
  GATES,
  LEARNING_METHODS,
  FINDINGS,
  LIFECYCLE,
  MONEY_MAP,
  QUADRANT,
  SHIPPED_BETS,
  STAGES,
  TPV_CAPTIONS,
  TPV_YEARS,
  TRACKS,
} from './data'
import { ACCENT, FILL, INK, TINT } from './tokens'

export function MoneyMap() {
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

export function StageLadder() {
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
            {/* True proportion of the cohort — a 5% bar should look like 5%. */}
            <div className="mt-3 h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div className="h-2 rounded-full" style={{ width: `${s.rate}%`, background: FILL }} />
            </div>
            <p className="mt-1.5 text-[10px] uppercase tracking-wide text-neutral-400">share of cohort</p>
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

export function InterviewGrid() {
  const [active, setActive] = useState(1)
  const f = FINDINGS[active]
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
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
        <p className="mt-5 text-sm text-neutral-500">
          <strong style={{ color: INK }}>
            {f.n} of 20
          </strong>{' '}
          — {f.label.toLowerCase()}
          <Flag
            kind={f.real ? 'assumption' : 'unresolved'}
            note={
              f.real
                ? 'Nick’s corrected figure — validate against the study'
                : 'PLACEHOLDER — reconstructed count designed to fit the narrative; replace with the real study'
            }
          />
        </p>
        <div className="mt-4 rounded-xl px-4 py-3 text-sm" style={{ background: TINT, color: ACCENT }}>
          <span className="font-bold">{f.seeds}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {FINDINGS.map((x, i) => (
          <button
            key={x.label}
            type="button"
            onClick={() => setActive(i)}
            className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
              i === active
                ? 'border-transparent text-black font-semibold'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
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

export function TracksMap() {
  const large = TRACKS.filter((t) => t.size === 'Large bet')
  const small = TRACKS.filter((t) => t.size === 'Small bet')
  const statusStyle = (s: string) =>
    s === 'Shipped'
      ? { background: '#E7F4E4', color: '#1f6b32' }
      : s === 'In flight'
        ? { background: TINT, color: ACCENT }
        : { background: '#f5f5f5', color: '#737373' }

  return (
    <div className="mt-10 space-y-8">
      <div>
        <p className="font-bold text-xs uppercase tracking-widest text-neutral-400 mb-3">Large bets</p>
        <div className="grid md:grid-cols-2 gap-4">
          {large.map((t) => (
            <div key={t.name} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-black text-base">{t.name}</p>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shrink-0"
                  style={statusStyle(t.status)}
                >
                  {t.status}
                </span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{t.what}</p>
              {t.result && (
                <p className="mt-3 text-sm font-bold" style={{ color: ACCENT }}>
                  {t.result}
                  <Flag kind="assumption" note="Placeholder — awaiting Nick's figures" />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-xs uppercase tracking-widest text-neutral-400 mb-3">
          Small bets — the thousand paper cuts
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {small.map((t) => (
            <div key={t.name} className="rounded-xl border border-neutral-200 p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="font-bold text-sm">{t.name}</p>
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide whitespace-nowrap shrink-0"
                  style={statusStyle(t.status)}
                >
                  {t.status}
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{t.what}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LifecycleMap() {
  return (
    <div className="mt-10 grid md:grid-cols-5 gap-3">
      {LIFECYCLE.map((s) => (
        <div
          key={s.stage}
          className="rounded-xl border p-5 flex flex-col"
          style={
            s.state === 'active'
              ? { borderColor: FILL, background: TINT }
              : s.state === 'skipped'
                ? { borderColor: '#E8A33D', background: '#FFF8EC' }
                : { borderColor: '#e5e5e5', background: 'white' }
          }
        >
          <p
            className="font-black text-sm mb-2"
            style={{ color: s.state === 'active' ? ACCENT : s.state === 'skipped' ? '#8a5a12' : '#a3a3a3' }}
          >
            {s.stage}
          </p>
          <p className={`text-xs leading-relaxed ${s.state === 'none' ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {s.ours}
          </p>
        </div>
      ))}
    </div>
  )
}

export function UpstreamBars() {
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

export function Quadrant() {
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
          <text
            x={px(d.x, d.dx) + (d.hero ? 13 : 9)}
            y={py(d.y, d.dy) + 4}
            fontSize={10.5}
            fontWeight={d.hero ? 700 : 500}
            fill={d.hero ? ACCENT : '#404040'}
          >
            {d.id}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function DeepDives() {
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

// Merchant TPV waterfall — the shape of the opportunity. Acquisition and back-book growth pour in;
// churn and decline erases almost exactly the same amount, every year.
export function TpvWaterfall() {
  const years = Object.keys(TPV_YEARS)
  const [yr, setYr] = useState(years[1])
  const { ref, seen } = useInView()
  const steps = TPV_YEARS[yr]
  const yMin = 108
  const yMax = 156
  const pct = (v: number) => ((v - yMin) / (yMax - yMin)) * 100

  // Reduce rather than mutate a closure variable — each bar's floor is the running total so far.
  const bars = steps.reduce<{ rows: (typeof steps[number] & { bottom: number; top: number })[]; running: number }>(
    (acc, step) => {
      if (step.type === 'total') {
        acc.rows.push({ ...step, bottom: 0, top: pct(step.value) })
        return { rows: acc.rows, running: step.value }
      }
      const end = acc.running + step.value
      acc.rows.push({
        ...step,
        bottom: pct(Math.min(acc.running, end)),
        top: pct(Math.max(acc.running, end)),
      })
      return { rows: acc.rows, running: end }
    },
    { rows: [], running: 0 },
  ).rows

  const color = (t: string) => (t === 'total' ? '#181818' : t === 'down' ? '#C8102E' : FILL)

  return (
    <div className="mt-10 bg-white border border-neutral-200 rounded-2xl p-6 md:p-9">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <p className="font-bold text-lg md:text-xl">Merchant TPV — year over year</p>
        <div className="flex gap-1 bg-neutral-100 rounded-full p-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYr(y)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                yr === y ? 'text-white' : 'text-neutral-500 hover:text-neutral-800'
              }`}
              style={yr === y ? { background: ACCENT } : undefined}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div ref={ref} className="w-full">
        <div className="relative flex items-end gap-2 md:gap-4" style={{ height: '320px' }}>
          {bars.map((b, i) => (
            <div key={b.label} className="flex-1 relative h-full flex flex-col justify-end">
              <div className="absolute left-0 right-0 text-center" style={{ bottom: `calc(${b.top}% + 6px)` }}>
                <span
                  className="text-xs md:text-sm font-bold"
                  style={{ color: b.type === 'down' ? '#C8102E' : '#111' }}
                >
                  {b.type === 'total'
                    ? `$${b.value.toFixed(1)}B`
                    : `${b.value > 0 ? '+' : '−'}$${Math.abs(b.value).toFixed(1)}B`}
                </span>
              </div>
              <div
                className="rounded-t-sm"
                style={{
                  position: 'absolute',
                  left: '8%',
                  right: '8%',
                  bottom: `${b.bottom}%`,
                  height: seen ? `${b.top - b.bottom}%` : '0%',
                  background: color(b.type),
                  transition: `height .9s ease ${i * 0.15}s, bottom .9s ease ${i * 0.15}s`,
                  opacity: seen ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 md:gap-4 mt-3">
          {bars.map((b) => (
            <div key={b.label} className="flex-1 text-center text-[11px] md:text-xs text-neutral-500 leading-tight">
              {b.label}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-neutral-500 mt-5">
        {TPV_CAPTIONS[yr]}
        <Flag kind="assumption" note="Carried over from the merchant-experience commercial case — confirm before presenting" />
      </p>
    </div>
  )
}

// Shipped bets, in the front-end / back-end / impact format from Nick's commercial case.
export function ShippedBets() {
  const [open, setOpen] = useState<string | null>(SHIPPED_BETS[0].name)
  return (
    <div className="mt-10 space-y-4">
      {SHIPPED_BETS.map((b) => {
        const isOpen = open === b.name
        return (
          <div key={b.name} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : b.name)}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-neutral-50 transition-colors"
            >
              <span>
                <span className="block font-black text-xl md:text-2xl">{b.name}</span>
                <span className="block text-sm text-neutral-500 mt-0.5">{b.status}</span>
              </span>
              <span className="text-2xl font-light shrink-0 leading-none mt-1" style={{ color: FILL }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    ['Front end', b.front, false],
                    ['Back end', b.back, false],
                    ['Impact', b.impact, true],
                  ].map(([label, body, bold]) => (
                    <div key={label as string}>
                      <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: ACCENT }}>
                        {label}
                      </p>
                      <p className={`text-sm leading-relaxed ${bold ? 'font-bold text-neutral-800' : 'text-neutral-600'}`}>
                        {body}
                        {bold ? <Flag kind="assumption" note="Confirm figures before presenting" /> : null}
                      </p>
                    </div>
                  ))}
                </div>
                {b.alias && <p className="mt-5 text-xs text-neutral-400 italic">{b.alias}</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// The full assumption register, filterable by category. The point of showing all of it is that the
// volume is the method — this is what "what would have to be true" actually looks like.
export function AssumptionRegister() {
  const [cat, setCat] = useState<string>('All')
  const shown = cat === 'All' ? ASSUMPTIONS : ASSUMPTIONS.filter((a) => a.cat === cat)
  const colorOf = (c: string) => ASSUMPTION_CATS.find((x) => x.name === c)?.color ?? '#888'

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...ASSUMPTION_CATS.map((c) => c.name)].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              cat === c ? 'text-white border-transparent' : 'border-neutral-300 text-neutral-600 hover:border-neutral-500'
            }`}
            style={cat === c ? { background: c === 'All' ? INK : colorOf(c) } : undefined}
          >
            {c}
            {c !== 'All' && (
              <span className="ml-1.5 opacity-60">{ASSUMPTIONS.filter((a) => a.cat === c).length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">What would have to be true</th>
                <th className="px-3 py-3 font-semibold whitespace-nowrap">Phase</th>
                <th className="px-3 py-3 font-semibold whitespace-nowrap">Imp</th>
                <th className="px-3 py-3 font-semibold whitespace-nowrap">Unc</th>
                <th className="px-4 py-3 font-semibold">How we planned to find out</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-neutral-100 last:border-0 align-top"
                  style={a.hero ? { background: TINT } : undefined}
                >
                  <td className="px-4 py-3 font-black whitespace-nowrap" style={{ color: colorOf(a.cat) }}>
                    {a.id}
                  </td>
                  <td className={`px-4 py-3 ${a.hero ? 'font-bold' : ''}`}>{a.text}</td>
                  <td className="px-3 py-3 text-neutral-500 whitespace-nowrap">{a.phase}</td>
                  <td className="px-3 py-3 font-bold tracking-tighter" style={{ color: INK }}>
                    {'●'.repeat(a.imp)}
                  </td>
                  <td className="px-3 py-3 font-bold tracking-tighter" style={{ color: a.unc >= 4 ? '#C8102E' : '#a3a3a3' }}>
                    {'●'.repeat(a.unc)}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{a.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Importance and uncertainty are a reconstruction — the historical board carried no scores.
        <Flag kind="assumption" note="Scoring reconstructed; the sorting logic is real, the numbers are not" />
      </p>
    </div>
  )
}

// Importance × uncertainty. Everything in the top-right had to be retired before we could launch —
// except the one thing that could only be learned by launching.
export function AssumptionPlot() {
  const [hover, setHover] = useState<string | null>(null)
  const W = 720
  const H = 460
  const PAD = { l: 64, r: 24, t: 24, b: 56 }
  const colorOf = (c: string) => ASSUMPTION_CATS.find((x) => x.name === c)?.color ?? '#888'

  // Spread co-located points on a small deterministic spiral so nothing hides underneath.
  const placed = ASSUMPTIONS.map((a) => {
    const peers = ASSUMPTIONS.filter((b) => b.imp === a.imp && b.unc === a.unc)
    const idx = peers.findIndex((b) => b.id === a.id)
    const angle = (idx / Math.max(peers.length, 1)) * Math.PI * 2
    const radius = peers.length > 1 ? 0.17 + (idx % 2) * 0.1 : 0
    return { ...a, ox: Math.cos(angle) * radius, oy: Math.sin(angle) * radius }
  })

  const x = (unc: number, ox: number) => PAD.l + ((unc + ox - 1) / 4) * (W - PAD.l - PAD.r)
  const y = (imp: number, oy: number) => H - PAD.b - ((imp + oy - 1) / 4) * (H - PAD.t - PAD.b)

  const active = placed.find((a) => a.id === hover)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Assumptions by importance and uncertainty">
        <rect
          x={PAD.l + (W - PAD.l - PAD.r) / 2}
          y={PAD.t}
          width={(W - PAD.l - PAD.r) / 2}
          height={(H - PAD.t - PAD.b) / 2}
          fill={TINT}
          rx={8}
        />
        <text x={W - PAD.r - 10} y={PAD.t + 22} textAnchor="end" fontSize={12} fontWeight={800} fill={ACCENT}>
          RETIRE THESE FIRST
        </text>

        {[1, 2, 3, 4, 5].map((v) => (
          <g key={`g${v}`}>
            <line x1={x(v, 0)} y1={PAD.t} x2={x(v, 0)} y2={H - PAD.b} stroke="#f0f0f0" strokeWidth={1} />
            <line x1={PAD.l} y1={y(v, 0)} x2={W - PAD.r} y2={y(v, 0)} stroke="#f0f0f0" strokeWidth={1} />
          </g>
        ))}
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#d4d4d4" strokeWidth={1.5} />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#d4d4d4" strokeWidth={1.5} />
        <text x={(W + PAD.l) / 2} y={H - 16} textAnchor="middle" fontSize={12} fill="#737373">
          How uncertain we were →
        </text>
        <text
          x={18}
          y={(H - PAD.b + PAD.t) / 2}
          textAnchor="middle"
          fontSize={12}
          fill="#737373"
          transform={`rotate(-90 18 ${(H - PAD.b + PAD.t) / 2})`}
        >
          How much it mattered →
        </text>

        {placed.map((a) => (
          <g
            key={a.id}
            onMouseEnter={() => setHover(a.id)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={x(a.unc, a.ox)}
              cy={y(a.imp, a.oy)}
              r={a.hero ? 15 : hover === a.id ? 13 : 11}
              fill={a.hero ? FILL : colorOf(a.cat)}
              opacity={hover && hover !== a.id ? 0.25 : a.hero ? 1 : 0.85}
              stroke={a.hero ? ACCENT : 'white'}
              strokeWidth={a.hero ? 3 : 1.5}
            />
            <text
              x={x(a.unc, a.ox)}
              y={y(a.imp, a.oy) + 4}
              textAnchor="middle"
              fontSize={10}
              fontWeight={800}
              fill="white"
              pointerEvents="none"
            >
              {a.id}
            </text>
          </g>
        ))}
      </svg>

      <div
        className="mt-4 rounded-xl border px-5 py-4 min-h-[86px]"
        style={active ? { borderColor: colorOf(active.cat), background: '#fff' } : { borderColor: '#e5e5e5' }}
      >
        {active ? (
          <>
            <p className="font-black text-sm" style={{ color: colorOf(active.cat) }}>
              {active.id} · {active.cat} · {active.phase}
            </p>
            <p className="mt-1 text-sm font-bold">{active.text}</p>
            <p className="mt-1 text-sm text-neutral-500">{active.method}</p>
          </>
        ) : (
          <p className="text-sm text-neutral-500">
            Hover any dot to read the assumption. <strong style={{ color: ACCENT }}>V1</strong> is the outlined one —
            top-right, and the only assumption on the board we could not retire before launching.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {ASSUMPTION_CATS.map((c) => (
          <span key={c.name} className="flex items-center gap-1.5 text-xs text-neutral-600">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  )
}

// The learning plan: methods ordered by what they cost, each carrying the assumptions it retired.
export function LearningPlanDetail() {
  const colorOf = (c: string) => ASSUMPTION_CATS.find((x) => x.name === c)?.color ?? '#888'
  const byId = (id: string) => ASSUMPTIONS.find((a) => a.id === id)

  return (
    <div className="mt-10 space-y-3">
      {LEARNING_METHODS.map((m, i) => (
        <div key={m.name} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="px-6 py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-black text-lg">
                <span className="mr-3 text-neutral-300">{i + 1}</span>
                {m.name}
              </p>
              <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wide">
                <span className="px-2 py-0.5 rounded" style={{ background: '#f5f5f5', color: '#737373' }}>
                  {m.cost}
                </span>
                <span className="px-2 py-0.5 rounded" style={{ background: TINT, color: ACCENT }}>
                  {m.when}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-3xl">{m.what}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.retired.map((id) => {
                const a = byId(id)
                if (!a) return null
                return (
                  <span
                    key={id}
                    title={a.text}
                    className="px-2 py-0.5 rounded text-[11px] font-bold text-white"
                    style={{ background: colorOf(a.cat) }}
                  >
                    {id}
                  </span>
                )
              })}
            </div>
            {m.note && (
              <p className="mt-4 text-sm font-bold" style={{ color: ACCENT }}>
                {m.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// The gates. Each one bought the next stage of investment.
export function GateStrip() {
  return (
    <div className="mt-10 grid md:grid-cols-4 gap-4">
      {GATES.map((g) => (
        <div key={g.id} className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col">
          <p className="font-black text-2xl" style={{ color: ACCENT }}>
            {g.id}
          </p>
          <p className="font-bold text-sm mt-1">{g.name}</p>
          <p className="text-xs text-neutral-500 mt-3 flex-1">{g.ask}</p>
          <p className="text-xs text-neutral-700 mt-4 pt-3 border-t border-neutral-200">
            <span className="font-bold uppercase tracking-wide text-[10px] text-neutral-400 block mb-1">Evidence</span>
            {g.evidence}
          </p>
          <p className="text-xs font-bold mt-3" style={{ color: ACCENT }}>
            {g.outcome}
          </p>
        </div>
      ))}
    </div>
  )
}
