'use client'

import { useCallback, useEffect, useState } from 'react'
import type { PublicComment } from '@/lib/comments'

const POLL_INTERVAL_MS = 3000

export interface NewCommentInput {
  slideId: string
  xPct: number
  yPct: number
  authorName: string
  ownerToken: string
  text: string
}

export function useCaseStudyComments(slug: string, viewerToken: string) {
  const [comments, setComments] = useState<PublicComment[]>([])

  const fetchComments = useCallback(async () => {
    const res = await fetch(`/api/case-studies/${slug}/comments?token=${encodeURIComponent(viewerToken)}`)
    if (!res.ok) return
    const data = await res.json()
    setComments(data.comments)
  }, [slug, viewerToken])

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
  }, [fetchComments, viewerToken])

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
    async (id: string, text: string, ownerToken: string) => {
      const res = await fetch(`/api/case-studies/${slug}/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, ownerToken }),
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
    async (id: string, ownerToken: string) => {
      const res = await fetch(`/api/case-studies/${slug}/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerToken }),
      })
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id))
      }
      return res.ok
    },
    [slug]
  )

  return { comments, create, update, remove }
}
