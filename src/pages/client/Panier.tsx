import { useCart } from "../../services/CartContext";
import CartItemRow from "../../components/cart/CartItemRow";
import CartSummary from "../../components/cart/CartSummary";
import CartEmpty from "../../components/cart/CartEmpty";

export default function Panier() {
  const { items, count } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart">
        <CartEmpty />
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart__inner container">
        <div className="cart__left">
          <div className="cart__header">
            <h1 className="cart__title">Mon Panier</h1>
            <p className="cart__subtitle">
              {count} article{count > 1 ? "s" : ""} sélectionné{count > 1 ? "s" : ""} pour vous
            </p>
          </div>

          <ul className="cart__list">
            {items.map((item) => (
              <li key={item.id}>
                <CartItemRow item={item} />
              </li>
            ))}
          </ul>
        </div>

        <CartSummary />
      </div>
    </main>
  );
}
