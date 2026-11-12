import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import authApi from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // On boot, ask the server whether an authenticated session cookie exists.
  const refreshSession = useCallback(async () => {
    try {
      const me = await authApi.me();
      setUser(me?.authenticated ? { username: me.username } : null);
    } catch {
      setUser(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (username, password) => {
  const res = await authApi.login(username, password);

  if (!res?.success) {
    throw new Error(res?.message || 'Login failed');
  }

  // Verify that the browser can send the newly issued session cookie.
  const session = await authApi.me();

  if (!session?.authenticated) {
    setUser(null);
    throw new Error(
      'Login succeeded but session cookie was not established. Please check browser cookie settings.'
    );
  }

  setUser({ username: session.username });
  return res;
  }, []);



  // const login = useCallback(async (username, password) => {
  //   const res = await authApi.login(username, password);
  //   if (res?.success) {
  //     setUser({ username: res.data.username });
  //     return res;
  //   }
  //   throw new Error(res?.message || 'Login failed');
  // }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, checking, login, logout, refreshSession }),
    [user, checking, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
