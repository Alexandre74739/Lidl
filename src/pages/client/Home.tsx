import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>La sélection fraiche</h1>
        <p>
          Découvrez nos produits premium sélectionnés avec passion pour sublimer
          vos tables quotidiennes.
        </p>
        <Button to="/selection">Découvrir la sélection</Button>
      </div>

      <div className="about">
        <div className="about-top">
          <h2>Nos offres du moment</h2>
          <Button to="/selection" variant="outline">
            Voir tout
          </Button>
        </div>
        <div className="about-bottom"></div>
      </div>

      <div className="terroir">
        <label>Epicerie fine</label>
        <h2>Le terroir à votre table</h2>
        <p>
          Une sélection rigoureuse de nos meilleurs artisans français. Des
          produits d'exception pour des moments de dégustation inoubliables.
        </p>
        <Button to="/selection" variant="primary">
          Explorer le terroir
        </Button>
      </div>

      <div className="products">
        <div className="products-top">
          <h2>Plaisirs accessibles</h2>
          <Button to="/selection" variant="outline">
            Voir tout
          </Button>
        </div>
        <div className="products-bottom">
          
        </div>
      </div>
    </main>
  );
}
