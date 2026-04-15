import { apiGet } from '../api/client';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_active?: boolean;
  category?: {
    id: number;
    name: string;
  };
}

export const getProducts = (): Promise<Product[]> => apiGet<Product[]>('/product');

export const getProductById = (id: number): Promise<Product> =>
  apiGet<Product>(`/product/${id}`);
