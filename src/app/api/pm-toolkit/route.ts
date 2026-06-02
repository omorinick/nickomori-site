import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const FREE_USE_LIMIT = 2
const DEMO_COOKIE = 'demo-auth'
const USES_COOKIE = 'demo-uses'

function checkAccess(request: NextRequest, providedPassword?: string) {
  const authCookie = request.cookies.get(DEMO_COOKIE)
  const isAuthed = authCookie?.value === process.env.DEMO_PASSWORD && !!process.env.DEMO_PASSWORD

  if (isAuthed) return { allowed: true, authedByPassword: false, freeUsesRemaining: null }

  if (providedPassword) {
    if (!process.env.DEMO_PASSWORD || providedPassword !== process.env.DEMO_PASSWORD) {
      return { allowed: false, error: 'invalid_password' as const }
    }
    return { allowed: true, authedByPassword: true, freeUsesRemaining: null }
  }

  const uses = parseInt(request.cookies.get(USES_COOKIE)?.value ?? '0', 10)
  if (uses < FREE_USE_LIMIT) {
    return { allowed: true, authedByPassword: false, freeUsesRemaining: FREE_USE_LIMIT - uses - 1, currentUses: uses }
  }

  return { allowed: false, error: 'demo_limit_reached' as const }
}

function applyCookies(
  response: NextResponse,
  access: ReturnType<typeof checkAccess>,
  currentUses?: number
) {
  if (!access.allowed) return

  if (access.authedByPassword && process.env.DEMO_PASSWORD) {
    response.cookies.set(DEMO_COOKIE, process.env.DEMO_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  } else if (access.freeUsesRemaining !== null && currentUses !== undefined) {
    response.cookies.set(USES_COOKIE, String(currentUses + 1), {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })
  }
}

const HAPPY_PATH_SYSTEM = `You are a senior product manager trained in Teresa Torres' Continuous Discovery Habits.

Given a product feature idea, generate the happy path — the ideal, uninterrupted user journey assuming everything works as intended.

Return ONLY valid JSON in this exact structure:
{
  "steps": [
    { "step": 1, "actor": "User", "action": "Opens the app and navigates to the filters panel" },
    { "step": 2, "actor": "Platform", "action": "Loads the filter panel with previously saved filters" }
  ]
}

Actor options: "User", "Platform", "Other User", "Third-Party Service", "Admin"
Generate 6–10 steps. Start with the user initiating, end with the goal achieved.
Each action should be concrete and specific. Focus on meaningful moments, not micro-interactions.`

const ASSUMPTIONS_SYSTEM = `You are a senior product manager trained in Teresa Torres' Continuous Discovery Habits and the Stanford d.school design thinking framework.

Given a product feature's happy path, generate a comprehensive assumption map across 5 dimensions.

Return ONLY valid JSON in this exact structure:
{
  "assumptions": [
    {
      "id": "d1",
      "dimension": "Desirability",
      "text": "Users will find the filter-sharing feature valuable enough to actively share filters with teammates",
      "label": "Filter sharing feels valuable",
      "importance": 8,
      "confidence": 3
    }
  ]
}

Generate assumptions across ALL 5 dimensions:
- "Desirability": Users want this. They'll use it. It solves a real pain. Fits their workflow. → Generate 8–10
- "Feasibility": We can build it. We have the technical capability, APIs, data, infrastructure. → Generate 6–8
- "Usability": Users can figure it out without instruction. The UX is intuitive. → Generate 6–8
- "Viability": Business makes sense. Revenue, retention, growth, cost, competitive impact. → Generate 4–6
- "Ethical/Legal": Privacy, compliance, regulatory, or ethical concerns. → Generate 3–5

Rules:
- Be concrete and direct. Obvious assumptions are valuable and intentional — they kickstart thinking.
- Each assumption must be falsifiable (you could imagine testing it)
- "label" must be 4–6 words max, suitable for a sticky note in FigJam
- IDs: d1–d10 for Desirability, f1–f8 for Feasibility, u1–u8 for Usability, v1–v6 for Viability, e1–e5 for Ethical/Legal
- "importance" (1–10): How critical is this assumption to the feature's success? Spread across the range.
- "confidence" (1–10): How confident are we this is TRUE, before any research? Low = we don't know yet. High = already confident. Spread across the range.
- Ensure some assumptions have high importance AND low confidence — those are the critical ones to validate first.`

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  const body = await request.json()
  const { action, demoPassword } = body as { action: string; demoPassword?: string }

  const access = checkAccess(request, demoPassword)

  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.error === 'invalid_password' ? 403 : 401 })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    if (action === 'generate-happy-path') {
      const { input } = body as { input: string }
      if (!input || input.trim().length < 10) {
        return NextResponse.json({ error: 'input_too_short' }, { status: 400 })
      }

      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: HAPPY_PATH_SYSTEM },
          { role: 'user', content: `Feature idea: ${input.trim()}` },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      })

      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}')
      const response = NextResponse.json({ steps: parsed.steps ?? [] })
      applyCookies(response, access, 'currentUses' in access ? (access as { currentUses: number }).currentUses : undefined)
      return response

    } else if (action === 'generate-assumptions') {
      const { happyPath } = body as { happyPath: string }
      if (!happyPath || happyPath.trim().length < 20) {
        return NextResponse.json({ error: 'input_too_short' }, { status: 400 })
      }

      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: ASSUMPTIONS_SYSTEM },
          { role: 'user', content: `Happy path:\n${happyPath.trim()}` },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      })

      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}')
      const response = NextResponse.json({ assumptions: parsed.assumptions ?? [] })
      applyCookies(response, access, 'currentUses' in access ? (access as { currentUses: number }).currentUses : undefined)
      return response

    } else {
      return NextResponse.json({ error: 'unknown_action' }, { status: 400 })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : ''
    if (message.includes('429') || message.toLowerCase().includes('quota')) {
      return NextResponse.json({ error: 'quota_exceeded' }, { status: 429 })
    }
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
