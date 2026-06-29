import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export function BackseatDriverContent() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Constructive Distractions', href: '/projects' },
            { label: 'Backseat Driver' },
          ]}
        />

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Constructive Distractions</p>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4 font-heading">Backseat Driver</h1>
          <p className="text-base text-foreground mb-3 max-w-2xl leading-relaxed">
            A car-maintenance advisor that works for the owner, not the shop.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            US auto repair is a $199B market built on 289M vehicles with an average age of 12.8 years — the oldest ever recorded. 78% of drivers distrust the shops they depend on. The app that actually fixes this doesn&apos;t exist yet.
          </p>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
            Build in progress
          </span>
        </div>

        {/* Stats */}
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
          {/* The Moment */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">The moment that matters</h2>
            <p className="text-sm text-foreground leading-relaxed max-w-2xl mb-4">
              Picture it: you&apos;re in the oil-change waiting room. The service advisor comes out with a clipboard. Your cabin air filter is &ldquo;really dirty.&rdquo; Your brake fluid is &ldquo;discolored.&rdquo; They recommend a flush — $340 all-in. You have no idea if any of it is true, urgent, or fairly priced. So you either pay and feel played, or decline and spend the next week wondering if your brakes are quietly failing.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
              83% of drivers consult someone else after a mechanic&apos;s recommendation — a parent, a friend, a frantic Google search in the parking lot. The behavior already exists. The product doesn&apos;t.
            </p>

            <div className="border-t border-border">
              {[
                { num: '01', label: "You don't know your schedule", detail: "Most owners have no idea what the manufacturer actually recommends at a given mileage — what's real vs. what's marketing." },
                { num: '02', label: "You can't see what's coming", detail: "There's a timeline of upcoming work — some expensive — with no tool that surfaces it proactively." },
                { num: '03', label: "You're captive at the shop", detail: "Upsells arrive when the car is on the lift and leaving costs time. No low-pressure way to evaluate what you're being told." },
                { num: '04', label: "You can't evaluate a recommendation", detail: "Is it real? How urgent? What's fair to pay? Does declining risk the warranty? No app answers this in real time." },
              ].map(({ num, label, detail }) => (
                <div key={num} className="flex gap-5 py-4 border-b border-border">
                  <span className="text-[10px] font-mono text-muted-foreground pt-1 flex-shrink-0 w-5">{num}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Personal story */}
          <section>
            <blockquote className="border-l-2 border-warning pl-5 py-1">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                &ldquo;My 2013 Hyundai Sonata engine seized one mile from the dealership. I&apos;d just gotten married, joined a pre-revenue startup, and my wife was the breadwinner. The dealership claimed the seizure was due to faulty maintenance and asked for records I didn&apos;t have — most of the work had been done by a family friend with paper receipts only. Credit card statements and a signed letter weren&apos;t enough. The dealership had no incentive to push the claim through.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-2">
                Seven months later, a service advisor twenty miles away told us something the first one didn&apos;t: you can photograph the engine internals to show the oil passages are clean — proof the seizure wasn&apos;t from neglect, regardless of paper records. We were lucky. Without him, I had no way to prove I&apos;d taken care of my car.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">(The engine was notorious for seizing — Hyundai had already faced a lawsuit — which is why the extended warranty existed. The records problem was still nearly enough to sink a claim I was legally entitled to.)</p>
            </blockquote>
          </section>

          {/* Competitive landscape */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">What&apos;s already out there</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Fragmented. Each app solves a slice. None solves the moment that matters.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Examples</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">The problem with it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { cat: 'Log & reminder apps', ex: 'Drivvo, AUTOsist', gap: 'Passive ledgers — no decision support, high abandonment' },
                    { cat: 'OBD dongle apps', ex: 'FIXD, OBDeleven', gap: 'Hardware barrier; FIXD devolved into dark patterns and subscription traps' },
                    { cat: 'Auto-populated history', ex: 'CARFAX Car Care', gap: 'Backward-looking, data gaps, steers users toward dealers' },
                    { cat: 'Price transparency', ex: 'RepairPal', gap: 'Assumes you know what you need; monetized by shop referrals' },
                    { cat: 'On-demand mechanics', ex: 'YourMechanic', gap: 'Solves doing, not deciding' },
                    { cat: 'Car super-apps', ex: 'Jerry', gap: 'Maintenance is a shallow retention layer, not a core product' },
                  ].map(({ cat, ex, gap }) => (
                    <tr key={cat} className="bg-background hover:bg-card transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium align-top">{cat}</td>
                      <td className="px-4 py-3 text-muted-foreground align-top">{ex}</td>
                      <td className="px-4 py-3 text-muted-foreground align-top">{gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-2xl">
              The pattern: every app that gets close to the trust problem gets economically captured by the supply side it&apos;s supposed to police. FIXD&apos;s dark patterns. CARFAX&apos;s dealer steering. RepairPal&apos;s pay-to-be-listed model. The consumer has to be the customer.
            </p>
          </section>

          {/* The Product */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">The product</h2>
            <p className="text-sm text-muted-foreground mb-5">Three moments. Three distinct jobs.</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                {
                  moment: 'At home',
                  description: 'Enter your VIN → your actual maintenance schedule in plain English. What each item is, why it matters, what it costs. Reminders adapt to mileage.',
                },
                {
                  moment: 'At the shop',
                  description: 'They recommend something → open the app → legitimacy, urgency, fair price range, and exactly what to say to the advisor. The second opinion that already exists as a behavior.',
                },
                {
                  moment: 'After',
                  description: 'Snap the receipt → record vault updated. Warranty-grade documentation whether the work was done at a dealer or by a family friend with paper receipts.',
                },
              ].map(({ moment, description }) => (
                <div key={moment} className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{moment}</p>
                  <p className="text-sm text-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-success mb-3">Now — MVP</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'VIN → maintenance schedule',
                    'Smart reminders (mileage + time)',
                    'Second Opinion flow',
                    'Record vault',
                  ].map((feat) => (
                    <li key={feat} className="text-sm text-foreground">{feat}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-info mb-3">Next</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Community pricing (Glassdoor for mechanics)',
                    'Warranty-aware guidance',
                  ].map((feat) => (
                    <li key={feat} className="text-sm text-foreground">{feat}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-medium text-muted-foreground mb-3">Later</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'ML on uploaded photos',
                    'Shop-side verified records',
                  ].map((feat) => (
                    <li key={feat} className="text-sm text-foreground">{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Business Model */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-1">The business model</h2>
            <p className="text-sm text-muted-foreground mb-5">The incentive structure is the product. Every revenue decision flows from that.</p>
            <div className="flex flex-col gap-3">
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-foreground mb-1">Consumer subscription — ~$5–10/mo</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Schedule and reminders are free. Decision support and the record vault are paid. Positioning is explicit: we work for you, not the shop. No shop relationships. Clean incentives.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-foreground mb-1">Data flywheel — community pricing</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload receipts → see what others paid for the same job, same region, same vehicle. The give-to-get mechanic solves cold-start for price data and builds a compounding moat — consumer-sourced, not shop-sourced.
                </p>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section className="pb-8">
            <p className="text-xs text-muted-foreground mb-3">Sources</p>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: 'ConsumerAffairs — driver trust study', href: 'https://www.consumeraffairs.com/automotive/auto-mechanics-trust-issues.html' },
                { label: 'Jerry — Americans United in Confusion, Distrust Over Car Repair Costs', href: 'https://jerry.ai/studies/americans-united-in-confusion-distrust-over-car-repair-costs/' },
                { label: 'Mordor Intelligence — US Automotive Service Market', href: 'https://www.mordorintelligence.com/industry-reports/united-states-automotive-service-market' },
                { label: 'S&P Global Mobility — US vehicle age hits 12.8 years (2025)', href: 'https://press.spglobal.com/2025-05-21-U-S-Vehicle-Age-Rises-Again-to-12-8-Years-in-2025,-According-to-S-P-Global-Mobility' },
                { label: 'RepairPal Fair Price Guarantee', href: 'https://repairpal.com/repairpal-fair-price-guarantee' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
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
