import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../services/CartContext";
import { useAuth } from "../../services/AuthContext";
import logoLidl from "../../assets/images/Logo_Lidl.svg";

const navLinks = [
  { label: "Rayons", to: "/rayons" },
  { label: "Promotions", to: "promotions" },
  { label: "Fidélité", to: "fidelite" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();
  const close = () => setNavOpen(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo" onClick={close}>
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
          {user ? (
            <span className="header__username">{user.firstName}</span>
          ) : (
            <Link to="/register" aria-label="Créer un compte">
              <User size={20} />
            </Link>
          )}

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

          <button
            className="header__burger"
            aria-label={navOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {navOpen && (
        <nav className="header__mobile-nav" aria-label="Navigation mobile">
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to} onClick={close}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
