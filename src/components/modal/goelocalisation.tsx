import { useState } from "react";

const STORAGE_KEY = "lidl_geo_choice";
const DEFAULT_MAP = "https://maps.google.com/maps?q=France&output=embed&z=5";

export default function GeolocalisationModal() {
  const [visible, setVisible] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === null,
  );
  const [query, setQuery] = useState("");
  const [mapSrc, setMapSrc] = useState(DEFAULT_MAP);
  const [loading, setLoading] = useState(false);

  const close = (choice: "accepted" | "denied") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim().length > 2) {
      setMapSrc(
        `https://maps.google.com/maps?q=${encodeURIComponent(value)}&output=embed&z=13`,
      );
    }
  };

  const handleGeolocate = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setMapSrc(
          `https://maps.google.com/maps?q=${lat},${lng}&output=embed&z=14`,
        );
        setQuery("Position détectée");
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
      { timeout: 10000 },
    );
  };

  const handleConfirm = () => {
    close(query ? "accepted" : "denied");
  };

  if (!visible) return null;

  return (
    <div className="geo-overlay" role="dialog" aria-modal="true" aria-labelledby="geo-title">
      <div className="geo-modal">

        <button
          className="geo-modal__close"
          onClick={() => close("denied")}
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="geo-modal__form">
          <h2 id="geo-title" className="geo-modal__title">
            Sélectionner un magasin
          </h2>

          <p className="geo-modal__description">
            Trouver le Lidl le plus proche de chez vous pour commencer vos courses.
          </p>

          <div className="geo-modal__search">
            <input
              className="geo-modal__input"
              type="text"
              placeholder="Code postal ou ville"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              aria-label="Code postal ou ville"
            />
            <svg className="geo-modal__search-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>

          <button
            className="geo-modal__geolocate"
            onClick={handleGeolocate}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <line x1="12" y1="2" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18.5" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="2" y1="12" x2="5.5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {loading ? (
              <><span className="geo-spinner" aria-hidden="true" />Localisation…</>
            ) : (
              "Me géolocaliser"
            )}
          </button>

          <button
            className="geo-modal__confirm"
            onClick={handleConfirm}
            disabled={loading}
          >
            Confirmer la sélection
          </button>
        </div>

        <div className="geo-modal__map">
          <iframe
            src={mapSrc}
            title="Carte Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
}