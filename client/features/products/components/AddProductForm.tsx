'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../shared/utils/validation';
import { useAddProduct, useUpdateProduct } from '../hooks';
import { Button, TextField } from '../../../shared/ui';

export const AddProductForm = ({ product }: { product?: any }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {}, // Используем данные продукта для редактирования
  });

  const { mutate: addProduct, isLoading: isAdding } = useAddProduct();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const onSubmit = (data: any) => {
    if (product) {
      updateProduct({ id: product.id, product: data }); // Если передан продукт, обновляем
    } else {
      addProduct(data); // Если продукта нет, добавляем новый
    }
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
      <Button type="submit" disabled={isAdding || isUpdating}>
        {product ? (isUpdating ? 'Updating...' : 'Update Product') : (isAdding ? 'Adding...' : 'Add Product')}
      </Button>
    </form>
  );
};
