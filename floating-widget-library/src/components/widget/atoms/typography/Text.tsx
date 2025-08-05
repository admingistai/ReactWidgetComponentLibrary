/**
 * Text - Pure presentational typography component
 * Uses variant pattern for different text styles
 * No state, only props - following React best practices
 */

import { tokens } from '@/lib/design-tokens';
import type { ReactNode, CSSProperties } from 'react';

export type TextVariant = 'header' | 'body' | 'accent' | 'suggestion' | 'powered' | 'button' | 'placeholder';

interface TextProps {
  variant: TextVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantStyles: Record<TextVariant, CSSProperties> = {
  header: {
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.lg,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.lg,
    wordWrap: 'break-word',
    textAlign: 'center'
  },
  body: {
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word'
  },
  accent: {
    color: tokens.colors.text.accent,
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word'
  },
  suggestion: {
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word'
  },
  powered: {
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.xs,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.xs,
    wordWrap: 'break-word'
  },
  button: {
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.medium,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word'
  },
  placeholder: {
    color: tokens.colors.text.accent,
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word'
  }
};

export function Text({ variant, children, className = '', style = {} }: TextProps) {
  const variantStyle = variantStyles[variant];
  
  return (
    <div 
      className={className}
      style={{
        ...variantStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
}