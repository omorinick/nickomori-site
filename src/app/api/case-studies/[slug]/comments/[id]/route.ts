import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRedis } from '@/lib/redis'
import { isKnownCaseStudySlug } from '@/data/case-studies/registry'
import { commentsKey, toPublicComment, validateCommentEdit, type CommentRecord } from '@/lib/comments'

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
  if (existing.ownerToken !== body.ownerToken) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const updated: CommentRecord = {
    ...existing,
    text: body.text,
    updatedAt: new Date().toISOString(),
  }
  await redis.hset(commentsKey(slug), { [id]: updated })

  return NextResponse.json({ comment: toPublicComment(updated, body.ownerToken) })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params
  if (!isKnownCaseStudySlug(slug)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body.ownerToken !== 'string' || body.ownerToken.length === 0) {
    return NextResponse.json({ error: 'ownerToken is required' }, { status: 400 })
  }

  const redis = getRedis()
  const existing = await redis.hget<CommentRecord>(commentsKey(slug), id)
  if (!existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  if (existing.ownerToken !== body.ownerToken) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  await redis.hdel(commentsKey(slug), id)

  return NextResponse.json({ ok: true })
}
