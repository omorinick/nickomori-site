'use client'

import { FlaskConical, Scale, ShieldCheck, Sparkles } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const GREEN = '#00bb29'

const DIALOG_CLASS = 'drugx-theme dark border-border bg-popover text-foreground shadow-2xl sm:max-w-md'
const OVERLAY_CLASS = 'bg-black/75 backdrop-blur-sm'

export type TradeAction = 'buy' | 'offer' | 'sell' | null

const TRADE_COPY: Record<Exclude<TradeAction, null>, { label: string; title: string; body: string }> = {
  buy: {
    label: 'MARKET CLOSED',
    title: 'Trading is paused in your jurisdiction.',
    body: 'We checked all 50 states, the District of Columbia, and several unusually permissive group chats. DrugX transactions are not currently legal in any of them.',
  },
  offer: {
    label: 'OFFER DESK',
    title: 'Your negotiating power is noted.',
    body: 'Offers are temporarily disabled while our compliance team determines whether “name your price” is a legally recognized prescription benefit.',
  },
  sell: {
    label: 'SELLER ONBOARDING',
    title: 'Tell us what you found—and roughly where.',
    body: 'Seller onboarding normally begins with a photo, an expiration date, and a plausible origin story. It currently ends here because DrugX is fictional.',
  },
}

export function DrugXTradeDialog({
  action,
  onOpenChange,
  dosage,
  ask,
  offer,
}: {
  action: TradeAction
  onOpenChange: (open: boolean) => void
  dosage: string
  ask: number
  offer: number
}) {
  const copy = action ? TRADE_COPY[action] : null

  return (
    <Dialog open={Boolean(action)} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS} overlayClassName={OVERLAY_CLASS}>
        {copy && (
          <>
            <DialogHeader className="gap-3">
              <div className="flex items-center gap-2">
                <Scale className="size-4" style={{ color: GREEN }} />
                <span className="text-[10px] font-black tracking-[0.16em]" style={{ color: GREEN }}>
                  {copy.label}
                </span>
              </div>
              <DialogTitle className="font-sans text-xl font-bold leading-tight">{copy.title}</DialogTitle>
              <DialogDescription className="leading-relaxed">{copy.body}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
              <div className="bg-card p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Dosage</p>
                <p className="mt-1 text-sm font-bold">{dosage}</p>
              </div>
              <div className="bg-card p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lowest Ask</p>
                <p className="mt-1 text-sm font-bold">${ask}</p>
              </div>
              <div className="bg-card p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Highest Offer</p>
                <p className="mt-1 text-sm font-bold">${offer}</p>
              </div>
            </div>
            <DialogFooter showCloseButton className="border-border bg-muted/40" />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function DrugXInfoDialog({
  open,
  onOpenChange,
  title,
  body,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  body: string[]
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS} overlayClassName={OVERLAY_CLASS}>
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4" style={{ color: GREEN }} />
            <span className="text-[10px] font-black tracking-[0.16em]" style={{ color: GREEN }}>
              INDEPENDENT ANALYSIS
            </span>
          </div>
          <DialogTitle className="font-sans text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="sr-only">More information about {title}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
          ))}
        </div>
        <DialogFooter showCloseButton className="border-border bg-muted/40" />
      </DialogContent>
    </Dialog>
  )
}

export function DrugXLabsDialog({
  open,
  onOpenChange,
  onScan,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onScan: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={DIALOG_CLASS} overlayClassName={OVERLAY_CLASS}>
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" style={{ color: GREEN }} />
            <span className="text-[10px] font-black tracking-[0.16em]" style={{ color: GREEN }}>
              DRUGX LABS™
            </span>
          </div>
          <DialogTitle className="font-sans text-xl font-bold">Found a pill you cannot identify?</DialogTitle>
          <DialogDescription className="leading-relaxed">
            Upload a photo and our proprietary compound recognition engine will estimate its identity, provenance, and suspiciously specific market value.
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={onScan}
          className="group flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-card py-7 transition-colors hover:border-border-hover"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10">
            <FlaskConical className="size-5" style={{ color: GREEN }} />
          </span>
          <span className="text-sm font-semibold">Upload unidentified object</span>
          <span className="text-xs text-muted-foreground">PNG, JPG, HEIC · chain of custody optional</span>
        </button>
        <p className="text-xs leading-relaxed text-foreground-subtle">
          No analysis occurs. DrugX is a fictional satirical project, not an identification service.
        </p>
        <DialogFooter className="border-border bg-muted/40">
          <Button variant="outline" onClick={() => onOpenChange(false)}>I know what it is</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
