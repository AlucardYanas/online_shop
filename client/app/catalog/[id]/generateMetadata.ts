import { getProductById } from '@/features/products/api';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: product } = await getProductById(params.id);

  return {
    title: `${product.name} - My Shop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.photo],
    },
  };
}
