import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'MMM d, yyyy')
  } catch {
    return isoString
  }
}

export function getStockStatus(availabilityStatus: string): {
  label: string
  variant: 'default' | 'secondary' | 'destructive'
} {
  const s = availabilityStatus.toLowerCase()
  if (s.includes('out')) return { label: 'Out of Stock', variant: 'destructive' }
  if (s.includes('low')) return { label: 'Low Stock', variant: 'secondary' }
  return { label: 'In Stock', variant: 'default' }
}
