import { Link } from "react-router";
import type { Rayon } from "../../data/rayonsData";

interface RayonCardProps {
  rayon: Rayon;
}

export default function RayonCard({ rayon }: RayonCardProps) {
  return (
    <Link to={`/rayons/${rayon.id}`} className="rayon-card">
      <div className="rayon-card__image">
        <img src={rayon.image} alt={rayon.label} />
      </div>
      <div className="rayon-card__body">
        <h3 className="rayon-card__title">{rayon.label}</h3>
        <ul className="rayon-card__list">
          {rayon.subcategories.map((sub) => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
