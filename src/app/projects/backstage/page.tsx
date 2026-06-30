import type { Metadata } from 'next'
import { BackstageContent } from './BackstageContent'

export const metadata: Metadata = {
  title: 'Backstage | Nick Omori',
  description:
    'An overlay that turns any prototype into a self-explaining demo — showing stakeholders where data comes from, what\'s real, what\'s mocked, and what\'s still open.',
}

export default function BackstagePage() {
  return <BackstageContent />
}
