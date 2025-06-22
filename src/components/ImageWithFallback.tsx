import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  fallbackIconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'rounded-full' | 'square';
}

export const ImageWithFallback = ({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  fallbackIconClassName = '',
  size = 'md',
  shape = 'rounded'
}: ImageWithFallbackProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Configuración de tamaños
  const sizeConfig = {
    sm: { container: 'w-6 h-6', icon: 'w-3 h-3' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8' },
    lg: { container: 'w-24 h-24', icon: 'w-12 h-12' }
  };

  // Configuración de formas
  const shapeConfig = {
    'rounded': 'rounded',
    'rounded-full': 'rounded-full',
    'square': 'rounded-none'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const containerSize = sizeConfig[size].container;
  const iconSize = sizeConfig[size].icon;
  const shapeClass = shapeConfig[shape];

  return (
    <div className={`relative ${containerSize} flex-shrink-0`}>
      {/* Skeleton loading - solo se muestra cuando no está cargado */}
      {!imageLoaded && !imageError && (
        <div className={`absolute inset-0 bg-gray-200 ${shapeClass} animate-pulse ${skeletonClassName}`}></div>
      )}
      
      {/* Imagen */}
      <img
        src={src}
        alt={alt}
        className={`${containerSize} ${shapeClass} object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      
      {/* Fallback icon - solo se muestra cuando hay error */}
      {imageError && (
        <div className={`absolute inset-0 bg-gray-300 ${shapeClass} flex items-center justify-center`}>
          <svg 
            className={`${iconSize} text-gray-500 ${fallbackIconClassName}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </div>
  );
}; 