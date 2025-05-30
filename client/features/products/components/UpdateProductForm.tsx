'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../shared/utils/validation';
import { useUpdateProduct } from '../hooks';
import { Button, TextField } from '../../../shared/ui';
import { useState } from 'react';
import { FormDataProductWithId } from '@/shared/types';

export const UpdateProductForm = ({ product }: { product: FormDataProductWithId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataProductWithId>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {},
  });

  const [file, setFile] = useState<File | null>(null);

  const { mutate: updateProduct, status: isUpdating } = useUpdateProduct();

  const onSubmit = (data: FormDataProductWithId) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('discountedPrice', data.discountedPrice);
    formData.append('sku', data.sku);

    if (file) {
      formData.append('photo', file);
    }

    
    updateProduct({ id: product.id, product: formData }); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        label="Price"
        type="number"
        {...register('price')}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <TextField
        label="Discounted Price"
        type="number"
        {...register('discountedPrice')}
        error={!!errors.discountedPrice}
        helperText={errors.discountedPrice?.message}
      />
      <TextField
        label="SKU"
        {...register('sku')}
        error={!!errors.sku}
        helperText={errors.sku?.message}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ margin: '10px 0' }}
      />
      <Button type="submit" disabled={isUpdating === 'pending'}>
        {isUpdating ? 'Updating...' : 'Update Product'}
      </Button>
    </form>
  );
};
