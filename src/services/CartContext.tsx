import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import {
  getOrCreateCart,
  fetchCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "./cartService";
import { getProducts } from "./productService";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  subtitle?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  getQuantity: (id: number) => number;
  setQuantity: (product: CartProduct, quantity: number) => void;
  count: number;
  total: number;
  savings: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Refs pour éviter les closures périmées dans setQuantity
  const cartIdRef = useRef<number | null>(null);
  const itemIdMapRef = useRef<Map<number, number>>(new Map()); // productId → backendItemId

  // ── Chargement du panier depuis le back ──────────────────────────────────────
  useEffect(() => {
    if (!user) {
      setItems([]);
      cartIdRef.current = null;
      itemIdMapRef.current = new Map();
      return;
    }

    setLoading(true);

    (async () => {
      try {
        const cart = await getOrCreateCart(user.id, user.storeId ?? 1);
        cartIdRef.current = cart.id;

        const backendItems = await fetchCartItems(cart.id);
        if (backendItems.length === 0) return;

        // Enrichissement avec les détails produits
        const products = await getProducts();
        const productMap = new Map(products.map((p) => [p.id, p]));

        const enriched: CartItem[] = [];
        const newMap = new Map<number, number>();

        for (const bi of backendItems) {
          const p = productMap.get(bi.product_id);
          if (!p) continue;
          enriched.push({
            id: bi.product_id,
            name: p.name,
            price: bi.unit_price,
            image: p.image_url ?? "",
            description: p.description,
            quantity: bi.quantity,
          });
          newMap.set(bi.product_id, bi.id);
        }

        setItems(enriched);
        itemIdMapRef.current = newMap;
      } catch (err) {
        console.error("[Cart] Erreur chargement panier :", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  // ── Mise à jour quantité ─────────────────────────────────────────────────────
  const setQuantity = (product: CartProduct, quantity: number) => {
    // Mise à jour optimiste de l'UI
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== product.id);
      const exists = prev.some((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity } : i
        );
      return [...prev, { ...product, quantity }];
    });

    // Si non connecté ou pas encore de panier créé : in-memory uniquement
    const cartId = cartIdRef.current;
    if (!user || cartId === null) return;

    const backendItemId = itemIdMapRef.current.get(product.id);

    if (quantity <= 0) {
      if (backendItemId !== undefined) {
        itemIdMapRef.current.delete(product.id);
        removeCartItem(backendItemId).catch((e) =>
          console.error("[Cart] Erreur suppression item :", e)
        );
      }
    } else if (backendItemId !== undefined) {
      updateCartItem(backendItemId, quantity).catch((e) =>
        console.error("[Cart] Erreur mise à jour item :", e)
      );
    } else {
      addCartItem(cartId, product.id, quantity, product.price)
        .then((bi) => {
          itemIdMapRef.current.set(product.id, bi.id);
        })
        .catch((e) => console.error("[Cart] Erreur ajout item :", e));
    }
  };

  // ── Calculs ──────────────────────────────────────────────────────────────────
  const getQuantity = (id: number) =>
    items.find((i) => i.id === id)?.quantity ?? 0;

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (i.originalPrice ?? i.price) * i.quantity,
    0
  );
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = subtotal - total;

  return (
    <CartContext.Provider
      value={{ items, getQuantity, setQuantity, count, total, savings, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
