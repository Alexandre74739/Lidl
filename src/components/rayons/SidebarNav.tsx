import { Link } from "react-router";
import {
  Apple,
  Beef,
  Milk,
  Croissant,
  UtensilsCrossed,
  Candy,
  Wine,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "../../services/categoryService";

function getIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("fruit") || n.includes("légume") || n.includes("legume")) return Apple;
  if (n.includes("boucherie") || n.includes("poisson") || n.includes("viande")) return Beef;
  if (n.includes("laitier") || n.includes("fromage") || n.includes("dairy")) return Milk;
  if (n.includes("boulangerie") || n.includes("viennoiserie")) return Croissant;
  if (n.includes("épicerie") && (n.includes("sal") || n.includes("plat"))) return UtensilsCrossed;
  if (n.includes("épicerie") && (n.includes("sucr") || n.includes("dessert"))) return Candy;
  if (n.includes("boisson") || n.includes("drink")) return Wine;
  return ShoppingBasket;
}

interface SidebarNavProps {
  categories: Category[];
  activeCategoryId: number;
}

export default function SidebarNav({ categories, activeCategoryId }: SidebarNavProps) {
  return (
    <aside className="sidebar-nav">
      <h2 className="sidebar-nav__title">Rayons</h2>
      <span className="sidebar-nav__subtitle">NOS RAYONS</span>

      <ul className="sidebar-nav__list">
        {categories.map((cat) => {
          const Icon = getIcon(cat.name);
          const isActive = cat.id === activeCategoryId;
          return (
            <li key={cat.id}>
              <Link
                to={`/rayons/${cat.id}`}
                className={`sidebar-nav__item${isActive ? " sidebar-nav__item--active" : ""}`}
              >
                <Icon size={16} aria-hidden />
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
