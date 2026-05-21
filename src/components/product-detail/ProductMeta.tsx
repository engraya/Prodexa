import type { Product } from '@/types'
import { formatDate } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface ProductMetaProps {
  product: Product
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  )
}

export function ProductMeta({ product }: ProductMetaProps) {
  return (
    <section aria-labelledby="product-meta-heading" className="space-y-3">
      <h2 id="product-meta-heading" className="text-lg font-semibold">
        Product Details
      </h2>
      <dl className="divide-y divide-border">
        <MetaRow label="SKU" value={product.sku} />
        <MetaRow label="Weight" value={`${product.weight}g`} />
        <MetaRow
          label="Dimensions"
          value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} mm`}
        />
        <MetaRow label="Min. order qty" value={product.minimumOrderQuantity} />
        <MetaRow label="Warranty" value={product.warrantyInformation} />
        <MetaRow label="Shipping" value={product.shippingInformation} />
        <MetaRow label="Return policy" value={product.returnPolicy} />
      </dl>
      <Separator />
      <dl className="divide-y divide-border">
        <MetaRow label="Added" value={formatDate(product.meta.createdAt)} />
        <MetaRow label="Updated" value={formatDate(product.meta.updatedAt)} />
      </dl>
    </section>
  )
}
