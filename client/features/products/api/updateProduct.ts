import { FormDataProductWithId } from '@/shared/types';
import api from '@/shared/utils/axiosInstance';

export const updateProduct = async (id: string, product: FormDataProductWithId) => {
  console.log('Preparing FormData for product:', product);

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price); 
  formData.append('discountedPrice', product.discountedPrice); 
  formData.append('sku', product.sku);

  if (product.photo) {
    formData.append('photo', product.photo); 
  }

  console.log('Sending FormData:', formData);

  const { data } = await api.patch(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });

  console.log('Server response:', data);

  return data;
};
