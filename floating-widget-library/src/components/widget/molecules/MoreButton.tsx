/**
 * MoreButton - Molecular component for "More" action button
 * Pure component with no state
 */

import { tokens } from '@/lib/design-tokens';
import { Text } from '../atoms';
import wandIcon from '@/assets/icons/wand.png';

interface MoreButtonProps {
  onClick: () => void;
  className?: string;
}

export function MoreButton({ onClick, className = '' }: MoreButtonProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        width: tokens.dimensions.moreButton.width,
        height: tokens.dimensions.moreButton.height,
        paddingTop: tokens.dimensions.moreButton.padding.top,
        paddingBottom: tokens.dimensions.moreButton.padding.bottom,
        background: tokens.colors.surface.dark,
        borderRadius: tokens.borderRadius.md,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'inline-flex',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <div 
        style={{
          flex: '1 1 0',
          justifyContent: 'center',
          alignItems: 'center',
          gap: tokens.spacing.lg,
          display: 'flex'
        }}
      >
        <img
          src={wandIcon}
          alt="More options"
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'contain'
          }}
          loading="eager"
          draggable={false}
        />
        <Text variant="button">More</Text>
      </div>
    </div>
  );
}