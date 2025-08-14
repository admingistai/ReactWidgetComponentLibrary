/**
 * Organisms export - complex UI sections
 * Still pure presentational components
 */

// Re-export all phases from the phases folder
export { ExpandedAnswerTab, TypingPhase, SearchingPhase, ResultsPhase } from './phases';

// Export other organisms
export { Header } from './Header';
export { SuggestionsList } from './SuggestionsList';
export { PoweredByFooter } from './PoweredByFooter';
export { AutocompleteDropdown } from './AutocompleteDropdown';
export { SourcesBar } from './SourcesBar';
export { StackedSources } from './StackedSources';
export type { SourceData } from './StackedSources';