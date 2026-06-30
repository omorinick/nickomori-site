'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, MousePointer2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCursorEffect, type CursorEffect } from '@/contexts/CursorContext'

const CURSOR_OPTIONS: { value: CursorEffect; label: string }[] = [
  { value: 'glow',      label: 'Glow' },
  { value: 'spotlight', label: 'Spotlight' },
  { value: 'none',      label: 'None' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { effect, setEffect } = useCursorEffect()
  const [mounted, setMounted] = useState(false)
  const [cursorOpen, setCursorOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  if (pathname.startsWith('/projects/compliant-market')) return null

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-heading text-xl font-light tracking-widest text-foreground select-none group-hover:text-muted-foreground transition-colors">
            大森
          </span>
          <span className="text-sm font-semibold text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
            nickomori.com
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav className="flex items-center gap-7">
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Work</Link>
            <Link href="/#writing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Writing</Link>
            <Link href="/vault" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vault</Link>
          </nav>

          {mounted && (
            <div className="flex items-center gap-3">
              {/* Cursor effect selector */}
              <div
                className="relative"
                onMouseEnter={() => setCursorOpen(true)}
                onMouseLeave={() => setCursorOpen(false)}
              >
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                  aria-label="Cursor effect"
                >
                  <MousePointer2 size={15} strokeWidth={1.75} />
                </button>
                {cursorOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg py-1 w-28 z-50 shadow-sm">
                    {CURSOR_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setEffect(opt.value); setCursorOpen(false) }}
                        className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                          effect === opt.value
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
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
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
