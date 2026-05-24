import type { Callout } from '@/data/trips/japan-2026'

const MAP = {
  weather: { icon: '🌤️', bg: 'bg-cyan-50',     border: 'border-cyan-200',     text: 'text-cyan-900' },
  tip:     { icon: '💡',  bg: 'bg-sky-50',      border: 'border-sky-200',      text: 'text-sky-900' },
  reserve: { icon: '📌',  bg: 'bg-violet-50',   border: 'border-violet-200',   text: 'text-violet-900' },
  eat:     { icon: '🍜',  bg: 'bg-orange-50',   border: 'border-orange-200',   text: 'text-orange-900' },
  good:    { icon: '✅',  bg: 'bg-emerald-50',  border: 'border-emerald-200',  text: 'text-emerald-900' },
  nap:     { icon: '😴',  bg: 'bg-purple-50',   border: 'border-purple-200',   text: 'text-purple-900' },
  flag:    { icon: '🚩',  bg: 'bg-red-50',      border: 'border-red-200',      text: 'text-red-900' },
}

export default function CalloutBlock({ callout }: { callout: Callout }) {
  const { icon, bg, border, text } = MAP[callout.type]
  return (
    <div className={`flex gap-2 text-xs ${bg} border ${border} rounded-lg px-3 py-2 ${text} mt-1.5 leading-relaxed`}>
      <span className="flex-shrink-0 mt-px">{icon}</span>
      <span>{callout.content}</span>
    </div>
  )
}
