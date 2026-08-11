'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { relativeDate, type CommentThread } from '@/lib/comments'

export function CommentListPanel({
  threads,
  selectedId,
  onJumpTo,
  onClose,
}: {
  threads: CommentThread[]
  selectedId: string | null
  onJumpTo: (thread: CommentThread) => void
  onClose: () => void
}) {
  return (
    <div className="w-80 max-h-[60vh] flex flex-col rounded-2xl border border-border bg-card shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <span className="text-sm font-semibold text-foreground">Comments</span>
        <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close comment list">
          <X className="size-4" />
        </button>
      </div>
      <div className="overflow-y-auto p-2">
        {threads.length === 0 ? (
          <p className="text-sm text-muted-foreground p-3">No comments yet.</p>
        ) : (
          threads.map((thread) => (
            <button
              key={thread.root.id}
              type="button"
              onClick={() => onJumpTo(thread)}
              className={cn(
                'w-full text-left p-3 rounded-lg transition-colors flex flex-col gap-1 ring-1',
                selectedId === thread.root.id
                  ? 'bg-primary/10 ring-primary/40'
                  : 'ring-transparent hover:bg-muted'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{thread.root.authorName}</span>
                <span className="text-xs text-muted-foreground shrink-0">{relativeDate(thread.root.createdAt)}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{thread.root.text}</p>
              {thread.replies.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
