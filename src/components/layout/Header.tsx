import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../services/CartContext";
import logoLidl from "../../../public/logo.png";

const navLinks = [
  { label: "Rayons",     to: "/rayons" },
  { label: "Promotions", to: "/promotions" },
  { label: "Fidélité",   to: "/fidelite" },
];

export default function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src={logoLidl} alt="Logo Lidl" width="100" height="auto" />
        </Link>

        <div className="header__search">
          <Search size={15} aria-hidden />
          <input type="search" placeholder="Rechercher un article" />
        </div>

        <nav className="header__nav" aria-label="Navigation principale">
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <button className="header__account" aria-label="Mon compte">
            <User size={20} />
          </button>

          <Link
            to="/panier"
            className="header__cart"
            aria-label={`Mon panier — ${count} article${count !== 1 ? "s" : ""}`}
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="header__cart-badge" aria-hidden>
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
