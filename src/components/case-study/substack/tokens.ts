// Shared design tokens and build-time switches for the Substack case study deck.
//
// Before Nick presents live: flip REVIEW_TOOLS to false and deploy — review chips, guardrails,
// and presenter notes all disappear.
export const REVIEW_TOOLS = true

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
