import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { getCategoryById, getCategories, type Category } from "../../services/categoryService";
import { getProducts, type Product } from "../../services/productService";
import FruitCard from "../../components/rayons/FruitCard";
import SidebarNav from "../../components/rayons/SidebarNav";

const PROMO_DISCOUNT = 0.20;

type SortOption = "promo" | "price-asc" | "price-desc";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "promo", label: "Promotions d'abord" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
];

function applyPromo(price: number) {
  return Math.round(price * (1 - PROMO_DISCOUNT) * 100) / 100;
}

function sortProducts(products: Product[], sort: SortOption) {
  const sorted = [...products];
  switch (sort) {
    case "promo":
      return sorted; // tous ont la promo, ordre natif
    case "price-asc":
      return sorted.sort((a, b) => applyPromo(a.price) - applyPromo(b.price));
    case "price-desc":
      return sorted.sort((a, b) => applyPromo(b.price) - applyPromo(a.price));
    default:
      return sorted;
  }
}

export default function RayonDetail() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("promo");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    setError(null);

    Promise.all([
      getCategoryById(categoryId),
      getProducts(),
      getCategories(),
    ])
      .then(([cat, allProducts, cats]) => {
        setCategory(cat);
        setAllCategories(cats);
        setProducts(allProducts.filter((p) => Number(p.category_id) === categoryId));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => { setLoading(false); setInitialLoad(false); });
  }, [categoryId]);

  const sorted = sortProducts(products, sort);

  return (
    <main className="fl-page">
      <div className="fl-page__inner">
        {/* ── Sidebar ── */}
        <SidebarNav categories={allCategories} activeCategoryId={categoryId} />

        {/* ── Contenu ── */}
        <div className="fl-page__content">
          {/* Breadcrumb */}
          <nav className="fl-breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/" className="fl-breadcrumb__link">Accueil</Link>
            <span className="fl-breadcrumb__sep">/</span>
            <Link to="/rayons" className="fl-breadcrumb__link">Rayons</Link>
            <span className="fl-breadcrumb__sep">/</span>
            <span className="fl-breadcrumb__current">
              {category?.name ?? "Chargement..."}
            </span>
          </nav>

          {/* Header titre + tri */}
          <div className="fl-page__header">
            <h1 className="fl-page__title">{category?.name}</h1>

            <div className="fl-sort">
              <button
                className="fl-sort__btn"
                onClick={() => setSortOpen(!sortOpen)}
                aria-expanded={sortOpen}
              >
                Trier par : {SORT_OPTIONS.find((o) => o.key === sort)?.label}
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

          {/* États */}
          {initialLoad && loading && <p className="fl-breadcrumb__current">Chargement des produits...</p>}
          {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="fl-breadcrumb__link">Aucun produit dans ce rayon.</p>
          )}

          {/* Grille produits */}
          {!error && sorted.length > 0 && (
            <div className="fl-page__grid">
              {sorted.map((p) => (
                <FruitCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image_url ?? ""}
                  price={applyPromo(p.price)}
                  originalPrice={p.price}
                  promotion="PROMO"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
