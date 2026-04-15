import { createContext, useContext, useState } from "react";

interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends CartProduct {
  quantity: number;
}

interface CartContextType {
  getQuantity: (id: number) => number;
  setQuantity: (product: CartProduct, quantity: number) => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getQuantity = (id: number) =>
    items.find((i) => i.id === id)?.quantity ?? 0;

  const setQuantity = (product: CartProduct, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== product.id);
      const exists = prev.some((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity } : i
        );
      return [...prev, { ...product, quantity }];
    });
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ getQuantity, setQuantity, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
