// Shared design tokens and build-time switches for the Substack case study deck.
//
// Gates the presenter-notes toggle. Flip to false to strip Nick's speaking notes from the build
// entirely — do that before sharing the link with anyone who shouldn't read them.
export const PRESENTER_TOOLS = false

export const ACCENT = '#002991' // PayPal deep blue — text accents on light surfaces
export const FILL = '#0070E0' // PayPal bright blue — bars, dots, buttons
export const ACCENT_DARK = '#8FBCFF' // accent on dark surfaces
export const TINT = '#EAF2FD' // light blue tint backgrounds
export const INK = '#181818'

export const STICKY_TONES = {
  yellow: '#FFF3D6',
  green: '#E7F4E4',
  orange: '#FFE7DA',
  purple: '#EFE9FB',
  blue: '#E3F0FC',
  gray: '#f1efe9',
} as const

export type StickyTone = keyof typeof STICKY_TONES
