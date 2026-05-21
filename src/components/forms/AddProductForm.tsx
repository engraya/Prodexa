import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addProductSchema, type AddProductFormValues } from '@/lib/validations'
import { useAddProduct } from '@/hooks/useAddProduct'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FieldErrorProps {
  message?: string
  id: string
}

function FieldError({ message, id }: FieldErrorProps) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-xs text-destructive mt-1">
      {message}
    </p>
  )
}

export function AddProductForm({ open, onOpenChange }: AddProductFormProps) {
  const { mutate, isPending } = useAddProduct()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      stock: 0,
      minimumOrderQuantity: 1,
    },
  })

  function onSubmit(values: AddProductFormValues) {
    mutate(values, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  function handleOpenChange(open: boolean) {
    if (!open) reset()
    onOpenChange(open)
  }

  const fields = [
    { id: 'title', label: 'Title *', type: 'text', error: errors.title },
    { id: 'description', label: 'Description *', type: 'text', error: errors.description },
    { id: 'price', label: 'Price ($) *', type: 'number', error: errors.price },
    { id: 'category', label: 'Category *', type: 'text', error: errors.category },
    { id: 'brand', label: 'Brand', type: 'text', error: errors.brand },
    { id: 'stock', label: 'Stock *', type: 'number', error: errors.stock },
    {
      id: 'minimumOrderQuantity',
      label: 'Min. order qty *',
      type: 'number',
      error: errors.minimumOrderQuantity,
    },
  ] as const

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>
            Fill in the product details below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-2">
          {fields.map(({ id, label, type, error }) => (
            <div key={id} className="space-y-1">
              <Label htmlFor={`product-${id}`}>{label}</Label>
              <Input
                id={`product-${id}`}
                type={type}
                step={type === 'number' ? 'any' : undefined}
                aria-describedby={error ? `product-${id}-error` : undefined}
                aria-invalid={!!error}
                {...register(id as keyof AddProductFormValues)}
              />
              <FieldError message={error?.message} id={`product-${id}-error`} />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding…' : 'Add product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
