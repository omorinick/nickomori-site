export interface HappyPathStep {
  step: number
  actor: string
  action: string
}

export type Dimension = 'Desirability' | 'Feasibility' | 'Usability' | 'Viability' | 'Ethical/Legal'

export const DIMENSIONS: Dimension[] = ['Desirability', 'Feasibility', 'Usability', 'Viability', 'Ethical/Legal']

export const DIMENSION_COLORS: Record<Dimension, { dot: string; bg: string; border: string; text: string }> = {
  Desirability: { dot: '#6366f1', bg: 'bg-indigo-900/50', border: 'border-indigo-700', text: 'text-indigo-200' },
  Feasibility: { dot: '#a855f7', bg: 'bg-purple-900/50', border: 'border-purple-700', text: 'text-purple-200' },
  Usability: { dot: '#10b981', bg: 'bg-emerald-900/50', border: 'border-emerald-700', text: 'text-emerald-200' },
  Viability: { dot: '#f59e0b', bg: 'bg-amber-900/50', border: 'border-amber-700', text: 'text-amber-200' },
  'Ethical/Legal': { dot: '#ef4444', bg: 'bg-rose-900/50', border: 'border-rose-700', text: 'text-rose-200' },
}

export interface Assumption {
  id: string
  dimension: Dimension
  text: string
  label: string
  importance: number
  confidence: number
}
