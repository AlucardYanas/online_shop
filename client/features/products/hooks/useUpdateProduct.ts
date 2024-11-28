import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: any }) => {
      console.log('Calling updateProduct with:', { id, product });
      return updateProduct(id, product);
    },
    onMutate: async ({ id, product }) => {
      console.log('Optimistically updating cache for product ID:', id);
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData(['products']);
      console.log('Previous products:', previousProducts);

      queryClient.setQueryData(['products'], (old: any) =>
        (old || []).map((p: any) => (p.id === id ? { ...p, ...product } : p))
      );

      return { previousProducts };
    },
    onError: (err, { id, product }, context) => {
      console.error('Error updating product:', err);
      if (context?.previousProducts) {
        console.log('Restoring previous cache state');
        queryClient.setQueryData(['products'], context.previousProducts);
      }
    },
    onSettled: () => {
      console.log('Invalidating cache for products');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
