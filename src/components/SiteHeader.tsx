'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (pathname.startsWith('/projects/compliant-market')) return null

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-heading text-xl font-light tracking-widest text-foreground/25 select-none group-hover:text-foreground/50 transition-colors">
            大森
          </span>
          <span className="text-sm font-semibold text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
            nickomori.com
          </span>
        </Link>
        <div className="flex items-center gap-7">
          <nav className="flex items-center gap-7">
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Work
            </Link>
            <Link href="/#writing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Writing
            </Link>
            <Link href="/vault" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Vault
            </Link>
          </nav>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
