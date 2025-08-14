/**
 * ProgressIndicator - Pure presentational progress icon for TabBar
 * Following atomic design principles - no state, only props
 */

import type { CSSProperties } from 'react';

interface ProgressIndicatorProps {
  className?: string;
  style?: CSSProperties;
}

export function ProgressIndicator({ className = '', style = {} }: ProgressIndicatorProps) {
  return (
    <div 
      className={className}
      style={{
        width: '10px',
        height: '10px',
        position: 'relative',
        ...style
      }}
    >
      <div 
        style={{
          width: '7.12px',
          height: '7.12px',
          left: '1.25px',
          top: '1.25px',
          position: 'absolute',
          outline: '1px white solid',
          outlineOffset: '-0.50px'
        }}
      />
    </div>
  );
}