import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import heroImg from "../../assets/images/hero-img.png";
import Button from "../../components/ui/Button";
import FruitCard from "../../components/rayons/FruitCard";
import { getPromoProducts, type Product } from "../../services/productService";
import { getCategories, type Category } from "../../services/categoryService";

type SortOption = "discount-desc" | "price-asc" | "price-desc";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "discount-desc", label: "Remise la plus forte" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
];

function promoPrice(p: Product) {
  return Math.round(p.price * (1 - (p.discount ?? 0) / 100) * 100) / 100;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "discount-desc":
      return sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    case "price-asc":
      return sorted.sort((a, b) => promoPrice(a) - promoPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => promoPrice(b) - promoPrice(a));
    default:
      return sorted;
  }
}

interface CategoryGroup {
  category: Category;
  products: Product[];
}

function groupByCategory(
  products: Product[],
  categories: Category[],
): CategoryGroup[] {
  const map = new Map<number, Product[]>();
  for (const p of products) {
    const cid = p.category_id ?? 0;
    if (!map.has(cid)) map.set(cid, []);
    map.get(cid)!.push(p);
  }
  return Array.from(map.entries())
    .map(([cid, prods]) => ({
      category: categories.find((c) => c.id === cid) ?? {
        id: cid,
        name: "Autre",
      },
      products: prods,
    }))
    .sort((a, b) => a.category.id - b.category.id);
}

export default function Promotions() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("discount-desc");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    Promise.all([getPromoProducts(), getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const sorted = sortProducts(products, sort);
  const groups = groupByCategory(sorted, categories);

  return (
    <main>
      {/* ── Banner ── */}
      <section className="promo-banner">
        <div className="promo-banner__inner">
          <div className="promo-banner__text">
            <span className="promo-banner__label">Offres de la semaine</span>
            <h1 className="promo-banner__title">Nos promotions</h1>
            <p className="promo-banner__desc">
              Des prix réduits sur une sélection de produits frais, épicerie
              et bien plus. Profitez-en avant la fin des offres.
            </p>
            <Button to="#">Voir toutes les offres</Button>
          </div>
          <div className="promo-banner__image">
            <img src={heroImg} alt="Promotions de la semaine" />
          </div>
        </div>
      </section>

      {/* ── Produits en promo ── */}
      <section className="promo-products">
        <div className="promo-products__inner">
          {/* En-tête compteur + tri */}
          <div className="promo-products__header">
            <div>
              <h2 className="promo-products__title">Toutes les promotions</h2>
              {!loading && !error && (
                <p className="promo-products__count">
                  {products.length} produit{products.length > 1 ? "s" : ""} en
                  promotion
                </p>
              )}
            </div>

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
                        onClick={() => {
                          setSort(o.key);
                          setSortOpen(false);
                        }}
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
          {loading && (
            <p className="promo-products__status">
              Chargement des promotions...
            </p>
          )}
          {error && (
            <p className="promo-products__status promo-products__status--error">
              Erreur : {error}
            </p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="promo-products__status">
              Aucune promotion disponible pour le moment.
            </p>
          )}

          {/* Groupes par catégorie */}
          {!loading &&
            !error &&
            groups.map(({ category, products: catProds }) => (
              <div key={category.id} className="promo-products__group">
                <div className="promo-products__group-header">
                  <h3 className="promo-products__group-title">
                    {category.name}
                  </h3>
                  <Link to="#" className="promo-products__group-link">
                    Voir le rayon
                  </Link>
                </div>
                <div className="promo-products__grid">
                  {catProds.slice(0, 4).map((p) => (
                    <FruitCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      description={p.description}
                      image={p.image_url ?? ""}
                      price={promoPrice(p)}
                      originalPrice={p.price}
                      promotion={`-${p.discount}%`}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}