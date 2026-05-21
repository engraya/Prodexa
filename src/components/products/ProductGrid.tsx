import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from '@/components/shared/LoadingSkeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
  onReset?: () => void
}

export function ProductGrid({ products, isLoading, error, onRetry, onReset }: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />

  if (error) {
    return <ErrorState message={error.message} onRetry={onRetry} />
  }

  if (products.length === 0) {
    return <EmptyState onReset={onReset} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
