import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  // --- MODO DESARROLLO ACTIVADO ---
  // La autenticación está desactivada para facilitar el desarrollo.
  // TODO: Antes de hacer el commit final, descomenta la línea original y borra esta.
  const isAuthenticated = true;
  // const isAuthenticated = localStorage.getItem('authToken') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
}; 