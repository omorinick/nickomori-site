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
  { name: 'Concierge MVP', cohort: '2,000', how: 'Phone outreach, manual offers — the pilot was also the research instrument', rate: 5 },
  { name: 'Product-assisted', cohort: '20,000', how: 'In-product experience, manually batched fulfillment', rate: 10 },
  { name: 'Automated platform', cohort: '100,000', how: 'Automated eligibility, acceptance, fulfillment', rate: 17 },
]

export const FINDINGS = [
  { label: 'Clearly positive reaction to the offer', n: 15 },
  { label: 'Discussed their standing with PayPal', n: 13 },
  { label: 'No obvious mechanism for moving payment volume', n: 15 },
  { label: 'Showed clear active diversion to other processors', n: 2 },
]

export const CLUSTERS = [
  { name: 'Value Realization', q: 'Do merchants understand what they get for what they pay?' },
  { name: 'Competitive Clarity', q: 'Do we get a chance to compete?' },
  { name: 'Right Offer, Right Time', q: 'Are we reaching at-risk merchants fast enough?' },
  { name: 'Transparency Without Backfire', q: 'Honesty without creating new problems?' },
  { name: 'Relationship & Loyalty', q: 'Do merchants feel valued, or just transactional?', gap: true },
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
    { c: 'Speed to first learning', v: ['● calls in weeks', '○ eng discovery', '○ policy change', '◐'] },
    { c: 'Manually testable', v: ['● MVP with humans', '○', '◐', '◐'] },
    { c: 'Reversible, capped exposure', v: ['● narrow + caps', '●', '◐ loss exposure', '●'] },
    { c: 'Cleanly measurable', v: ['● holdouts, margin', '◐ messy attribution', '◐', '○ survey-based'] },
    { c: 'Operational readiness', v: ['● pricing ops existed', '○ many teams', '○ risk org owns', '○ data not plumbed'] },
    { c: 'Margin / downside risk', v: ['◐ real concession cost', '● none', '◐', '●'] },
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

export const QUOTES = [
  '“It’s about time PayPal recognized my loyalty. Thank you.”',
  '“It forces me to stay and feel appreciated…it really enforces my stay with you guys.”',
  '“With an offer like this I’m less worried about moving my customers to Zelle and Venmo because of fees.”',
  '“Are these disputes going to lower my ranking in PayPal…are they going to see me as a problem customer?”',
]

export const PRINCIPLES = [
  'Choose the first bet for learning-adjusted leverage.',
  'Quantitative evidence locates the problem; qualitative evidence interprets it.',
  'Customer success is the monetization model — deliver value, and make it legible.',
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
    metric: 'GAP — no direct metric existed in the table',
    gap: true,
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
  ['Volume-based recapture incentive', '“Hit $50K volume in the next 60 days and lock in the 2.6% rate”', 'Could Have', 'Volume recovery % · rate-lock conversion', 'Gaming via temporary volume spike', '', false],
  ['Escalating offer ladders', 'Offer 1: 10bps → Offer 2: 20bps + fee waiver → Offer 3: rep outreach', 'Won’t Have', 'Cumulative conversion across tiers', 'Trains merchants to wait for better offers', '“Too easy to game”', false],
  ['Tailored offers by merchant type', 'SMB: automated rate reduction · Micro: fee cap', 'Could Have', 'Segment-specific retention lift', 'Complexity · fairness perception', '', false],
  ['Offer at point of offboarding intent', 'In-flow modal: “Before you go — would a 15% rate reduction change your mind?”', 'Should Have', 'Save rate · reactivation within 30 days', 'Flow friction · false-positive “leaving” signals', '', false],
  ['Win-backs for churned merchants', '“Come back — submit your current processor’s rate and we’ll try to beat it”', 'Should Have', 'Return rate · post-return retention', 'Cost of matching · intel accuracy', 'Most votes in the session', false],
  ['Rep-initiated saves during pricing complaints', 'Support rep empowered to offer a rate reduction in real time', 'Could Have', 'Retention of support-saved merchants', 'Rep discretion abuse · inconsistency', '', false],
  ['Goodwill offers on billing issues', '“We noticed a billing issue — here’s a rate reduction while we sort it out”', 'Won’t Have', 'Issue resolution + retention', 'Abuse via manufactured issues', '', false],
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
