import { ShoppingCart } from "lucide-react";
import Quantity from "../ui/Quantity";
import { useCart } from "../../services/CartContext";

interface FruitCardProps {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  promotion?: string;
}

export default function FruitCard({
  id,
  image,
  name,
  description,
  price,
  originalPrice,
  promotion,
}: FruitCardProps) {
  const { getQuantity, setQuantity } = useCart();
  const quantity = getQuantity(id);
  const update = (q: number) => setQuantity({ id, name, price, image }, q);

  return (
    <article className="fruit-card">
      <div className="fruit-card__image-wrapper">
        {promotion && <span className="fruit-card__badge">{promotion}</span>}
        <img src={image} alt={name} className="fruit-card__image" />
      </div>

      <div className="fruit-card__body">
        <h3 className="fruit-card__name">{name}</h3>
        {description && (
          <p className="fruit-card__description">{description}</p>
        )}

        <div className="fruit-card__footer">
          <div className="fruit-card__price-group">
            <span className={`fruit-card__price${originalPrice ? " fruit-card__price--promo" : ""}`}>
              {price.toFixed(2).replace(".", ",")}€
            </span>
            {originalPrice && (
              <span className="fruit-card__price--original">
                {originalPrice.toFixed(2).replace(".", ",")}€
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              className="fruit-card__add"
              onClick={() => update(1)}
              aria-label={`Ajouter ${name} au panier`}
            >
              <ShoppingCart size={16} aria-hidden />
            </button>
          ) : (
            <Quantity value={quantity} onChange={update} />
          )}
        </div>
      </div>
    </article>
  );
}
