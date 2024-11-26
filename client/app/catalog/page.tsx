import { getProducts } from '@/features/products/api';
import { Filters, ProductCard } from '@/features/products/components';

export const dynamic = 'force-dynamic'; // Включение SSR

export default async function CatalogPage({ searchParams }: { searchParams: any }) {
  const productsResponse = await getProducts(searchParams); // API возвращает объект
  const products = productsResponse?.data || []; // Извлекаем массив продуктов

  return (
    <div>
      <Filters />
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
