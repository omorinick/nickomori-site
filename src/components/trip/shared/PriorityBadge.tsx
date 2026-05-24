import type { Priority } from '@/data/trips/japan-2026'

const MAP: Record<Priority, { label: string; cls: string }> = {
  must:  { label: "★ Don't Miss",    cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  plan:  { label: '✓ Solid Plan',    cls: 'bg-sky-100 text-sky-800 border-sky-300' },
  flex:  { label: '~ Flexible',      cls: 'bg-amber-100 text-amber-800 border-amber-300' },
  skip:  { label: '◦ Optional/Skip', cls: 'bg-gray-100 text-gray-500 border-gray-300' },
  fixed: { label: '✈ Fixed',         cls: 'bg-slate-100 text-slate-700 border-slate-300' },
}

export default function PriorityBadge({ type }: { type: Priority }) {
  const { label, cls } = MAP[type]
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border whitespace-nowrap ${cls}`}>
      {label}
    </span>
  )
}
