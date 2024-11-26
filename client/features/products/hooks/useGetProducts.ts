import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';

export const useGetProducts = (filters: any) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    placeholderData: (prev) => prev,
    staleTime: 0, 
    refetchOnWindowFocus: false, 
  });
};
