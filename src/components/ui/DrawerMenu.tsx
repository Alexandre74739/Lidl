import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { DrawerEntry, DrawerItem } from "../../data/drawerMenuData";
import { isSection } from "../../data/drawerMenuData";
import "../../styles/abstracts/_variables.scss";

interface DrawerMenuProps {
  entries: DrawerEntry[];
  accentColor?: string;
  toggleLabel?: string;
  defaultOpen?: boolean;
}

const DrawerMenu = ({
  entries,
  accentColor = "var(--color-primary)",
  toggleLabel = "Toutes les catégories",
  defaultOpen = false,
}: DrawerMenuProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItem, setActiveItem] = useState<DrawerItem | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fonction centrale pour fermer le menu
  const closeMenu = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  // Fermeture au clic extérieur (on garde cet effet car il gère un système externe : le DOM global)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const openSub = (item: DrawerItem) => {
    if (item.children?.length) setActiveItem(item);
  };

  const toggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const cssVars = { "--dm-accent": accentColor } as React.CSSProperties;

  return (
    <div
      ref={menuRef}
      className={`drawer-menu${isOpen ? " drawer-menu--open" : ""}`}
      style={cssVars}
    >
      {/* ── Bouton toggle ── */}
      <button
        className="drawer-menu__toggle"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="drawer-menu__toggle-icon">☰</span>
        <span className="drawer-menu__toggle-label">{toggleLabel}</span>
        <span
          className={`drawer-menu__toggle-arrow${isOpen ? " drawer-menu__toggle-arrow--up" : ""}`}
        />
      </button>

      {/* ── Corps (panneaux) ── */}
      <div
        id="drawer-menu-body"
        className="drawer-menu__body"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div
          className={`drawer-menu__panels${activeItem ? " drawer-menu__panels--shifted" : ""}`}
        >
          {/* Panneau 0 : liste principale */}
          <div
            className="drawer-menu__panel"
            aria-hidden={!!activeItem}
            inert={activeItem ? true : undefined}
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
                            <Link
                              to={item.to}
                              className="drawer-menu__row"
                              onClick={closeMenu}
                            >
                              {item.icon && (
                                <span className="drawer-menu__icon">
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
                      >
                        {entry.icon && (
                          <span className="drawer-menu__icon">
                            {entry.icon}
                          </span>
                        )}
                        <span className="drawer-menu__label">
                          {entry.label}
                        </span>
                        <span className="drawer-menu__chevron" />
                      </button>
                    ) : (
                      <Link
                        to={entry.to ?? "#"}
                        className="drawer-menu__row"
                        onClick={closeMenu}
                      >
                        {entry.icon && (
                          <span className="drawer-menu__icon">
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

          {/* Panneau 1 : sous-catégories */}
          <div
            className="drawer-menu__panel"
            aria-hidden={!activeItem}
            inert={!activeItem ? true : undefined}
          >
            {activeItem && (
              <>
                <div className="drawer-menu__sub-header">
                  <button
                    className="drawer-menu__back"
                    onClick={() => setActiveItem(null)}
                  >
                    <span className="drawer-menu__back-arrow" />
                    Retour
                  </button>
                </div>
                <div className="drawer-menu__sub-title-block">
                  <h2 className="drawer-menu__sub-title">{activeItem.label}</h2>
                  {activeItem.viewAllTo && (
                    <Link
                      to={activeItem.viewAllTo}
                      className="drawer-menu__view-all"
                      onClick={closeMenu}
                    >
                      Voir tout
                    </Link>
                  )}
                </div>
                <ul className="drawer-menu__list">
                  {activeItem.children?.map((child, i) => (
                    <li key={i} className="drawer-menu__item">
                      <Link
                        to={child.to}
                        className="drawer-menu__row"
                        onClick={closeMenu}
                      >
                        <span className="drawer-menu__label">
                          {child.label}
                        </span>
                        <span className="drawer-menu__chevron" />
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
