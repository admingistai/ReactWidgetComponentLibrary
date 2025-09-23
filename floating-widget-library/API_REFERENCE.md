# 📖 API Reference - React Widget Library

## Overview
Complete API documentation for the React Widget Library, including component APIs, hooks, types, constants, and utilities.

## Table of Contents
- [Main Widget API](#main-widget-api)
- [Component APIs](#component-apis)
- [Hooks API](#hooks-api)
- [Type Definitions](#type-definitions)
- [Constants Reference](#constants-reference)
- [Utility Functions](#utility-functions)
- [Event Handlers](#event-handlers)

---

## Main Widget API

### MainFlow

The primary widget component that manages all states and phases.

```tsx
import { MainFlow } from '@/components/widget/templates';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialExpanded` | `boolean` | `false` | Initial expansion state of the widget |
| `onSuggestionSelect` | `(suggestion: string) => void` | `undefined` | Callback when a suggestion is selected |
| `className` | `string` | `''` | Additional CSS classes |

#### Usage

```tsx
<MainFlow
  initialExpanded={false}
  onSuggestionSelect={(suggestion) => {
    console.log('Selected:', suggestion);
  }}
  className="fixed bottom-4 right-4 z-50"
/>
```

#### State Management

MainFlow internally manages:
- `isExpanded`: Widget expansion state
- `contentState`: Current phase (idle, typing, searching, results, error)
- `searchValue`: Current search input
- `searchQuery`: Active search query
- `filteredSuggestions`: Autocomplete suggestions
- `isLoadingSources`: Loading state for results

---

## Component APIs

### Atoms

#### GlassContainer

```tsx
interface GlassContainerProps {
  variant: 'collapsed' | 'expanded';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

#### Text

```tsx
interface TextProps {
  variant: 'header' | 'body' | 'suggestion' | 'accent';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

#### Icon Components

```tsx
interface IconProps {
  className?: string;
  onClick?: () => void;
}

// Available icons:
// MicIcon, PlusIcon, SearchIcon, MoreIcon, SparkleIcon
```

### Molecules

#### SearchBar

```tsx
interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}
```

#### SuggestionItem

```tsx
interface SuggestionItemProps {
  text: string;
  onClick: () => void;
  className?: string;
}
```

#### SearchingAnimation

```tsx
interface SearchingAnimationProps {
  items: string[];
  interval?: number;  // Default: 2000ms
  prefix?: string;     // Default: "Searching through"
  isActive: boolean;
}
```

#### CompactButton

```tsx
interface CompactButtonProps {
  onClick: () => void;
  className?: string;
}
```

### Organisms

#### AutocompleteDropdown

```tsx
interface AutocompleteDropdownProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  searchTerm: string;
  highlightedIndex?: number;
}
```

#### SuggestionsList

```tsx
interface SuggestionsListProps {
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
}
```

#### Phase Components

##### ExpandedAnswerTab (Phase 2)

```tsx
interface ExpandedAnswerTabProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSearchFocus: () => void;
  onSuggestionClick: (text: string) => void;
  onMoreClick: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}
```

##### TypingPhase (Phase 3)

```tsx
interface TypingPhaseProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}
```

##### SearchingPhase (Phase 4)

```tsx
interface SearchingPhaseProps {
  searchQuery: string;
  onMicClick?: () => void;
}
```

##### ResultsPhase (Phase 5)

```tsx
interface ResultsPhaseProps {
  searchQuery: string;
  answer: string;
  sources: Array<{ title: string; percentage?: string }>;
  isLoadingSources: boolean;
  followUpValue: string;
  onFollowUpChange: (value: string) => void;
  onFollowUpSubmit: () => void;
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
  onSourceClick: (title: string) => void;
  onMoreClick: () => void;
  followUpInputRef?: React.RefObject<HTMLInputElement>;
}
```

---

## Hooks API

### useWidget

Custom hook for widget state management.

```tsx
import { useWidget } from '@/hooks/useWidget';

const {
  isExpanded,
  contentState,
  searchValue,
  toggleExpanded,
  setContentState,
  handleSearch,
  reset
} = useWidget();
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isExpanded` | `boolean` | Current expansion state |
| `contentState` | `ContentState` | Current content phase |
| `searchValue` | `string` | Current search input |
| `toggleExpanded` | `() => void` | Toggle expansion |
| `setContentState` | `(state: ContentState) => void` | Update phase |
| `handleSearch` | `(query: string) => void` | Execute search |
| `reset` | `() => void` | Reset to initial state |

### useClickOutside

Detect clicks outside a referenced element.

```tsx
import { useClickOutside } from '@/hooks/useClickOutside';

const ref = useRef<HTMLDivElement>(null);

useClickOutside(ref, () => {
  console.log('Clicked outside!');
});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ref` | `RefObject<HTMLElement>` | Element reference |
| `handler` | `(event: MouseEvent \| TouchEvent) => void` | Callback function |
| `isActive` | `boolean` | Enable/disable detection (default: true) |

### useToast

Toast notification hook from shadcn/ui.

```tsx
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Operation completed successfully.",
  variant: "default" // or "destructive"
});
```

### useMobile

Detect mobile viewport.

```tsx
import { useMobile } from '@/hooks/use-mobile';

const isMobile = useMobile();
// Returns true for viewports < 768px
```

---

## Type Definitions

### Core Types

```typescript
// Widget States
type WidgetState = 'minimized' | 'expanded' | 'floating' | 'docked' | 'hidden';

// Content States
type ContentState = 'idle' | 'typing' | 'searching' | 'results' | 'error';

// Widget Position
type WidgetPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'center';

// Widget Transition
type WidgetTransition = 'ease-in-out' | 'spring' | 'linear' | 'bounce';

// Widget Size
type WidgetSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'FULL';
```

### Component Types

```typescript
// Search Result
interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  relevance: number;
  timestamp: Date;
}

// Source Item
interface Source {
  title: string;
  percentage?: string;
  url?: string;
  icon?: React.ReactNode;
}

// Suggestion
interface Suggestion {
  text: string;
  category?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

// Widget Configuration
interface WidgetConfig {
  position: WidgetPosition;
  size: WidgetSize;
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
  autoCollapse: boolean;
  collapseDelay: number;
}
```

---

## Constants Reference

### WIDGET_STATES

```typescript
export const WIDGET_STATES = {
  MINIMIZED: 'minimized',
  EXPANDED: 'expanded',
  FLOATING: 'floating',
  DOCKED: 'docked',
  HIDDEN: 'hidden',
} as const;
```

### CONTENT_STATES

```typescript
export const CONTENT_STATES = {
  IDLE: 'idle',
  TYPING: 'typing',
  SEARCHING: 'searching',
  RESULTS: 'results',
  ERROR: 'error',
} as const;
```

### WIDGET_POSITIONS

```typescript
export const WIDGET_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  CENTER: 'center',
} as const;
```

### ANIMATION_DURATION

```typescript
export const ANIMATION_DURATION = {
  FAST: 150,    // ms
  NORMAL: 300,  // ms
  SLOW: 500,    // ms
} as const;
```

### WIDGET_SIZES

```typescript
export const WIDGET_SIZES = {
  SMALL: { width: 320, height: 480 },
  MEDIUM: { width: 400, height: 600 },
  LARGE: { width: 480, height: 720 },
  FULL: { width: '100%', height: '100%' },
} as const;
```

### Z_INDEX

```typescript
export const Z_INDEX = {
  BASE: 1000,
  OVERLAY: 1100,
  MODAL: 1200,
  TOOLTIP: 1300,
  NOTIFICATION: 1400,
} as const;
```

---

## Utility Functions

### cn (Class Name Merge)

Merge class names with conflict resolution.

```typescript
import { cn } from '@/lib/utils';

cn(
  'base-class',
  condition && 'conditional-class',
  { 'object-class': true },
  ['array', 'classes'],
  className // user override
);
// Returns: "base-class conditional-class object-class array classes user-class"
```

### filterSuggestions

Filter autocomplete suggestions based on input.

```typescript
import { filterSuggestions } from '@/lib/autocomplete-data';

const filtered = filterSuggestions(searchTerm, maxResults);
// Returns: string[] of matching suggestions
```

### Design Tokens

```typescript
import { tokens } from '@/lib/design-tokens';

// Access design tokens
tokens.colors.gradient.start  // '#C081FF'
tokens.colors.gradient.end    // '#B8FFE3'
tokens.spacing.md             // '1rem'
tokens.animation.duration.normal // 300
```

---

## Event Handlers

### Common Event Handler Patterns

```typescript
// Search submission
type SearchHandler = (query: string) => void | Promise<void>;

// Suggestion selection
type SuggestionHandler = (suggestion: string) => void;

// Source click
type SourceHandler = (source: Source) => void;

// Phase change
type PhaseHandler = (phase: ContentState) => void;

// Generic action
type ActionHandler = () => void;

// Value change
type ChangeHandler<T> = (value: T) => void;
```

### Event Handler Implementation

```typescript
// Example implementation in a component
const MyWidget: React.FC = () => {
  const handleSearch: SearchHandler = async (query) => {
    try {
      setContentState(CONTENT_STATES.SEARCHING);
      const results = await api.search(query);
      setResults(results);
      setContentState(CONTENT_STATES.RESULTS);
    } catch (error) {
      setContentState(CONTENT_STATES.ERROR);
    }
  };

  const handleSuggestionSelect: SuggestionHandler = (suggestion) => {
    setSearchValue(suggestion);
    handleSearch(suggestion);
  };

  const handleSourceClick: SourceHandler = (source) => {
    window.open(source.url, '_blank');
  };

  return (
    <MainFlow
      onSearch={handleSearch}
      onSuggestionSelect={handleSuggestionSelect}
      onSourceClick={handleSourceClick}
    />
  );
};
```

---

## Animation API

### Framer Motion Integration

```typescript
// Animation variants
const widgetVariants = {
  collapsed: {
    scale: 0.9,
    opacity: 0.8,
  },
  expanded: {
    scale: 1,
    opacity: 1,
  },
};

// Animation configuration
const animationConfig = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

// Usage
<motion.div
  variants={widgetVariants}
  initial="collapsed"
  animate={isExpanded ? 'expanded' : 'collapsed'}
  transition={animationConfig}
/>
```

---

## Error Handling

### Error Types

```typescript
enum WidgetErrorType {
  SEARCH_FAILED = 'SEARCH_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  RATE_LIMITED = 'RATE_LIMITED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

interface WidgetError {
  type: WidgetErrorType;
  message: string;
  details?: unknown;
  timestamp: Date;
}
```

### Error Handling Pattern

```typescript
const handleError = (error: WidgetError) => {
  switch (error.type) {
    case WidgetErrorType.SEARCH_FAILED:
      toast({
        title: "Search failed",
        description: error.message,
        variant: "destructive"
      });
      break;
    case WidgetErrorType.NETWORK_ERROR:
      setContentState(CONTENT_STATES.ERROR);
      break;
    default:
      console.error('Widget error:', error);
  }
};
```

---

## Lifecycle Methods

### Widget Lifecycle

```typescript
interface WidgetLifecycle {
  onMount?: () => void;
  onUnmount?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onSearch?: (query: string) => void;
  onResults?: (results: SearchResult[]) => void;
  onError?: (error: WidgetError) => void;
}

// Implementation
useEffect(() => {
  lifecycle.onMount?.();
  return () => lifecycle.onUnmount?.();
}, []);

useEffect(() => {
  if (isExpanded) {
    lifecycle.onExpand?.();
  } else {
    lifecycle.onCollapse?.();
  }
}, [isExpanded]);
```

---

## Configuration API

### Widget Configuration

```typescript
interface WidgetOptions {
  // Appearance
  theme?: 'light' | 'dark' | 'auto';
  position?: WidgetPosition;
  size?: WidgetSize;

  // Behavior
  autoCollapse?: boolean;
  collapseDelay?: number; // ms
  animations?: boolean;

  // Features
  enableVoice?: boolean;
  enableAutocomplete?: boolean;
  maxSuggestions?: number;

  // API
  apiUrl?: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

// Usage
const widgetConfig: WidgetOptions = {
  theme: 'auto',
  position: WIDGET_POSITIONS.BOTTOM_RIGHT,
  size: 'MEDIUM',
  autoCollapse: true,
  collapseDelay: 5000,
  animations: true,
  enableVoice: true,
  enableAutocomplete: true,
  maxSuggestions: 5,
};
```

---

## API Client Interface

### Search API

```typescript
interface SearchAPI {
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  getSuggestions(term: string): Promise<string[]>;
  getSource(id: string): Promise<Source>;
}

interface SearchOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, any>;
  sort?: 'relevance' | 'date' | 'popularity';
}

// Implementation example
class NYTimesAPI implements SearchAPI {
  async search(query: string, options?: SearchOptions) {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, ...options })
    });
    return response.json();
  }
}
```

---

## Browser API Usage

### Local Storage

```typescript
// Save widget state
const saveWidgetState = (state: Partial<WidgetState>) => {
  localStorage.setItem('widget_state', JSON.stringify(state));
};

// Load widget state
const loadWidgetState = (): Partial<WidgetState> | null => {
  const saved = localStorage.getItem('widget_state');
  return saved ? JSON.parse(saved) : null;
};

// Clear widget state
const clearWidgetState = () => {
  localStorage.removeItem('widget_state');
};
```

### Session Storage

```typescript
// Save search history
const saveSearchHistory = (searches: string[]) => {
  sessionStorage.setItem('search_history', JSON.stringify(searches));
};

// Get search history
const getSearchHistory = (): string[] => {
  const history = sessionStorage.getItem('search_history');
  return history ? JSON.parse(history) : [];
};
```

---

*API Reference - React Widget Library v0.0.0*