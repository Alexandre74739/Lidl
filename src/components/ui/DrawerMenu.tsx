import { useState } from "react";
import { Link } from "react-router";
import type { DrawerEntry, DrawerItem } from "../../data/drawerMenuData";
import { isSection } from "../../data/drawerMenuData";
import "../../styles/abstracts/_variables.scss";

interface DrawerMenuProps {
  entries: DrawerEntry[];
  /** Couleur d'accentuation (chevrons, titres, liens) */
  accentColor?: number;
  /** Libellé du bouton d'ouverture */
  toggleLabel?: string;
  /** Ouvert par défaut */
  defaultOpen?: boolean;
}

const DrawerMenu = ({
  entries,
  accentColor = "$color-primary",
  toggleLabel = "Toutes les catégories",
  defaultOpen = false,
}: DrawerMenuProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItem, setActiveItem] = useState<DrawerItem | null>(null);

  const openSub = (item: DrawerItem) => {
    if (item.children?.length) setActiveItem(item);
  };

  const closeSub = () => setActiveItem(null);

  const toggle = () => {
    setIsOpen((prev) => {
      if (prev) setActiveItem(null); // réinitialise le sous-panneau à la fermeture
      return !prev;
    });
  };

  const cssVars = { "--dm-accent": accentColor } as React.CSSProperties;

  return (
    <div
      className={`drawer-menu${isOpen ? " drawer-menu--open" : ""}`}
      style={cssVars}
    >
      {/* ── Bouton toggle ── */}
      <button
        className="drawer-menu__toggle"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="drawer-menu-body"
      >
        <span className="drawer-menu__toggle-icon" aria-hidden="true">
          ☰
        </span>
        <span className="drawer-menu__toggle-label">{toggleLabel}</span>
        <span
          className={`drawer-menu__toggle-arrow${isOpen ? " drawer-menu__toggle-arrow--up" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* ── Corps (panneaux) ── */}
      <div
        id="drawer-menu-body"
        className="drawer-menu__body"
        aria-hidden={!isOpen}
        inert={!isOpen ? "" : undefined}
      >
        <div
          className={`drawer-menu__panels${activeItem ? " drawer-menu__panels--shifted" : ""}`}
        >
          {/* ────── Panneau 0 : liste principale ────── */}
          <div
            className="drawer-menu__panel"
            aria-hidden={!!activeItem}
            inert={activeItem ? "" : undefined}
          >
            <ul className="drawer-menu__list">
              {entries.map((entry, i) => {
                if (isSection(entry)) {
                  return (
                    <li key={i} className="drawer-menu__section">
                      <span className="drawer-menu__section-label">
                        {entry.sectionLabel}
                      </span>
                      <ul className="drawer-menu__list">
                        {entry.items.map((item) => (
                          <li key={item.id} className="drawer-menu__item">
                            <Link to={item.to} className="drawer-menu__row">
                              {item.icon && (
                                <span
                                  className="drawer-menu__icon"
                                  aria-hidden="true"
                                >
                                  {item.icon}
                                </span>
                              )}
                              <span className="drawer-menu__label">
                                {item.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={entry.id} className="drawer-menu__item">
                    {entry.children?.length ? (
                      <button
                        className="drawer-menu__row"
                        onClick={() => openSub(entry as DrawerItem)}
                        aria-haspopup="true"
                      >
                        {entry.icon && (
                          <span
                            className="drawer-menu__icon"
                            aria-hidden="true"
                          >
                            {entry.icon}
                          </span>
                        )}
                        <span className="drawer-menu__label">
                          {entry.label}
                        </span>
                        <span
                          className="drawer-menu__chevron"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link to={entry.to ?? "#"} className="drawer-menu__row">
                        {entry.icon && (
                          <span
                            className="drawer-menu__icon"
                            aria-hidden="true"
                          >
                            {entry.icon}
                          </span>
                        )}
                        <span className="drawer-menu__label">
                          {entry.label}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ────── Panneau 1 : sous-catégories ────── */}
          <div
            className="drawer-menu__panel"
            aria-hidden={!activeItem}
            inert={!activeItem ? "" : undefined}
          >
            {activeItem && (
              <>
                {/* Bouton retour */}
                <div className="drawer-menu__sub-header">
                  <button
                    className="drawer-menu__back"
                    onClick={closeSub}
                    aria-label="Retour"
                  >
                    <span
                      className="drawer-menu__back-arrow"
                      aria-hidden="true"
                    />
                    Retour
                  </button>
                </div>

                {/* Titre + Voir tout */}
                <div className="drawer-menu__sub-title-block">
                  <h2 className="drawer-menu__sub-title">{activeItem.label}</h2>
                  {activeItem.viewAllTo && (
                    <Link
                      to={activeItem.viewAllTo}
                      className="drawer-menu__view-all"
                    >
                      Voir tout
                    </Link>
                  )}
                </div>

                {/* Sous-items */}
                <ul className="drawer-menu__list">
                  {activeItem.children?.map((child, i) => (
                    <li key={i} className="drawer-menu__item">
                      <Link to={child.to} className="drawer-menu__row">
                        <span className="drawer-menu__label">
                          {child.label}
                        </span>
                        <span
                          className="drawer-menu__chevron"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
