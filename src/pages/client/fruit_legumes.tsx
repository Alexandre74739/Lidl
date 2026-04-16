import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import FruitCard from "../../components/rayons/FruitCard";
import SidebarNav from "../../components/rayons/SidebarNav";
import {
  fruitLegumesProducts,
  sidebarCategories,
} from "../../data/fruitLegumesData";

type SortOption = "promo" | "price-asc" | "price-desc";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "promo", label: "Promotions d'abord" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
];

function sortProducts(sort: SortOption) {
  const sorted = [...fruitLegumesProducts];
  switch (sort) {
    case "promo":
      return sorted.sort((a, b) => (b.promotion ? 1 : 0) - (a.promotion ? 1 : 0));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export default function FruitLegumes() {
  const [sort, setSort] = useState<SortOption>("promo");
  const [sortOpen, setSortOpen] = useState(false);
  const products = sortProducts(sort);

  return (
    <main className="fl-page">
      <div className="fl-page__inner container">
        {/* ── Sidebar ── */}
        <SidebarNav
          categories={sidebarCategories.map((c, i) => ({ id: i + 1, name: c.label }))}
          activeCategoryId={1}
        />

        {/* ── Main content ── */}
        <div className="fl-page__content">
          {/* Breadcrumb */}
          <nav className="fl-breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/" className="fl-breadcrumb__link">Accueil</Link>
            <span className="fl-breadcrumb__sep">/</span>
            <Link to="/rayons/alimentaire" className="fl-breadcrumb__link">Alimentaire</Link>
            <span className="fl-breadcrumb__sep">/</span>
            <span className="fl-breadcrumb__current">Fruits & Légumes</span>
          </nav>

          {/* Header with title + sort */}
          <div className="fl-page__header">
            <h1 className="fl-page__title">Fruits & Légumes</h1>
            <div className="fl-sort">
              <button
                className="fl-sort__btn"
                onClick={() => setSortOpen(!sortOpen)}
                aria-expanded={sortOpen}
              >
                Trier par: {SORT_OPTIONS.find((o) => o.key === sort)?.label}
                <ChevronDown size={16} aria-hidden />
              </button>
              {sortOpen && (
                <ul className="fl-sort__dropdown">
                  {SORT_OPTIONS.map((o) => (
                    <li key={o.key}>
                      <button
                        className={`fl-sort__option${sort === o.key ? " fl-sort__option--active" : ""}`}
                        onClick={() => { setSort(o.key); setSortOpen(false); }}
                      >
                        {o.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className="fl-page__grid">
            {products.map((p) => (
              <FruitCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                image={p.image}
                price={p.price}
                originalPrice={p.originalPrice}
                promotion={p.promotion}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
