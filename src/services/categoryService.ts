import { apiFetch } from './api';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const getCategories = (): Promise<Category[]> => apiFetch<Category[]>('/category');

export const getCategoryById = (id: number): Promise<Category> =>
  apiFetch<Category>(`/category/${id}`);
