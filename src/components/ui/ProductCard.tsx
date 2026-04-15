import { useState } from "react";
import Quantity from "./Quantity";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  promotion?: string;
}

export default function ProductCard({
  image,
  name,
  description,
  price,
  promotion,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        {promotion && <span className="product-card__badge">{promotion}</span>}
        <img src={image} alt={name} className="product-card__image" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            {price.toFixed(2).replace(".", ",")}€
          </span>

          {quantity === 0 ? (
            <button
              className="product-card__add"
              onClick={() => setQuantity(1)}
              aria-label={`Ajouter ${name} au panier`}
            >
              Ajouter
            </button>
          ) : (
            <Quantity value={quantity} onChange={setQuantity} />
          )}
        </div>
      </div>
    </article>
  );
}