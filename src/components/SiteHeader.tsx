'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SiteHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname.startsWith('/projects/compliant-market')) return null

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
