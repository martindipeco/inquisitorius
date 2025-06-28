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
    scale: 0.8,
    x: 50
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.9,
    x: 50,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 40,
      duration: 0.3
    }
  }
};

const getToastStyles = (type: ToastProps['type'], isShaking: boolean) => {
  const baseStyles = "flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg shadow-lg border-l-4";
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
  const [progress, setProgress] = useState(100);

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
      setProgress(100);
    }
  }, [open]);

  // Progress bar animation
  useEffect(() => {
    if (open) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - (100 / (duration / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [open, duration]);

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
            className={`${getToastStyles(type, isShaking)} relative overflow-hidden`}
            onAnimationComplete={() => {
              if (isShaking) {
                // Reset shake after animation completes
                setTimeout(() => setIsShaking(false), 500);
              }
            }}
          >
            {/* Progress bar */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
            
            <Icon 
              icon={getIcon(type)} 
              className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                type === 'error' ? 'text-red-500' :
                type === 'success' ? 'text-green-500' :
                type === 'warning' ? 'text-yellow-500' :
                'text-blue-500'
              }`} 
            />
            <div className="flex-1 min-w-0">
              <ToastPrimitive.Title className="text-xs sm:text-sm font-semibold">
                {title}
              </ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className="text-xs sm:text-sm mt-1 opacity-90">
                  {description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close className="ml-2 sm:ml-4 flex-shrink-0">
              <Icon icon="mdi:close" className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 hover:opacity-100" />
            </ToastPrimitive.Close>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastPrimitive.Root>
  );
}; 