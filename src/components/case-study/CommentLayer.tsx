'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { List, MessageCirclePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCaseStudyComments } from '@/hooks/useCaseStudyComments'
import { groupIntoThreads, type CommentThread } from '@/lib/comments'
import { getStoredIdentity, storeIdentity, initials, type CommentIdentity } from '@/lib/comment-identity'
import { NameCaptureDialog } from './NameCaptureDialog'
import { CommentPin } from './CommentPin'
import { CommentComposer } from './CommentComposer'
import { CommentListPanel } from './CommentListPanel'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const HIGHLIGHT_DURATION_MS = 1600
const NUDGE_DURATION_MS = 4000

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
  const [replyingThreadId, setReplyingThreadId] = useState<string | null>(null)
  const [slideElements, setSlideElements] = useState<Record<string, HTMLElement>>({})
  const [showListPanel, setShowListPanel] = useState(false)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [nudging, setNudging] = useState(false)

  const { comments, create, update, remove } = useCaseStudyComments(slug)
  const threads = groupIntoThreads(comments)

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

  // Nudge once per tab session so a first-time visitor notices the button, without
  // bouncing forever if they never interact with it.
  useEffect(() => {
    const key = `case-study-nudge-seen-${slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    setNudging(true)
    const timeout = setTimeout(() => setNudging(false), NUDGE_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [slug])

  // Any action that authors a new comment (placing a pin, starting a reply) needs a
  // name first. Queue the action as data — not a closure — so it isn't stale by the
  // time the name dialog's close animation actually finishes and it's safe to run.
  const pendingActionRef = useRef<'enter-comment-mode' | { reply: string } | null>(null)

  const requireIdentity = useCallback(
    (action: 'enter-comment-mode' | { reply: string }) => {
      if (identity) {
        if (action === 'enter-comment-mode') setCommentMode(true)
        else setReplyingThreadId(action.reply)
        return
      }
      pendingActionRef.current = action
      setShowNameDialog(true)
    },
    [identity]
  )

  const handleNameSubmit = useCallback((name: string) => {
    setIdentity(storeIdentity(name))
    setShowNameDialog(false)
  }, [])

  // Entering comment mode as soon as the name dialog's state flips would let a click
  // land on the dialog's still-animating-out backdrop, which swallows it — deferring to
  // onOpenChangeComplete waits for that transition to actually finish first.
  const handleNameDialogClosed = useCallback((open: boolean) => {
    if (open) return
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (!action) return
    if (action === 'enter-comment-mode') setCommentMode(true)
    else setReplyingThreadId(action.reply)
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

  const jumpToThread = useCallback(
    (thread: CommentThread) => {
      slideElements[thread.root.slideId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setShowListPanel(false)
      setHighlightedId(thread.root.id)
      setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION_MS)
    },
    [slideElements]
  )

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
      {threads.map((thread) => {
        const el = slideElements[thread.root.slideId]
        if (!el) return null
        return createPortal(
          <CommentPin
            key={thread.root.id}
            thread={thread}
            highlighted={highlightedId === thread.root.id}
            isReplying={replyingThreadId === thread.root.id}
            onStartReply={() => requireIdentity({ reply: thread.root.id })}
            onCancelReply={() => setReplyingThreadId(null)}
            onUpdateComment={async (id, text) => {
              await update(id, text)
            }}
            onDeleteComment={async (id) => {
              await remove(id)
            }}
            onReply={async (text) => {
              if (!identity) return
              await create({ parentId: thread.root.id, authorName: identity.name, text })
              setReplyingThreadId(null)
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

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" data-comment-toggle="true">
        {showListPanel && (
          <CommentListPanel threads={threads} onJumpTo={jumpToThread} onClose={() => setShowListPanel(false)} />
        )}

        <div className="group/toggle-wrap relative flex items-center gap-2">
          {!commentMode && !showListPanel && (
            <button
              type="button"
              onClick={() => setShowListPanel(true)}
              className="absolute bottom-full right-0 mb-2 flex items-center gap-2 rounded-full bg-card border border-border shadow-md px-4 py-2 text-sm font-medium text-foreground whitespace-nowrap opacity-0 translate-y-1 pointer-events-none group-hover/toggle-wrap:opacity-100 group-hover/toggle-wrap:translate-y-0 group-hover/toggle-wrap:pointer-events-auto transition-all duration-200"
            >
              <List className="size-3.5" />
              Show all comments
            </button>
          )}

          {commentMode && (
            <span className="text-sm font-medium text-foreground bg-card border border-border rounded-full px-4 py-2.5 shadow-md animate-in fade-in slide-in-from-right-2 duration-200">
              Click anywhere to comment
            </span>
          )}

          <div className="relative">
            {!commentMode && comments.length > 0 && (
              <span className="absolute -top-1 -right-1 z-10 min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] leading-[18px] text-center font-medium ring-2 ring-background pointer-events-none">
                {comments.length}
              </span>
            )}
            <button
              type="button"
              onClick={commentMode ? () => setCommentMode(false) : () => requireIdentity('enter-comment-mode')}
              onMouseEnter={() => setNudging(false)}
              aria-label={commentMode ? 'Cancel commenting' : 'Add a comment'}
              className={cn(
                'group/toggle flex items-center h-11 rounded-full shadow-md transition-[width] duration-200 overflow-hidden',
                commentMode
                  ? 'w-11 justify-center bg-secondary text-secondary-foreground'
                  : 'min-w-11 bg-primary text-primary-foreground',
                nudging && !commentMode && 'animate-bounce'
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
        </div>
      </div>
    </>
  )
}
