/**
 * AutocompleteDropdown - Organism component for autocomplete suggestions
 * Uses cmdk for filtering and keyboard navigation
 * Reuses existing SuggestionItem components for visual consistency
 * Pure component - all state managed by parent
 */

import { Command } from 'cmdk';
import { tokens } from '@/lib/design-tokens';
import { SuggestionItem } from '../molecules';

interface AutocompleteDropdownProps {
  suggestions: string[];
  searchValue: string;
  onSuggestionSelect: (suggestion: string) => void;
  className?: string;
}

export function AutocompleteDropdown({
  suggestions,
  searchValue,
  onSuggestionSelect,
  className = ''
}: AutocompleteDropdownProps) {
  // Don't render if no suggestions or no search value
  if (!searchValue.trim() || suggestions.length === 0) {
    return null;
  }

  return (
    <div 
      className={className}
      style={{
        width: '100%',
        marginBottom: tokens.spacing.sm,
        animation: 'slideUpFadeIn 0.2s ease-in-out',
      }}
    >
      <Command
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '12px',
          padding: tokens.spacing.sm,
          maxHeight: '280px',
          overflow: 'hidden',
        }}
      >
        <Command.List
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {suggestions.map((suggestion) => (
            <Command.Item
              key={suggestion}
              value={suggestion}
              onSelect={() => onSuggestionSelect(suggestion)}
              style={{
                padding: '0',
                margin: '0',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              data-selected={false}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.backgroundColor = 'transparent';
              }}
            >
              <SuggestionItem
                text={suggestion}
                onClick={() => onSuggestionSelect(suggestion)}
                className="autocomplete-item"
                variant="search"
                highlightText={searchValue}
              />
            </Command.Item>
          ))}
        </Command.List>
        
        {/* Empty state if no results */}
        <Command.Empty
          style={{
            padding: tokens.spacing.md,
            textAlign: 'center',
            color: tokens.colors.text.primary,
            fontSize: tokens.typography.sizes.sm,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          No suggestions found
        </Command.Empty>
      </Command>
    </div>
  );
}