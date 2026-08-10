'use client'

import { useState } from 'react'
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
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
  onSubmit: (name: string) => void
}) {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit(name.trim())
    setName('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What&apos;s your name?</DialogTitle>
          <DialogDescription>
            Shown next to any comments you leave on this page. You&apos;ll only be asked once.
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
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
