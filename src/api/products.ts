import { BASE_URL } from '@/lib/constants'
import type { AddProductInput, Product, ProductsResponse } from '@/types'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await apiFetch<ProductsResponse>('/products?limit=200&skip=0')
  return data.products
}

export async function fetchProduct(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`)
}

export async function fetchCategories(): Promise<{ slug: string; name: string; url: string }[]> {
  return apiFetch('/products/categories')
}

export async function addProduct(input: AddProductInput): Promise<Product> {
  return apiFetch<Product>('/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}
