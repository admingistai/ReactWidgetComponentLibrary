/**
 * TabBar - Molecule for collapsible results header with gradient progress
 * Combines Text and ProgressIndicator atoms - no internal state
 */

import { Text, ProgressIndicator } from '../../atoms';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties } from 'react';

interface TabBarProps {
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
}

export function TabBar({ 
  title, 
  isExpanded, 
  onClick, 
  className = '', 
  style = {} 
}: TabBarProps) {
  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        width: '100%',
        height: '40px',
        paddingLeft: tokens.spacing.md,
        paddingRight: tokens.spacing.md,
        paddingTop: tokens.spacing.sm,
        paddingBottom: tokens.spacing.sm,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: tokens.borderRadius.lg,
        border: '1px rgba(255, 255, 255, 0.20) solid',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Gradient progress background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #C081FF 0%, #B8FFE3 100%)',
          opacity: 0.1,
          transition: 'opacity 0.2s ease'
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Text variant="button">{title}</Text>
      </div>
      
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}
      >
        <ProgressIndicator />
      </div>
    </div>
  );
}