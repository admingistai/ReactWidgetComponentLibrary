/**
 * SuggestionItem - Molecular component for individual suggestions
 * Pure component - click handling passed from parent
 */

import { tokens } from '@/lib/design-tokens';
import { Text } from '../atoms';
import twoStarIcon from '@/assets/icons/2star.png';

interface SuggestionItemProps {
  text: string;
  onClick: (text: string) => void;
  className?: string;
}

export function SuggestionItem({ text, onClick, className = '' }: SuggestionItemProps) {
  return (
    <div
      className={className}
      onClick={() => onClick(text)}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: tokens.spacing.md,
        display: 'inline-flex',
        cursor: 'pointer',
        width: '100%',
        padding: `${tokens.spacing.xs} 0`,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <img
        src={twoStarIcon}
        alt="Suggestion"
        style={{
          width: '16px',
          height: '16px',
          objectFit: 'contain'
        }}
        loading="eager"
        draggable={false}
      />
      <Text variant="suggestion">{text}</Text>
    </div>
  );
}