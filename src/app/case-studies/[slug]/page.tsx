import { notFound } from 'next/navigation'
import { isKnownCaseStudySlug, CASE_STUDY_REGISTRY } from '@/data/case-studies/registry'
import { CASE_STUDY_CONTENT } from '@/components/case-study/content'
import { logout } from '../actions'
import { CommentLayer } from '@/components/case-study/CommentLayer'

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) notFound()

  const meta = CASE_STUDY_REGISTRY[slug]
  const Content = CASE_STUDY_CONTENT[slug]

  return (
    <div className="relative">
      <form action={logout.bind(null, slug)} className="absolute top-3.5 right-4 z-50">
        <button
          type="submit"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-border"
        >
          Sign out
        </button>
      </form>

      {Content ? (
        <Content />
      ) : (
        <main className="min-h-screen bg-background px-4 sm:px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground tracking-tight font-heading mb-10">{meta.title}</h1>
            <section data-slide-id="intro" className="relative min-h-40 rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground">Content coming soon.</p>
            </section>
          </div>
        </main>
      )}

      <CommentLayer slug={slug} />
    </div>
  )
}
