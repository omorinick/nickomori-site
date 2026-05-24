'use client'

import { useState } from 'react'
import type { TripData } from '@/data/trips/japan-2026'
import { useTripState } from './hooks/useTripState'
import FullItineraryView from './views/FullItineraryView'
import TodayView from './views/TodayView'
import MorningBriefingView from './views/MorningBriefingView'
import EveningCheckInView from './views/EveningCheckInView'

type Tab = 'itinerary' | 'today' | 'morning' | 'evening'

const TABS: { id: Tab; label: string }[] = [
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'today',     label: 'Today' },
  { id: 'morning',   label: 'Morning' },
  { id: 'evening',   label: 'Evening' },
]

export default function TripClient({ data }: { data: TripData }) {
  const [tab, setTab] = useState<Tab>('itinerary')
  const { state, setActiveCard, toggleActivity, saveDayLog, advanceToCard, resetState } = useTripState(data.id)

  if (!state) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm text-neutral-400">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-neutral-900 text-sm">{data.tripName}</div>
              <div className="text-xs text-neutral-400">{data.dateRange}</div>
            </div>
            <button
              onClick={() => {
                if (confirm('Reset all trip state? This clears completed activities and day logs.')) {
                  resetState()
                }
              }}
              className="text-xs text-neutral-300 hover:text-neutral-500 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0 -mb-px">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View */}
      <div className="px-4 pt-5">
        {tab === 'itinerary' && (
          <FullItineraryView data={data} />
        )}
        {tab === 'today' && (
          <TodayView
            data={data}
            state={state}
            onToggle={toggleActivity}
            setActiveCard={setActiveCard}
            onGoMorning={() => setTab('morning')}
            onGoEvening={() => setTab('evening')}
          />
        )}
        {tab === 'morning' && (
          <MorningBriefingView
            data={data}
            state={state}
            onSaveLog={saveDayLog}
          />
        )}
        {tab === 'evening' && (
          <EveningCheckInView
            data={data}
            state={state}
            onSaveLog={saveDayLog}
            onAdvance={advanceToCard}
            onGoToday={() => setTab('today')}
          />
        )}
      </div>
    </div>
  )
}
