import heroImg from "../../assets/images/hero-img.png";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="hero">
      <img src={heroImg} alt="Sélection fraîcheur" className="hero__bg" />
      <div className="hero__content">
        <h1>La Sélection<br />Fraîcheur</h1>
        <p>
          Produits premium sélectionnés avec passion<br />
          pour sublimer vos tables quotidiennes.
        </p>
        <Button to="/rayons">Découvrir la sélection</Button>
      </div>
    </section>
  );
}
