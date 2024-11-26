'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../api';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: any) =>
        (old || []).filter((p: any) => p.id !== id)
      );

      return { previousProducts };
    },
    onError: (err, id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      console.error('Error deleting product:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
