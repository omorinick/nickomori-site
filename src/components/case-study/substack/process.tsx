'use client'

import { ArtifactModal, Flag, Guardrail, Note, Sticky } from './primitives'
import { AssumptionPlot, AssumptionRegister, GateStrip, LearningPlanDetail, StageLadder } from './charts'
import {
  ArtifactAssumptionMap,
  ArtifactBetsBoard,
  ArtifactHMWBoard,
  ArtifactLearningBoard,
  ArtifactMetricsBoard,
  ArtifactSwimlane,
} from './artifacts'
import { CLUSTERS, FLOW_LAYERS, JOURNEY_PHASES, PROPRIETARY_LINE } from './data'
import { ACCENT, ACCENT_DARK, FILL, INK, TINT } from './tokens'

// The working-process sections. These are ordinary slides in the run of show — no step numbers,
// because by this point it is all one continuous story about the first bet.
export function ProcessPanel({
  id,
  kicker,
  title,
  tint,
  children,
}: {
  id: string
  kicker: string
  title: string
  tint?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-slide-id={id}
      className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-20 scroll-mt-16"
      style={{ background: tint ? '#f4f7fb' : 'white', color: INK }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <p className="font-semibold tracking-[0.18em] uppercase text-xs mb-4" style={{ color: ACCENT }}>
          {kicker}
        </p>
        <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl mb-12 max-w-4xl">{title}</h2>
        {children}
      </div>
    </section>
  )
}

/* ---------- Decompose: problem spaces into levers ---------- */

export function DecomposeSection() {
  return (
    <ProcessPanel
      id="decompose"
      kicker="Making it actionable"
      title="An abstract problem needs a lever you can actually pull."
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
        <div className="space-y-3 text-[15px]">
          {[
            ['Business outcome', 'Portfolio TPV decline — lagging, nobody can act on it'],
            ['Economic attribution', 'Contraction dollars by tier, geography and reason'],
            ['Problem spaces', 'Six ownable spaces, plus an honest untagged remainder'],
            ['Problem indicators', 'Exposure flags — not diagnoses'],
            ['Levers', 'Proxy metrics a team can move next sprint'],
            ['Guardrails', 'Margin, gaming, support noise'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 items-baseline">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: FILL }} />
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
              understand the fees → see the value behind them → get shown a proactive offer → act on it → speed from
              signal to offer
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
            <p className="font-bold mb-2">
              Risk — an <span style={{ color: ACCENT }}>operational</span> funnel
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              surfaced within 24h → actually seen → acted on within 24/48/72h → resolved before account impact →
              resolved self-serve
            </p>
          </div>
        </div>
      </div>
      <p className="mt-10 text-lg md:text-xl font-bold max-w-3xl">
        When the thing you care about is intangible, you need proxies —{' '}
        <span style={{ color: ACCENT }}>metrics a team can move on a Tuesday.</span>
      </p>
      <ArtifactModal
        label="The hypothesis-metrics board — all six problem spaces"
        title="Problem spaces → hypothesis metrics (the working board)"
      >
        <ArtifactMetricsBoard />
      </ArtifactModal>
      <Note>
        “Is pricing causing churn?” is not something any team can act on. The whole move is walking it down until it
        becomes a funnel with an owner. Emphasise that the reason tags are correlational exposure flags — that
        honesty is what sets up the pivot later.
      </Note>
    </ProcessPanel>
  )
}

/* ---------- HMWs ---------- */

export function HmwSection() {
  return (
    <ProcessPanel
      id="hmw"
      kicker="Diverge"
      title="We turned the spaces into questions, then opened them to the room."
      tint
    >
      <p className="text-lg text-neutral-700 max-w-3xl -mt-6 mb-10">
        Designers, engineers and analysts in the same session. Seven clusters came out of it, each tied back to a
        metric we had already sized.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLUSTERS.map((c, i) => (
          <Sticky key={c.name} tone="green" tilt={[-1.2, 0.8, -0.6, 1.1, -0.9, 0.7, -1.4][i]}>
            <p className="font-bold text-sm mb-1">{c.name}</p>
            <p className="text-xs text-neutral-600 leading-snug">{c.q}</p>
          </Sticky>
        ))}
      </div>
      <ArtifactModal
        label="The ideation board — raw idea wall and all seven clusters in full"
        title="HMW clustering (the working board)"
      >
        <ArtifactHMWBoard />
      </ArtifactModal>
      <Note>Click straight into the artifact here and talk over it rather than reading the stickies aloud.</Note>
    </ProcessPanel>
  )
}

/* ---------- Bets ---------- */

export function BetsSection() {
  return (
    <ProcessPanel id="bets" kicker="Converge" title="Then we sized them as small and large bets.">
      <p className="text-lg text-neutral-700 max-w-3xl -mt-6 mb-4">
        Every candidate got the same treatment: what it looks like to a merchant, the metric that would tell us it
        worked, and the guardrail that would tell us it was going wrong.
      </p>
      <p className="text-sm text-neutral-500 max-w-3xl mb-10 italic">{PROPRIETARY_LINE}</p>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
        <ArtifactBetsBoard />
      </div>
      <p className="mt-10 text-lg md:text-xl font-bold max-w-3xl">
        The most-voted idea never shipped.{' '}
        <span style={{ color: ACCENT }}>Votes located conviction — judgment did the sequencing.</span>
      </p>
      <Note>
        If they push on the voting: stars showed me where the energy was, not what to build. Peer comparison drew the
        most votes and I killed it — we did not trust the data, and it invites merchants to go shopping.
      </Note>
    </ProcessPanel>
  )
}

/* ---------- Design the experience ---------- */

export function DesignSection() {
  return (
    <ProcessPanel id="design" kicker="Design" title="We mapped the experience end to end." tint>
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {JOURNEY_PHASES.map((p, i) => (
          <div key={p} className="flex items-center gap-3">
            <span
              className="px-5 py-2.5 rounded-full text-sm font-bold border"
              style={{ borderColor: FILL, color: ACCENT, background: 'white' }}
            >
              {p}
            </span>
            {i < JOURNEY_PHASES.length - 1 && (
              <span className="font-black" style={{ color: FILL }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
        <ArtifactSwimlane />
      </div>
      <div className="mt-10 space-y-3">
        {FLOW_LAYERS.map((l) => (
          <div key={l.layer} className="rounded-xl bg-white border border-neutral-200 px-6 py-4 flex items-start gap-5">
            <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: FILL }} />
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
      <p className="mt-10 text-lg md:text-xl font-bold max-w-3xl">
        Signal says <em>who is declining</em>; policy says <em>who can safely get a rate change</em>.{' '}
        <span style={{ color: ACCENT }}>Keeping those separate is what made everything later reusable.</span>
      </p>
    </ProcessPanel>
  )
}

/* ---------- Assumptions ---------- */

export function AssumptionsSection() {
  return (
    <ProcessPanel
      id="assumptions"
      kicker="De-risk"
      title="Then we wrote down everything that would have to be true."
    >
      <p className="text-lg text-neutral-700 max-w-3xl -mt-6">
        About two hundred stickies went on the board. These are the ones that actually drove decisions — sorted by
        how much each mattered and how little we knew about it. Filter to Feasibility for the questions the
        engineers went away and answered, and to Legal &amp; ethical for the ones that turned out to be engineering
        problems wearing a legal hat.
      </p>
      <AssumptionRegister />
      <div className="mt-16 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
        <AssumptionPlot />
      </div>
      <div className="mt-8 rounded-2xl p-7 text-white max-w-3xl" style={{ background: '#0b0d12' }}>
        <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
          The one we could not retire
        </p>
        <p className="text-lg md:text-xl font-bold leading-snug">
          V1 — can these merchants actually respond? Every method we had could tell us whether they{' '}
          <em>understood</em> the offer. None of them could tell us whether they could{' '}
          <span style={{ color: ACCENT_DARK }}>act</span> on it.
        </p>
        <p className="mt-4 text-base text-neutral-300 leading-relaxed">
          That single unanswerable assumption is the entire reason the first version was people on phones.
        </p>
      </div>
      <ArtifactModal
        label="The assumption map — categories × journey phases, as it was on the wall"
        title="Assumption map (the working board)"
      >
        <ArtifactAssumptionMap />
      </ArtifactModal>
      <Note>
        If probed on rigor: importance × uncertainty, judgment applied after, and the legal and organizational rows
        treated as binary gates rather than experiments — you do not A/B test whether something is lawful.
      </Note>
    </ProcessPanel>
  )
}

/* ---------- Learning plan ---------- */

export function LearningPlanSection() {
  return (
    <ProcessPanel
      id="learning-plan"
      kicker="Plan the learning"
      title="Then we matched every assumption to the cheapest way to kill it."
      tint
    >
      <p className="text-lg text-neutral-700 max-w-3xl -mt-6">
        This is the part of my process I would most want to hand to another team. Order the methods by what they
        cost you, then never spend an expensive one on a question a cheap one can answer.
      </p>
      <LearningPlanDetail />
      <div className="mt-16">
        <p className="font-bold uppercase tracking-widest text-[11px] text-neutral-400 mb-2">
          And the gates that came out of it
        </p>
        <p className="text-lg text-neutral-700 max-w-3xl">
          Each stage had to buy the next one. Nothing was funded on the promise of the thing before it working.
        </p>
        <GateStrip />
      </div>
      <div className="mt-14 flex flex-col md:flex-row gap-6 items-start">
        <Sticky tone="orange" highlight tilt={-1} className="max-w-xs">
          <strong>From the actual plan:</strong> “If pricing wasn&apos;t actually their primary concern, we&apos;ll
          figure out what is.”
        </Sticky>
        <p className="text-base text-neutral-700 flex-1 max-w-xl">
          We wrote the pivot down before we launched. Manual operations weren&apos;t a shortcut — they were the
          learning strategy, and engineering deliberately waited until the gates had been passed.
        </p>
      </div>
      <ArtifactModal
        label="The learning-plan board — prelaunch and post-launch, in full"
        title="Learning plan (the working board)"
      >
        <ArtifactLearningBoard />
      </ArtifactModal>
    </ProcessPanel>
  )
}

/* ---------- Scale ---------- */

export function StagesSection() {
  return (
    <ProcessPanel id="stages" kicker="Earn the scale" title="Phone calls, then product, then automation.">
      <p className="text-lg text-neutral-700 max-w-3xl -mt-6 mb-10">
        ~403K merchants flagged →{' '}
        <span className="font-bold" style={{ color: ACCENT }}>
          ~300K survived the eligibility policy
        </span>{' '}
        → 2,000 called first.
        <Flag kind="assumption" note="Funnel volumes per Nick — validate against records" />
      </p>
      <StageLadder />
      <p className="mt-10 text-lg md:text-xl font-bold max-w-3xl">
        <span style={{ color: ACCENT }}>Automation wasn&apos;t delayed — it was withheld until it was earned.</span>
      </p>
      <Note>
        The jump from 20% to 30% wasn&apos;t a better offer — it was better sequencing. Automation let us reach the
        right merchant at the right moment instead of in whatever batch ops got to that week.
      </Note>
    </ProcessPanel>
  )
}

/* ---------- Results ---------- */

export function ResultsSection() {
  return (
    <ProcessPanel id="results" kicker="Read it honestly" title="What the numbers said — and what they didn’t." tint>
      <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
              <th className="px-5 py-3 font-semibold">Stage</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Net growth TPV</th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap">Net growth margin</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="px-5 py-3 font-bold">Call pilot + product-assisted</td>
              <td className="px-3 py-3 whitespace-nowrap font-semibold">~$100M</td>
              <td className="px-3 py-3 whitespace-nowrap font-semibold">
                ~$2M
                <Flag kind="assumption" note="Recollection; counterfactual method to validate" />
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-bold">Automated — landed after the pivot</td>
              <td className="px-3 py-3 whitespace-nowrap font-semibold">~$350M</td>
              <td className="px-3 py-3 whitespace-nowrap font-semibold">
                ~$7M
                <Flag kind="assumption" note="Per Nick; counterfactual method to validate" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-neutral-500 max-w-2xl">
        Net of the discount cost, and read against comparison groups drawn from merchants who had been declining or
        plateauing.
      </p>
      <Guardrail>
        That opt-in alone proved behaviour change, or that observed TPV was automatically incremental.
      </Guardrail>
      <p className="mt-12 text-xl md:text-2xl font-black max-w-3xl">
        The numbers said: continue. They did not say <em>why</em> —{' '}
        <span style={{ color: ACCENT }}>and we had planned for exactly that question.</span>
      </p>
    </ProcessPanel>
  )
}
