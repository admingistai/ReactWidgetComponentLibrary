/**
 * SourceItem - Molecule for displaying individual source with percentage
 * Combines Text and SourceIcon atoms - no internal state
 */

import { Text, SourceIcon } from '../../atoms';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties } from 'react';

interface PercentageSourceItemProps {
  title: string;
  percentage: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function PercentageSourceItem({ 
  title, 
  percentage, 
  onClick, 
  className = '', 
  style = {} 
}: PercentageSourceItemProps) {
  const handleClick = onClick ? { 
    onClick, 
    cursor: 'pointer' 
  } : {};

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '32px',
        paddingLeft: tokens.spacing.sm,
        paddingRight: tokens.spacing.sm,
        paddingTop: tokens.spacing.xs,
        paddingBottom: tokens.spacing.xs,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        ...handleClick,
        ...style
      }}
      {...(onClick && { onClick })}
    >
      {/* Left side - Icon and Title */}
      <div 
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}
      >
        <SourceIcon />
        <div style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          <Text variant="body">{title}</Text>
        </div>
      </div>
      
      {/* Right side - Percentage */}
      <div style={{ flexShrink: 0 }}>
        <Text variant="accent">{percentage}</Text>
      </div>
    </div>
  );
}