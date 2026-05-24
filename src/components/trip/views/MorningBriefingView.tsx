'use client'

import { useState } from 'react'
import type { TripData } from '@/data/trips/japan-2026'
import type { TripState, DayLog } from '../hooks/useTripState'

interface Props {
  data: TripData
  state: TripState
  onSaveLog: (cardId: string, log: Partial<DayLog>) => void
}

type Step = 'form' | 'loading' | 'briefing'

export default function MorningBriefingView({ data, state, onSaveLog }: Props) {
  const activeCard = data.cards.find(c => c.id === state.activeCardId)
  const existingLog = state.activeCardId ? (state.dayLogs[state.activeCardId] ?? {}) : {}

  const [wakeTime, setWakeTime] = useState(existingLog.wakeTime ?? '')
  const [weather, setWeather] = useState(existingLog.weather ?? '')
  const [mood, setMood] = useState<DayLog['mood']>(existingLog.mood ?? 'medium')
  const [foodPrefs, setFoodPrefs] = useState(existingLog.foodPrefs ?? '')
  const [notes, setNotes] = useState(existingLog.notes ?? '')
  const [step, setStep] = useState<Step>('form')
  const [briefing, setBriefing] = useState('')
  const [error, setError] = useState('')

  if (!activeCard) {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="rounded-xl border border-neutral-200 p-6 text-center">
          <p className="text-sm text-neutral-500">Select a day in the Today tab first.</p>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!activeCard || !state.activeCardId) return

    const log: Partial<DayLog> = { wakeTime, weather, mood, foodPrefs, notes }
    onSaveLog(state.activeCardId, log)

    setStep('loading')
    setError('')

    try {
      const res = await fetch('/api/trip/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card: activeCard,
          completedActivityIds: state.completedActivityIds,
          context: { ...log, wakeTime },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'API error')
      }

      const data = await res.json()
      setBriefing(data.briefing)
      setStep('briefing')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('form')
    }
  }

  if (step === 'loading') {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="rounded-xl border border-neutral-200 p-8 text-center">
          <div className="text-2xl mb-3">⏳</div>
          <p className="text-sm font-medium text-neutral-800">Generating your briefing…</p>
          <p className="text-xs text-neutral-400 mt-1">Usually takes 5–10 seconds</p>
        </div>
      </div>
    )
  }

  if (step === 'briefing') {
    return (
      <div className="max-w-2xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-neutral-400">Morning briefing</div>
            <div className="font-semibold text-neutral-900 text-sm">{activeCard.date} · {activeCard.title}</div>
          </div>
          <button
            onClick={() => setStep('form')}
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Edit context →
          </button>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <BriefingMarkdown text={briefing} />
        </div>
        <button
          onClick={() => { setStep('form'); setBriefing('') }}
          className="mt-3 w-full py-2.5 rounded-lg border border-neutral-200 text-neutral-600 text-sm hover:border-neutral-400 transition-colors"
        >
          Regenerate
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="mb-4">
        <div className="text-xs text-neutral-400">Morning briefing</div>
        <div className="font-semibold text-neutral-900 text-sm">{activeCard.date} · {activeCard.title}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <div className="divide-y divide-neutral-100">
            <FormRow label="Wake time">
              <input
                type="text"
                value={wakeTime}
                onChange={e => setWakeTime(e.target.value)}
                placeholder="e.g. 7:30 AM"
                className="w-full text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
              />
            </FormRow>

            <FormRow label="Weather">
              <input
                type="text"
                value={weather}
                onChange={e => setWeather(e.target.value)}
                placeholder="e.g. Sunny, 18°C"
                className="w-full text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
              />
            </FormRow>

            <FormRow label="Energy">
              <div className="flex gap-2">
                {(['energized', 'medium', 'tired'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      mood === m
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </FormRow>

            <FormRow label="Food today">
              <input
                type="text"
                value={foodPrefs}
                onChange={e => setFoodPrefs(e.target.value)}
                placeholder="e.g. ramen, avoid seafood"
                className="w-full text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
              />
            </FormRow>

            <FormRow label="Notes">
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Anything else relevant"
                className="w-full text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
              />
            </FormRow>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 px-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get briefing →
        </button>
      </form>
    </div>
  )
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <span className="text-xs text-neutral-400 w-20 shrink-0">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function BriefingMarkdown({ text }: { text: string }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-sm font-bold text-neutral-900 mt-5 mb-2 first:mt-0">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xs font-semibold text-neutral-700 mt-3 mb-1">{line.slice(4)}</h3>)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={key++} className="text-sm font-semibold text-neutral-800 mt-3 mb-1">{line.slice(2, -2)}</p>)
    } else if (line.match(/^\d+\.\s/)) {
      elements.push(<p key={key++} className="text-sm text-neutral-700 leading-relaxed pl-4">{line}</p>)
    } else if (line.startsWith('- ')) {
      elements.push(<p key={key++} className="text-sm text-neutral-700 leading-relaxed pl-4 before:content-['·'] before:mr-2 before:text-neutral-400">{line.slice(2)}</p>)
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-1" />)
    } else {
      elements.push(<p key={key++} className="text-sm text-neutral-700 leading-relaxed">{renderInline(line)}</p>)
    }
  }

  return <div>{elements}</div>
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-neutral-900">{part.slice(2, -2)}</strong>
      : part
  )
}
