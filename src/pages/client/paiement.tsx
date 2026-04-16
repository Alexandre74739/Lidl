import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../services/CartContext";
import {
  Store,
  Car,
  Tag,
  Lock,
  CreditCard,
  Wallet,
  Info,
} from "lucide-react";

type RetractMode = "collect" | "drive";
type PaymentMethod = "card" | "pay";

interface TimeSlot {
  label: string;
  full?: boolean;
}

const DAYS = ["Aujourd'hui", "Demain", "Sam. 24 Oct."];

const SLOTS: TimeSlot[] = [
  { label: "09:00 - 10:00" },
  { label: "10:00 - 11:00" },
  { label: "11:00 - 12:00" },
  { label: "14:00 - 15:00" },
  { label: "Complet", full: true },
  { label: "16:00 - 17:00" },
];

export default function Paiement() {
  const { total, savings, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = total + savings;

  const [mode, setMode] = useState<RetractMode>("drive");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [useCagnotte, setUseCagnotte] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [formError, setFormError] = useState("");

  const handleConfirm = () => {
    if (paymentMethod === "card") {
      if (!cardHolder.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        setFormError("Veuillez remplir tous les champs de votre carte bancaire.");
        return;
      }
    }
    setFormError("");
    clearCart();
    navigate("/paiement/succes");
  };

  const cagnotte = 5.0;
  const totalAfterCagnotte = useCagnotte ? total - cagnotte : total;

  return (
    <main className="checkout">
      <div className="checkout__inner container">
        {/* ── LEFT COLUMN ─────────────────────── */}
        <div className="checkout__left">
          <h1 className="checkout__title">Finaliser ma commande</h1>

          {/* ─ Section 1 : Mode de retrait ─ */}
          <section className="checkout__section">
            <div className="checkout__section-header">
              <span className="checkout__badge">1</span>
              <h2 className="checkout__section-title">MODE DE RETRAIT</h2>
            </div>

            <div className="checkout__modes">
              <button
                className={`checkout__mode-card ${mode === "collect" ? "checkout__mode-card--active" : ""}`}
                onClick={() => setMode("collect")}
              >
                <Store size={22} />
                <div>
                  <strong>Click &amp; Collect</strong>
                  <span>Retrait en magasin (Gratuit)</span>
                </div>
              </button>

              <button
                className={`checkout__mode-card ${mode === "drive" ? "checkout__mode-card--active" : ""}`}
                onClick={() => setMode("drive")}
              >
                <Car size={22} />
                <div>
                  <strong>Drive</strong>
                  <span>Retrait sur parking dédié</span>
                </div>
              </button>
            </div>
          </section>

          {/* ─ Section 2 : Choix du créneau ─ */}
          <section className="checkout__section">
            <div className="checkout__section-header">
              <span className="checkout__badge">2</span>
              <h2 className="checkout__section-title">CHOIX DU CRÉNEAU</h2>
            </div>

            <div className="checkout__days">
              {DAYS.map((day, i) => (
                <button
                  key={day}
                  className={`checkout__day ${selectedDay === i ? "checkout__day--active" : ""}`}
                  onClick={() => setSelectedDay(i)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="checkout__slots">
              {SLOTS.map((slot, i) => (
                <button
                  key={slot.label}
                  disabled={slot.full}
                  className={`checkout__slot ${selectedSlot === i ? "checkout__slot--active" : ""} ${slot.full ? "checkout__slot--full" : ""}`}
                  onClick={() => !slot.full && setSelectedSlot(i)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </section>

          {/* ─ Encart Fidélité ─ */}
          <section className="checkout__fidelity">
            <div className="checkout__fidelity-left">
              <Tag size={22} className="checkout__fidelity-icon" />
              <div>
                <strong>Vos avantages Fidélité</strong>
                <span>
                  Votre cagnotte actuelle : <em>{cagnotte.toFixed(2).replace(".", ",")} €</em>
                </span>
              </div>
            </div>

            <label className="checkout__toggle">
              <input
                type="checkbox"
                checked={useCagnotte}
                onChange={() => setUseCagnotte(!useCagnotte)}
              />
              <span className="checkout__toggle-track" />
              <span className="checkout__toggle-label">Utiliser ma cagnotte</span>
            </label>
          </section>

          {/* ─ Section 3 : Paiement sécurisé ─ */}
          <section className="checkout__section">
            <div className="checkout__section-header">
              <span className="checkout__badge">3</span>
              <h2 className="checkout__section-title">PAIEMENT SÉCURISÉ</h2>
              <Lock size={18} className="checkout__lock-icon" />
            </div>

            <div className="checkout__pay-tabs">
              <button
                className={`checkout__pay-tab ${paymentMethod === "card" ? "checkout__pay-tab--active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={18} />
                Carte Bancaire
              </button>
              <button
                className={`checkout__pay-tab ${paymentMethod === "pay" ? "checkout__pay-tab--active" : ""}`}
                onClick={() => setPaymentMethod("pay")}
              >
                <Wallet size={18} />
                Pay
              </button>
            </div>

            {paymentMethod === "card" && (
              <form className="checkout__card-form" onSubmit={(e) => e.preventDefault()}>
                <div className="checkout__field">
                  <label className="checkout__label">TITULAIRE DE LA CARTE</label>
                  <input
                    className="checkout__input"
                    type="text"
                    placeholder="JEAN DUPONT"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    autoComplete="cc-name"
                  />
                </div>

                <div className="checkout__field">
                  <label className="checkout__label">NUMÉRO DE CARTE</label>
                  <div className="checkout__input-wrapper">
                    <input
                      className="checkout__input"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      inputMode="numeric"
                      maxLength={19}
                      autoComplete="cc-number"
                    />
                    <CreditCard size={18} className="checkout__input-icon" />
                  </div>
                </div>

                <div className="checkout__field-row">
                  <div className="checkout__field">
                    <label className="checkout__label">DATE D'EXPIRATION</label>
                    <input
                      className="checkout__input"
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      inputMode="numeric"
                      maxLength={5}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="checkout__field">
                    <label className="checkout__label">CVV</label>
                    <input
                      className="checkout__input"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </form>
            )}
          </section>
        </div>

        {/* ── RIGHT COLUMN (Récapitulatif) ──── */}
        <aside className="checkout__recap">
          <h2 className="checkout__recap-title">Récapitulatif</h2>

          <div className="checkout__recap-rows">
            <div className="checkout__recap-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
            </div>
            {useCagnotte && (
              <div className="checkout__recap-row checkout__recap-row--discount">
                <span>Cagnotte Lidl Plus</span>
                <span>- {cagnotte.toFixed(2).replace(".", ",")} €</span>
              </div>
            )}
          </div>

          <div className="checkout__recap-total">
            <span>Total à payer</span>
            <strong>{totalAfterCagnotte.toFixed(2).replace(".", ",")} €</strong>
          </div>

          {formError && (
            <p className="checkout__error">{formError}</p>
          )}

          <button className="checkout__recap-cta" onClick={handleConfirm}>
            CONFIRMER ET PAYER {totalAfterCagnotte.toFixed(2).replace(".", ",")} €
          </button>

          <p className="checkout__recap-info">
            <Info size={14} />
            Vous pouvez modifier votre créneau de retrait jusqu'à 2h avant l'heure prévue
            via votre espace client.
          </p>
        </aside>
      </div>
    </main>
  );
}
