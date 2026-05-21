import { useMemo } from 'react'
import { useAllProducts } from '@/hooks/useAllProducts'
import { BrandChart } from '@/components/analytics/BrandChart'
import { PageTitle } from '@/components/shared/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorState } from '@/components/shared/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const { data: products = [], isLoading, error, refetch } = useAllProducts()

  const stats = useMemo(() => {
    if (products.length === 0) return null
    const brands = new Set(products.map((p) => p.brand).filter(Boolean))
    const categories = new Set(products.map((p) => p.category))
    const avgPrice = products.reduce((s, p) => s + p.price, 0) / products.length
    const avgRating = products.reduce((s, p) => s + p.rating, 0) / products.length
    return { brands: brands.size, categories: categories.size, avgPrice, avgRating }
  }, [products])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    )
  }

  if (error) return <ErrorState message={error.message} onRetry={refetch} />

  return (
    <div className="space-y-8">
      <PageTitle>Analytics</PageTitle>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Products" value={products.length} />
          <StatCard title="Unique Brands" value={stats.brands} />
          <StatCard title="Categories" value={stats.categories} />
          <StatCard title="Avg. Price" value={formatCurrency(stats.avgPrice)} />
        </div>
      )}

      <BrandChart products={products} />
    </div>
  )
}
