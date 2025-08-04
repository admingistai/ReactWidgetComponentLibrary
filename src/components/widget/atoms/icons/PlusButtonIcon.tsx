/**
 * PlusButtonIcon - Pure presentational component
 * Uses plusbutton.png image instead of CSS-based plus sign
 * No state, only props - following React best practices
 */

import { tokens } from '@/lib/design-tokens';
import type { IconProps } from './types';
import plusButtonImage from '@/assets/icons/plusbutton.png';

export function PlusButtonIcon({ 
  size = 'sm',
  color = tokens.colors.text.primary,
  className = ''
}: IconProps) {
  // Use standard icon sizing from design tokens
  const dimensions = size === 'lg' ? 
    { width: '20px', height: '20px' } : 
    { width: '16px', height: '16px' };
  
  return (
    <img
      src={plusButtonImage}
      alt="Add"
      className={className}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        objectFit: 'contain',
        display: 'block'
      }}
      loading="eager"
      draggable={false}
    />
  );
}