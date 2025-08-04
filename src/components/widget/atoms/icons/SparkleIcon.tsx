/**
 * SparkleIcon - Pure presentational component
 * No state, only props - following React best practices
 * Now using PNG image instead of SVG
 */

import { tokens } from '@/lib/design-tokens';
import type { IconProps } from './types';
import sparkleImage from '@/assets/icons/sparkle.png';

export function SparkleIcon({ 
  size = 'sm', 
  color = tokens.colors.text.accent,
  className = ''
}: IconProps) {
  const dimensions = tokens.dimensions.icons.sparkle[size === 'lg' ? 'large' : 'small'];
  
  return (
    <img
      src={sparkleImage}
      alt="Sparkle"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      style={{ 
        display: 'block',
        objectFit: 'contain'
      }}
      loading="eager"
      draggable={false}
    />
  );
}