'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useCursorEffect } from '@/contexts/CursorContext'

const EFFECTS = {
  glow:      { radius: '520px', light: 'rgba(184,115,51,0.065)', dark: 'rgba(196,154,60,0.07)' },
  spotlight: { radius: '180px', light: 'rgba(184,115,51,0.20)',  dark: 'rgba(196,154,60,0.22)' },
  none:      null,
}

export function CursorGlow() {
  const { resolvedTheme } = useTheme()
  const { effect } = useCursorEffect()

  useEffect(() => {
    const root = document.documentElement
    const config = EFFECTS[effect]

    if (!config) {
      root.style.setProperty('--glow-color', 'transparent')
      return
    }

    const isDark = resolvedTheme === 'dark'
    root.style.setProperty('--glow-radius', config.radius)
    root.style.setProperty('--glow-color', isDark ? config.dark : config.light)

    const handle = (e: MouseEvent) => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`)
      root.style.setProperty('--cursor-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [effect, resolvedTheme])

  return null
}
