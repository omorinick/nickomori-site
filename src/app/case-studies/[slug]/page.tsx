import { notFound } from 'next/navigation'
import { isKnownCaseStudySlug, CASE_STUDY_REGISTRY } from '@/data/case-studies/registry'
import { logout } from '../actions'

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) notFound()

  const meta = CASE_STUDY_REGISTRY[slug]

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <h1 className="text-4xl font-bold text-foreground tracking-tight font-heading">{meta.title}</h1>
          <form action={logout.bind(null, slug)}>
            <button type="submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign out
            </button>
          </form>
        </div>
        <p className="text-muted-foreground">Content coming soon.</p>
      </div>
    </main>
  )
}
