/**
 * GlassContainer - Reusable container with glass morphism effect
 * Pure presentational component - no state
 */

import { tokens } from '@/lib/design-tokens';
import type { ReactNode, CSSProperties } from 'react';

type ContainerVariant = 'compact' | 'expanded' | 'button' | 'searchBar';

interface GlassContainerProps {
  variant: ContainerVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const variantStyles: Record<ContainerVariant, CSSProperties> = {
  compact: {
    width: tokens.dimensions.compactButton.width,
    height: tokens.dimensions.compactButton.height,
    paddingTop: tokens.spacing.buttonPadding.top,
    paddingBottom: tokens.spacing.buttonPadding.bottom,
    paddingLeft: tokens.spacing.buttonPadding.left,
    paddingRight: tokens.spacing.buttonPadding.right,
    background: tokens.colors.surface.light,
    boxShadow: tokens.effects.boxShadow,
    borderRadius: tokens.borderRadius.xl,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'inline-flex',
    cursor: 'pointer',
    position: 'relative' as const
  },
  expanded: {
    width: '100%',
    height: '100%',
    paddingTop: tokens.spacing.expandedPadding.top,
    paddingBottom: tokens.spacing.expandedPadding.bottom,
    paddingLeft: tokens.spacing.expandedPadding.left,
    paddingRight: tokens.spacing.expandedPadding.right,
    background: tokens.colors.surface.light,
    borderRadius: tokens.borderRadius.sm,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: tokens.spacing['2xl'],
    display: 'inline-flex'
  },
  button: {
    padding: tokens.spacing.xs,
    background: tokens.colors.surface.light,
    borderRadius: tokens.borderRadius.lg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: tokens.spacing.lg,
    display: 'inline-flex',
    cursor: 'pointer'
  },
  searchBar: {
    width: tokens.dimensions.searchBar.width,
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '15px',
    paddingRight: tokens.spacing.buttonPadding.right,
    background: tokens.colors.surface.light,
    borderRadius: tokens.borderRadius.xl,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'inline-flex',
    position: 'relative' as const
  }
};

export function GlassContainer({ 
  variant, 
  children, 
  onClick,
  className = '',
  style = {},
  showGradientBorder
}: GlassContainerProps) {
  const variantStyle = variantStyles[variant];
  
  // Add glass-morphism class for dark mode support
  // Add gradient-border class for compact and searchBar variants
  const classes = ['glass-morphism'];
  
  // Always show gradient border for compact and searchBar variants
  if (variant === 'compact' || variant === 'searchBar') {
    classes.push('gradient-border');
  }
  if (className) {
    classes.push(className);
  }
  const combinedClassName = classes.join(' ');
  
  return (
    <div 
      className={combinedClassName}
      onClick={onClick}
      style={{
        ...variantStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
}