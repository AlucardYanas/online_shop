'use client';

import { AddProductForm, Filters, ProductCard } from '@/features/products/components';
import { useGetProducts } from '@/features/products/hooks';
import { useFilters } from '@/features/products/hooks';
import { Product } from '@/shared/types';

export default function CatalogPage() {
  const { filters, updateFilter, applyFilters } = useFilters();
  const { data: productsResponse, isLoading, isError } = useGetProducts(filters);

  const products = productsResponse?.data || [];
  console.log(filters);

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <Filters
          filters={filters}
          onFilter={applyFilters}
          onUpdateFilter={updateFilter}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading products</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          <AddProductForm />
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

