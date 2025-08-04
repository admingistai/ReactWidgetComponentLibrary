// Widget View States
export type WidgetView = 'collapsed' | 'expanded' | 'typing' | 'results';

// Suggestion Item
export interface Suggestion {
  id: string;
  text: string;
  icon?: string;
}

// Search Result Item
export interface SearchResult {
  id: string;
  title: string;
  preview: string;
  source: string;
  date: string;
  url?: string;
}

// Widget Data
export interface WidgetData {
  suggestions: Suggestion[];
  searchResults: SearchResult[];
  autocompleteOptions: string[];
}

// Component Props Types
export interface CollapsedViewProps {
  onExpand: () => void;
}

export interface ExpandedViewProps {
  suggestions: Suggestion[];
  onClose: () => void;
  onStartTyping: () => void;
  onSuggestionClick: (suggestion: Suggestion) => void;
}

export interface TypingViewProps {
  query: string;
  isSearching: boolean;
  autocompleteOptions: string[];
  onQueryChange: (query: string) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export interface ResultsViewProps {
  query: string;
  results: SearchResult[];
  onBack: () => void;
  onClose: () => void;
  onResultClick: (result: SearchResult) => void;
}