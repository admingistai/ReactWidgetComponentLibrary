/**
 * ResultsSourceItem - Molecule for displaying individual source in results phase
 * Combines Text and PlusIcon - different from the original SourceItem with percentages
 */

import { Text, PlusIcon } from '../../atoms';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties } from 'react';

interface PlusSourceItemProps {
  title: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function PlusSourceItem({ 
  title, 
  onClick, 
  className = '', 
  style = {} 
}: PlusSourceItemProps) {
  const handleClick = onClick ? { 
    onClick, 
    cursor: 'pointer' 
  } : {};

  return (
    <div
      className={className}
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        display: 'flex',
        ...handleClick,
        ...style
      }}
      {...(onClick && { onClick })}
    >
      {/* Plus icon */}
      <PlusIcon />
      
      {/* Source title */}
      <div style={{ 
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        <Text variant="suggestion">{title}</Text>
      </div>
    </div>
  );
}