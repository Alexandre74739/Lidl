interface Props {
  tip?: string;
}

const DEFAULT_TIP =
  "Faites revenir ce produit à la poêle avec un filet d'huile d'olive extra vierge et une pincée de fleur de sel. Servez tiède pour révéler tous les arômes.";

export default function ConseilDuChef({ tip = DEFAULT_TIP }: Props) {
  return (
    <div className="conseil-chef">
      <p className="conseil-chef__label">Conseil du chef</p>
      <p className="conseil-chef__text">{tip}</p>
    </div>
  );
}
