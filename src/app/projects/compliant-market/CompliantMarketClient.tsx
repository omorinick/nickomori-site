'use client'

import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { cn } from '@/lib/utils'
import {
  PRODUCT, RELATED_LISTINGS, MODALS,
  type Dosage, type Timeframe, type RelatedListing,
} from '@/data/projects/compliant-market'

const GREEN = '#00bb29'
const RED = '#ef4444'

// ─── Pill image placeholder ───────────────────────────────────────────────────

function CapsulePlaceholder({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="relative rounded-full"
        style={{ width: 160, height: 64, background: `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)` }}
      >
        <div
          className="absolute inset-y-0 left-1/2 w-px opacity-40"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        />
      </div>
    </div>
  )
}

// ─── Related listing card ─────────────────────────────────────────────────────

function RelatedCard({ listing }: { listing: RelatedListing }) {
  const isUp = listing.trending === 'up'
  const isDown = listing.trending === 'down'
  const capsuleColors: Record<string, [string, string]> = {
    'xanax-2mg':        ['#d4d4d4', '#e8e8e8'],
    'oxycodone-10mg':   ['#f0f0f0', '#ffffff'],
    'ambien-10mg':      ['#f4a0b8', '#f8c4d4'],
    'claritin-10mg':    ['#ffffff', '#f0f0f0'],
    'adderall-xr-10mg': ['#6fa8dc', '#9fc5e8'],
  }
  const [c1, c2] = capsuleColors[listing.id] ?? ['#888', '#aaa']

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors">
      <div className="bg-muted/30 h-28 flex items-center justify-center px-4">
        <div
          className="relative rounded-full"
          style={{ width: 80, height: 32, background: `linear-gradient(90deg, ${c1} 50%, ${c2} 50%)` }}
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground truncate">{listing.variant}</p>
        <p className="text-sm font-semibold mt-0.5 truncate">{listing.name}</p>
        <p className="text-sm font-bold mt-1">${listing.price}</p>
        <p
          className="text-xs mt-0.5"
          style={{ color: isUp ? GREEN : isDown ? RED : 'var(--muted-foreground)' }}
        >
          {isUp ? '+' : ''}{listing.change !== 0 ? `$${Math.abs(listing.change)} (${Math.abs(listing.changePercent)}%)` : '—'}
        </p>
      </div>
    </div>
  )
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-semibold">${payload[0].value}</p>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  title, body, onClose,
}: {
  title: string
  body: string[]
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: GREEN, color: '#000' }}>
            ✓ VERIFIED
          </span>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="space-y-3">
          {body.map((para, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-8 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CompliantMarketClient() {
  const [activeDosage, setActiveDosage] = useState<Dosage>('30mg')
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1M')
  const [activeModal, setActiveModal] = useState<'verification' | 'buyerProtection' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const price    = PRODUCT.dosagePrices[activeDosage]
  const bid      = PRODUCT.dosageBid[activeDosage]
  const ask      = PRODUCT.dosageAsk[activeDosage]
  const lastSale = PRODUCT.dosageLastSale[activeDosage]
  const change   = PRODUCT.dosageLastSaleChange[activeDosage]
  const changePct = PRODUCT.dosageLastSaleChangePct[activeDosage]

  const chartData = PRODUCT.priceHistory[activeTimeframe]
  const chartMin  = Math.min(...chartData.map(d => d.price)) - 5
  const chartMax  = Math.max(...chartData.map(d => d.price)) + 5

  const timeframes: Timeframe[] = ['1W', '1M', '3M', '1Y']

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pb-24">

        {/* ── Marketplace header ── */}
        <div className="flex items-center gap-2 mb-8 pt-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: GREEN }}>
            Compliant Market
          </span>
          <span className="text-muted-foreground/40 text-xs">·</span>
          <span className="text-xs text-muted-foreground">Pharmaceuticals</span>
          <span className="text-muted-foreground/40 text-xs">·</span>
          <span className="text-xs text-muted-foreground">Stimulants</span>
        </div>

        {/* ── Two-column product area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Product image */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
              <CapsulePlaceholder color1="#e8722a" color2="#f4a46a" />
              <button
                onClick={() => setActiveModal('verification')}
                className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: GREEN, color: '#000' }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Authentic · What&apos;s this?
              </button>
            </div>

            {/* Pill ID CTA */}
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Coming Soon</p>
              <p className="text-sm font-semibold">Found a pill you can&apos;t identify?</p>
              <p className="text-xs text-muted-foreground mt-1">Upload it. We&apos;ll tell you what it&apos;s worth.</p>
              <button
                className="mt-3 text-xs font-semibold px-5 py-2 rounded-full border border-border text-muted-foreground cursor-not-allowed opacity-60"
                disabled
              >
                Upload a Pill · Compliant Labs™
              </button>
            </div>
          </div>

          {/* Right: Product details */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">Compliant Market</p>
            <h1 className="text-4xl font-extrabold tracking-tight mt-1">Adderall XR</h1>
            <p className="text-muted-foreground mt-1">
              {activeDosage} · Orange Capsule · <span className="font-mono text-xs">SKU: ADD-XR-{activeDosage.replace('mg', '')}</span>
            </p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-4">
              <span className="text-5xl font-extrabold">${price}</span>
              <span className="text-sm text-muted-foreground pb-2">
                Last Sale: <span className="text-foreground font-medium">${lastSale}</span>
                {' '}
                <span style={{ color: GREEN }}>+${change} (+{changePct}%)</span>
              </span>
            </div>

            {/* Bid / Ask */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Top Bid</p>
                <p className="text-2xl font-bold mt-1">${bid}</p>
                <button
                  className="mt-3 w-full py-2 text-sm font-semibold rounded-lg border border-border hover:border-white/30 transition-colors"
                >
                  Place Bid
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Lowest Ask</p>
                <p className="text-2xl font-bold mt-1">${ask}</p>
                <button
                  className="mt-3 w-full py-2 text-sm font-semibold rounded-lg border border-border hover:border-white/30 transition-colors"
                >
                  Place Ask
                </button>
              </div>
            </div>

            {/* Dosage selector */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Select Dosage</p>
              <div className="flex gap-2">
                {PRODUCT.dosageOptions.map(dosage => (
                  <button
                    key={dosage}
                    onClick={() => setActiveDosage(dosage)}
                    className={cn(
                      'flex flex-col items-center px-5 py-3 rounded-xl border text-sm font-semibold transition-all',
                      activeDosage === dosage
                        ? 'border-white/50 bg-card text-foreground'
                        : 'border-border text-muted-foreground hover:border-white/20',
                    )}
                  >
                    <span>{dosage}</span>
                    <span className="text-xs font-normal mt-0.5 text-muted-foreground">
                      ${PRODUCT.dosagePrices[dosage]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buy / Sell CTAs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                className="py-4 rounded-xl text-base font-extrabold tracking-wide transition-opacity hover:opacity-90"
                style={{ background: GREEN, color: '#000' }}
              >
                Buy Now · ${ask}
              </button>
              <button className="py-4 rounded-xl text-base font-extrabold tracking-wide border border-border bg-card hover:border-white/30 transition-colors">
                Sell
              </button>
            </div>

            {/* Fine print */}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => setActiveModal('buyerProtection')}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Buyer Protection
              </button>
              <span>·</span>
              <span>Ships in Compliant Market packaging</span>
            </div>
          </div>
        </div>

        {/* ── Price history chart ── */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Price History · Adderall XR {activeDosage}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">All sales, verified transactions only</p>
            </div>
            <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-md transition-all',
                    activeTimeframe === tf
                      ? 'text-black'
                      : 'text-muted-foreground hover:text-foreground',
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
                <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={[chartMin, chartMax]}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `$${v}`}
                    width={40}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
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
                ↑ September spike attributed to back-to-school demand. Market corrected by November.
              </p>
            )}
          </div>
        </div>

        {/* ── Related listings ── */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-semibold">Related Listings</h2>
            <p className="text-xs text-muted-foreground">Curated by Compliant Market algorithm</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RELATED_LISTINGS.map(listing => (
              <RelatedCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        {/* ── Footer fine print ── */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/40 leading-relaxed">
            Compliant Market is a satirical project. All prices are fictional. No actual transactions occur.
            <br />
            Always verify what you&apos;re putting in your body. Or don&apos;t — we&apos;re a marketplace, not a doctor.
          </p>
        </div>

      </div>

      {/* ── Modals ── */}
      {activeModal === 'verification' && (
        <Modal
          title={MODALS.verification.title}
          body={MODALS.verification.body}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'buyerProtection' && (
        <Modal
          title={MODALS.buyerProtection.title}
          body={MODALS.buyerProtection.body}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}
