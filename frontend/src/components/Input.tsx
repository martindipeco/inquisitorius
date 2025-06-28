import type { ReactNode, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  name?: string;
  autoComplete?: string;
  onFocus?: () => void;
}

export const Input = ({
  label,
  type = 'text',
  placeholder,
  error,
  rightIcon,
  leftIcon,
  name,
  autoComplete,
  onFocus,
  ...props
}: InputProps) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full font-['Inter']">
      {label && <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <div className={`flex items-center border rounded-[10px] px-4 py-3 bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${error ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-gray-300 hover:border-gray-400'}`}>
        {leftIcon && <span className="mr-3 text-gray-400">{leftIcon}</span>}
        <input
          id={inputId}
          className="flex-1 outline-none bg-transparent text-base placeholder:font-['Inter'] placeholder:text-gray-400 text-gray-900"
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          onFocus={onFocus}
          {...props}
        />
        {rightIcon && <span className="ml-3 cursor-pointer text-gray-400 hover:text-gray-600">{rightIcon}</span>}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}; 