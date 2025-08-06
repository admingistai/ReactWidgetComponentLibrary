/**
 * TypingPhase - Organism component for focused typing state
 * Shows minimal UI with just header and focused search bar
 * Pure component - all state managed by parent
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer } from '../../atoms';
import { SearchBar } from '../../molecules';
import { AutocompleteDropdown } from '../AutocompleteDropdown';

interface TypingPhaseProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  autocompleteSuggestions?: string[];
  onAutocompleteSuggestionSelect?: (suggestion: string) => void;
  className?: string;
}

export function TypingPhase({
  searchValue,
  onSearchChange,
  onSearch,
  onSearchFocus,
  onSearchBlur,
  onMicClick,
  onPlusClick,
  autocompleteSuggestions = [],
  onAutocompleteSuggestionSelect,
  className = ''
}: TypingPhaseProps) {
  // Check if autocomplete suggestions are visible
  const hasAutocompleteSuggestions = autocompleteSuggestions.length > 0;
  
  // Conditional styles for when autocomplete is visible
  const containerStyle = hasAutocompleteSuggestions ? {
    paddingTop: tokens.spacing.sm, // 5px when autocomplete is visible
    gap: tokens.spacing.sm, // Reduce gap between elements
  } : {};

  return (
    <GlassContainer variant="expanded" className={className} style={containerStyle}>
      {/* Header with larger text - hides completely when autocomplete is visible */}
      {!hasAutocompleteSuggestions && (
        <div 
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: tokens.colors.text.primary,
            fontSize: tokens.typography.sizes.lg,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.weights.normal,
            lineHeight: tokens.typography.lineHeights.lg,
            wordWrap: 'break-word',
            opacity: searchValue.length > 0 ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          Ask New York Times Anything!
        </div>
      )}
      
      {/* Autocomplete Dropdown - positioned above search bar */}
      {onAutocompleteSuggestionSelect && (
        <AutocompleteDropdown
          suggestions={autocompleteSuggestions}
          searchValue={searchValue}
          onSuggestionSelect={(suggestion) => {
            onAutocompleteSuggestionSelect(suggestion);
            // Trigger search when autocomplete is selected
            if (onSearch) {
              onSearch(suggestion);
            }
          }}
        />
      )}

      {/* Focused Search Bar */}
      <SearchBar 
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearch}
        onMicClick={onMicClick}
        onPlusClick={onPlusClick}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
      />
    </GlassContainer>
  );
}