import Button from "./components/ui/Button";
import Quantity from "./components/ui/Quantity";
import DrawerMenu from "./components/ui/DrawerMenu";
import drawerMenuData from "./data/drawerMenuData";

function App() {
  return (
    <>
      <main>
      <div className="container">
        <h1>Lidl Drive</h1>
        <p>Application en cours de construction un peu de patience…</p>
        <Button to="/page" variant="primary">
          Click me
        </Button>
        <Quantity />
        <DrawerMenu
          entries={drawerMenuData}
          toggleLabel="Toutes les catégories"
        />
      </div>
    </main>
    </>
  );
}

export default App;