import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb crumbs={[{ label: 'Projects' }]} />
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Side projects and tinkering</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Nothing here yet</CardTitle>
              <CardDescription>Projects will appear here as they're added.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  )
}
