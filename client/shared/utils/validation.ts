import { z } from 'zod';


export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.preprocess((val) => parseFloat(val as string), z.number().positive('Price must be positive')),
  discountedPrice: z
    .preprocess((val) => (val === undefined ? undefined : parseFloat(val as string)), z.number().positive().optional()),
  sku: z.string().min(1, 'SKU is required'),
  photo: z.any().optional(), 
});


export const formDataProductSchema = productSchema.extend({
  photo: z.instanceof(File).optional(), 
});

export const productWithIdSchema = productSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export const validateProduct = (data: unknown) => {
  const result = productSchema.safeParse(data);

  if (!result.success) {

    console.error('Validation Errors:', result.error.format());
    return { success: false, errors: result.error.format() };
  }


  console.log('Validated Data:', result.data);
  return { success: true, data: result.data };
};
