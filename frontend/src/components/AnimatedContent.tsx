import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedContentProps {
  children: ReactNode;
  animationKey: string;
}

export const AnimatedContent = ({ children, animationKey }: AnimatedContentProps) => {
  return (
    <div className="min-h-0 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut" 
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 