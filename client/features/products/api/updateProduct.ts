import api from '@/shared/utils/axiosInstance';

export const updateProduct = async (id: string, product: any) => {
  const { data } = await api.patch(`/products/${id}`, product);
  return data;
};
