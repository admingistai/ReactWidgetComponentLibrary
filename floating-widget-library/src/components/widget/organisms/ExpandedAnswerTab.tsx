/**
 * ExpandedAnswerTab - Organism for the expanded widget view
 * Composes all expanded state components
 * Pure component - all state passed from parent
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer } from '../atoms';
import { SearchBar, MoreButton } from '../molecules';
import { Header } from './Header';
import { SuggestionsList } from './SuggestionsList';
import { PoweredByFooter } from './PoweredByFooter';

interface ExpandedAnswerTabProps {
  searchValue: string;
  suggestions: string[];
  onSearchChange: (value: string) => void;
  onSuggestionClick: (text: string) => void;
  onMoreClick: () => void;
  onMicClick?: () => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  className?: string;
}

export function ExpandedAnswerTab({
  searchValue,
  suggestions,
  onSearchChange,
  onSuggestionClick,
  onMoreClick,
  onMicClick,
  onSearchFocus,
  onSearchBlur,
  className = ''
}: ExpandedAnswerTabProps) {
  return (
    <GlassContainer variant="expanded" className={className}>
      {/* Header Section */}
      <Header />
      
      {/* Search Bar */}
      <SearchBar 
        value={searchValue}
        onChange={onSearchChange}
        onMicClick={onMicClick}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
      />
      
      {/* Suggestions Section */}
      <div 
        style={{
          width: tokens.dimensions.suggestionsList.width,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: tokens.dimensions.suggestionsList.gap,
          display: 'flex'
        }}
      >
        {/* Suggestions List */}
        <SuggestionsList 
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
        
        {/* More Button */}
        <MoreButton onClick={onMoreClick} />
      </div>
      
      {/* Footer */}
      <PoweredByFooter />
    </GlassContainer>
  );
}