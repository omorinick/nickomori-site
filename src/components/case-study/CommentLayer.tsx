'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { List, MessageCirclePlus, UserPen, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCaseStudyComments } from '@/hooks/useCaseStudyComments'
import { groupIntoThreads, type CommentThread } from '@/lib/comments'
import { getStoredIdentity, storeIdentity, initials, type CommentIdentity } from '@/lib/comment-identity'
import { NameCaptureDialog } from './NameCaptureDialog'
import { CommentPin } from './CommentPin'
import { CommentComposer } from './CommentComposer'
import { CommentListPanel } from './CommentListPanel'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const NUDGE_DURATION_MS = 4000
const MENU_CLOSE_DELAY_MS = 300

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
  const [openThreadId, setOpenThreadId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
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

  // Hover menu: open instantly, close with a grace period so moving the mouse from
  // the button up to the menu items doesn't require pixel-perfect precision.
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMenu = useCallback(() => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current)
      menuCloseTimerRef.current = null
    }
    setMenuOpen(true)
  }, [])
  const scheduleCloseMenu = useCallback(() => {
    menuCloseTimerRef.current = setTimeout(() => setMenuOpen(false), MENU_CLOSE_DELAY_MS)
  }, [])
  useEffect(() => () => {
    if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current)
  }, [])

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

  const editName = useCallback(() => {
    setMenuOpen(false)
    pendingActionRef.current = null
    setShowNameDialog(true)
  }, [])

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
      setOpenThreadId(thread.root.id)
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
            open={openThreadId === thread.root.id}
            onOpenChange={(next) => setOpenThreadId(next ? thread.root.id : null)}
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
        initialName={identity?.name ?? ''}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" data-comment-toggle="true">
        {showListPanel && (
          <CommentListPanel
            threads={threads}
            selectedId={openThreadId}
            onJumpTo={jumpToThread}
            onClose={() => setShowListPanel(false)}
          />
        )}

        {/* Normal flow (not absolutely positioned) so the menu card and button share one
            hoverable box with no dead gap between them — the earlier absolute-positioned
            popup sat outside this wrapper's layout box entirely. */}
        <div
          className="flex flex-col items-end gap-2"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleCloseMenu}
        >
          {menuOpen && !commentMode && (
            <div className="w-52 rounded-xl border border-border bg-card shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-150 delay-150 fill-mode-both">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  setShowListPanel(true)
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <List className="size-3.5 text-muted-foreground" />
                Show all comments
              </button>
              <button
                type="button"
                onClick={editName}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
              >
                <UserPen className="size-3.5 text-muted-foreground" />
                Edit name
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
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
                  'flex items-center h-11 rounded-full shadow-md transition-[width] duration-200 overflow-hidden',
                  commentMode
                    ? 'w-11 justify-center bg-secondary text-secondary-foreground'
                    : 'min-w-11 bg-primary text-primary-foreground',
                  nudging && !commentMode && 'animate-bounce'
                )}
              >
                {!commentMode && (
                  <span
                    className={cn(
                      'overflow-hidden whitespace-nowrap transition-all duration-200 text-sm font-medium',
                      menuOpen ? 'max-w-24 pl-4' : 'max-w-0 pl-0'
                    )}
                  >
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
      </div>
    </>
  )
}
