import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/features/products/api';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: any) => [
        ...(old || []),
        newProduct,
      ]);

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      console.error('Error adding product:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
