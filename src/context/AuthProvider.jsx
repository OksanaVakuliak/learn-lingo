import { useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/auth';
import { AuthContext } from './AuthContext';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () =>
      authService.subscribeToAuthChanges((currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      }),
    []
  );

  const register = useCallback(async (credentials) => {
    setUser(await authService.register(credentials));
  }, []);

  const login = useCallback(async (credentials) => {
    setUser(await authService.login(credentials));
  }, []);

  const logout = useCallback(() => authService.logout(), []);

  const value = useMemo(
    () => ({ user, isLoading, register, login, logout }),
    [user, isLoading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
