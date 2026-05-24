'use client'

import type { TripData } from '@/data/trips/japan-2026'
import type { TripState } from '../hooks/useTripState'
import DayCard from '../shared/DayCard'

interface Props {
  data: TripData
  state: TripState
  onToggle: (id: string) => void
  setActiveCard: (id: string) => void
  onGoMorning: () => void
  onGoEvening: () => void
}

export default function TodayView({ data, state, onToggle, setActiveCard, onGoMorning, onGoEvening }: Props) {
  const activeCard = data.cards.find(c => c.id === state.activeCardId)
  const completedIds = new Set(state.completedActivityIds)

  const nonSkipActivities = activeCard?.activities.filter(a => a.priority !== 'skip') ?? []
  const completedCount = nonSkipActivities.filter(a => completedIds.has(a.id)).length
  const progressPct = nonSkipActivities.length > 0
    ? Math.round((completedCount / nonSkipActivities.length) * 100)
    : 0

  if (!state.activeCardId) {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="rounded-xl border border-neutral-200 p-6 text-center">
          <p className="text-sm font-medium text-neutral-800 mb-1">Which day are you on?</p>
          <p className="text-xs text-neutral-400 mb-4">Select a day to start tracking progress.</p>
          <div className="grid grid-cols-2 gap-2">
            {data.cards.filter(c => c.city !== 'transit').map(card => (
              <button
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className="text-left text-xs px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-400 transition-colors"
              >
                <div className="font-medium text-neutral-800 truncate">{card.date}</div>
                <div className="text-neutral-400 truncate">{card.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {/* Day selector */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-xs text-neutral-400">Current day:</label>
        <select
          value={state.activeCardId}
          onChange={e => setActiveCard(e.target.value)}
          className="text-xs border border-neutral-200 rounded-lg px-2 py-1 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
        >
          {data.cards.map(card => (
            <option key={card.id} value={card.id}>{card.date} — {card.title}</option>
          ))}
        </select>
      </div>

      {/* Progress bar */}
      {nonSkipActivities.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>{completedCount} of {nonSkipActivities.length} activities done</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Day card with checkboxes */}
      {activeCard && (
        <DayCard
          card={activeCard}
          completedIds={completedIds}
          onToggle={onToggle}
        />
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onGoMorning}
          className="flex-1 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Morning briefing →
        </button>
        <button
          onClick={onGoEvening}
          className="flex-1 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:border-neutral-400 transition-colors"
        >
          End of day check-in
        </button>
      </div>
    </div>
  )
}
