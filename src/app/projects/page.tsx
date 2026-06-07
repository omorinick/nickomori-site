import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb crumbs={[{ label: 'Constructive Distractions' }]} />
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Constructive Distractions</h1>
          <p className="text-sm text-muted-foreground">
            Experiments at the intersection of AI and product work.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/projects/pm-toolkit"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-neutral-500 transition-colors"
          >
            <div>
              <p className="font-medium text-foreground mb-1">Assumption Mapper</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Describe a product idea or feature. Get a structured assumption map — swim lanes, assumptions across all five Teresa Torres dimensions, and a priority matrix — in seconds.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>

          <Link
            href="/projects/compliant-market"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-neutral-500 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">Compliant Market</p>
                <Badge variant="secondary" className="text-xs">Satire</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A peer-to-peer marketplace for pharmaceutical assets. Third-party verified. No questions asked.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
