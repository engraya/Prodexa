import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { SORT_OPTIONS } from '@/lib/constants'
import type { SortOption } from '@/types'

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-select" className="text-sm text-muted-foreground shrink-0">
        Sort by
      </Label>
      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger id="sort-select" className="w-44" aria-label="Sort products">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
