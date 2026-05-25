import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { TripCard } from '@/data/trips/japan-2026'
import type { DayLog } from '@/components/trip/hooks/useTripState'

interface BriefingRequest {
  card: TripCard
  completedActivityIds: string[]
  context: DayLog & { wakeTime: string }
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const body: BriefingRequest = await request.json()
  const { card, completedActivityIds, context } = body

  const completedNames = card.activities
    .filter(a => completedActivityIds.includes(a.id))
    .map(a => a.name)

  const remainingActivities = card.activities
    .filter(a => !completedActivityIds.includes(a.id))
    .map(a => `[${a.priority.toUpperCase()}] ${a.time ? `${a.time}: ` : ''}${a.name}${a.note ? ` — ${a.note}` : ''}`)

  const calloutText = card.callouts
    .map(c => `[${c.type.toUpperCase()}] ${c.content}`)
    .join('\n')

  const system = `You are a sharp, practical travel day planner for a family trip to Japan.
You know this trip inside out — it's a family with a young child named Dahlia (in a stroller).
Be direct, warm, and genuinely useful. Format your response in clear sections using markdown.
Keep the total response under 600 words. Don't hedge or pad — be concrete.`

  const user = `Today is ${card.date}: ${card.title}

WAKE TIME: ${context.wakeTime}
WEATHER: ${context.weather || 'unknown'}
MOOD/ENERGY: ${context.mood || 'medium'}
FOOD PREFERENCES: ${context.foodPrefs || 'none specified'}
NOTES: ${context.notes || 'none'}

${completedNames.length > 0 ? `ALREADY DONE: ${completedNames.join(', ')}` : 'Nothing done yet today.'}

REMAINING ACTIVITIES:
${remainingActivities.join('\n') || 'No activities remaining.'}

DAY NOTES & CALLOUTS:
${calloutText}

Give me:
1. **Today's Plan** — a realistic timeline from my wake time. Mark must-do items clearly.
2. **If We Fall Behind** — what to cut first (flex/skip), what to protect no matter what.
3. **Food** — specific recommendations for today based on what's available and my preferences.
4. **One Thing to Know** — the most important cultural, logistical, or contextual thing for today.
5. **Prep for Tomorrow** — any booking, reservation, or heads-up needed for the next day.`

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    max_tokens: 800,
  })

  const briefing = completion.choices[0]?.message?.content ?? 'No briefing generated.'
  return NextResponse.json({ briefing })
}
