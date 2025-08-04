/**
 * GradientIcon - Pure presentational component
 * Icon with gradient fill for suggestion items
 */

import { tokens } from '@/lib/design-tokens';
import type { IconProps } from './types';

export function GradientIcon({ className = '' }: Omit<IconProps, 'color' | 'size'>) {
  const { width, height } = tokens.dimensions.icons.gradient;
  const { start, end, direction } = tokens.colors.gradient;
  
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`,
        borderRadius: '2px'
      }}
    />
  );
}