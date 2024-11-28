import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/features/products/api';
import { FormDataProductWithId, Product } from '@/shared/types';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, FormDataProductWithId>({
    mutationFn: (formDataProduct: FormDataProductWithId) =>
      updateProduct(formDataProduct.id, formDataProduct),
    onMutate: async (updatedProductData: FormDataProductWithId) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData<{ data: Product[] }>([
        'products',
      ]);

      const tempProduct: Product = {
        ...updatedProductData,
        price: parseFloat(updatedProductData.price),
        discountedPrice: parseFloat(updatedProductData.discountedPrice),
        photo: updatedProductData.photo
          ? URL.createObjectURL(updatedProductData.photo)
          : '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ['products'],
        (old: { data: Product[] } | undefined) => {
          if (old) {
            return {
              ...old,
              data: old.data.map((product) =>
                product.id === updatedProductData.id ? tempProduct : product
              ),
            };
          }
          return old;
        }
      );

      return { previousProducts };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
