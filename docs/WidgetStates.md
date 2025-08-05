# Widget States Architecture Guide

## Table of Contents
1. [Overview](#overview)
2. [Current State Implementation](#current-state-implementation)
3. [Two-Layer State Architecture](#two-layer-state-architecture)
4. [Implementing New Widget States](#implementing-new-widget-states)
5. [State Transition Patterns](#state-transition-patterns)
6. [Code Examples](#code-examples)
7. [Best Practices](#best-practices)
8. [Migration Guide](#migration-guide)

## Overview

This guide explains how to extend the widget beyond simple collapsed/expanded states to support rich, multi-phase interactions. The widget architecture supports two types of states:

1. **Layout States**: Control the widget's visual form (minimized, expanded, floating, etc.)
2. **Content States**: Control what's displayed inside the widget (loading, searching, results, etc.)

## Current State Implementation

### Simple Boolean State (Current MainFlow.tsx)
```typescript
const [isExpanded, setIsExpanded] = useState(false);
```

### Advanced State System (Available via useWidget hook)
```typescript
const widget = useWidget({
  id: 'main-widget',
  initialState: WIDGET_STATES.FLOATING,
  initialPosition: WIDGET_POSITIONS.BOTTOM_RIGHT
});
```

## Two-Layer State Architecture

### Layer 1: Layout States (Visual Form)

Already implemented in `constants.ts`:

```typescript
export const WIDGET_STATES = {
  MINIMIZED: 'minimized',    // Smallest form, just an icon
  EXPANDED: 'expanded',       // Full-screen or large view
  FLOATING: 'floating',       // Normal floating widget
  DOCKED: 'docked',          // Attached to screen edge
  HIDDEN: 'hidden',          // Completely hidden
} as const;
```

### Layer 2: Content States (What's Inside)

New states to implement for content/interaction:

```typescript
export const CONTENT_STATES = {
  IDLE: 'idle',              // Default, showing suggestions
  LOADING: 'loading',        // Fetching data
  SEARCHING: 'searching',    // Active search in progress
  RESULTS: 'results',        // Displaying search results
  ERROR: 'error',           // Error state
  VOICE_INPUT: 'voice',     // Voice recording active
  ONBOARDING: 'onboarding', // Tutorial/first-time experience
  FOCUSED: 'focused',       // Input is focused
  EMPTY: 'empty',           // No results found
} as const;

export type ContentState = (typeof CONTENT_STATES)[keyof typeof CONTENT_STATES];
```

## Implementing New Widget States

### Step 1: Extend Constants

Add new states to `src/lib/constants.ts`:

```typescript
// Add content states
export const CONTENT_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SEARCHING: 'searching',
  RESULTS: 'results',
  ERROR: 'error',
  VOICE_INPUT: 'voice',
  ONBOARDING: 'onboarding',
  FOCUSED: 'focused',
  EMPTY: 'empty',
} as const;

export type ContentState = (typeof CONTENT_STATES)[keyof typeof CONTENT_STATES];

// Add sub-states for more granular control
export const SEARCH_STATES = {
  TYPING: 'typing',
  DEBOUNCING: 'debouncing',
  FETCHING: 'fetching',
  COMPLETE: 'complete',
} as const;

export type SearchState = (typeof SEARCH_STATES)[keyof typeof SEARCH_STATES];
```

### Step 2: Create Enhanced State Hook

Create `src/hooks/useWidgetState.tsx`:

```typescript
import { useState, useCallback, useReducer } from 'react';
import { WIDGET_STATES, CONTENT_STATES } from '@/lib/constants';
import { useWidget } from './useWidget';

interface WidgetStateConfig {
  layoutState: WidgetState;
  contentState: ContentState;
  searchState?: SearchState;
  error?: Error | null;
  isLoading: boolean;
  results?: any[];
}

type WidgetAction = 
  | { type: 'START_SEARCH' }
  | { type: 'SEARCH_SUCCESS'; payload: any[] }
  | { type: 'SEARCH_ERROR'; payload: Error }
  | { type: 'START_VOICE' }
  | { type: 'STOP_VOICE' }
  | { type: 'SHOW_ONBOARDING' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'FOCUS_INPUT' }
  | { type: 'BLUR_INPUT' }
  | { type: 'RESET' };

function widgetReducer(state: WidgetStateConfig, action: WidgetAction): WidgetStateConfig {
  switch (action.type) {
    case 'START_SEARCH':
      return {
        ...state,
        contentState: CONTENT_STATES.SEARCHING,
        isLoading: true,
        error: null,
      };
    
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        contentState: action.payload.length > 0 
          ? CONTENT_STATES.RESULTS 
          : CONTENT_STATES.EMPTY,
        isLoading: false,
        results: action.payload,
      };
    
    case 'SEARCH_ERROR':
      return {
        ...state,
        contentState: CONTENT_STATES.ERROR,
        isLoading: false,
        error: action.payload,
      };
    
    case 'START_VOICE':
      return {
        ...state,
        contentState: CONTENT_STATES.VOICE_INPUT,
      };
    
    case 'STOP_VOICE':
      return {
        ...state,
        contentState: CONTENT_STATES.IDLE,
      };
    
    case 'FOCUS_INPUT':
      return {
        ...state,
        contentState: CONTENT_STATES.FOCUSED,
      };
    
    case 'BLUR_INPUT':
      return {
        ...state,
        contentState: state.results?.length > 0 
          ? CONTENT_STATES.RESULTS 
          : CONTENT_STATES.IDLE,
      };
    
    default:
      return state;
  }
}

export function useWidgetState(widgetId: string) {
  // Layout state management
  const widget = useWidget({
    id: widgetId,
    initialState: WIDGET_STATES.FLOATING,
  });
  
  // Content state management
  const [state, dispatch] = useReducer(widgetReducer, {
    layoutState: widget.state,
    contentState: CONTENT_STATES.IDLE,
    isLoading: false,
    error: null,
    results: [],
  });
  
  // Combined state helpers
  const isSearching = state.contentState === CONTENT_STATES.SEARCHING;
  const hasResults = state.contentState === CONTENT_STATES.RESULTS;
  const hasError = state.contentState === CONTENT_STATES.ERROR;
  const isVoiceActive = state.contentState === CONTENT_STATES.VOICE_INPUT;
  
  // Action creators
  const startSearch = useCallback(() => {
    dispatch({ type: 'START_SEARCH' });
  }, []);
  
  const completeSearch = useCallback((results: any[]) => {
    dispatch({ type: 'SEARCH_SUCCESS', payload: results });
  }, []);
  
  const searchError = useCallback((error: Error) => {
    dispatch({ type: 'SEARCH_ERROR', payload: error });
  }, []);
  
  const startVoiceInput = useCallback(() => {
    dispatch({ type: 'START_VOICE' });
  }, []);
  
  const stopVoiceInput = useCallback(() => {
    dispatch({ type: 'STOP_VOICE' });
  }, []);
  
  return {
    // Layout controls from useWidget
    ...widget,
    
    // Content state
    contentState: state.contentState,
    isLoading: state.isLoading,
    error: state.error,
    results: state.results,
    
    // State checks
    isSearching,
    hasResults,
    hasError,
    isVoiceActive,
    
    // Actions
    startSearch,
    completeSearch,
    searchError,
    startVoiceInput,
    stopVoiceInput,
    
    // Original dispatch for custom actions
    dispatch,
  };
}
```

### Step 3: Create State-Specific Components

Create components for each state in `src/components/widget/states/`:

```typescript
// LoadingState.tsx
export function LoadingState() {
  return (
    <div className="loading-state">
      <SparkleIcon className="animate-spin" />
      <Text variant="body">Searching...</Text>
    </div>
  );
}

// ErrorState.tsx
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state">
      <Text variant="body">Something went wrong</Text>
      <Text variant="accent">{error.message}</Text>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}

// VoiceInputState.tsx
export function VoiceInputState({ onStop }: VoiceInputStateProps) {
  return (
    <div className="voice-state">
      <div className="voice-wave-animation" />
      <Text variant="body">Listening...</Text>
      <IconButton onClick={onStop}>
        <StopIcon />
      </IconButton>
    </div>
  );
}

// ResultsState.tsx
export function ResultsState({ results, onSelect }: ResultsStateProps) {
  return (
    <div className="results-state">
      {results.map((result, index) => (
        <ResultItem 
          key={index} 
          result={result} 
          onClick={() => onSelect(result)}
        />
      ))}
    </div>
  );
}
```

### Step 4: Update MainFlow Component

Refactor `MainFlow.tsx` to use the new state system:

```typescript
import { useWidgetState } from '@/hooks/useWidgetState';
import { CONTENT_STATES, WIDGET_STATES } from '@/lib/constants';
import { 
  LoadingState, 
  ErrorState, 
  VoiceInputState, 
  ResultsState,
  IdleState 
} from '../states';

export function MainFlow({ widgetId = 'main-widget' }: MainFlowProps) {
  const widget = useWidgetState(widgetId);
  const [searchValue, setSearchValue] = useState('');
  
  // Handle search with proper state transitions
  const handleSearch = async (query: string) => {
    widget.startSearch();
    
    try {
      const results = await searchAPI(query);
      widget.completeSearch(results);
    } catch (error) {
      widget.searchError(error as Error);
    }
  };
  
  // Render based on layout state
  const renderContent = () => {
    // First check if widget should be visible
    if (widget.isHidden) return null;
    
    // Minimized state
    if (widget.isMinimized) {
      return <MinimizedWidget onClick={widget.toggleMinimize} />;
    }
    
    // Render content based on content state
    const contentByState = {
      [CONTENT_STATES.IDLE]: (
        <IdleState 
          suggestions={DEFAULT_SUGGESTIONS}
          onSuggestionClick={handleSearch}
        />
      ),
      [CONTENT_STATES.LOADING]: <LoadingState />,
      [CONTENT_STATES.SEARCHING]: <LoadingState />,
      [CONTENT_STATES.RESULTS]: (
        <ResultsState 
          results={widget.results}
          onSelect={handleResultSelect}
        />
      ),
      [CONTENT_STATES.ERROR]: (
        <ErrorState 
          error={widget.error}
          onRetry={() => handleSearch(searchValue)}
        />
      ),
      [CONTENT_STATES.VOICE_INPUT]: (
        <VoiceInputState onStop={widget.stopVoiceInput} />
      ),
      [CONTENT_STATES.EMPTY]: (
        <EmptyState query={searchValue} />
      ),
    };
    
    return (
      <WidgetContainer 
        variant={widget.state}
        position={widget.position}
        size={widget.size}
      >
        <Header onClose={widget.hide} />
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSearch}
          onMicClick={widget.startVoiceInput}
          onFocus={() => widget.dispatch({ type: 'FOCUS_INPUT' })}
          onBlur={() => widget.dispatch({ type: 'BLUR_INPUT' })}
        />
        <div className="widget-content">
          {contentByState[widget.contentState]}
        </div>
        <PoweredByFooter />
      </WidgetContainer>
    );
  };
  
  return renderContent();
}
```

## State Transition Patterns

### State Machine Diagram

```
                    ┌─────────────┐
                    │   HIDDEN    │
                    └──────┬──────┘
                           │ show()
                    ┌──────▼──────┐
        ┌───────────┤  MINIMIZED  ├───────────┐
        │           └──────┬──────┘           │
        │ dock()           │ toggleMinimize() │ float()
        │           ┌──────▼──────┐           │
        │      ┌────┤  FLOATING   ├────┐      │
        │      │    └──────┬──────┘    │      │
        ▼      │           │           │      ▼
   ┌────────┐  │           │           │  ┌────────┐
   │ DOCKED ├──┘   toggleExpand()     └──┤ DOCKED │
   └────────┘              │              └────────┘
                    ┌──────▼──────┐
                    │  EXPANDED   │
                    └─────────────┘
```

### Content State Transitions

```
IDLE ──────► FOCUSED ──────► SEARCHING ──────► RESULTS
  │             │                │                 │
  │             │                │                 ▼
  │             │                └──────► ERROR ◄──┘
  │             │                         │
  │             └─────────────────────────┘
  │
  └──────► VOICE_INPUT ──────► SEARCHING
```

### Implementing State Guards

```typescript
// State transition guards
const canTransitionTo = (from: WidgetState, to: WidgetState): boolean => {
  const transitions: Record<WidgetState, WidgetState[]> = {
    [WIDGET_STATES.HIDDEN]: [WIDGET_STATES.MINIMIZED, WIDGET_STATES.FLOATING],
    [WIDGET_STATES.MINIMIZED]: [WIDGET_STATES.FLOATING, WIDGET_STATES.EXPANDED],
    [WIDGET_STATES.FLOATING]: [WIDGET_STATES.MINIMIZED, WIDGET_STATES.EXPANDED, WIDGET_STATES.DOCKED],
    [WIDGET_STATES.EXPANDED]: [WIDGET_STATES.FLOATING, WIDGET_STATES.MINIMIZED],
    [WIDGET_STATES.DOCKED]: [WIDGET_STATES.FLOATING, WIDGET_STATES.MINIMIZED],
  };
  
  return transitions[from]?.includes(to) ?? false;
};
```

## Code Examples

### Example 1: Adding a New State

To add a new "TUTORIAL" state:

1. Add to constants:
```typescript
export const CONTENT_STATES = {
  // ... existing states
  TUTORIAL: 'tutorial',
} as const;
```

2. Update reducer:
```typescript
case 'START_TUTORIAL':
  return {
    ...state,
    contentState: CONTENT_STATES.TUTORIAL,
    tutorialStep: 0,
  };

case 'NEXT_TUTORIAL_STEP':
  return {
    ...state,
    tutorialStep: state.tutorialStep + 1,
  };
```

3. Create component:
```typescript
export function TutorialState({ step, onNext, onSkip }: TutorialStateProps) {
  const steps = [
    "Welcome! This is your AI assistant.",
    "Click the microphone to use voice input.",
    "Type or speak your question.",
    "Select from suggestions or wait for results."
  ];
  
  return (
    <div className="tutorial-state">
      <Text variant="header">Step {step + 1} of {steps.length}</Text>
      <Text variant="body">{steps[step]}</Text>
      <div className="tutorial-actions">
        <Button onClick={onSkip} variant="ghost">Skip</Button>
        <Button onClick={onNext} variant="primary">
          {step < steps.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}
```

### Example 2: Complex State with Sub-states

For a multi-step form or wizard:

```typescript
export const FORM_STATES = {
  QUESTION: 'question',
  DETAILS: 'details',
  PREVIEW: 'preview',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
} as const;

export function FormFlow() {
  const [formState, setFormState] = useState(FORM_STATES.QUESTION);
  const [formData, setFormData] = useState({});
  
  const transitions = {
    [FORM_STATES.QUESTION]: () => {
      if (validateQuestion(formData)) {
        setFormState(FORM_STATES.DETAILS);
      }
    },
    [FORM_STATES.DETAILS]: () => {
      setFormState(FORM_STATES.PREVIEW);
    },
    [FORM_STATES.PREVIEW]: async () => {
      setFormState(FORM_STATES.SUBMITTING);
      try {
        await submitForm(formData);
        setFormState(FORM_STATES.SUCCESS);
      } catch (error) {
        setFormState(FORM_STATES.PREVIEW);
        showError(error);
      }
    },
  };
  
  return (
    <div className="form-flow">
      {formState === FORM_STATES.QUESTION && <QuestionStep />}
      {formState === FORM_STATES.DETAILS && <DetailsStep />}
      {formState === FORM_STATES.PREVIEW && <PreviewStep />}
      {formState === FORM_STATES.SUBMITTING && <LoadingState />}
      {formState === FORM_STATES.SUCCESS && <SuccessState />}
    </div>
  );
}
```

### Example 3: Animated State Transitions

Using Framer Motion for smooth transitions:

```typescript
import { motion, AnimatePresence } from 'framer-motion';

const stateVariants = {
  minimized: {
    scale: 0.8,
    opacity: 0.9,
    transition: { duration: 0.2 }
  },
  floating: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, type: "spring" }
  },
  expanded: {
    scale: 1.05,
    opacity: 1,
    transition: { duration: 0.4, type: "spring" }
  },
};

export function AnimatedWidget() {
  const widget = useWidgetState('animated-widget');
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={widget.state}
        variants={stateVariants}
        initial="minimized"
        animate={widget.state}
        exit="minimized"
      >
        {/* Widget content */}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Best Practices

### 1. State Naming Conventions

- Use CONSTANT_CASE for state names
- Be descriptive but concise
- Group related states

```typescript
// Good
CONTENT_STATES.SEARCHING
CONTENT_STATES.SEARCH_ERROR

// Avoid
CONTENT_STATES.LOADING  // Too generic
CONTENT_STATES.ERR      // Too abbreviated
```

### 2. State Transition Logic

- Always validate state transitions
- Use guards to prevent invalid states
- Log state changes in development

```typescript
const transitionTo = (newState: WidgetState) => {
  if (!canTransitionTo(currentState, newState)) {
    console.warn(`Invalid transition: ${currentState} → ${newState}`);
    return;
  }
  
  console.log(`State transition: ${currentState} → ${newState}`);
  setState(newState);
};
```

### 3. Performance Optimization

- Memoize state-specific components
- Use React.lazy for large state components
- Prevent unnecessary re-renders

```typescript
const LoadingState = React.memo(() => {
  return <div>Loading...</div>;
});

const ResultsState = React.lazy(() => import('./states/ResultsState'));
```

### 4. State Persistence

- Save important states to localStorage
- Restore state on page reload
- Clear stale states

```typescript
// Save state
useEffect(() => {
  localStorage.setItem('widgetState', JSON.stringify({
    layout: widget.state,
    content: widget.contentState,
    position: widget.position,
  }));
}, [widget.state, widget.contentState, widget.position]);

// Restore state
const savedState = JSON.parse(localStorage.getItem('widgetState') || '{}');
```

### 5. Error Handling

- Always have an error state
- Provide recovery actions
- Log errors for debugging

```typescript
const ERROR_RECOVERY = {
  [ERROR_TYPES.NETWORK]: {
    message: "Check your connection",
    action: "Retry",
    handler: () => retryLastAction(),
  },
  [ERROR_TYPES.SERVER]: {
    message: "Server error",
    action: "Report Issue",
    handler: () => reportError(),
  },
};
```

## Migration Guide

### Step 1: Update MainFlow to use useWidget

```typescript
// Before
export function MainFlow() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return isExpanded ? <ExpandedView /> : <CollapsedView />;
}

// After
export function MainFlow() {
  const widget = useWidget({
    id: 'main-widget',
    initialState: WIDGET_STATES.MINIMIZED,
  });
  
  if (widget.isMinimized) return <MinimizedView />;
  if (widget.isExpanded) return <ExpandedView />;
  return <FloatingView />;
}
```

### Step 2: Add Content States

```typescript
// Add to your widget
const [contentState, setContentState] = useState(CONTENT_STATES.IDLE);

// Or use the full hook
const widget = useWidgetState('main-widget');
```

### Step 3: Update Components

Replace conditional rendering with state-based components:

```typescript
// Before
{isLoading ? <Spinner /> : <Results />}

// After
{contentState === CONTENT_STATES.LOADING && <LoadingState />}
{contentState === CONTENT_STATES.RESULTS && <ResultsState />}
```

### Step 4: Add Transitions

Implement smooth transitions between states:

```typescript
<TransitionGroup>
  <CSSTransition
    key={widget.contentState}
    timeout={300}
    classNames="fade"
  >
    {renderContentState()}
  </CSSTransition>
</TransitionGroup>
```

## Conclusion

The two-layer state architecture (Layout + Content) provides maximum flexibility for creating rich widget interactions. By separating visual form from content state, you can:

- Create complex user flows
- Handle edge cases gracefully
- Maintain clean, predictable code
- Scale to new requirements easily

Start with the existing `useWidget` hook for layout states, then layer on content states as needed. The modular approach ensures each state is testable, reusable, and maintainable.