/**
 * AnswerHeader - Molecule for displaying search query header in results phase
 * Pure component - shows the search question or loading state
 */

import { Text } from '../../atoms';
import type { CSSProperties } from 'react';

interface AnswerHeaderProps {
  searchQuery?: string;
  isLoading?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function AnswerHeader({ 
  searchQuery = '',
  isLoading = false,
  className = '', 
  style = {} 
}: AnswerHeaderProps) {
  const displayText = isLoading ? 'Answer loading' : searchQuery;
  
  return (
    <div
      className={className}
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        ...style
      }}
    >
      <Text variant="header" style={{ textAlign: 'left' }}>
        {displayText}
      </Text>
    </div>
  );
}