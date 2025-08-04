/**
 * MainFlow - Template component with state management
 * This is where we finally add state and interactivity
 * Following "Thinking in React" Step 4 & 5 - State management and inverse data flow
 */

import { useState, useRef } from 'react';
import { CompactButton } from '../molecules';
import { ExpandedAnswerTab } from '../organisms';
import { useClickOutside } from '@/hooks/useClickOutside';

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
  
  // Ref for click-outside detection
  const widgetRef = useRef<HTMLDivElement>(null);
  
  // Click-outside handler to collapse widget
  const handleClickOutside = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };
  
  // Use click-outside hook - only when expanded to avoid unnecessary listeners
  useClickOutside(widgetRef, handleClickOutside, isExpanded);
  
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
  
  // Render based on state
  return (
    <div ref={widgetRef} className={className}>
      {isExpanded ? (
        <ExpandedAnswerTab
          searchValue={searchValue}
          suggestions={DEFAULT_SUGGESTIONS}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSuggestionClick}
          onMoreClick={handleMoreClick}
          onMicClick={handleMicClick}
        />
      ) : (
        <CompactButton onClick={handleToggleExpand} />
      )}
    </div>
  );
}