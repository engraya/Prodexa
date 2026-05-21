import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { Product } from '@/types'

interface BrandChartProps {
  products: Product[]
}

const COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
  '#ef4444', '#06b6d4', '#f97316', '#84cc16', '#6366f1',
]

export function BrandChart({ products }: BrandChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of products) {
      const brand = p.brand ?? 'Unknown'
      counts[brand] = (counts[brand] ?? 0) + 1
    }
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([brand, count]) => ({ brand, count }))
  }, [products])

  if (data.length === 0) return null

  return (
    <section aria-labelledby="brand-chart-heading">
      <h2 id="brand-chart-heading" className="text-lg font-semibold mb-4">
        Products by Brand
      </h2>
      <div className="rounded-lg border bg-card p-4">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="brand"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              angle={-40}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              label={{
                value: 'Products',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 12, fill: 'hsl(var(--muted-foreground))' },
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--popover-foreground))',
                fontSize: 13,
              }}
              formatter={(value: number) => [value, 'Products']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
