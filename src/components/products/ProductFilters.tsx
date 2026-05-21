import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { FilterState } from '@/types'

interface ProductFiltersProps {
  filters: FilterState
  categories: string[]
  brands: string[]
  onFilterChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

export function ProductFilters({
  filters,
  categories,
  brands,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-7 text-xs">
          Reset all
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-1.5">
        <Label htmlFor="filter-search">Search</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="filter-search"
            type="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-8"
            aria-label="Search products by name or brand"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="filter-category">Category</Label>
        <Select
          value={filters.category || '__all__'}
          onValueChange={(v) => onFilterChange('category', v === '__all__' ? '' : v)}
        >
          <SelectTrigger id="filter-category" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div className="space-y-1.5">
        <Label htmlFor="filter-brand">Brand</Label>
        <Select
          value={filters.brand || '__all__'}
          onValueChange={(v) => onFilterChange('brand', v === '__all__' ? '' : v)}
        >
          <SelectTrigger id="filter-brand" aria-label="Filter by brand">
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div className="space-y-1.5">
        <Label>Price range</Label>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Label htmlFor="filter-min-price" className="sr-only">
              Minimum price
            </Label>
            <Input
              id="filter-min-price"
              type="number"
              min={0}
              placeholder="Min $"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              aria-label="Minimum price"
            />
          </div>
          <span className="text-muted-foreground text-sm">–</span>
          <div className="flex-1">
            <Label htmlFor="filter-max-price" className="sr-only">
              Maximum price
            </Label>
            <Input
              id="filter-max-price"
              type="number"
              min={0}
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
