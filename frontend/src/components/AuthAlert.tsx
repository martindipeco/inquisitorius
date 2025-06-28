import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';

interface AuthAlertProps {
  message?: string;
}

export const AuthAlert = ({ 
  message = "Necesitas iniciar sesión para acceder a esta página"
}: AuthAlertProps) => {
  const { showInfo } = useToast();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      // Mostrar el toast con un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        showInfo("Acceso requerido", message);
        setHasShown(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [message, showInfo, hasShown]);

  // Este componente no renderiza nada visual, solo muestra el toast
  return null;
}; 