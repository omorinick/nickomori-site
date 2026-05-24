import type { Activity } from '@/data/trips/japan-2026'
import PriorityBadge from './PriorityBadge'

interface Props {
  activity: Activity
  checked?: boolean
  onToggle?: (id: string) => void
}

export default function ActivityRow({ activity, checked = false, onToggle }: Props) {
  const isDimmed = activity.priority === 'skip' || checked

  return (
    <div className="py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-2">
        {onToggle && (
          <button
            onClick={() => onToggle(activity.id)}
            className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-colors ${
              checked
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
          >
            {checked && <span className="text-white text-[10px] leading-none flex items-center justify-center w-full h-full">✓</span>}
          </button>
        )}
        {activity.time && (
          <span className="text-xs text-gray-400 w-[80px] flex-shrink-0 pt-0.5 font-mono">
            {activity.time}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span className={`text-sm font-medium leading-snug transition-opacity ${isDimmed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {activity.name}
            </span>
            <PriorityBadge type={activity.priority} />
          </div>
          {activity.note && (
            <p className={`text-xs mt-0.5 leading-relaxed ${isDimmed ? 'text-gray-400' : 'text-gray-500'}`}>
              {activity.note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
