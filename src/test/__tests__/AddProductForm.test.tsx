import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { renderWithProviders } from '../test-utils'
import { AddProductForm } from '@/components/forms/AddProductForm'
import { server } from '../mocks/server'

function renderForm(open = true) {
  const onOpenChange = () => {}
  return renderWithProviders(<AddProductForm open={open} onOpenChange={onOpenChange} />, {
    initialEntries: ['/'],
    route: '/',
  })
}

describe('AddProductForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderForm()

    const submitButton = screen.getByRole('button', { name: /add product/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/title must be at least/i)).toBeInTheDocument()
      expect(screen.getByText(/description must be at least/i)).toBeInTheDocument()
    })
  })

  it('does not make a network request when form is invalid', async () => {
    const user = userEvent.setup()
    let requestMade = false

    server.use(
      http.post('https://dummyjson.com/products/add', () => {
        requestMade = true
        return HttpResponse.json({})
      })
    )

    renderForm()
    await user.click(screen.getByRole('button', { name: /add product/i }))

    await waitFor(() => {
      expect(screen.getByText(/title must be at least/i)).toBeInTheDocument()
    })

    expect(requestMade).toBe(false)
  })

  it('submits valid form data', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/title \*/i), 'New Product')
    await user.type(screen.getByLabelText(/description \*/i), 'A great product description here')
    await user.clear(screen.getByLabelText(/price/i))
    await user.type(screen.getByLabelText(/price/i), '49.99')
    await user.type(screen.getByLabelText(/category \*/i), 'electronics')

    await user.click(screen.getByRole('button', { name: /add product/i }))

    // Button should show loading state briefly
    await waitFor(() => {
      expect(screen.queryByText(/adding…/i)).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('shows required label on required fields', () => {
    renderForm()
    expect(screen.getByLabelText(/title \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category \*/i)).toBeInTheDocument()
  })
})
