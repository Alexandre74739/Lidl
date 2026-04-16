import { Link } from "react-router";
import { CheckCircle } from "lucide-react";

export default function PaiementSucces() {
  return (
    <main className="paiement-succes">
      <div className="paiement-succes__card">
        <CheckCircle className="paiement-succes__icon" aria-hidden />
        <h1 className="paiement-succes__title">Paiement validé !</h1>
        <p className="paiement-succes__text">
          Votre commande a bien été enregistrée. Vous recevrez une confirmation
          et pourrez récupérer vos articles selon le créneau choisi.
        </p>
        <Link to="/" className="paiement-succes__btn">
          RETOUR À L'ACCUEIL
        </Link>
      </div>
    </main>
  );
}
