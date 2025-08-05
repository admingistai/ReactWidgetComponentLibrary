# Claude Code Project Context - React Widget Library

## Project Summary
Multi-phase React widget component library for New York Times search interface. Built with TypeScript, Vite, and Tailwind CSS using atomic design principles.

## Current Implementation Status ✅

### Completed Widget Phases
1. **Phase 1**: Collapsed button with gradient background
2. **Phase 2**: Expanded interface with search, suggestions, and footer
3. **Phase 3**: Typing state with minimal "Ask New York Times Anything!" UI

### Recent Work Completed
- ✅ Implemented TypingPhase component for focused search state
- ✅ Added CONTENT_STATES enum for widget behavior management
- ✅ Enhanced SearchBar with focus event handling
- ✅ Applied gradient border (#C081FF → #B8FFE3) to search bars in phases 2 & 3
- ✅ Updated MainFlow with content state transitions
- ✅ Fixed gradient border CSS using mask-composite technique

## Architecture Overview

```
Two-Layer State System:
├── Layout States: collapsed | expanded (widget appearance)
└── Content States: idle | typing | searching | results | error (widget behavior)

Component Structure (Atomic Design):
├── MainFlow.tsx (template - manages all state)
├── Organisms: ExpandedAnswerTab, TypingPhase, Header, etc.
├── Molecules: SearchBar, CompactButton, MoreButton
└── Atoms: GlassContainer, Icons, Buttons
```

## Key Files & Their Purpose

- **MainFlow.tsx**: Central state management, phase transitions
- **TypingPhase.tsx**: Phase 3 component (recently added)
- **SearchBar.tsx**: Shared search input with gradient border
- **GlassContainer.tsx**: Reusable container with glass morphism
- **constants.ts**: Widget states and enums
- **design-tokens.ts**: Design system values
- **index.css**: Gradient border CSS and theme variables

## Development Context

### Current State Transitions
```
Collapsed (Phase 1) → Click → Expanded/Idle (Phase 2)
Expanded/Idle (Phase 2) → Focus Search → Typing (Phase 3)
Typing (Phase 3) → Click Outside → Expanded/Idle (Phase 2)
```

### Gradient Border Implementation
- Uses CSS mask-composite technique in index.css
- Colors: #C081FF (purple) → #B8FFE3 (mint green)
- Applied to SearchBar in phases 2 & 3 and CompactButton in phase 1

### Development Server
- Runs on port 5174 (5173 occupied)
- Command: `npm run dev` in floating-widget-library directory

## Next Development Opportunities

### Immediate Next Steps
1. **Phase 4**: Searching state with loading indicator
2. **Phase 5**: Results display with search results
3. **Phase 6**: Error handling state

### Feature Enhancements
- Voice input functionality (microphone button)
- Plus button actions
- Search API integration
- Keyboard navigation
- Animation transitions

### Technical Improvements
- Unit tests implementation
- Storybook documentation
- Performance optimization
- Accessibility enhancements

## Commands & Shortcuts

```bash
# Start development
cd floating-widget-library && npm run dev

# Build project
npm run build

# View current structure
tree src/components/widget/

# Test gradient in browser
open http://localhost:5174
```

## Recent Technical Decisions

1. **Pure Component Architecture**: All state lifted to MainFlow template
2. **CSS Mask-Composite**: For gradient borders without affecting content
3. **Focus Management**: Click-outside detection for state transitions
4. **Two-Layer States**: Separation of layout vs content behavior
5. **TypeScript Strict**: Full type safety throughout component tree

## Known Considerations
- TypeScript warning about unused contentState param (non-blocking)
- Gradient border requires vendor prefixes for full browser support
- Development port conflict (using 5174 instead of 5173)

## Contact Context
- Project: ReactWidgetComponentLibrary
- User: tjmcgovern
- Location: /Users/tjmcgovern/ReactWidgetTest
- GitHub: admingistai/ReactWidgetComponentLibrary

This context should enable seamless continuation of development work on this React widget library.