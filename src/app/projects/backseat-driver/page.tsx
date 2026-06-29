import type { Metadata } from 'next'
import { BackseatDriverContent } from './BackseatDriverContent'

export const metadata: Metadata = {
  title: 'Backseat Driver | Nick Omori',
  description:
    'A car-maintenance advisor that works for the owner, not the shop — know what your car needs, what it should cost, and whether that upsell is real.',
}

export default function BackseatDriverPage() {
  return <BackseatDriverContent />
}
