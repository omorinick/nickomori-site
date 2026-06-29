'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SiteHeader() {
  const pathname = usePathname()

  if (pathname.startsWith('/projects/compliant-market')) return null

  if (pathname === '/') {
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground tracking-tight hover:text-muted-foreground transition-colors"
          >
            nickomori.com
          </Link>
          <nav className="flex items-center gap-7">
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Work
            </Link>
            <Link href="#writing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Writing
            </Link>
            <Link href="/vault" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Vault
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="max-w-4xl mx-auto px-6 h-11 flex items-center">
        <Link
          href="/"
          className="text-xl font-light tracking-widest text-foreground/25 hover:text-foreground/50 transition-colors select-none"
        >
          大森
        </Link>
      </div>
    </header>
  )
}
