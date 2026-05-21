import { useMemo, useState } from 'react'
import { Filter, Plus } from 'lucide-react'
import { useAllProducts } from '@/hooks/useAllProducts'
import { useProductFilters } from '@/hooks/useProductFilters'
import { filterProducts } from '@/lib/filterProducts'
import { PAGE_SIZE } from '@/lib/constants'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductSort } from '@/components/products/ProductSort'
import { Pagination } from '@/components/products/Pagination'
import { ActiveFilterBadges } from '@/components/products/ActiveFilterBadges'
import { PageTitle } from '@/components/shared/PageTitle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { AddProductForm } from '@/components/forms/AddProductForm'
import type { FilterState, SortOption } from '@/types'

export default function ProductsPage() {
  const { data: products = [], isLoading, error, refetch } = useAllProducts()
  const { filters, page, setFilter, resetFilters, hasActiveFilters } = useProductFilters()
  const [addOpen, setAddOpen] = useState(false)
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false)

  const uniqueCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  )

  const uniqueBrands = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.brand).filter(Boolean) as string[])).sort(),
    [products]
  )

  const { items, total, totalPages } = useMemo(
    () => filterProducts(products, filters, page),
    [products, filters, page]
  )

  function handleFilterChange(key: keyof FilterState, value: string) {
    setFilter(key, value)
  }

  function handleRemoveBadge(key: keyof FilterState) {
    setFilter(key, key === 'sort' ? 'newest' : '')
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <PageTitle>Products</PageTitle>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-1">
              {total} {total === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>
        <Button onClick={() => setAddOpen(true)} className="shrink-0 gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add product
        </Button>
      </div>

      {/* Mobile filters sheet trigger */}
      <div className="flex items-center gap-3 lg:hidden">
        <Sheet open={filtersSheetOpen} onOpenChange={setFiltersSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProductFilters
                filters={filters}
                categories={uniqueCategories}
                brands={uniqueBrands}
                onFilterChange={handleFilterChange}
                onReset={() => { resetFilters(); setFiltersSheetOpen(false) }}
              />
            </div>
          </SheetContent>
        </Sheet>

        <ProductSort
          value={filters.sort}
          onChange={(v: SortOption) => setFilter('sort', v)}
        />
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <ActiveFilterBadges filters={filters} onRemove={handleRemoveBadge} />
      )}

      {/* Main layout: sidebar filters + product grid */}
      <div className="flex gap-6">
        {/* Desktop filter panel */}
        <aside className="hidden lg:block w-60 shrink-0 space-y-4">
          <ProductFilters
            filters={filters}
            categories={uniqueCategories}
            brands={uniqueBrands}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </aside>

        {/* Products area */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Sort (desktop only) */}
          <div className="hidden lg:flex justify-end">
            <ProductSort
              value={filters.sort}
              onChange={(v: SortOption) => setFilter('sort', v)}
            />
          </div>

          <ProductGrid
            products={items}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
            onReset={resetFilters}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            onPageChange={(p) => setFilter('page', String(p))}
          />
        </div>
      </div>

      <AddProductForm open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
