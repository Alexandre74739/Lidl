import Button from "../components/ui/Button";

export default function Selection() {
  return (
    <main>
      <div className="container">
        <h1>Notre sélection</h1>
        <p>Les meilleurs produits du moment, choisis pour vous.</p>
        <Button to="/" variant="outline">
          Retour à l'accueil
        </Button>
      </div>
    </main>
  );
}
