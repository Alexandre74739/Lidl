import { Share2, Star } from "lucide-react";
import { Link } from "react-router";
import LogoLidl from "../../assets/images/Logo_Lidl.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={LogoLidl} alt="Logo Lidl" width="150" height="auto" />
          <span className="footer__tagline">Bien choisir, sans se ruiner</span>
        </div>

        <nav className="footer__links" aria-label="Liens de pied de page">
          <Link to="#">Mentions légales</Link>
          <Link to="#">Contact</Link>
          <Link to="#">FAQ</Link>
        </nav>

        <div className="footer__icons">
          <button aria-label="Partager">
            <Share2 size={18} />
          </button>
          <button aria-label="Ajouter aux favoris">
            <Star size={18} />
          </button>
        </div>

      </div>
      <div className="footer__copy">
        © 2026 Lidl Collect. Tous droits réservés.
      </div>
    </footer>
  );
}
