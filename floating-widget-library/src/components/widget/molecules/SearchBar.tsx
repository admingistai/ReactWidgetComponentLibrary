/**
 * SearchBar - Molecular component for search input
 * Pure component - state is managed by parent
 * Following "Thinking in React" principles
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer, IconButton, MicIcon, NYTimesLogo } from '../atoms';
import { PlusButton } from './PlusButton';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onMicClick,
  onPlusClick,
  onFocus,
  onBlur,
  className = '' 
}: SearchBarProps) {
  // Inline styles for gradient text and placeholder
  const inputStyles = {
    background: `linear-gradient(${tokens.colors.gradient.direction}, ${tokens.colors.gradient.start} 0%, ${tokens.colors.gradient.end} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    border: 'none',
    outline: 'none',
    fontSize: tokens.typography.sizes.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.weights.normal,
    lineHeight: tokens.typography.lineHeights.sm,
    width: '180px'
  };
  return (
    <>
      {/* CSS for placeholder styling */}
      <style>{`
        .gradient-input-placeholder::placeholder {
          color: ${tokens.colors.text.accent};
          -webkit-text-fill-color: ${tokens.colors.text.accent};
          opacity: 0.7;
        }
      `}</style>
      
      <GlassContainer 
        variant="searchBar" 
        className={className}
      >
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
          
          {/* Input field with gradient text */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Ask Anything"
            style={inputStyles}
            className="gradient-input-placeholder"
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
    </>
  );
}