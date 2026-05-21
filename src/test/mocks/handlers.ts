import { http, HttpResponse } from 'msw'
import { productFixtures, categoryFixtures } from './fixtures'

export const handlers = [
  http.get('https://dummyjson.com/products', () =>
    HttpResponse.json({
      products: productFixtures,
      total: productFixtures.length,
      skip: 0,
      limit: 200,
    })
  ),

  http.get('https://dummyjson.com/products/:id', ({ params }) => {
    const id = parseInt(params.id as string, 10)
    const product = productFixtures.find((p) => p.id === id)
    if (!product) return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    return HttpResponse.json(product)
  }),

  http.get('https://dummyjson.com/products/categories', () =>
    HttpResponse.json(categoryFixtures)
  ),

  http.post('https://dummyjson.com/products/add', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    return HttpResponse.json({
      id: 999,
      ...body,
      meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), barcode: '', qrCode: '' },
      images: [],
      thumbnail: '',
    })
  }),
]
