import { z } from 'zod'

export const addProductSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description too long'),
  price: z.coerce.number().positive('Price must be positive').max(100_000, 'Price too high'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  stock: z.coerce.number().int('Must be a whole number').min(0, 'Stock cannot be negative'),
  minimumOrderQuantity: z.coerce.number().int().positive('Must be at least 1'),
})

export type AddProductFormValues = z.infer<typeof addProductSchema>
