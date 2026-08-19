'use client'

import { Fragment } from 'react'
import { Flag, Sticky } from './primitives'
import {
  ASSUMPTION_MAP,
  ATTR_COLS,
  ATTR_ROWS,
  ATTR_TOTALS,
  BETS_FULL,
  BET_AREAS,
  HMW_DETAIL,
  IDEA_WALL,
  METRIC_BOARD,
  SWIMLANES,
  SWIM_STAGES,
} from './data'
import { ACCENT, TINT } from './tokens'

const HEADER_BG = '#12294f'

export function ArtifactAttribution() {
  const fmt = (n: number) => (n >= 1000 ? `−$${(n / 1000).toFixed(2)}B` : `−$${n.toFixed(1)}M`)
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-[13px] min-w-[720px]">
          <thead>
            <tr className="text-left text-white" style={{ background: HEADER_BG }}>
              <th className="px-4 py-2.5 font-semibold">Reason code</th>
              {ATTR_COLS.map((c) => (
                <th key={c} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATTR_ROWS.map(([name, ...vals]) => (
              <tr key={name as string} className="border-b border-neutral-100 odd:bg-neutral-50/60">
                <td className="px-4 py-2 font-bold whitespace-nowrap">{name}</td>
                {(vals as number[]).map((v, i) => (
                  <td key={i} className={`px-3 py-2 whitespace-nowrap ${i >= 3 ? 'font-semibold' : 'text-neutral-600'}`}>
                    {fmt(v)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="font-black" style={{ background: TINT }}>
              <td className="px-4 py-2.5">Grand total</td>
              {ATTR_TOTALS.map((v, i) => (
                <td key={i} className="px-3 py-2.5 whitespace-nowrap">
                  {fmt(v)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-neutral-700">
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-1.5">Callout</p>
          The alerting model was ~3 weeks old at this snapshot — the best available line of sight into controllable
          factors, honestly labeled as young.
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-1.5">Macro bracket</p>
          Bankruptcy + inactive + seasonality ≈ 6% of monthly HV/EHV contraction — explicitly marked “not controllable
          by PayPal.”
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-1.5">Tagging rules (examples)</p>
          Pricing = base fees ↑ ≥3bps in prior 6 months, or priced above tiered benchmark · Risk = holds/reserves &gt;$5K
          · Tech = &gt;5% decline in conversion or auth rates.
        </div>
      </div>
    </div>
  )
}

export function ArtifactMetricsBoard() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {METRIC_BOARD.map((col) => (
        <div key={col.space} className="rounded-xl border border-neutral-200 overflow-hidden">
          <p className="px-4 py-2 font-bold text-sm text-white" style={{ background: HEADER_BG }}>
            {col.space}
          </p>
          <table className="w-full text-[12px]">
            <tbody>
              {col.rows.map(([m, q]) => (
                <tr key={m} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-2 font-semibold w-3/5">{m}</td>
                  <td className="px-3 py-2 text-neutral-500 italic">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export function ArtifactHMWBoard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-bold text-sm mb-3 text-neutral-500">Raw idea wall (sample — the full board held dozens)</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {IDEA_WALL.map((t, i) => (
            <Sticky key={t} tone="blue" tilt={[-1.1, 0.9, -0.7, 1.2, -0.5, 0.8, -1.3, 0.6][i]}>
              {t}
            </Sticky>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-sm mb-3 text-neutral-500">Synthesized HMW clusters, each tied back to a metric</p>
        <div className="grid md:grid-cols-2 gap-4">
          {HMW_DETAIL.map((c) => (
            <div key={c.name} className="rounded-xl border p-5" style={{ borderColor: '#e5e5e5', background: '#F3FAF3' }}>
              <p className="font-black text-sm">{c.name}</p>
              <p className="text-sm text-neutral-600 italic mt-0.5 mb-2.5">{c.q}</p>
              <ul className="space-y-1.5 text-[13px] text-neutral-700 list-disc pl-4">
                {c.hmws.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-bold text-neutral-500">Primary metric: {c.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ArtifactBetsBoard() {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-[12.5px] min-w-[860px]">
          <thead>
            <tr className="text-left text-white" style={{ background: HEADER_BG }}>
              {['Candidate bet', 'What it looks like', 'MoSCoW', 'Key metrics', 'Guardrails', 'Notes'].map((h) => (
                <th key={h} className="px-3.5 py-2.5 font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BETS_FULL.map(([bet, looks, moscow, metrics, guard, notes, hot]) => (
              <tr
                key={bet as string}
                className={`border-b border-neutral-100 align-top ${moscow === 'Won’t Have' ? 'text-neutral-400' : ''}`}
                style={hot ? { background: TINT } : undefined}
              >
                <td className={`px-3.5 py-2.5 ${hot ? 'font-bold' : 'font-semibold'}`}>{bet}</td>
                <td className="px-3.5 py-2.5">{looks}</td>
                <td className="px-3.5 py-2.5 whitespace-nowrap">{moscow}</td>
                <td className="px-3.5 py-2.5">{metrics}</td>
                <td className="px-3.5 py-2.5">{guard}</td>
                <td className="px-3.5 py-2.5 italic">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-bold text-sm mb-3 text-neutral-500">Seven opportunity areas — each with its own key metric</p>
          <div className="space-y-2">
            {BET_AREAS.map(([a, m]) => (
              <div key={a} className="rounded-lg border border-neutral-200 px-4 py-2.5 text-[13px]">
                <span className="font-bold">{a}.</span> <span className="text-neutral-600">{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border-2 p-5" style={{ borderColor: '#E8A33D', background: '#FFF8EC' }}>
          <p className="font-black text-sm mb-3">Outstanding questions (from the actual board)</p>
          <ul className="space-y-2 text-[13px] text-neutral-700 list-disc pl-4">
            <li>Product-specific pricing — checkout vs. invoicing vs. working-capital pricing?</li>
            <li>Segment-specific strategies — do different merchant types need different pricing rules?</li>
            <li>Lifecycle triggers — first 90 days, anniversaries, post-support moments?</li>
            <li>Geographic expansion — US first; compatibility with CA / DE / UK rollout?</li>
            <li>Partner &amp; channel pricing — ISVs, platforms, referral, partner-negotiated rates?</li>
          </ul>
          <p className="mt-3 text-xs font-bold" style={{ color: ACCENT }}>
            Every one of these became a later chapter: profiles, upstream, global, partners.
          </p>
        </div>
      </div>
    </div>
  )
}

export function ArtifactSwimlane() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="grid" style={{ gridTemplateColumns: '120px repeat(8, 1fr)' }}>
          <div />
          {SWIM_STAGES.map((s) => (
            <p key={s} className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wide text-neutral-400 text-center">
              {s}
            </p>
          ))}
          {SWIMLANES.map((l) => (
            <Fragment key={l.lane}>
              <p className="pr-3 py-3 text-sm font-black flex items-center border-t border-neutral-200">{l.lane}</p>
              {l.cells.map((c, i) => (
                <div key={`${l.lane}-${i}`} className="border-t border-neutral-200 p-1.5 flex items-stretch">
                  {c && (
                    <Sticky
                      tone={l.lane === 'Backend systems' ? 'blue' : 'yellow'}
                      tilt={0}
                      className="w-full !text-[11.5px] flex items-center"
                    >
                      {c}
                    </Sticky>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          The negotiate path — merchant submits a competitor rate, the system verifies legitimacy and counters — was
          part of the designed flow.
          <Flag kind="assumption" note="Designed in the artifacts; shipped scope of the counter-offer path to be validated" />
        </p>
      </div>
    </div>
  )
}

export function ArtifactAssumptionMap() {
  const phases = ['Reach', 'Present', 'Negotiate', 'Reinforce']
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px]">
        <div className="grid gap-2" style={{ gridTemplateColumns: '110px repeat(4, 1fr)' }}>
          <div />
          {phases.map((p) => (
            <p key={p} className="px-2 pb-1 text-xs font-black uppercase tracking-wide text-center" style={{ color: ACCENT }}>
              {p}
            </p>
          ))}
          {ASSUMPTION_MAP.map((row) => (
            <Fragment key={row.cat}>
              <div className="flex items-center gap-2 pr-2">
                <div className="w-1.5 self-stretch rounded-full" style={{ background: row.color }} />
                <p className="text-[11px] font-black uppercase tracking-wide leading-tight" style={{ color: row.color }}>
                  {row.cat}
                </p>
              </div>
              {row.phases.map((cell, i) => (
                <div key={`${row.cat}-${i}`} className="space-y-1.5 p-1">
                  {cell.map((a, j) => (
                    <Sticky key={a} tone={row.tone} tilt={j % 2 ? 0.7 : -0.7} className="!text-[11.5px]">
                      {a}
                    </Sticky>
                  ))}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          ~200 assumptions on the original map — this recreation shows a representative sample per cell.
        </p>
      </div>
    </div>
  )
}

export function ArtifactLearningBoard() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-xl border border-neutral-200 p-5" style={{ background: '#FDFAF0' }}>
        <p className="font-black mb-4">Prelaunch</p>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">
              UX — interviews · prototype · design gut
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              <Sticky tone="orange" highlight tilt={-1}>
                “If pricing wasn’t actually their primary concern, we’ll figure out what is.”
              </Sticky>
              <Sticky tone="yellow" tilt={0.8}>Do they want to self-serve this — or talk to a human?</Sticky>
              <Sticky tone="yellow" tilt={-0.5}>Need time to think without losing the offer</Sticky>
              <Sticky tone="yellow" tilt={0.6}>Once accepted, do they know it actually went through?</Sticky>
            </div>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">“Just Ask” — one column per function</p>
            <div className="grid sm:grid-cols-2 gap-2 text-[12px]">
              {[
                ['Data teams', 'Can we predict churn accurately? No interference with unresolved holds?'],
                ['Legal / compliance', 'Differential pricing legal? No discrimination against protected classes?'],
                ['Engineering', 'Track the full decision tree and funnel? Real-time savings calc?'],
                ['Marketing', 'Will the email channel read as legitimate? Opt-outs respected, campaigns coordinated?'],
                ['Pricing', 'Escalation options — discount, refund, outreach? Rep capacity at volume?'],
                ['Commercial', 'Enough decliners to justify the system? How long till churn impact shows?'],
              ].map(([f, q]) => (
                <div key={f} className="rounded-lg p-3" style={{ background: '#F3EFFB' }}>
                  <p className="font-bold">{f}</p>
                  <p className="text-neutral-600 mt-0.5">{q}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">
              Technical investigations — spikes the team actually ran
            </p>
            <div className="grid sm:grid-cols-2 gap-2 items-start">
              <Sticky tone="purple" tilt={-0.6}>
                Can the pricing platform take thousands of per-merchant overrides — and give them all back?
              </Sticky>
              <Sticky tone="purple" tilt={0.7}>
                What is the propagation lag from rate change to the transaction path?
              </Sticky>
              <Sticky tone="purple" tilt={-0.5}>
                Precedence: what happens when a promo rate meets a contract renegotiation?
              </Sticky>
              <Sticky tone="purple" tilt={0.6}>
                Can model output render in the Portal inside the page-load budget?
              </Sticky>
              <Sticky tone="purple" tilt={-0.8}>
                Can email read the same eligibility source as the Portal, not a nightly copy?
              </Sticky>
              <Sticky tone="purple" tilt={0.5}>
                Can holdout suppression be guaranteed across every channel?
              </Sticky>
              <Sticky tone="purple" tilt={-0.6}>
                Where do we store consent, with the terms version the merchant actually saw?
              </Sticky>
              <Sticky tone="purple" tilt={0.8}>
                Can we reconstruct which offer a given merchant was shown, months later?
              </Sticky>
              <Sticky tone="purple" tilt={-0.4}>
                Continuity between the self-service flow and a required human intervention
              </Sticky>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 p-5" style={{ background: '#F0F6FD' }}>
        <p className="font-black mb-4">Post-launch</p>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">
              A/B testing — content · visual · placement · timing
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              <Sticky tone="blue" tilt={0.7}>Recognized-as-valuable framing vs. generic discount copy</Sticky>
              <Sticky tone="blue" tilt={-0.8}>“You’d save $X” vs. percentages</Sticky>
              <Sticky tone="blue" tilt={0.5}>When is the right moment to intervene — not too early, not too late?</Sticky>
              <Sticky tone="blue" tilt={-0.4}>Is the offer visible without taking over the page?</Sticky>
            </div>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">Analytics — usage · guardrails · KPIs</p>
            <div className="grid sm:grid-cols-2 gap-2">
              <Sticky tone="gray" tilt={0.6}>Guardrail: not cannibalizing merchants who would have stayed</Sticky>
              <Sticky tone="gray" tilt={-0.7}>Guardrail: not training merchants to reject first</Sticky>
              <Sticky tone="gray" tilt={0.4}>KPI: saved merchants retain at higher rates — the intervention works</Sticky>
            </div>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-2">Research — surveys · interviews</p>
            <div className="grid sm:grid-cols-2 gap-2">
              <Sticky tone="yellow" tilt={-0.6}>Does the offer feel relevant to their situation — or surveilled?</Sticky>
              <Sticky tone="yellow" tilt={0.8}>Are the terms clear and not deceptive?</Sticky>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
