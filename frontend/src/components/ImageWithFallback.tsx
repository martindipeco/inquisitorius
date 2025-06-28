import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

type ImageSize = 'sm' | 'md' | 'lg' | 'xl';
type ImageShape = 'rounded' | 'rounded-full';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  size?: ImageSize;
  shape?: ImageShape;
  className?: string;
  skeletonClassName?: string;
}

const sizeClasses: Record<ImageSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const iconSizeClasses: Record<ImageSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const ImageWithFallback = ({
  src,
  alt,
  size = 'md',
  shape = 'rounded',
  className = '',
  skeletonClassName = ''
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  const containerSizeClass = sizeClasses[size];
  const shapeClass = shape === 'rounded-full' ? 'rounded-full' : 'rounded-lg';

  if (isLoading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${containerSizeClass} ${shapeClass} ${skeletonClassName}`}
      />
    );
  }

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${containerSizeClass} ${shapeClass} ${skeletonClassName}`}
      >
        <Icon icon="mdi:image-off-outline" className={`text-gray-400 ${iconSizeClasses[size]}`} />
      </div>
    );
  }

  return (
    <img
      src={src ?? ''}
      alt={alt}
      className={`${containerSizeClass} ${shapeClass} object-cover ${className}`}
    />
  );
}; 