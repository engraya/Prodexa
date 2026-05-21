export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface ProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: ProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: ProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: ProductMeta
  images: string[]
  thumbnail: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'rating'

export interface FilterState {
  search: string
  category: string
  brand: string
  minPrice: string
  maxPrice: string
  sort: SortOption
}

export interface FilteredResult {
  items: Product[]
  total: number
  totalPages: number
}

export interface AuthUser {
  email: string
  name: string
}

export interface AddProductInput {
  title: string
  description: string
  price: number
  category: string
  brand?: string
  stock: number
  minimumOrderQuantity: number
}
