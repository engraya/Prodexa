import type { FilterState, FilteredResult, Product } from '@/types'
import { PAGE_SIZE } from './constants'

export function filterProducts(
  products: Product[],
  filters: FilterState,
  page: number,
  pageSize = PAGE_SIZE
): FilteredResult {
  let result = products

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand ?? '').toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters.brand) {
    result = result.filter((p) => (p.brand ?? '') === filters.brand)
  }

  const min = parseFloat(filters.minPrice)
  const max = parseFloat(filters.maxPrice)
  if (!isNaN(min)) result = result.filter((p) => p.price >= min)
  if (!isNaN(max)) result = result.filter((p) => p.price <= max)

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case 'newest':
        return new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
      case 'oldest':
        return new Date(a.meta.createdAt).getTime() - new Date(b.meta.createdAt).getTime()
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const total = result.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * pageSize
  const items = result.slice(start, start + pageSize)

  return { items, total, totalPages }
}
