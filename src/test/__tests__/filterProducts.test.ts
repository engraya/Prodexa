import { describe, it, expect } from 'vitest'
import { filterProducts } from '@/lib/filterProducts'
import { productFixtures } from '../mocks/fixtures'
import type { FilterState } from '@/types'

const defaultFilters: FilterState = {
  search: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
}

describe('filterProducts', () => {
  it('returns all products with no filters', () => {
    const { items, total } = filterProducts(productFixtures, defaultFilters, 1, 20)
    expect(total).toBe(productFixtures.length)
    expect(items).toHaveLength(productFixtures.length)
  })

  it('filters by category', () => {
    const { items, total } = filterProducts(
      productFixtures,
      { ...defaultFilters, category: 'smartphones' },
      1,
      20
    )
    expect(total).toBe(3) // iPhone, Samsung, Pixel
    items.forEach((p) => expect(p.category).toBe('smartphones'))
  })

  it('filters by brand', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, brand: 'Apple' },
      1,
      20
    )
    expect(items).toHaveLength(2)
    items.forEach((p) => expect(p.brand).toBe('Apple'))
  })

  it('filters by search term in title', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, search: 'macbook' },
      1,
      20
    )
    expect(items).toHaveLength(1)
    expect(items[0].title).toBe('MacBook Pro M3')
  })

  it('filters by max price', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, maxPrice: '100' },
      1,
      20
    )
    items.forEach((p) => expect(p.price).toBeLessThanOrEqual(100))
    expect(items.length).toBeGreaterThan(0)
  })

  it('filters by min and max price', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, minPrice: '300', maxPrice: '1000' },
      1,
      20
    )
    items.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(300)
      expect(p.price).toBeLessThanOrEqual(1000)
    })
  })

  it('combines category and brand filters', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, category: 'laptops', brand: 'Apple' },
      1,
      20
    )
    expect(items).toHaveLength(1)
    expect(items[0].title).toBe('MacBook Pro M3')
  })

  it('handles brand undefined in products', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, category: 'mobile-accessories', brand: '' },
      1,
      20
    )
    expect(items.length).toBeGreaterThan(0)
    // includes products with undefined brand without error
    const noBrand = items.filter((p) => !p.brand)
    expect(noBrand.length).toBeGreaterThan(0)
  })

  it('paginates correctly', () => {
    const { items, totalPages } = filterProducts(productFixtures, defaultFilters, 1, 3)
    expect(items).toHaveLength(3)
    expect(totalPages).toBe(Math.ceil(productFixtures.length / 3))
  })

  it('clamps page to totalPages when page is too high', () => {
    const { items } = filterProducts(productFixtures, defaultFilters, 999, 3)
    expect(items.length).toBeGreaterThan(0)
  })

  it('sorts by price ascending', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, sort: 'price-asc' },
      1,
      20
    )
    for (let i = 1; i < items.length; i++) {
      expect(items[i].price).toBeGreaterThanOrEqual(items[i - 1].price)
    }
  })

  it('sorts by price descending', () => {
    const { items } = filterProducts(
      productFixtures,
      { ...defaultFilters, sort: 'price-desc' },
      1,
      20
    )
    for (let i = 1; i < items.length; i++) {
      expect(items[i].price).toBeLessThanOrEqual(items[i - 1].price)
    }
  })

  it('returns empty items and total=0 when no products match', () => {
    const { items, total } = filterProducts(
      productFixtures,
      { ...defaultFilters, brand: 'NonExistentBrand' },
      1,
      20
    )
    expect(total).toBe(0)
    expect(items).toHaveLength(0)
  })
})
