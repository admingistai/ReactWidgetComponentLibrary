/**
 * Shared icon component types
 * Following "Thinking in React" - these are pure presentational components
 */

export interface IconProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20
} as const;