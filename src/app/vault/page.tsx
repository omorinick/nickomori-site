import Link from 'next/link'
import { logout } from './actions'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageBreadcrumb } from '@/components/PageBreadcrumb'

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb crumbs={[{ label: 'Vault' }]} />
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Vault</h1>
            <p className="text-sm text-muted-foreground mt-1">Personal artifacts & tools</p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground">
              Sign out
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/vault/japan" className="group block">
            <Card className="transition-shadow hover:shadow-sm hover:ring-foreground/20 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Japan 2026</CardTitle>
                    <CardDescription className="mt-0.5">Living trip itinerary · Apr 19–30</CardDescription>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors text-base leading-none mt-0.5">→</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1.5 flex-wrap">
                  {['Tokyo', 'Hakone', 'Kyoto', 'Hiroshima'].map(city => (
                    <Badge key={city} variant="secondary">{city}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}
