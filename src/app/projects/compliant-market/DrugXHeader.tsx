import Link from 'next/link'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Pills', 'Injections', 'Powders', 'Collectibles', 'Mystery Box']
const GREEN = '#00bb29'

export default function DrugXHeader() {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      {/* ── Main nav ── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-5">

        {/* Logo */}
        <Link href="/projects/compliant-market" className="flex-shrink-0 mr-2">
          <span className="text-[22px] font-black tracking-tight leading-none">
            <span className="text-foreground">Drug</span>
            <span style={{ color: GREEN }}>X</span>
          </span>
        </Link>

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
