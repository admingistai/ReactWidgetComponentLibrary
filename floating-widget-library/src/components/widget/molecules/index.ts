/**
 * Molecules export - composed atomic components
 * Still pure presentational components with no internal state
 * Organized by functional categories for better navigation
 */

// Button components
export { CompactButton, ExpandButton, MoreButton, PlusButton, PoweredByButton } from './buttons';

// Badge components
export { SourceBadge, PercentageBadge } from './badges';

// Header components
export { NewsCardHeader, ShareThreadHeader } from './headers';

// Search components
export { SearchBar, SearchingAnimation } from './search';

// Content components
export { AnswerHeader, AnswerText, SuggestionItem, TabBar } from './content';
export { ThreadQuestion, ThreadAnswer, ThreadFooter } from './content';

// Source components
export { PercentageSourceItem, PlusSourceItem, GlassSourceItem } from './sources';
// Legacy exports for backward compatibility
export { PercentageSourceItem as SourceItem } from './sources'; // Deprecated: Use PercentageSourceItem
export { PlusSourceItem as ResultsSourceItem } from './sources'; // Deprecated: Use PlusSourceItem

// Effect components
export { FadeOverlay } from './effects';