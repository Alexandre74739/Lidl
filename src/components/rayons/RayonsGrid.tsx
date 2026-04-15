import rayonsData from "../../data/rayonsData";
import RayonCard from "./RayonCard";

export default function RayonsGrid() {
  return (
    <section className="rayons-grid">
      <div className="rayons-grid__inner">
        <h2 className="rayons-grid__title">Parcourir nos rayons</h2>
        <div className="rayons-grid__list">
          {rayonsData.map((rayon) => (
            <RayonCard key={rayon.id} rayon={rayon} />
          ))}
        </div>
      </div>
    </section>
  );
}
