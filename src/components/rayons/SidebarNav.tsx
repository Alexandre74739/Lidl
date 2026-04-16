import { Link } from "react-router";
import {
  Apple,
  Beef,
  Milk,
  Croissant,
  UtensilsCrossed,
  Candy,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { SidebarCategory } from "../../data/fruitLegumesData";

const ICONS: Record<string, LucideIcon> = {
  "fruits-legumes": Apple,
  boucherie: Beef,
  "produits-laitiers": Milk,
  boulangerie: Croissant,
  "epicerie-salee": UtensilsCrossed,
  "epicerie-sucree": Candy,
  boissons: Wine,
};

interface SidebarNavProps {
  categories: SidebarCategory[];
}

export default function SidebarNav({ categories }: SidebarNavProps) {
  return (
    <aside className="sidebar-nav">
      <h2 className="sidebar-nav__title">Rayons</h2>
      <span className="sidebar-nav__subtitle">LE MARCHÉ FRAIS</span>

      <ul className="sidebar-nav__list">
        {categories.map((cat) => {
          const Icon = ICONS[cat.id] ?? Apple;
          return (
            <li key={cat.id}>
              <Link
                to={`/rayons/alimentaire/${cat.id}`}
                className={`sidebar-nav__item${cat.active ? " sidebar-nav__item--active" : ""}`}
              >
                <Icon size={16} aria-hidden />
                {cat.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
