/**
 * IconButton - Wrapper for icon buttons with glass effect
 * Pure presentational component
 */

import { tokens } from '@/lib/design-tokens';
import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function IconButton({ children, onClick, className = '' }: IconButtonProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        padding: tokens.spacing.xs,
        background: tokens.colors.surface.light,
        borderRadius: tokens.borderRadius.lg,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: tokens.spacing.lg,
        display: 'flex',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
}