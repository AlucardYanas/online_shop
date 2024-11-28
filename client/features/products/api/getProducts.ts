import api from '@/shared/utils/axiosInstance';

export const getProducts = async (params: string) => {
  const { data } = await api.get('/products', { params });
  return data;
};
