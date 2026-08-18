'use client'

import { ArtifactModal, Guardrail, Note, Sticky } from './primitives'
import { Quadrant, StageLadder } from './charts'
import {
  ArtifactAssumptionMap,
  ArtifactBetsBoard,
  ArtifactHMWBoard,
  ArtifactLearningBoard,
  ArtifactMetricsBoard,
  ArtifactSwimlane,
} from './artifacts'
import { BETS, CATEGORIES, CLUSTERS, DIVE_STEPS, FLOW_LAYERS, MATRIX } from './data'
import { ACCENT, FILL, INK, TINT } from './tokens'
import { Flag } from './primitives'

export function DivePanel({
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

export function DeepDive({ onBack }: { onBack: () => void }) {
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
        <ArtifactModal
          label="The hypothesis-metrics board — all six problem spaces"
          title="Problem spaces → hypothesis metrics (the working board)"
        >
          <ArtifactMetricsBoard />
        </ArtifactModal>
        <Note>
          “Is pricing causing churn?” lives at L0 — no team can act on it. The whole move is walking it down to L4:
          metrics with agency. Emphasize the tags are correlational exposure flags — that honesty sets up the pivot.
        </Note>
      </DivePanel>

      {/* 02 — diverge */}
      <DivePanel id="dive-b2" num="02" step="Diverge" title="Seven clusters, about forty candidate bets" tint>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CLUSTERS.map((c, i) => (
            <Sticky
              key={c.name}
              tone={c.gap ? 'orange' : 'green'}
              tilt={[-1.2, 0.8, -0.6, 1.1, -0.9, 0.7, -1.4][i]}
              highlight={c.gap}
            >
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
                <tr
                  key={b.bet}
                  className={`border-b border-neutral-100 ${b.dead ? 'text-neutral-400' : ''}`}
                  style={b.hot ? { background: TINT } : undefined}
                >
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
        <ArtifactModal
          label="The ideation board — raw idea wall + all seven HMW clusters in full"
          title="HMW clustering (the working board)"
        >
          <ArtifactHMWBoard />
        </ArtifactModal>
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
        <ArtifactModal
          label="The bets board — full triage table, seven opportunity areas, outstanding questions"
          title="Small and large bets (the working board)"
        >
          <ArtifactBetsBoard />
        </ArtifactModal>
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
                    <span
                      className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded align-middle"
                      style={{ background: TINT, color: ACCENT }}
                    >
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
        <ArtifactModal
          label="The journey swimlane — merchant, portal, backend, comms"
          title="User-journey swimlane (the working board)"
        >
          <ArtifactSwimlane />
        </ArtifactModal>
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
                  <Sticky tone={c.tone} tilt={[-0.8, 0.6, -0.5, 0.9, -0.7][i]}>
                    {c.ex}
                  </Sticky>
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
        <ArtifactModal
          label="The assumption map — five categories × four journey phases"
          title="Assumption map (the working board)"
        >
          <ArtifactAssumptionMap />
        </ArtifactModal>
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
        <ArtifactModal
          label="The learning-plan board — prelaunch vs. post-launch, in full"
          title="Learning plan (the working board)"
        >
          <ArtifactLearningBoard />
        </ArtifactModal>
      </DivePanel>

      {/* 07 — scale */}
      <DivePanel id="dive-b7" num="07" step="Earn scale" title="Phone calls → product-assisted → automated">
        <p className="mb-8 text-base font-semibold text-neutral-600">
          ~403K merchants scored by the model →{' '}
          <span style={{ color: ACCENT }}>~300K survived the eligibility policy</span> → 2,000 called first.
        </p>
        <StageLadder />
        <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
          <span style={{ color: ACCENT }}>Automation wasn&apos;t delayed — it was withheld until earned.</span>
        </p>
      </DivePanel>

      {/* 08 — results */}
      <DivePanel id="dive-b8" num="08" step="Read the results honestly" title="What the numbers said — and didn’t" tint>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="px-5 py-3 font-bold">Stages 1–2 · concierge + assisted</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      ~$100M TPV · ~$2M margin
                      <Flag kind="assumption" note="Recollection; counterfactual method to validate" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-bold">Stage 3 · automated (landed after the pivot)</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      ~$350M TPV · ~$7M margin
                      <Flag kind="assumption" note="Per Nick; counterfactual method to validate" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-neutral-500 max-w-md">
              Read against comparison groups, from merchants who had been declining or plateauing.
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
