'use client'

import { useState, useEffect, useCallback } from 'react'

export interface DayLog {
  wakeTime?: string
  weather?: string
  mood?: 'energized' | 'medium' | 'tired'
  foodPrefs?: string
  notes?: string
  eveningNotes?: string
  eveningRating?: 1 | 2 | 3 | 4 | 5
}

export interface TripState {
  version: 1
  activeCardId: string | null
  completedActivityIds: string[]
  dayLogs: Record<string, DayLog>
  lastUpdated: string
}

const DEFAULT_STATE: TripState = {
  version: 1,
  activeCardId: null,
  completedActivityIds: [],
  dayLogs: {},
  lastUpdated: new Date().toISOString(),
}

function getKey(tripId: string) {
  return `trip-state-${tripId}`
}

export function useTripState(tripId: string) {
  const [state, setState] = useState<TripState | null>(null)

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = localStorage.getItem(getKey(tripId))
    setState(stored ? JSON.parse(stored) : DEFAULT_STATE)
  }, [tripId])

  const save = useCallback((next: TripState) => {
    const updated = { ...next, lastUpdated: new Date().toISOString() }
    localStorage.setItem(getKey(tripId), JSON.stringify(updated))
    setState(updated)
  }, [tripId])

  const setActiveCard = useCallback((cardId: string) => {
    setState(prev => {
      if (!prev) return prev
      const next = { ...prev, activeCardId: cardId }
      localStorage.setItem(getKey(tripId), JSON.stringify({ ...next, lastUpdated: new Date().toISOString() }))
      return next
    })
  }, [tripId])

  const toggleActivity = useCallback((activityId: string) => {
    setState(prev => {
      if (!prev) return prev
      const ids = prev.completedActivityIds
      const next: TripState = {
        ...prev,
        completedActivityIds: ids.includes(activityId)
          ? ids.filter(id => id !== activityId)
          : [...ids, activityId],
      }
      localStorage.setItem(getKey(tripId), JSON.stringify({ ...next, lastUpdated: new Date().toISOString() }))
      return next
    })
  }, [tripId])

  const saveDayLog = useCallback((cardId: string, log: Partial<DayLog>) => {
    setState(prev => {
      if (!prev) return prev
      const next: TripState = {
        ...prev,
        dayLogs: {
          ...prev.dayLogs,
          [cardId]: { ...prev.dayLogs[cardId], ...log },
        },
      }
      localStorage.setItem(getKey(tripId), JSON.stringify({ ...next, lastUpdated: new Date().toISOString() }))
      return next
    })
  }, [tripId])

  const advanceToCard = useCallback((nextCardId: string) => {
    setState(prev => {
      if (!prev) return prev
      const next: TripState = { ...prev, activeCardId: nextCardId }
      localStorage.setItem(getKey(tripId), JSON.stringify({ ...next, lastUpdated: new Date().toISOString() }))
      return next
    })
  }, [tripId])

  const resetState = useCallback(() => {
    localStorage.removeItem(getKey(tripId))
    setState(DEFAULT_STATE)
  }, [tripId])

  return { state, setActiveCard, toggleActivity, saveDayLog, advanceToCard, resetState }
}
