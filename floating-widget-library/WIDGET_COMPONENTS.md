# Widget Components Documentation

## Overview
This document provides a comprehensive reference for all components in the React Widget Library, organized by the Atomic Design Pattern and detailing which phases each component is used in.

## Widget Phases

The widget operates in 5 distinct phases:

1. **Phase 1: Collapsed** - Compact button state
2. **Phase 2: Expanded/Idle** - Expanded interface with search and suggestions
3. **Phase 3: Typing** - Focused search with autocomplete
4. **Phase 4: Searching** - Loading state with animated search indicator
5. **Phase 5: Results** - Display search results with sources

## Component Architecture

```
src/components/widget/
├── atoms/           # Basic building blocks
├── molecules/       # Compound components
├── organisms/       # Complex UI sections
└── templates/       # Full layouts with state
```

---

## Atoms (Basic Building Blocks)

### Containers

#### GlassContainer
- **Path**: `atoms/containers/GlassContainer.tsx`
- **Purpose**: Glassmorphism container with blur effect
- **Used in Phases**: 2, 3, 4, 5
- **Variants**: `collapsed`, `expanded`
- **Props**: `variant`, `children`, `className`, `style`

### Icons

#### MicIcon
- **Path**: `atoms/icons/MicIcon.tsx`
- **Purpose**: Microphone icon for voice input
- **Used in Phases**: 2, 3, 4, 5
- **Props**: `className`

#### MoreIcon
- **Path**: `atoms/icons/MoreIcon.tsx`
- **Purpose**: Three dots icon for more options
- **Used in Phases**: 2, 5
- **Props**: `className`

#### PlusIcon
- **Path**: `atoms/icons/PlusIcon.tsx`
- **Purpose**: Plus icon for additional actions
- **Used in Phases**: 2, 3, 5 (in sources)
- **Props**: `className`

#### SearchIcon
- **Path**: `atoms/icons/SearchIcon.tsx`
- **Purpose**: Magnifying glass search icon
- **Used in Phases**: 1
- **Props**: `className`

#### SourceIcon
- **Path**: `atoms/icons/SourceIcon.tsx`
- **Purpose**: Icon for source items (percentage indicator)
- **Used in Phases**: Internal (SourcesBar component)
- **Props**: `percentage`

### Progress Indicators

#### ProgressIndicator
- **Path**: `atoms/indicators/ProgressIndicator.tsx`
- **Purpose**: Gradient progress bar animation
- **Used in Phases**: Internal (TabBar component)
- **Props**: `isLoading`

### Typography

#### Text
- **Path**: `atoms/typography/Text.tsx`
- **Purpose**: Unified text component with variants
- **Used in Phases**: All phases
- **Variants**: `header`, `body`, `suggestion`, `accent`
- **Props**: `variant`, `children`, `className`, `style`

#### SearchingText
- **Path**: `atoms/typography/SearchingText.tsx`
- **Purpose**: "Searching..." text with styling
- **Used in Phases**: 4
- **Props**: `className`, `style`

---

## Molecules (Compound Components)

### Buttons

#### CompactButton
- **Path**: `molecules/buttons/CompactButton.tsx`
- **Purpose**: Collapsed widget button with gradient border
- **Used in Phases**: 1
- **Props**: `onClick`, `className`

#### MoreButton
- **Path**: `molecules/buttons/MoreButton.tsx`
- **Purpose**: "More" button with icon
- **Used in Phases**: 2, 5
- **Props**: `onClick`, `className`

#### PoweredByButton
- **Path**: `molecules/buttons/PoweredByButton.tsx`
- **Purpose**: "Powered by AI + The New York Times" footer
- **Used in Phases**: 2, 3, 4, 5
- **Props**: None

### Content

#### AnswerHeader
- **Path**: `molecules/content/AnswerHeader.tsx`
- **Purpose**: Display search query or "Answer loading" state
- **Used in Phases**: 5
- **Props**: `searchQuery`, `isLoading`, `className`, `style`

#### AnswerText
- **Path**: `molecules/content/AnswerText.tsx`
- **Purpose**: Expandable answer text with fade overlay
- **Used in Phases**: Internal (not currently used)
- **Props**: `text`, `isExpanded`, `maxLines`, `onToggleExpand`

#### SuggestionItem
- **Path**: `molecules/content/SuggestionItem.tsx`
- **Purpose**: Individual suggestion with plus icon
- **Used in Phases**: 2, 5
- **Props**: `text`, `onClick`, `className`

### Effects

#### FadeOverlay
- **Path**: `molecules/effects/FadeOverlay.tsx`
- **Purpose**: Gradient fade effect for text truncation
- **Used in Phases**: Internal (AnswerText component)
- **Props**: `position`

### Search

#### AutocompleteSuggestion
- **Path**: `molecules/search/AutocompleteSuggestion.tsx`
- **Purpose**: Individual autocomplete dropdown item
- **Used in Phases**: 3
- **Props**: `text`, `isHighlighted`, `searchTerm`, `onClick`

#### SearchBar
- **Path**: `molecules/search/SearchBar.tsx`
- **Purpose**: Search input with gradient border and icons
- **Used in Phases**: 2, 3, 5
- **Props**: `value`, `onChange`, `onSubmit`, `onMicClick`, `onPlusClick`, `onFocus`, `onBlur`, `placeholder`, `inputRef`

#### SearchingAnimation
- **Path**: `molecules/search/SearchingAnimation.tsx`
- **Purpose**: Animated "Searching through..." carousel
- **Used in Phases**: 4
- **Props**: `items`, `interval`, `prefix`, `isActive`

### Sources

#### PercentageSourceItem
- **Path**: `molecules/sources/PercentageSourceItem.tsx`
- **Purpose**: Source item with percentage indicator
- **Used in Phases**: Internal (SourcesBar)
- **Props**: `title`, `percentage`, `onClick`

#### PlusSourceItem
- **Path**: `molecules/sources/PlusSourceItem.tsx`
- **Purpose**: Source item with plus icon
- **Used in Phases**: 5
- **Props**: `title`, `onClick`, `className`, `style`

#### TabBar
- **Path**: `molecules/sources/TabBar.tsx`
- **Purpose**: Expandable tab with progress indicator
- **Used in Phases**: Internal (not currently used)
- **Props**: `title`, `isExpanded`, `isLoading`, `onToggle`

---

## Organisms (Complex UI Sections)

### Core Organisms

#### AutocompleteDropdown
- **Path**: `organisms/AutocompleteDropdown.tsx`
- **Purpose**: Dropdown list of autocomplete suggestions
- **Used in Phases**: 3
- **Props**: `suggestions`, `onSelect`, `searchTerm`, `highlightedIndex`

#### Header
- **Path**: `organisms/Header.tsx`
- **Purpose**: "Ask New York Times Anything!" header
- **Used in Phases**: 2
- **Props**: `className`

#### SourcesBar
- **Path**: `organisms/SourcesBar.tsx`
- **Purpose**: Container for source items with loading state
- **Used in Phases**: Internal (not currently used)
- **Props**: `isLoading`, `sources`, `onSourceClick`

#### SuggestionsList
- **Path**: `organisms/SuggestionsList.tsx`
- **Purpose**: List of suggestion items
- **Used in Phases**: 2, 5
- **Props**: `suggestions`, `onSuggestionClick`

### Phase Components

#### ExpandedAnswerTab
- **Path**: `organisms/phases/ExpandedAnswerTab.tsx`
- **Purpose**: Phase 2 - Expanded idle state
- **Used in Phases**: 2
- **Key Features**:
  - Header with "Ask New York Times Anything!"
  - SearchBar with gradient border
  - SuggestionsList with default suggestions
  - MoreButton for additional options
  - PoweredByButton footer

#### TypingPhase
- **Path**: `organisms/phases/TypingPhase.tsx`
- **Purpose**: Phase 3 - Focused search with autocomplete
- **Used in Phases**: 3
- **Key Features**:
  - Minimal header "Ask New York Times Anything!"
  - SearchBar with focus state
  - AutocompleteDropdown for suggestions
  - PoweredByButton footer

#### SearchingPhase
- **Path**: `organisms/phases/SearchingPhase.tsx`
- **Purpose**: Phase 4 - Loading state with animation
- **Used in Phases**: 4
- **Key Features**:
  - Display search query
  - SearchingAnimation carousel
  - Mic button for voice input
  - PoweredByButton footer

#### ResultsPhase
- **Path**: `organisms/phases/ResultsPhase.tsx`
- **Purpose**: Phase 5 - Display search results
- **Used in Phases**: 5
- **Key Features**:
  - AnswerHeader with search query
  - Answer text display
  - PlusSourceItem list (with loading state)
  - Follow-up SearchBar
  - SuggestionsList for new queries
  - MoreButton and PoweredByButton

---

## Templates (Full Layouts with State)

### MainFlow
- **Path**: `templates/MainFlow.tsx`
- **Purpose**: Central state management and phase orchestration
- **Manages All Phases**: 1, 2, 3, 4, 5
- **Key Responsibilities**:
  - Widget expansion state (collapsed/expanded)
  - Content state management (idle/typing/searching/results)
  - Search value and autocomplete filtering
  - Event handling and data flow
  - Phase transitions based on user interactions
  - Click-outside detection for collapse

**State Variables**:
- `isExpanded`: Widget layout state
- `contentState`: Current phase (IDLE, TYPING, SEARCHING, RESULTS)
- `searchValue`: Current search input
- `filteredSuggestions`: Autocomplete suggestions
- `searchQuery`: Query being searched
- `isLoadingSources`: Results loading state
- `followUpValue`: Follow-up search input

---

## Component Usage Matrix

| Component | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|-----------|---------|---------|---------|---------|---------|
| **Atoms** |
| GlassContainer | - | ✓ | ✓ | ✓ | ✓ |
| MicIcon | - | ✓ | ✓ | ✓ | ✓ |
| MoreIcon | - | ✓ | - | - | ✓ |
| PlusIcon | - | ✓ | ✓ | - | ✓ |
| SearchIcon | ✓ | - | - | - | - |
| Text | ✓ | ✓ | ✓ | ✓ | ✓ |
| SearchingText | - | - | - | ✓ | - |
| **Molecules** |
| CompactButton | ✓ | - | - | - | - |
| MoreButton | - | ✓ | - | - | ✓ |
| PoweredByButton | - | ✓ | ✓ | ✓ | ✓ |
| AnswerHeader | - | - | - | - | ✓ |
| SuggestionItem | - | ✓ | - | - | ✓ |
| AutocompleteSuggestion | - | - | ✓ | - | - |
| SearchBar | - | ✓ | ✓ | - | ✓ |
| SearchingAnimation | - | - | - | ✓ | - |
| PlusSourceItem | - | - | - | - | ✓ |
| **Organisms** |
| AutocompleteDropdown | - | - | ✓ | - | - |
| Header | - | ✓ | - | - | - |
| SuggestionsList | - | ✓ | - | - | ✓ |
| **Phase Components** |
| ExpandedAnswerTab | - | ✓ | - | - | - |
| TypingPhase | - | - | ✓ | - | - |
| SearchingPhase | - | - | - | ✓ | - |
| ResultsPhase | - | - | - | - | ✓ |

---

## Design Tokens

All components use centralized design tokens from `lib/design-tokens.ts`:

- **Colors**: Text, background, gradients, borders
- **Dimensions**: Container sizes, component dimensions
- **Spacing**: Consistent padding and gaps
- **Typography**: Font sizes and weights
- **Effects**: Blur amounts, transitions

---

## Component Relationships

### Parent-Child Hierarchy

```
MainFlow (Template)
├── CompactButton (Phase 1)
└── GlassContainer (Phases 2-5)
    ├── Phase Organisms
    │   ├── ExpandedAnswerTab (Phase 2)
    │   ├── TypingPhase (Phase 3)
    │   ├── SearchingPhase (Phase 4)
    │   └── ResultsPhase (Phase 5)
    └── Shared Components
        ├── SearchBar
        ├── SuggestionsList
        ├── PoweredByButton
        └── Various Atoms/Molecules
```

### Data Flow

1. **MainFlow** manages all state and passes props down
2. **Phase Organisms** receive props and handle presentation
3. **Molecules** are pure components with event callbacks
4. **Atoms** are the simplest building blocks

---

## Best Practices

1. **State Management**: All state is lifted to MainFlow template
2. **Pure Components**: Atoms and molecules are stateless
3. **Event Handling**: Callbacks passed down from MainFlow
4. **Type Safety**: Full TypeScript coverage with strict types
5. **Design Tokens**: Centralized styling through tokens
6. **Component Reuse**: Maximize reuse across phases
7. **Atomic Design**: Clear separation of complexity levels

---

## Development Notes

- Components follow "Thinking in React" principles
- Two-layer state system: Layout (collapsed/expanded) + Content (idle/typing/searching/results)
- Gradient borders use CSS mask-composite technique
- All components are functional with TypeScript
- Tailwind CSS for utility styling with design tokens for consistency