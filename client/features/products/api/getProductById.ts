import api from '@/shared/utils/axiosInstance';

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
