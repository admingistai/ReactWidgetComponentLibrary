/**
 * SearchBar - Molecular component for search input
 * Pure component - state is managed by parent
 * Following "Thinking in React" principles
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer, IconButton, MicIcon, Text, NYTimesLogo } from '../atoms';
import { PlusButton } from './PlusButton';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onMicClick,
  onPlusClick,
  className = '' 
}: SearchBarProps) {
  return (
    <GlassContainer variant="searchBar" className={className}>
      {/* Left section: Search input area */}
      <div 
        style={{
          width: '285px',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {/* Plus icon and input text */}
        <div 
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            display: 'flex'
          }}
        >
          <PlusButton onClick={onPlusClick} />
          
          {/* Input field (simplified for now - will be enhanced later) */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask Anything"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: tokens.colors.text.accent,
              fontSize: tokens.typography.sizes.sm,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.weights.normal,
              lineHeight: tokens.typography.lineHeights.sm,
              width: '180px'
            }}
          />
        </div>

        {/* Microphone button */}
        <IconButton onClick={onMicClick}>
          <MicIcon />
        </IconButton>
      </div>

      {/* Right section: NYT Logo */}
      <NYTimesLogo />
    </GlassContainer>
  );
}