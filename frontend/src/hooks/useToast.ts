import { useState, useCallback } from 'react';

interface ToastState {
  open: boolean;
  title: string;
  description?: string;
  type: 'error' | 'success' | 'warning' | 'info';
}

export const useToast = () => {
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

  return {
    toast,
    showToast,
    hideToast,
    showError,
    showSuccess,
    showWarning,
    showInfo
  };
}; 