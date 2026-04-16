import { useState } from "react";
import logo from "../../../public/logo.png";

const STORAGE_KEY = "lidl_geo_choice";

export default function GeolocalisationModal() {
  const [visible, setVisible] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === null,
  );
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setLoading(false);
        setVisible(false);
      },
      () => {
        localStorage.setItem(STORAGE_KEY, "denied");
        setLoading(false);
        setVisible(false);
      },
      { timeout: 10000 },
    );
  };

  const handleDeny = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="geo-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="geo-title"
    >
      <div className="geo-modal">
        <div className="geo-modal__logo">
          <img src={logo} alt="Lidl" />
        </div>

        <div className="geo-modal__icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="currentColor"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
        </div>

        <h2 id="geo-title" className="geo-modal__title">
          Trouvez votre magasin
        </h2>
        <p className="geo-modal__description">
          Autorisez la localisation pour découvrir les offres et promotions
          disponibles dans le magasin Lidl le plus proche de chez vous.
        </p>

        <div className="geo-modal__actions">
          <button
            className="geo-modal__btn geo-modal__btn--primary"
            onClick={handleAccept}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="geo-spinner" aria-hidden="true" />
                Localisation…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Me localiser
              </>
            )}
          </button>

          <button
            className="geo-modal__btn geo-modal__btn--secondary"
            onClick={handleDeny}
            disabled={loading}
          >
            Continuer sans localisation
          </button>
        </div>

        <p className="geo-modal__notice">
          Votre position reste privée et n'est jamais partagée.
        </p>
      </div>
    </div>
  );
}
