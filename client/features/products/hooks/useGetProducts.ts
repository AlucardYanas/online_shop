import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';

export const useGetProducts = (params: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: (prev) => prev, 
  });
};
