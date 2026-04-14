import Button from "./components/ui/Button";

function App() {
  return (
    <main>
      <div className="container">
        <h1>Lidl Drive</h1>
        <p>Application en cours de construction un peu de patience…</p>
        <Button to="/page" variant="primary">
          Click me
        </Button>
      </div>
    </main>
  );
}

export default App;