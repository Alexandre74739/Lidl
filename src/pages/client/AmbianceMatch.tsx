import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { getProductById, type Product } from "../../services/productService";
import ProductCard from "../../components/ui/ProductCard";

const AMBIANCE_PRODUCT_IDS = [10, 9];

export default function AmbianceMatch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(AMBIANCE_PRODUCT_IDS.map(getProductById))
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="ambiance-detail">
      {/* Hero banner */}
      <div className="ambiance-detail__hero">
        <img
          src="https://nbjzohcoepdcocgcmwus.supabase.co/storage/v1/object/public/picture_url/pizza_surgele.avif"
          alt="Soirée Match"
          className="ambiance-detail__hero-img"
        />
        <div className="ambiance-detail__hero-overlay">
          <span className="ambiance-detail__hero-tag">Ambiance</span>
          <h1 className="ambiance-detail__hero-title">Soirée Match</h1>
          <p className="ambiance-detail__hero-desc">
            Les indispensables pour une soirée foot réussie avec tes amis.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Breadcrumb */}
        <nav className="ambiance-detail__breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <ChevronRight size={14} />
          <Link to="/rayons">Rayons</Link>
          <ChevronRight size={14} />
          <span>Soirée Match</span>
        </nav>

        <h2 className="ambiance-detail__section-title">Les produits du pack</h2>
        <p className="ambiance-detail__section-sub">
          {AMBIANCE_PRODUCT_IDS.length} produits sélectionnés pour cette ambiance
        </p>

        {loading && <p className="ambiance-detail__status">Chargement...</p>}

        {!loading && (
          <div className="ambiance-detail__grid">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                subtitle={p.category?.name}
                image={p.image_url ?? ""}
                price={p.price}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
