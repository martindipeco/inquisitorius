import * as ToastPrimitive from '@radix-ui/react-toast';
import type { ReactNode } from 'react';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider>
      {children}
      <ToastPrimitive.Viewport className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm" />
    </ToastPrimitive.Provider>
  );
}; 