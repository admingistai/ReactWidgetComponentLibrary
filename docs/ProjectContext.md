# React Widget Component Library - Project Context

## Project Overview

This is a React-based floating widget component library implementing a multi-phase interactive widget for the New York Times. The widget follows atomic design principles and "Thinking in React" methodology.

## Current Implementation Status

### Implemented Widget Phases

1. **Phase 1: Collapsed State**
   - Compact button with gradient background and NYT logo
   - Click to expand functionality
   - Located at: `/src/components/widget/molecules/CompactButton.tsx`

2. **Phase 2: Expanded State**
   - Shows header, search bar, suggestions list, and footer
   - Search bar with gradient border (#C081FF → #B8FFE3)
   - Located at: `/src/components/widget/organisms/ExpandedAnswerTab.tsx`

3. **Phase 3: Typing State** ✨ *Recently Implemented*
   - Minimal UI showing "Ask New York Times Anything!" header
   - Focused search bar with gradient border
   - Activated when user clicks on search input
   - Located at: `/src/components/widget/organisms/TypingPhase.tsx`

### Architecture Overview

```
src/
├── components/
│   └── widget/
│       ├── atoms/           # Basic building blocks
│       │   ├── buttons/     # IconButton, etc.
│       │   ├── containers/  # GlassContainer
│       │   ├── icons/       # MicIcon, NYTimesLogo, etc.
│       │   └── text/        # TextSnippet
│       ├── molecules/       # Composed components
│       │   ├── CompactButton.tsx
│       │   ├── SearchBar.tsx
│       │   ├── PlusButton.tsx
│       │   └── MoreButton.tsx
│       ├── organisms/       # Complex components
│       │   ├── ExpandedAnswerTab.tsx
│       │   ├── TypingPhase.tsx     # New!
│       │   ├── Header.tsx
│       │   ├── SuggestionsList.tsx
│       │   └── PoweredByFooter.tsx
│       └── templates/       # Page-level components
│           └── MainFlow.tsx # State management
├── lib/
│   ├── constants.ts        # Widget states & constants
│   └── design-tokens.ts    # Design system values
└── hooks/
    └── useClickOutside.ts  # Custom React hook
```

## State Management Architecture

### Two-Layer State System

1. **Layout States** (Widget appearance)
   - `collapsed` - Compact button form
   - `expanded` - Full widget interface

2. **Content States** (Widget behavior)
   - `idle` - Default expanded state
   - `typing` - User focused on search input
   - `searching` - Performing search (future)
   - `results` - Showing results (future)
   - `error` - Error state (future)

### State Location
- All state managed in `MainFlow.tsx` template
- Props passed down to child components
- No state in atoms, molecules, or organisms (pure components)

## Recent Implementation Details

### Gradient Border Implementation

The gradient border (#C081FF → #B8FFE3) is implemented using CSS mask-composite technique:

```css
/* In /src/index.css */
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(90deg, #C081FF 0%, #B8FFE3 100%);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
```

Applied to:
- SearchBar component (both in expanded and typing phases)
- CompactButton component

### Focus Management

```typescript
// In MainFlow.tsx
const handleSearchFocus = () => {
  setContentState(CONTENT_STATES.TYPING);
};

const handleWidgetClick = (e: React.MouseEvent) => {
  if (contentState === CONTENT_STATES.TYPING && 
      searchInputRef.current && 
      !searchInputRef.current.contains(e.target as Node)) {
    setContentState(CONTENT_STATES.IDLE);
  }
};
```

## Key Design Decisions

1. **Atomic Design Pattern**
   - Atoms: Smallest units (icons, buttons, containers)
   - Molecules: Simple combinations (SearchBar, CompactButton)
   - Organisms: Complex UI sections (ExpandedAnswerTab, TypingPhase)
   - Templates: Complete views with state (MainFlow)

2. **Pure Components**
   - All components except MainFlow are stateless
   - State lifted to MainFlow template
   - Props used for all data and callbacks

3. **Design Tokens**
   - Centralized design system values
   - Consistent spacing, colors, typography
   - Easy theme customization

4. **Glass Morphism Effect**
   - Semi-transparent backgrounds
   - Backdrop blur for depth
   - Dark mode support

## Next Implementation Opportunities

### Additional Widget Phases
1. **Searching Phase** - Loading state while searching
2. **Results Phase** - Display search results
3. **Error Phase** - Handle error states gracefully

### Enhanced Features
1. Voice input integration (microphone button)
2. Plus button functionality
3. Search suggestions API integration
4. Animation transitions between phases
5. Keyboard navigation support
6. Accessibility enhancements

### Technical Improvements
1. Unit tests for all components
2. Storybook documentation
3. Performance optimization
4. Bundle size reduction
5. CI/CD pipeline setup

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (when implemented)
npm test

# Lint code
npm run lint
```

## File References for Quick Access

- **State Management**: `/src/components/widget/templates/MainFlow.tsx`
- **Widget States**: `/src/lib/constants.ts`
- **Design Tokens**: `/src/lib/design-tokens.ts`
- **Typing Phase**: `/src/components/widget/organisms/TypingPhase.tsx`
- **Search Bar**: `/src/components/widget/molecules/SearchBar.tsx`
- **Glass Container**: `/src/components/widget/atoms/containers/GlassContainer.tsx`
- **CSS Styles**: `/src/index.css`

## Recent Changes Summary

1. Added `CONTENT_STATES` enum to constants.ts
2. Created `TypingPhase` component for phase 3
3. Enhanced `SearchBar` with focus event handlers
4. Updated `MainFlow` with content state management
5. Implemented gradient border for SearchBar in all phases
6. Added click-outside handling for typing phase

## Known Issues & Considerations

1. TypeScript warning about unused `contentState` parameter in ExpandedAnswerTab
2. Development server runs on port 5174 (5173 is occupied)
3. Gradient border uses mask-composite which may need vendor prefixes

## Contact & Resources

- Project: ReactWidgetComponentLibrary
- Location: /Users/tjmcgovern/ReactWidgetTest
- Framework: React + TypeScript + Vite
- Styling: Tailwind CSS + CSS-in-JS
- Design System: Custom tokens-based system