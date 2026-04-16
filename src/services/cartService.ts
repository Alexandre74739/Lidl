import { apiFetch } from './api';

export interface BackendCart {
  id: number;
  client_id: number;
  store_id: number;
  status: string;
}

export interface BackendCartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}

export async function getOrCreateCart(
  clientId: number,
  storeId: number
): Promise<BackendCart> {
  const carts = await apiFetch<BackendCart[]>('/cart');
  const active = carts.find(
    (c) => c.client_id === clientId && c.status === 'ACTIVE'
  );
  if (active) return active;

  return apiFetch<BackendCart>('/cart', {
    method: 'POST',
    body: JSON.stringify({ client_id: clientId, store_id: storeId, status: 'ACTIVE' }),
  });
}

export async function fetchCartItems(cartId: number): Promise<BackendCartItem[]> {
  const all = await apiFetch<BackendCartItem[]>('/cart-item');
  return all.filter((item) => item.cart_id === cartId);
}

export async function addCartItem(
  cartId: number,
  productId: number,
  quantity: number,
  unitPrice: number
): Promise<BackendCartItem> {
  return apiFetch<BackendCartItem>('/cart-item', {
    method: 'POST',
    body: JSON.stringify({
      cart_id: cartId,
      product_id: productId,
      quantity,
      unit_price: unitPrice,
    }),
  });
}

export async function updateCartItem(itemId: number, quantity: number): Promise<void> {
  await apiFetch(`/cart-item/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(itemId: number): Promise<void> {
  await apiFetch(`/cart-item/${itemId}`, { method: 'DELETE' });
}
