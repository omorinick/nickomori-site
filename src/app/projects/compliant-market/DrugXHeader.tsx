'use client'

import Link from 'next/link'
import { CircleHelp, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const CATEGORIES = ['Pills', 'Injections', 'Powders', 'Collectibles', 'Mystery Box']
const GREEN = '#00bb29'

const PITCH_POINTS = [
  {
    eyebrow: 'Unlock trapped inventory',
    title: 'Your leftovers deserve a second act.',
    body: 'Finished the prescription but not the bottle? DrugX turns medicine-cabinet clutter into market liquidity—because perfectly good pharmaceutical assets should not spend retirement behind the toothpaste.',
  },
  {
    eyebrow: 'Trust, professionally packaged',
    title: 'Know what you are actually buying.',
    body: 'In a world where counterfeit pills and fentanyl contamination make “probably fine” a terrible quality standard, every DrugX listing is imagined as identified, screened, and verified before it reaches the market.',
  },
  {
    eyebrow: 'Any provenance welcome',
    title: 'Every bottle has an origin story.',
    body: 'Grandma left behind a pharmacological estate? Found a mystery tablet on the sidewalk? Send it to DrugX Labs™ for identification, authentication, and the kind of resale valuation no family executor thought to request.',
  },
  {
    eyebrow: 'Healthcare, priced by humans',
    title: 'Stop paying the new-pill premium.',
    body: 'No longer need life-saving medication? Pass the value on. Still need it? Buy verified inventory from a neighbor at a discount instead of rewarding a billionaire for manufacturing another identical pill.',
  },
]

function AboutDrugX() {
  return (
    <Dialog>
      <div className="relative group/about flex-shrink-0">
        <DialogTrigger
          aria-label="About DrugX"
          className="size-7 rounded-full border border-border text-muted-foreground flex items-center justify-center hover:text-foreground hover:border-border-hover focus-visible:text-foreground transition-colors"
        >
          <CircleHelp size={15} strokeWidth={1.8} />
        </DialogTrigger>
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-md border border-border bg-surface-overlay px-2 py-1 text-[11px] font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover/about:opacity-100 group-focus-within/about:opacity-100"
        >
          About
        </span>
      </div>

      <DialogContent className="dark max-h-[calc(100vh-2rem)] overflow-y-auto border-[#30343a] bg-[#111418] p-0 text-[#f4f5f6] ring-white/10 sm:max-w-2xl">
        <div className="border-b border-[#30343a] px-6 py-6 sm:px-8 sm:py-8">
          <div className="mb-5 flex items-center gap-2">
            <span
              className="rounded px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
              style={{ background: GREEN, color: '#000' }}
            >
              The pitch
            </span>
            <span className="text-xs text-[#9299a3]">A more efficient pharmaceutical market</span>
          </div>
          <DialogHeader className="gap-3 text-left">
            <DialogTitle className="max-w-xl font-sans text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Good medicine should not go to waste.
            </DialogTitle>
            <DialogDescription className="max-w-xl text-[15px] leading-relaxed text-[#b7bdc5]">
              DrugX is the trusted secondary marketplace for pharmaceutical assets—connecting underused supply with people who would prefer not to pay full retail for the exact same molecule.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid gap-px bg-[#30343a] sm:grid-cols-2">
          {PITCH_POINTS.map((point, index) => (
            <section key={point.title} className="bg-[#171a1f] p-6 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: GREEN }}>
                  {point.eyebrow}
                </span>
                <span className="font-mono text-xs text-[#626a74]">0{index + 1}</span>
              </div>
              <h3 className="text-base font-bold leading-snug text-[#f4f5f6]">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fa6af]">{point.body}</p>
            </section>
          ))}
        </div>

        <div className="px-6 py-6 sm:px-8">
          <div className="flex gap-3 rounded-xl border border-[#00bb29]/25 bg-[#00bb29]/10 p-4">
            <Sparkles className="mt-0.5 size-4 shrink-0" style={{ color: GREEN }} />
            <p className="text-sm leading-relaxed text-[#c7ccd2]">
              <span className="font-bold text-[#f4f5f6]">P.S.</span> Hosting a party and hate predictable outcomes? Try the DrugX Mystery Box™—a hand-curated assortment for people who believe informed consent ruins the surprise.
            </p>
          </div>

          <div className="mt-6 flex items-start gap-3 border-t border-[#30343a] pt-5">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#7b838d]" />
            <p className="text-xs leading-relaxed text-[#7b838d]">
              <span className="font-bold text-[#aeb4bc]">Obviously satire.</span> DrugX is fictional. Do not buy, sell, share, or take unidentified medication. No actual verification or transactions occur here.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function DrugXHeader() {
  const openLabsModal = () =>
    document.dispatchEvent(new CustomEvent('drugx:open-labs-modal'))

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      {/* ── Main nav ── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">

        {/* Logo + about */}
        <div className="flex items-center gap-2 mr-1">
          <Link href="/projects/compliant-market" className="flex-shrink-0">
            <span className="text-[22px] font-black tracking-tight leading-none">
              <span className="text-foreground">Drug</span>
              <span style={{ color: GREEN }}>X</span>
            </span>
          </Link>
          <AboutDrugX />
        </div>

        {/* Search */}
        <div className="flex-1 min-w-0">
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--muted-foreground)' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for substance, brand, etc."
              className="w-full bg-secondary border border-border rounded-full pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-border-hover transition-colors"
            />
          </div>
        </div>

        {/* ID button — triggers DrugX Labs modal */}
        <button
          onClick={openLabsModal}
          className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border text-sm font-bold overflow-hidden hover:border-border-hover transition-colors flex-shrink-0"
          style={{ color: GREEN }}
          title="Identify a pill"
        >
          {/* Shine sweep overlay */}
          <span
            aria-hidden="true"
            className="absolute top-0 h-full w-8 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              animation: 'shine 2.5s ease-in-out infinite',
            }}
          />
          <Search size={13} strokeWidth={2.5} />
          <span>ID</span>
        </button>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
          <span className="hover:text-foreground cursor-pointer transition-colors">Help</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Sell</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Affiliate</span>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="hidden sm:block px-4 py-1.5 rounded-full border border-border text-sm hover:border-border-hover transition-colors whitespace-nowrap">
            Login
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: GREEN, color: '#000' }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* ── Sub-nav ── */}
      <div className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center gap-8 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={cn(
                'text-sm whitespace-nowrap cursor-pointer transition-colors flex-shrink-0 pb-0.5',
                i === 0
                  ? 'text-foreground font-medium border-b-2'
                  : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent',
              )}
              style={i === 0 ? { borderColor: GREEN } : {}}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
