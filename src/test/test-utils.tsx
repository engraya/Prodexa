import type { ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

interface WrapperOptions {
  initialEntries?: string[]
  route?: string
}

function createWrapper({ initialEntries = ['/'], route = '/' }: WrapperOptions = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path={route} element={children} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>
    )
  }
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: RenderOptions & WrapperOptions = {}
) {
  const { initialEntries, route, ...renderOptions } = options
  const Wrapper = createWrapper({ initialEntries, route })
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export { renderWithProviders as render }
export * from '@testing-library/react'
