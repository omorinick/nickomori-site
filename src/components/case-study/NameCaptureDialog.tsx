'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function NameCaptureDialog({
  open,
  onOpenChange,
  onOpenChangeComplete,
  onSubmit,
  initialName = '',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
  onSubmit: (name: string) => void
  initialName?: string
}) {
  const [name, setName] = useState(initialName)
  const isEditing = initialName.trim().length > 0

  // Re-seed from the current identity each time the dialog opens (covers both the
  // blank first-time prompt and the prefilled "edit name" reuse of this dialog).
  useEffect(() => {
    if (open) setName(initialName)
  }, [open, initialName])

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit(name.trim())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit your name' : "What's your name?"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'This updates the name shown on comments you leave from now on.'
              : "Shown next to any comments you leave on this page. You'll only be asked once."}
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={60}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
        />
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={!name.trim()}>
            {isEditing ? 'Save' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
