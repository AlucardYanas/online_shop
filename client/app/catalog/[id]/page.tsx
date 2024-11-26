import { getProductById } from '@/features/products/api';
import { AddProductForm } from '@/features/products/components';

export const dynamic = 'force-dynamic'; // Включение SSR

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await getProductById(params.id);

  return (
    <div>
      <h1>Edit Product</h1>
      <AddProductForm product={product} />
    </div>
  );
}
