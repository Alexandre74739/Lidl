import Button from "../components/ui/Button";

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
    </main>
  );
}
