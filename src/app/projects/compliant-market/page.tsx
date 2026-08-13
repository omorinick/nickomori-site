import { DEFAULT_PRODUCT } from '@/data/projects/compliant-market'
import DrugXPageShell from './DrugXPageShell'

export default function CompliantMarketPage() {
  return (
    <main className="min-h-screen bg-background">
      <DrugXPageShell product={DEFAULT_PRODUCT} />
    </main>
  )
}
