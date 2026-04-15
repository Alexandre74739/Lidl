import { Link } from "react-router";
import type { Ambiance } from "../../data/ambiancesData";

interface AmbianceCardProps {
  ambiance: Ambiance;
}

export default function AmbianceCard({ ambiance }: AmbianceCardProps) {
  return (
    <div className="ambiance-card">
      <div className="ambiance-card__image">
        <img src={ambiance.image} alt={ambiance.label} />
      </div>
      <h3 className="ambiance-card__title">{ambiance.label}</h3>
      <Link to={ambiance.to} className="ambiance-card__link">
        Découvrir
      </Link>
    </div>
  );
}
