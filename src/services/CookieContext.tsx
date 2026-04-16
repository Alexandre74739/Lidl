import React, { createContext, useContext, useEffect, useRef } from "react";

import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

interface CookieContextType {
  openPreferences: () => void;
  isAccepted: (category: string) => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "cloud",
          position: "bottom center",
          equalWeightButtons: true,
        },
        preferencesModal: { layout: "box" },
      },
      categories: {
        necessary: { readOnly: true },
        analytics: {},
      },
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Lidl Collect : Votre vie privée",
              description:
                "Nous utilisons des cookies pour assurer le bon fonctionnement du site et analyser nos performances.",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              showPreferencesBtn: "Personnaliser",
            },
            preferencesModal: {
              title: "Préférences des cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              savePreferencesBtn: "Enregistrer",
              closeIconLabel: "Fermer",
              sections: [
                {
                  title: "Cookies techniques",
                  description:
                    "Ces cookies sont indispensables au bon fonctionnement du site.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Statistiques",
                  description:
                    "Ces cookies nous aident à mesurer l'audience et à améliorer votre expérience sur Lidl Collect.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return (
    <CookieContext.Provider
      value={{
        openPreferences: CookieConsent.showPreferences,
        isAccepted: (cat) => CookieConsent.acceptedCategory(cat),
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (!context)
    throw new Error("useCookies doit être utilisé dans un CookieProvider");
  return context;
};
