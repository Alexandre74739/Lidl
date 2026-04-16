import { ShieldCheck, Zap, HeadphonesIcon, PartyPopper } from "lucide-react";
import { useCart } from "../../services/CartContext";

export default function CartSummary() {
  const { total, savings } = useCart();
  const subtotal = total + savings;

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Résumé de la commande</h2>

      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
        </div>
        <div className="cart-summary__row">
          <span>Frais de préparation</span>
          <span className="cart-summary__free">OFFERTS</span>
        </div>
        {savings > 0 && (
          <div className="cart-summary__row cart-summary__row--savings">
            <span><PartyPopper size={14} className="cart-summary__savings-icon" /> Vos économies</span>
            <span>- {savings.toFixed(2).replace(".", ",")} €</span>
          </div>
        )}
      </div>

      <div className="cart-summary__total">
        <span>TOTAL À PAYER</span>
        <strong>{total.toFixed(2).replace(".", ",")} €</strong>
      </div>

      <button className="cart-summary__cta">VALIDER MON PANIER</button>

      <ul className="cart-summary__badges">
        <li><ShieldCheck size={14} /> Paiement 100% sécurisé</li>
        <li><Zap size={14} /> Retrait express</li>
        <li><HeadphonesIcon size={14} /> Service client local</li>
      </ul>
    </aside>
  );
}
