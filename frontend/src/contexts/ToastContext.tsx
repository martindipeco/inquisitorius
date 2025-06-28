import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ToastState {
  open: boolean;
  title: string;
  description?: string;
  type: 'error' | 'success' | 'warning' | 'info';
}

interface ToastContextType {
  toast: ToastState;
  showToast: (title: string, description?: string, type?: ToastState['type']) => void;
  hideToast: () => void;
  showError: (title: string, description?: string) => void;
  showSuccess: (title: string, description?: string) => void;
  showWarning: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
    description: '',
    type: 'info'
  });

  const showToast = useCallback((title: string, description?: string, type: ToastState['type'] = 'info') => {
    setToast({
      open: true,
      title,
      description,
      type
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, open: false }));
  }, []);

  const showError = useCallback((title: string, description?: string) => {
    showToast(title, description, 'error');
  }, [showToast]);

  const showSuccess = useCallback((title: string, description?: string) => {
    showToast(title, description, 'success');
  }, [showToast]);

  const showWarning = useCallback((title: string, description?: string) => {
    showToast(title, description, 'warning');
  }, [showToast]);

  const showInfo = useCallback((title: string, description?: string) => {
    showToast(title, description, 'info');
  }, [showToast]);

  return (
    <ToastContext.Provider value={{
      toast,
      showToast,
      hideToast,
      showError,
      showSuccess,
      showWarning,
      showInfo
    }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 