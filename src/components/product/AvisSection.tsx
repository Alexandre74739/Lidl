import AvisCard from "./AvisCard";

const MOCK_AVIS = [
  {
    id: 1,
    author: "Jean-Pierre",
    date: "12 avril 2026",
    rating: 5,
    comment:
      "Produit excellent, très frais à la livraison. Je recommande vivement, c'est devenu un incontournable de mes courses.",
  },
  {
    id: 2,
    author: "Sophie",
    date: "8 avril 2026",
    rating: 4,
    comment:
      "Bonne qualité, goût au rendez-vous. Légèrement plus petit que ce à quoi je m'attendais mais très satisfaite globalement.",
  },
];

const AVERAGE = MOCK_AVIS.reduce((s, a) => s + a.rating, 0) / MOCK_AVIS.length;

export default function AvisSection() {
  return (
    <aside className="avis-section">
      <div className="avis-section__header">
        <h3 className="avis-section__title">Avis</h3>
        <div className="avis-section__score">
          <span className="avis-section__average">{AVERAGE.toFixed(1)}</span>
          <span className="avis-section__star">★</span>
          <span className="avis-section__count">({MOCK_AVIS.length} avis)</span>
        </div>
      </div>

      <div className="avis-section__list">
        {MOCK_AVIS.map((a) => (
          <AvisCard key={a.id} {...a} />
        ))}
      </div>

      <button className="avis-section__cta">Voir tous les avis</button>
    </aside>
  );
}
