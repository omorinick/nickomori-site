'use client'

import { useEffect, useRef } from 'react'

export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.05), transparent 70%)`
    }

    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  )
}
