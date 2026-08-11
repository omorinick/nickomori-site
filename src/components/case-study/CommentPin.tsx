'use client'

import { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { initials } from '@/lib/comment-identity'
import { CommentComposer } from './CommentComposer'
import type { CommentRecord } from '@/lib/comments'

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

export function CommentPin({
  comment,
  onUpdate,
  onDelete,
}: {
  comment: CommentRecord
  onUpdate: (text: string) => Promise<void>
  onDelete: () => Promise<void>
}) {
  const [editing, setEditing] = useState(false)

  return (
    <div
      data-comment-pin="saved"
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
      style={{ left: `${comment.xPct}%`, top: `${comment.yPct}%` }}
    >
      <Popover onOpenChange={(open) => !open && setEditing(false)}>
        <PopoverTrigger
          openOnHover
          delay={150}
          nativeButton={false}
          render={
            <Avatar
              size="sm"
              className="cursor-pointer ring-2 ring-background shadow-sm hover:scale-110 transition-transform"
            />
          }
        >
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials(comment.authorName)}
          </AvatarFallback>
        </PopoverTrigger>
        <PopoverContent side="top" align="start">
          {editing ? (
            <CommentComposer
              initialText={comment.text}
              saveLabel="Save"
              onCancel={() => setEditing(false)}
              onSave={async (text) => {
                await onUpdate(text)
                setEditing(false)
              }}
            />
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{comment.authorName}</span>
                <span className="text-xs text-muted-foreground">{relativeDate(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{comment.text}</p>
              <div className="flex justify-end gap-1 mt-1">
                <Button type="button" variant="ghost" size="xs" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button type="button" variant="ghost" size="xs" onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
