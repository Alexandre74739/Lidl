import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream?: unknown }).MSStream
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || dismissed) return null;
  if (!installEvent && !isIOS) return null;

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "accepted") setInstallEvent(null);
  };

  return (
    <div className="install-prompt" role="banner">
      <div className="install-prompt__content">
        <img
          src="/icons/icon-192.png"
          alt="Lidl Collect"
          className="install-prompt__icon"
        />
        <div className="install-prompt__text">
          <strong>Installer Lidl Collect</strong>
          {isIOS ? (
            <span>
              Appuyez sur <span aria-label="partager">⎋</span> puis « Sur
              l'écran d'accueil »
            </span>
          ) : (
            <span>Accès rapide depuis votre écran d'accueil</span>
          )}
        </div>
      </div>

      <div className="install-prompt__actions">
        {!isIOS && (
          <button
            className="install-prompt__btn install-prompt__btn--primary"
            onClick={handleInstall}
          >
            Installer
          </button>
        )}
        <button
          className="install-prompt__btn install-prompt__btn--dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
