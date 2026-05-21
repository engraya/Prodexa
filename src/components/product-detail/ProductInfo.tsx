import type { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/shared/StarRating'
import { formatCurrency, getStockStatus } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { label: stockLabel, variant: stockVariant } = getStockStatus(product.availabilityStatus)
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="space-y-4">
      {/* Category + brand */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="capitalize">{product.category}</span>
        {product.brand && (
          <>
            <span aria-hidden="true">·</span>
            <span>{product.brand}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating value={product.rating} size="md" showValue />
        <span className="text-sm text-muted-foreground">
          ({product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">
          {formatCurrency(discountedPrice)}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </span>
            <Badge variant="destructive">
              -{Math.round(product.discountPercentage)}% off
            </Badge>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-3">
        <Badge variant={stockVariant}>{stockLabel}</Badge>
        <span className="text-sm text-muted-foreground">
          {product.stock} units in stock
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Tags">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
