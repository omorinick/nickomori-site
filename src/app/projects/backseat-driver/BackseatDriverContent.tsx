'use client'

import { useState } from 'react'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export function BackseatDriverContent() {
  const [activeTab, setActiveTab] = useState<'driver' | 'business'>('driver')

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Backseat Driver' },
          ]}
        />

        {/* Upper fold */}
        <div className="mb-16">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Constructive Distractions</p>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">Backseat Driver</h1>
          <p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
            A car-maintenance advisor that works for the owner, not the shop — know what your car needs, what it should cost, and whether that upsell is real.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            78% of drivers don&apos;t trust mechanics. Most text a friend from the waiting room. This is the app version of that friend.
          </p>

          {/* Tab toggle */}
          <div
            role="tablist"
            aria-label="Project perspective"
            className="flex gap-1 mb-6 border border-border rounded-lg p-1 w-fit"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'driver'}
              aria-controls="tab-driver"
              id="tab-btn-driver"
              onClick={() => setActiveTab('driver')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTab === 'driver'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              For the Driver
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'business'}
              aria-controls="tab-business"
              id="tab-btn-business"
              onClick={() => setActiveTab('business')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTab === 'business'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              The Business Case
            </button>
          </div>

          {/* Tab panes */}
          <div
            id="tab-driver"
            role="tabpanel"
            aria-labelledby="tab-btn-driver"
            hidden={activeTab !== 'driver'}
            className="bg-card border border-border rounded-xl p-6 mb-8 max-w-2xl"
          >
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Picture the scene: you&apos;re in the oil-change waiting room. The service advisor comes out with a clipboard. Your cabin air filter is &ldquo;really dirty.&rdquo; Your brake fluid is &ldquo;discolored.&rdquo; They recommend a flush — $340 all-in. You have no idea if any of it is true, urgent, or fairly priced. You can&apos;t jack the car up yourself to check. So you either pay and feel played, or decline and spend the next week wondering if your brakes are quietly failing.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              83% of drivers consult someone else after a mechanic&apos;s recommendation — a parent, a friend, a frantic Google search in the parking lot. The behavior already exists. The product doesn&apos;t.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Backseat Driver is that second opinion, built properly: your actual maintenance schedule in plain English, real-time context when you&apos;re sitting in that waiting room chair, and a service record vault that proves you&apos;ve taken care of your car — even if the work was done by a family friend with paper receipts.
            </p>
          </div>

          <div
            id="tab-business"
            role="tabpanel"
            aria-labelledby="tab-btn-business"
            hidden={activeTab !== 'business'}
            className="bg-card border border-border rounded-xl p-6 mb-8 max-w-2xl"
          >
            <p className="text-sm text-foreground leading-relaxed mb-4">
              US auto repair and maintenance is a ~$199B market (2025) built on a fleet of 289M vehicles with an average age of 12.8 years — the oldest ever recorded. Older cars need more maintenance, and repair costs are up ~44% since 2019. The spend is there. The trust is not: 78% of drivers are skeptical of mechanics, and ~76% believe shops recommend unnecessary work.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Every existing app solves a slice of the problem — reminders, code-reading, price lookups — and nearly every one eventually monetizes through shop referrals, recreating the conflict of interest it promised to fix. FIXD devolved into dark patterns. CARFAX steers toward dealers. RepairPal charges shops to be &ldquo;recommended.&rdquo;
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              The white space: real-time second opinion at the moment of decision — in the waiting room, before you sign — funded by the consumer so its incentives stay clean. The consumer must be the customer. That&apos;s the business model, and it&apos;s also the product&apos;s core claim.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
              Build in progress
            </span>
          </div>
        </div>

        {/* Stat callouts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {[
            { value: '78%', label: 'of drivers distrust mechanics' },
            { value: '83%', label: 'consult someone after a recommendation' },
            { value: '$199B', label: 'US auto repair market (2025)' },
            { value: '12.8 yrs', label: 'avg US vehicle age — a record high' },
          ].map(({ value, label }) => (
            <div key={value} className="bg-card border border-border rounded-xl p-4">
              <p className="text-xl font-semibold text-foreground mb-1">{value}</p>
              <p className="text-xs text-muted-foreground leading-snug">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-16">
          {/* 1. The Problem */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">The Problem</h2>
            <div className="flex flex-col gap-3 mb-8">
              {[
                {
                  label: 'You don\'t know your schedule.',
                  body: 'Most owners have no idea what their car actually needs at a given mileage — what the manufacturer says, what\'s make/model-specific, what\'s marketing.',
                },
                {
                  label: 'You forget, or never knew, what\'s coming.',
                  body: 'Maintenance isn\'t just today\'s oil change. There\'s a timeline of upcoming work — some expensive — with no tool that surfaces it proactively.',
                },
                {
                  label: 'You\'re a captive audience at the shop.',
                  body: 'Upsells arrive when the car is on the lift, the power dynamic is at its worst, and leaving costs time. There\'s no low-pressure way to evaluate what you\'re being told.',
                },
                {
                  label: 'You can\'t evaluate a recommendation.',
                  body: 'Is it real? How urgent? What\'s fair to pay? Does declining it risk the warranty? Can you get it cheaper elsewhere? No existing app answers this in real time.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="bg-card border border-border rounded-xl px-5 py-4">
                  <p className="text-sm font-medium text-foreground mb-1">{label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Warranty story — pull quote */}
            <blockquote className="border-l-2 border-warning pl-5 py-1">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                &ldquo;My 2013 Hyundai Sonata engine seized on the way to the dealership — one mile from the shop. I&apos;d just gotten married, just joined a pre-revenue startup, and my wife (a teacher) was the breadwinner. The dealership immediately claimed the seizure was due to faulty maintenance and asked for records going back further than what they held on file. Most of that work had been done by a family friend at his small shop. Paper receipts only. Credit card statements proved I&apos;d paid for oil changes, and he signed a letter — but that wasn&apos;t enough. The dealership had no incentive to push the claim through.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                Seven months later, we found a service advisor at a dealership twenty miles away who knew something the first one didn&apos;t: you can photograph the engine internals to show the oil passages are clean — proof that the seizure wasn&apos;t from neglect, regardless of paper records. We were lucky. Without him, I had no way to prove I&apos;d taken care of my car.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">
                (P.S. — we later learned this engine was notorious for seizing. Hyundai had already faced a lawsuit over it, which is why I had the extended warranty in the first place. The records problem was still nearly enough to sink a claim I was legally entitled to.)
              </p>
            </blockquote>
          </section>

          {/* 2. What's Already Out There */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">What&apos;s Already Out There</h2>
            <p className="text-sm text-muted-foreground mb-5">
              The competitive landscape is fragmented — each app solves a slice. None solves the moment that matters.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Examples</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">What they solve</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Where they fall short</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      cat: 'Log & reminder apps',
                      ex: 'Drivvo, Simply Auto, AUTOsist',
                      solve: 'Reminders, records, fuel tracking',
                      gap: 'Passive ledgers — no decision support, high abandonment',
                    },
                    {
                      cat: 'OBD dongle + app',
                      ex: 'FIXD, OBDeleven',
                      solve: 'Decode warning lights',
                      gap: 'Hardware barrier; FIXD devolved into dark patterns and subscription traps',
                    },
                    {
                      cat: 'Auto-populated history',
                      ex: 'CARFAX Car Care',
                      solve: 'Passive service history via shop network',
                      gap: 'Backward-looking, data gaps, steers users toward dealers',
                    },
                    {
                      cat: 'Price transparency',
                      ex: 'RepairPal',
                      solve: '"How much should this cost?"',
                      gap: 'Assumes you already know what you need; monetized by shop referrals',
                    },
                    {
                      cat: 'On-demand mechanics',
                      ex: 'YourMechanic / Wrench',
                      solve: 'Convenience and execution',
                      gap: 'Solves doing, not deciding',
                    },
                    {
                      cat: 'Car super-apps',
                      ex: 'Jerry',
                      solve: 'Distribution via insurance',
                      gap: 'Maintenance is a shallow retention layer, not a core product',
                    },
                  ].map(({ cat, ex, solve, gap }) => (
                    <tr key={cat} className="bg-background hover:bg-card transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium align-top">{cat}</td>
                      <td className="px-4 py-3 text-muted-foreground align-top">{ex}</td>
                      <td className="px-4 py-3 text-muted-foreground align-top">{solve}</td>
                      <td className="px-4 py-3 text-muted-foreground align-top">{gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. The Gap */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">The Gap</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Map the four problems against the landscape and the white space becomes obvious.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-success-subtle text-success px-2 py-0.5 rounded">Partially solved</span>
                  <p className="text-sm font-medium text-foreground">Know your schedule / what&apos;s coming</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Reminder apps exist but require manual logging, don&apos;t explain what things mean or cost, and are abandoned at high rates.</p>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-destructive/15 text-destructive px-2 py-0.5 rounded">Completely unsolved</span>
                  <p className="text-sm font-medium text-foreground">Real-time second opinion at the shop</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">No product answers, in the waiting room, in real time: <em>&ldquo;Is this recommendation real, fair, and urgent?&rdquo;</em> This is Problem C. It is completely vacant.</p>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-warning/15 text-warning px-2 py-0.5 rounded">Partially solved (price only)</span>
                  <p className="text-sm font-medium text-foreground">Evaluate a recommendation</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">RepairPal tells you a fair price range. No one tells you legitimacy, urgency, warranty impact, or what to actually say to the advisor.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl px-5 py-4">
              <p className="text-sm font-medium text-foreground mb-2">Why the gap persists</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The natural monetization in this space is shop referrals, dealer partnerships, or parts affiliate revenue. Every app that gets close to the trust problem gets economically captured by the supply side it&apos;s supposed to police. FIXD&apos;s dark patterns. CARFAX&apos;s dealer steering. RepairPal&apos;s pay-to-be-listed model. The product that solves the waiting-room problem can&apos;t be funded by shops without poisoning itself. The consumer has to be the customer.
              </p>
            </div>
          </section>

          {/* 4. The Product */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">The Product</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Three moments in a driver&apos;s life, each with a distinct job to do.
            </p>

            {/* User journey */}
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                {
                  moment: 'At home',
                  description: 'Enter your VIN → get your actual maintenance schedule in plain English: what each item is, why it matters, what it typically costs. Reminders adapt to your mileage.',
                },
                {
                  moment: 'At the shop',
                  description: 'They recommend something → open the app → what this part does, whether it\'s typically needed at your mileage, fair price range, urgency, what to ask the advisor.',
                },
                {
                  moment: 'After',
                  description: 'Snap the receipt → record vault updated, price contributed anonymously to the community dataset, warranty-grade history grows.',
                },
              ].map(({ moment, description }) => (
                <div key={moment} className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{moment}</p>
                  <p className="text-sm text-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            {/* Now / Next / Later */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-success mb-3">Now — MVP</p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { feat: 'VIN → maintenance schedule', why: 'The foundation everything sits on. Solves "I don\'t know my schedule."' },
                    { feat: 'Smart reminders (mileage + time)', why: 'Table stakes. Solves "I forget what\'s coming."' },
                    { feat: 'Second Opinion flow', why: 'The hero moment. Enter what the shop recommended → legitimacy, urgency, fair price, questions to ask. The differentiator.' },
                    { feat: 'Record vault', why: 'Receipts + photos + timestamps, DIY or shop. Warranty-grade history. The personal-story feature.' },
                  ].map(({ feat, why }) => (
                    <li key={feat}>
                      <p className="text-sm font-medium text-foreground">{feat}</p>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-info mb-3">Next</p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { feat: 'Community pricing (the Glassdoor mechanic)', why: 'Give receipts → see what others paid, same job, same region, same car. Designed from day one; pays off with scale.' },
                    { feat: 'Warranty-aware guidance', why: 'What your specific warranty requires documented, and whether deferring item X risks it.' },
                  ].map(({ feat, why }) => (
                    <li key={feat}>
                      <p className="text-sm font-medium text-foreground">{feat}</p>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-muted-foreground mb-3">Later — speculative</p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { feat: 'ML on uploaded photos', why: 'Assess work quality or verify completion. A real long-term idea, nowhere near MVP — overclaiming this would be dishonest.' },
                    { feat: 'Shop-side verified records', why: 'Mechanics attach photo proof to records. Useful, but requires supply-side adoption — the right call is to sequence it later.' },
                  ].map(({ feat, why }) => (
                    <li key={feat}>
                      <p className="text-sm font-medium text-foreground">{feat}</p>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{why}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 5. The Business Model */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">The Business Model</h2>
            <p className="text-sm text-muted-foreground mb-5">
              The incentive structure is the product. Every revenue decision flows from that.
            </p>
            <div className="flex flex-col gap-3">
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-foreground mb-1">Consumer subscription — ~$5–10/mo</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Maintenance schedule and reminders are free. Decision support (the Second Opinion flow) and the record vault are paid. Positioning is explicit: &ldquo;We work for you, not the shop.&rdquo; The subscription funds the product; the product&apos;s value proposition depends on having no shop relationships.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-foreground mb-1">Data flywheel — community pricing</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload receipts → see what others paid for the same job, same region, same vehicle. The give-to-get mechanic solves cold-start for price data, builds a compounding moat, and keeps the data consumer-sourced rather than shop-sourced. It&apos;s designed from day one but meaningful at scale.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-4 border-border-hover">
                <p className="text-sm font-medium text-foreground mb-1">Explored and deliberately parked: shop/dealer promotions</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  There&apos;s an obvious revenue line in connecting shops to users who are due for service. It&apos;s parked. Selling shops access to users recreates the exact conflict of interest the product exists to fix — and users would be right not to trust recommendations from an app that takes money from the shops making those recommendations. If ever revisited: opt-in only, clearly labeled as paid placement, structurally firewalled from any recommendation output. The only honest version is one where users know exactly what&apos;s happening. For now, the cleaner call is not to go there.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Tradeoffs, Risks & Open Questions */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">Tradeoffs, Risks & Open Questions</h2>
            <p className="text-sm text-muted-foreground mb-5">
              The honest version of a case study includes what could go wrong. This section is not filler.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  risk: 'Accuracy is existential',
                  detail: 'Wrong advice about a brake job is worse than no advice. Mitigation: conservative urgency framing, OEM schedule data as ground truth, clear "advisory, not diagnosis" language throughout. This constraint shapes the product from the first screen.',
                },
                {
                  risk: 'Cold start on pricing data',
                  detail: 'Fair-price ranges need data before the community exists. Mitigation: seed from public estimator sources and published labor-rate guides; community data refines over time. The give-to-get loop is designed to accelerate this, not paper over it.',
                },
                {
                  risk: 'Engagement is inherently episodic',
                  detail: 'People think about car maintenance a few times a year. Designing for fake daily engagement would be the wrong call. The record vault and mileage-based reminders are the heartbeat — they keep the app relevant without requiring manufactured reasons to open it.',
                },
                {
                  risk: 'Willingness to pay is unproven',
                  detail: 'Consumers say they distrust mechanics; whether they\'ll pay $7/mo to fix it is the core market risk. This is a hobby project — the honest framing is: this is the riskiest assumption, and a real venture would run a payment-intent test before building much else.',
                },
                {
                  risk: 'Liability surface',
                  detail: 'Any advice that intersects with safety and warranties carries real liability exposure. The product needs careful language standards, consistent "advisory, not diagnosis" framing, and probably a legal review before anything is customer-facing.',
                },
              ].map(({ risk, detail }) => (
                <div key={risk} className="bg-card border border-border rounded-xl px-5 py-4">
                  <p className="text-sm font-medium text-foreground mb-1">{risk}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. What I'm Building First */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">What I&apos;m Building First</h2>
            <p className="text-sm text-muted-foreground mb-5">
              The MVP is the four Now features above, in this order of priority: VIN schedule → Second Opinion flow → record vault → reminders. The Second Opinion flow is the differentiator and the demo&apos;s hero moment — everything else supports it.
            </p>
            <div className="bg-card border border-border rounded-xl px-5 py-4">
              <p className="text-sm font-medium text-foreground mb-1">Build is in progress</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No demo yet. When there&apos;s something to show, it&apos;ll link from here. This page documents the thinking behind what&apos;s being built and why — the product decisions, the competitive reasoning, the tradeoffs. The build write-up will cover the technical choices.
              </p>
            </div>
          </section>

          {/* Source notes */}
          <section className="pb-8">
            <p className="text-xs text-muted-foreground mb-3">Sources</p>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: 'Trust stats: ConsumerAffairs — 78% of drivers skeptical of mechanics', href: 'https://www.consumeraffairs.com/automotive/auto-mechanics-trust-issues.html' },
                { label: 'Trust stats: Jerry — Americans United in Confusion, Distrust Over Car Repair Costs', href: 'https://jerry.ai/studies/americans-united-in-confusion-distrust-over-car-repair-costs/' },
                { label: 'Market size: Mordor Intelligence — US Automotive Service Market', href: 'https://www.mordorintelligence.com/industry-reports/united-states-automotive-service-market' },
                { label: 'Fleet age & size: S&P Global Mobility — US vehicle age hits 12.8 years, 289M vehicles (2025)', href: 'https://press.spglobal.com/2025-05-21-U-S-Vehicle-Age-Rises-Again-to-12-8-Years-in-2025,-According-to-S-P-Global-Mobility' },
                { label: 'Cost of ownership: AAA Your Driving Costs 2025', href: 'https://newsroom.aaa.com/wp-content/uploads/2025/09/UPDATE-AAA-Fact-Sheet-Your-Driving-Cost-9.2025-1.pdf' },
                { label: 'FIXD cautionary tale: Trustpilot reviews', href: 'https://www.trustpilot.com/review/www.fixdapp.com' },
                { label: 'Price transparency incumbent: RepairPal Fair Price', href: 'https://repairpal.com/repairpal-fair-price-guarantee' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
