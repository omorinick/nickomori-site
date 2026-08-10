'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCirclePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCaseStudyComments } from '@/hooks/useCaseStudyComments'
import { getStoredIdentity, storeIdentity, initials, type CommentIdentity } from '@/lib/comment-identity'
import { NameCaptureDialog } from './NameCaptureDialog'
import { CommentPin } from './CommentPin'
import { CommentComposer } from './CommentComposer'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Draft {
  slideId: string
  xPct: number
  yPct: number
}

export function CommentLayer({ slug }: { slug: string }) {
  const [identity, setIdentity] = useState<CommentIdentity | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [commentMode, setCommentMode] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [slideElements, setSlideElements] = useState<Record<string, HTMLElement>>({})

  const { comments, create, update, remove } = useCaseStudyComments(slug, identity?.token ?? '')

  useEffect(() => {
    setIdentity(getStoredIdentity())
    setHydrated(true)
  }, [])

  useEffect(() => {
    const map: Record<string, HTMLElement> = {}
    document.querySelectorAll<HTMLElement>('[data-slide-id]').forEach((el) => {
      const id = el.dataset.slideId
      if (id) map[id] = el
    })
    setSlideElements(map)
  }, [])

  // Entering comment mode as soon as the name dialog's state flips would let a
  // click land on the dialog's still-animating-out backdrop, which swallows it.
  // Deferring to onOpenChangeComplete waits for that transition to actually finish.
  const enterCommentModeAfterNameRef = useRef(false)

  const enterCommentMode = useCallback(() => {
    if (!identity) {
      setShowNameDialog(true)
      return
    }
    setCommentMode(true)
  }, [identity])

  const handleNameSubmit = useCallback((name: string) => {
    const newIdentity = storeIdentity(name)
    setIdentity(newIdentity)
    enterCommentModeAfterNameRef.current = true
    setShowNameDialog(false)
  }, [])

  const handleNameDialogClosed = useCallback((open: boolean) => {
    if (!open && enterCommentModeAfterNameRef.current) {
      enterCommentModeAfterNameRef.current = false
      setCommentMode(true)
    }
  }, [])

  // Placement anchors to the nearest [data-slide-id] ancestor so pins keep
  // their position when that section reflows or the viewport resizes.
  useEffect(() => {
    if (!commentMode) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('[data-comment-pin]') || target.closest('[data-comment-toggle]')) return

      const slide = target.closest<HTMLElement>('[data-slide-id]')
      if (!slide) return

      const rect = slide.getBoundingClientRect()
      const xPct = ((event.clientX - rect.left) / rect.width) * 100
      const yPct = ((event.clientY - rect.top) / rect.height) * 100
      const slideId = slide.dataset.slideId!

      setDraft({ slideId, xPct, yPct })
      setCommentMode(false)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [commentMode])

  if (!hydrated) return null

  const draftPin =
    draft && identity
      ? createPortal(
          <div
            data-comment-pin="draft"
            className="absolute -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2"
            style={{ left: `${draft.xPct}%`, top: `${draft.yPct}%` }}
          >
            <Avatar size="sm" className="ring-2 ring-primary shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials(identity.name)}
              </AvatarFallback>
            </Avatar>
            <div className="w-72 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
              <CommentComposer
                onCancel={() => setDraft(null)}
                onSave={async (text) => {
                  await create({
                    slideId: draft.slideId,
                    xPct: draft.xPct,
                    yPct: draft.yPct,
                    authorName: identity.name,
                    ownerToken: identity.token,
                    text,
                  })
                  setDraft(null)
                }}
              />
            </div>
          </div>,
          slideElements[draft.slideId] ?? document.body
        )
      : null

  return (
    <>
      {comments.map((comment) => {
        const el = slideElements[comment.slideId]
        if (!el) return null
        return createPortal(
          <CommentPin
            key={comment.id}
            comment={comment}
            onUpdate={async (text) => {
              await update(comment.id, text, identity!.token)
            }}
            onDelete={async () => {
              await remove(comment.id, identity!.token)
            }}
          />,
          el
        )
      })}

      {draftPin}

      <NameCaptureDialog
        open={showNameDialog}
        onOpenChange={setShowNameDialog}
        onOpenChangeComplete={handleNameDialogClosed}
        onSubmit={handleNameSubmit}
      />

      <div className="fixed bottom-6 right-6 z-50" data-comment-toggle="true">
        {commentMode ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md size-11"
            onClick={() => setCommentMode(false)}
            aria-label="Cancel commenting"
          >
            <X />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            className="rounded-full shadow-md size-11"
            onClick={enterCommentMode}
            aria-label="Add a comment"
          >
            <MessageCirclePlus />
          </Button>
        )}
      </div>
    </>
  )
}
