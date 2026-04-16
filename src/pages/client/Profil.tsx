import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, ShoppingBag, Gift, LogOut, MapPin, Store, IdCard } from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import { apiFetch } from '../../services/api';

interface Store {
  id: number;
  name: string;
  address?: string;
}

export default function Profil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/register');
      return;
    }
    apiFetch<Store[]>('/store')
      .then(stores => {
        const found = stores.find(s => s.id === user.storeId);
        if (found) setStore(found);
      })
      .catch(() => {});
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <main className="profil">
      <div className="profil__layout">

        {/* ── Sidebar ────────────────────────────────── */}
        <aside className="profil__sidebar">
          <div className="profil__sidebar-header">
            <p className="profil__sidebar-title">MON ESPACE</p>
            <p className="profil__sidebar-subtitle">MEMBRE GOURMET</p>
          </div>

          <nav className="profil__nav">
            <Link to="/profil" className="profil__nav-item profil__nav-item--active">
              <User size={15} aria-hidden />
              <span>MES INFORMATIONS</span>
            </Link>
            <span className="profil__nav-item profil__nav-item--disabled">
              <ShoppingBag size={15} aria-hidden />
              <span>MES COMMANDES</span>
            </span>
            <span className="profil__nav-item profil__nav-item--disabled">
              <Gift size={15} aria-hidden />
              <span>MES AVANTAGES FIDÉLITÉ</span>
            </span>
          </nav>

          <button className="profil__nav-item profil__nav-logout" onClick={handleLogout}>
            <LogOut size={15} aria-hidden />
            <span>DÉCONNEXION</span>
          </button>
        </aside>

        {/* ── Contenu principal ──────────────────────── */}
        <div className="profil__content">
          <h1 className="profil__title">
            Mes<br />informations
          </h1>
          <div className="profil__divider" />

          {/* Données personnelles */}
          <section className="profil__section">
            <h2 className="profil__section-title">
              <IdCard size={18} aria-hidden />
              DONNÉES PERSONNELLES
            </h2>
            <div className="profil__card">
              <div className="profil__grid">
                <div className="profil__field">
                  <span className="profil__field-label">PRÉNOM</span>
                  <div className="profil__field-value">{user.firstName}</div>
                </div>
                <div className="profil__field">
                  <span className="profil__field-label">NOM</span>
                  <div className="profil__field-value">{user.lastName}</div>
                </div>
                <div className="profil__field">
                  <span className="profil__field-label">E-MAIL</span>
                  <div className="profil__field-value">{user.email}</div>
                </div>
                <div className="profil__field">
                  <span className="profil__field-label">TÉLÉPHONE</span>
                  <div className="profil__field-value profil__field-value--empty">—</div>
                </div>
              </div>
            </div>
          </section>

          {/* Magasin préféré */}
          <section className="profil__section">
            <h2 className="profil__section-title">
              <Store size={18} aria-hidden />
              MON MAGASIN PRÉFÉRÉ
            </h2>
            {store ? (
              <div className="profil__store-card">
                <div className="profil__store-pin">
                  <MapPin size={18} aria-hidden />
                </div>
                <div className="profil__store-info">
                  <p className="profil__store-name">{store.name}</p>
                  <p className="profil__store-status">
                    <span className="profil__store-status-dot"></span>Ouvert jusqu'à 21h00
                  </p>
                  {store.address && (
                    <p className="profil__store-address">{store.address}</p>
                  )}
                </div>
                <button className="btn btn--outline btn--sm">
                  CHANGER DE MAGASIN
                </button>
              </div>
            ) : (
              <p className="profil__store-empty">Aucun magasin sélectionné</p>
            )}
          </section>
          <div className="profil__footer">
            <button className="btn btn--primary profil__btn-submit">
              ENREGISTRER LES MODIFICATIONS
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
