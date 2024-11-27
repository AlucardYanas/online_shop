import { getProductById } from '@/features/products/api';
import { AddProductForm } from '@/features/products/components';

export const dynamic = 'force-dynamic'; 

export default async function ProductPage({ params }: { params: { id: string } }) {
  const {id} = params;
  
  if(!id) {
    return <p>Product ID not found in route parameters</p>;
  }
  const product = await getProductById(id);

  if(!product) {
    return <p>Product not found</p>
  }
  console.log(product);
  return (
    <div>
       <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Discounted Price: ${product.discountedPrice}</p>
      <p>SKU: {product.sku}</p>
      {product.photo && (
        <img
          src={product.photo}
          alt={product.name}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
      <h1>Edit Product</h1>
      <AddProductForm product={product} />
    </div>
  );
}
