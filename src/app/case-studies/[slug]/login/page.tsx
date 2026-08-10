import { notFound } from 'next/navigation'
import { login } from '../../actions'
import { isKnownCaseStudySlug } from '@/data/case-studies/registry'

export default async function CaseStudyLogin({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { slug } = await params
  if (!isKnownCaseStudySlug(slug)) notFound()

  const query = await searchParams
  const hasError = query.error === '1'

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Case Study
          </h1>
          <p className="text-sm text-muted-foreground mt-1">This page is private. Enter the passphrase you were given.</p>
        </div>
        <form action={login.bind(null, slug)} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Passphrase"
            autoFocus
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {hasError && (
            <p className="text-sm text-destructive">Incorrect passphrase.</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
