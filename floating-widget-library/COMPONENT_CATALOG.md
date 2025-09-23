# 🎨 Component Catalog - React Widget Library

## Overview
Complete catalog of all components in the React Widget Library with usage examples, props documentation, and phase usage matrix.

## Table of Contents
- [Widget Components](#widget-components)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
  - [Organisms](#organisms)
  - [Templates](#templates)
- [shadcn/ui Components](#shadcnui-components)
- [Primitive Components](#primitive-components)
- [Usage Examples](#usage-examples)

---

## Widget Components

### Atoms

#### 🔷 GlassContainer
```tsx
import { GlassContainer } from '@/components/widget/atoms';

// Usage
<GlassContainer variant="expanded" className="p-4">
  <YourContent />
</GlassContainer>
```

**Props**:
- `variant`: 'collapsed' | 'expanded'
- `children`: ReactNode
- `className?`: string
- `style?`: CSSProperties

**Used in Phases**: 2, 3, 4, 5

---

#### 🎤 MicIcon
```tsx
import { MicIcon } from '@/components/widget/atoms';

<MicIcon className="w-5 h-5 text-gray-600" />
```

**Props**:
- `className?`: string

**Used in Phases**: 2, 3, 4, 5

---

#### ➕ PlusIcon
```tsx
import { PlusIcon } from '@/components/widget/atoms';

<PlusIcon className="w-4 h-4" />
```

**Props**:
- `className?`: string

**Used in Phases**: 2, 3, 5

---

#### 🔍 SearchIcon
```tsx
import { SearchIcon } from '@/components/widget/atoms';

<SearchIcon className="w-5 h-5" />
```

**Props**:
- `className?`: string

**Used in Phases**: 1

---

#### 💬 Text
```tsx
import { Text } from '@/components/widget/atoms';

<Text variant="header">Ask New York Times Anything!</Text>
<Text variant="body">Your content here</Text>
<Text variant="suggestion">Suggestion text</Text>
<Text variant="accent">Powered by AI</Text>
```

**Props**:
- `variant`: 'header' | 'body' | 'suggestion' | 'accent'
- `children`: ReactNode
- `className?`: string
- `style?`: CSSProperties

**Used in Phases**: All

---

### Molecules

#### 🔘 CompactButton
```tsx
import { CompactButton } from '@/components/widget/molecules';

<CompactButton
  onClick={() => setExpanded(true)}
  className="fixed bottom-4 right-4"
/>
```

**Props**:
- `onClick`: () => void
- `className?`: string

**Used in Phases**: 1

**Features**:
- Gradient border (#C081FF → #B8FFE3)
- Search icon
- Hover animations

---

#### 🔍 SearchBar
```tsx
import { SearchBar } from '@/components/widget/molecules';

<SearchBar
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSubmit={handleSearch}
  onMicClick={handleVoiceInput}
  onPlusClick={handlePlusAction}
  onFocus={() => setContentState('typing')}
  placeholder="Ask about news, generate Wordle..."
  inputRef={searchInputRef}
/>
```

**Props**:
- `value`: string
- `onChange`: (e: ChangeEvent) => void
- `onSubmit`: () => void
- `onMicClick?`: () => void
- `onPlusClick?`: () => void
- `onFocus?`: () => void
- `onBlur?`: () => void
- `placeholder?`: string
- `inputRef?`: RefObject<HTMLInputElement>

**Used in Phases**: 2, 3, 5

**Features**:
- Gradient border
- Mic and Plus icons
- Focus/blur handling

---

#### 📝 SuggestionItem
```tsx
import { SuggestionItem } from '@/components/widget/molecules';

<SuggestionItem
  text="Top Stories"
  onClick={() => handleSuggestion('Top Stories')}
  className="hover:bg-gray-100"
/>
```

**Props**:
- `text`: string
- `onClick`: () => void
- `className?`: string

**Used in Phases**: 2, 5

---

#### 🔄 SearchingAnimation
```tsx
import { SearchingAnimation } from '@/components/widget/molecules';

<SearchingAnimation
  items={["articles", "reports", "analysis", "opinions"]}
  interval={2000}
  prefix="Searching through"
  isActive={true}
/>
```

**Props**:
- `items`: string[]
- `interval?`: number
- `prefix?`: string
- `isActive`: boolean

**Used in Phases**: 4

---

#### 🔗 PlusSourceItem
```tsx
import { PlusSourceItem } from '@/components/widget/molecules';

<PlusSourceItem
  title="Trump impeachment"
  onClick={() => handleSourceClick('Trump impeachment')}
/>
```

**Props**:
- `title`: string
- `onClick`: () => void
- `className?`: string
- `style?`: CSSProperties

**Used in Phases**: 5

---

### Organisms

#### 📋 AutocompleteDropdown
```tsx
import { AutocompleteDropdown } from '@/components/widget/organisms';

<AutocompleteDropdown
  suggestions={["Breaking news", "Top stories", "Politics"]}
  onSelect={(suggestion) => handleSelect(suggestion)}
  searchTerm={searchValue}
  highlightedIndex={0}
/>
```

**Props**:
- `suggestions`: string[]
- `onSelect`: (suggestion: string) => void
- `searchTerm`: string
- `highlightedIndex?`: number

**Used in Phases**: 3

---

#### 📰 Header
```tsx
import { Header } from '@/components/widget/organisms';

<Header className="mb-4" />
// Renders: "Ask New York Times Anything!"
```

**Props**:
- `className?`: string

**Used in Phases**: 2

---

#### 💡 SuggestionsList
```tsx
import { SuggestionsList } from '@/components/widget/organisms';

<SuggestionsList
  suggestions={["Top Stories", "Breaking News", "Generate Wordle"]}
  onSuggestionClick={(text) => handleSuggestion(text)}
/>
```

**Props**:
- `suggestions`: string[]
- `onSuggestionClick`: (text: string) => void

**Used in Phases**: 2, 5

---

### Phase Components

#### Phase 2: ExpandedAnswerTab
```tsx
import { ExpandedAnswerTab } from '@/components/widget/organisms/phases';

<ExpandedAnswerTab
  searchValue={searchValue}
  onSearchChange={(value) => setSearchValue(value)}
  onSearchSubmit={handleSearch}
  onSearchFocus={() => setContentState('typing')}
  onSuggestionClick={(text) => handleSuggestion(text)}
  onMoreClick={handleMore}
  searchInputRef={searchRef}
/>
```

**Key Features**:
- Full expanded interface
- Search bar with suggestions
- More button
- Powered by footer

---

#### Phase 3: TypingPhase
```tsx
import { TypingPhase } from '@/components/widget/organisms/phases';

<TypingPhase
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  onSearchSubmit={handleSearch}
  suggestions={filteredSuggestions}
  onSuggestionSelect={handleSuggestionSelect}
  searchInputRef={searchRef}
/>
```

**Key Features**:
- Minimal interface
- Autocomplete dropdown
- Focus management

---

#### Phase 4: SearchingPhase
```tsx
import { SearchingPhase } from '@/components/widget/organisms/phases';

<SearchingPhase
  searchQuery="Latest AI developments"
  onMicClick={handleVoiceInput}
/>
```

**Key Features**:
- Search query display
- Animated "Searching through..." text
- Mic button

---

#### Phase 5: ResultsPhase
```tsx
import { ResultsPhase } from '@/components/widget/organisms/phases';

<ResultsPhase
  searchQuery="AI developments"
  answer={answerText}
  sources={sourcesList}
  isLoadingSources={false}
  followUpValue={followUpSearch}
  onFollowUpChange={setFollowUpSearch}
  onFollowUpSubmit={handleFollowUp}
  suggestions={followUpSuggestions}
  onSuggestionClick={handleSuggestion}
  onSourceClick={handleSourceClick}
  onMoreClick={handleMore}
  followUpInputRef={followUpRef}
/>
```

**Key Features**:
- Answer display
- Source items with loading
- Follow-up search
- Suggestions

---

### Templates

#### 🎮 MainFlow
```tsx
import { MainFlow } from '@/components/widget/templates';

<MainFlow
  initialExpanded={false}
  onSuggestionSelect={(suggestion) => console.log(suggestion)}
  className="fixed bottom-4 right-4"
/>
```

**Props**:
- `initialExpanded?`: boolean
- `onSuggestionSelect?`: (suggestion: string) => void
- `className?`: string

**Manages**:
- All widget phases (1-5)
- State transitions
- Event handling
- Click-outside detection

---

## shadcn/ui Components

### Complete List (47 Components)

| Component | Import Path | Category |
|-----------|-------------|----------|
| Accordion | `@/components/ui/accordion` | Disclosure |
| Alert | `@/components/ui/alert` | Feedback |
| AlertDialog | `@/components/ui/alert-dialog` | Overlay |
| AspectRatio | `@/components/ui/aspect-ratio` | Layout |
| Avatar | `@/components/ui/avatar` | Data Display |
| Badge | `@/components/ui/badge` | Data Display |
| Breadcrumb | `@/components/ui/breadcrumb` | Navigation |
| Button | `@/components/ui/button` | Actions |
| Calendar | `@/components/ui/calendar` | Date/Time |
| Card | `@/components/ui/card` | Layout |
| Carousel | `@/components/ui/carousel` | Data Display |
| Chart | `@/components/ui/chart` | Data Display |
| Checkbox | `@/components/ui/checkbox` | Forms |
| Collapsible | `@/components/ui/collapsible` | Disclosure |
| Command | `@/components/ui/command` | Navigation |
| ContextMenu | `@/components/ui/context-menu` | Overlay |
| Dialog | `@/components/ui/dialog` | Overlay |
| Drawer | `@/components/ui/drawer` | Overlay |
| DropdownMenu | `@/components/ui/dropdown-menu` | Overlay |
| Form | `@/components/ui/form` | Forms |
| HoverCard | `@/components/ui/hover-card` | Overlay |
| Input | `@/components/ui/input` | Forms |
| InputOTP | `@/components/ui/input-otp` | Forms |
| Label | `@/components/ui/label` | Forms |
| Menubar | `@/components/ui/menubar` | Navigation |
| NavigationMenu | `@/components/ui/navigation-menu` | Navigation |
| Pagination | `@/components/ui/pagination` | Navigation |
| Popover | `@/components/ui/popover` | Overlay |
| Progress | `@/components/ui/progress` | Feedback |
| RadioGroup | `@/components/ui/radio-group` | Forms |
| Resizable | `@/components/ui/resizable` | Layout |
| ScrollArea | `@/components/ui/scroll-area` | Layout |
| Select | `@/components/ui/select` | Forms |
| Separator | `@/components/ui/separator` | Layout |
| Sheet | `@/components/ui/sheet` | Overlay |
| Sidebar | `@/components/ui/sidebar` | Navigation |
| Skeleton | `@/components/ui/skeleton` | Feedback |
| Slider | `@/components/ui/slider` | Forms |
| Sonner | `@/components/ui/sonner` | Feedback |
| Switch | `@/components/ui/switch` | Forms |
| Table | `@/components/ui/table` | Data Display |
| Tabs | `@/components/ui/tabs` | Navigation |
| Textarea | `@/components/ui/textarea` | Forms |
| Toast | `@/components/ui/toast` | Feedback |
| Toggle | `@/components/ui/toggle` | Actions |
| ToggleGroup | `@/components/ui/toggle-group` | Actions |
| Tooltip | `@/components/ui/tooltip` | Overlay |

---

## Primitive Components

### Enhanced Button
```tsx
import { Button } from '@/components/primitives/Button';

<Button
  isLoading
  loadingText="Processing..."
  leftIcon={<Settings />}
  rightIcon={<ArrowRight />}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Click Me
</Button>
```

**Extended Props**:
- `isLoading?`: boolean
- `loadingText?`: string
- `leftIcon?`: ReactElement
- `rightIcon?`: ReactElement
- Framer Motion animation props

---

## Usage Examples

### Complete Widget Implementation
```tsx
import { MainFlow } from '@/components/widget/templates';

function App() {
  return (
    <MainFlow
      initialExpanded={false}
      onSuggestionSelect={(suggestion) => {
        console.log('Selected:', suggestion);
        // Handle suggestion selection
      }}
      className="fixed bottom-4 right-4 z-50"
    />
  );
}
```

### Custom Phase Implementation
```tsx
import { useState } from 'react';
import { GlassContainer } from '@/components/widget/atoms';
import { SearchBar } from '@/components/widget/molecules';
import { CONTENT_STATES } from '@/lib/constants';

function CustomWidget() {
  const [contentState, setContentState] = useState(CONTENT_STATES.IDLE);
  const [searchValue, setSearchValue] = useState('');

  return (
    <GlassContainer variant="expanded">
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSubmit={() => setContentState(CONTENT_STATES.SEARCHING)}
        onFocus={() => setContentState(CONTENT_STATES.TYPING)}
        placeholder="Ask anything..."
      />
      {/* Add more components based on contentState */}
    </GlassContainer>
  );
}
```

### Using with shadcn/ui
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <h3>Feature Title</h3>
        <Badge>New</Badge>
      </CardHeader>
      <CardContent>
        <p>Feature description</p>
        <Button>Learn More</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Component Phase Matrix

| Component | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|-----------|:-------:|:-------:|:-------:|:-------:|:-------:|
| **Containers** |
| GlassContainer | - | ✅ | ✅ | ✅ | ✅ |
| **Icons** |
| SearchIcon | ✅ | - | - | - | - |
| MicIcon | - | ✅ | ✅ | ✅ | ✅ |
| PlusIcon | - | ✅ | ✅ | - | ✅ |
| **Buttons** |
| CompactButton | ✅ | - | - | - | - |
| MoreButton | - | ✅ | - | - | ✅ |
| PoweredByButton | - | ✅ | ✅ | ✅ | ✅ |
| **Search** |
| SearchBar | - | ✅ | ✅ | - | ✅ |
| AutocompleteDropdown | - | - | ✅ | - | - |
| SearchingAnimation | - | - | - | ✅ | - |
| **Content** |
| Header | - | ✅ | - | - | - |
| SuggestionsList | - | ✅ | - | - | ✅ |
| AnswerHeader | - | - | - | - | ✅ |
| PlusSourceItem | - | - | - | - | ✅ |

---

## Component Import Guide

### Quick Import Reference
```tsx
// Widget Components
import {
  GlassContainer,
  MicIcon,
  PlusIcon,
  Text
} from '@/components/widget/atoms';

import {
  CompactButton,
  SearchBar,
  SuggestionItem,
  SearchingAnimation
} from '@/components/widget/molecules';

import {
  AutocompleteDropdown,
  Header,
  SuggestionsList
} from '@/components/widget/organisms';

import {
  ExpandedAnswerTab,
  TypingPhase,
  SearchingPhase,
  ResultsPhase
} from '@/components/widget/organisms/phases';

import { MainFlow } from '@/components/widget/templates';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
// ... and 44 more

// Utilities
import { cn } from '@/lib/utils';
import { WIDGET_STATES, CONTENT_STATES } from '@/lib/constants';
```

---

## Component Development Guidelines

### Creating New Widget Components

1. **Follow Atomic Design**:
   - Atoms: Single-purpose, no business logic
   - Molecules: Combine atoms, minimal logic
   - Organisms: Complex sections, some logic
   - Templates: Full layouts with state

2. **TypeScript First**:
   ```tsx
   interface ComponentProps {
     required: string;
     optional?: boolean;
     children?: ReactNode;
     className?: string;
   }
   ```

3. **Use Design Tokens**:
   ```tsx
   import { colors, spacing } from '@/lib/design-tokens';
   ```

4. **Maintain Phase Compatibility**:
   - Consider which phases will use the component
   - Keep components pure and stateless
   - Pass callbacks for interactivity

---

*Component Catalog - React Widget Library v0.0.0*