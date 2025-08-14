/**
 * MainFlow - Template component with state management
 * This is where we finally add state and interactivity
 * Following "Thinking in React" Step 4 & 5 - State management and inverse data flow
 */

import { useState, useRef, useEffect, type RefObject } from 'react';
import { CompactButton } from '../molecules';
import { ExpandedAnswerTab, TypingPhase, SearchingPhase, ResultsPhase } from '../organisms';
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

// Mock data for results phase
const MOCK_ANSWER = "Based on recent reporting from The New York Times, artificial intelligence is transforming multiple sectors of the economy. Companies are implementing AI solutions to improve efficiency, reduce costs, and enhance customer experiences. However, concerns about job displacement and ethical implications remain significant challenges that need to be addressed through thoughtful policy and regulation.";

const MOCK_SOURCES = [
  { title: "Trump impeachment", percentage: "34%" },
  { title: "Elon Vs Trump", percentage: "28%" },
  { title: "Fed Interest Rate Announcement", percentage: "10%" },
  { title: "Additional Context", percentage: "10%" }
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
  
  // Results phase state
  const [isLoadingSources, setIsLoadingSources] = useState(true);
  const [followUpValue, setFollowUpValue] = useState('');
  const [isResultsExpanded, setIsResultsExpanded] = useState(false);
  
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
    
    // Reset results state
    setIsLoadingSources(true);
    
    // Simulate search completion after a delay (for demo)
    setTimeout(() => {
      setContentState(CONTENT_STATES.RESULTS);
      setIsResultsExpanded(false); // Start collapsed when showing new results
      
      // Simulate sources loading delay
      setTimeout(() => {
        setIsLoadingSources(false);
      }, 3000);
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
  
  // Results phase event handlers
  const handleSourceClick = (source: { title: string }) => {
    console.log('Source clicked:', source);
    // Could navigate to source, open in new tab, etc.
  };
  
  const handleFollowUpChange = (value: string) => {
    setFollowUpValue(value);
  };
  
  const handleFollowUpSubmit = (query: string) => {
    if (!query.trim()) return;
    
    // Clear follow-up input and start new search
    setFollowUpValue('');
    setSearchValue(query);
    handleSearch(query);
  };
  
  const handleResultsExpandToggle = () => {
    setIsResultsExpanded(!isResultsExpanded);
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
      ) : contentState === CONTENT_STATES.RESULTS ? (
        <ResultsPhase
          searchQuery={searchQuery}
          answerText={MOCK_ANSWER}
          isExpanded={isResultsExpanded}
          onExpandToggle={handleResultsExpandToggle}
          isLoadingSources={isLoadingSources}
          sources={MOCK_SOURCES}
          onSourceClick={handleSourceClick}
          followUpValue={followUpValue}
          onFollowUpChange={handleFollowUpChange}
          onFollowUpSubmit={handleFollowUpSubmit}
          onMicClick={handleMicClick}
          onPlusClick={() => console.log('Plus clicked in results')}
          suggestions={DEFAULT_SUGGESTIONS}
          onSuggestionClick={handleSuggestionClick}
          onMoreClick={handleMoreClick}
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