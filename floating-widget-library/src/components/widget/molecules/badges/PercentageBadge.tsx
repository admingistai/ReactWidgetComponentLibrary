import React from 'react';
import { PercentageDot } from '../../atoms/badges/PercentageDot';

interface PercentageBadgeProps {
  percentage: string;
  className?: string;
  dotColor?: string;
}

export const PercentageBadge: React.FC<PercentageBadgeProps> = ({
  percentage,
  className = '',
  dotColor
}) => {
  return (
    <div
      className={`flex items-center gap-1 rounded-full backdrop-blur-[5px] ${className}`}
      style={{
        padding: '4px 6px',
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
      }}
    >
      <PercentageDot color={dotColor} />
      <div
        className="text-center"
        style={{
          color: 'rgba(255, 255, 255, 0.80)',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          lineHeight: '8px',
        }}
      >
        {percentage}
      </div>
    </div>
  );
};

export default PercentageBadge;