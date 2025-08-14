/**
 * SourceIcon - Pure presentational source icon for SourcesBar
 * Following atomic design principles - no state, only props
 */

import type { CSSProperties } from 'react';

interface SourceIconProps {
  className?: string;
  style?: CSSProperties;
}

export function SourceIcon({ className = '', style = {} }: SourceIconProps) {
  return (
    <div 
      className={className}
      style={{
        width: '12px',
        height: '12px',
        position: 'relative',
        ...style
      }}
    >
      <div 
        style={{
          width: '10px',
          height: '10px',
          left: '1px',
          top: '1px',
          position: 'absolute',
          background: '#FFFFFF',
          borderRadius: '2px',
          outline: '1px white solid',
          outlineOffset: '-0.50px'
        }}
      />
    </div>
  );
}