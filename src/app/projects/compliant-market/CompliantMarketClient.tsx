'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  BadgeDollarSign,
  Beaker,
  Check,
  ChevronDown,
  Heart,
  PackageCheck,
  Share2,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MODALS,
  RELATED_LISTINGS,
  type DrugXProduct,
  type ProductVisual,
  type RelatedListing,
  type Timeframe,
} from '@/data/projects/compliant-market'
import {
  DrugXInfoDialog,
  DrugXLabsDialog,
  DrugXTradeDialog,
  type TradeAction,
} from './DrugXDialogs'

const GREEN = '#00bb29'
const RED = '#ef5b5b'

const PillScene = dynamic(() => import('./PillScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center" aria-label="Loading product image">
      <div className="h-20 w-52 rotate-[-8deg] rounded-full bg-gradient-to-r from-[#e46c2f] from-50% to-[#f4b078] shadow-[0_24px_50px_rgba(0,0,0,0.18)]" />
    </div>
  ),
})

const InjectorScene = dynamic(() => import('./InjectorScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center" aria-label="Loading injection pen image">
      <div className="h-7 w-32 rotate-[-8deg] rounded-full bg-gradient-to-r from-[#f4f5f2] from-70% to-[#0c9f52] shadow-[0_14px_28px_rgba(0,0,0,0.16)]" />
    </div>
  ),
})

const TabletScene = dynamic(() => import('./TabletScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center" aria-label="Loading tablet image">
      <div className="h-20 w-20 rotate-[-8deg] rounded-full bg-[#e4a0b5] shadow-[0_16px_32px_rgba(0,0,0,0.16)]" />
    </div>
  ),
})

const VialScene = dynamic(() => import('./VialScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center" aria-label="Loading vial image">
      <div className="h-28 w-16 rounded-b-xl rounded-t-md border-4 border-white/70 bg-[#d8e4e7]/60 shadow-[0_16px_32px_rgba(0,0,0,0.16)]" />
    </div>
  ),
})

const MarketChart = dynamic(() => import('./DrugXMarketChart'), {
  ssr: false,
  loading: () => <div className="h-[260px] animate-pulse rounded-lg bg-muted/40" />,
})

const HOW_IT_WORKS = [
  {
    icon: BadgeDollarSign,
    number: '01',
    title: 'List unused supply',
    body: 'Turn medication you no longer need into recoverable value instead of letting viable supply expire in a cabinet or go to waste.',
  },
  {
    icon: Beaker,
    number: '02',
    title: 'Third-party verified',
    body: 'Independent labs confirm identity, purity, and potency, then seal every accepted item in tamper-evident DrugX packaging.',
  },
  {
    icon: PackageCheck,
    number: '03',
    title: 'Access at a fair market price',
    body: 'Transparent Offers, Asks, and sales history help buyers access verified supply while sellers recover value from what they already own.',
  },
] as const

function ProductScene({ visual }: { visual: ProductVisual }) {
  if (visual.kind === 'injection-pen') {
    return <InjectorScene accentColor={visual.accentColor} bodyColor={visual.bodyColor} />
  }
  if (visual.kind === 'tablet') {
    return <TabletScene shape={visual.shape} color={visual.color} scoreColor={visual.scoreColor} />
  }
  if (visual.kind === 'vial') {
    return (
      <VialScene
        contents={visual.contents}
        capColor={visual.capColor}
        contentsColor={visual.contentsColor}
        labelColor={visual.labelColor}
      />
    )
  }
  return <PillScene color1={visual.color1} color2={visual.color2} />
}

function ProductSwatch({ visual }: { visual: ProductVisual }) {
  if (visual.kind === 'capsule') {
    return (
      <span
        className="h-3 w-5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${visual.color1} 50%, ${visual.color2} 50%)` }}
      />
    )
  }
  if (visual.kind === 'tablet') {
    return (
      <span
        className={cn('block bg-current', visual.shape === 'round' ? 'size-3 rounded-full' : 'h-2.5 w-5 rounded')}
        style={{ color: visual.color }}
      />
    )
  }
  if (visual.kind === 'vial') {
    return <span className="block h-4 w-3 rounded-sm border border-black/15" style={{ background: visual.labelColor }} />
  }
  return (
    <span className="block h-2.5 w-5 rounded-full" style={{ background: visual.accentColor }} />
  )
}

function RelatedCard({ listing, onSelect }: { listing: RelatedListing; onSelect: () => void }) {
  const isUp = listing.trending === 'up'
  const isDown = listing.trending === 'down'
  const cardClassName = 'group block h-full w-full snap-start overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-border-hover hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring'
  const content = (
    <>
      <div className="relative h-36 overflow-hidden bg-[#f1f2ef]">
        <div className="pointer-events-none absolute inset-0 transition-transform duration-300 group-hover:scale-[1.04]">
          <ProductScene visual={listing.visual} />
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          Verified
        </span>
      </div>
      <div className="p-4">
        <p className="truncate text-xs text-muted-foreground">{listing.variant}</p>
        <p className="mt-0.5 truncate text-sm font-semibold">{listing.name}</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lowest Ask</p>
            <p className="text-base font-bold">${listing.price}</p>
          </div>
          <p className="text-xs" style={{ color: isUp ? GREEN : isDown ? RED : 'var(--muted-foreground)' }}>
            {listing.change !== 0
              ? `${isUp ? '+' : '-'}$${Math.abs(listing.change)} (${Math.abs(listing.changePercent)}%)`
              : 'Market stable'}
          </p>
        </div>
      </div>
    </>
  )

  if (listing.href) {
    return <Link href={listing.href} className={cardClassName}>{content}</Link>
  }

  return <button type="button" onClick={onSelect} className={cardClassName}>{content}</button>
}

function AccordionRow({
  id,
  label,
  right,
  children,
  open,
  onToggle,
}: {
  id: string
  label: string
  right?: React.ReactNode
  children: React.ReactNode
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-t border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="flex w-full items-center justify-between py-4 text-sm transition-colors hover:text-foreground"
        onClick={onToggle}
      >
        <span className="font-medium">{label}</span>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          {right}
          <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
        </span>
      </button>
      {open && (
        <div id={`${id}-content`} className="pb-4 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  )
}

export default function DrugXProductPage({ product }: { product: DrugXProduct }) {
  const [activeDosage, setActiveDosage] = useState(product.defaultVariant)
  const [dosageOpen, setDosageOpen] = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1M')
  const [infoModal, setInfoModal] = useState<'verification' | 'buyerProtection' | null>(null)
  const [tradeAction, setTradeAction] = useState<TradeAction>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [showLabsModal, setShowLabsModal] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const dosageRef = useRef<HTMLDivElement>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const openLabs = () => setShowLabsModal(true)
    document.addEventListener('drugx:open-labs-modal', openLabs)
    return () => document.removeEventListener('drugx:open-labs-modal', openLabs)
  }, [])

  useEffect(() => {
    const closeDosage = (event: MouseEvent) => {
      if (dosageRef.current && !dosageRef.current.contains(event.target as Node)) {
        setDosageOpen(false)
      }
    }
    document.addEventListener('mousedown', closeDosage)
    return () => document.removeEventListener('mousedown', closeDosage)
  }, [])

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
  }, [])

  const showMessage = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast(message)
    toastTimerRef.current = setTimeout(() => setToast(null), 2800)
  }

  const handleShare = async () => {
    const shareData = {
      title: `DrugX — ${product.name} ${activeDosage}`,
      text: 'A verified secondary market for pharmaceutical assets. Obviously satire.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(shareData.url)
      showMessage('Product link copied')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      showMessage('Sharing desk is temporarily unavailable')
    }
  }

  const ask = product.asks[activeDosage]
  const offer = product.bids[activeDosage]
  const lastSale = product.lastSales[activeDosage]
  const change = product.lastSaleChanges[activeDosage]
  const changePct = product.lastSaleChangePercentages[activeDosage]
  const detail = product.variantDetails[activeDosage]
  const chartData = product.priceHistory[activeTimeframe]
  const chartMin = Math.min(...chartData.map((point) => point.price)) - 5
  const chartMax = Math.max(...chartData.map((point) => point.price)) + 5
  const timeframes: Timeframe[] = ['1W', '1M', '3M', '1Y']

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto py-5 text-xs text-muted-foreground">
          <span>Home</span><span aria-hidden>/</span>
          <span>{product.category}</span><span aria-hidden>/</span>
          <span>{product.subcategory}</span><span aria-hidden>/</span>
          <span className="whitespace-nowrap text-foreground">{product.name} {activeDosage}</span>
        </nav>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[400px] overflow-hidden rounded-xl bg-[#f1f2ef] sm:h-[520px]">
            <div className="absolute inset-0">
              <ProductScene visual={detail.visual} />
            </div>
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={favorite}
                onClick={() => {
                  setFavorite((current) => !current)
                  showMessage(favorite ? 'Removed from your cabinet' : 'Saved to your cabinet')
                }}
                className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/85 text-neutral-700 backdrop-blur transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-black"
              >
                <Heart size={17} className={favorite ? 'fill-current text-[#00a824]' : ''} />
              </button>
              <button
                type="button"
                aria-label="Share product"
                onClick={() => void handleShare()}
                className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/85 text-neutral-700 backdrop-blur transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-black"
              >
                <Share2 size={17} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
              <button
                type="button"
                onClick={() => setInfoModal('verification')}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-black transition-transform hover:scale-[1.02]"
                style={{ background: GREEN }}
              >
                <Check size={12} strokeWidth={3} />
                Third-Party Verified
              </button>
              <span className="rounded bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                Spin for a second opinion
              </span>
            </div>
          </div>

          <div className="pt-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>
                  Verified Marketplace
                </p>
                <h1 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">{product.name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeDosage} · {product.form} · {detail.descriptor}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">SKU {detail.sku}</p>
              </div>
              <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {product.condition}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
              <Zap size={14} style={{ color: GREEN }} />
              <span className="font-semibold">{product.shippingTitle}</span>
              <span className="text-muted-foreground">{product.shippingBody}</span>
            </div>

            <div ref={dosageRef} className="relative mt-4">
              <button
                type="button"
                aria-expanded={dosageOpen}
                aria-controls="dosage-options"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3.5 text-sm transition-colors hover:border-border-hover"
                onClick={() => setDosageOpen((open) => !open)}
              >
                <span className="text-muted-foreground">Select dosage</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  {activeDosage}
                  <ChevronDown size={14} className={cn('text-muted-foreground transition-transform', dosageOpen && 'rotate-180')} />
                </span>
              </button>
              {dosageOpen && (
                <div id="dosage-options" className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-surface-overlay shadow-xl">
                  {product.variantOptions.map((dosage) => (
                    <button
                      key={dosage}
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted/50',
                        dosage === activeDosage && 'bg-muted/30',
                      )}
                      onClick={() => {
                        setActiveDosage(dosage)
                        setDosageOpen(false)
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <ProductSwatch visual={product.variantDetails[dosage].visual} />
                        {dosage}
                      </span>
                      <span className="font-semibold">${product.prices[dosage]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {[
                { label: 'Lowest Ask', value: `$${ask}` },
                { label: 'Highest Offer', value: `$${offer}` },
                { label: 'Last Sale', value: `$${lastSale}`, sub: `+$${change} (${changePct}%)` },
              ].map((metric) => (
                <div key={metric.label} className="bg-card px-3 py-4 sm:px-4">
                  <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px]">{metric.label}</p>
                  <p className="mt-1 text-xl font-black sm:text-2xl">{metric.value}</p>
                  {metric.sub && <p className="mt-0.5 text-[10px]" style={{ color: GREEN }}>{metric.sub}</p>}
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTradeAction('offer')}
                className="rounded-lg border border-border bg-card py-3.5 text-sm font-bold transition-colors hover:border-border-hover hover:bg-muted/40"
              >
                Make Offer
              </button>
              <button
                type="button"
                onClick={() => setTradeAction('buy')}
                className="rounded-lg py-3.5 text-sm font-black text-black transition-transform hover:scale-[1.01]"
                style={{ background: GREEN }}
              >
                Buy Now · ${ask}
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pay over time with Venmo, Cash App, Crypto, or an envelope marked “cash.”
            </p>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
              <div>
                <span className="text-muted-foreground">30-day volume </span>
                <span className="font-semibold">{product.soldLast30Days.toLocaleString()} units</span>
              </div>
              <a href="#price-history" className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                View market data
              </a>
            </div>

            <button
              type="button"
              onClick={() => setTradeAction('sell')}
              className="mt-3 w-full rounded-lg border border-border bg-card py-3 text-center text-sm font-semibold transition-colors hover:border-border-hover hover:bg-muted/40"
            >
              Sell Now for ${offer} or Set an Ask
            </button>

            <div className="mt-3">
              <AccordionRow id="return" label="Return Policy" right={<span>Final-ish sale</span>} open={openAccordion === 'return'} onToggle={() => setOpenAccordion(openAccordion === 'return' ? null : 'return')}>
                <p>{product.returnCopy}</p>
              </AccordionRow>
              <AccordionRow id="promise" label="Buyer Promise" open={openAccordion === 'promise'} onToggle={() => setOpenAccordion(openAccordion === 'promise' ? null : 'promise')}>
                <p>{product.buyerPromiseCopy}</p>
              </AccordionRow>
              <AccordionRow id="process" label="Our Process" right={<span>Lab Verified</span>} open={openAccordion === 'process'} onToggle={() => setOpenAccordion(openAccordion === 'process' ? null : 'process')}>
                <p>{product.processCopy}</p>
              </AccordionRow>
            </div>
          </div>
        </section>

        <section id="price-history" className="mt-20 scroll-mt-32">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Market intelligence</p>
              <h2 className="mt-1 text-xl font-bold">Price History</h2>
              <p className="mt-1 text-xs text-muted-foreground">{product.name} {activeDosage} · verified sales only</p>
            </div>
            <div className="flex w-fit gap-1 rounded-lg border border-border bg-card p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  type="button"
                  aria-pressed={activeTimeframe === timeframe}
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
                    activeTimeframe === timeframe ? 'text-black' : 'text-muted-foreground hover:text-foreground',
                  )}
                  style={activeTimeframe === timeframe ? { background: GREEN } : {}}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <MarketChart data={chartData} min={chartMin} max={chartMax} />
            {activeTimeframe === '1Y' && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {product.marketNote}
              </p>
            )}
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-base font-bold">Recent Sales</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">A transparent market has very little to hide.</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: GREEN }}>
                <span className="size-1.5 animate-pulse rounded-full" style={{ background: GREEN }} /> Live
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 font-medium">Sale price</th>
                    <th className="px-3 py-3 font-medium">Variant</th>
                    <th className="px-3 py-3 font-medium">Provenance</th>
                    <th className="px-3 py-3 font-medium">Condition</th>
                    <th className="px-5 py-3 text-right font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {product.recentSales.map((sale) => (
                    <tr key={`${sale.price}-${sale.when}`} className="border-b border-border last:border-0">
                      <td className="px-5 py-3.5 font-bold">${sale.price}</td>
                      <td className="px-3 py-3.5">{sale.variant}</td>
                      <td className="px-3 py-3.5 text-muted-foreground">{sale.source}</td>
                      <td className="px-3 py-3.5 text-muted-foreground">{sale.condition}</td>
                      <td className="px-5 py-3.5 text-right text-xs text-muted-foreground">{sale.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {product.historicalStats.map((stat) => (
              <div key={`${stat.label}-${stat.sub}`} className="rounded-lg border border-border bg-card px-4 py-3.5">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="mt-0.5 text-sm font-medium">{stat.label}</p>
                {stat.sub && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.sub === 'vs. Pharmacy MSRP' ? (
                      <span className="flex items-center gap-1"><TrendingUp size={10} style={{ color: GREEN }} />{stat.sub}</span>
                    ) : stat.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Our process</p>
            <h2 className="mt-1 text-xl font-bold">A safer secondary market in three steps</h2>
          </div>
          <div className="grid overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 md:gap-px">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon
              return (
                <article key={step.number} className="border-b border-border bg-card p-6 last:border-0 md:border-b-0">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10"><Icon size={17} style={{ color: GREEN }} /></span>
                    <span className="font-mono text-xs text-foreground-subtle">{step.number}</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold">Related Products</h2>
              <p className="mt-1 text-xs text-muted-foreground">Curated by our proprietary contraindication engine.</p>
            </div>
            <p className="text-xs text-foreground-subtle">Swipe to explore on mobile</p>
          </div>
          <div className="grid auto-cols-[78%] grid-flow-col gap-3 overflow-x-auto pb-4 snap-x snap-mandatory sm:auto-cols-[42%] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-5 lg:overflow-visible">
            {RELATED_LISTINGS.map((listing) => (
              <RelatedCard
                key={listing.id}
                listing={listing}
                onSelect={() => showMessage(`${listing.name} trading opens pending regulatory review`)}
              />
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-border pt-6 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-bold text-foreground">Obviously satire.</span> DrugX is fictional. All products, prices, verification claims, and transactions are fabricated.
            <br />Do not buy, sell, share, or take unidentified medication. Consult a licensed medical professional.
          </p>
        </footer>
      </div>

      <DrugXTradeDialog action={tradeAction} onOpenChange={(open) => !open && setTradeAction(null)} dosage={activeDosage} ask={ask} offer={offer} />
      <DrugXInfoDialog
        open={Boolean(infoModal)}
        onOpenChange={(open) => !open && setInfoModal(null)}
        title={infoModal ? MODALS[infoModal].title : ''}
        body={infoModal ? MODALS[infoModal].body : []}
      />
      <DrugXLabsDialog
        open={showLabsModal}
        onOpenChange={setShowLabsModal}
        onScan={() => {
          setShowLabsModal(false)
          showMessage('Analysis complete: probably a pill')
        }}
      />

      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface-overlay px-5 py-3 text-sm font-medium shadow-xl transition-all duration-300',
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        {toast}
      </div>
    </>
  )
}
