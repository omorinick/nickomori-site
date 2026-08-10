export function caseStudyPasswordEnvVar(slug: string): string {
  return `CASE_STUDY_PASSWORD_${slug.toUpperCase().replace(/-/g, '_')}`
}

export function caseStudyCookieName(slug: string): string {
  return `case-study-auth-${slug}`
}
