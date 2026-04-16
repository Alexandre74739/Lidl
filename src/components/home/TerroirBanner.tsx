import Button from "../ui/Button";

export default function TerroirBanner() {
  return (
    <section className="terroir">
      <div className="terroir__inner">
        <div className="terroir__text">
          <span className="terroir__label">Épicerie fine</span>
          <h2 className="terroir__title">Le Terroir à votre table</h2>
          <p className="terroir__desc">
            Une sélection rigoureuse de nos meilleurs artisans français. Des
            produits d'exception pour des moments de dégustation inoubliables.
          </p>
          <Button to="/rayons" variant="outline">
            Explorer le terroir
          </Button>
        </div>

        <div className="terroir__images">
          <img src="/products/products (5).png" alt="Fromage affiné" />
          <img src="/products/products (8).png" alt="Huile d'olive" />
        </div>
      </div>
    </section>
  );
}
