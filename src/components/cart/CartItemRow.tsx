import Quantity from "../ui/Quantity";
import { useCart } from "../../services/CartContext";
import type { CartItem } from "../../services/CartContext";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { setQuantity } = useCart();
  const update = (q: number) => setQuantity(item, q);

  return (
    <article className="cart-item">
      <div className="cart-item__image-wrapper">
        <img src={item.image} alt={item.name} className="cart-item__image" />
      </div>

      <div className="cart-item__body">
        {item.subtitle && (
          <span className="cart-item__badge">{item.subtitle}</span>
        )}
        <h3 className="cart-item__name">{item.name}</h3>
        <div className="cart-item__footer">
          <Quantity value={item.quantity} onChange={update} />
          <div className="cart-item__prices">
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="cart-item__price--original">
                {item.originalPrice.toFixed(2).replace(".", ",")} €
              </span>
            )}
            <span className="cart-item__price">
              {item.price.toFixed(2).replace(".", ",")} €
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
