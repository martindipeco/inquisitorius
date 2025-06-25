import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from './AuthContextDef';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}; 