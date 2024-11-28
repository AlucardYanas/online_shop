export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  sku: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export type FormDataProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'photo' | 'price' | 'discountedPrice'> & {
  price: string; 
  discountedPrice: string; 
  photo?: File; 
};

export interface FormDataProductWithId extends FormDataProduct {
  id: string;
}

