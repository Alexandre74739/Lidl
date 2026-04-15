import heroImg from "../../assets/images/hero-img.png";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="hero">
      <img src={heroImg} alt="Sélection fraîcheur" className="hero__bg" />
      <div className="hero__content">
        <h1>La Sélection Fraîcheur</h1>
        <p>
          Découvrez nos produits premium sélectionnés avec passion pour sublimer vos tables quotidiennes.
        </p>
        <Button to="/rayon">Découvrir la sélection</Button>
      </div>
    </section>
  );
}
