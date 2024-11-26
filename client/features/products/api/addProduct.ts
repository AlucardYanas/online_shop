import axios from '@/shared/utils/axiosInstance';

export const addProduct = async (product: any) => {
  const { data } = await axios.post('/products', product);
  return data;
};
