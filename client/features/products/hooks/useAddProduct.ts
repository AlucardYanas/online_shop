import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/features/products/api';
import { FormDataProduct, Product } from '@/shared/types';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, FormDataProduct>({
    mutationFn: (formDataProduct: FormDataProduct) => addProduct(formDataProduct),
    onMutate: async (newProduct: FormDataProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData<{ data: Product[] }>(['products']);

      const tempProduct: Product = {
        ...newProduct,
        id: `${Date.now()}`, 
        price: parseFloat(newProduct.price),
        discountedPrice: parseFloat(newProduct.discountedPrice),
        photo: newProduct.photo ? URL.createObjectURL(newProduct.photo) : '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(['products'], (old: { data: Product[] } | undefined) => {
        if (old) {
          return {
            ...old,
            data: [...old.data, tempProduct],
          };
        }
        return old;
      });

      return { previousProducts };
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
