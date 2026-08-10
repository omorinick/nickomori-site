import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRedis } from '@/lib/redis'
import { isKnownCaseStudySlug } from '@/data/case-studies/registry'
import {
  commentsKey,
  toPublicComment,
  validateCommentInput,
  type CommentRecord,
} from '@/lib/comments'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const viewerToken = request.nextUrl.searchParams.get('token') ?? ''
  const raw = await getRedis().hgetall<Record<string, CommentRecord>>(commentsKey(slug))
  const comments = Object.values(raw ?? {})
    .map((record) => toPublicComment(record, viewerToken))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  return NextResponse.json({ comments })
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const validationError = validateCommentInput(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const now = new Date().toISOString()
  const record: CommentRecord = {
    id: crypto.randomUUID(),
    slideId: body.slideId,
    xPct: body.xPct,
    yPct: body.yPct,
    authorName: body.authorName,
    ownerToken: body.ownerToken,
    text: body.text,
    createdAt: now,
    updatedAt: now,
  }

  await getRedis().hset(commentsKey(slug), { [record.id]: record })

  return NextResponse.json({ comment: toPublicComment(record, body.ownerToken) }, { status: 201 })
}
