import { FormDataProduct} from '@/shared/types';
import axios from '@/shared/utils/axiosInstance';

export const addProduct = async (product: FormDataProduct) => {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price.toString()); 
  formData.append('discountedPrice', product.discountedPrice.toString()); 
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
