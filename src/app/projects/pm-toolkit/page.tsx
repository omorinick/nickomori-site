import type { Metadata } from 'next'
import { PMToolkitClient } from './PMToolkitClient'

export const metadata: Metadata = {
  title: 'Assumption Mapper — Nick Omori',
  description: 'Generate a structured assumption map for any product feature using the Teresa Torres Continuous Discovery Habits framework.',
}

export default function PMToolkitPage() {
  return <PMToolkitClient />
}
