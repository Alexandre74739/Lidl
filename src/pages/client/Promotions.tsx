import heroImg from "../../assets/images/hero-img.png";
import Button from "../../components/ui/Button";

export default function Promotions() {
  return (
    <main>
      <section className="promo-banner">
        <div className="promo-banner__content">
          <span className="promo-banner__label">Offres de la semaine</span>
          <h1 className="promo-banner__title">
            Nos<br />promotions
          </h1>
          <p className="promo-banner__desc">
            Découvrez une sélection rigoureuse de produits d'exception au meilleur prix.
            La qualité gastronomique, accessible à tous.
          </p>
          <Button to="/promotions">Découvrir la sélection</Button>
        </div>
        <div className="promo-banner__image">
          <img src={heroImg} alt="Nos promotions" />
        </div>
      </section>
    </main>
  );
}
