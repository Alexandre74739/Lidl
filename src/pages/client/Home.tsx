import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../../components/ui/ProductCard";
import HeroSection from "../../components/home/HeroSection";
import TerroirBanner from "../../components/home/TerroirBanner";
import { getProducts, type Product } from "../../services/productService";

const PROMO_DISCOUNT = 0.20; // -20%
const SECTION_SIZE = 4;

function applyPromo(price: number) {
  return Math.round(price * (1 - PROMO_DISCOUNT) * 100) / 100;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const offres = products.slice(0, SECTION_SIZE);
  const plaisirs = products.slice(SECTION_SIZE, SECTION_SIZE * 2);

  return (
    <main>
      <HeroSection />

      <section className="home-section">
        <div className="home-section__header container">
          <h2>Les Offres du Moment</h2>
          <Link to="/rayons" className="home-section__link">
            Voir tout
          </Link>
        </div>

        {loading && <p className="home-section__status container">Chargement...</p>}
        {error && <p className="home-section__status home-section__status--error container">Erreur : {error}</p>}

        {!loading && !error && (
          <div className="home-section__grid container">
            {offres.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                image={p.image_url ?? ""}
                price={applyPromo(p.price)}
                originalPrice={p.price}
                promotion="PROMO -20%"
              />
            ))}
          </div>
        )}
      </section>

      <TerroirBanner />

      <section className="home-section">
        <div className="home-section__header container">
          <h2>Plaisirs Accessibles</h2>
          <Link to="/selection" className="home-section__link">
            Voir tout
          </Link>
        </div>

        {loading && <p className="home-section__status container">Chargement...</p>}
        {error && <p className="home-section__status home-section__status--error container">Erreur : {error}</p>}

        {!loading && !error && (
          <div className="home-section__grid container">
            {plaisirs.map((p) => (
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
      </section>
    </main>
  );
}
