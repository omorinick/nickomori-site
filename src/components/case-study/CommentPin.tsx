'use client'

import { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { initials } from '@/lib/comment-identity'
import { CommentComposer } from './CommentComposer'
import type { CommentRecord, CommentThread } from '@/lib/comments'

function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

function CommentItem({
  comment,
  onUpdate,
  onDelete,
}: {
  comment: CommentRecord
  onUpdate: (text: string) => Promise<void>
  onDelete: () => Promise<void>
}) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <CommentComposer
        initialText={comment.text}
        saveLabel="Save"
        onCancel={() => setEditing(false)}
        onSave={async (text) => {
          await onUpdate(text)
          setEditing(false)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{comment.authorName}</span>
        <span className="text-xs text-muted-foreground">{relativeDate(comment.createdAt)}</span>
      </div>
      <p className="text-sm text-foreground whitespace-pre-wrap">{comment.text}</p>
      <div className="flex justify-end gap-1">
        <Button type="button" variant="ghost" size="xs" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <Button type="button" variant="ghost" size="xs" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export function CommentPin({
  thread,
  highlighted = false,
  isReplying,
  onStartReply,
  onCancelReply,
  onUpdateComment,
  onDeleteComment,
  onReply,
}: {
  thread: CommentThread
  highlighted?: boolean
  isReplying: boolean
  onStartReply: () => void
  onCancelReply: () => void
  onUpdateComment: (id: string, text: string) => Promise<void>
  onDeleteComment: (id: string) => Promise<void>
  onReply: (text: string) => Promise<void>
}) {
  const { root, replies } = thread

  return (
    <div
      data-comment-pin="saved"
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
      style={{ left: `${root.xPct}%`, top: `${root.yPct}%` }}
    >
      <Popover>
        <PopoverTrigger
          openOnHover
          delay={150}
          nativeButton={false}
          render={
            <Avatar
              size="sm"
              className={`relative cursor-pointer ring-2 ring-background shadow-sm hover:scale-110 transition-transform ${highlighted ? 'ring-4 ring-primary animate-pulse' : ''}`}
            />
          }
        >
          <AvatarFallback className="bg-primary text-primary-foreground">{initials(root.authorName)}</AvatarFallback>
          {replies.length > 0 && (
            <span className="absolute -bottom-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-foreground text-background text-[10px] leading-4 text-center font-medium ring-2 ring-background">
              {replies.length}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-80 max-h-[420px] overflow-y-auto gap-3">
          <CommentItem
            comment={root}
            onUpdate={(text) => onUpdateComment(root.id, text)}
            onDelete={() => onDeleteComment(root.id)}
          />
          {replies.map((reply) => (
            <div key={reply.id} className="pl-3 border-l-2 border-border">
              <CommentItem
                comment={reply}
                onUpdate={(text) => onUpdateComment(reply.id, text)}
                onDelete={() => onDeleteComment(reply.id)}
              />
            </div>
          ))}
          {isReplying ? (
            <div className="pl-3 border-l-2 border-border">
              <CommentComposer saveLabel="Reply" onCancel={onCancelReply} onSave={onReply} />
            </div>
          ) : (
            <button
              type="button"
              onClick={onStartReply}
              className="text-xs text-muted-foreground hover:text-foreground text-left transition-colors"
            >
              Reply
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
