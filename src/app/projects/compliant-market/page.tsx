import { PageBreadcrumb } from '@/components/PageBreadcrumb'
import CompliantMarketClient from './CompliantMarketClient'

export default function CompliantMarketPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <PageBreadcrumb
          crumbs={[
            { label: 'Projects', href: '/projects' },
            { label: 'Compliant Market' },
          ]}
        />
      </div>
      <CompliantMarketClient />
    </main>
  )
}
