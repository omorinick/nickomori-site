'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, MousePointer2, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCursorEffect, type CursorEffect } from '@/contexts/CursorContext'

const CURSOR_OPTIONS: { value: CursorEffect; label: string; description: string }[] = [
  { value: 'none',      label: 'None',          description: 'No mouse effect' },
  { value: 'glow',      label: 'Cursor Glow',   description: 'Warm ambient light follows cursor — very subtle' },
  { value: 'magnetic',  label: 'Magnetic',      description: 'Cards pull slightly toward cursor on hover' },
  { value: 'cursor',    label: 'Custom Cursor',  description: 'Accent dot + lagging ring replaces system cursor' },
  { value: 'parallax',  label: 'Parallax',      description: 'Hero text shifts subtly with cursor position' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { effect, setEffect } = useCursorEffect()
  const [mounted, setMounted] = useState(false)
  const [cursorOpen, setCursorOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!cursorOpen) return
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('#cursor-dropdown')) setCursorOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [cursorOpen])

  if (pathname.startsWith('/projects/compliant-market')) return null

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-display text-xl font-light tracking-widest text-foreground select-none group-hover:text-muted-foreground transition-colors">
            大森
          </span>
          <span className="font-heading text-sm font-semibold text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
            nickomori.com
          </span>
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-7">
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
            <Link href="/#writing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Writing</Link>
            <Link href="/vault" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vault</Link>
          </nav>

          {mounted && (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
                </button>
                <span className="absolute right-0 top-full mt-2 bg-card border border-border rounded px-2 py-1 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </span>
              </div>

              <div id="cursor-dropdown" className="relative">
                <button
                  onClick={() => setCursorOpen(o => !o)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                  aria-label="Cursor effect"
                  aria-expanded={cursorOpen}
                >
                  <MousePointer2 size={15} strokeWidth={1.75} />
                </button>

                {cursorOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl p-1 w-64 z-50 shadow-sm">
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase px-3 pt-2 pb-1.5">
                      Mouse Effects
                    </p>
                    {CURSOR_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setEffect(opt.value); setCursorOpen(false) }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                          effect === opt.value ? 'bg-muted' : 'hover:bg-muted/50'
                        }`}
                      >
                        <p className="text-sm font-medium text-foreground mb-0.5">{opt.label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile right side — theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            </button>
          )}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — always mounted, animated via max-height */}
      <div
        className="md:hidden border-t border-border bg-card overflow-hidden"
        style={{
          maxHeight: menuOpen ? '200px' : '0px',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
        }}
      >
        <nav className="px-4 py-1">
          <Link href="/projects" onClick={() => setMenuOpen(false)} className="flex items-center py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border">Projects</Link>
          <Link href="/#writing" onClick={() => setMenuOpen(false)} className="flex items-center py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border">Writing</Link>
          <Link href="/vault" onClick={() => setMenuOpen(false)} className="flex items-center py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors">Vault</Link>
        </nav>
      </div>
    </header>
  )
}
