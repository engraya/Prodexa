import { useSearchParams } from 'react-router-dom'
import type { FilterState, SortOption } from '@/types'

export function useProductFilters() {
  const [params, setParams] = useSearchParams()

  const filters: FilterState = {
    search: params.get('q') ?? '',
    category: params.get('category') ?? '',
    brand: params.get('brand') ?? '',
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
    sort: (params.get('sort') as SortOption) ?? 'newest',
  }

  const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1)

  function setFilter(key: keyof FilterState | 'page', value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) {
          next.set(key === 'search' ? 'q' : key, value)
        } else {
          next.delete(key === 'search' ? 'q' : key)
        }
        if (key !== 'page') next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  function resetFilters() {
    setParams({}, { replace: true })
  }

  const hasActiveFilters =
    !!filters.search ||
    !!filters.category ||
    !!filters.brand ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    filters.sort !== 'newest'

  return { filters, page, setFilter, resetFilters, hasActiveFilters }
}
