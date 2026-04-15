import { Link } from "react-router";
import ProductCard from "../../components/ui/ProductCard";

export default function Rayons() {
  return (
    <main>
      <div className="container">
        <div className="container-left">
          <label>Offre de le semaine</label>
          <h1>Nos promotions</h1>
          <p>
            Découvrez une sélection rigoureuse de produits d'exception au
            meilleur prix. La qualité gastronomique, accessible à tous.
          </p>
          <Link to="#">Sécouvrir la sélection</Link>
        </div>
        <div className="container-right">
          <img src="" alt="" />
        </div>
      </div>
    </main>
  );
}
