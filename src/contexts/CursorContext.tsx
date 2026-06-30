'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type CursorEffect = 'none' | 'glow' | 'magnetic' | 'cursor' | 'parallax'

const VALID: CursorEffect[] = ['none', 'glow', 'magnetic', 'cursor', 'parallax']

interface CursorContextValue {
  effect: CursorEffect
  setEffect: (e: CursorEffect) => void
}

const CursorContext = createContext<CursorContextValue>({
  effect: 'glow',
  setEffect: () => {},
})

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [effect, setEffectState] = useState<CursorEffect>('none')

  useEffect(() => {
    const saved = localStorage.getItem('cursor-effect') as CursorEffect | null
    if (saved && VALID.includes(saved)) setEffectState(saved)
  }, [])

  const setEffect = (e: CursorEffect) => {
    setEffectState(e)
    localStorage.setItem('cursor-effect', e)
  }

  return (
    <CursorContext.Provider value={{ effect, setEffect }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursorEffect = () => useContext(CursorContext)
