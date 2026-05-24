import type { TripCard } from '@/data/trips/japan-2026'
import ActivityRow from './ActivityRow'
import CalloutBlock from './CalloutBlock'

interface Props {
  card: TripCard
  completedIds?: Set<string>
  onToggle?: (id: string) => void
}

export default function DayCard({ card, completedIds, onToggle }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-3">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5">
        <div className="font-bold text-gray-800 text-sm">{card.date}</div>
        {card.subtitle && <div className="text-xs text-gray-500 mt-0.5">{card.subtitle}</div>}
      </div>
      <div className="px-4 py-1">
        {card.callouts.filter(c => c.type === 'weather').map((c, i) => (
          <CalloutBlock key={i} callout={c} />
        ))}
        {card.activities.map(activity => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            checked={completedIds?.has(activity.id)}
            onToggle={onToggle}
          />
        ))}
        {card.callouts.filter(c => c.type !== 'weather').map((c, i) => (
          <CalloutBlock key={i} callout={c} />
        ))}
      </div>
    </div>
  )
}
