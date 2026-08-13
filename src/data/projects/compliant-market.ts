export interface PricePoint {
  date: string
  price: number
}

export type Timeframe = '1W' | '1M' | '3M' | '1Y'

export type ProductVisual =
  | { kind: 'capsule'; color1: string; color2: string }
  | { kind: 'tablet'; shape: 'round' | 'bar' | 'oval'; color: string; scoreColor?: string }
  | { kind: 'injection-pen'; accentColor: string; bodyColor?: string }
  | { kind: 'vial'; contents: 'liquid' | 'powder'; capColor: string; contentsColor: string; labelColor: string }

export interface ProductVariantDetail {
  descriptor: string
  sku: string
  visual: ProductVisual
}

export interface RecentSale {
  price: number
  variant: string
  source: string
  condition: string
  when: string
}

export interface HistoricalStat {
  value: string
  label: string
  sub: string
}

export interface RelatedListing {
  id: string
  name: string
  variant: string
  visual: ProductVisual
  price: number
  change: number
  changePercent: number
  trending: 'up' | 'down' | 'flat'
  href?: string
}

export interface DrugXProduct {
  slug: string
  name: string
  category: string
  subcategory: string
  form: string
  condition: string
  defaultVariant: string
  variantOptions: string[]
  variantDetails: Record<string, ProductVariantDetail>
  prices: Record<string, number>
  bids: Record<string, number>
  asks: Record<string, number>
  lastSales: Record<string, number>
  lastSaleChanges: Record<string, number>
  lastSaleChangePercentages: Record<string, number>
  priceHistory: Record<Timeframe, PricePoint[]>
  soldLast30Days: number
  shippingTitle: string
  shippingBody: string
  marketNote: string
  recentSales: RecentSale[]
  historicalStats: HistoricalStat[]
  returnCopy: string
  buyerPromiseCopy: string
  processCopy: string
}

const ADDERALL_HISTORY: Record<Timeframe, PricePoint[]> = {
  '1W': [
    { date: 'May 26', price: 83 }, { date: 'May 27', price: 86 },
    { date: 'May 28', price: 83 }, { date: 'May 29', price: 84 },
    { date: 'May 30', price: 88 }, { date: 'May 31', price: 85 },
    { date: 'Jun 1', price: 87 }, { date: 'Jun 2', price: 89 },
  ],
  '1M': [
    { date: 'May 2', price: 76 }, { date: 'May 5', price: 74 },
    { date: 'May 8', price: 78 }, { date: 'May 11', price: 80 },
    { date: 'May 14', price: 77 }, { date: 'May 17', price: 82 },
    { date: 'May 20', price: 79 }, { date: 'May 23', price: 83 },
    { date: 'May 26', price: 83 }, { date: 'May 28', price: 85 },
    { date: 'May 30', price: 88 }, { date: 'Jun 1', price: 87 },
    { date: 'Jun 2', price: 89 },
  ],
  '3M': [
    { date: 'Mar 2', price: 68 }, { date: 'Mar 9', price: 70 },
    { date: 'Mar 16', price: 69 }, { date: 'Mar 23', price: 72 },
    { date: 'Mar 30', price: 74 }, { date: 'Apr 6', price: 71 },
    { date: 'Apr 13', price: 75 }, { date: 'Apr 20', price: 73 },
    { date: 'Apr 27', price: 78 }, { date: 'May 4', price: 77 },
    { date: 'May 11', price: 80 }, { date: 'May 18', price: 82 },
    { date: 'May 25', price: 84 }, { date: 'Jun 1', price: 87 },
    { date: 'Jun 2', price: 89 },
  ],
  '1Y': [
    { date: "Jun '25", price: 62 }, { date: "Jul '25", price: 59 },
    { date: "Aug '25", price: 71 }, { date: "Sep '25", price: 110 },
    { date: "Oct '25", price: 95 }, { date: "Nov '25", price: 88 },
    { date: "Dec '25", price: 72 }, { date: "Jan '26", price: 68 },
    { date: "Feb '26", price: 71 }, { date: "Mar '26", price: 74 },
    { date: "Apr '26", price: 78 }, { date: "May '26", price: 85 },
    { date: "Jun '26", price: 89 },
  ],
}

const SEMAGLUTIDE_HISTORY: Record<Timeframe, PricePoint[]> = {
  '1W': [
    { date: 'Aug 6', price: 181 }, { date: 'Aug 7', price: 184 },
    { date: 'Aug 8', price: 182 }, { date: 'Aug 9', price: 188 },
    { date: 'Aug 10', price: 185 }, { date: 'Aug 11', price: 190 },
    { date: 'Aug 12', price: 187 }, { date: 'Aug 13', price: 186 },
  ],
  '1M': [
    { date: 'Jul 14', price: 212 }, { date: 'Jul 17', price: 205 },
    { date: 'Jul 20', price: 198 }, { date: 'Jul 23', price: 202 },
    { date: 'Jul 26', price: 194 }, { date: 'Jul 29', price: 190 },
    { date: 'Aug 1', price: 192 }, { date: 'Aug 4', price: 184 },
    { date: 'Aug 7', price: 184 }, { date: 'Aug 10', price: 185 },
    { date: 'Aug 13', price: 186 },
  ],
  '3M': [
    { date: 'May 13', price: 268 }, { date: 'May 20', price: 259 },
    { date: 'May 27', price: 252 }, { date: 'Jun 3', price: 248 },
    { date: 'Jun 10', price: 239 }, { date: 'Jun 17', price: 232 },
    { date: 'Jun 24', price: 228 }, { date: 'Jul 1', price: 221 },
    { date: 'Jul 8', price: 214 }, { date: 'Jul 15', price: 209 },
    { date: 'Jul 22', price: 201 }, { date: 'Jul 29', price: 190 },
    { date: 'Aug 5', price: 184 }, { date: 'Aug 13', price: 186 },
  ],
  '1Y': [
    { date: "Aug '25", price: 412 }, { date: "Sep '25", price: 398 },
    { date: "Oct '25", price: 371 }, { date: "Nov '25", price: 344 },
    { date: "Dec '25", price: 329 }, { date: "Jan '26", price: 306 },
    { date: "Feb '26", price: 294 }, { date: "Mar '26", price: 283 },
    { date: "Apr '26", price: 275 }, { date: "May '26", price: 268 },
    { date: "Jun '26", price: 236 }, { date: "Jul '26", price: 202 },
    { date: "Aug '26", price: 186 },
  ],
}

export const PRODUCTS: Record<string, DrugXProduct> = {
  adderall: {
    slug: 'adderall',
    name: 'Adderall XR',
    category: 'Pills',
    subcategory: 'Stimulants',
    form: 'Extended Release',
    condition: 'Open box',
    defaultVariant: '30mg',
    variantOptions: ['10mg', '20mg', '30mg'],
    variantDetails: {
      '10mg': { descriptor: 'Blue Capsule', sku: 'ADD-XR-10-BLU', visual: { kind: 'capsule', color1: '#3574c8', color2: '#83afe8' } },
      '20mg': { descriptor: 'Amber Capsule', sku: 'ADD-XR-20-AMB', visual: { kind: 'capsule', color1: '#c85d24', color2: '#f1a263' } },
      '30mg': { descriptor: 'Orange Capsule', sku: 'ADD-XR-30-ORG', visual: { kind: 'capsule', color1: '#e46c2f', color2: '#f4b078' } },
    },
    prices: { '10mg': 45, '20mg': 67, '30mg': 89 },
    bids: { '10mg': 42, '20mg': 63, '30mg': 85 },
    asks: { '10mg': 47, '20mg': 70, '30mg': 92 },
    lastSales: { '10mg': 43, '20mg': 65, '30mg': 87 },
    lastSaleChanges: { '10mg': 2, '20mg': 2, '30mg': 2 },
    lastSaleChangePercentages: { '10mg': 4.9, '20mg': 3.2, '30mg': 2.3 },
    priceHistory: ADDERALL_HISTORY,
    soldLast30Days: 1247,
    shippingTitle: 'Xpress Dose available.',
    shippingBody: 'Ships in 1–2 suspiciously fast days.',
    marketNote: 'September spike attributed to back-to-school demand. Market self-corrected by November.',
    recentSales: [
      { price: 87, variant: '30mg', source: 'Estate cleanout', condition: 'Unopened-ish', when: '12 min ago' },
      { price: 84, variant: '30mg', source: 'Coat pocket', condition: 'Very good', when: '48 min ago' },
      { price: 69, variant: '20mg', source: 'Friend of a friend', condition: 'Verified', when: '3 hr ago' },
      { price: 91, variant: '30mg', source: 'Medicine cabinet', condition: 'One owner', when: 'Yesterday' },
    ],
    historicalStats: [
      { value: '$59 – $110', label: 'Price Range', sub: 'Last 12 Months' },
      { value: '$68 – $89', label: 'Price Range', sub: 'Last 3 Months' },
      { value: '24%', label: 'Volatility', sub: '' },
      { value: '3,847', label: 'Number of Sales', sub: 'Last 3 Months' },
      { value: '189%', label: 'Price Premium', sub: 'vs. Pharmacy MSRP' },
      { value: '$78', label: 'Avg Sale Price', sub: 'Last 3 Months' },
    ],
    returnCopy: 'Returns are accepted within 14 days if the item is materially different, unexpectedly effective, or still attached to the original prescription holder.',
    buyerPromiseCopy: 'Wrong pill, wrong color, wrong vibe—we will make it right. Terms apply. Coverage is not currently valid in any state, territory, or legally recognized body of water.',
    processCopy: 'Every item is routed through a proprietary multi-step verification process. We test identity, purity, potency, and whether the seller became visibly nervous during onboarding.',
  },
  semaglutide: {
    slug: 'semaglutide',
    name: 'Semaglutide',
    category: 'Injections',
    subcategory: 'GLP-1',
    form: 'Prefilled Pen',
    condition: 'Seal intact',
    defaultVariant: '1mg',
    variantOptions: ['0.25 / 0.5mg', '1mg', '2mg'],
    variantDetails: {
      '0.25 / 0.5mg': { descriptor: 'Multi-dose Starter Pen', sku: 'SEM-PEN-025-05', visual: { kind: 'injection-pen', accentColor: '#c8324b', bodyColor: '#f4f5f2' } },
      '1mg': { descriptor: 'Four-dose Green Pen', sku: 'SEM-PEN-1-GRN', visual: { kind: 'injection-pen', accentColor: '#0c9f52', bodyColor: '#f4f5f2' } },
      '2mg': { descriptor: 'Four-dose Gold Pen', sku: 'SEM-PEN-2-GLD', visual: { kind: 'injection-pen', accentColor: '#d6a51d', bodyColor: '#f4f5f2' } },
    },
    prices: { '0.25 / 0.5mg': 142, '1mg': 186, '2mg': 244 },
    bids: { '0.25 / 0.5mg': 134, '1mg': 177, '2mg': 231 },
    asks: { '0.25 / 0.5mg': 149, '1mg': 192, '2mg': 251 },
    lastSales: { '0.25 / 0.5mg': 146, '1mg': 186, '2mg': 239 },
    lastSaleChanges: { '0.25 / 0.5mg': 9, '1mg': 22, '2mg': 18 },
    lastSaleChangePercentages: { '0.25 / 0.5mg': 6.6, '1mg': 13.4, '2mg': 8.1 },
    priceHistory: SEMAGLUTIDE_HISTORY,
    soldLast30Days: 3186,
    shippingTitle: 'ColdChain Xpress included.',
    shippingBody: 'Temperature telemetry, insulated shipper, zero porch time—allegedly.',
    marketNote: 'Prices fell as supply expanded. Demand remains seasonally correlated with beach vacations and unresolved New Year’s resolutions.',
    recentSales: [
      { price: 186, variant: '1mg', source: 'Telehealth surplus', condition: 'Cold-chain verified', when: '7 min ago' },
      { price: 179, variant: '1mg', source: 'Dose transition', condition: 'Seal intact', when: '31 min ago' },
      { price: 238, variant: '2mg', source: 'Plan changed', condition: 'Temp logged', when: '2 hr ago' },
      { price: 148, variant: '0.25 / 0.5mg', source: 'Resolution rollover', condition: 'Never started', when: 'Yesterday' },
    ],
    historicalStats: [
      { value: '$181 – $412', label: 'Price Range', sub: 'Last 12 Months' },
      { value: '$184 – $268', label: 'Price Range', sub: 'Last 3 Months' },
      { value: '31%', label: 'Volatility', sub: '' },
      { value: '9,284', label: 'Number of Sales', sub: 'Last 3 Months' },
      { value: '73%', label: 'Neighbor Discount', sub: 'vs. List Price' },
      { value: '$218', label: 'Avg Sale Price', sub: 'Last 3 Months' },
    ],
    returnCopy: 'Temperature excursions, broken seals, and pens that arrived suspiciously warm qualify for review. Buyer’s remorse remains metabolically neutral.',
    buyerPromiseCopy: 'Every accepted pen includes a time-and-temperature record plus third-party identity and potency screening. This promise is imaginary; the cold-chain standards are not.',
    processCopy: 'DrugX imagines validating seal integrity, lot identity, active ingredient, potency, and uninterrupted refrigeration before a pen ever reaches the order book.',
  },
}

export const DEFAULT_PRODUCT = PRODUCTS.adderall

export const RELATED_LISTINGS: RelatedListing[] = [
  {
    id: 'semaglutide-1mg', name: 'Semaglutide', variant: '1mg · Prefilled Pen',
    visual: { kind: 'injection-pen', accentColor: '#0c9f52', bodyColor: '#f4f5f2' },
    price: 186, change: 22, changePercent: 13.4, trending: 'up',
    href: '/projects/compliant-market/products/semaglutide',
  },
  {
    id: 'oxycodone-10mg', name: 'Oxycodone IR', variant: '10mg · Round Pink Tablet',
    visual: { kind: 'tablet', shape: 'round', color: '#e890aa', scoreColor: '#bb607e' },
    price: 210, change: 15, changePercent: 7.7, trending: 'up',
  },
  {
    id: 'testosterone-cypionate', name: 'Testosterone Cypionate', variant: '200mg/mL · 10mL Vial',
    visual: { kind: 'vial', contents: 'liquid', capColor: '#3d78b8', contentsColor: '#e8c45c', labelColor: '#e7eef7' },
    price: 96, change: 7, changePercent: 7.9, trending: 'up',
  },
  {
    id: 'bpc-157-5mg', name: 'BPC-157', variant: '5mg · Research Peptide Vial',
    visual: { kind: 'vial', contents: 'powder', capColor: '#be467a', contentsColor: '#f2f0e8', labelColor: '#f4d5e3' },
    price: 58, change: 11, changePercent: 23.4, trending: 'up',
  },
  {
    id: 'xanax-2mg', name: 'Xanax', variant: '2mg · Scored White Bar',
    visual: { kind: 'tablet', shape: 'bar', color: '#e2e3e1', scoreColor: '#a9adb0' },
    price: 124, change: -3, changePercent: -2.4, trending: 'down',
  },
]

export const MODALS = {
  verification: {
    title: 'Third-Party Verification',
    body: [
      'All listings on DrugX undergo rigorous third-party chemical verification by our network of certified independent analysts.',
      'Each verified unit ships in tamper-evident DrugX packaging with a unique authentication record and Certificate of Analysis.',
      'The analysts have names. Legal has asked us not to use them.',
    ],
  },
  buyerProtection: {
    title: 'Buyer Promise',
    body: [
      "If your order is not as described—wrong product, wrong dose, wrong vibe—we’ll make it right. Full refund or replacement, your choice.",
      'Terms apply. Not valid in states with recreational laws. Or the other states. Actually, none of the states.',
      "But we're working on it.",
    ],
  },
}
