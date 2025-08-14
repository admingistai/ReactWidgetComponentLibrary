/**
 * SourcesBar - Organism for displaying loading sources and source items
 * Handles loading state transition and source item rendering - no internal state
 */

import { Text } from '../atoms/typography/Text';
import { PercentageSourceItem } from '../molecules/sources/PercentageSourceItem';
import { tokens } from '@/lib/design-tokens';
import type { CSSProperties } from 'react';

interface SourceData {
  title: string;
  percentage: string;
}

interface SourcesBarProps {
  isLoading?: boolean;
  sources?: SourceData[];
  onSourceClick?: (source: SourceData) => void;
  className?: string;
  style?: CSSProperties;
}

export function SourcesBar({ 
  isLoading = false, 
  sources = [], 
  onSourceClick,
  className = '', 
  style = {} 
}: SourcesBarProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
        display: 'flex',
        ...style
      }}
    >
      {isLoading ? (
        // Loading state
        <div 
          style={{
            width: '100%',
            height: '32px',
            paddingLeft: tokens.spacing.sm,
            paddingRight: tokens.spacing.sm,
            paddingTop: tokens.spacing.xs,
            paddingBottom: tokens.spacing.xs,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Text variant="accent">Loading sources...</Text>
        </div>
      ) : (
        // Sources list
        sources.map((source, index) => (
          <PercentageSourceItem
            key={index}
            title={source.title}
            percentage={source.percentage}
            onClick={onSourceClick ? () => onSourceClick(source) : undefined}
          />
        ))
      )}
    </div>
  );
}