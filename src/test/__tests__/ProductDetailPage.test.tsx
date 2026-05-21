import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import ProductDetailPage from '@/pages/ProductDetailPage'

describe('ProductDetailPage', () => {
  it('renders product title in an h1', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/1'],
      route: '/product/:id',
    })

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'iPhone 15 Pro' })).toBeInTheDocument()
    })
  })

  it('renders formatted price with $ prefix', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/1'],
      route: '/product/:id',
    })

    await waitFor(() => {
      expect(screen.getByText(/\$999/)).toBeInTheDocument()
    })
  })

  it('renders createdAt date formatted as "Jan 10, 2024"', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/1'],
      route: '/product/:id',
    })

    await waitFor(() => {
      expect(screen.getByText('Jan 10, 2024')).toBeInTheDocument()
    })
  })

  it('renders a "Back to products" link', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/1'],
      route: '/product/:id',
    })

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /back to products/i })
      expect(link).toHaveAttribute('href', '/products')
    })
  })

  it('shows error state for unknown product id', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/9999'],
      route: '/product/:id',
    })

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows stock count', async () => {
    renderWithProviders(<ProductDetailPage />, {
      initialEntries: ['/product/1'],
      route: '/product/:id',
    })

    await waitFor(() => {
      expect(screen.getByText(/units in stock/)).toBeInTheDocument()
    })
  })
})
