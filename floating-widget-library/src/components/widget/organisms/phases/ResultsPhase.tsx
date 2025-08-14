/**
 * ResultsPhase - Organism for displaying search results in expanded layout
 * Now supports expand/collapse functionality with ExpandButton
 */

import { GlassContainer } from '../../atoms/containers/GlassContainer';
import { Text } from '../../atoms/typography/Text';
import { AnswerHeader } from '../../molecules/content/AnswerHeader';
import { SearchBar } from '../../molecules/search/SearchBar';
import { SuggestionsList } from '../SuggestionsList';
import { SourcesBar } from '../SourcesBar';
import { ExpandButton } from '../../molecules/buttons/ExpandButton';
import { MoreButton } from '../../molecules/buttons/MoreButton';
import { PoweredByButton } from '../../molecules/buttons/PoweredByButton';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties } from 'react';

interface SourceData {
  title: string;
  percentage?: string;
}

interface ResultsPhaseProps {
  // Search context
  searchQuery?: string;
  answerText: string;
  
  // Expand/Collapse state
  isExpanded?: boolean;
  onExpandToggle?: () => void;
  
  // Sources
  isLoadingSources?: boolean;
  sources?: SourceData[];
  onSourceClick?: (source: SourceData) => void;
  
  // Follow-up search
  followUpValue?: string;
  onFollowUpChange?: (value: string) => void;
  onFollowUpSubmit?: (value: string) => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  
  // Suggestions
  suggestions?: string[];
  onSuggestionClick?: (text: string) => void;
  onMoreClick?: () => void;
  
  // Layout
  className?: string;
  style?: CSSProperties;
}

export function ResultsPhase({
  searchQuery = '',
  answerText,
  isExpanded = false,
  onExpandToggle,
  isLoadingSources = false,
  sources = [],
  onSourceClick,
  followUpValue = '',
  onFollowUpChange = () => {},
  onFollowUpSubmit,
  onMicClick,
  onPlusClick,
  suggestions = [],
  onSuggestionClick = () => {},
  onMoreClick = () => {},
  className = '',
  style = {}
}: ResultsPhaseProps) {
  return (
    <GlassContainer 
      variant="expanded"
      className={className}
      style={{
        ...style,
        minHeight: isExpanded ? tokens.dimensions.expandedContainer.minHeight : '120px',
        transition: 'min-height 0.3s ease'
      }}
    >
      {/* Header with Expand Button */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: tokens.spacing.lg
      }}>
        <AnswerHeader searchQuery={searchQuery} />
        {onExpandToggle && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={onExpandToggle}
          />
        )}
      </div>
      
      {/* Content based on expand/collapse state */}
      {!isExpanded ? (
        /* Collapsed state - shows preview with all UI elements */
        <>
          {/* Answer Preview - 3 lines with fade */}
          <div className="text-fade-three-lines" style={{ 
            width: '100%',
            marginBottom: tokens.spacing.lg
          }}>
            <Text variant="body">{answerText}</Text>
          </div>
          
          {/* Follow-up Search Bar */}
          <SearchBar
            value={followUpValue}
            onChange={onFollowUpChange}
            onSubmit={onFollowUpSubmit}
            onMicClick={onMicClick}
            onPlusClick={onPlusClick}
            placeholder="What did Trump say?"
          />
          
          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              onSuggestionClick={onSuggestionClick}
            />
          )}
          
          {/* More Button */}
          <MoreButton onClick={onMoreClick} />
          
          {/* Powered By Footer */}
          <PoweredByButton />
        </>
      ) : (
        /* Expanded state - shows full content */
        <>
          {/* Full Answer Content */}
          <div style={{ 
            width: '100%', 
            textAlign: 'left',
            marginBottom: tokens.spacing.lg
          }}>
            <Text variant="body">{answerText}</Text>
            
            {/* Reaction dots */}
            <div style={{
              display: 'flex',
              gap: '4px',
              marginTop: tokens.spacing.md
            }}>
              <span style={{ fontSize: '12px' }}>👍</span>
              <span style={{ fontSize: '12px' }}>👎</span>
              <span style={{ fontSize: '12px' }}>📋</span>
            </div>
          </div>
          
          {/* Sources Bar with percentages */}
          <SourcesBar
            isLoading={isLoadingSources}
            sources={sources.map(s => ({ 
              title: s.title, 
              percentage: s.percentage || '0%' 
            }))}
            onSourceClick={onSourceClick}
          />
          
          {/* Follow-up Search Bar */}
          <SearchBar
            value={followUpValue}
            onChange={onFollowUpChange}
            onSubmit={onFollowUpSubmit}
            onMicClick={onMicClick}
            onPlusClick={onPlusClick}
            placeholder="Ask a follow-up"
          />
          
          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              onSuggestionClick={onSuggestionClick}
            />
          )}
          
          {/* More Button */}
          <MoreButton onClick={onMoreClick} />
          
          {/* Powered By Footer */}
          <PoweredByButton />
        </>
      )}
    </GlassContainer>
  );
}