import ambiancesData from "../../data/ambiancesData";
import AmbianceCard from "./AmbianceCard";

export default function AmbiancesGrid() {
  return (
    <section className="ambiances-grid">
      <div className="ambiances-grid__inner">
        <div className="ambiances-grid__header">
          <h2 className="ambiances-grid__title">Nos ambiances</h2>
          <p className="ambiances-grid__desc">
            Inspirations thématiques pour chaque moment de votre vie, curatées avec soin.
          </p>
        </div>
        <div className="ambiances-grid__list">
          {ambiancesData.map((ambiance) => (
            <AmbianceCard key={ambiance.id} ambiance={ambiance} />
          ))}
        </div>
      </div>
    </section>
  );
}
