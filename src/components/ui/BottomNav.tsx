import { Link, useLocation } from "react-router";
import { Home, LayoutGrid, Tag, Tags, User } from "lucide-react";

const navItems = [
  { label: "Accueil",    to: "/",          icon: Home },
  { label: "Rayons",     to: "/rayons",    icon: LayoutGrid },
  { label: "Promotions", to: "/promotions", icon: Tag },
  { label: "Fidélité",   to: "/fidelite",  icon: Tags },
  { label: "Compte",     to: "/profil",    icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav" aria-label="Navigation mobile">
      <ul className="bottom-nav__list">
        {navItems.map(({ label, to, icon: Icon }) => {
          const active =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="bottom-nav__item">
              <Link
                to={to}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={22} aria-hidden />
                <span>{label.toUpperCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
