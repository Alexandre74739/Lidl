import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export default function CartEmpty() {
  return (
    <div className="cart-empty">
      <ShoppingCart size={64} className="cart-empty__icon" />
      <h2 className="cart-empty__title">Votre panier est vide</h2>
      <p className="cart-empty__subtitle">
        Ajoutez des articles depuis nos rayons pour commencer votre commande.
      </p>
      <Link to="/rayons" className="cart-empty__cta">
        Découvrir les rayons
      </Link>
    </div>
  );
}
