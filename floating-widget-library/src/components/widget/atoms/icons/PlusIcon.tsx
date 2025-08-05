/**
 * PlusIcon - Pure presentational component
 * Based on Figma specs: 16x16 container with 10.50x10.50 inner square
 */

import { tokens } from '@/lib/design-tokens';
import type { IconProps } from './types';

export function PlusIcon({ 
  color = tokens.colors.text.primary,
  className = ''
}: IconProps) {
  const { container, inner } = tokens.dimensions.icons.plus;
  
  return (
    <div 
      className={className}
      style={{
        width: container.width,
        height: container.height,
        position: 'relative'
      }}
    >
      <div
        style={{
          width: inner.width,
          height: inner.height,
          left: inner.position.left,
          top: inner.position.top,
          position: 'absolute',
          outline: tokens.effects.outlineWhite,
          outlineOffset: tokens.effects.outlineOffset
        }}
      >
        {/* Plus sign created with CSS */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: color
          }}
        />
        <div
          style={{
            position: 'absolute',
            height: '1px',
            width: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
}