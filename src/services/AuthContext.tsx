import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  storeId: number;
}

// Extrait le payload du JWT sans vérifier la signature (usage front uniquement)
function decodeJwt(token: string): Record<string, unknown> {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    // Invalide si pas d'id (ancien format)
    if (!parsed.id) {
      localStorage.removeItem('user');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

interface AuthContextType {
  user: AuthUser | null;
  login: (token: string, userData: Omit<AuthUser, 'id'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const login = (token: string, userData: Omit<AuthUser, 'id'>) => {
    const payload = decodeJwt(token);
    const id = typeof payload.sub === 'number' ? payload.sub : 0;

    const fullUser: AuthUser = { id, ...userData };
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(fullUser));
    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
