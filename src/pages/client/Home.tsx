import { Link } from "react-router";
import ProductCard from "../../components/ui/ProductCard";
import HeroSection from "../../components/home/HeroSection";
import TerroirBanner from "../../components/home/TerroirBanner";

// Données fictives temporaires
const offres = [
  {
    id: 1,
    name: "Saumon Fumé d'Écosse",
    description: "Tranches fines, salage au sel sec.",
    price: 7.99,
    promotion: "PROMO -20%",
    image: "/products/products (1).png",
  },
  {
    id: 2,
    name: "Avocats filet",
    description: "Origine certifiée, mûrs à point.",
    price: 3.45,
    promotion: "PROMO -20%",
    image: "/products/products (2).png",
  },
  {
    id: 3,
    name: "Pur Jus d'Orange Pressé",
    description: "Sans sucres ajoutés, 1L.",
    price: 2.15,
    promotion: "PROMO -20%",
    image: "/products/products (3).png",
  },
  {
    id: 4,
    name: "Baguette Rustique",
    description: "Farine label rouge, cuite sur pierre.",
    price: 0.95,
    promotion: "PROMO -20%",
    image: "/products/products (4).png",
  },
];

const plaisirs = [
  {
    id: 5,
    name: "Comté AOP 24 mois",
    subtitle: "Affinage long",
    price: 6.9,
    image: "/products/products (5).png",
  },
  {
    id: 6,
    name: "Miel de Fleurs",
    subtitle: "Récolte locale",
    price: 4.2,
    image: "/products/products (6).png",
  },
  {
    id: 7,
    name: "Pâtes Fraîches Farfalle",
    subtitle: "Tradition italienne",
    price: 2.9,
    image: "/products/products (7).png",
  },
  {
    id: 8,
    name: "Huile d'Olive Vierge",
    subtitle: "Première pression",
    price: 12.5,
    image: "/products/products (8).png",
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="home-section">
        <div className="home-section__header container">
          <h2>Les Offres du Moment</h2>
          <Link to="/selection" className="home-section__link">
            Voir tout
          </Link>
        </div>
        <div className="home-section__grid container">
          {offres.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <TerroirBanner />

      <section className="home-section">
        <div className="home-section__header container">
          <h2>Plaisirs Accessibles</h2>
          <Link to="/selection" className="home-section__link">
            Voir tout
          </Link>
        </div>
        <div className="home-section__grid container">
          {plaisirs.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}