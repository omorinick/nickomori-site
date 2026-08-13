export interface PricePoint {
  date: string
  price: number
}

export interface RelatedListing {
  id: string
  name: string
  variant: string
  visual: 'capsule' | 'injection-pen'
  price: number
  change: number
  changePercent: number
  trending: 'up' | 'down' | 'flat'
}

export type Timeframe = '1W' | '1M' | '3M' | '1Y'
export type Dosage = '10mg' | '20mg' | '30mg'

export interface DosageDetail {
  variant: string
  sku: string
  color1: string
  color2: string
}

const DOSAGE_PRICES: Record<Dosage, number> = { '10mg': 45, '20mg': 67, '30mg': 89 }
const DOSAGE_BID: Record<Dosage, number> = { '10mg': 42, '20mg': 63, '30mg': 85 }
const DOSAGE_ASK: Record<Dosage, number> = { '10mg': 47, '20mg': 70, '30mg': 92 }
const DOSAGE_LAST_SALE: Record<Dosage, number> = { '10mg': 43, '20mg': 65, '30mg': 87 }
const DOSAGE_LAST_SALE_CHANGE: Record<Dosage, number> = { '10mg': 2, '20mg': 2, '30mg': 2 }
const DOSAGE_LAST_SALE_CHANGE_PCT: Record<Dosage, number> = { '10mg': 4.9, '20mg': 3.2, '30mg': 2.3 }

const PRICE_HISTORY: Record<Timeframe, PricePoint[]> = {
  '1W': [
    { date: 'May 26', price: 83 }, { date: 'May 27', price: 86 },
    { date: 'May 28', price: 83 }, { date: 'May 29', price: 84 },
    { date: 'May 30', price: 88 }, { date: 'May 31', price: 85 },
    { date: 'Jun 1',  price: 87 }, { date: 'Jun 2',  price: 89 },
  ],
  '1M': [
    { date: 'May 2',  price: 76 }, { date: 'May 5',  price: 74 },
    { date: 'May 8',  price: 78 }, { date: 'May 11', price: 80 },
    { date: 'May 14', price: 77 }, { date: 'May 17', price: 82 },
    { date: 'May 20', price: 79 }, { date: 'May 23', price: 83 },
    { date: 'May 26', price: 83 }, { date: 'May 28', price: 85 },
    { date: 'May 30', price: 88 }, { date: 'Jun 1',  price: 87 },
    { date: 'Jun 2',  price: 89 },
  ],
  '3M': [
    { date: 'Mar 2',  price: 68 }, { date: 'Mar 9',  price: 70 },
    { date: 'Mar 16', price: 69 }, { date: 'Mar 23', price: 72 },
    { date: 'Mar 30', price: 74 }, { date: 'Apr 6',  price: 71 },
    { date: 'Apr 13', price: 75 }, { date: 'Apr 20', price: 73 },
    { date: 'Apr 27', price: 78 }, { date: 'May 4',  price: 77 },
    { date: 'May 11', price: 80 }, { date: 'May 18', price: 82 },
    { date: 'May 25', price: 84 }, { date: 'Jun 1',  price: 87 },
    { date: 'Jun 2',  price: 89 },
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

export const PRODUCT = {
  name: 'Adderall XR',
  dosageOptions: ['10mg', '20mg', '30mg'] as Dosage[],
  dosageDetails: {
    '10mg': { variant: 'Blue Capsule', sku: 'ADD-XR-10-BLU', color1: '#3574c8', color2: '#83afe8' },
    '20mg': { variant: 'Amber Capsule', sku: 'ADD-XR-20-AMB', color1: '#c85d24', color2: '#f1a263' },
    '30mg': { variant: 'Orange Capsule', sku: 'ADD-XR-30-ORG', color1: '#e46c2f', color2: '#f4b078' },
  } satisfies Record<Dosage, DosageDetail>,
  dosagePrices: DOSAGE_PRICES,
  dosageBid: DOSAGE_BID,
  dosageAsk: DOSAGE_ASK,
  dosageLastSale: DOSAGE_LAST_SALE,
  dosageLastSaleChange: DOSAGE_LAST_SALE_CHANGE,
  dosageLastSaleChangePct: DOSAGE_LAST_SALE_CHANGE_PCT,
  priceHistory: PRICE_HISTORY,
  soldLast30Days: 1247,
}

export const RECENT_SALES = [
  { price: 87, dosage: '30mg', source: 'Estate cleanout', condition: 'Unopened-ish', when: '12 min ago' },
  { price: 84, dosage: '30mg', source: 'Coat pocket', condition: 'Very good', when: '48 min ago' },
  { price: 69, dosage: '20mg', source: 'Friend of a friend', condition: 'Verified', when: '3 hr ago' },
  { price: 91, dosage: '30mg', source: 'Medicine cabinet', condition: 'One owner', when: 'Yesterday' },
] as const

export const RELATED_LISTINGS: RelatedListing[] = [
  { id: 'xanax-2mg',       name: 'Xanax',       variant: '2mg · White Bar',       visual: 'capsule',       price: 124, change: -3, changePercent: -2.4, trending: 'down' },
  { id: 'oxycodone-10mg',  name: 'Oxycodone',   variant: '10mg · Round White',    visual: 'capsule',       price: 210, change: 15, changePercent:  7.7, trending: 'up'   },
  { id: 'ambien-10mg',     name: 'Ambien',      variant: '10mg · Oval Pink',      visual: 'capsule',       price:  67, change:  1, changePercent:  1.5, trending: 'up'   },
  { id: 'claritin-10mg',   name: 'Claritin',    variant: '10mg · White Round',    visual: 'capsule',       price:  12, change:  0, changePercent:  0.0, trending: 'flat' },
  { id: 'semaglutide-1mg', name: 'Semaglutide', variant: '1mg · Prefilled Pen',   visual: 'injection-pen', price: 186, change: 22, changePercent: 13.4, trending: 'up'   },
]

export const HISTORICAL_STATS = [
  { value: '$59 – $110', label: 'Price Range',       sub: 'Last 12 Months'  },
  { value: '$68 – $89',  label: 'Price Range',       sub: 'Last 3 Months'   },
  { value: '24%',        label: 'Volatility',        sub: ''                },
  { value: '3,847',      label: 'Number of Sales',   sub: 'Last 3 Months'   },
  { value: '189%',       label: 'Price Premium',     sub: 'vs. Pharmacy MSRP' },
  { value: '$78',        label: 'Avg Sale Price',    sub: 'Last 3 Months'   },
]

export const MODALS = {
  verification: {
    title: 'DrugX Verification',
    body: [
      'All listings on DrugX undergo rigorous third-party chemical verification by our network of certified independent analysts.',
      'Each verified unit ships in a tamper-evident DrugX bottle with a unique authentication QR code and a Certificate of Authenticity.',
      'We do not ask questions.',
    ],
  },
  buyerProtection: {
    title: 'Buyer Promise',
    body: [
      "If your order is not as described — wrong pill, wrong color, wrong vibe — we'll make it right. Full refund or replacement, your choice.",
      "Terms apply. Not valid in states with recreational laws. Or the other states. Actually, none of the states.",
      "But we're working on it.",
    ],
  },
}
