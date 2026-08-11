import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRedis } from '@/lib/redis'
import { isKnownCaseStudySlug } from '@/data/case-studies/registry'
import { commentsKey, validateCommentInput, type CommentRecord } from '@/lib/comments'

export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const raw = await getRedis().hgetall<Record<string, CommentRecord>>(commentsKey(slug))
  const comments = Object.values(raw ?? {}).sort((a, b) => a.createdAt.localeCompare(b.createdAt))

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

  const redis = getRedis()
  const now = new Date().toISOString()
  let record: CommentRecord

  if (body.parentId) {
    const parent = await redis.hget<CommentRecord>(commentsKey(slug), body.parentId)
    if (!parent) {
      return NextResponse.json({ error: 'parent comment not found' }, { status: 404 })
    }
    record = {
      id: crypto.randomUUID(),
      slideId: parent.slideId,
      xPct: parent.xPct,
      yPct: parent.yPct,
      authorName: body.authorName,
      text: body.text,
      createdAt: now,
      updatedAt: now,
      parentId: parent.parentId ?? parent.id, // replying to a reply still attaches to the thread's root
    }
  } else {
    record = {
      id: crypto.randomUUID(),
      slideId: body.slideId,
      xPct: body.xPct,
      yPct: body.yPct,
      authorName: body.authorName,
      text: body.text,
      createdAt: now,
      updatedAt: now,
      parentId: null,
    }
  }

  await redis.hset(commentsKey(slug), { [record.id]: record })

  return NextResponse.json({ comment: record }, { status: 201 })
}
