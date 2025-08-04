/**
 * SuggestionsList - Organism for displaying suggestion items
 * Pure component - maps over data from parent
 */

import { tokens } from '@/lib/design-tokens';
import { SuggestionItem } from '../molecules';

interface SuggestionsListProps {
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
  className?: string;
}

export function SuggestionsList({ 
  suggestions, 
  onSuggestionClick,
  className = '' 
}: SuggestionsListProps) {
  return (
    <div 
      className={className}
      style={{
        width: tokens.dimensions.suggestionsList.width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: tokens.spacing.lg,
        display: 'flex'
      }}
    >
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={index}
          text={suggestion}
          onClick={onSuggestionClick}
        />
      ))}
    </div>
  );
}