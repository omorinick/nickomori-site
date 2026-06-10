import type { Metadata } from 'next'
import { HowIWorkContent } from './HowIWorkContent'

export const metadata: Metadata = {
  title: 'AI Skills & Automations | Nick Omori',
  description:
    'A working library of automated workflows and domain-encoded AI skills — built at work to solve real operational problems.',
}

export default function HowIWorkPage() {
  return <HowIWorkContent />
}
