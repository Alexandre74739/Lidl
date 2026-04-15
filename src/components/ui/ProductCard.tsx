import { Plus } from "lucide-react";
import Quantity from "./Quantity";
import { useCart } from "../../services/CartContext";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: number;
  promotion?: string;
  subtitle?: string;
}

export default function ProductCard({
  id,
  image,
  name,
  description,
  price,
  promotion,
  subtitle,
}: ProductCardProps) {
  const { getQuantity, setQuantity } = useCart();
  const quantity = getQuantity(id);
  const update = (q: number) => setQuantity({ id, name, price, image }, q);

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        {promotion && <span className="product-card__badge">{promotion}</span>}
        <img src={image} alt={name} className="product-card__image" />
      </div>

      <div className="product-card__body">
        {subtitle && <span className="product-card__subtitle">{subtitle}</span>}
        <h3 className="product-card__name">{name}</h3>
        {description && (
          <p className="product-card__description">{description}</p>
        )}

        <div className="product-card__footer">
          <span className="product-card__price">
            {price.toFixed(2).replace(".", ",")}€
          </span>

          {quantity === 0 ? (
            <button
              className="product-card__add"
              onClick={() => update(1)}
              aria-label={`Ajouter ${name} au panier`}
            >
              <Plus size={13} aria-hidden />
            </button>
          ) : (
            <Quantity value={quantity} onChange={update} />
          )}
        </div>
      </div>
    </article>
  );
}
