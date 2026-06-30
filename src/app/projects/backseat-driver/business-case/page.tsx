import type { Metadata } from 'next'
import { BusinessCaseContent } from './BusinessCaseContent'

export const metadata: Metadata = {
  title: 'The Business Case — Backseat Driver | Nick Omori',
  description:
    "A $199B market where 78% of customers don't trust the product they're buying. Why the gap exists, why every competitor failed to fill it, and why clean incentives are the product.",
}

export default function BusinessCasePage() {
  return <BusinessCaseContent />
}
