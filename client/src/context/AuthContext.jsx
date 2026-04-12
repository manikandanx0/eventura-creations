import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, getStoredToken, setStoredToken } from '../api/http.js';

const AuthContext = createContext(null);

/**
 * Holds JWT + normalized user profile for the SPA.
 * Token is persisted in localStorage so refresh restores the session via `/api/auth/me`.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    setStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const applySession = useCallback((nextToken, nextUser) => {
    setStoredToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const refreshUser = useCallback(async () => {
    const t = getStoredToken();
    if (!t) {
      setUser(null);
      setToken(null);
      return;
    }
    const data = await apiGet('/api/auth/me', { auth: true });
    setUser(data.user);
    setToken(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        if (!getStoredToken()) {
          if (!cancelled) setUser(null);
          return;
        }
        await refreshUser();
      } catch {
        // Token invalid/expired — drop local session quietly.
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [clearSession, refreshUser]);

  const login = useCallback(
    async (email, password) => {
      const data = await apiPost('/api/auth/login', { email, password });
      applySession(data.token, data.user);
      return data.user;
    },
    [applySession]
  );

  const register = useCallback(
    async (name, email, password) => {
      const data = await apiPost('/api/auth/register', { name, email, password });
      applySession(data.token, data.user);
      return data.user;
    },
    [applySession]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      refreshUser,
      isAuthenticated: Boolean(token && user),
    }),
    [user, token, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
