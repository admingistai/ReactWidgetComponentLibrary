/**
 * SuggestionItem - Molecular component for individual suggestions
 * Pure component - click handling passed from parent
 */

import type { CSSProperties } from 'react';
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
  showIcon?: boolean;
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
  caseSensitive = false,
  showIcon = true
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

  const containerStyles: CSSProperties = {
    justifyContent: showIcon ? 'flex-start' : 'center',
    alignItems: 'center',
    gap: showIcon ? tokens.spacing.md : 0,
    display: 'inline-flex',
    cursor: 'pointer',
    width: '100%',
    padding: showIcon
      ? `${tokens.spacing.xs} 0`
      : `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    transition: 'opacity 0.2s, background-color 0.2s',
    textAlign: showIcon ? 'left' : 'center',
    borderRadius: showIcon ? undefined : '9999px',
    background: showIcon ? 'transparent' : 'rgba(255, 255, 255, 0.08)'
  };

  const textStyle: CSSProperties = {
    ...baseTextStyle,
    textAlign: showIcon ? 'left' : 'center',
    width: '100%',
  };

  return (
    <div
      className={className}
      onClick={() => onClick(text)}
      style={containerStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.85';
        if (!showIcon) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        if (!showIcon) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        }
      }}
    >
      {showIcon && (
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
      )}
      {hasHighlight ? (
        <div style={textStyle}>
          {beforeMatch && <span style={{ color: tokens.colors.text.primary }}>{beforeMatch}</span>}
          <span style={gradientStyle}>{match}</span>
          {afterMatch && <span style={{ color: tokens.colors.text.primary }}>{afterMatch}</span>}
        </div>
      ) : (
        <Text variant="suggestion" style={textStyle}>
          {text}
        </Text>
      )}
    </div>
  );
}
