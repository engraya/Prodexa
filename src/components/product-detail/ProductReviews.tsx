import type { ProductReview } from '@/types'
import { StarRating } from '@/components/shared/StarRating'
import { formatDate } from '@/lib/utils'

interface ProductReviewsProps {
  reviews: ProductReview[]
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-lg font-semibold mb-3">
          Customer Reviews
        </h2>
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-lg font-semibold mb-4">
        Customer Reviews ({reviews.length})
      </h2>
      <ul className="space-y-4" aria-label="Customer reviews">
        {reviews.map((review, i) => (
          <li key={i} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{review.reviewerName}</p>
                <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
              </div>
              <StarRating value={review.rating} />
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
