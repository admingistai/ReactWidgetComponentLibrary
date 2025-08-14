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

  // Define widths and logo positions for each source
  const collapsedWidths = [40, 80, 110, 140]; // NYT, DM, AW, More (stepped effect)
  const expandedWidths = [73, 146, 212, 284]; // NYT, DM, AW, More (expanded)
  const logoPositions = [9, 45, 77, 110]; // Logo left positions for each bar

  return (
    <div 
      className={`stacked-sources ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '40px',
        width: '300px', // Fixed width to prevent any container movement
        // No transition on container to ensure absolute stability
        ...style
      }}
    >
      {sources.map((source, index) => {
        // Reverse z-index so first item (NYT) has highest z-index
        const zIndex = sources.length - index;
        // Get custom widths and positions for this source
        const collapsedWidth = collapsedWidths[index] || 140;
        const expandedWidth = expandedWidths[index] || 284;
        const logoLeftPosition = logoPositions[index] || 110;
        
        return (
          <div
            key={source.id}
            style={{
              position: 'absolute',
              left: 0, // ALL items share the SAME left edge
              top: 0,
              zIndex, // Reversed stacking order
            }}
          >
            <GlassSourceItem
              logo={source.logo}
              logoAlt={source.name}
              percentage={source.percentage}
              backgroundColor={source.color}
              isExpanded={isHovered}
              index={index}
              expandDirection="right"
              expandedWidth={expandedWidth}
              collapsedWidth={collapsedWidth}
              logoLeftPosition={logoLeftPosition}
              onClick={() => onSourceClick?.(source)}
            />
          </div>
        );
      })}
    </div>
  );
}