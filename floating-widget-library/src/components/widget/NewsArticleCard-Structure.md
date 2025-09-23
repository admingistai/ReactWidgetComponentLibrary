# NewsArticleCard Component Structure

## Component Architecture (Atomic Design Pattern)

```
NewsArticleCard (Organism)
├── NewsCardHeader (Molecule)
│   ├── SourceBadge (Molecule)
│   │   ├── Logo Image (HTML Element)
│   │   └── SourceLabel (Atom)
│   └── PercentageBadge (Molecule)
│       ├── PercentageDot (Atom)
│       └── Percentage Text (HTML Element)
└── ArticleTitle (Atom)
```

## File Locations

All components are properly organized in `/src/components/widget/`:

### Atoms (Basic Building Blocks)
- `atoms/badges/PercentageDot.tsx` - Purple indicator dot
- `atoms/badges/SourceLabel.tsx` - Source name text styling
- `atoms/typography/ArticleTitle.tsx` - Article headline with truncation

### Molecules (Composed Components)
- `molecules/badges/SourceBadge.tsx` - Logo + source name
- `molecules/badges/PercentageBadge.tsx` - Percentage with blur background
- `molecules/headers/NewsCardHeader.tsx` - Complete gradient header

### Organisms (Complex Components)
- `organisms/cards/NewsArticleCard.tsx` - Complete news article card

## Design Specifications

### Colors
- **Header Gradient**: `linear-gradient(128deg, #BB61EF 0%, #6700A2 100%)`
- **Background Gradient**: `linear-gradient(240deg, rgba(65, 0, 102, 0) 0%, #410066 100%)`
- **Percentage Badge**: `rgba(0, 0, 0, 0.40)` with 5px blur
- **Percentage Dot**: `#BB61EF`
- **Text**: White (`#FFFFFF`)
- **Percentage Text**: `rgba(255, 255, 255, 0.80)`

### Typography
- **Font**: Inter
- **Source Name**: 12px, 600 weight, 12px line-height
- **Percentage**: 10px, 500 weight, 8px line-height
- **Article Title**: 12px, 600 weight, 16.8px line-height

### Dimensions
- **Card Width**: 255px
- **Card Min Height**: 102px
- **Border Radius**: 10px
- **Logo Size**: 16x16px
- **Percentage Dot**: 8x8px

## Usage Example

```tsx
import { NewsArticleCard } from '@/components/widget';

<NewsArticleCard
  articleTitle="Trump Says He Doesn't 'Draw Pictures.' But Many of His Sketches Sold at Auction."
  sourceName="The New York Times"
  percentage="24%"
  logoSrc="/nytlogo.png"
  backgroundImage="/article-bg.jpg" // optional
  onClick={() => console.log('Article clicked')}
/>
```

## Export Hierarchy

The components are exported through the following index files:
- `atoms/index.ts` → exports all atoms including badges
- `molecules/index.ts` → exports all molecules including badges and headers
- `organisms/index.ts` → exports NewsArticleCard from cards
- `widget/index.ts` → main export for all widget components

## Component Features

- ✅ Modular atomic design structure
- ✅ TypeScript support with proper interfaces
- ✅ Responsive design with flexbox
- ✅ Hover animations for interactivity
- ✅ Customizable props for all data
- ✅ Proper text truncation for long titles
- ✅ Gradient backgrounds as per Figma design
- ✅ Backdrop blur effect on percentage badge
- ✅ Click handlers for user interaction