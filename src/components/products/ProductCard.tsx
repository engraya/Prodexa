import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/shared/StarRating'
import { formatCurrency, getStockStatus } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { label: stockLabel, variant: stockVariant } = getStockStatus(product.availabilityStatus)
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <article aria-label={product.title} className="group rounded-lg border bg-card shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <Link
        to={`/product/${product.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-label={`View details for ${product.title}`}
      >
        <div className="relative h-48 bg-muted overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 right-2 rounded-full bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div>
            <p className="text-xs text-muted-foreground truncate">{product.brand ?? 'No brand'}</p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 mt-0.5">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{formatCurrency(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <StarRating value={product.rating} showValue />
            <Badge variant={stockVariant} className="text-xs">
              {stockLabel}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
        </div>
      </Link>
    </article>
  )
}
