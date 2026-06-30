'use client'

import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])
  return null
}
