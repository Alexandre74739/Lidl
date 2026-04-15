import Button from "../../components/ui/Button";
import ProductCard from "../../components/ui/ProductCard";

export default function Selection() {
  return (
    <main>
      <div className="container">
        <h1>Notre sélection</h1>
        <p>Les meilleurs produits du moment, choisis pour vous.</p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBlock: "1.5rem" }}>
          <ProductCard
            id={1}
            image="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400"
            name="Saumon Fumé d'Écosse"
            description="Tranches fines, salage au sel sec."
            price={7.99}
            promotion="PROMO -20%"
          />
          <ProductCard
            id={2}
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
            name="Salade César"
            description="Poulet grillé, parmesan, croûtons."
            price={4.49}
          />
        </div>

        <Button to="/" variant="outline">
          Retour à l'accueil
        </Button>
      </div>
    </main>
  );
}
