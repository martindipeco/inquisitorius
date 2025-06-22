import * as ToastPrimitive from '@radix-ui/react-toast';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
}

const toastVariants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    scale: 0.3
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const getToastStyles = (type: ToastProps['type'], isShaking: boolean) => {
  const baseStyles = "flex items-start space-x-3 p-4 rounded-lg shadow-lg border-l-4";
  const shakeClass = isShaking ? "animate-shake" : "";
  
  switch (type) {
    case 'error':
      return `${baseStyles} bg-red-50 border-red-500 text-red-800 ${shakeClass}`;
    case 'success':
      return `${baseStyles} bg-green-50 border-green-500 text-green-800`;
    case 'warning':
      return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800`;
    case 'info':
      return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`;
    default:
      return `${baseStyles} bg-gray-50 border-gray-500 text-gray-800`;
  }
};

const getIcon = (type: ToastProps['type']) => {
  switch (type) {
    case 'error':
      return 'mdi:alert-circle';
    case 'success':
      return 'mdi:check-circle';
    case 'warning':
      return 'mdi:alert';
    case 'info':
      return 'mdi:information';
    default:
      return 'mdi:bell';
  }
};

export const Toast = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  type = 'info',
  duration = 5000 
}: ToastProps) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (open && type === 'error') {
      // Trigger shake after entrance animation
      const timer = setTimeout(() => {
        setIsShaking(true);
      }, 400);
      
      return () => clearTimeout(timer);
    } else {
      setIsShaking(false);
    }
  }, [open, type]);

  // Reset shake state when toast closes
  useEffect(() => {
    if (!open) {
      setIsShaking(false);
    }
  }, [open]);

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key={`toast-${type}-${title}`}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={getToastStyles(type, isShaking)}
            onAnimationComplete={() => {
              if (isShaking) {
                // Reset shake after animation completes
                setTimeout(() => setIsShaking(false), 500);
              }
            }}
          >
            <Icon 
              icon={getIcon(type)} 
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                type === 'error' ? 'text-red-500' :
                type === 'success' ? 'text-green-500' :
                type === 'warning' ? 'text-yellow-500' :
                'text-blue-500'
              }`} 
            />
            <div className="flex-1 min-w-0">
              <ToastPrimitive.Title className="text-sm font-semibold">
                {title}
              </ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className="text-sm mt-1 opacity-90">
                  {description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close className="ml-4 flex-shrink-0">
              <Icon icon="mdi:close" className="w-4 h-4 opacity-70 hover:opacity-100" />
            </ToastPrimitive.Close>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastPrimitive.Root>
  );
}; 