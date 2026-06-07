'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DrugXHeader from './DrugXHeader'
import DrugXProductPage from './CompliantMarketClient'

// Height of the back bar — header sticks at this offset on load,
// scrolling up past 0 reveals the bar.
const BACK_BAR_HEIGHT = 44

export default function DrugXPageShell() {
  useEffect(() => {
    // Push the viewport down past the back bar so the DrugX header
    // appears to be the top of the page on load.
    window.scrollTo({ top: BACK_BAR_HEIGHT, behavior: 'instant' })
  }, [])

  return (
    <>
      {/* Back bar — lives above the header in the DOM.
          Revealed only when the user overscrolls / scrolls up past top. */}
      <div
        className="h-11 flex items-center px-6 bg-background border-b border-border"
        style={{ height: BACK_BAR_HEIGHT }}
      >
        <Link
          href="/projects"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Constructive Distractions
        </Link>
      </div>

      <DrugXHeader />
      <DrugXProductPage />
    </>
  )
}
