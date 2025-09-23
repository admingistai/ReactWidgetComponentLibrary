# 📚 React Widget Library - Project Index

## 🎯 Project Overview

**Project Name**: Floating Widget Component Library
**Version**: 0.0.0
**Tech Stack**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
**Architecture**: Atomic Design Pattern
**Package Manager**: Bun
**Development Port**: 5174

### Purpose
A modern, animated floating widget library for building interactive search interfaces with New York Times integration. Features a multi-phase widget with glassmorphism design, gradient borders, and smooth transitions.

## 🏗️ Project Structure

```
floating-widget-library/
├── 📁 src/                      # Source code
│   ├── 📁 components/          # All UI components
│   │   ├── 📁 ui/             # shadcn/ui components (47)
│   │   ├── 📁 primitives/     # Enhanced base components
│   │   ├── 📁 composite/      # Complex components
│   │   ├── 📁 showcase/       # Component showcases
│   │   ├── 📁 landing/        # Landing page components
│   │   └── 📁 widget/         # Widget-specific components
│   │       ├── 📁 atoms/      # Basic building blocks
│   │       ├── 📁 molecules/  # Compound components
│   │       ├── 📁 organisms/  # Complex UI sections
│   │       └── 📁 templates/  # Full layouts with state
│   ├── 📁 pages/              # Application pages
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utilities and constants
│   ├── 📁 contexts/           # React contexts
│   ├── 📁 assets/             # Static assets
│   └── 📄 main.tsx            # Application entry point
├── 📁 public/                  # Public assets
├── 📁 dist/                    # Build output
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS configuration
└── 📄 components.json         # shadcn/ui configuration
```

## 🔑 Key Files Reference

### Core Application Files
| File | Purpose | Key Features |
|------|---------|--------------|
| `src/main.tsx` | App entry point | React root, router setup |
| `src/App.tsx` | Main app component | Route definitions, theme provider |
| `src/index.css` | Global styles | Gradient borders, CSS variables |

### Widget Core Components
| File | Purpose | Phase Usage |
|------|---------|-------------|
| `src/components/widget/templates/MainFlow.tsx` | Central state manager | All phases |
| `src/components/widget/organisms/phases/ExpandedAnswerTab.tsx` | Expanded idle state | Phase 2 |
| `src/components/widget/organisms/phases/TypingPhase.tsx` | Search with autocomplete | Phase 3 |
| `src/components/widget/organisms/phases/SearchingPhase.tsx` | Loading animation | Phase 4 |
| `src/components/widget/organisms/phases/ResultsPhase.tsx` | Results display | Phase 5 |

### Configuration Files
| File | Purpose | Key Settings |
|------|---------|--------------|
| `src/lib/constants.ts` | Widget constants | States, positions, animations |
| `src/lib/design-tokens.ts` | Design system | Colors, spacing, typography |
| `src/lib/autocomplete-data.ts` | Autocomplete data | Suggestions, filters |
| `src/lib/utils.ts` | Utility functions | cn() helper, classnames |

### Pages & Showcases
| File | Purpose | Route |
|------|---------|-------|
| `src/pages/LandingPage.tsx` | Marketing landing | `/` |
| `src/pages/WidgetShowcase.tsx` | Widget demo | `/widget` |
| `src/pages/ShadcnShowcase.tsx` | Component gallery | `/shadcn` |

## 🎭 Widget Phases

The widget operates through 5 distinct phases:

### Phase 1: Collapsed
- **Component**: `CompactButton`
- **State**: Widget minimized to a single button
- **Features**: Gradient border, hover effects

### Phase 2: Expanded/Idle
- **Component**: `ExpandedAnswerTab`
- **State**: Expanded with search and suggestions
- **Features**: Header, SearchBar, SuggestionsList, Footer

### Phase 3: Typing
- **Component**: `TypingPhase`
- **State**: Focused search with autocomplete
- **Features**: Minimal UI, AutocompleteDropdown

### Phase 4: Searching
- **Component**: `SearchingPhase`
- **State**: Loading with animation
- **Features**: SearchingAnimation carousel, progress indicator

### Phase 5: Results
- **Component**: `ResultsPhase`
- **State**: Display search results
- **Features**: Answer text, sources, follow-up search

## 🔄 State Management

### Two-Layer State System

```typescript
// Layout States (Visual)
- collapsed | expanded

// Content States (Behavioral)
- idle | typing | searching | results | error
```

### State Flow
```
Collapsed → Click → Expanded/Idle
Expanded/Idle → Focus Search → Typing
Typing → Submit → Searching
Searching → Complete → Results
Any State → Click Outside → Collapsed
```

## 🧩 Component Statistics

### Total Components: 100+
- **shadcn/ui Components**: 47
- **Widget Atoms**: 15
- **Widget Molecules**: 18
- **Widget Organisms**: 10
- **Templates**: 1
- **Primitives**: 4
- **Showcase Components**: 6
- **Landing Components**: 5

### Component Distribution by Phase
| Phase | Unique Components | Shared Components |
|-------|-------------------|-------------------|
| Phase 1 | 2 | 1 |
| Phase 2 | 8 | 12 |
| Phase 3 | 6 | 8 |
| Phase 4 | 4 | 5 |
| Phase 5 | 9 | 11 |

## 🛠️ Technology Details

### Dependencies (Key)
- **React**: ^19.1.0
- **TypeScript**: ~5.8.3
- **Vite**: ^7.0.4
- **Tailwind CSS**: ^3.4.0
- **Framer Motion**: ^12.23.12
- **Radix UI**: Complete suite
- **Lucide React**: ^0.536.0

### Development Tools
- **ESLint**: Code quality
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility
- **Bun**: Package management

## 📝 Documentation Files

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview and setup |
| `WIDGET_COMPONENTS.md` | Component reference guide |
| `CLAUDE.md` | AI assistant context |
| `PROJECT_INDEX.md` | This file - complete index |
| `COMPONENT_CATALOG.md` | Interactive component guide |
| `ARCHITECTURE.md` | Technical architecture |
| `DEVELOPER_GUIDE.md` | Development workflow |
| `API_REFERENCE.md` | API documentation |

## 🚀 Quick Commands

```bash
# Development
bun run dev              # Start dev server (port 5174)

# Build
bun run build           # Production build
bun run preview         # Preview production

# Code Quality
bun run lint            # Run ESLint

# Installation
bun install             # Install dependencies
```

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#C081FF` → `#B8FFE3`
- **Background**: Glass morphism with blur
- **Text**: Dark/light mode support
- **Borders**: Gradient using mask-composite

### Spacing System
- Based on Tailwind's spacing scale
- Consistent gaps and padding
- Responsive breakpoints

### Typography
- System font stack
- Responsive font sizes
- Weight variations for hierarchy

## 🔗 Navigation Links

### Development URLs
- **Local Dev**: http://localhost:5174
- **Widget Demo**: http://localhost:5174/widget
- **Component Gallery**: http://localhost:5174/shadcn

### Source Directories
- [Widget Components](./src/components/widget/)
- [UI Components](./src/components/ui/)
- [Pages](./src/pages/)
- [Hooks](./src/hooks/)
- [Utilities](./src/lib/)

## 📊 Project Metrics

- **Total Files**: ~150+
- **TypeScript Coverage**: 100%
- **Component Count**: 100+
- **Widget Phases**: 5
- **shadcn/ui Components**: 47
- **Custom Hooks**: 4
- **Showcase Pages**: 3

## 🎯 Current Status

### ✅ Completed
- Widget phases 1-3 implementation
- Gradient border system
- State management architecture
- shadcn/ui integration
- Atomic design structure

### 🚧 In Progress
- Phase 4 (Searching) refinement
- Phase 5 (Results) completion
- Animation transitions
- Performance optimization

### 📋 Planned
- API integration
- Voice input functionality
- Drag and drop
- Unit testing
- Storybook integration

---

*Last Updated: Current Session*
*Project Path: `/Users/tjmcgovern/ReactWidgetTest/floating-widget-library`*