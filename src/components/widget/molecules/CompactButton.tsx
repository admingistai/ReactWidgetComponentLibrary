/**
 * CompactButton - Molecular component composed of atoms
 * Pure presentational component - receives onClick from parent
 * Following "Thinking in React" - no state, only props
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer, SparkleIcon, NYTimesLogo } from '../atoms';

interface CompactButtonProps {
  onClick: () => void;
  className?: string;
}

export function CompactButton({ onClick, className = '' }: CompactButtonProps) {
  return (
    <GlassContainer 
      variant="compact" 
      onClick={onClick}
      className={className}
    >
      {/* Left section: Icon and Text */}
      <div 
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          display: 'flex'
        }}
      >
        {/* Sparkle Icon Container */}
        <div 
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '1.27px',
            display: 'inline-flex'
          }}
        >
          <SparkleIcon size="sm" />
        </div>
        
        {/* Ask Text with gradient */}
        <span
          style={{
            background: `linear-gradient(90deg, ${tokens.colors.gradient.start} 0%, ${tokens.colors.gradient.end} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: tokens.typography.sizes.sm,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.weights.normal,
            lineHeight: tokens.typography.lineHeights.sm,
          }}
        >
          Ask
        </span>
      </div>

      {/* Right section: NYT Logo */}
      <NYTimesLogo />
    </GlassContainer>
  );
}