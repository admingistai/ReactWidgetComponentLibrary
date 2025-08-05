# Floating Widget Component Library

A modern React component library for building floating widgets with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## 📦 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Bun** - Fast package manager
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # All shadcn/ui components (47 components)
│   ├── primitives/       # Base components extending shadcn/ui
│   ├── composite/        # Complex components built from primitives
│   └── widget/           # Widget-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
│   ├── utils.ts          # cn() utility for class names
│   └── constants.ts      # Widget states, positions, and settings
├── styles/              # Global styles and themes
└── stories/             # Component examples (Storybook ready)
```

## 🎨 Features

### Component Library

- **47 shadcn/ui Components**: Full suite of accessible, customizable components
- **Enhanced Primitives**: Extended components with loading states, icons, and animations
- **Widget Components**: Specialized components for floating widgets
- **Type Safety**: Full TypeScript support with proper types

### Widget Features

- **Multiple States**: minimized, expanded, floating, docked, hidden
- **Positioning**: top-left, top-right, bottom-left, bottom-right, center
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Works on all screen sizes
- **Accessible**: WCAG compliant components

## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev         # Start dev server at http://localhost:5173

# Build
bun run build       # Build for production
bun run preview     # Preview production build

# Linting
bun run lint        # Run ESLint
```

### Path Aliases

The project is configured with TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@/components/primitives/Button'
import { cn } from '@/lib/utils'
import { WIDGET_STATES } from '@/lib/constants'
```

Available aliases:
- `@/` - src directory
- `@/components` - Components directory
- `@/hooks` - Hooks directory
- `@/lib` - Library/utilities directory
- `@/styles` - Styles directory

## 💻 Usage Examples

### Basic Button

```tsx
import { Button } from '@/components/primitives/Button'

// Simple button
<Button>Click me</Button>

// With loading state
<Button isLoading loadingText="Processing...">
  Submit
</Button>

// With icons
<Button leftIcon={<Settings />} rightIcon={<ArrowRight />}>
  Configure
</Button>

// Custom animation
<Button 
  whileHover={{ scale: 1.1 }} 
  whileTap={{ scale: 0.9 }}
>
  Animated
</Button>
```

### Widget States

```tsx
import { WIDGET_STATES, WIDGET_POSITIONS } from '@/lib/constants'

// Use predefined constants
const [state, setState] = useState(WIDGET_STATES.FLOATING)
const [position, setPosition] = useState(WIDGET_POSITIONS.BOTTOM_RIGHT)
```

## 🎯 Component Status

### ✅ Completed
- Project setup with Vite + React + TypeScript
- Tailwind CSS configuration
- shadcn/ui integration (all 47 components)
- Path aliases configuration
- Enhanced Button primitive
- Constants and utilities
- Development test page

### 🚧 In Progress
- Composite components
- Widget-specific components
- Drag and drop functionality
- Resize functionality
- State persistence

### 📋 Planned
- Storybook integration
- Unit tests
- E2E tests
- Documentation site
- NPM package publishing

## 🤝 Contributing

This is a development project for building floating widget components. Feel free to extend and customize for your needs.

## 📄 License

MIT

## 🔗 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Vite](https://vitejs.dev)
- [Bun](https://bun.sh)