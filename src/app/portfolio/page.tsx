import Link from 'next/link'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function PortfolioPage() {
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
        <div className="flex flex-col gap-4">
          <Link
            href="/portfolio/pm-toolkit"
            className="group flex items-start justify-between rounded-xl border border-neutral-800 px-5 py-5 hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-white mb-1">Assumption Mapper</p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Describe a product idea or feature. Get a structured assumption map — swim lanes, assumptions across all five Teresa Torres dimensions, and a priority matrix — in seconds.
              </p>
            </div>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
