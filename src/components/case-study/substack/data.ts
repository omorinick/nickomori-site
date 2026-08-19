// Content for the Substack case study deck.
//
// Sourced from the content brief at ~/Documents/Substack_PM_Case_Study_Content_Brief.md plus the
// artifact reconstruction ledger (project memory: pricing-reconstruction-ledger.md).
// All working-process artifacts are sanitized recreations — no original images, dates, or names.

import type { FlagKind } from './primitives'
import type { StickyTone } from './tokens'

export const SIX_QUESTIONS = [
  { q: 'Who should we prioritize?', signal: 'Current value and TPV concentration', decision: 'Expected economic impact' },
  { q: 'What is happening?', signal: 'Growth, stability, contraction, or churn', decision: 'Intervention timing' },
  { q: 'Why might it be happening?', signal: 'Pricing, risk, disputes, technical issues, seasonality', decision: 'Problem-specific treatment' },
  { q: 'Can we change it?', signal: 'Addressability and ability to act', decision: 'Avoid waste and false positives' },
  { q: 'How should we help?', signal: 'Business profile and mindset', decision: 'Relevant value proposition' },
  { q: 'Where should it appear?', signal: 'Direct merchant or partner channel', decision: 'Delivery and ownership model' },
]

export const TRAJECTORIES = [
  'Churn',
  'Extreme contraction',
  'Contraction',
  'Minor contraction',
  'Minor growth',
  'Growth',
  'Extreme growth',
  'Reactivation / new',
]

export const MONEY_MAP = [
  { name: 'Technical issues', amt: 3750, kind: 'addressable' as const, note: 'Failed flows, conversion and auth degradation' },
  { name: 'Pricing', amt: 3625, kind: 'addressable' as const, note: 'Headline-rate exposure, recent fee increases' },
  { name: 'Risk & limitations', amt: 1750, kind: 'addressable' as const, note: 'Holds, reserves, limitations felt as punishment' },
  { name: 'Macro — bankruptcy, inactive, seasonal', amt: 942, kind: 'macro' as const, note: '~6% — not controllable' },
  { name: 'Not yet attributed', amt: 5815, kind: 'untagged' as const, note: 'The young model’s honest ~37%' },
]

export const STAGES = [
  { name: 'Call pilot', cohort: '2,000', how: 'Phone outreach, manual offers — the pilot was also the research instrument', rate: 5 },
  { name: 'Product-assisted', cohort: '20,000', how: 'In-product experience, manually batched fulfillment', rate: 20 },
  { name: 'Automated platform', cohort: '100,000', how: 'Automated eligibility, acceptance and fulfillment, with far better sequencing', rate: 30 },
]

// The definition hole — what churn was officially measured at, versus what was actually leaking.
export const DEFINITION = {
  official: { value: '~$3B', label: 'TPV', sub: 'what churn was officially sized at' },
  real: { value: '~$16B', label: 'TPV', sub: 'preventable decline, once you looked at trajectory' },
  rule: 'Churn = twelve consecutive months of no money movement.',
  hole: 'By the time a merchant tripped that rule they had almost no volume left with us. We were measuring the funeral, not the illness.',
  excluded: [
    { k: 'Macro', v: 'Politics, compliance, market conditions' },
    { k: 'Micro', v: 'Lost contracts, bankruptcy, seasonality' },
  ],
}

// Which problem space to enter first. The two we seriously considered and set aside, and why.
export const SPACE_CHOICE = [
  {
    space: 'Risk, limitations & holds',
    pull: 'The most painful thing we do to merchants. Emotionally the obvious place to start.',
    problem: 'An iceberg of legacy rules and friction owned by another org. Every fix meant a policy change, and policy changes are slow and lagging.',
    verdict: 'Set aside',
  },
  {
    space: 'Disputes',
    pull: 'Large, well understood, and merchants talk about it constantly.',
    problem: 'Too many stakeholders with conflicting incentives — buyer protection, risk, and the merchant side all pulling different directions.',
    verdict: 'Set aside',
  },
  {
    space: 'Pricing',
    pull: 'Not the biggest bucket. But the fastest thing we could learn from.',
    problem: 'Real margin cost, and a genuine risk of paying merchants who were never going to leave.',
    verdict: 'Chosen',
    chosen: true,
  },
]

export const WEDGE_REASONS = [
  { k: 'Immediate signal', v: 'A merchant accepts or doesn’t, within days. No lagging policy change to wait on.' },
  { k: 'The pool was identifiable', v: 'The attribution work had already sized and located it.' },
  { k: 'We knew the stakeholders', v: 'We had worked with pricing before. No cold-start on relationships.' },
  { k: 'Small enough to fund', v: 'It could run as an experiment on borrowed resources, not a funded program.' },
  { k: 'Reversible', v: 'Narrow eligibility, capped concessions, and we could stop it at any point.' },
]

// Why proactive save offers specifically — the bet inside the space.
export const FIRST_BET_REASONS = [
  {
    k: 'The margin existed',
    v: 'Poking around with the pricing team, I found they had headroom they were willing to spend on the right merchants. Nobody had asked.',
  },
  {
    k: 'The analyst existed',
    v: 'A pricing analytics person was willing to build the detection model for us — off the side of their desk.',
  },
  {
    k: 'It fit the timeline',
    v: 'We had promised evidence inside a month. This was the only bet on the board that could actually be run by humans in that window.',
  },
  {
    k: 'It would get a reaction',
    v: 'Offering someone money is the fastest way to find out whether they are still listening to you.',
  },
]

export const PROPRIETARY_LINE =
  'Everything from here on is a recreation. I am walking a line between showing you how we actually worked and not putting real numbers or internal boards on screen — so treat the shapes as real and the figures as illustrative.'


// PLACEHOLDER RESEARCH — every count here except "actively diverting volume" (8/20, Nick's
// correction) is a reconstruction designed to fit the narrative, pending the real study. Each row
// carries an `unresolved` flag in review mode so none of it can reach a live presentation
// unnoticed. Each finding is also load-bearing for a downstream track, noted in `seeds`.
export const FINDINGS: { label: string; n: number; seeds: string; real?: boolean }[] = [
  { label: 'Reacted positively to the offer', n: 17, seeds: 'The wedge worked — but not for the reason we assumed' },
  { label: 'Framed it as recognition, not a discount', n: 13, seeds: 'The insight — standing and loyalty as product surface' },
  { label: 'Said the money mattered, but wouldn’t move volume for it', n: 12, seeds: '“Every dollar counts” — price is real, just not decisive' },
  { label: 'Couldn’t say what their fees actually bought them', n: 14, seeds: '→ Value communication track' },
  { label: 'Named a non-pricing frustration as the bigger issue', n: 11, seeds: '→ Disputes, risk holds, integration health tracks' },
  { label: 'Made their payments decision years ago and never revisited it', n: 15, seeds: '→ The early-lifecycle move: decisions get made once, early' },
  { label: 'Were actively diverting volume to another processor', n: 8, seeds: 'Real switching existed — but it was the minority', real: true },
]

export const FINDING_NOTE =
  'The merchants who were moving had decided months before our signal ever fired. That is the whole argument for meeting them earlier in the lifecycle.'

export const CLUSTERS = [
  { name: 'Value Realization', q: 'Do merchants understand what they get for what they pay?' },
  { name: 'Competitive Clarity', q: 'Do we get a chance to compete?' },
  { name: 'Right Offer, Right Time', q: 'Are we reaching at-risk merchants fast enough?' },
  { name: 'Transparency Without Backfire', q: 'Honesty without creating new problems?' },
  { name: 'Relationship & Loyalty', q: 'Do merchants feel valued, or just transactional?' },
  { name: 'Channel & Persona Fit', q: 'Where and how do merchants want to hear from us?' },
  { name: 'System Integrity', q: 'How do we prevent gaming?' },
]

export const BETS = [
  { bet: 'Rate reduction for detected decliners — “we can MVP with humans”', triage: 'Must Have', votes: 2, fate: 'Selected — the wedge', hot: true },
  { bet: 'Full-funnel tracking: offer → acceptance → 30/60/90-day retention', triage: 'Must Have', votes: 1, fate: 'Built alongside the pilot' },
  { bet: 'Post-save follow-on: “You’ve saved $342 this month with your new rate”', triage: 'Must Have', votes: 0, fate: 'Paired with the offer' },
  { bet: 'Multi-product value report (fraud prevented, disputes won, hours saved)', triage: 'Must Have', votes: 2, fate: 'Sequenced later → value communication' },
  { bet: 'Peer rate comparison — “merchants your size typically pay…”', triage: 'Won’t Have', votes: 3, fate: 'Rejected despite votes — data confidence; invites comparison shopping', dead: true },
  { bet: 'Escalating offer ladders (10bps → 20bps → rep call)', triage: 'Won’t Have', votes: 0, fate: 'Rejected — “too easy to game”', dead: true },
  { bet: 'Early-warning preemption — “measuring pre-decliners”', triage: 'Won’t Have', votes: 0, fate: 'Deferred deliberately — later became the upstream program', dead: true },
]

export const MATRIX = {
  cols: ['Proactive pricing', 'Tech issues', 'Risk / limitations', 'Value communication'],
  rows: [
    { c: 'Attributed pool', v: ['◐ ~$3.6B', '● ~$3.8B', '○ ~$1.8B', '○ cuts across'] },
    { c: 'Speed to first learning', v: ['● calls in weeks', '○ eng discovery', '○ policy change', '◐ survey cycles'] },
    { c: 'Manually testable', v: ['● MVP with humans', '○ needs an eng fix', '◐ case-by-case review', '◐ mocked reports'] },
    { c: 'Reversible, capped exposure', v: ['● narrow + caps', '● ship and revert', '◐ loss exposure', '● comms only'] },
    { c: 'Cleanly measurable', v: ['● holdouts, margin', '◐ messy attribution', '◐ confounded by risk actions', '○ survey-based'] },
    { c: 'Operational readiness', v: ['● pricing ops existed', '○ many teams', '○ risk org owns', '○ data not plumbed'] },
    { c: 'Margin / downside risk', v: ['◐ real concession cost', '● none', '◐ absorbed losses', '● none'] },
  ],
}

export const FLOW_LAYERS = [
  { layer: 'Predictive signal', detail: 'Decline & churn detection · reason attribution · re-decline detection after a save', reused: true },
  { layer: 'Eligibility policy', detail: 'Value tier · supported geo/product · headline-rate status · tenure · exclusions: sales-managed, unresolved holds', reused: true },
  { layer: 'Offer decisioning', detail: 'Tiering by volume · personalized savings calc · expiry · competitor-rate counter path (designed) · no escalation ladders', reused: true },
  { layer: 'Merchant experience', detail: 'Multi-channel reach → portal surfaces → offer in dollars, not bps → accept / talk to a human', reused: false },
  { layer: 'Fulfillment', detail: 'Manual queue → batched → automated repricing, with rate-verification QA', reused: true },
  { layer: 'Measurement & learning', detail: 'Savings visibility · 30/60/90-day cohorts vs holdout · learning from rejectors', reused: true },
]

export const CATEGORIES: { name: string; color: string; tone: StickyTone; ex: string }[] = [
  { name: 'Desirability', color: '#E8503A', tone: 'orange', ex: '“Merchants want to be recognized as valuable — not treated generically.”' },
  { name: 'Usability', color: '#E89B3A', tone: 'yellow', ex: '“Merchants won’t feel surveilled by us knowing they’re at risk.”' },
  { name: 'Feasibility', color: '#8B5CF6', tone: 'purple', ex: '“We can identify why they’re declining — pricing vs performance vs risk.”' },
  { name: 'Viability', color: '#3B82F6', tone: 'blue', ex: '“We’re not lowering pricing for people who wouldn’t have churned.”' },
  { name: 'Legal & ethical', color: '#22A06B', tone: 'green', ex: '“Personalized pricing doesn’t discriminate; urgency is truthful.”' },
]

export const QUADRANT = [
  { id: 'D1', label: 'Offer lands as recognition, not insult', x: 4, y: 5, dx: -0.12, dy: 0.14 },
  { id: 'V1', label: 'Merchants can actually respond', x: 4, y: 5, dx: 0.18, dy: -0.1, hero: true },
  { id: 'V2', label: 'Not subsidizing stayers', x: 4, y: 5, dx: -0.05, dy: -0.22 },
  { id: 'V4', label: 'Saves persist over time', x: 4, y: 5, dx: 0.3, dy: 0.18 },
  { id: 'U2', label: 'Terms understood', x: 4, y: 4, dx: 0, dy: 0 },
  { id: 'F2', label: 'Attribution separates pricing-driven decline', x: 4, y: 4, dx: 0.25, dy: -0.2 },
  { id: 'O1', label: 'Leadership permits the experiment', x: 3, y: 5, dx: 0, dy: 0 },
]

export const FAMILIES = [
  { name: 'Economic recognition', note: 'Tiers, earn-backs, milestones, bundles' },
  { name: 'Protection & trust', note: 'Covered disputes, faster risk review' },
  { name: 'Operational confidence', note: 'Integration health, support, invoicing' },
  { name: 'Growth enablement', note: 'BNPL, capital, AI assistant, ads' },
  { name: 'Recognition & progress', note: 'Standing, progress, value framing' },
]

// The tracks that spun out of the research. Breadth is the point here, not depth — most are small
// bets that compound. All impact figures are placeholders pending Nick's numbers.
export const TRACKS: {
  name: string
  what: string
  size: 'Small bet' | 'Large bet'
  status: 'Shipped' | 'In flight' | 'Exploring'
  result?: string
}[] = [
  {
    name: 'Dispute protection',
    what: 'Absorb selected lost disputes for merchants in good standing, and make the protection visible',
    size: 'Large bet',
    status: 'In flight',
    result: '+8pp 90-day TPV retention vs. holdout',
  },
  {
    name: 'Value communication',
    what: 'Reframe the bill: not “you paid $X,” but the fraud stopped, disputes won, uptime, and hours saved',
    size: 'Large bet',
    status: 'In flight',
    result: 'Actively resourced today',
  },
  {
    name: 'High-potential scoring',
    what: 'The decline model inverted — score merchants early and deliver proven value in the first 90 days',
    size: 'Large bet',
    status: 'In flight',
    result: '22% vs. 12% reached high value within 180 days',
  },
  {
    name: 'Partner intelligence',
    what: 'Detection and pricing controls exposed to platforms who serve their own merchants',
    size: 'Large bet',
    status: 'In flight',
    result: '10% partner adoption in three months',
  },
  {
    name: 'Milestone pricing',
    what: '“You’ve processed $100K — you’ve unlocked a better rate”',
    size: 'Small bet',
    status: 'Shipped',
    result: '~12% of eligible merchants hit a milestone in the first quarter',
  },
  {
    name: 'Product bundles',
    what: 'Pricing built on complementary products, not raw product count',
    size: 'Small bet',
    status: 'Shipped',
    result: '~20% relative lift in second-product activation',
  },
  {
    name: 'Savings visibility',
    what: '“You’ve saved $342 this month with your new rate” — make the win recur',
    size: 'Small bet',
    status: 'Shipped',
    result: '~2× repeat engagement with the monthly savings summary',
  },
  {
    name: 'Integration health',
    what: 'Detect technical degradation and tell the merchant before it costs them volume',
    size: 'Small bet',
    status: 'In flight',
    result: 'Detection live; merchant-facing alerts in build',
  },
  {
    name: 'Risk & holds transparency',
    what: 'Surface limitations within 24 hours, resolve self-serve, stop them reading as punishment',
    size: 'Small bet',
    status: 'In flight',
    result: 'Surfacing live; self-serve resolution in build',
  },
  {
    name: 'Growth capability surfacing',
    what: 'BNPL, working capital, and financing put in front of merchants who qualify',
    size: 'Small bet',
    status: 'Exploring',
    result: 'Eligibility model scoped; no build committed yet',
  },
]

// Substack's own growth-accounting vocabulary, mapped honestly — including the stage we chose not
// to work on and why.
export const LIFECYCLE = [
  { stage: 'Acquisition', ours: 'Not my surface — owned elsewhere', state: 'none' as const },
  {
    stage: 'Activation',
    ours: 'High-potential scoring at day 14; proven value delivered inside the first 90 days',
    state: 'active' as const,
  },
  {
    stage: 'Retention',
    ours: 'Proactive pricing, dispute protection, value communication, integration health',
    state: 'active' as const,
  },
  {
    stage: 'Resurrection',
    ours: 'Deliberately deprioritized — by the time volume hits zero it is bankruptcy or a completed migration, and they are unreachable',
    state: 'skipped' as const,
  },
  { stage: 'Referral', ours: 'Not addressed', state: 'none' as const },
]

export const PARTNER_CAPABILITIES = [
  { name: 'Detection', detail: 'Risk and potential bands, leading reason codes, eligibility decisions — on their merchants' },
  { name: 'Banding', detail: 'Group merchants however their business works: subscription tier, processing volume, tenure, their own logic' },
  { name: 'Pricing control', detail: 'Set rates per band — and offer permanent or temporary discounts to merchants the model flags' },
  { name: 'Delivery', detail: 'Their brand, their consent model, their economics, their call to action' },
  { name: 'Measurement', detail: 'Outcome reporting back on what the intervention did' },
]

export const DIVES: {
  tab: string
  hmw: string
  target: string
  treatment: string
  results: { text: string; kind: FlagKind }[]
  learning: string
}[] = [
  {
    tab: 'Pricing & bundles',
    hmw: 'How might we reward merchants for deepening their PayPal relationship while helping them reach their next growth milestone?',
    target: 'Growth-oriented order/logistics merchants using one product deeply, with clear adjacent-product potential.',
    treatment:
      'Temporary 25bps incentive for adopting an additional capability; volume milestones unlocking preferred pricing; bundles built on complementary products, not raw product count.',
    results: [
      { text: '~20% relative lift in second-product activation', kind: 'assumption' },
      { text: '~6–8% incremental TPV over 90 days', kind: 'assumption' },
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
      { text: '+8pp 90-day TPV retention vs. holdout', kind: 'assumption' },
      { text: '15–20% fewer eligible merchants entered extreme contraction', kind: 'assumption' },
      { text: '~2× contribution-margin return relative to covered losses', kind: 'assumption' },
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
      { text: '~2× engagement with benefit-detail content', kind: 'assumption' },
      { text: '~10–15% lift in relevant product exploration', kind: 'assumption' },
      { text: 'No statistically meaningful immediate TPV movement', kind: 'assumption' },
    ],
    learning: 'Relationship treatments can create value without immediate transaction movement — but need different success metrics.',
  },
]

export const PROFILES = [
  { name: 'Scope-centric', pct: 34, note: 'Projects & consulting — invoices, scope, tax clarity' },
  { name: 'Orders-centric', pct: 29, note: 'Retail & ecommerce — checkout, disputes, conversion' },
  { name: 'Schedule-centric', pct: 16, note: 'Appointments & services — booking, cash-flow' },
  { name: 'Logistics-centric', pct: 10, note: 'Manufacturing & wholesale — reliability, reconciliation' },
]

// The first four are real verbatims. The rest are reconstructions written to carry the same
// narrative load, pending the real transcripts — flagged as such wherever they appear.
export const QUOTES: { text: string; theme: string; real?: boolean }[] = [
  { text: '“It’s about time PayPal recognized my loyalty. Thank you.”', theme: 'Recognition', real: true },
  { text: '“It forces me to stay and feel appreciated…it really enforces my stay with you guys.”', theme: 'Recognition', real: true },
  { text: '“With an offer like this I’m less worried about moving my customers to Zelle and Venmo because of fees.”', theme: 'Price is real', real: true },
  { text: '“Are these disputes going to lower my ranking in PayPal…are they going to see me as a problem customer?”', theme: 'Standing', real: true },
  { text: '“Every dollar counts at our size — but I’m not switching processors over twenty basis points.”', theme: 'Price isn’t decisive' },
  { text: '“I set this up years ago and honestly haven’t looked at it since.”', theme: 'Entrenchment' },
  { text: '“I couldn’t tell you what I actually get for what I pay.”', theme: 'Value legibility' },
]

export const PRINCIPLES = [
  'Choose the first bet for learning-adjusted leverage.',
  'Quantitative evidence locates the problem; qualitative evidence interprets it.',
  'Customer success is the monetization model — deliver value, and make it legible.',
]

// ---------- narrative spine: parts, takeaways, misses ----------

export const ACTS = [
  { id: 'act-1', num: 'I', title: 'The Opportunity', anchor: 'problem' },
  { id: 'act-2', num: 'II', title: 'It worked. We didn’t know why.', anchor: 'wedge-results' },
  { id: 'act-3', num: 'III', title: 'Follow the momentum', anchor: 'tracks' },
  { id: 'act-4', num: 'IV', title: 'Multiply across segments', anchor: 'partner' },
]

// Merchant TPV waterfall — acquisition and back-book growth pour in, churn & decline erases it.
// Figures carried over from Nick's merchant-experience commercial case.
export const TPV_YEARS: Record<string, { label: string; value: number; type: 'total' | 'up' | 'down' }[]> = {
  'FY23→24': [
    { label: 'FY 2023', value: 118.3, type: 'total' },
    { label: 'Acquisition', value: 4.5, type: 'up' },
    { label: 'Back-book growth', value: 28.3, type: 'up' },
    { label: 'Churn & decline', value: -33.5, type: 'down' },
    { label: 'FY 2024', value: 117.6, type: 'total' },
  ],
  'FY24→25': [
    { label: 'FY 2024', value: 117.6, type: 'total' },
    { label: 'Acquisition', value: 4.9, type: 'up' },
    { label: 'Back-book growth', value: 28.5, type: 'up' },
    { label: 'Churn & decline', value: -33.0, type: 'down' },
    { label: 'FY 2025', value: 118.0, type: 'total' },
  ],
}

export const TPV_CAPTIONS: Record<string, string> = {
  'FY23→24': '$118.3B → $117.6B · net −1%',
  'FY24→25': '$117.6B → $118.0B · net 0% growth',
}

// Shipped bets, in the format Nick used in the commercial case: what the merchant saw, what had to
// be built behind it, and what it moved.
export const SHIPPED_BETS = [
  {
    name: 'Proactive Save Discounts',
    status: 'Shipped · US',
    alias: 'The first bet — “Proactive Retention Pricing”',
    front: 'Self-serve discount offers through the Merchant Portal and email for at-risk merchants.',
    back: 'Built the first instant opt-in pricing interface in the Portal; stitched the pricing engine to ops; aligned a new pricing strategy.',
    impact: '1.4K+ merchants opted in; sub-$1M TPV cohort showing +5% TPV uplift vs. control (~$40M incremental TPV).',
  },
  {
    name: 'Enhanced Seller Protection',
    status: 'Shipped · Global',
    alias: 'a.k.a. “Enhanced Dispute Protection”',
    front: 'Portal auto-covers high-value disputes; “we have your back” comms reinforce the value monthly.',
    back: 'Approved a contra budget; built back-end logic to override legacy buyer-biased dispute rules.',
    impact: '~15K merchants covered in month one; +7% TPV uplift; 4pp improvement in churn & decline (~$100M+ incremental TPV).',
  },
  {
    name: 'Proactive Risk Experience Audit',
    status: 'Shipped · Global',
    alias: 'Internally: “the rules audit”',
    front: 'Fewer holds and limitations landing on merchant accounts.',
    back: 'Stood up a tiger team and the data infrastructure to audit back-end rules with high appeal and lift rates.',
    impact: '~$65M TPV protected in 2026; ~4K fewer merchants per month hit by risk actions.',
  },
]

export const TAKEAWAYS = [
  {
    n: 1,
    id: 'takeaway-1',
    title: 'You don’t have to build it to learn it.',
    sub: 'Growth is a paralyzingly large space. What unlocked it for me was shrinking the question, not the ambition.',
    points: [
      'Every assumption got matched to the cheapest method that could retire it: ask someone, run a prototype, check the data, or — last — build.',
      'On our own learning board, “Just Ask” was the biggest column by a distance — a lot of what looked like technical risk was somebody in another team already knowing the answer.',
      'Engineering time went only where no conversation could settle it — whether the pricing platform could take thousands of individual overrides and hand them all back, and whether email and the Portal could read one source of truth instead of two.',
      'The first version of the product itself was people making phone calls.',
    ],
    bridge:
      'The constraint on a platform your size isn’t reach. It’s knowing which lever moves what — and most of that is learnable before anyone writes code.',
  },
  {
    n: 2,
    id: 'takeaway-2',
    title: 'We’re paid to create positive correlation, not to prove causation.',
    sub: 'Causation still matters — just later, and for a different job: knowing where to double down.',
    points: [
      'We handed the outreach list to sales so reps could personally thank our highest-volume merchants for their loyalty.',
      'It muddied the experiment. It also delivered more value to more merchants, faster.',
      'We bought the causal answer afterward, with research — which is exactly when we needed it.',
    ],
    bridge:
      'A clean experiment that delays value is not a win. Get the lift, then go find out why it happened.',
  },
  {
    n: 3,
    id: 'takeaway-3',
    title: 'Plan broadly. Commit narrowly. Come back for the good ideas.',
    sub: 'The plan’s value turned out to be the map, not the itinerary.',
    points: [
      'Six problem spaces, seven opportunity areas, about forty candidate bets. We shipped one and followed where it led.',
      'The row we dismissed on our own board as “measuring pre-decliners, lol” became the early-lifecycle program.',
      'Value communication sat untouched for months, then came back as one of our most-invested tracks.',
    ],
    bridge:
      'Momentum is information. When one thing starts working, the roadmap you wrote before you had that information is the thing that should move.',
  },
  {
    n: 4,
    id: 'takeaway-4',
    title: 'Multiply wins across segments, not just across the lifecycle.',
    sub: 'The second axis I nearly missed — the same intelligence, delivered through somebody else’s relationship.',
    points: [
      'We had already multiplied across the lifecycle — retention first, then early activation. The second axis was segment.',
      'We gave platforms who serve their own merchants the detection model and the pricing controls, under their brand.',
      'The most under-exploited product surface most companies own is the internal tool they built for themselves.',
    ],
    bridge:
      'The tooling you build to understand readers is tooling your creators want for their own audiences.',
  },
]

export const MISSES = [
  {
    id: 'miss-1',
    act: 'Act I',
    headline: 'We knowingly paid to reach merchants who were never going to leave.',
    detail:
      'Two rules-based cohorts is a blunt instrument. A meaningful share of the offers we sent went to merchants who would have stayed anyway — a real discount against real margin, for no incremental volume.',
    resolution:
      'Pricing Strategy warned us about exactly this, and they were directionally right. We couldn’t eliminate the cost, so we bounded it: narrow eligibility, capped concessions, sales-managed accounts carved out, holdouts preserved at every stage.',
  },
  {
    id: 'miss-2',
    act: 'Act II',
    headline: 'The model’s core premise was wrong for most of the people it flagged.',
    detail:
      'We built something that looked for merchants leaving for a competitor. Most of the merchants it surfaced weren’t leaving at all — they were shrinking, distracted, or quietly frustrated about something that had nothing to do with price.',
    resolution:
      'We only found that out because we went and asked. The result held; the explanation didn’t. That reinterpretation is what produced every track that came after.',
  },
  {
    id: 'miss-3',
    act: 'Act III',
    headline: 'We defined “high potential” in dollars, and it cost us the best merchants we had.',
    detail:
      'Scoring early-lifecycle merchants on monetary trajectory systematically undervalued small, durable service businesses — steady, loyal, low-volume, and far more likely to still be here in five years than the fast-growing accounts we prioritized.',
    resolution:
      'We were optimizing for the size of the relationship instead of its durability. Score creators by revenue alone and you will make exactly the same mistake.',
  },
]

export const DIVE_STEPS = [
  { id: 'dive-b1', short: 'Decompose' },
  { id: 'dive-b2', short: 'Diverge' },
  { id: 'dive-b3', short: 'Converge' },
  { id: 'dive-b4', short: 'Design' },
  { id: 'dive-b5', short: 'De-risk' },
  { id: 'dive-b6', short: 'Plan' },
  { id: 'dive-b7', short: 'Scale' },
  { id: 'dive-b8', short: 'Results' },
]

// ---------- recreated artifact data ----------

export const ATTR_COLS = ['HV SMB', 'EHV SMB', 'HV+EHV total', 'Annualized ×12', 'Long-tail (est.)', 'Whole portfolio (est.)']

export const ATTR_ROWS: [string, ...number[]][] = [
  ['Bankruptcy', 2.4, 0.2, 2.6, 31.2, 4.7, 35.9],
  ['Inactive URL', 20.2, 5.3, 25.5, 306.0, 45.7, 351.7],
  ['Seasonality', 15.6, 24.6, 40.2, 482.4, 72.1, 554.5],
  ['Risk', 119.1, 7.7, 126.9, 1522.8, 227.5, 1750.3],
  ['Tech issue', 259.1, 12.8, 271.9, 3262.8, 487.6, 3750.4],
  ['Pricing', 239.8, 22.9, 262.8, 3153.6, 471.3, 3624.9],
  ['Not yet tagged', 188.0, 233.6, 421.6, 5059.2, 756.1, 5815.3],
]

export const ATTR_TOTALS = [844.2, 307.2, 1151.3, 13815.6, 2065.0, 15880.6]

export const METRIC_BOARD: { space: string; rows: [string, string][] }[] = [
  {
    space: 'Pricing',
    rows: [
      ['% who understand their rates and fees', 'Do they know what they pay?'],
      ['% who’ve seen/realized the value of branded checkout (with fees)', 'Do they know what the price buys?'],
      ['% of eligible merchants shown proactive rate offers', 'Are we reaching the right people?'],
      ['% of rate offers actioned', 'Are they taking the offer?'],
      ['Time from churn signal → offer → merchant response', 'Are we acting fast enough?'],
      ['% of decliners reached within 48 hours', 'Speed of response'],
    ],
  },
  {
    space: 'Risk / limitations / holds',
    rows: [
      ['% of limitations surfaced within 24 hours', 'Speed of visibility'],
      ['% of limitations actually seen by the merchant', 'Did they see it?'],
      ['% acted on within 24/48/72 hours', 'Speed of action'],
      ['% resolved before account impact', 'Did they beat the deadline?'],
      ['% resolved self-serve vs. support', 'Can they fix it themselves?'],
    ],
  },
  {
    space: 'Tech issues',
    rows: [
      ['% of tech issues detected by PayPal', 'Are we catching problems?'],
      ['% of detected issues surfaced to the merchant', 'Are we telling them?'],
      ['% seen within 24 hours', 'Speed of awareness'],
      ['% resolved within 48 hours', 'Resolution speed'],
      ['% of merchants with a healthy integration score', 'Proactive health baseline'],
    ],
  },
  {
    space: 'Ecosystem investment',
    rows: [
      ['% of merchants at 1 product', 'Size of the at-risk population'],
      ['% of merchants at 2+ products', 'Portfolio strength'],
      ['Cross-sell CTR and conversion', 'Are they interested? Completing?'],
      ['% of new products activated within 30 days', 'Speed of adoption'],
      ['% of cross-sell shown after a trust moment', 'Are we earning before asking?'],
    ],
  },
  {
    space: 'Platform engagement',
    rows: [
      ['Days since last transaction', 'Inactivity signal'],
      ['Login frequency trend (MoM)', 'Engagement trajectory'],
      ['% of declining merchants who received an intervention', 'Are we reaching them?'],
      ['% of interventions that reversed the declining trend', 'Did it work?'],
      ['Days from first decline signal to intervention', 'Speed of response'],
    ],
  },
  {
    space: 'Disputes',
    rows: [
      ['% of open disputes surfaced within 24 hours', 'Speed of visibility'],
      ['% of merchants with open disputes who took action in the portal', 'Are we driving response?'],
      ['Time from dispute opened → merchant first response', 'Does visibility accelerate action?'],
      ['% of dispute responses completed in-place', 'The core job'],
      ['Dispute-related support contact rate', 'Are we reducing confusion?'],
    ],
  },
]

export const HMW_DETAIL = [
  {
    name: '1 · Value Realization',
    q: 'Do merchants understand what they’re actually getting for what they pay?',
    hmws: [
      'HMW help merchants understand the ROI of branded checkout, FX, and fraud protection?',
      'HMW visualize cost savings — “we’ve saved you $X in fraud”?',
      'HMW create personalized ROI calculators?',
      'HMW make the hidden value visible (fraud prevented, disputes won)?',
    ],
    metric: '% who’ve seen/realized value · % who understand the fees',
  },
  {
    name: '2 · Competitive Clarity',
    q: 'Do merchants know how we actually compare — and do we get a chance to compete?',
    hmws: [
      'HMW simplify pricing so it’s easy to compare apples-to-apples?',
      'HMW encourage merchants to share competitor rates so we get a chance to match?',
      'HMW help merchants feel the true switching cost — not just price?',
    ],
    metric: '% who’ve seen a competitive comparison · how many share competitor rates',
  },
  {
    name: '3 · Right Offer, Right Time',
    q: 'Are we reaching at-risk merchants fast enough with the right offer?',
    hmws: [
      'HMW increase speed from churn signal → offer surfaced → merchant response?',
      'HMW make sure we’re reaching the right people — not wasting offers on non-churners?',
      'HMW reach decliners within 48 hours of detection?',
    ],
    metric: '% of eligible shown offers · % actioned · time-to-offer',
  },
  {
    name: '4 · Transparency Without Backfire',
    q: 'How do we get honest about pricing without creating problems we didn’t have?',
    hmws: [
      'HMW help merchants fully grasp PayPal pricing and fee math?',
      'HMW make pricing conversations feel like partnership, not negotiation?',
      'HMW be honest without inviting comparison shopping?',
    ],
    metric: '% of pricing communications opened · % who understand the fees',
  },
  {
    name: '5 · Relationship & Loyalty',
    q: 'Do merchants feel valued, or just transactional?',
    hmws: [
      'HMW reward loyalty proactively — not just reactively?',
      'HMW make merchants feel valued before they’re at risk?',
      'HMW help merchants feel the relationship cost of leaving, not just the financial cost?',
    ],
    metric: '% of good-standing merchants recognized before any risk signal · sentiment on “PayPal values my business”',
  },
  {
    name: '6 · Channel & Persona Fit',
    q: 'Are we reaching merchants where they are, how they prefer?',
    hmws: [
      'HMW change how we communicate by persona (size, industry)?',
      'HMW use each merchant’s preferred channels?',
      'HMW coordinate with sales teams without interference?',
    ],
    metric: '% of communications opened · time to offer response',
  },
  {
    name: '7 · System Integrity',
    q: 'How do we prevent gaming and protect the business?',
    hmws: [
      'HMW offer competitive pricing to true churners without training everyone to threaten leaving?',
      'HMW ensure we’re not lowering pricing for people who wouldn’t have churned?',
    ],
    metric: 'Guardrail — % of offers going to merchants who would have stayed (inverse)',
  },
]

export const IDEA_WALL = [
  '“PayPal Wrapped” — a quarterly ROI report: the fees you paid, the value you received',
  'Forecasting calculator — how much more you’d make with more volume, benchmarked to “merchants like you”',
  'Bundle pricing — “you know my business from onboarding; recommend the bundle with the best pricing”',
  'Offer value-added services instead of price discounts',
  'Reach out to non-decliners as a control — how much “surprise churn” do we prevent?',
  'A platform “value display” every product team feeds — put it right up front',
  'Contextual fee transparency — “the $15 dispute fee is industry standard; you saved $15K via fraud protection”',
  'One centralized page: your fees and your ROI, per line item',
]

export const BETS_FULL = [
  ['Rate reduction for detected decliners', '“We value your business — here’s a reduced rate,” multi-channel', 'Must Have', 'Acceptance rate · 90-day retention of acceptors', 'Margin impact · non-decliner request rate (gaming)', '“We can MVP with humans” — near-term pilot target', true],
  ['Alternative value for non-qualifiers', '“You don’t qualify for a rate reduction — here’s 3 months of Advanced Fraud Protection free”', 'Should Have', 'Alternative acceptance vs. no-offer control', 'Perception of “second tier”', 'Value instead of discount', false],
  ['Volume-based recapture incentive', '“Hit $50K volume in the next 60 days and lock in the 2.6% rate”', 'Could Have', 'Volume recovery % · rate-lock conversion', 'Gaming via temporary volume spike', 'Parked — milestone pricing picked this up later', false],
  ['Escalating offer ladders', 'Offer 1: 10bps → Offer 2: 20bps + fee waiver → Offer 3: rep outreach', 'Won’t Have', 'Cumulative conversion across tiers', 'Trains merchants to wait for better offers', '“Too easy to game”', false],
  ['Tailored offers by merchant type', 'SMB: automated rate reduction · Micro: fee cap', 'Could Have', 'Segment-specific retention lift', 'Complexity · fairness perception', 'Deferred until the segments were real', false],
  ['Offer at point of offboarding intent', 'In-flow modal: “Before you go — would a 15% rate reduction change your mind?”', 'Should Have', 'Save rate · reactivation within 30 days', 'Flow friction · false-positive “leaving” signals', 'Blocked — no reliable offboarding-intent signal', false],
  ['Win-backs for churned merchants', '“Come back — submit your current processor’s rate and we’ll try to beat it”', 'Should Have', 'Return rate · post-return retention', 'Cost of matching · intel accuracy', 'Most votes in the session', false],
  ['Rep-initiated saves during pricing complaints', 'Support rep empowered to offer a rate reduction in real time', 'Could Have', 'Retention of support-saved merchants', 'Rep discretion abuse · inconsistency', 'Needed rep guardrails we did not have yet', false],
  ['Goodwill offers on billing issues', '“We noticed a billing issue — here’s a rate reduction while we sort it out”', 'Won’t Have', 'Issue resolution + retention', 'Abuse via manufactured issues', 'Rejected — support already had a credit path', false],
] as const

export const BET_AREAS = [
  ['Save offers', '% reduction in pricing-attributed churn among offer-eligible merchants'],
  ['Value communication', '% who can articulate PayPal’s value relative to fees (survey) + retention correlation'],
  ['Non-decliners / loyalty', 'Churn reduction among non-flagged merchants + prevention of “surprise churn”'],
  ['Pricing architecture & transparency', '% reduction in “pricing confusion” as churn reason + fee-related tickets'],
  ['Self-service price management', '% of merchants who feel “in control” of their pricing'],
  ['Pricing education', '% who report “pricing matched expectations” at the 90-day mark'],
  ['Competitive response', 'Win rate against competitors + competitive intel gathered'],
]

export const SWIM_STAGES = ['Detect', 'Queue', 'Reach', 'Present', 'Engage', 'Negotiate', 'Accept', 'Fulfill & reinforce']

export const SWIMLANES: { lane: string; cells: (string | null)[] }[] = [
  {
    lane: 'Merchant',
    cells: [null, null, null, null, 'Acknowledges → contemplates → enters the flow', 'Shares competitor pricing', 'Accepts', 'Sees ongoing savings'],
  },
  {
    lane: 'Merchant portal',
    cells: [null, null, null, 'Offer displayed — pop-up · banner · card', null, 'Asks for competitor rates → returns updated price', 'Confirms: new price + total savings', null],
  },
  {
    lane: 'Backend systems',
    cells: ['Detects decline or churn risk', 'Queues eligible merchants', null, null, null, 'Analyzes requested price + legitimacy', null, 'Fulfills via pricing system · verifies rate applied'],
  },
  {
    lane: 'Comms channels',
    cells: [null, null, 'Email / SMS outreach', null, null, null, null, 'Confirmation + savings visibility'],
  },
]

export const ASSUMPTION_MAP: { cat: string; color: string; tone: StickyTone; phases: string[][] }[] = [
  {
    cat: 'Desirability',
    color: '#E8503A',
    tone: 'orange',
    phases: [
      ['Merchants want PayPal to proactively help before they churn', 'Contacted through their preferred channel'],
      ['Prefer personalized $ savings over generic percentages', 'Want the offer to feel exclusive and earned — not desperate'],
      ['Want the ability to negotiate or provide context', 'Want human help available for questions'],
      ['Want confirmation the discount is active', 'Want to see savings accumulate over time'],
    ],
  },
  {
    cat: 'Usability',
    color: '#E89B3A',
    tone: 'yellow',
    phases: [
      ['Will open/read messages from PayPal — not auto-ignore', 'Can identify the message as legitimate, not phishing'],
      ['Understand what the discount applies to', 'Can calculate whether this is a good deal for them'],
      ['Understand what we’re asking for (competitor rates)'],
      ['Can verify their new rate is applied correctly'],
    ],
  },
  {
    cat: 'Feasibility',
    color: '#8B5CF6',
    tone: 'purple',
    phases: [
      ['We can accurately predict which merchants will churn', 'Near-real-time triggers · accurate contact data'],
      ['Personalized savings calculated in real time', 'Offers expire automatically'],
      ['We can verify a competitor offer', 'Route to human reps when needed'],
      ['Track 30/60/90-day cohorts · detect re-decline after a save'],
    ],
  },
  {
    cat: 'Viability',
    color: '#3B82F6',
    tone: 'blue',
    phases: [
      ['Cost of intervention < cost of losing the merchant', 'Multi-channel reach justifies its cost'],
      ['Discount large enough to change behavior — small enough to keep margin'],
      ['No race to the bottom (“they tell a competitor and bring it back…”)', 'Doesn’t train merchants to always reject first'],
      ['Saved merchants actually retain — the intervention works'],
    ],
  },
  {
    cat: 'Legal & ethical',
    color: '#22A06B',
    tone: 'green',
    phases: [
      ['Churn-prediction targeting compliant with privacy policy', 'SMS/email outreach compliant (TCPA / CAN-SPAM)'],
      ['Urgency is truthful — countdowns reflect real deadlines', 'Personalized pricing doesn’t discriminate'],
      ['Collecting competitor pricing is legal and ethical', 'Not penalizing merchants who negotiate'],
      ['Follow-on upsells appropriate, not exploitative'],
    ],
  },
]

// ---------- the assumption register ----------
//
// The real board carried ~200 stickies. This is the working subset that actually drove decisions,
// with the two scores we sorted on. The historical board carried no numbers — importance and
// uncertainty here are a reconstruction of how we ranked them, labeled as such wherever shown.

export type AssumptionCat = 'Desirability' | 'Usability' | 'Feasibility' | 'Viability' | 'Legal & ethical' | 'Organizational'

export const ASSUMPTION_CATS: { name: AssumptionCat; color: string; tone: StickyTone; q: string }[] = [
  { name: 'Desirability', color: '#E8503A', tone: 'orange', q: 'Do merchants actually want this?' },
  { name: 'Usability', color: '#E89B3A', tone: 'yellow', q: 'Can they understand and act on it?' },
  { name: 'Feasibility', color: '#8B5CF6', tone: 'purple', q: 'Can we actually build and run it?' },
  { name: 'Viability', color: '#3B82F6', tone: 'blue', q: 'Does the business survive us doing it?' },
  { name: 'Legal & ethical', color: '#22A06B', tone: 'green', q: 'Are we allowed to, and should we?' },
  { name: 'Organizational', color: '#6B7280', tone: 'gray', q: 'Will the company let us?' },
]

export const ASSUMPTIONS: {
  id: string
  cat: AssumptionCat
  phase: 'Detect' | 'Reach' | 'Present' | 'Negotiate' | 'Reinforce'
  text: string
  imp: number
  unc: number
  method: string
  hero?: boolean
}[] = [
  { id: 'D1', cat: 'Desirability', phase: 'Reach', text: 'Merchants want us to reach out before they leave, rather than after', imp: 5, unc: 2, method: 'Prototype testing' },
  { id: 'D2', cat: 'Desirability', phase: 'Present', text: 'An unsolicited rate offer lands as recognition — not as an insult, or a signal that something is wrong', imp: 5, unc: 4, method: 'Call pilot, reaction-coded' },
  { id: 'D3', cat: 'Desirability', phase: 'Present', text: 'A personalized dollar saving beats a generic percentage', imp: 3, unc: 3, method: 'Post-launch A/B' },
  { id: 'D4', cat: 'Desirability', phase: 'Present', text: 'The offer feels exclusive and earned, not desperate', imp: 4, unc: 4, method: 'Call pilot, reaction-coded' },
  { id: 'D5', cat: 'Desirability', phase: 'Negotiate', text: 'Merchants want a human available when they have questions', imp: 3, unc: 2, method: 'Just Ask — support' },
  { id: 'D6', cat: 'Desirability', phase: 'Reinforce', text: 'Seeing savings accumulate keeps the decision feeling good', imp: 3, unc: 2, method: 'Post-launch analytics' },

  { id: 'U1', cat: 'Usability', phase: 'Reach', text: 'Merchants will open and read a pricing message from PayPal', imp: 5, unc: 3, method: 'Post-launch analytics' },
  { id: 'U2', cat: 'Usability', phase: 'Reach', text: 'They can tell it is legitimately us and not a phishing attempt', imp: 5, unc: 4, method: 'Prototype testing + Just Ask — marketing' },
  { id: 'U3', cat: 'Usability', phase: 'Present', text: 'They understand what the discount applies to', imp: 4, unc: 3, method: 'Prototype testing' },
  { id: 'U4', cat: 'Usability', phase: 'Present', text: 'They can work out whether it is actually a good deal for them', imp: 3, unc: 3, method: 'Prototype testing' },
  { id: 'U5', cat: 'Usability', phase: 'Reinforce', text: 'They can verify the new rate was really applied', imp: 4, unc: 2, method: 'Post-launch analytics' },

  { id: 'F1', cat: 'Feasibility', phase: 'Detect', text: 'We can identify declining merchants accurately enough to be worth calling', imp: 5, unc: 3, method: 'Backtest + data audit' },
  { id: 'F2', cat: 'Feasibility', phase: 'Detect', text: 'We can separate pricing-driven decline from risk-driven or technical decline', imp: 4, unc: 5, method: 'Just Ask — data + backtest' },
  { id: 'F3', cat: 'Feasibility', phase: 'Present', text: 'We can calculate a personalized saving in real time', imp: 3, unc: 2, method: 'Engineering spike' },
  { id: 'F4', cat: 'Feasibility', phase: 'Negotiate', text: 'Pricing ops can fulfil rate changes at volume without breaking', imp: 5, unc: 3, method: 'Just Ask — pricing ops + dry run' },
  { id: 'F5', cat: 'Feasibility', phase: 'Reinforce', text: 'We can track offer → acceptance → 30/60/90-day retention end to end', imp: 5, unc: 2, method: 'Engineering spike' },
  { id: 'F6', cat: 'Feasibility', phase: 'Reinforce', text: 'We can detect a merchant who declines again after being saved', imp: 3, unc: 3, method: 'Data audit' },

  { id: 'V1', cat: 'Viability', phase: 'Present', text: 'Merchants can actually respond — the volume is movable at all', imp: 5, unc: 5, method: 'Only learnable by launching', hero: true },
  { id: 'V2', cat: 'Viability', phase: 'Detect', text: 'We are not paying merchants who would have stayed anyway', imp: 5, unc: 4, method: 'Holdout comparison' },
  { id: 'V3', cat: 'Viability', phase: 'Present', text: 'The discount is large enough to change behaviour and small enough to keep margin', imp: 5, unc: 4, method: 'Call pilot + margin model' },
  { id: 'V4', cat: 'Viability', phase: 'Reinforce', text: 'Saves persist past the first month', imp: 5, unc: 4, method: '30/60/90-day cohorts' },
  { id: 'V5', cat: 'Viability', phase: 'Negotiate', text: 'This does not train merchants to threaten to leave in order to get a better rate', imp: 4, unc: 4, method: 'Guardrail analytics' },
  { id: 'V6', cat: 'Viability', phase: 'Reach', text: 'The cost of intervening stays below the cost of losing the merchant', imp: 4, unc: 2, method: 'Break-even model' },

  { id: 'L1', cat: 'Legal & ethical', phase: 'Present', text: 'Differential pricing is lawful and does not disadvantage a protected class', imp: 5, unc: 3, method: 'Just Ask — legal' },
  { id: 'L2', cat: 'Legal & ethical', phase: 'Reach', text: 'Outreach is compliant and honours existing opt-outs', imp: 5, unc: 2, method: 'Just Ask — legal + marketing' },
  { id: 'L3', cat: 'Legal & ethical', phase: 'Present', text: 'Any urgency we express is truthful — a deadline is a real deadline', imp: 4, unc: 1, method: 'Design review' },
  { id: 'L4', cat: 'Legal & ethical', phase: 'Detect', text: 'Predicting churn to target an offer is consistent with our privacy policy', imp: 5, unc: 2, method: 'Just Ask — legal' },

  { id: 'F7', cat: 'Feasibility', phase: 'Negotiate', text: 'The pricing platform can apply per-merchant rate overrides at volume — it was built for contract-level changes, not thousands of individual ones', imp: 5, unc: 4, method: 'Engineering spike — platform' },
  { id: 'F8', cat: 'Feasibility', phase: 'Reinforce', text: 'A new rate propagates to the transaction path fast enough that the merchant sees it when we told them they would', imp: 4, unc: 3, method: 'Engineering spike — platform' },
  { id: 'F9', cat: 'Feasibility', phase: 'Negotiate', text: 'A rate change can be cleanly reversed if we stop the program — there is an un-apply path, not just an apply path', imp: 5, unc: 3, method: 'Engineering spike — platform' },
  { id: 'F10', cat: 'Feasibility', phase: 'Reinforce', text: 'A promotional rate survives other pricing events, and precedence against contracts, promos and product changes is explicit', imp: 4, unc: 4, method: 'Engineering spike — platform' },
  { id: 'F11', cat: 'Feasibility', phase: 'Present', text: 'Model output can reach the Portal fast enough to render a personalized offer inside the page-load budget', imp: 4, unc: 3, method: 'Engineering spike — pipes' },
  { id: 'F12', cat: 'Feasibility', phase: 'Present', text: 'The Portal can surface a targeted module behind a flag without waiting on a full release cycle', imp: 3, unc: 2, method: 'Engineering spike — pipes' },
  { id: 'F13', cat: 'Feasibility', phase: 'Reach', text: 'Email and the Portal read the same eligibility source, so nobody is offered a rate in one channel they are not eligible for in the other', imp: 5, unc: 4, method: 'Engineering spike — pipes' },
  { id: 'F14', cat: 'Feasibility', phase: 'Detect', text: 'Holdout merchants can be suppressed across every channel, permanently, or the comparison group is worthless', imp: 5, unc: 3, method: 'Engineering spike — pipes' },

  { id: 'L5', cat: 'Legal & ethical', phase: 'Negotiate', text: 'We can capture and store consent for a personalized price — with a timestamp and the version of the terms actually shown', imp: 5, unc: 3, method: 'Legal + engineering review' },
  { id: 'L6', cat: 'Legal & ethical', phase: 'Reinforce', text: 'We can reconstruct after the fact exactly which offer a given merchant saw and accepted', imp: 5, unc: 3, method: 'Legal + engineering review' },
  { id: 'L7', cat: 'Legal & ethical', phase: 'Detect', text: 'The eligibility policy is enforced in code, so targeting cannot quietly drift toward a protected class as inputs change', imp: 5, unc: 4, method: 'Legal + engineering review' },

  { id: 'O1', cat: 'Organizational', phase: 'Detect', text: 'Leadership will permit a margin concession as an experiment', imp: 5, unc: 4, method: 'Executive review — a gate, not an experiment' },
  { id: 'O2', cat: 'Organizational', phase: 'Detect', text: 'Sales-managed accounts can be cleanly carved out before anyone is contacted', imp: 5, unc: 2, method: 'Just Ask — commercial' },
  { id: 'O3', cat: 'Organizational', phase: 'Reach', text: 'Marketing will let us into the channel without colliding with live campaigns', imp: 3, unc: 3, method: 'Just Ask — marketing' },
]

export const JOURNEY_PHASES = ['Detect', 'Reach', 'Present', 'Negotiate', 'Reinforce'] as const

// ---------- the learning plan ----------
//
// Methods ordered by what they cost us. The whole design principle: never spend a more expensive
// method on a question a cheaper one can answer.

export const LEARNING_METHODS = [
  {
    name: 'Just Ask',
    cost: 'Hours',
    when: 'Before anything',
    what: 'Walk to data, legal, engineering, marketing, pricing, commercial and ask the question directly.',
    retired: ['F2', 'F4', 'L1', 'L2', 'L4', 'O2', 'O3', 'D5'],
    note: 'This was the biggest column on our board. Most of what looked like technical risk was somebody else already knowing the answer.',
  },
  {
    name: 'Design review & prior work',
    cost: 'Hours',
    when: 'Before anything',
    what: 'Judgment calls we did not need evidence for — the ethics of urgency, the shape of the message.',
    retired: ['L3'],
  },
  {
    name: 'Prototype testing',
    cost: 'Days',
    when: 'Pre-launch',
    what: 'Put the offer in front of merchants and watch them read it. Do the terms play back correctly?',
    retired: ['D1', 'U2', 'U3', 'U4'],
  },
  {
    name: 'Backtest & data audit',
    cost: 'Days',
    when: 'Pre-launch',
    what: 'Run the cohort rules over history. Would this have flagged the merchants we actually lost?',
    retired: ['F1', 'F6', 'V6'],
  },
  {
    name: 'Engineering spike — can the pricing platform even do this?',
    cost: 'Weeks',
    when: 'Pre-launch',
    what: 'The platform was built to change prices at the contract level, a few at a time. We were about to ask it for thousands of individual overrides, and then possibly ask for all of them back.',
    retired: ['F7', 'F8', 'F9', 'F10'],
    note: 'This was the spike that could have killed the whole bet. If rate changes were not reversible at volume, there was no version of this that leadership would approve.',
  },
  {
    name: 'Engineering spike — can the pipes carry it?',
    cost: 'Weeks',
    when: 'Pre-launch',
    what: 'Getting model output to the Portal inside a page-load budget, getting email onto the same eligibility source rather than a stale copy, and making holdout suppression hold across every channel.',
    retired: ['F3', 'F5', 'F11', 'F12', 'F13', 'F14'],
    note: 'The one that mattered most was F13. Two channels reading two copies of eligibility would have meant merchants getting offers we had already decided they should not get — a trust problem, not a bug.',
  },
  {
    name: 'Legal + engineering — consent and provenance',
    cost: 'Weeks',
    when: 'Pre-launch',
    what: 'Personalized pricing is only defensible if you can prove what was offered, to whom, on what terms, and that they agreed. That is a storage and audit problem as much as a legal one.',
    retired: ['L5', 'L6', 'L7'],
    note: 'Encoding the eligibility policy so it could not drift was the engineering answer to a legal question. Nobody wants to discover a targeting rule became discriminatory because an upstream input changed.',
  },
  {
    name: 'The call pilot',
    cost: 'A month of ops time',
    when: 'Launch',
    what: 'Humans on phones. Reaction-coded, so the pilot was the research instrument as much as the intervention.',
    retired: ['D2', 'D4', 'V1', 'V3'],
    note: 'V1 — can merchants actually respond — was untestable by any other means. That is why the pilot existed.',
  },
  {
    name: 'Holdouts & cohorts',
    cost: 'Runs alongside',
    when: 'Post-launch',
    what: 'Comparison groups preserved at every stage; 30/60/90-day retention tracked against them.',
    retired: ['V2', 'V4', 'V5', 'U1', 'U5', 'D3', 'D6'],
  },
]

export const GATES = [
  {
    id: 'G0',
    name: 'Permission',
    ask: 'Leadership signs off on a bounded margin concession',
    evidence: 'Sized pool, capped exposure, carve-outs agreed, holdout design',
    outcome: 'Approved as a time-boxed experiment',
  },
  {
    id: 'G1',
    name: 'Call pilot · 2,000',
    ask: 'Do merchants respond at all, and how does it land?',
    evidence: '5% accepted and repriced; reactions coded as recognition rather than suspicion',
    outcome: 'Proceed — build a product surface',
  },
  {
    id: 'G2',
    name: 'Product-assisted · 20,000',
    ask: 'Does it hold up without a human making the call?',
    evidence: '20% opt-in; retention holding against holdout at 30 and 60 days',
    outcome: 'Proceed — fund automation',
  },
  {
    id: 'G3',
    name: 'Automated · 100,000',
    ask: 'Does it survive full automation and better sequencing?',
    evidence: '30% opt-in; margin within the cap',
    outcome: 'Proceed — and reuse the layers elsewhere',
  },
]
