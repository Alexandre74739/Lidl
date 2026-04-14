import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import type { MenuCategory } from "../../data/menuData";

interface NavMenuProps {
  categories: MenuCategory[];
}

const NavMenu = ({ categories }: NavMenuProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <nav className="nav-menu" ref={navRef}>
      <ul className="nav-menu__list">
        {categories.map((cat) => {
          const isOpen = openId === cat.id;
          return (
            <li
              key={cat.id}
              className={`nav-menu__item${isOpen ? " nav-menu__item--open" : ""}`}
            >
              <button
                className="nav-menu__trigger"
                onClick={() => toggle(cat.id)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {cat.label}
                <span
                  className={`nav-menu__arrow${isOpen ? " nav-menu__arrow--up" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <ul className="nav-menu__dropdown">
                  {cat.items.map((range, i) => (
                    <li
                      key={i}
                      className={`nav-menu__range${range.children ? " nav-menu__range--has-sub" : ""}`}
                    >
                      {range.children ? (
                        <>
                          <span className="nav-menu__range-label">
                            {range.label}
                            <span
                              className="nav-menu__sub-arrow"
                              aria-hidden="true"
                            />
                          </span>
                          <ul className="nav-menu__submenu">
                            {range.children.map((sub, j) => (
                              <li key={j} className="nav-menu__subitem">
                                <Link
                                  to={sub.to}
                                  onClick={() => setOpenId(null)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link
                          className="nav-menu__range-label"
                          to={range.to ?? "#"}
                          onClick={() => setOpenId(null)}
                        >
                          {range.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;