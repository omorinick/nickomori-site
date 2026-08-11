'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCirclePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
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

  const { comments, create, update, remove } = useCaseStudyComments(slug)

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

  useEffect(() => {
    document.body.classList.toggle('case-study-commenting', commentMode)
    return () => document.body.classList.remove('case-study-commenting')
  }, [commentMode])

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
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2"
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
              await update(comment.id, text)
            }}
            onDelete={async () => {
              await remove(comment.id)
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

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2" data-comment-toggle="true">
        {commentMode && (
          <span className="text-sm font-medium text-foreground bg-card border border-border rounded-full px-4 py-2.5 shadow-md animate-in fade-in slide-in-from-right-2 duration-200">
            Click anywhere to comment
          </span>
        )}
        <button
          type="button"
          onClick={commentMode ? () => setCommentMode(false) : enterCommentMode}
          aria-label={commentMode ? 'Cancel commenting' : 'Add a comment'}
          className={cn(
            'group/toggle flex items-center h-11 rounded-full shadow-md transition-[width] duration-200 overflow-hidden',
            commentMode
              ? 'w-11 justify-center bg-secondary text-secondary-foreground'
              : 'min-w-11 bg-primary text-primary-foreground'
          )}
        >
          {!commentMode && (
            <span className="max-w-0 group-hover/toggle:max-w-24 group-hover/toggle:pl-4 overflow-hidden whitespace-nowrap transition-all duration-200 text-sm font-medium">
              Comment
            </span>
          )}
          <span className="flex items-center justify-center size-11 shrink-0">
            {commentMode ? <X /> : <MessageCirclePlus />}
          </span>
        </button>
      </div>
    </>
  )
}
