'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
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
  HISTORICAL_STATS,
  MODALS,
  PRODUCT,
  RECENT_SALES,
  RELATED_LISTINGS,
  type Dosage,
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

const MarketChart = dynamic(() => import('./DrugXMarketChart'), {
  ssr: false,
  loading: () => <div className="h-[260px] animate-pulse rounded-lg bg-muted/40" />,
})

const RELATED_PILL_COLORS: Record<string, [string, string]> = {
  'xanax-2mg': ['#80858c', '#d8dadd'],
  'oxycodone-10mg': ['#8359bf', '#b796e4'],
  'ambien-10mg': ['#d84e8c', '#f18ab5'],
  'claritin-10mg': ['#d2a10d', '#f1d064'],
  'adderall-xr-10mg': ['#3574c8', '#83afe8'],
}

const HOW_IT_WORKS = [
  {
    icon: BadgeDollarSign,
    number: '01',
    title: 'List what is left',
    body: 'Choose the dosage, estimate the quantity, and provide the most plausible version of how it entered your possession.',
  },
  {
    icon: Beaker,
    number: '02',
    title: 'We allegedly verify it',
    body: 'DrugX Labs™ checks identity, purity, potency, and whether the label looks convincing from a responsible distance.',
  },
  {
    icon: PackageCheck,
    number: '03',
    title: 'The market decides',
    body: 'The highest Offer meets the lowest Ask. Somewhere, a medicine cabinet achieves price discovery.',
  },
] as const

function RelatedCard({ listing, onSelect }: { listing: RelatedListing; onSelect: () => void }) {
  const isUp = listing.trending === 'up'
  const isDown = listing.trending === 'down'
  const [color1, color2] = RELATED_PILL_COLORS[listing.id] ?? ['#888', '#aaa']

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group h-full w-full snap-start overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-border-hover hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#f1f2ef]">
        <div
          className="h-9 w-28 rotate-[-10deg] rounded-full shadow-[0_14px_28px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"
          style={{ background: `linear-gradient(90deg, ${color1} 0 50%, ${color2} 50% 100%)` }}
        />
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
    </button>
  )
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

export default function DrugXProductPage() {
  const [activeDosage, setActiveDosage] = useState<Dosage>('30mg')
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
      title: `DrugX — ${PRODUCT.name} ${activeDosage}`,
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

  const ask = PRODUCT.dosageAsk[activeDosage]
  const offer = PRODUCT.dosageBid[activeDosage]
  const lastSale = PRODUCT.dosageLastSale[activeDosage]
  const change = PRODUCT.dosageLastSaleChange[activeDosage]
  const changePct = PRODUCT.dosageLastSaleChangePct[activeDosage]
  const detail = PRODUCT.dosageDetails[activeDosage]
  const chartData = PRODUCT.priceHistory[activeTimeframe]
  const chartMin = Math.min(...chartData.map((point) => point.price)) - 5
  const chartMax = Math.max(...chartData.map((point) => point.price)) + 5
  const timeframes: Timeframe[] = ['1W', '1M', '3M', '1Y']

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto py-5 text-xs text-muted-foreground">
          <span>Home</span><span aria-hidden>/</span>
          <span>Pills</span><span aria-hidden>/</span>
          <span>Stimulants</span><span aria-hidden>/</span>
          <span className="whitespace-nowrap text-foreground">{PRODUCT.name} {activeDosage}</span>
        </nav>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[400px] overflow-hidden rounded-xl bg-[#f1f2ef] sm:h-[520px]">
            <div className="absolute inset-0">
              <PillScene color1={detail.color1} color2={detail.color2} />
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
                Verified by DrugX
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
                <h1 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">{PRODUCT.name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeDosage} · Extended Release · {detail.variant}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">SKU {detail.sku}</p>
              </div>
              <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Open box
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
              <Zap size={14} style={{ color: GREEN }} />
              <span className="font-semibold">Xpress Dose available.</span>
              <span className="text-muted-foreground">Ships in 1–2 suspiciously fast days.</span>
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
                  {PRODUCT.dosageOptions.map((dosage) => (
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
                        <span
                          className="size-3 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${PRODUCT.dosageDetails[dosage].color1} 50%, ${PRODUCT.dosageDetails[dosage].color2} 50%)` }}
                        />
                        {dosage}
                      </span>
                      <span className="font-semibold">${PRODUCT.dosagePrices[dosage]}</span>
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
                <span className="font-semibold">{PRODUCT.soldLast30Days.toLocaleString()} units</span>
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
                <p>Returns are accepted within 14 days if the item is materially different, unexpectedly effective, or still attached to the original prescription holder.</p>
              </AccordionRow>
              <AccordionRow id="promise" label="Buyer Promise" open={openAccordion === 'promise'} onToggle={() => setOpenAccordion(openAccordion === 'promise' ? null : 'promise')}>
                <p>Wrong pill, wrong color, wrong vibe—we will make it right. Terms apply. Coverage is not currently valid in any state, territory, or legally recognized body of water.</p>
              </AccordionRow>
              <AccordionRow id="process" label="Our Process" right={<span>Lab Verified</span>} open={openAccordion === 'process'} onToggle={() => setOpenAccordion(openAccordion === 'process' ? null : 'process')}>
                <p>Every item is routed through a proprietary multi-step verification process. We test identity, purity, potency, and whether the seller became visibly nervous during onboarding.</p>
              </AccordionRow>
            </div>
          </div>
        </section>

        <section id="price-history" className="mt-20 scroll-mt-32">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Market intelligence</p>
              <h2 className="mt-1 text-xl font-bold">Price History</h2>
              <p className="mt-1 text-xs text-muted-foreground">{PRODUCT.name} {activeDosage} · verified sales only</p>
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
                September spike attributed to back-to-school demand. Market self-corrected by November.
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
                    <th className="px-3 py-3 font-medium">Dosage</th>
                    <th className="px-3 py-3 font-medium">Provenance</th>
                    <th className="px-3 py-3 font-medium">Condition</th>
                    <th className="px-5 py-3 text-right font-medium">When</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_SALES.map((sale) => (
                    <tr key={`${sale.price}-${sale.when}`} className="border-b border-border last:border-0">
                      <td className="px-5 py-3.5 font-bold">${sale.price}</td>
                      <td className="px-3 py-3.5">{sale.dosage}</td>
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
            {HISTORICAL_STATS.map((stat) => (
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
            <h2 className="mt-1 text-xl font-bold">From cabinet to market in three steps</h2>
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
