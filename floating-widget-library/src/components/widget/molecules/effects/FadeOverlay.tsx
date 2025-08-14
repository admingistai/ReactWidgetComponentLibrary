/**
 * FadeOverlay - Molecule for creating fade-out effect over content
 * Pure presentational component with configurable gradient - no state
 */

import type { CSSProperties } from 'react';

interface FadeOverlayProps {
  isVisible?: boolean;
  height?: string;
  className?: string;
  style?: CSSProperties;
}

export function FadeOverlay({ 
  isVisible = true, 
  height = '40px', 
  className = '', 
  style = {} 
}: FadeOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
        ...style
      }}
    />
  );
}