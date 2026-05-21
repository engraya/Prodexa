import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addProduct } from '@/api/products'
import { PRODUCTS_QUERY_KEY } from '@/lib/constants'
import type { AddProductInput, Product } from '@/types'

function buildOptimisticProduct(input: AddProductInput): Product {
  return {
    id: Date.now(),
    title: input.title,
    description: input.description,
    category: input.category,
    price: input.price,
    discountPercentage: 0,
    rating: 0,
    stock: input.stock,
    tags: [],
    brand: input.brand,
    sku: 'PENDING',
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: input.stock > 0 ? 'In Stock' : 'Out of Stock',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: input.minimumOrderQuantity,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: '',
      qrCode: '',
    },
    images: [],
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.webp',
  }
}

export function useAddProduct() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addProduct,
    onMutate: async (newProduct) => {
      await qc.cancelQueries({ queryKey: PRODUCTS_QUERY_KEY })
      const previous = qc.getQueryData<Product[]>(PRODUCTS_QUERY_KEY)
      const optimistic = buildOptimisticProduct(newProduct)
      if (previous) {
        qc.setQueryData<Product[]>(PRODUCTS_QUERY_KEY, [optimistic, ...previous])
      }
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        qc.setQueryData<Product[]>(PRODUCTS_QUERY_KEY, context.previous)
      }
      toast.error('Failed to add product. Please try again.')
    },
    onSuccess: () => {
      toast.success('Product added successfully!')
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
    },
  })
}
