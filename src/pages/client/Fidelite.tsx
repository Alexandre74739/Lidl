import { Nfc, ChevronRight, Ticket, Trophy, Megaphone } from "lucide-react";
import heroImg from "../../assets/images/hero-img.png";

const mockCard = {
  tier: "MEMBRE PREMIUM",
  name: "Jean Dupont",
  number: "5 981234 567890",
  solde: 7.97,
  economies: 29.98,
};

const economiserItems = [
  {
    id: 1,
    Icon: Ticket,
    title: "E-coupons",
    desc: "Activez vos coupons personnalisés avant le passage en caisse.",
  },
  {
    id: 2,
    Icon: Trophy,
    title: "Mes Défis Gagnants",
    desc: "Relevez nos défis mensuels et gagnez des produits gratuits.",
  },
  {
    id: 3,
    Icon: Megaphone,
    title: "Offres de la semaine",
    desc: "Parcourez le catalogue interactif et ses promotions exclusives.",
  },
];

export default function Fidelite() {
  return (
    <main className="fidelite">
      <div className="container">
        {/* Header */}
        <div className="fidelite__hero">
          <h1 className="fidelite__title">Mes avantages</h1>
          <p className="fidelite__subtitle">
            Votre fidélité récompensée à chaque passage en caisse.
            <br />
            Découvrez vos offres exclusives.
          </p>
        </div>

        {/* Carte fidélité */}
        <div className="carte-fidelite">
          <div className="carte-fidelite__card">
            <div className="carte-fidelite__card-header">
              <div>
                <span className="carte-fidelite__tier">{mockCard.tier}</span>
                <p className="carte-fidelite__name">{mockCard.name}</p>
              </div>
              <Nfc size={22} className="carte-fidelite__nfc" aria-hidden />
            </div>
            <div className="carte-fidelite__barcode">
              <div className="carte-fidelite__barcode-bars" aria-hidden />
              <span className="carte-fidelite__number">{mockCard.number}</span>
            </div>
          </div>
          <div className="carte-fidelite__stats">
            <div className="carte-fidelite__stat">
              <span className="carte-fidelite__stat-label">MON SOLDE</span>
              <span className="carte-fidelite__stat-value__base">
                {mockCard.solde.toFixed(2).replace(".", ",")} €
              </span>
            </div>
            <div className="carte-fidelite__stat">
              <span className="carte-fidelite__stat-label">MES ÉCONOMIES</span>
              <span className="carte-fidelite__stat-value">
                {mockCard.economies.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          </div>
        </div>

        {/* Offres actives */}
        <section className="offres-actives">
          <h2 className="offres-actives__title">Offres actives</h2>
          <div className="offres-actives__grid">
            <div className="offre-card offre-card--special">
              <span className="offre-card__badge">OFFRE SPÉCIALE</span>
              <h3 className="offre-card__title">
                BRAVO ! VOUS BÉNÉFICIEZ DE 10% EN AVANTAGE CARTE
              </h3>
              <p className="offre-card__desc">
                Valable sur tout le rayon fruits et légumes jusqu'à dimanche.
              </p>
              <button className="btn btn--primary btn--sm">EN PROFITER</button>
            </div>

            <div
              className="offre-card offre-card--collection"
              style={{ backgroundImage: `url(${heroImg})` }}
            >
              <div className="offre-card__overlay">
                <span className="offre-card__badge">COLLECTION GOURMET</span>
                <h3 className="offre-card__title">
                  Bonus Collection : Artisanat Local
                </h3>
                <p className="offre-card__desc">
                  Cumulez des points sur les produits de notre sélection de
                  terroir.
                </p>
                <div className="offre-card__progress-wrap">
                  <div className="offre-card__progress-bar">
                    <div
                      className="offre-card__progress-fill"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="offre-card__progress-label">
                    ENCORE 12€ POUR DÉBLOQUER VOTRE BON
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Économisez encore plus */}
        <section className="economisez">
          <div className="economisez__header">
            <h2 className="economisez__title">Économisez encore plus !</h2>
            <button className="economisez__link">Tout voir</button>
          </div>
          <ul className="economisez__list">
            {economiserItems.map(({ id, Icon, title, desc }) => (
              <li key={id} className="economisez__item">
                <div className="economisez__icon">
                  <Icon size={20} aria-hidden />
                </div>
                <div className="economisez__text">
                  <span className="economisez__item-title">{title}</span>
                  <span className="economisez__item-desc">{desc}</span>
                </div>
                <ChevronRight
                  size={18}
                  className="economisez__arrow"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
