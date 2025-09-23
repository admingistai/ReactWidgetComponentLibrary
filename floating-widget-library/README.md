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
bun run dev         # Start dev server at http://localhost:5174

# Build
bun run build       # Build for production
bun run preview     # Preview production build

# Linting
bun run lint        # Run ESLint
```

### 🧪 Testing New Components in the Sandbox

The Widget Sandbox provides an isolated environment for developing and testing new React components. Access it at http://localhost:5174/sandbox.

#### Quick Start for New Components

1. **Navigate to the Sandbox**: Go to http://localhost:5174/sandbox
2. **Toggle to Custom View**: Click the "Custom" button in the header
3. **Edit the Component File**: Modify `src/components/custom/CustomComponent.tsx`

#### Working with Custom Components

##### Method 1: Direct Editing (Recommended for Quick Testing)
Edit the CustomComponent file directly:

```tsx
// src/components/custom/CustomComponent.tsx
import React from 'react';

export const CustomComponent: React.FC = () => {
  // Your component logic here
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default CustomComponent;
```

##### Method 2: Import Your Component
Import and display an existing component:

```tsx
// src/components/custom/CustomComponent.tsx
import React from 'react';
import MyNewWidget from '../MyNewWidget'; // Import your component

export const CustomComponent: React.FC = () => {
  return <MyNewWidget />;
};

export default CustomComponent;
```

#### Sandbox Features

- **Toggle Views**: Switch between Widget and Custom component views
- **Background Options**: Test on Light, Dark, Gradient, or Black backgrounds
- **Grid Overlay**: Enable alignment grid for precise positioning
- **Reset Button**: Reinitialize components to test initial states
- **Debug Mode**: Track component interactions and state changes
- **Hot Reload**: Changes auto-refresh without manual reload

#### Development Workflow

1. **Create Your Component**: Develop your component in its own file
2. **Import in CustomComponent**: Reference it in `CustomComponent.tsx`
3. **Test in Sandbox**: Use the sandbox environment to test:
   - Different background colors
   - Component interactions
   - Responsive behavior
   - State management
4. **Iterate**: Make changes and see them instantly with hot reload

#### Tips for Component Development

- Use the grid overlay to ensure proper alignment
- Test on all background options to ensure visibility
- Enable debug mode to track user interactions
- Use the reset button to test initialization logic
- The sandbox maintains the same styling environment as production

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