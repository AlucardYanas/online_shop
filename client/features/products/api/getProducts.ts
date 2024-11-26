import api from '@/shared/utils/axiosInstance';

export const getProducts = async (params: any) => {
  const { data } = await api.get('/products', { params });
  return data;
};
