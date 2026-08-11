export interface CaseStudyMeta {
  title: string
}

export const CASE_STUDY_REGISTRY: Record<string, CaseStudyMeta> = {
  demo: { title: 'Case Study (Demo)' },
  'churn-case': { title: 'Churn & Decline — the retention lever' },
}

export function isKnownCaseStudySlug(slug: string): slug is keyof typeof CASE_STUDY_REGISTRY {
  return slug in CASE_STUDY_REGISTRY
}
