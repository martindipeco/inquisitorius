import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from './routes';
import { useAuthContext } from '../hooks/useAuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = PUBLIC_ROUTES.LOGIN 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirigir directamente al login
    return <Navigate to={redirectTo} replace state={{ from: window.location.pathname }} />;
  }
  
  return <>{children}</>;
}; 