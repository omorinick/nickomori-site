'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function CommentComposer({
  initialText = '',
  onSave,
  onCancel,
  saveLabel = 'Comment',
}: {
  initialText?: string
  onSave: (text: string) => void | Promise<void>
  onCancel: () => void
  saveLabel?: string
}) {
  const [text, setText] = useState(initialText)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!text.trim()) return
    setSaving(true)
    await onSave(text.trim())
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment…"
        className="min-h-20 text-sm"
        maxLength={500}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="sm" disabled={saving || !text.trim()} onClick={handleSave}>
          {saveLabel}
        </Button>
      </div>
    </div>
  )
}
