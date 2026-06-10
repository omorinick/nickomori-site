'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Zap, Shield, Settings2, TrendingUp, Heart, Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PRODUCT, RELATED_LISTINGS, MODALS, HISTORICAL_STATS, INFO_CARDS,
  type Dosage, type Timeframe, type RelatedListing,
} from '@/data/projects/compliant-market'

const PillScene = dynamic(() => import('./PillScene'), { ssr: false })

const GREEN = '#00bb29'
const RED   = '#ef4444'

// Two-tone colors for each related product
const RELATED_PILL_COLORS: Record<string, [string, string]> = {
  'xanax-2mg':        ['#6b7280', '#9ca3af'],
  'oxycodone-10mg':   ['#8b5cf6', '#a78bfa'],
  'ambien-10mg':      ['#ec4899', '#f472b6'],
  'claritin-10mg':    ['#eab308', '#fbbf24'],
  'adderall-xr-10mg': ['#0d9488', '#2dd4bf'],
}

// ─── DrugX Labs interstitial modal ───────────────────────────────────────────

function LabsModal({ onClose, onUpload }: { onClose: () => void; onUpload: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-overlay border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-black/60"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded tracking-wide"
            style={{ background: GREEN, color: '#000' }}
          >
            ✦ JUST RELEASED
          </span>
          <span className="text-xs text-muted-foreground">DrugX Labs™</span>
        </div>
        <h2 className="text-xl font-bold leading-snug">
          Found a pill you can&apos;t identify?
        </h2>
        <p className="text-sm text-foreground mt-3 leading-relaxed">
          Upload it and we&apos;ll tell you exactly what it&apos;s worth on today&apos;s markets.
          Powered by our proprietary compound recognition engine. Results in seconds.
        </p>
        <p className="text-sm text-foreground mt-1">No questions asked.</p>

        {/* Fake upload area */}
        <button
          onClick={onUpload}
          className="mt-6 w-full bg-card border-2 border-dashed border-border hover:border-border-hover rounded-xl py-6 flex flex-col items-center gap-2 transition-colors group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: GREEN + '22' }}
          >
            💊
          </div>
          <span className="text-sm font-semibold group-hover:text-foreground text-muted-foreground transition-colors">
            Upload a Pill →
          </span>
          <span className="text-xs text-foreground-subtle">PNG, JPG, HEIC up to 10MB</span>
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks, I know what this is
        </button>
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-surface-overlay border border-border text-sm font-medium z-50 transition-all duration-300 whitespace-nowrap',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
      )}
    >
      Just kidding 💊
    </div>
  )
}

// ─── Related card ─────────────────────────────────────────────────────────────

function RelatedCard({ listing }: { listing: RelatedListing }) {
  const isUp   = listing.trending === 'up'
  const isDown = listing.trending === 'down'
  const [c1, c2] = RELATED_PILL_COLORS[listing.id] ?? ['#888', '#aaa']

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-border-hover transition-colors">
      <div className="relative h-32" style={{ background: '#f0f0f0' }}>
        <PillScene color1={c1} color2={c2} />
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground truncate">{listing.variant}</p>
        <p className="text-sm font-semibold mt-0.5 truncate">{listing.name}</p>
        <p className="text-sm font-bold mt-1">${listing.price}</p>
        <p
          className="text-xs mt-0.5"
          style={{ color: isUp ? GREEN : isDown ? RED : 'var(--muted-foreground)' }}
        >
          {listing.change !== 0
            ? `${isUp ? '+' : ''}$${Math.abs(listing.change)} (${Math.abs(listing.changePercent)}%)`
            : '—'}
        </p>
      </div>
    </div>
  )
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: { value: number }[]; label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-semibold">${payload[0].value}</p>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, body, onClose }: { title: string; body: string[]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-surface-overlay border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-black/60" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: GREEN, color: '#000' }}>
            ✓ VERIFIED
          </span>
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <div className="space-y-3">
          {body.map((p, i) => (
            <p key={i} className="text-sm text-foreground leading-relaxed">{p}</p>
          ))}
        </div>
        <button onClick={onClose} className="mt-7 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
          Close
        </button>
      </div>
    </div>
  )
}

// ─── Accordion row ────────────────────────────────────────────────────────────

function AccordionRow({
  label, right, children, open, onToggle,
}: {
  label: string; right?: React.ReactNode; children?: React.ReactNode
  open: boolean; onToggle: () => void
}) {
  return (
    <div className="border-t border-border">
      <button
        className="w-full flex items-center justify-between py-4 text-sm hover:text-foreground transition-colors"
        onClick={onToggle}
      >
        <span className="font-medium">{label}</span>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          {right}
          <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
        </div>
      </button>
      {open && children && (
        <div className="pb-4 text-sm text-muted-foreground leading-relaxed">{children}</div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DrugXProductPage() {
  const [activeDosage, setActiveDosage]       = useState<Dosage>('30mg')
  const [dosageOpen, setDosageOpen]           = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1M')
  const [activeModal, setActiveModal]         = useState<'verification' | 'buyerProtection' | null>(null)
  const [openAccordion, setOpenAccordion]     = useState<string | null>(null)
  const [mounted, setMounted]                 = useState(false)
  const [carouselIdx, setCarouselIdx]         = useState(0)
  const [showLabsModal, setShowLabsModal]     = useState(false)
  const [showToast, setShowToast]             = useState(false)
  const dosageRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  // Labs modal: opened via the ID button in the header
  useEffect(() => {
    const fn = () => setShowLabsModal(true)
    document.addEventListener('drugx:open-labs-modal', fn)
    return () => document.removeEventListener('drugx:open-labs-modal', fn)
  }, [])

  // Close dosage dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dosageRef.current && !dosageRef.current.contains(e.target as Node)) {
        setDosageOpen(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const handleUpload = () => {
    setShowLabsModal(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const ask       = PRODUCT.dosageAsk[activeDosage]
  const bid       = PRODUCT.dosageBid[activeDosage]
  const lastSale  = PRODUCT.dosageLastSale[activeDosage]
  const change    = PRODUCT.dosageLastSaleChange[activeDosage]
  const changePct = PRODUCT.dosageLastSaleChangePct[activeDosage]

  const chartData = PRODUCT.priceHistory[activeTimeframe]
  const chartMin  = Math.min(...chartData.map(d => d.price)) - 5
  const chartMax  = Math.max(...chartData.map(d => d.price)) + 5
  const timeframes: Timeframe[] = ['1W', '1M', '3M', '1Y']

  const toggleAccordion = (s: string) => setOpenAccordion(p => p === s ? null : s)

  const VISIBLE_CARDS = 3
  const maxCarouselIdx = RELATED_LISTINGS.length - VISIBLE_CARDS

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pb-24">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground py-5">
          <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Pills</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Stimulants</span>
          <span>/</span>
          <span className="text-foreground">Adderall XR {activeDosage}</span>
        </nav>

        {/* ── Product area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: 3D pill image */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-white relative h-[480px]">
              <div className="absolute inset-0">
                <PillScene color1="#3b6fd4" color2="#6b9fe8" />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <Heart size={16} className="text-muted-foreground" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 size={16} className="text-muted-foreground" />
                </button>
              </div>
              <button
                onClick={() => setActiveModal('verification')}
                className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: GREEN, color: '#000' }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verified Authentic · What&apos;s this?
              </button>
            </div>
          </div>

          {/* Right: purchase details */}
          <div className="pt-1">
            <h1 className="text-[28px] font-bold leading-tight">Adderall XR</h1>
            <p className="text-muted-foreground mt-0.5">{activeDosage} · {PRODUCT.variant}</p>

            <div className="flex items-center gap-2 mt-4 text-sm">
              <div className="w-4 h-4 rounded border border-border flex items-center justify-center">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.2 6L8 1" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>
                <span className="font-semibold">QuickPack available.</span>
                <span className="text-muted-foreground"> Get it by Jun 10</span>
              </span>
              <Zap size={13} style={{ color: GREEN }} className="flex-shrink-0" />
            </div>

            {/* Dosage dropdown */}
            <div className="mt-5 relative" ref={dosageRef}>
              <button
                className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3.5 text-sm hover:border-border-hover transition-colors"
                onClick={() => setDosageOpen(o => !o)}
              >
                <span className="text-muted-foreground">Dosage:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{activeDosage}</span>
                  <ChevronDown size={14} className={cn('text-muted-foreground transition-transform', dosageOpen && 'rotate-180')} />
                </div>
              </button>
              {dosageOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface-overlay border border-border rounded-xl overflow-hidden z-10 shadow-xl">
                  {PRODUCT.dosageOptions.map(d => (
                    <button
                      key={d}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/50 transition-colors',
                        d === activeDosage && 'bg-muted/30',
                      )}
                      onClick={() => { setActiveDosage(d); setDosageOpen(false) }}
                    >
                      <span>{d}</span>
                      <span className="font-semibold">${PRODUCT.dosagePrices[d]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy box */}
            <div className="mt-4 bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Buy Now for</p>
                  <p className="text-3xl font-extrabold mt-0.5">${ask}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Zap size={14} style={{ color: GREEN }} className="flex-shrink-0" />
                  <span className="font-semibold" style={{ color: GREEN }}>
                    {PRODUCT.soldLast30Days.toLocaleString()} Sold in Last 30 Days!
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <Shield size={11} className="inline mr-1 mb-0.5" />
                ${ask} Includes DrugX Service Fee{' '}
                <button
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                  onClick={() => setActiveModal('buyerProtection')}
                >?</button>
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button className="py-4 rounded-xl text-sm font-bold border border-border bg-card hover:border-border-hover transition-colors">
                Make Offer
              </button>
              <button
                className="py-4 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: GREEN, color: '#000' }}
              >
                Buy Now
              </button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground text-center">
              Pay over time with{' '}
              <span className="text-foreground font-medium">Venmo</span>
              {' '}or{' '}
              <span className="text-foreground font-medium">Cash App</span>
              {' '}or{' '}
              <span className="text-foreground font-medium">Crypto</span>
              {' '}
              <button className="underline underline-offset-1 hover:text-foreground transition-colors">Learn More</button>
            </p>

            <div className="mt-4 flex items-center justify-between text-sm border-t border-border pt-4">
              <div>
                <span className="text-muted-foreground">Last Sale </span>
                <span className="font-semibold">${lastSale}</span>
                <span className="text-xs ml-1.5" style={{ color: GREEN }}>
                  +${change} (+{changePct}%)
                </span>
              </div>
              <a href="#price-chart" className="text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors">
                View Market Data →
              </a>
            </div>

            <button className="mt-3 w-full text-center text-sm font-semibold py-3 rounded-xl bg-card border border-border hover:border-border-hover transition-colors">
              Sell Now for ${bid} or Ask for More →
            </button>

            <div className="mt-2">
              <AccordionRow
                label="Return Policy"
                right={<span>Select a dosage</span>}
                open={openAccordion === 'return'}
                onToggle={() => toggleAccordion('return')}
              >
                <p className="px-1 pb-1">All sales are final once a dosage has been selected and the order is confirmed. We are unable to process returns for reasons related to personal preference, unexpected efficacy, or change of mind.</p>
              </AccordionRow>
              <AccordionRow
                label="Buyer Promise"
                open={openAccordion === 'buyer'}
                onToggle={() => toggleAccordion('buyer')}
              >
                <p className="px-1 pb-1">We stand behind every product sold on DrugX. If a mistake is made, we'll make it right. Full refund or replacement, your choice. Terms apply. Not valid in states with recreational laws. Or the other states. Actually, none of the states. But we're working on it.</p>
              </AccordionRow>
              <AccordionRow
                label="Our Process"
                right={<span>Condition: Lab Verified</span>}
                open={openAccordion === 'process'}
                onToggle={() => toggleAccordion('process')}
              >
                <p className="px-1 pb-1">Every item sold on DrugX is verified by our team of certified independent analysts. We test for purity, potency, and authenticity before each order ships. Your safety is our priority, which is why we don't ask about its origin.</p>
              </AccordionRow>
            </div>
          </div>
        </div>

        {/* ── Price chart ── */}
        <div id="price-chart" className="mt-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Price History</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Adderall XR {activeDosage} · Verified sales only</p>
            </div>
            <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-md transition-all',
                    activeTimeframe === tf ? 'text-black' : 'text-muted-foreground hover:text-foreground',
                  )}
                  style={activeTimeframe === tf ? { background: GREEN } : {}}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            {mounted ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                  <YAxis domain={[chartMin, chartMax]} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} width={40} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="linear"
                    dataKey="price"
                    stroke={GREEN}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: GREEN, stroke: 'var(--card)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Loading chart…</span>
              </div>
            )}
            {activeTimeframe === '1Y' && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                ↑ September spike attributed to back-to-school demand. Market self-corrected by November.
              </p>
            )}
          </div>
        </div>

        {/* ── Historical data ── */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Historical Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HISTORICAL_STATS.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl px-4 py-3.5">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium mt-0.5">{stat.label}</p>
                {stat.sub && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.sub === 'vs. Pharmacy MSRP' ? (
                      <span className="flex items-center gap-1">
                        <TrendingUp size={10} style={{ color: GREEN }} />
                        {stat.sub}
                      </span>
                    ) : `| ${stat.sub}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Info cards ── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {INFO_CARDS.map(card => (
            <div key={card.title} className="bg-surface-overlay border border-border rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-3">
                {card.icon === 'process' && <Settings2 size={17} className="text-muted-foreground flex-shrink-0" />}
                {card.icon === 'shield'  && <Shield    size={17} className="text-muted-foreground flex-shrink-0" />}
                {card.icon === 'sell'    && <TrendingUp size={17} className="text-muted-foreground flex-shrink-0" />}
                <p className="font-semibold text-sm">{card.title}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              <button className="mt-3 text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* ── Related products carousel ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Related Products</h2>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground mr-2">Curated by DrugX algorithm</p>
              <button
                onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                disabled={carouselIdx === 0}
                className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:border-border-hover transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setCarouselIdx(i => Math.min(maxCarouselIdx, i + 1))}
                disabled={carouselIdx >= maxCarouselIdx}
                className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:border-border-hover transition-colors disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          {/* -mx-2 cancels the outer px-2 so cards align flush with page content */}
          <div className="overflow-hidden -mx-2">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                width: `${(RELATED_LISTINGS.length / VISIBLE_CARDS) * 100}%`,
                transform: `translateX(-${carouselIdx * (100 / RELATED_LISTINGS.length)}%)`,
              }}
            >
              {RELATED_LISTINGS.map(l => (
                <div key={l.id} className="px-2" style={{ width: `${100 / RELATED_LISTINGS.length}%` }}>
                  <RelatedCard listing={l} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fine print ── */}
        <div className="mt-16 text-center">
          <p className="text-xs leading-relaxed text-foreground-subtle">
            DrugX is a satirical project. All prices are fictional. No actual transactions occur.
            <br />
            Always verify what you&apos;re putting in your body. Or don&apos;t — we&apos;re a marketplace, not a doctor.
          </p>
        </div>

      </div>

      {/* ── Modals ── */}
      {activeModal === 'verification'    && <Modal title={MODALS.verification.title}    body={MODALS.verification.body}    onClose={() => setActiveModal(null)} />}
      {activeModal === 'buyerProtection' && <Modal title={MODALS.buyerProtection.title} body={MODALS.buyerProtection.body} onClose={() => setActiveModal(null)} />}
      {showLabsModal && <LabsModal onClose={() => setShowLabsModal(false)} onUpload={handleUpload} />}
      <Toast visible={showToast} />
    </>
  )
}
