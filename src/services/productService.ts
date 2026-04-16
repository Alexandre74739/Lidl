import { apiFetch } from "./api";

export interface Product {
  id: number;
  category_id?: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  weight?: number;
  image_url?: string;
  nutriscore?: string;
  is_active?: boolean;
  // Présent uniquement sur GET /product/:id (relation chargée)
  category?: {
    id: number;
    name: string;
  };
}

export const getProducts = (): Promise<Product[]> =>
  apiFetch<Product[]>("/product");

export const getProductById = (id: number): Promise<Product> =>
  apiFetch<Product>(`/product/${id}`);

export const getPromoProducts = (): Promise<Product[]> =>
  apiFetch<Product[]>("/product");