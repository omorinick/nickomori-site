'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useCursorEffect } from '@/contexts/CursorContext'

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export function CursorGlow() {
  const { resolvedTheme } = useTheme()
  const { effect } = useCursorEffect()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--glow-color', 'transparent')

    // ── Cursor Glow ──────────────────────────────────────────────────────────
    if (effect === 'glow') {
      const isDark = resolvedTheme === 'dark'
      root.style.setProperty('--glow-radius', '520px')
      root.style.setProperty('--glow-color', isDark ? 'rgba(196,154,60,0.07)' : 'rgba(184,115,51,0.065)')
      const handle = (e: MouseEvent) => {
        root.style.setProperty('--cursor-x', `${e.clientX}px`)
        root.style.setProperty('--cursor-y', `${e.clientY}px`)
      }
      window.addEventListener('mousemove', handle)
      return () => window.removeEventListener('mousemove', handle)
    }

    // ── Magnetic ─────────────────────────────────────────────────────────────
    if (effect === 'magnetic') {
      let current: HTMLElement | null = null
      const onMove = (e: MouseEvent) => {
        const target = (e.target as Element).closest<HTMLElement>('a.group, [data-magnetic]')
        if (current && current !== target) {
          current.style.transform = ''
          current.style.transition = 'transform 0.35s ease-out'
        }
        if (target) {
          const r = target.getBoundingClientRect()
          const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.08, -8, 8)
          const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.15, -5, 5)
          target.style.transform = `translate(${dx}px, ${dy}px)`
          target.style.transition = 'transform 0.15s ease-out'
        }
        current = target
      }
      const onLeave = () => {
        if (current) { current.style.transform = ''; current.style.transition = 'transform 0.35s ease-out' }
        current = null
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseleave', onLeave)
      return () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseleave', onLeave)
        if (current) { current.style.transform = ''; current.style.transition = '' }
      }
    }

    // ── Custom Cursor ─────────────────────────────────────────────────────────
    if (effect === 'cursor') {
      document.body.style.cursor = 'none'
      const dot = document.createElement('div')
      dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:6px;height:6px;border-radius:50%;background:var(--primary);transform:translate(-50%,-50%);'
      const ring = document.createElement('div')
      ring.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--primary);transform:translate(-50%,-50%);opacity:0.5;'
      document.body.appendChild(dot)
      document.body.appendChild(ring)
      let rx = -999, ry = -999, mx = -999, my = -999
      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY
        dot.style.left = `${mx}px`; dot.style.top = `${my}px`
      }
      let raf: number
      const tick = () => {
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
        ring.style.left = `${rx}px`; ring.style.top = `${ry}px`
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      window.addEventListener('mousemove', onMove)
      return () => {
        window.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(raf)
        document.body.style.cursor = ''
        dot.remove(); ring.remove()
      }
    }

    // ── Parallax ──────────────────────────────────────────────────────────────
    if (effect === 'parallax') {
      const handle = (e: MouseEvent) => {
        const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth
        const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
          const s = parseFloat(el.dataset.parallaxStrength ?? '8')
          el.style.transform = `translate(${dx * s}px, ${dy * s}px)`
          el.style.transition = 'transform 0.1s ease-out'
        })
      }
      window.addEventListener('mousemove', handle)
      return () => {
        window.removeEventListener('mousemove', handle)
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
          el.style.transform = ''; el.style.transition = ''
        })
      }
    }
  }, [effect, resolvedTheme])

  return null
}
