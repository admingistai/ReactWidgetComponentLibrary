/**
 * MicIcon - Pure presentational component
 * Microphone icon based on Figma specs
 */

import { tokens } from '@/lib/design-tokens';
import type { IconProps } from './types';

export function MicIcon({ 
  color = tokens.colors.text.primary,
  className = ''
}: IconProps) {
  const { container, rect, circle } = tokens.dimensions.icons.mic;
  
  return (
    <div 
      className={className}
      style={{
        width: container.width,
        height: container.height,
        position: 'relative'
      }}
    >
      {/* Microphone rectangle */}
      <div
        style={{
          width: rect.width,
          height: rect.height,
          left: rect.position.left,
          top: rect.position.top,
          position: 'absolute',
          borderRadius: tokens.borderRadius.microphone,
          outline: tokens.effects.outlineWhite,
          outlineOffset: tokens.effects.outlineOffset,
          backgroundColor: color
        }}
      />
      {/* Microphone base circle */}
      <div
        style={{
          width: circle.width,
          height: circle.height,
          left: circle.position.left,
          top: circle.position.top,
          position: 'absolute',
          borderRadius: tokens.borderRadius.full,
          outline: tokens.effects.outlineWhite,
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
}