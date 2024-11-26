import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: any }) =>
      updateProduct(id, product),
    onMutate: async ({ id, product }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: any) =>
        (old || []).map((p: any) => (p.id === id ? { ...p, ...product } : p))
      );

      return { previousProducts };
    },
    onError: (err, { id, product }, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      console.error('Error updating product:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
