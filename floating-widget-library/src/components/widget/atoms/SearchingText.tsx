/**
 * SearchingText - Static atom component for displaying three text items vertically
 * Pure presentational component with no animation - used as base for SearchingAnimation
 * Follows atomic design principles with proper typography and spacing
 */

import { tokens } from '@/lib/design-tokens';

interface SearchingTextProps {
  previousItem: string;
  currentItem: string;
  nextItem: string;
  prefix?: string;
  className?: string;
}

export function SearchingText({
  previousItem,
  currentItem,
  nextItem,
  prefix = "Searching through",
  className = ''
}: SearchingTextProps) {
  return (
    <div 
      className={`flex items-start gap-2 ${className}`}
      style={{
        height: '80px', // h-20 equivalent
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* Static prefix text */}
      <span
        style={{
          color: '#6B7280', // Gray color for prefix
          fontSize: '18px',
          fontWeight: tokens.typography.weights.normal,
          lineHeight: '28px',
          alignSelf: 'center',
        }}
      >
        {prefix}
      </span>
      
      {/* Vertical stack container for rotating text */}
      <div 
        className="relative"
        style={{
          width: '128px', // w-32 equivalent
          height: '80px',
          overflow: 'hidden',
        }}
      >
        {/* Previous item - positioned above current */}
        <div
          className="absolute left-0"
          style={{
            top: '16px', // ~y: -24px from center
            fontSize: '14px',
            color: '#6B7280',
            opacity: 0.3,
            fontWeight: tokens.typography.weights.normal,
            lineHeight: '20px',
            transform: 'translateY(-24px)',
          }}
        >
          {previousItem}
        </div>
        
        {/* Current item - centered */}
        <div
          className="absolute left-0"
          style={{
            top: '31px', // Center position
            fontSize: '18px',
            color: tokens.colors.text.primary, // #FFFFFF
            opacity: 1,
            fontWeight: tokens.typography.weights.normal,
            lineHeight: '28px',
            transform: 'translateY(0px)',
          }}
        >
          {currentItem}
        </div>
        
        {/* Next item - positioned below current */}
        <div
          className="absolute left-0"
          style={{
            top: '55px', // ~y: 24px from center
            fontSize: '14px',
            color: '#6B7280',
            opacity: 0.3,
            fontWeight: tokens.typography.weights.normal,
            lineHeight: '20px',
            transform: 'translateY(24px)',
          }}
        >
          {nextItem}
        </div>
      </div>
    </div>
  );
}