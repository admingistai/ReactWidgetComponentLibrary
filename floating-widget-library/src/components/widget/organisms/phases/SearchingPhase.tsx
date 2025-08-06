/**
 * SearchingPhase - Organism component for searching state
 * Shows search query as header, searching animation, search bar, and powered by footer
 * Pure component - all state managed by parent
 */

import { tokens } from '@/lib/design-tokens';
import { GlassContainer } from '../../atoms';
import { SearchBar, SearchingAnimation } from '../../molecules';
import { PoweredByFooter } from '../PoweredByFooter';

interface SearchingPhaseProps {
  searchQuery: string;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  className?: string;
}

export function SearchingPhase({
  searchQuery,
  onMicClick,
  onPlusClick,
  className = ''
}: SearchingPhaseProps) {
  return (
    <GlassContainer 
      variant="expanded" 
      className={className}
      style={{
        paddingTop: tokens.spacing.lg,
        paddingBottom: tokens.spacing.md,
        paddingLeft: tokens.spacing.lg,
        paddingRight: tokens.spacing.lg,
        gap: tokens.spacing.lg,
      }}
    >
      {/* Search Query Header */}
      <div 
        style={{
          alignSelf: 'stretch',
          color: tokens.colors.text.primary,
          fontSize: '24px',
          fontFamily: tokens.typography.fontFamily,
          fontWeight: tokens.typography.weights.normal,
          lineHeight: '33.6px',
          wordWrap: 'break-word',
        }}
      >
        {searchQuery}
      </div>
      
      {/* Searching Animation */}
      <div style={{ alignSelf: 'stretch', paddingLeft: 0 }}>
        <SearchingAnimation 
          prefix="Searching through"
          items={["articles", "books", "videos", "podcasts", "archives", "newsletters"]}
          isActive={true}
        />
      </div>
      
      {/* Search Bar (read-only showing the query) */}
      <SearchBar 
        value={searchQuery}
        onChange={() => {}} // Read-only, no changes allowed
        onMicClick={onMicClick}
        onPlusClick={onPlusClick}
        readOnly={true}
      />
      
      {/* Powered By Footer */}
      <PoweredByFooter />
    </GlassContainer>
  );
}