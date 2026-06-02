import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb crumbs={[{ label: 'Constructive Distractions' }]} />
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Constructive Distractions</h1>
          <p className="text-sm text-muted-foreground">
            Please request access.
          </p>
        </div>
      </div>
    </main>
  )
}
