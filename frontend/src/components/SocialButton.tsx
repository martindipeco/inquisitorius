import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const SocialButton = ({ 
  icon, 
  children, 
  className = '', 
  ...props 
}: SocialButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 border border-gray-300 rounded-[10px] bg-white hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 w-full h-[56px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      {children && <span className="text-sm font-medium text-gray-700">{children}</span>}
    </button>
  );
}; 