import React, { useState, useEffect } from 'react';

export function getAssetUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

export const DEFAULT_LAPTOP_FALLBACK = getAssetUrl('/images/laptop-placeholder.svg');
export const DEFAULT_AVATAR_FALLBACK = getAssetUrl('/images/avatar-placeholder.svg');

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = DEFAULT_LAPTOP_FALLBACK,
  onError,
  ...props
}) => {
  const resolvedSrc = src ? getAssetUrl(src) : undefined;
  const resolvedFallback = getAssetUrl(fallbackSrc) || DEFAULT_LAPTOP_FALLBACK;

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(resolvedSrc || resolvedFallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextSrc = src ? getAssetUrl(src) : undefined;
    const nextFallback = getAssetUrl(fallbackSrc) || DEFAULT_LAPTOP_FALLBACK;
    setCurrentSrc(nextSrc || nextFallback);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && currentSrc !== resolvedFallback) {
      setHasError(true);
      setCurrentSrc(resolvedFallback);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

