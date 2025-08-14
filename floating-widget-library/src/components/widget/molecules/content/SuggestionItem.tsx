/**
 * SuggestionItem - Molecular component for individual suggestions
 * Pure component - click handling passed from parent
 */

import { tokens } from '@/lib/design-tokens';
import { Text } from '../../atoms';
import twoStarIcon from '@/assets/icons/2star.png';
import magnifyingGlassIcon from '@/assets/icons/magnifyingglass.png';

interface SuggestionItemProps {
  text: string;
  onClick: (text: string) => void;
  className?: string;
  variant?: 'default' | 'search';
  highlightText?: string;
  caseSensitive?: boolean;
}

// Utility function to split text by highlight
function splitTextByHighlight(text: string, highlight: string, caseSensitive = false): {
  beforeMatch: string;
  match: string;
  afterMatch: string;
} {
  if (!highlight.trim()) {
    return { beforeMatch: '', match: '', afterMatch: text };
  }

  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchHighlight = caseSensitive ? highlight : highlight.toLowerCase();
  const index = searchText.indexOf(searchHighlight);

  if (index === -1) {
    return { beforeMatch: '', match: '', afterMatch: text };
  }

  return {
    beforeMatch: text.substring(0, index),
    match: text.substring(index, index + highlight.length),
    afterMatch: text.substring(index + highlight.length)
  };
}

export function SuggestionItem({ 
  text, 
  onClick, 
  className = '', 
  variant = 'default',
  highlightText,
  caseSensitive = false 
}: SuggestionItemProps) {
  // Select icon based on variant
  const iconSrc = variant === 'search' ? magnifyingGlassIcon : twoStarIcon;
  const iconAlt = variant === 'search' ? 'Search' : 'Suggestion';

  // Split text for highlighting
  const { beforeMatch, match, afterMatch } = splitTextByHighlight(text, highlightText || '', caseSensitive);
  const hasHighlight = highlightText && match;

  // Gradient style for highlighted text
  const gradientStyle = {
    background: `linear-gradient(${tokens.colors.gradient.direction}, ${tokens.colors.gradient.start} 0%, ${tokens.colors.gradient.end} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  // Base text styles from Text component's 'suggestion' variant
  const baseTextStyle = {
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    wordWrap: 'break-word' as const,
  };

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
        src={iconSrc}
        alt={iconAlt}
        style={{
          width: '16px',
          height: '16px',
          objectFit: 'contain'
        }}
        loading="eager"
        draggable={false}
      />
      {hasHighlight ? (
        <div style={baseTextStyle}>
          {beforeMatch && <span style={{ color: tokens.colors.text.primary }}>{beforeMatch}</span>}
          <span style={gradientStyle}>{match}</span>
          {afterMatch && <span style={{ color: tokens.colors.text.primary }}>{afterMatch}</span>}
        </div>
      ) : (
        <Text variant="suggestion">{text}</Text>
      )}
    </div>
  );
}