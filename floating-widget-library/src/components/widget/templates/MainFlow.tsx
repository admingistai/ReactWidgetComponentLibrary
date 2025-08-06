/**
 * MainFlow - Template component with state management
 * This is where we finally add state and interactivity
 * Following "Thinking in React" Step 4 & 5 - State management and inverse data flow
 */

import { useState, useRef, useEffect, type RefObject } from 'react';
import { CompactButton } from '../molecules';
import { ExpandedAnswerTab, TypingPhase, SearchingPhase } from '../organisms';
import { useClickOutside } from '@/hooks/useClickOutside';
import { CONTENT_STATES, type ContentState } from '@/lib/constants';
import { filterSuggestions } from '@/lib/autocomplete-data';

interface MainFlowProps {
  initialExpanded?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
  className?: string;
}

// Static data for suggestions (could be passed as props in a real app)
const DEFAULT_SUGGESTIONS = [
  "Top Stories",
  "Breaking News", 
  "Generate a new Wordle"
];

export function MainFlow({ 
  initialExpanded = false,
  onSuggestionSelect,
  className = ''
}: MainFlowProps) {
  // State management - minimal representation
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [searchValue, setSearchValue] = useState('');
  const [contentState, setContentState] = useState<ContentState>(CONTENT_STATES.IDLE);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Store the query being searched
  
  // Ref for click-outside detection
  const widgetRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Click-outside handler to collapse widget
  const handleClickOutside = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };
  
  // Use click-outside hook - only when expanded to avoid unnecessary listeners
  useClickOutside(widgetRef as RefObject<HTMLElement>, handleClickOutside, isExpanded);
  
  // Filter autocomplete suggestions based on search value
  useEffect(() => {
    const suggestions = filterSuggestions(searchValue, 6);
    setFilteredSuggestions(suggestions);
  }, [searchValue]);
  
  // Event handlers - inverse data flow
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };
  
  const handleSuggestionClick = (text: string) => {
    setSearchValue(text);
    // Notify parent if needed
    onSuggestionSelect?.(text);
    
    // Could close the widget or perform other actions
    // For now, just populate the search
  };
  
  const handleMoreClick = () => {
    // Handle "More" button click
    console.log('More clicked');
    // Could load more suggestions, etc.
  };
  
  const handleMicClick = () => {
    // Handle microphone button click
    console.log('Mic clicked');
    // Could start voice recording, etc.
  };
  
  const handleSearchFocus = () => {
    setContentState(CONTENT_STATES.TYPING);
  };
  
  const handleSearchBlur = () => {
    // Only return to IDLE if we're not clicking within the widget
    // This will be handled by a click handler on the widget container
  };

  const handleAutocompleteSuggestionSelect = (suggestion: string) => {
    setSearchValue(suggestion);
    // Clear autocomplete suggestions after selection
    setFilteredSuggestions([]);
    // Optionally notify parent
    onSuggestionSelect?.(suggestion);
  };
  
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // Store the search query and transition to searching state
    setSearchQuery(query);
    setContentState(CONTENT_STATES.SEARCHING);
    
    // Clear autocomplete suggestions
    setFilteredSuggestions([]);
    
    // Simulate search completion after a delay (for demo)
    setTimeout(() => {
      // In a real app, this would transition to RESULTS state
      // For now, just go back to IDLE after "searching"
      setContentState(CONTENT_STATES.IDLE);
    }, 3000);
  };
  
  const handleWidgetClick = (e: React.MouseEvent) => {
    // If we're in typing phase and clicked inside widget but not on search input
    if (contentState === CONTENT_STATES.TYPING && 
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target as Node)) {
      setContentState(CONTENT_STATES.IDLE);
    }
  };
  
  // Render based on state
  return (
    <div ref={widgetRef} className={className} onClick={handleWidgetClick}>
      {!isExpanded ? (
        <CompactButton onClick={handleToggleExpand} />
      ) : contentState === CONTENT_STATES.TYPING ? (
        <TypingPhase
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
          onMicClick={handleMicClick}
          autocompleteSuggestions={filteredSuggestions}
          onAutocompleteSuggestionSelect={handleAutocompleteSuggestionSelect}
        />
      ) : contentState === CONTENT_STATES.SEARCHING ? (
        <SearchingPhase
          searchQuery={searchQuery}
          onMicClick={handleMicClick}
        />
      ) : (
        <ExpandedAnswerTab
          searchValue={searchValue}
          suggestions={DEFAULT_SUGGESTIONS}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSuggestionClick}
          onMoreClick={handleMoreClick}
          onMicClick={handleMicClick}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
        />
      )}
    </div>
  );
}