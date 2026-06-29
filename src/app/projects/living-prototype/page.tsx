import type { Metadata } from 'next'
import { LivingPrototypeContent } from './LivingPrototypeContent'

export const metadata: Metadata = {
  title: 'Living Prototype | Nick Omori',
  description:
    'A skill for turning raw content into interactive web presentations — animated data, live demos, and interactive exploration, without the constraints of slides.',
}

export default function LivingPrototypePage() {
  return <LivingPrototypeContent />
}
