import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/data/projects/compliant-market'
import DrugXPageShell from '../../DrugXPageShell'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(PRODUCTS)
    .filter((slug) => slug !== 'adderall')
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS[slug]

  if (!product) return {}

  return {
    title: `${product.name} | DrugX`,
    description: `Explore the fictional DrugX market for ${product.name}. Obviously satire.`,
  }
}

export default async function DrugXProductRoute({ params }: ProductPageProps) {
  const { slug } = await params
  const product = PRODUCTS[slug]

  if (!product) notFound()

  return (
    <main className="min-h-screen bg-background">
      <DrugXPageShell product={product} />
    </main>
  )
}
