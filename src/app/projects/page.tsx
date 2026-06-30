import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb crumbs={[{ label: 'Constructive Distractions' }]} />
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3 font-heading">Constructive Distractions</h1>
          <p className="text-sm text-muted-foreground">
            Digital sandbox &amp; working concepts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/projects/pm-toolkit"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
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
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">DrugX</p>
                <Badge variant="secondary" className="text-xs">Satire</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A peer-to-peer marketplace for pharmaceutical assets. Third-party verified. No questions asked.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>

          <Link
            href="/projects/ai-skills-automations"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
          >
            <div>
              <p className="font-medium text-foreground mb-1">AI Skills & Automations</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A working library of automated workflows and domain-encoded AI skills — built at work to solve real operational problems.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>

          <Link
            href="/projects/living-prototype"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
          >
            <div>
              <p className="font-medium text-foreground mb-1">Living Presentation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A skill for turning raw content into interactive web presentations — animated data, live demos, and interactive exploration, without the constraints of slides.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>

          <Link
            href="/projects/backseat-driver"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
          >
            <div>
              <p className="font-medium text-foreground mb-1">Backseat Driver</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A car-maintenance advisor that works for the owner, not the shop — know what your car needs, what it should cost, and whether that upsell is real.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">→</span>
          </Link>

          <Link
            href="/theme-playground.html"
            target="_blank"
            className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">Theme Playground</p>
                <Badge variant="secondary" className="text-xs">Tool</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A live color and typography explorer — swap palettes, pick fonts, preview the full design system, and export CSS tokens. Built for committing to a rebrand with confidence.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-4 mt-0.5 flex-shrink-0">↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
