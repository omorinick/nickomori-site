'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CommentRecord } from '@/lib/comments'

const POLL_INTERVAL_MS = 3000

export interface NewCommentInput {
  authorName: string
  text: string
  // A root comment needs a position; a reply only needs parentId — the
  // server inherits its root's position.
  slideId?: string
  xPct?: number
  yPct?: number
  parentId?: string
}

export function useCaseStudyComments(slug: string) {
  const [comments, setComments] = useState<CommentRecord[]>([])

  const fetchComments = useCallback(async () => {
    const res = await fetch(`/api/case-studies/${slug}/comments`)
    if (!res.ok) return
    const data = await res.json()
    setComments(data.comments)
  }, [slug])

  useEffect(() => {
    fetchComments()

    let interval: ReturnType<typeof setInterval> | null = null
    const start = () => {
      if (!interval) interval = setInterval(fetchComments, POLL_INTERVAL_MS)
    }
    const stop = () => {
      if (interval) clearInterval(interval)
      interval = null
    }

    start()
    const onVisibility = () => {
      if (document.hidden) {
        stop()
      } else {
        fetchComments()
        start()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [fetchComments])

  const create = useCallback(
    async (input: NewCommentInput) => {
      const res = await fetch(`/api/case-studies/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (res.ok) {
        const data = await res.json()
        setComments((prev) => [...prev, data.comment])
      }
      return res.ok
    },
    [slug]
  )

  const update = useCallback(
    async (id: string, text: string) => {
      const res = await fetch(`/api/case-studies/${slug}/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (res.ok) {
        const data = await res.json()
        setComments((prev) => prev.map((c) => (c.id === id ? data.comment : c)))
      }
      return res.ok
    },
    [slug]
  )

  const remove = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/case-studies/${slug}/comments/${id}`, { method: 'DELETE' })
      if (res.ok) {
        // Mirrors the server's cascade: deleting a root also drops its replies.
        setComments((prev) => prev.filter((c) => c.id !== id && c.parentId !== id))
      }
      return res.ok
    },
    [slug]
  )

  return { comments, create, update, remove }
}
