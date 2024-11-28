'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../shared/utils/validation';
import { useAddProduct } from '../hooks';
import { Button, TextField } from '../../../shared/ui';
import { useState } from 'react';

export const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  });

  const [file, setFile] = useState<File | null>(null);

  const { mutate: addProduct, isLoading: isAdding } = useAddProduct();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (file) {
      formData.append('photo', file);
    }

    addProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
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
      <Button type="submit" disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  );
};
