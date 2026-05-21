import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title?: string
  message?: string
  onReset?: () => void
}

export function EmptyState({
  title = 'No products found',
  message = 'Try adjusting your filters or search terms.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <PackageOpen className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-lg font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
      {onReset && (
        <Button onClick={onReset} variant="outline">
          Reset filters
        </Button>
      )}
    </div>
  )
}
