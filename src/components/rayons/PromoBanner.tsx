import Button from "../ui/Button";

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-banner__inner">
        <div className="promo-banner__text">
          <span className="promo-banner__label">Offres de la semaine</span>
          <h1 className="promo-banner__title">Nos promotions</h1>
          <p className="promo-banner__desc">
            Découvrez une sélection rigoureuse de produits d'exception au
            meilleur prix. La qualité gastronomique, accessible à tous.
          </p>
          <Button to="/promotions">Découvrir la sélection</Button>
        </div>
        <div className="promo-banner__image">
          <img src="/products/products (1).png" alt="Nos promotions de la semaine" />
        </div>
      </div>
    </section>
  );
}
