import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  size?: 'sm' | 'md'
  showValue?: boolean
  className?: string
}

export function StarRating({ value, size = 'sm', showValue = false, className }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value)
    const partial = !filled && i < value
    return { filled, partial }
  })

  const iconClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'

  return (
    <span
      role="img"
      aria-label={`Rating: ${value.toFixed(1)} out of 5`}
      className={cn('inline-flex items-center gap-0.5', className)}
    >
      {stars.map(({ filled, partial }, i) => (
        <Star
          key={i}
          className={cn(iconClass, {
            'fill-yellow-400 text-yellow-400': filled,
            'fill-yellow-200 text-yellow-400': partial,
            'fill-none text-muted-foreground': !filled && !partial,
          })}
          aria-hidden="true"
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">{value.toFixed(1)}</span>
      )}
    </span>
  )
}
