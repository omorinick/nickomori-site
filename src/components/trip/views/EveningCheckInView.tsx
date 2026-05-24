'use client'

import { useState } from 'react'
import type { TripData } from '@/data/trips/japan-2026'
import type { TripState, DayLog } from '../hooks/useTripState'

interface Props {
  data: TripData
  state: TripState
  onSaveLog: (cardId: string, log: Partial<DayLog>) => void
  onAdvance: (nextCardId: string) => void
  onGoToday: () => void
}

export default function EveningCheckInView({ data, state, onSaveLog, onAdvance, onGoToday }: Props) {
  const activeCard = data.cards.find(c => c.id === state.activeCardId)
  const existingLog = state.activeCardId ? (state.dayLogs[state.activeCardId] ?? {}) : {}

  const [notes, setNotes] = useState(existingLog.eveningNotes ?? '')
  const [rating, setRating] = useState<DayLog['eveningRating']>(existingLog.eveningRating)
  const [saved, setSaved] = useState(false)

  const nonTransitCards = data.cards.filter(c => c.city !== 'transit')
  const currentIndex = nonTransitCards.findIndex(c => c.id === state.activeCardId)
  const nextCard = currentIndex >= 0 && currentIndex < nonTransitCards.length - 1
    ? nonTransitCards[currentIndex + 1]
    : null

  if (!activeCard) {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="rounded-xl border border-neutral-200 p-6 text-center">
          <p className="text-sm text-neutral-500">Select a day in the Today tab first.</p>
        </div>
      </div>
    )
  }

  const completedCount = activeCard.activities
    .filter(a => a.priority !== 'skip' && state.completedActivityIds.includes(a.id))
    .length
  const totalCount = activeCard.activities.filter(a => a.priority !== 'skip').length

  function handleSave() {
    if (!state.activeCardId) return
    onSaveLog(state.activeCardId, {
      eveningNotes: notes,
      eveningRating: rating,
    })
    setSaved(true)
  }

  function handleAdvance() {
    if (nextCard) {
      onAdvance(nextCard.id)
      onGoToday()
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="mb-4">
        <div className="text-xs text-neutral-400">End of day</div>
        <div className="font-semibold text-neutral-900 text-sm">{activeCard.date} · {activeCard.title}</div>
      </div>

      {/* Day summary */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 mb-3">
        <div className="text-xs font-medium text-neutral-500 mb-3">Day summary</div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{completedCount}</div>
            <div className="text-xs text-neutral-400 mt-0.5">of {totalCount} done</div>
          </div>
          <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%` }}
            />
          </div>
          <div className="text-sm font-medium text-neutral-700">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Check-in form */}
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden mb-3">
        <div className="divide-y divide-neutral-100">
          <div className="px-4 py-3">
            <div className="text-xs text-neutral-400 mb-2">How was the day?</div>
            <div className="flex gap-1">
              {([1, 2, 3, 4, 5] as const).map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(prev => prev === star ? undefined : star)}
                  className={`text-xl transition-opacity ${
                    rating !== undefined && star <= rating ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-xs text-neutral-400 mb-2">Notes</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Highlights, regrets, things to remember…"
              rows={4}
              className="w-full text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleSave}
          disabled={saved}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-neutral-900 text-white hover:opacity-90'
          }`}
        >
          {saved ? '✓ Saved' : 'Save check-in'}
        </button>

        {nextCard && (
          <button
            onClick={handleAdvance}
            className="w-full py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:border-neutral-400 transition-colors"
          >
            Advance to {nextCard.date} →
          </button>
        )}
      </div>
    </div>
  )
}
