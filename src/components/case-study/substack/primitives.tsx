'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ACCENT, FILL, INK, STICKY_TONES, type StickyTone } from './tokens'

// Three content layers run through the deck:
//   1. Core states — one claim, one dominant visual, minimal supporting words.
//   2. Evidence drawers (Rib) and recreated artifacts (ArtifactModal) — tables, methodology, caveats.
//   3. Presenter notes (Note) — spoken context; visible only via the Notes toggle.

export const ReviewCtx = createContext(false)
export const NotesCtx = createContext(false)

const FLAG_STYLES = {
  confirmed: { label: 'Confirmed', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  assumption: { label: 'Working assumption', cls: 'bg-amber-50 text-amber-700 border-amber-300' },
  unresolved: { label: 'Unresolved', cls: 'bg-red-50 text-red-700 border-red-300' },
} as const

export type FlagKind = keyof typeof FLAG_STYLES

export function Flag({ kind, note }: { kind: FlagKind; note?: string }) {
  const on = useContext(ReviewCtx)
  if (!on) return null
  const s = FLAG_STYLES[kind]
  return (
    <span
      title={note}
      className={`inline-block align-middle ml-2 px-1.5 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${s.cls}`}
    >
      {s.label}
    </span>
  )
}

export function Guardrail({ children }: { children: React.ReactNode }) {
  const on = useContext(ReviewCtx)
  if (!on) return null
  return (
    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span className="font-bold uppercase tracking-wide text-[11px] mr-2">Do not claim</span>
      {children}
    </div>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  const on = useContext(NotesCtx)
  if (!on) return null
  return (
    <div className="mt-10 rounded-lg border border-dashed border-neutral-300 bg-neutral-50/80 px-4 py-3 text-sm text-neutral-600 max-w-3xl">
      <span className="font-bold uppercase tracking-wide text-[10px] mr-2 text-neutral-400">Presenter note</span>
      {children}
    </div>
  )
}

export function Spine({
  id,
  kicker,
  dark,
  children,
}: {
  id: string
  kicker?: string
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      data-slide-id={id}
      className={`relative min-h-[70vh] flex flex-col justify-center px-6 md:px-20 py-20 ${
        dark ? 'text-white' : 'bg-white'
      }`}
      style={dark ? { background: '#0b0d12' } : { color: INK }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {kicker && (
          <p
            className="font-semibold tracking-[0.18em] uppercase text-xs mb-6"
            style={{ color: dark ? '#8FBCFF' : ACCENT }}
          >
            {kicker}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

// Act openers are the chapter markers of the deck — four of them, evenly spaced, so an interrupting
// panelist can always see where we are and where we're going.
export function ActOpener({ id, num, title }: { id: string; num: string; title: string }) {
  return (
    <section
      id={id}
      data-slide-id={id}
      className="relative min-h-[45vh] flex flex-col justify-center px-6 md:px-20 py-24 scroll-mt-16 text-white"
      style={{ background: '#0b0d12' }}
    >
      <div className="max-w-5xl mx-auto w-full flex items-center gap-8 md:gap-12">
        <span className="font-black text-6xl md:text-8xl leading-none select-none" style={{ color: '#8FBCFF' }}>
          {num}
        </span>
        <div className="h-16 md:h-24 w-px bg-white/15" />
        <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl max-w-2xl">{title}</h2>
      </div>
    </section>
  )
}

// The lessons are the actual spine of this presentation. They get one recurring, unmistakable
// treatment so the room can feel the rhythm even when we get interrupted off the running order.
export function Lesson({
  n,
  id,
  title,
  sub,
  points,
  bridge,
}: {
  n: number
  id: string
  title: string
  sub: string
  points: string[]
  bridge: string
}) {
  return (
    <section
      id={id}
      data-slide-id={id}
      className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-24 scroll-mt-16 text-white"
      style={{ background: `linear-gradient(160deg, #0b0d12 0%, #101a2e 100%)` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-black"
            style={{ background: '#8FBCFF' }}
          >
            {n}
          </span>
          <p className="font-semibold tracking-[0.22em] uppercase text-xs" style={{ color: '#8FBCFF' }}>
            Lesson {n}
          </p>
        </div>
        <h2 className="font-black tracking-tight text-3xl md:text-6xl max-w-4xl leading-[1.05]">{title}</h2>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl">{sub}</p>
        <ul className="mt-12 space-y-4 max-w-3xl">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-4 text-base md:text-lg text-neutral-200">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#8FBCFF' }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div
          className="mt-12 rounded-2xl p-6 md:p-7 max-w-3xl"
          style={{ background: 'rgba(143,188,255,0.08)', border: '1px solid rgba(143,188,255,0.25)' }}
        >
          <p className="font-bold uppercase tracking-wide text-[11px] mb-2.5" style={{ color: '#8FBCFF' }}>
            Why I think this is useful to you
          </p>
          <p className="text-lg md:text-xl font-bold leading-snug">{bridge}</p>
        </div>
      </div>
    </section>
  )
}

// Misses are distributed through the acts rather than collected at the end — candour at the moment
// of the decision reads very differently from candour in a closing disclosure slide.
export function Miss({
  headline,
  detail,
  resolution,
}: {
  headline: string
  detail: string
  resolution: string
}) {
  return (
    <div className="mt-12 rounded-2xl border-2 overflow-hidden max-w-3xl" style={{ borderColor: '#E8A33D' }}>
      <p
        className="px-6 py-2.5 font-bold uppercase tracking-widest text-[11px]"
        style={{ background: '#FFF8EC', color: '#8a5a12' }}
      >
        What we got wrong
      </p>
      <div className="px-6 py-5 bg-white">
        <p className="font-black text-lg md:text-xl leading-snug" style={{ color: INK }}>
          {headline}
        </p>
        <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">{detail}</p>
        <p className="mt-4 pt-4 border-t border-neutral-200 text-sm md:text-base text-neutral-700 leading-relaxed">
          {resolution}
        </p>
      </div>
    </div>
  )
}

export function Rib({ branch, title, children }: { branch: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-10 rounded-xl border border-neutral-200 overflow-hidden" style={{ borderLeft: `4px solid ${FILL}` }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Evidence · {branch}
          </span>
          <span className="font-bold text-base" style={{ color: INK }}>
            {title}
          </span>
        </span>
        <span className="text-xl font-light shrink-0" style={{ color: FILL }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <div className="px-5 py-6 bg-white text-sm leading-relaxed text-neutral-700">{children}</div>}
    </div>
  )
}

export function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, seen }
}

export function Sticky({
  children,
  tone = 'yellow',
  tilt = -0.6,
  highlight,
  className = '',
}: {
  children: React.ReactNode
  tone?: StickyTone
  tilt?: number
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-sm px-3.5 py-3 text-[13px] leading-snug shadow-[0_2px_6px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        background: STICKY_TONES[tone],
        transform: `rotate(${tilt}deg)`,
        border: highlight ? `1.5px solid ${FILL}` : '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {children}
    </div>
  )
}

// Recreated working artifacts open in a modal. All are sanitized recreations — no original images,
// dates, or colleague names.
export function ArtifactModal({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-dashed px-5 py-3.5 text-left bg-white/60 hover:bg-white transition-colors"
        style={{ borderColor: '#a9c4e8' }}
      >
        <span className="text-2xl" aria-hidden>
          🗂️
        </span>
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Recreated artifact · click for the detailed view
          </span>
          <span className="font-bold text-sm" style={{ color: ACCENT }}>
            {label}
          </span>
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] bg-black/70 overflow-y-auto" onClick={() => setOpen(false)}>
          <div className="min-h-full flex items-start justify-center p-4 md:p-8">
            <div
              className="bg-white rounded-2xl max-w-6xl w-full p-6 md:p-10 relative text-left shadow-2xl"
              style={{ color: INK }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6 mb-2">
                <h4 className="font-black text-xl md:text-2xl">{title}</h4>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 w-9 h-9 rounded-full border border-neutral-300 font-bold hover:bg-neutral-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 mb-6 max-w-2xl">
                Sanitized recreation of the original working artifact — labels and groupings simplified for
                confidentiality and presentation clarity.
              </p>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
