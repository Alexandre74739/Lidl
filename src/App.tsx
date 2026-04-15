import Button from "./components/ui/Button";
import Quantity from "./components/ui/Quantity";
import DrawerMenu from "./components/ui/DrawerMenu";
import InstallPrompt from "./components/ui/InstallPrompt";
import drawerMenuData from "./data/drawerMenuData";
import { CookieProvider, useCookies } from "./services/CookieContext";

const CookieFloatingButton = () => {
  const { openPreferences } = useCookies();

  return (
    <button
      className="cookie-fab"
      onClick={openPreferences}
      aria-label="Gérer mes cookies"
      title="Gérer mes cookies"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.6 11.1a1 1 0 00-.85-.17 2.9 2.9 0 01-.75.07c-1.65 0-3-1.35-3-3 0-.1 0-.2.02-.3a1 1 0 00-1.26-1.1 3 3 0 01-3.56-3.56 1 1 0 00-1.1-1.26A10 10 0 1022 12c0-.3-.01-.6-.04-.9a1 1 0 00-.36-.1zM12 20a8 8 0 118-8l-.01.18A5 5 0 0115 7.1a5 5 0 01-4.1-4.99A8 8 0 0112 20z" />
        <circle cx="8.5" cy="13.5" r="1.5" />
        <circle cx="12" cy="9" r="1" />
        <circle cx="15" cy="15" r="1.5" />
        <circle cx="9" cy="17" r="1" />
      </svg>
    </button>
  );
};

function App() {
  return (
    <CookieProvider>
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

      <CookieFloatingButton />
      <InstallPrompt />
    </CookieProvider>
  );
}

export default App;
