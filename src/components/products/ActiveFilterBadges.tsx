import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { FilterState } from '@/types'
import { SORT_OPTIONS } from '@/lib/constants'

interface ActiveFilterBadgesProps {
  filters: FilterState
  onRemove: (key: keyof FilterState, value?: string) => void
}

export function ActiveFilterBadges({ filters, onRemove }: ActiveFilterBadgesProps) {
  const badges: { key: keyof FilterState; label: string }[] = []

  if (filters.search) badges.push({ key: 'search', label: `"${filters.search}"` })
  if (filters.category) badges.push({ key: 'category', label: filters.category })
  if (filters.brand) badges.push({ key: 'brand', label: filters.brand })
  if (filters.minPrice) badges.push({ key: 'minPrice', label: `Min $${filters.minPrice}` })
  if (filters.maxPrice) badges.push({ key: 'maxPrice', label: `Max $${filters.maxPrice}` })
  if (filters.sort !== 'newest') {
    const sortLabel = SORT_OPTIONS.find((o) => o.value === filters.sort)?.label ?? filters.sort
    badges.push({ key: 'sort', label: sortLabel })
  }

  if (badges.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" aria-label="Active filters">
      {badges.map(({ key, label }) => (
        <Badge key={key} variant="secondary" className="gap-1 pr-1">
          {label}
          <button
            onClick={() => onRemove(key)}
            aria-label={`Remove filter: ${label}`}
            className="ml-1 rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring p-0.5"
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </Badge>
      ))}
    </div>
  )
}
