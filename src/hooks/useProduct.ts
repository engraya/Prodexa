import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '@/api/products'

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
    enabled: !isNaN(id) && id > 0,
  })
}
