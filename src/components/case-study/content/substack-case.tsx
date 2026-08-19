'use client'

import { useState } from 'react'
import {
  ActOpener,
  ArtifactModal,
  Takeaway,
  Miss,
  Note,
  NotesCtx,
  Rib,
  Spine,
} from '../substack/primitives'
import {
  EarlyInterventions,
  LargeBets,
  LifecycleMap,
  MilestoneLadder,
  MoneyMap,
  TpvWaterfall,
} from '../substack/charts'
import { ArtifactAttribution } from '../substack/artifacts'
import {
  AssumptionsSection,
  BetsSection,
  DecomposeSection,
  DesignSection,
  HmwSection,
  LearningPlanSection,
  ProcessPanel,
  ResultsSection,
  StagesSection,
} from '../substack/process'
import { ResearchTurn } from '../substack/research'
import {
  ACTS,
  DEFINITION,
  FIRST_BET_REASONS,
  MILESTONE_HEADLINE,
  MISSES,
  PARTNER_CAPABILITIES,
  PRINCIPLES,
  QUOTES,
  SIX_QUESTIONS,
  SPACE_CHOICE,
  TAKEAWAYS,
  TRAJECTORIES,
  WEDGE_REASONS,
} from '../substack/data'
import { ACCENT, ACCENT_DARK, FILL, INK, PRESENTER_TOOLS, TINT } from '../substack/tokens'

// The spine of the deck. Four acts, each closing on a lesson, with the misses distributed through
// the acts rather than collected in a graveyard slide at the end.
//
// Layout primitives live in ../substack/primitives, content in ../substack/data, recreated working
// artifacts in ../substack/artifacts, and the vertical process act in ../substack/process.

export default function SubstackCaseContent() {
  const [notes, setNotes] = useState(false)

  return (
    <>
      <NotesCtx.Provider value={notes}>
        <main className="font-sans" style={{ color: INK }}>
          {/* ---------- OPEN ---------- */}

          <Spine id="title" kicker="Nick Omori · Lead Product Manager — Merchant & Partner Lifecycle, PayPal">
            <h1 className="font-black tracking-tight leading-[0.95] text-5xl md:text-8xl max-w-4xl mt-10 md:mt-16">
              Building a Growth Ecosystem
            </h1>
            <p className="mt-10 text-xl md:text-2xl max-w-3xl text-neutral-600">
              How one project became a multi-track lifecycle support system.
            </p>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-3xl">
              {[
                ['~$15.9B', 'the annual leak we were sizing against'],
                ['~$450M', 'net growth TPV, year one'],
                ['~$1B', 'on track this year, across all tracks'],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <p className="font-black text-4xl md:text-5xl leading-none" style={{ color: ACCENT }}>
                    {v}
                  </p>
                  <p className="mt-3 text-sm text-neutral-500">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Spine>

          {/* Context — scope and directive only; the Substack parallel is spoken, not on the slide */}
          <Spine id="context" kicker="Context">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              I own how merchants and partners experience PayPal over their whole life with us.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              The directive I was given was broad: improve activation, growth, and retention across the merchant
              base. Which team solved it, and in what order, was left open.
            </p>
            <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-4xl">
              <div className="rounded-2xl border-2 p-6" style={{ borderColor: FILL, background: TINT }}>
                <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: ACCENT }}>
                  Merchant Portal
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  The logged-in home a merchant lands on — balance, activity, alerts, recommendations, and every
                  lifecycle intervention we surface directly.
                </p>
              </div>
              <div className="rounded-2xl border-2 p-6" style={{ borderColor: FILL, background: TINT }}>
                <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: ACCENT }}>
                  Partner Portal
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  The equivalent surface for platforms who bring us their own merchants — the same intelligence,
                  delivered through their relationship instead of ours.
                </p>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-5 max-w-4xl">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">The lifecycle</p>
                <p className="font-semibold text-sm">Activation → growth → retention, direct and through partners</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Who I worked with</p>
                <p className="font-semibold text-sm">
                  Data, pricing strategy, pricing ops, support, legal, marketing, commercial, and platform partners
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">Scope</p>
                <p className="font-semibold text-sm">
                  Just over a year, from an unowned problem to a portfolio several PMs now run
                </p>
              </div>
            </div>
            <Note>
              Say verbally, not on the slide: why this project — PayPal earns when merchants process more, Substack
              earns when writers get paid. Neither is a flat subscription, so customer success isn&apos;t adjacent to
              the revenue model, it is the revenue model.
              {' '}Boundaries if asked: a borrowed analyst built the model, Pricing Strategy owned margin, Pricing Ops
              fulfilled, feature teams owned their capabilities. I owned the strategy, the portfolio, and how it came
              together. Sponsorship: a director plus a commercial VP. Offer to show the Portal build here.
            </Note>
          </Spine>

          {/* ---------- ACT I ---------- */}

          <ActOpener id={ACTS[0].id} num={ACTS[0].num} title={ACTS[0].title} />

          <Spine id="opportunity" kicker="The situation">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-6xl max-w-4xl">
              Two years of work. Zero net growth.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-3xl">
              Merchant TPV sat flat at roughly <strong>$118B</strong> for two consecutive years. Acquisition was
              healthy. The back book was growing. And churn &amp; decline erased almost exactly as much as both of
              them added.
            </p>
            <TpvWaterfall />
            <p className="mt-10 text-xl md:text-2xl font-black max-w-3xl">
              Nothing in the portfolio was sized to offset it —{' '}
              <span style={{ color: ACCENT }}>and nobody owned it.</span>
            </p>
            <Note>
              This is the slide that earns the right to the rest of the presentation. The point isn&apos;t that
              churn is bad; it&apos;s that two full years of everyone else&apos;s good work was being cancelled out
              by something no single team was accountable for.
            </Note>
          </Spine>

          <Spine id="definition" kicker="The definition hole" dark>
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              Churn was a $3B problem. Decline was a $16B one.
            </h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
              In a growth system, churn is normally the biggest number on the board. At a company with twenty years
              of customer history it was suspiciously small — so I went and read the definition.
            </p>
            <div className="mt-10 rounded-2xl p-6 max-w-3xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: ACCENT_DARK }}>
                The rule
              </p>
              <p className="text-lg font-bold">{DEFINITION.rule}</p>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">{DEFINITION.hole}</p>
            </div>
            <div className="mt-12 flex flex-wrap items-end gap-12">
              <div>
                <p className="font-black text-4xl md:text-6xl text-neutral-500">{DEFINITION.official.value}</p>
                <p className="mt-2 text-sm text-neutral-500 max-w-[14rem]">{DEFINITION.official.sub}</p>
              </div>
              <div>
                <p className="font-black text-5xl md:text-7xl">
                  ~$16<span style={{ color: ACCENT_DARK }}>B</span>
                </p>
                <p className="mt-2 text-sm text-neutral-400 max-w-[16rem]">
                  {DEFINITION.real.sub}
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {DEFINITION.excluded.map((e) => (
                <span key={e.k} className="px-4 py-2 rounded-full text-sm border border-white/15 text-neutral-400">
                  <strong className="text-white">{e.k}</strong> — {e.v}, all stripped out
                </span>
              ))}
            </div>
            <p className="mt-12 text-xl md:text-2xl max-w-3xl font-bold">
              Everyone was talking about growth.{' '}
              <span style={{ color: ACCENT_DARK }}>Nobody was talking about decline.</span>
            </p>
            <Note>
              First month on the team. The tell was that churn looked far too small for a business this old — most of
              the volume we were losing came from merchants who were still transacting, just less every month. Nobody
              was counting them because they had not hit zero yet.
            </Note>
          </Spine>

          {/* Early exploration — the borrowed ops team */}
          <Spine id="exploration" kicker="Early exploration">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              We had no research budget, so we borrowed a VP&apos;s call center.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              A VP on the customer support side had been handed her own mandate to curb churn. When I showed her what
              we were finding about decline, she didn&apos;t need convincing — she needed the same answers. Her ops
              team made the calls.
            </p>
            <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl">
              {[
                ['~2,500', 'declining and departed high-value merchants contacted'],
                ['~150', 'responded — enough to point us in a direction'],
                ['6', 'reason categories that came out of what they told us'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-black text-4xl md:text-5xl" style={{ color: ACCENT }}>
                    {v}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col md:flex-row gap-4 items-stretch max-w-4xl">
              {[
                ['1 · Ask', 'Merchants told us, in their words, what had gone wrong'],
                ['2 · Categorize', 'Their answers became the reason taxonomy'],
                ['3 · Instrument', 'Tagging rules operationalized that taxonomy across the whole portfolio'],
              ].map(([k, v]) => (
                <div key={k} className="flex-1 rounded-2xl border border-neutral-200 p-5">
                  <p className="font-black text-sm mb-1.5" style={{ color: ACCENT }}>
                    {k}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
            <Note>
              This is the alignment story if they probe on stakeholders: I didn&apos;t have headcount or a research
              budget. I found someone whose mandate overlapped mine and made her problem easier to solve. Verbal
              aside worth making: at a company that size, the new-person advantage is real — meet everyone early,
              because far more people have overlapping problems than you&apos;d guess.
            </Note>
          </Spine>

          <Spine id="money-map" kicker="Sizing it">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
              Then we put a dollar figure on each category.
            </h2>
            <MoneyMap />
            <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
              Decline crossed a dozen teams and had no sustained investment.{' '}
              <span style={{ color: ACCENT }}>We needed a fast, credible first win to earn any of it.</span>
            </p>
            <ArtifactModal
              label="The attribution table — full reason-code × tier breakdown"
              title="TPV contraction by reason code — single-month snapshot, annualized"
            >
              <ArtifactAttribution />
            </ArtifactModal>
            <Note>
              Three addressable drivers, a small macro slice we bracketed as uncontrollable, and an honest untagged
              third. Say the untagged number out loud — it buys credibility for everything else on the chart.
            </Note>
          </Spine>

          <DecomposeSection />

          <Spine id="wedge" kicker="Choosing where to start">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Pricing had the highest <span style={{ color: ACCENT }}>learning-adjusted leverage</span> — not the
              biggest pool.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              We had already sized every space. The question was which one we could learn from fastest.
            </p>
            <div className="mt-12 space-y-4">
              {SPACE_CHOICE.map((sp) => (
                <div
                  key={sp.space}
                  className="rounded-2xl border-2 p-6"
                  style={sp.chosen ? { borderColor: FILL, background: TINT } : { borderColor: '#e5e5e5' }}
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <p className="font-black text-lg">{sp.space}</p>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={sp.chosen ? { background: ACCENT, color: 'white' } : { background: '#f5f5f5', color: '#737373' }}
                    >
                      {sp.verdict}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                    <p className="text-neutral-700">
                      <span className="font-bold uppercase tracking-wide text-[10px] text-neutral-400 block mb-1">
                        The pull
                      </span>
                      {sp.pull}
                    </p>
                    <p className="text-neutral-700">
                      <span className="font-bold uppercase tracking-wide text-[10px] text-neutral-400 block mb-1">
                        The problem
                      </span>
                      {sp.problem}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WEDGE_REASONS.map((r) => (
                <div key={r.k} className="rounded-xl border border-neutral-200 p-5">
                  <p className="font-bold text-sm mb-1.5" style={{ color: ACCENT }}>
                    {r.k}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{r.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-2xl md:text-3xl font-black max-w-3xl">
              We earned permission to scale by{' '}
              <span style={{ color: ACCENT }}>reducing the cost of being wrong</span>.
            </p>
            <Rib branch="Conflict & alignment" title="The margin fight — and how alignment was actually earned">
              <div className="space-y-3">
                <p>
                  Pricing Strategy and the business GMs pushed back hard: margin was the metric that mattered, a
                  discount might subsidise merchants who would have stayed, and product-led pricing risked
                  inconsistency with negotiated enterprise contracts.
                </p>
                <p className="font-bold" style={{ color: INK }}>
                  What actually won the argument was framing and size, not evidence — I did not have evidence yet.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>It runs as an experiment, on a tight timeline, with a date where we stop and report.</li>
                  <li>It costs almost nothing — borrowed ops time and a borrowed analyst, no engineering.</li>
                  <li>Narrow eligibility; sales-managed contracts carved out entirely.</li>
                  <li>Control and comparison populations preserved at every stage.</li>
                  <li>Adoption and trajectory evidence required before any automation investment.</li>
                </ul>
                <p className="text-neutral-500">
                  In one line: the subsidy risk could not be known before launching, but it could be{' '}
                  <em>bounded</em> before launching. Guardrails were the price of permission.
                </p>
              </div>
            </Rib>
          </Spine>

          <HmwSection />

          <BetsSection />

          <ProcessPanel
            id="first-bet"
            kicker="Choosing the first bet"
            title="Proactive save offers won because the stars happened to line up."
            tint
          >
            <p className="text-lg text-neutral-700 max-w-3xl -mt-6 mb-10">
              I want to be honest about this, because it is the question I would ask. It was not the most
              sophisticated bet on the board. It was the one where everything we needed already existed.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {FIRST_BET_REASONS.map((r) => (
                <div key={r.k} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <p className="font-black text-base mb-2" style={{ color: ACCENT }}>
                    {r.k}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{r.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-lg md:text-xl font-bold max-w-3xl">
              High potential impact, it would prove the whole space was worth funding, and it was{' '}
              <span style={{ color: ACCENT }}>straightforward to execute</span>. That combination is rarer than it
              sounds.
            </p>
            <Note>
              Say the honest version out loud: I went poking around the pricing org, found they had margin headroom
              nobody was spending, and found an analyst willing to build us a model. The prioritisation was real, but
              availability of resource was a genuine input — pretending otherwise would be revisionist.
            </Note>
          </ProcessPanel>

          <Spine id="model" kicker="0→1 · the leverage point">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Building the Churn Model
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              One analyst, some business rules, and two personas — and the single thing that made this bet
              executable inside our timeline.
            </p>
            <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-4xl">
              <div className="rounded-2xl border-2 p-6" style={{ borderColor: FILL, background: TINT }}>
                <p className="font-black text-sm mb-2" style={{ color: ACCENT }}>
                  Persona A · Declining
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Merchants down year over year, with a stack of exclusion rules — unresolved holds, sales-managed
                  contracts, seasonality, known bankruptcies.
                </p>
              </div>
              <div className="rounded-2xl border-2 p-6" style={{ borderColor: FILL, background: TINT }}>
                <p className="font-black text-sm mb-2" style={{ color: ACCENT }}>
                  Persona B · Flattening
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Merchants who had been growing and then stalled quickly — not yet declining, but bending toward
                  it.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-2xl p-7 text-white max-w-3xl" style={{ background: '#0b0d12' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
                The pushback
              </p>
              <p className="text-base text-neutral-300 leading-relaxed">
                Plenty of people wanted a proper churn-reasoning model first — something that could tell them
                exactly what was wrong with each merchant and how to fix it. That is a much better model. It was
                also months away, and it answered a question we hadn&apos;t earned yet.
              </p>
              <p className="mt-5 text-lg md:text-xl font-bold">
                We weren&apos;t trying to identify why people were leaving.{' '}
                <span style={{ color: ACCENT_DARK }}>
                  We were trying to prove a lifecycle intervention could bend a trajectory at all.
                </span>
              </p>
            </div>
            <p className="mt-10 text-lg text-neutral-700 max-w-3xl">
              For that question, a crude slope is the right instrument. And the win it produced is what bought us
              the resources to build the real model later — which now powers the early-lifecycle program.
            </p>
            <Note>
              Resource constraints are worth saying out loud here rather than putting on the slide: no analytics
              support, so I borrowed someone from pricing ops on the strength of the relationship. If a data
              scientist probes on rigor — yes, it was blunt, and Miss 1 shows exactly what that cost. The argument
              isn&apos;t that crude was better; it&apos;s that crude was fundable, reversible, and available now.
            </Note>
          </Spine>

          <DesignSection />

          <AssumptionsSection />

          <LearningPlanSection />

          <StagesSection />

          <ResultsSection />

          <Takeaway {...TAKEAWAYS[0]} />

          {/* ---------- ACT II ---------- */}

          <ActOpener id={ACTS[1].id} num={ACTS[1].num} title={ACTS[1].title} />

          <Spine id="sales-outreach" kicker="A decision I&#39;d make again">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              We deliberately contaminated our own experiment.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              We handed the outreach list to the sales org so reps could call their highest-volume merchants
              personally — encourage them to take the offer, and thank them for their loyalty when they did.
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-4xl">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-2">The objection</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  It muddies the read. Treated merchants in the top band now had two interventions, so we could no
                  longer cleanly attribute the lift to the offer itself.
                </p>
              </div>
              <div className="rounded-2xl border-2 p-6" style={{ borderColor: FILL, background: TINT }}>
                <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: ACCENT }}>
                  Why we did it anyway
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  It was obviously good for the merchant and obviously good for the business. Protecting the
                  cleanliness of the read would have meant deliberately delivering less value to people we&apos;d
                  already identified as at risk.
                </p>
              </div>
            </div>
            <p className="mt-10 text-xl md:text-2xl font-black max-w-3xl">
              The objection was technically correct.{' '}
              <span style={{ color: ACCENT }}>It was also the wrong call.</span>
            </p>
            <Note>
              Be honest about the limit here: this only works because we still held clean holdouts elsewhere and the
              effect we were chasing was large. If the effect had been marginal, contaminating the read would have
              cost us the ability to make any decision at all.
            </Note>
          </Spine>

          <Takeaway {...TAKEAWAYS[1]} />

          <Spine id="wedge-results" kicker="The turn" dark>
            <ResearchTurn />
            <Rib branch="Research" title="Methodology, the verbatims, and the clues we’d left ourselves">
              <div className="space-y-5 text-neutral-700">
                <div>
                  <p className="font-bold mb-1.5">The clues were already in our artifacts</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The original problem-space map had no recognition space at all.</li>
                    <li>
                      Every metric we wrote for Relationship &amp; Loyalty was a sentiment proxy. Not one of them
                      connected to revenue, and nobody noticed at the time.
                    </li>
                    <li>The learning plan pre-registered: “If pricing wasn’t their primary concern, we’ll figure out what is.”</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-1.5">Method</p>
                  <p>
                    Twenty 1:1 moderated interviews across segments, positioned broadly as a UX and offer review to
                    avoid priming. Limitations owned: n=20 finds mechanisms, not effect sizes, and recruiting from
                    offer recipients skews engaged.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {QUOTES.map((q) => (
                    <blockquote
                      key={q.text}
                      className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 text-sm"
                      style={{ borderLeft: `3px solid ${FILL}` }}
                    >
                      {q.text}
                      <span className="block mt-2 text-[11px] font-bold uppercase tracking-wide text-neutral-400">
                        {q.theme}
                      </span>
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
            <div className="mt-4">
              <Miss {...MISSES[0]} />
            </div>
          </Spine>

          {/* ---------- ACT III ---------- */}

          <ActOpener id={ACTS[2].id} num={ACTS[2].num} title={ACTS[2].title} />

          <Spine id="tracks" kicker="What the research spun off">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              One reinterpretation became a portfolio.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              Most of these did not require us to build anything new. The biggest single unlock was going to teams
              who already had something in beta and asking whether their beta could become our merchants&apos;
              benefit.
            </p>
            <LargeBets />
            <p className="mt-12 text-lg md:text-xl font-bold max-w-3xl">
              None of these were on the original roadmap in this form.{' '}
              <span style={{ color: ACCENT }}>They came from asking twenty people what was actually going on.</span>
            </p>
          </Spine>

          <Spine id="early-lifecycle" kicker="The biggest one · move earlier" dark>
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Switching cost is the moat. So we started building it on purpose.
            </h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-3xl">
              What actually protects a mature merchant is how much of their business runs through us. That is why
              twelve of twenty had never revisited a decision they made years ago — and why, once one of them does
              start leaving, it is expensive to stop. By then the moat is already gone.
            </p>
            <p className="mt-6 text-xl md:text-2xl font-bold max-w-3xl">
              So the question flipped:{' '}
              <span style={{ color: ACCENT_DARK }}>
                what if we built that stickiness deliberately, at the start?
              </span>
            </p>

            <div className="mt-16">
              <p className="font-bold uppercase tracking-widest text-[11px] mb-4" style={{ color: ACCENT_DARK }}>
                The analysis that justified it
              </p>
              <div className="flex flex-wrap items-end gap-8">
                <p className="font-black text-6xl md:text-8xl">{MILESTONE_HEADLINE.stat}</p>
                <p className="text-lg text-neutral-300 mb-3 max-w-md">
                  {MILESTONE_HEADLINE.claim}
                </p>
              </div>
              <div className="rounded-2xl bg-white text-black p-6 md:p-8 mt-8">
                <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400">
                  Merchants who cleared these windows
                </p>
                <MilestoneLadder />
              </div>
              <p className="mt-5 text-sm text-neutral-400 max-w-3xl leading-relaxed">
                {MILESTONE_HEADLINE.qualifier}
              </p>
            </div>

            <div className="mt-16">
              <p className="font-bold uppercase tracking-widest text-[11px] mb-4" style={{ color: ACCENT_DARK }}>
                So we pushed on exactly those
              </p>
              <div className="rounded-2xl bg-white text-black p-6 md:p-8">
                <EarlyInterventions />
              </div>
            </div>

            <p className="mt-14 text-xl md:text-2xl font-bold max-w-3xl">
              The same lever, pointed at the other end of the lifecycle —{' '}
              <span style={{ color: ACCENT_DARK }}>
                a rate cut to stop someone leaving became a volume incentive to get them further in.
              </span>
            </p>
            <div className="mt-4">
              <Miss {...MISSES[1]} />
            </div>
            <Note>
              The callback worth landing: this exact idea sat on our ideation board months earlier, dismissed in
              writing as “measuring pre-decliners, lol.” We were right to defer it — we did not yet know what durable
              value looked like — and wrong to laugh at it. Be explicit that the 2× is correlative; a data scientist
              will ask, and conceding it before they do is worth more than the number is.
            </Note>
          </Spine>

          <Takeaway {...TAKEAWAYS[2]} />

          {/* ---------- ACT IV ---------- */}

          <ActOpener id={ACTS[3].id} num={ACTS[3].num} title={ACTS[3].title} />

          <Spine id="partner" kicker="The second axis">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              We gave the whole system to the platforms who compete with us for the same merchants.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              Our largest partners aren&apos;t merchants — they&apos;re platforms with their own merchant bases who
              offer payment processing themselves. Sophisticated, and closer to those merchants than we&apos;ll ever
              be.
            </p>
            <div className="mt-10 space-y-3 max-w-4xl">
              {PARTNER_CAPABILITIES.map((c, i) => (
                <div key={c.name} className="rounded-xl border border-neutral-200 px-6 py-4 flex items-start gap-5">
                  <span className="font-black text-lg mt-0.5 w-5 shrink-0" style={{ color: ACCENT }}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-neutral-600 mt-1">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border-2 p-6 max-w-3xl" style={{ borderColor: '#E8A33D', background: '#FFF8EC' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-2" style={{ color: '#8a5a12' }}>
                The two-sided trade-off
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                Every merchant reached through a partner is a merchant we reach further and control less — their
                brand, their timing, their relationship, our intelligence. We took that trade knowingly. Reach won.
              </p>
            </div>
            <div className="mt-10 flex items-end gap-4">
              <p className="font-black text-6xl md:text-7xl">
                10<span style={{ color: ACCENT }}>%</span>
              </p>
              <p className="text-neutral-500 mb-2 max-w-sm text-sm">
                of partners adopted within three months
              </p>
            </div>
            <Rib branch="Partner architecture" title="What flowed where, and what adoption looked like">
              <div className="space-y-4">
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    ~2× more at-risk merchants reached than prior manual identification.
                  </li>
                  <li>
                    Partner pricing campaigns: low-double-digit acceptance.
                  </li>
                  <li>
                    Intelligence-only adoption exceeded full-campaign adoption — validating detection separated from
                    delivery.
                  </li>
                </ul>
                <p className="text-neutral-500">
                  Open questions owned honestly: entity-grain mapping, model confidence on sparser partner data,
                  exported intelligence as platform win vs. loss of control.
                </p>
              </div>
            </Rib>
          </Spine>

          <Spine id="surprise" kicker="What surprised me">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              They didn&apos;t want our intervention. They wanted our flags.
            </h2>
            <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
              We built partners a pricing intervention. What most of them actually did was export the risk flags and
              run their own email sequences against them — and it worked well enough that we started building
              lifecycle messaging ourselves, off the back of what they taught us.
            </p>
            <div className="mt-10 rounded-2xl p-8 text-white max-w-3xl" style={{ background: '#0b0d12' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
                The parallel I&apos;d draw for Substack
              </p>
              <p className="text-lg md:text-xl font-bold leading-snug">
                The tooling you build internally to understand readers — who&apos;s engaging, who&apos;s drifting,
                who&apos;s about to lapse — is tooling your most sophisticated writers want pointed at their own
                audiences.
              </p>
              <p className="mt-5 text-base text-neutral-300 leading-relaxed">
                That&apos;s the movement I&apos;ve been pushing at PayPal: the churn model, the pricing controls, the
                lifecycle tracks — built for us first, then handed outward. It compounds twice, because the
                sophisticated side of your marketplace will use it in ways you didn&apos;t design for, and tell you
                what to build next.
              </p>
            </div>
          </Spine>

          <Takeaway {...TAKEAWAYS[3]} />

          {/* ---------- CLOSE ---------- */}

          <Spine id="lifecycle" kicker="In your vocabulary">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Where this actually landed on the lifecycle.
            </h2>
            <LifecycleMap />
            <p className="mt-10 text-lg text-neutral-700 max-w-3xl">
              We started in the middle and worked outward. Resurrection we looked at and deliberately left alone —
              once volume is at zero it&apos;s usually bankruptcy or a completed migration, and they don&apos;t
              answer the phone. That&apos;s a prioritisation call, not an oversight, and it&apos;s the next thing
              I&apos;d argue about.
            </p>
          </Spine>

          <Spine id="impact" kicker="Impact">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              Year one against a fifteen-billion-dollar leak.
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
              {[
                ['5% → 30%', 'opt-in, phone calls → automation'],
                ['~$450M', 'net growth TPV from the pricing program'],
                ['~$9M', 'net growth margin, after discounts'],
                ['~$1B', 'on track this year across all tracks'],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <p className="font-black text-3xl md:text-4xl" style={{ color: ACCENT }}>
                    {v}
                  </p>
                  <p className="mt-1.5 text-xs text-neutral-500">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-lg text-neutral-700 max-w-3xl">
              That&apos;s a small fraction of the leak, and I&apos;d rather frame it as a rate than a percentage:
              year one recovered ~$450M, this year is tracking toward ~$1B, and every track ships with better
              instrumentation than the one before it. The compounding is the asset — not the number.
            </p>
            <p className="mt-8 text-2xl md:text-3xl font-black max-w-4xl">
              The product was never a discount. It was the{' '}
              <span style={{ color: ACCENT }}>system</span> — detection through delivery through measurement,
              reusable at both ends of the lifecycle and on both sides of the marketplace.
            </p>
            <Rib branch="Reflection" title="Strategic learning, and what I'd do differently">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-bold mb-2">What I learned</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Decline is a trajectory, not a binary event.</li>
                    <li>Pricing is an economic lever <em>and</em> a relationship signal.</li>
                    <li>Standing, trust, and recognition are product surface area.</li>
                    <li>Segment by need, trajectory, and ability to act — not only size.</li>
                    <li>Retention reveals the durable value worth moving upstream.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">What I&apos;d do differently</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Run the qualitative research <em>before</em> the pilot, not alongside it. We had the pivot clause written down and still waited for the numbers to force it.</li>
                    <li>Define “high potential” on durability, not dollars, from the start.</li>
                    <li>Stop communicating in basis points far sooner — it genuinely confused merchants.</li>
                    <li>Generic feature access read as a catalog, not personalization.</li>
                  </ul>
                </div>
              </div>
            </Rib>
          </Spine>

          <Spine id="close" kicker="What I&#39;d bring">
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
              When the platform only wins if the customer wins, customer success{' '}
              <em style={{ color: ACCENT }}>is</em> the monetization model.
            </h2>
            <div className="mt-12 rounded-2xl p-8 md:p-10 text-white" style={{ background: '#0b0d12' }}>
              <p className="font-bold uppercase tracking-wide text-[11px] mb-5" style={{ color: ACCENT_DARK }}>
                The four takeaways, once more
              </p>
              <ol className="space-y-3 text-lg text-neutral-200 list-decimal pl-5 max-w-3xl font-semibold">
                {TAKEAWAYS.map((t) => (
                  <li key={t.id}>{t.title}</li>
                ))}
              </ol>
              <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
                Understand what makes your best customers successful — deliver it earlier, defend it when it weakens,
                and build it once so it works at both ends of the lifecycle.{' '}
                <span style={{ color: ACCENT_DARK }}>
                  Shared primitives underneath, without forcing independent writers and large publishers into
                  identical experiences.
                </span>
              </p>
            </div>
            <div className="mt-10">
              <p className="font-bold uppercase tracking-wide text-[11px] text-neutral-400 mb-3">
                Principles I&apos;d carry over
              </p>
              <ul className="space-y-2 text-base text-neutral-700 max-w-2xl">
                {PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: FILL }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Note>
              Close: “Keep what resonates, throw away what doesn&apos;t — that&apos;s how I&apos;d want to work with
              you anyway.” Then hand it to questions.
            </Note>
          </Spine>

          {/* Reference material kept out of the running order */}
          <Spine id="appendix" kicker="Appendix">
            <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl max-w-3xl">
              Reference material, if we go there.
            </h2>
            <Rib branch="Diagnosis" title="The six diagnostic questions and the trajectory taxonomy">
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
                  <p className="font-bold mb-2">How model output was allowed to trigger spend</p>
                  <p>
                    The cohorts were blunt, so treatment decisioning sat on top of them: low confidence → cheap
                    education; moderate and addressable → product-specific guidance; high confidence, high value and
                    addressable → pricing, protection, or high touch; non-addressable → suppress spend, collect
                    learning.
                  </p>
                </div>
              </div>
            </Rib>
          </Spine>

          {PRESENTER_TOOLS && (
            <div className="fixed bottom-6 left-6 z-50">
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
          )}
        </main>
      </NotesCtx.Provider>
    </>
  )
}
