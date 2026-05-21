import type { Product } from '@/types'

function makeProduct(overrides: Partial<Product> & { id: number; title: string }): Product {
  return {
    description: 'A great product for everyday use',
    category: 'electronics',
    price: 99.99,
    discountPercentage: 0,
    rating: 4.2,
    stock: 50,
    tags: ['featured'],
    brand: 'TestBrand',
    sku: `SKU-${overrides.id}`,
    weight: 200,
    dimensions: { width: 10, height: 5, depth: 2 },
    warrantyInformation: '1 year',
    shippingInformation: 'Ships in 1-2 days',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        rating: 5,
        comment: 'Excellent!',
        date: '2024-01-15T00:00:00.000Z',
        reviewerName: 'Alice',
        reviewerEmail: 'alice@example.com',
      },
    ],
    returnPolicy: '30 days',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-01-10T00:00:00.000Z',
      updatedAt: '2024-03-20T00:00:00.000Z',
      barcode: '1234567890',
      qrCode: 'https://example.com/qr',
    },
    images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.webp'],
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.webp',
    ...overrides,
  }
}

export const productFixtures: Product[] = [
  makeProduct({ id: 1, title: 'iPhone 15 Pro', category: 'smartphones', brand: 'Apple', price: 999, rating: 4.8 }),
  makeProduct({ id: 2, title: 'Samsung Galaxy S24', category: 'smartphones', brand: 'Samsung', price: 799, rating: 4.5 }),
  makeProduct({ id: 3, title: 'MacBook Pro M3', category: 'laptops', brand: 'Apple', price: 1999, rating: 4.9 }),
  makeProduct({ id: 4, title: 'Dell XPS 15', category: 'laptops', brand: 'Dell', price: 1299, rating: 4.3 }),
  makeProduct({ id: 5, title: 'Sony WH-1000XM5', category: 'mobile-accessories', brand: 'Sony', price: 349, rating: 4.7 }),
  makeProduct({ id: 6, title: 'Generic Cable', category: 'mobile-accessories', brand: undefined, price: 9.99, stock: 5, availabilityStatus: 'Low Stock' }),
  makeProduct({ id: 7, title: 'Wireless Earbuds', category: 'mobile-accessories', brand: undefined, price: 49.99, stock: 0, availabilityStatus: 'Out of Stock' }),
  makeProduct({ id: 8, title: 'Pixel 8', category: 'smartphones', brand: 'Google', price: 699, rating: 4.4, meta: { createdAt: '2023-06-01T00:00:00.000Z', updatedAt: '2023-06-01T00:00:00.000Z', barcode: '999', qrCode: '' } }),
]

export const categoryFixtures = [
  { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
  { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' },
  { slug: 'mobile-accessories', name: 'Mobile Accessories', url: 'https://dummyjson.com/products/category/mobile-accessories' },
]
