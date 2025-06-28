import * as ToastPrimitive from '@radix-ui/react-toast';
import type { ReactNode } from 'react';
import { ToastContainer } from './ToastContainer';
import { ToastProvider as ToastContextProvider } from '../../contexts/ToastContext';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <ToastContextProvider>
      <ToastPrimitive.Provider>
        {children}
        <ToastContainer />
        <ToastPrimitive.Viewport className="fixed top-4 right-2 sm:right-4 z-50 flex flex-col gap-2 w-[calc(100vw-1rem)] sm:w-full max-w-sm" />
      </ToastPrimitive.Provider>
    </ToastContextProvider>
  );
}; 