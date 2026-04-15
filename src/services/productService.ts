import { apiFetch } from './api';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  weight?: number;
  image_url?: string;
  nutriscore?: string;
  is_active?: boolean;
  category?: {
    id: number;
    name: string;
  };
}

export const getProducts = (): Promise<Product[]> => apiFetch<Product[]>('/product');

export const getProductById = (id: number): Promise<Product> =>
  apiFetch<Product>(`/product/${id}`);
