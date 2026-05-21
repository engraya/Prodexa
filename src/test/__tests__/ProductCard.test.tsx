import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import { ProductCard } from '@/components/products/ProductCard'
import { productFixtures } from '../mocks/fixtures'

const iphone = productFixtures[0] // iPhone 15 Pro, brand: Apple, price: 999
const noBrand = productFixtures[5] // Generic Cable, brand: undefined

describe('ProductCard', () => {
  it('renders product title', () => {
    renderWithProviders(<ProductCard product={iphone} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument()
  })

  it('renders brand when defined', () => {
    renderWithProviders(<ProductCard product={iphone} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('renders "No brand" fallback when brand is undefined', () => {
    renderWithProviders(<ProductCard product={noBrand} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByText('No brand')).toBeInTheDocument()
  })

  it('renders a link to product detail', () => {
    renderWithProviders(<ProductCard product={iphone} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    const link = screen.getByRole('link', { name: /view details for iphone 15 pro/i })
    expect(link).toHaveAttribute('href', '/product/1')
  })

  it('renders stock badge', () => {
    renderWithProviders(<ProductCard product={noBrand} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByText('Low Stock')).toBeInTheDocument()
  })

  it('renders out of stock badge', () => {
    const outOfStock = productFixtures[6]
    renderWithProviders(<ProductCard product={outOfStock} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('has accessible article role with label', () => {
    renderWithProviders(<ProductCard product={iphone} />, {
      initialEntries: ['/products'],
      route: '/products',
    })
    expect(screen.getByRole('article', { name: 'iPhone 15 Pro' })).toBeInTheDocument()
  })
})
