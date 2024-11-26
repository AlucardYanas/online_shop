import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  discountedPrice: z.number().positive().optional(),
  sku: z.string().min(1, 'SKU is required'),
  photo: z.string().url().optional(),
});
