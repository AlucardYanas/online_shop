'use client'
import { Product } from '@/shared/types';
import { useDeleteProduct } from '../hooks';
import { Button } from '@/shared/ui';

export const ProductCard = ({ product }: { product: Product }) => {
  const { mutate: deleteProduct, isLoading } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};
