import { Plus } from "lucide-react";
import { Link } from "react-router";
import Quantity from "./Quantity";
import { useCart } from "../../services/CartContext";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  promotion?: string;
  subtitle?: string;
}

export default function ProductCard({
  id,
  image,
  name,
  description,
  price,
  originalPrice,
  promotion,
  subtitle,
}: ProductCardProps) {
  const { getQuantity, setQuantity } = useCart();
  const quantity = getQuantity(id);
  const update = (q: number) => setQuantity({ id, name, price, image }, q);

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-card__link" tabIndex={-1} aria-hidden>
        <div className="product-card__image-wrapper">
          {promotion && <span className="product-card__badge">{promotion}</span>}
          <img src={image} alt={name} className="product-card__image" />
        </div>
      </Link>

      <div className="product-card__body">
        {subtitle && <span className="product-card__subtitle">{subtitle}</span>}
        <Link to={`/product/${id}`} className="product-card__name-link">
          <h3 className="product-card__name">{name}</h3>
        </Link>
        {description && (
          <p className="product-card__description">{description}</p>
        )}

        <div className="product-card__footer">
          <div className="product-card__price-group">
            {originalPrice && (
              <span className="product-card__price--original">
                {originalPrice.toFixed(2).replace(".", ",")}€
              </span>
            )}
            <span className={`product-card__price${originalPrice ? " product-card__price--promo" : ""}`}>
              {price.toFixed(2).replace(".", ",")}€
            </span>
          </div>

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
