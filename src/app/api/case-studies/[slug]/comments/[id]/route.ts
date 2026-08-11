import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRedis } from '@/lib/redis'
import { isKnownCaseStudySlug } from '@/data/case-studies/registry'
import { commentsKey, validateCommentEdit, type CommentRecord } from '@/lib/comments'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const validationError = validateCommentEdit(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const redis = getRedis()
  const existing = await redis.hget<CommentRecord>(commentsKey(slug), id)
  if (!existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const updated: CommentRecord = {
    ...existing,
    text: body.text,
    updatedAt: new Date().toISOString(),
  }
  await redis.hset(commentsKey(slug), { [id]: updated })

  return NextResponse.json({ comment: updated })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const redis = getRedis()
  const existing = await redis.hget<CommentRecord>(commentsKey(slug), id)
  if (!existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  // Deleting a root also deletes its replies — an orphaned reply with no pin to live under would just be lost.
  if (!existing.parentId) {
    const all = await redis.hgetall<Record<string, CommentRecord>>(commentsKey(slug))
    const replyIds = Object.values(all ?? {})
      .filter((record) => record.parentId === id)
      .map((record) => record.id)
    if (replyIds.length > 0) {
      await redis.hdel(commentsKey(slug), ...replyIds)
    }
  }

  await redis.hdel(commentsKey(slug), id)

  return NextResponse.json({ ok: true })
}
