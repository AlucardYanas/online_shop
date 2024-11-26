import axios from '@/shared/utils/axiosInstance';

export const deleteProduct = async (id: string) => {
  const { data } = await axios.delete(`/products/${id}`);
  return data;
};
