import type { SortOption } from '@/types'

export const PAGE_SIZE = 10
export const BASE_URL = 'https://dummyjson.com'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
]

export const PRODUCTS_QUERY_KEY = ['products', 'all'] as const
