'use client'

import { useRef, useState } from 'react'
import {
  ArtifactModal,
  Flag,
  Guardrail,
  Note,
  NotesCtx,
  ReviewCtx,
  Rib,
  Spine,
} from '../substack/primitives'
import { DeepDives, MoneyMap, UpstreamBars } from '../substack/charts'
import { ArtifactAttribution } from '../substack/artifacts'
import { DeepDive } from '../substack/process'
import { ResearchTurn } from '../substack/research'
import { DIVE_STEPS, FAMILIES, PRINCIPLES, PROFILES, QUOTES, SIX_QUESTIONS, TRAJECTORIES } from '../substack/data'
import { ACCENT, ACCENT_DARK, FILL, INK, REVIEW_TOOLS, TINT } from '../substack/tokens'

// The spine of the deck. Layout primitives live in ../substack/primitives, data in ../substack/data,
// recreated working artifacts in ../substack/artifacts, and the expandable process act in
// ../substack/process.

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
          <Spine id="title" kicker="Nick Omori · Lead Product Manager — Merchant & Partner Lifecycle, PayPal">
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
            <p className="mt-8 text-lg md:text-xl font-bold max-w-3xl">
              Decline crossed a dozen teams and had no sustained investment.{' '}
              <span style={{ color: ACCENT }}>We needed a fast, credible first win.</span>
            </p>
            <ArtifactModal
              label="The attribution table — full reason-code × tier breakdown"
              title="TPV contraction by reason code — single-month snapshot, annualized"
            >
              <ArtifactAttribution />
            </ArtifactModal>
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
              <p className="mt-5 text-lg text-neutral-600 max-w-3xl">
                The portfolio story you&apos;ve seen so far — this is where I show you how I work.
              </p>
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
                ['~$450M', 'TPV recovered by the pricing program', 'assumption' as const],
                ['~$9M', 'net margin after discounts', 'assumption' as const],
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
                    <li>Recovery split — ~$100M/$2M from the manual stages, ~$350M/$7M from the post-pivot automated stage — counterfactual method still to be validated.</li>
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
                Understand what makes your best customers successful — deliver it earlier, defend it when it weakens,
                and scale the system that does both.{' '}
                <span style={{ color: ACCENT_DARK }}>
                  Shared primitives underneath — without forcing independent creators and big publishers into identical
                  experiences.
                </span>
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
