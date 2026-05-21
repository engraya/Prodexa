import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProduct } from '@/hooks/useProduct'
import { ProductImageGallery } from '@/components/product-detail/ProductImageGallery'
import { ProductInfo } from '@/components/product-detail/ProductInfo'
import { ProductMeta } from '@/components/product-detail/ProductMeta'
import { ProductReviews } from '@/components/product-detail/ProductReviews'
import { ErrorState } from '@/components/shared/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

function ProductDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-6 w-32" />
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = parseInt(id ?? '', 10)
  const { data: product, isLoading, error, refetch } = useProduct(productId)

  if (isLoading) return <ProductDetailSkeleton />

  if (error || !product) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to products
          </Link>
        </Button>
        <ErrorState
          message={error?.message ?? 'Product not found.'}
          onRetry={error ? () => { refetch() } : undefined}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Back navigation */}
      <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
        <Link to="/products">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to products
        </Link>
      </Button>

      {/* Main product layout */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
        />
        <div className="space-y-6">
          <ProductInfo product={product} />
          <Separator />
          <ProductMeta product={product} />
        </div>
      </div>

      <Separator />

      {/* Reviews */}
      <ProductReviews reviews={product.reviews} />
    </div>
  )
}
