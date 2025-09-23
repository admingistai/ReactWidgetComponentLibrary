# 👨‍💻 Developer Guide - React Widget Library

## Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React and TypeScript

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd floating-widget-library

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Running the Development Server

```bash
# Start dev server (port 5174)
bun run dev

# Or with npm
npm run dev
```

Open http://localhost:5174 to view the application.

---

## Development Workflow

### 🎯 Common Development Tasks

#### Starting a New Feature
```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Start the dev server
bun run dev

# 3. Make your changes
# 4. Test your changes
# 5. Commit and push
```

#### Adding a New Widget Component

1. **Choose the correct atomic level**:
   - Atom: Single-purpose, no logic
   - Molecule: 2-3 atoms combined
   - Organism: Complex section
   - Template: Full layout with state

2. **Create the component file**:
```bash
# Example: Creating a new atom
touch src/components/widget/atoms/YourComponent.tsx
```

3. **Implement the component**:
```tsx
// src/components/widget/atoms/YourComponent.tsx
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface YourComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const YourComponent: FC<YourComponentProps> = ({
  className,
  children
}) => {
  return (
    <div className={cn('your-default-classes', className)}>
      {children}
    </div>
  );
};
```

4. **Export from index**:
```tsx
// src/components/widget/atoms/index.ts
export { YourComponent } from './YourComponent';
```

#### Adding a New Phase

1. **Create phase component**:
```tsx
// src/components/widget/organisms/phases/NewPhase.tsx
import { type FC } from 'react';
import { GlassContainer } from '../../atoms';

interface NewPhaseProps {
  // Define props
}

export const NewPhase: FC<NewPhaseProps> = (props) => {
  return (
    <GlassContainer variant="expanded">
      {/* Phase implementation */}
    </GlassContainer>
  );
};
```

2. **Add to MainFlow**:
```tsx
// src/components/widget/templates/MainFlow.tsx
import { NewPhase } from '../organisms/phases';

// In render logic
{contentState === 'new_state' && (
  <NewPhase {...props} />
)}
```

3. **Update constants**:
```tsx
// src/lib/constants.ts
export const CONTENT_STATES = {
  // ... existing states
  NEW_STATE: 'new_state'
} as const;
```

---

## Project Structure Guide

### Directory Organization

```
src/
├── components/
│   ├── widget/          # Widget-specific components
│   │   ├── atoms/       # Basic building blocks
│   │   ├── molecules/   # Compound components
│   │   ├── organisms/   # Complex sections
│   │   └── templates/   # Full layouts
│   ├── ui/              # shadcn/ui components
│   ├── primitives/      # Enhanced base components
│   └── showcase/        # Demo components
├── lib/                 # Utilities and helpers
├── hooks/              # Custom React hooks
├── pages/              # Route pages
└── assets/             # Images and static files
```

### File Naming Conventions

```
ComponentName.tsx       # React components (PascalCase)
useHookName.ts         # Custom hooks (camelCase with 'use' prefix)
utility-name.ts        # Utility files (kebab-case)
CONSTANTS.ts           # Constants files (UPPERCASE)
index.ts               # Index files for exports
```

### Import Organization

```tsx
// 1. External imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Internal absolute imports
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 3. Relative imports
import { SearchBar } from '../molecules';
import type { WidgetProps } from './types';

// 4. Style imports
import './styles.css';
```

---

## Component Development

### Creating Components

#### 1. TypeScript First
```tsx
// Always define interfaces
interface ComponentProps {
  required: string;
  optional?: boolean;
  children?: React.ReactNode;
  className?: string;
  onAction?: (value: string) => void;
}
```

#### 2. Use Design Tokens
```tsx
import { tokens } from '@/lib/design-tokens';

const styles = {
  color: tokens.colors.primary,
  padding: tokens.spacing.md
};
```

#### 3. Utilize cn() Helper
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  'default-styling',
  condition && 'conditional-class',
  className // Allow override
)} />
```

#### 4. Handle Events Properly
```tsx
const handleClick = useCallback((e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  onAction?.(value);
}, [value, onAction]);
```

### Using shadcn/ui Components

```tsx
// Import from ui directory
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Use with custom styling
<Button
  variant="outline"
  size="sm"
  className="custom-styles"
>
  Click me
</Button>
```

### State Management Patterns

#### Local State
```tsx
// For component-specific state
const [isOpen, setIsOpen] = useState(false);
```

#### Lifted State
```tsx
// Pass state from parent
interface ChildProps {
  value: string;
  onChange: (value: string) => void;
}
```

#### Derived State
```tsx
// Compute from existing state
const isValid = useMemo(
  () => value.length > 0 && value.length < 100,
  [value]
);
```

---

## Styling Guide

### Tailwind CSS Usage

```tsx
// Utility classes
<div className="flex items-center justify-between p-4">

// Responsive design
<div className="w-full md:w-1/2 lg:w-1/3">

// Dark mode support
<div className="bg-white dark:bg-gray-900">

// Hover and focus states
<button className="hover:bg-blue-500 focus:outline-none focus:ring-2">
```

### Custom CSS

```css
/* src/index.css */

/* CSS Variables */
:root {
  --gradient-start: #C081FF;
  --gradient-end: #B8FFE3;
}

/* Gradient borders */
.gradient-border {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
```

### Animation with Framer Motion

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated content
</motion.div>
```

---

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run with coverage
bun test --coverage

# Watch mode
bun test --watch
```

### Writing Tests

#### Component Testing
```tsx
// SearchBar.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('handles input changes', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <SearchBar value="" onChange={onChange} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalled();
  });
});
```

#### Hook Testing
```tsx
// useWidget.test.ts
import { renderHook, act } from '@testing-library/react';
import { useWidget } from './useWidget';

describe('useWidget', () => {
  it('toggles expansion state', () => {
    const { result } = renderHook(() => useWidget());

    act(() => {
      result.current.toggleExpanded();
    });

    expect(result.current.isExpanded).toBe(true);
  });
});
```

---

## Build & Deployment

### Building for Production

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

### Build Output
```
dist/
├── assets/
│   ├── index.[hash].js
│   ├── vendor.[hash].js
│   └── index.[hash].css
└── index.html
```

### Environment Variables

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-api-key
```

```tsx
// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
```

### Deployment Checklist

- [ ] Run tests: `bun test`
- [ ] Check TypeScript: `tsc --noEmit`
- [ ] Run linter: `bun run lint`
- [ ] Build project: `bun run build`
- [ ] Test production build: `bun run preview`
- [ ] Update version in package.json
- [ ] Commit and push changes
- [ ] Deploy to hosting service

---

## Performance Optimization

### Code Splitting

```tsx
// Lazy load components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Memoization

```tsx
// Memoize expensive computations
const expensiveValue = useMemo(
  () => computeExpensiveValue(data),
  [data]
);

// Memoize components
const OptimizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Bundle Analysis

```bash
# Analyze bundle size
bun run build --analyze
```

---

## Debugging

### VS Code Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug in Chrome",
      "url": "http://localhost:5174",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools in browser
3. Navigate to Components/Profiler tabs
4. Inspect component props and state

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Dev server runs on 5174 |
| TypeScript errors | Run `tsc --noEmit` to check |
| Build fails | Clear cache: `rm -rf node_modules dist` |
| Styles not applying | Check Tailwind config and class names |
| Component not rendering | Check imports and exports |

---

## Git Workflow

### Branch Naming
```
feature/feature-name    # New features
bugfix/issue-number     # Bug fixes
hotfix/critical-fix     # Critical fixes
refactor/component-name # Refactoring
```

### Commit Messages
```bash
# Format: type(scope): message

feat(widget): add new search animation
fix(search): resolve autocomplete bug
docs(readme): update installation steps
style(button): improve hover effects
refactor(state): simplify state management
test(search): add unit tests
chore(deps): update dependencies
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed

## Screenshots
(if applicable)
```

---

## Resources & Links

### Internal Documentation
- [Project Index](./PROJECT_INDEX.md)
- [Component Catalog](./COMPONENT_CATALOG.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [API Reference](./API_REFERENCE.md)

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev)

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Auto Rename Tag
- ES7+ React/Redux/React-Native snippets

---

## Troubleshooting

### FAQ

**Q: How do I add a new route?**
```tsx
// src/App.tsx
<Route path="/new-route" element={<NewPage />} />
```

**Q: How do I add a new shadcn/ui component?**
```bash
# Manual installation from shadcn/ui docs
# Copy component to src/components/ui/
```

**Q: How do I update the gradient colors?**
```css
/* src/index.css */
:root {
  --gradient-start: #YourColor1;
  --gradient-end: #YourColor2;
}
```

**Q: How do I add API integration?**
```tsx
// Create API client in src/lib/api.ts
export const api = {
  search: async (query: string) => {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    return response.json();
  }
};
```

---

*Developer Guide - React Widget Library v0.0.0*