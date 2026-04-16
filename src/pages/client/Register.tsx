import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { apiFetch } from '../../services/api';
import { useAuth } from '../../services/AuthContext';
import logoLidl from '../../assets/images/Logo_Lidl.svg';

interface Store {
  id: number;
  name: string;
  address?: string;
}

interface RegisterResponse {
  access_token: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  storeId: string;
  notifications: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [stores, setStores] = useState<Store[]>([]);
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    storeId: '',
    notifications: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch<Store[]>('/store').then(setStores).catch(() => {});
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiFetch<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password,
          storeId: Number(form.storeId),
        }),
      });

      login(data.access_token, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register">
      <div className="register__card">

        {/* Panneau gauche */}
        <div className="register__side">
          <p className="register__side-text">
            BONJOUR,<br />
            NOUS SOMMES<br />
            RAVIS QUE<br />
            VOUS NOUS<br />
            REJOIGNIEZ&nbsp;!
          </p>
          <div className="register__side-bottom">
            <img src={logoLidl} alt="Logo Lidl" className="register__side-logo" />
            <p className="register__side-tagline">VOUS FAITES LE BON CHOIX.</p>
          </div>
        </div>

        {/* Panneau droit — formulaire */}
        <div className="register__form-panel">
          <form className="register__form" onSubmit={handleSubmit} noValidate>

            {/* VOS INFORMATIONS */}
            <section className="register__section">
              <h2 className="register__section-title">VOS INFORMATIONS</h2>
              <div className="register__grid">
                <div className="register__field">
                  <label htmlFor="firstName">PRÉNOM</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Jean"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="register__field">
                  <label htmlFor="lastName">NOM</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Dupont"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                  />
                </div>
                <div className="register__field">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="register__field">
                  <label htmlFor="phone">TÉLÉPHONE</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="register__field">
                <label htmlFor="address">ADRESSE</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="20 rue des templiers 38000 Grenoble"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
              </div>
            </section>

            {/* SÉCURITÉ */}
            <section className="register__section">
              <h2 className="register__section-title">SÉCURITÉ</h2>
              <div className="register__field">
                <label htmlFor="password">MOT DE PASSE</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <p className="register__hint">
                  Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
                </p>
              </div>
            </section>

            {/* MAGASIN & PRÉFÉRENCES */}
            <section className="register__section">
              <h2 className="register__section-title">MAGASIN &amp; PRÉFÉRENCES</h2>
              <div className="register__field">
                <label htmlFor="storeId">MAGASIN DE RETRAIT</label>
                <div className="register__select-wrapper">
                  <select
                    id="storeId"
                    name="storeId"
                    value={form.storeId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Sélectionner un magasin</option>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}{s.address ? ` - ${s.address}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="register__hint">
                  Choisissez votre boutique habituelle pour voir les stocks en temps réel.
                </p>
              </div>

              <div className="register__toggle-row">
                <span className="register__toggle-label">NOTIFICATIONS &amp; OFFRES</span>
                <button
                  type="button"
                  className={`register__toggle${form.notifications ? ' register__toggle--on' : ''}`}
                  aria-pressed={form.notifications}
                  aria-label="Activer les notifications et offres"
                  onClick={() => setForm(prev => ({ ...prev, notifications: !prev.notifications }))}
                >
                  <span className="register__toggle-thumb" />
                </button>
              </div>
            </section>

            {error && (
              <p className="register__error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="register__submit" disabled={loading}>
              {loading ? 'CRÉATION EN COURS…' : 'CRÉER MON COMPTE'}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
