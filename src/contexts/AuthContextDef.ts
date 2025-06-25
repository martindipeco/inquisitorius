import { createContext } from 'react';
import type { User, AuthResponse } from '../services/authService';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  checkToken: () => boolean;
  refreshToken: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 