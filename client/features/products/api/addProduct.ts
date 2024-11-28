import axios from '@/shared/utils/axiosInstance';

export const addProduct = async (product: any) => {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  formData.append('discountedPrice', product.discountedPrice);
  formData.append('sku', product.sku);

  if (product.photo) {
    formData.append('photo', product.photo); 
  }

  const { data } = await axios.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return data;
};
