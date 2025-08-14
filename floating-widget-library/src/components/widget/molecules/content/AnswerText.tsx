/**
 * AnswerText - Molecule for displaying answer content with optional truncation
 * Uses Text atom with additional truncation styling - no internal state
 */

import { Text } from '../../atoms';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties, ReactNode } from 'react';

interface AnswerTextProps {
  children: ReactNode;
  isCollapsed?: boolean;
  maxLines?: number;
  className?: string;
  style?: CSSProperties;
}

export function AnswerText({ 
  children, 
  isCollapsed = false, 
  maxLines = 3, 
  className = '', 
  style = {} 
}: AnswerTextProps) {
  const truncationStyles: CSSProperties = isCollapsed ? {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  } : {};

  return (
    <div
      className={className}
      style={{
        width: '100%',
        position: 'relative',
        ...style
      }}
    >
      <Text 
        variant="body"
        style={{
          lineHeight: tokens.typography.lineHeights.relaxed,
          ...truncationStyles
        }}
      >
        {children}
      </Text>
    </div>
  );
}