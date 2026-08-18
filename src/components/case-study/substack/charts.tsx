'use client'

import { useState } from 'react'
import { Flag, useInView } from './primitives'
import { DIVES, FINDINGS, MONEY_MAP, QUADRANT, STAGES } from './data'
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

export function InterviewGrid() {
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
