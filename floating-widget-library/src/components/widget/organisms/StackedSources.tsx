/**
 * StackedSources - Container for stacked source items with coordinated hover
 * Manages hover state for all child GlassSourceItem components
 * Creates the overlapping stack effect seen in the design
 */

import { useState } from 'react';
import { GlassSourceItem } from '../molecules/sources/GlassSourceItem';
import type { ReactNode, CSSProperties } from 'react';

export interface SourceData {
  id: string;
  logo: string | ReactNode;
  name: string;
  percentage: string;
  color: string;
  url?: string;
}

interface StackedSourcesProps {
  sources: SourceData[];
  onSourceClick?: (source: SourceData) => void;
  className?: string;
  style?: CSSProperties;
}

export function StackedSources({
  sources,
  onSourceClick,
  className = '',
  style = {}
}: StackedSourcesProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Define individual widths for each source
  // Collapsed state: NYT=40px, DM=73px, AW=106px, More=140px
  const collapsedWidths = [40, 73, 106, 140];
  
  // Expanded state: NYT=73px, DM=146px, AW=212px, More=284px
  const expandedWidths = [73, 146, 212, 284];

  return (
    <div 
      className={`stacked-sources ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '40px',
        width: '284px', // Max width of largest expanded item
        ...style
      }}
    >
      {sources.map((source, index) => {
        // Reverse z-index so first item (NYT) has highest z-index
        const zIndex = sources.length - index;
        
        // All items positioned at left:0 for proper stacking
        const leftPosition = 0;
        const width = isHovered ? expandedWidths[index] : collapsedWidths[index];
        
        return (
          <div
            key={source.id}
            style={{
              position: 'absolute',
              left: `${leftPosition}px`,
              top: 0,
              zIndex, // Reversed stacking order
              transition: 'left 0.3s ease-out',
            }}
          >
            <GlassSourceItem
              logo={source.logo}
              logoAlt={source.name}
              percentage={source.percentage}
              backgroundColor={source.color}
              isExpanded={isHovered}
              index={index}
              width={width}
              onClick={() => {
                if (source.url) {
                  window.open(source.url, '_blank');
                }
                onSourceClick?.(source);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}