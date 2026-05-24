'use client'

import { useState } from 'react'
import type { TripData } from '@/data/trips/japan-2026'
import DayCard from '../shared/DayCard'
import TravelCard from '../shared/TravelCard'

const CITY_COLORS: Record<string, string> = {
  tokyo:     'from-indigo-700 to-indigo-900',
  hakone:    'from-teal-600 to-teal-800',
  kyoto:     'from-red-700 to-red-900',
  hiroshima: 'from-stone-600 to-stone-800',
  transit:   'from-gray-500 to-gray-700',
}

const CITY_LABELS: Record<string, { label: string; dates: string; nights?: string }> = {
  'transit-out':   { label: 'Outbound Flight',   dates: 'Sun Apr 19 → Mon Apr 20' },
  'tokyo-1':       { label: 'Tokyo',              dates: 'Mon Apr 20 – Thu Apr 23', nights: '3 nights · Andaz Tokyo Toranomon Hills' },
  'hakone':        { label: 'Hakone',             dates: 'Thu Apr 23 – Fri Apr 24', nights: '1 night' },
  'kyoto':         { label: 'Kyoto',              dates: 'Fri Apr 24 – Tue Apr 28', nights: '4 nights · Good Nature Hotel, Shijo-Kawaramachi' },
  'hiroshima':     { label: 'Hiroshima',          dates: 'Tue Apr 28 – Wed Apr 29', nights: '1 night' },
  'tokyo-2':       { label: 'Tokyo — Return',     dates: 'Wed Apr 29 – Thu Apr 30', nights: '1 night' },
  'transit-home':  { label: 'Return Flight',      dates: 'Thu Apr 30 → Thu Apr 30' },
}

// Maps card IDs to their section header key
const SECTION_HEADERS: Record<string, string> = {
  c01: 'transit-out',
  c02: 'tokyo-1',
  c06: 'hakone',
  c08: 'kyoto',
  c12: 'hiroshima',
  c14: 'tokyo-2',
  c16: 'transit-home',
}

export default function FullItineraryView({ data }: { data: TripData }) {
  const [alertOpen, setAlertOpen] = useState(true)

  // Build a flat render list: section headers, travel cards, day cards
  const renderItems: { type: 'header' | 'card' | 'travel'; id: string }[] = []

  data.cards.forEach(card => {
    if (SECTION_HEADERS[card.id]) {
      renderItems.push({ type: 'header', id: SECTION_HEADERS[card.id] })
    }
    renderItems.push({ type: 'card', id: card.id })
    const travel = data.travelSegments.find(t => t.afterCardId === card.id)
    if (travel) {
      renderItems.push({ type: 'travel', id: travel.id })
    }
  })

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {/* Pre-trip alert */}
      {alertOpen && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div className="font-bold text-red-800 text-sm">⚠️ Act Before You Leave</div>
            <button onClick={() => setAlertOpen(false)} className="text-red-400 hover:text-red-700 text-lg leading-none ml-2">×</button>
          </div>
          <div className="space-y-1.5 text-xs text-red-900">
            {data.preTripItems.map((item, i) => (
              <div key={i}>
                {item.type === 'reserve' ? '📌' : '💡'}{' '}
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Omakase note */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4">
        <div className="font-bold text-amber-900 mb-2">🍣 Omakase — Recommendation</div>
        <div className="space-y-2 text-xs text-amber-900 leading-relaxed">
          {data.omakaseNote.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Main itinerary */}
      {renderItems.map(item => {
        if (item.type === 'header') {
          const section = CITY_LABELS[item.id]
          const colorKey = item.id.startsWith('tokyo') ? 'tokyo' : item.id.startsWith('transit') ? 'transit' : item.id
          return (
            <div key={item.id} className={`bg-gradient-to-r ${CITY_COLORS[colorKey] ?? CITY_COLORS.transit} text-white rounded-xl px-5 py-4 mb-3 mt-5`}>
              <h2 className="text-lg font-bold tracking-wide">{section.label}</h2>
              <div className="text-xs opacity-75 mt-0.5">
                {section.dates}{section.nights ? ` · ${section.nights}` : ''}
              </div>
            </div>
          )
        }
        if (item.type === 'card') {
          const card = data.cards.find(c => c.id === item.id)!
          return <DayCard key={card.id} card={card} />
        }
        if (item.type === 'travel') {
          const segment = data.travelSegments.find(t => t.id === item.id)!
          return <TravelCard key={segment.id} segment={segment} />
        }
        return null
      })}

      {/* Overall assessment */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-2">
        <div className="font-bold text-emerald-800 mb-2">📋 Overall Assessment</div>
        <div className="space-y-2 text-xs text-emerald-900 leading-relaxed">
          {data.overallAssessment.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
