import { useState, useEffect, useCallback } from 'react';
import { authService, type User } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const authenticated = authService.isAuthenticated();
      
      setUser(currentUser);
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Verificar token
  const checkToken = useCallback(() => {
    const isValid = authService.isTokenValid();
    if (!isValid && isAuthenticated) {
      logout();
    }
    return isValid;
  }, [isAuthenticated, logout]);

  // Renovar token
  const refreshToken = useCallback(() => {
    return authService.refreshToken();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkToken,
    refreshToken
  };
}; 