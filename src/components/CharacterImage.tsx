import React, { useState } from 'react';

interface CharacterImageProps {
  id: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  hideInitially?: boolean;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const EXTENSIONS = ['jpg', 'png', 'jpeg', 'webp'];

export function CharacterImage({
  id,
  alt,
  className,
  style,
  onLoad,
  hideInitially = false,
  loading,
  decoding,
  fetchPriority,
}: CharacterImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return null;
  }

  const currentExt = EXTENSIONS[extIndex];

  return (
    <img
      src={`/images/${id}.${currentExt}`}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      style={{
        ...style,
        display: (hideInitially && !loaded) ? 'none' : (style?.display || 'block')
      }}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
      onError={(e) => {
        if (extIndex < EXTENSIONS.length - 1) {
          setExtIndex(prev => prev + 1);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}
