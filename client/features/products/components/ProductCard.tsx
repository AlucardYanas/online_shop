'use client'
import { Product } from '@/shared/types';
import { useDeleteProduct } from '../hooks';
import { Button } from '@/shared/ui';
import Link from 'next/link';

export const ProductCard = ({ product }: { product: Product }) => {
  const { mutate: deleteProduct, isLoading } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <Link href={`/catalog/${product.id}`} passHref>
       
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
      
      </Link>
      <Button onClick={handleDelete} disabled={isLoading} variant="outlined" color="error" style={{ marginTop: '10px' }}>
        Delete
      </Button>
    </div>
  );
};
