import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts } from '@/api/products'
import { PRODUCTS_QUERY_KEY } from '@/lib/constants'

export function useAllProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchAllProducts,
  })
}
