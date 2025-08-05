# Widget States - Practical Implementation Guide

## Quick Start

This guide provides ready-to-use code for implementing new widget states in your existing codebase.

## Step 1: Extend Constants

Add this to `/src/lib/constants.ts`:

```typescript
// Add after existing WIDGET_STATES
export const CONTENT_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SEARCHING: 'searching',
  RESULTS: 'results',
  ERROR: 'error',
  VOICE_INPUT: 'voice_input',
  EMPTY: 'empty',
} as const;

export type ContentState = (typeof CONTENT_STATES)[keyof typeof CONTENT_STATES];

// Add error types
export const ERROR_TYPES = {
  NETWORK: 'network',
  TIMEOUT: 'timeout',
  SERVER: 'server',
  UNKNOWN: 'unknown',
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];
```

## Step 2: Create State Components

Create new directory `/src/components/widget/states/` with these components:

### LoadingState.tsx
```typescript
import { tokens } from '@/lib/design-tokens';
import { SparkleIcon, Text } from '../atoms';

export function LoadingState() {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.lg,
        padding: tokens.spacing['2xl'],
        minHeight: '200px',
      }}
    >
      <SparkleIcon 
        size={32} 
        style={{
          animation: 'spin 1s linear infinite',
        }}
      />
      <Text variant="body">Searching for answers...</Text>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

### ResultsState.tsx
```typescript
import { tokens } from '@/lib/design-tokens';
import { Text, GlassContainer, SparkleIcon } from '../atoms';

interface Result {
  id: string;
  title: string;
  description: string;
  url?: string;
}

interface ResultsStateProps {
  results: Result[];
  onResultClick: (result: Result) => void;
}

export function ResultsState({ results, onResultClick }: ResultsStateProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.lg,
        width: '100%',
      }}
    >
      <Text variant="accent" style={{ marginBottom: tokens.spacing.md }}>
        Found {results.length} results
      </Text>
      
      {results.map((result) => (
        <GlassContainer
          key={result.id}
          variant="button"
          onClick={() => onResultClick(result)}
          style={{
            width: '100%',
            padding: tokens.spacing.lg,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', gap: tokens.spacing.sm, width: '100%' }}>
            <SparkleIcon size={20} />
            <div style={{ flex: 1 }}>
              <Text variant="body" style={{ fontWeight: 600 }}>
                {result.title}
              </Text>
              <Text variant="accent" style={{ 
                fontSize: tokens.typography.sizes.xs,
                marginTop: tokens.spacing.xs,
              }}>
                {result.description}
              </Text>
            </div>
          </div>
        </GlassContainer>
      ))}
    </div>
  );
}
```

### ErrorState.tsx
```typescript
import { tokens } from '@/lib/design-tokens';
import { Text, GlassContainer } from '../atoms';
import { ERROR_TYPES, ErrorType } from '@/lib/constants';

interface ErrorStateProps {
  error: Error;
  errorType?: ErrorType;
  onRetry: () => void;
}

const errorMessages: Record<ErrorType, string> = {
  [ERROR_TYPES.NETWORK]: 'Please check your internet connection',
  [ERROR_TYPES.TIMEOUT]: 'The request took too long. Please try again',
  [ERROR_TYPES.SERVER]: 'Something went wrong on our end',
  [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred',
};

export function ErrorState({ error, errorType = ERROR_TYPES.UNKNOWN, onRetry }: ErrorStateProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.lg,
        padding: tokens.spacing['2xl'],
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '48px' }}>⚠️</div>
      
      <div>
        <Text variant="body" style={{ marginBottom: tokens.spacing.sm }}>
          Oops! Something went wrong
        </Text>
        <Text variant="accent">
          {errorMessages[errorType]}
        </Text>
      </div>
      
      <GlassContainer
        variant="button"
        onClick={onRetry}
        style={{
          padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
          cursor: 'pointer',
        }}
      >
        <Text variant="button">Try Again</Text>
      </GlassContainer>
      
      {/* Developer info */}
      {process.env.NODE_ENV === 'development' && (
        <Text variant="accent" style={{ 
          fontSize: tokens.typography.sizes.xs,
          opacity: 0.7,
          maxWidth: '300px',
          wordBreak: 'break-word',
        }}>
          {error.message}
        </Text>
      )}
    </div>
  );
}
```

### EmptyState.tsx
```typescript
import { tokens } from '@/lib/design-tokens';
import { Text } from '../atoms';

interface EmptyStateProps {
  query: string;
  onSuggestionsClick: () => void;
}

export function EmptyState({ query, onSuggestionsClick }: EmptyStateProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.lg,
        padding: tokens.spacing['2xl'],
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '48px' }}>🔍</div>
      
      <div>
        <Text variant="body" style={{ marginBottom: tokens.spacing.sm }}>
          No results found for "{query}"
        </Text>
        <Text variant="accent">
          Try different keywords or browse suggestions
        </Text>
      </div>
      
      <button
        onClick={onSuggestionsClick}
        style={{
          background: 'none',
          border: 'none',
          color: tokens.colors.primary,
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: tokens.spacing.sm,
        }}
      >
        <Text variant="accent">View suggestions</Text>
      </button>
    </div>
  );
}
```

### VoiceInputState.tsx
```typescript
import { tokens } from '@/lib/design-tokens';
import { Text, IconButton, GlassContainer } from '../atoms';

interface VoiceInputStateProps {
  onStop: () => void;
  isListening: boolean;
}

export function VoiceInputState({ onStop, isListening }: VoiceInputStateProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xl,
        padding: tokens.spacing['2xl'],
      }}
    >
      {/* Voice visualization */}
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: `linear-gradient(${tokens.colors.gradient.direction}, ${tokens.colors.gradient.start}, ${tokens.colors.gradient.end})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: tokens.colors.surface.dark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
        }}>
          🎤
        </div>
      </div>
      
      <Text variant="body">
        {isListening ? 'Listening...' : 'Getting ready...'}
      </Text>
      
      <GlassContainer
        variant="button"
        onClick={onStop}
        style={{
          padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
          cursor: 'pointer',
        }}
      >
        <Text variant="button">Stop</Text>
      </GlassContainer>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

### index.ts
```typescript
export * from './LoadingState';
export * from './ResultsState';
export * from './ErrorState';
export * from './EmptyState';
export * from './VoiceInputState';
```

## Step 3: Create Enhanced MainFlow

Create `/src/components/widget/templates/EnhancedMainFlow.tsx`:

```typescript
import { useState, useRef, useCallback, type RefObject } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useWidget } from '@/hooks/useWidget';
import { WIDGET_STATES, CONTENT_STATES, ERROR_TYPES } from '@/lib/constants';
import type { ContentState, ErrorType } from '@/lib/constants';

// Import all components
import { CompactButton } from '../molecules';
import { ExpandedAnswerTab } from '../organisms';
import {
  LoadingState,
  ResultsState,
  ErrorState,
  EmptyState,
  VoiceInputState,
} from '../states';

interface EnhancedMainFlowProps {
  initialExpanded?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
  onSearch?: (query: string) => Promise<any[]>;
  className?: string;
}

const DEFAULT_SUGGESTIONS = [
  "Top Stories",
  "Breaking News", 
  "Generate a new Wordle"
];

export function EnhancedMainFlow({ 
  initialExpanded = false,
  onSuggestionSelect,
  onSearch,
  className = ''
}: EnhancedMainFlowProps) {
  // Layout state using existing hook
  const widget = useWidget({
    id: 'main-widget',
    initialState: initialExpanded ? WIDGET_STATES.FLOATING : WIDGET_STATES.MINIMIZED,
  });
  
  // Content state
  const [contentState, setContentState] = useState<ContentState>(CONTENT_STATES.IDLE);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(ERROR_TYPES.UNKNOWN);
  
  // Voice state
  const [isListening, setIsListening] = useState(false);
  
  // Refs
  const widgetRef = useRef<HTMLDivElement>(null);
  
  // Click outside to minimize (not hide)
  const handleClickOutside = useCallback(() => {
    if (widget.isFloating || widget.isExpanded) {
      widget.toggleMinimize();
    }
  }, [widget]);
  
  useClickOutside(
    widgetRef as RefObject<HTMLElement>, 
    handleClickOutside, 
    !widget.isMinimized && !widget.isHidden
  );
  
  // Search handling with states
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setContentState(CONTENT_STATES.SEARCHING);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let searchResults: any[];
      
      if (onSearch) {
        searchResults = await onSearch(query);
      } else {
        // Mock search results
        searchResults = [
          {
            id: '1',
            title: `Results for "${query}"`,
            description: 'This is a mock search result. Implement onSearch prop for real results.',
          },
          {
            id: '2',
            title: 'Breaking News Update',
            description: 'Latest updates on your search query with real-time information.',
          },
          {
            id: '3',
            title: 'Related Articles',
            description: 'Find more articles related to your search.',
          },
        ];
      }
      
      setResults(searchResults);
      setContentState(searchResults.length > 0 ? CONTENT_STATES.RESULTS : CONTENT_STATES.EMPTY);
    } catch (err) {
      setError(err as Error);
      
      // Determine error type
      if (err instanceof TypeError && err.message.includes('network')) {
        setErrorType(ERROR_TYPES.NETWORK);
      } else if (err instanceof Error && err.message.includes('timeout')) {
        setErrorType(ERROR_TYPES.TIMEOUT);
      } else {
        setErrorType(ERROR_TYPES.UNKNOWN);
      }
      
      setContentState(CONTENT_STATES.ERROR);
    }
  }, [onSearch]);
  
  // Voice input handling
  const handleStartVoice = useCallback(() => {
    setContentState(CONTENT_STATES.VOICE_INPUT);
    setIsListening(false);
    
    // Simulate voice setup
    setTimeout(() => {
      setIsListening(true);
    }, 500);
    
    // Simulate voice recognition after 3 seconds
    setTimeout(() => {
      const mockTranscript = "What's the weather today?";
      setSearchValue(mockTranscript);
      setContentState(CONTENT_STATES.IDLE);
      handleSearch(mockTranscript);
    }, 3000);
  }, [handleSearch]);
  
  const handleStopVoice = useCallback(() => {
    setIsListening(false);
    setContentState(CONTENT_STATES.IDLE);
  }, []);
  
  // Event handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    // Clear results if search is cleared
    if (!value && contentState === CONTENT_STATES.RESULTS) {
      setContentState(CONTENT_STATES.IDLE);
      setResults([]);
    }
  }, [contentState]);
  
  const handleSuggestionClick = useCallback((text: string) => {
    setSearchValue(text);
    onSuggestionSelect?.(text);
    handleSearch(text);
  }, [onSuggestionSelect, handleSearch]);
  
  const handleResultClick = useCallback((result: any) => {
    console.log('Result clicked:', result);
    // Handle result selection (e.g., navigate, open modal, etc.)
  }, []);
  
  const handleRetry = useCallback(() => {
    if (searchValue) {
      handleSearch(searchValue);
    } else {
      setContentState(CONTENT_STATES.IDLE);
    }
  }, [searchValue, handleSearch]);
  
  const handleBackToSuggestions = useCallback(() => {
    setContentState(CONTENT_STATES.IDLE);
    setSearchValue('');
    setResults([]);
  }, []);
  
  // Render content based on content state
  const renderContent = () => {
    switch (contentState) {
      case CONTENT_STATES.LOADING:
      case CONTENT_STATES.SEARCHING:
        return <LoadingState />;
        
      case CONTENT_STATES.RESULTS:
        return (
          <ResultsState 
            results={results}
            onResultClick={handleResultClick}
          />
        );
        
      case CONTENT_STATES.ERROR:
        return (
          <ErrorState 
            error={error!}
            errorType={errorType}
            onRetry={handleRetry}
          />
        );
        
      case CONTENT_STATES.EMPTY:
        return (
          <EmptyState 
            query={searchValue}
            onSuggestionsClick={handleBackToSuggestions}
          />
        );
        
      case CONTENT_STATES.VOICE_INPUT:
        return (
          <VoiceInputState 
            onStop={handleStopVoice}
            isListening={isListening}
          />
        );
        
      case CONTENT_STATES.IDLE:
      default:
        return null; // Handled by ExpandedAnswerTab
    }
  };
  
  // Main render logic based on widget state
  if (widget.isHidden) return null;
  
  if (widget.isMinimized) {
    return (
      <div ref={widgetRef} className={className}>
        <CompactButton onClick={() => widget.setState(WIDGET_STATES.FLOATING)} />
      </div>
    );
  }
  
  return (
    <div ref={widgetRef} className={className}>
      <ExpandedAnswerTab
        searchValue={searchValue}
        suggestions={contentState === CONTENT_STATES.IDLE ? DEFAULT_SUGGESTIONS : []}
        onSearchChange={handleSearchChange}
        onSuggestionClick={handleSuggestionClick}
        onMoreClick={() => console.log('More clicked')}
        onMicClick={handleStartVoice}
      >
        {/* Inject content state component */}
        {contentState !== CONTENT_STATES.IDLE && (
          <div style={{ width: '100%', marginTop: '20px' }}>
            {renderContent()}
          </div>
        )}
      </ExpandedAnswerTab>
    </div>
  );
}
```

## Step 4: Update ExpandedAnswerTab

Modify `/src/components/widget/organisms/ExpandedAnswerTab.tsx` to accept children:

```typescript
import { ReactNode } from 'react';
// ... other imports

interface ExpandedAnswerTabProps {
  searchValue: string;
  suggestions: string[];
  onSearchChange: (value: string) => void;
  onSuggestionClick: (text: string) => void;
  onMoreClick: () => void;
  onMicClick?: () => void;
  className?: string;
  children?: ReactNode; // Add this
}

export function ExpandedAnswerTab({
  searchValue,
  suggestions,
  onSearchChange,
  onSuggestionClick,
  onMoreClick,
  onMicClick,
  className = '',
  children, // Add this
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
        onKeyPress={(e) => {
          if (e.key === 'Enter' && searchValue) {
            onSuggestionClick(searchValue);
          }
        }}
      />
      
      {/* Dynamic Content Area */}
      {children ? (
        children
      ) : (
        /* Default suggestions view */
        <div style={{
          width: tokens.dimensions.suggestionsList.width,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: tokens.dimensions.suggestionsList.gap,
          display: 'flex'
        }}>
          <SuggestionsList 
            suggestions={suggestions}
            onSuggestionClick={onSuggestionClick}
          />
          <MoreButton onClick={onMoreClick} />
        </div>
      )}
      
      {/* Footer */}
      <PoweredByFooter />
    </GlassContainer>
  );
}
```

## Step 5: Use in App.tsx

Update your main app to use the enhanced widget:

```typescript
import { EnhancedMainFlow } from './components/widget/templates/EnhancedMainFlow';

function App() {
  // Mock search function
  const handleSearch = async (query: string) => {
    // Replace with real API call
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  };
  
  return (
    <div className="app">
      <EnhancedMainFlow 
        initialExpanded={false}
        onSearch={handleSearch}
        onSuggestionSelect={(suggestion) => {
          console.log('Suggestion selected:', suggestion);
        }}
      />
    </div>
  );
}
```

## Visual State Diagram

```
┌─────────────┐     User clicks      ┌─────────────┐
│  MINIMIZED  │ ──────────────────► │  FLOATING   │
└─────────────┘                      └─────┬───────┘
                                           │
                                    User searches
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │  SEARCHING  │
                                    └─────┬───────┘
                                          │
                            ┌─────────────┴─────────────┐
                            │                           │
                     Success │                           │ Error
                            ▼                           ▼
                    ┌─────────────┐             ┌─────────────┐
                    │   RESULTS   │             │    ERROR    │
                    └─────────────┘             └─────────────┘
                            │                           │
                   No results│                   Retry  │
                            ▼                           │
                    ┌─────────────┐                     │
                    │    EMPTY    │ ────────────────────┘
                    └─────────────┘
```

## Testing the Implementation

### Manual Testing Checklist

1. **State Transitions**
   - [ ] Click compact button → Shows floating widget
   - [ ] Click outside → Minimizes widget
   - [ ] Enter search → Shows loading state
   - [ ] Search completes → Shows results or empty state
   - [ ] Network error → Shows error state
   - [ ] Click retry → Re-attempts search

2. **Voice Input**
   - [ ] Click microphone → Shows voice state
   - [ ] Voice animation plays
   - [ ] Stop button works
   - [ ] Transcript appears in search

3. **Edge Cases**
   - [ ] Empty search doesn't trigger search
   - [ ] Rapid state changes handled gracefully
   - [ ] Error recovery works
   - [ ] State persists across minimize/expand

### Unit Test Example

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EnhancedMainFlow } from './EnhancedMainFlow';

describe('EnhancedMainFlow', () => {
  it('should transition through search states', async () => {
    const mockSearch = jest.fn().mockResolvedValue([
      { id: '1', title: 'Result 1', description: 'Test' }
    ]);
    
    const { getByPlaceholderText, getByText, queryByText } = render(
      <EnhancedMainFlow onSearch={mockSearch} initialExpanded={true} />
    );
    
    // Enter search
    const input = getByPlaceholderText('Ask Anything');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13 });
    
    // Should show loading
    expect(getByText('Searching for answers...')).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(getByText('Result 1')).toBeInTheDocument();
    });
    
    // Loading should be gone
    expect(queryByText('Searching for answers...')).not.toBeInTheDocument();
  });
});
```

## Performance Considerations

### 1. Memoize State Components
```typescript
import { memo } from 'react';

export const LoadingState = memo(() => {
  // Component implementation
});
```

### 2. Lazy Load Heavy States
```typescript
const ResultsState = lazy(() => import('../states/ResultsState'));

// In render
<Suspense fallback={<LoadingState />}>
  <ResultsState results={results} />
</Suspense>
```

### 3. Debounce Search Input
```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback(
  (value: string) => {
    handleSearch(value);
  },
  500
);
```

## Next Steps

1. **Add Animation Library**
   ```bash
   npm install framer-motion
   ```

2. **Implement Real Search**
   - Connect to your search API
   - Add proper error handling
   - Implement search suggestions

3. **Add More States**
   - Tutorial/onboarding state
   - Offline state
   - Authentication state
   - Settings state

4. **Enhance Voice Input**
   - Integrate Web Speech API
   - Add visual feedback
   - Support multiple languages

5. **Add Analytics**
   - Track state transitions
   - Monitor error rates
   - Measure user engagement

## Troubleshooting

### Common Issues

1. **State not updating**
   - Check if you're using the correct setter
   - Verify state dependencies in useCallback

2. **Click outside not working**
   - Ensure ref is properly attached
   - Check z-index issues

3. **Animation glitches**
   - Add key prop to animated components
   - Use AnimatePresence for exit animations

4. **Memory leaks**
   - Clean up timeouts in useEffect
   - Remove event listeners on unmount

## Conclusion

You now have a fully functional multi-state widget system. The modular architecture makes it easy to:
- Add new states
- Customize behavior
- Test individual components
- Scale the widget functionality

Start with this implementation and customize based on your specific needs!