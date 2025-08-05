/**
 * Widget export - main entry point
 * Following "Thinking in React" architecture
 */

// Export the main widget component
export { MainFlow as FloatingWidget } from './templates';

// Export all building blocks for reusability
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';