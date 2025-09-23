import React from 'react';
import { SourceLabel } from '../../atoms/badges/SourceLabel';

interface SourceBadgeProps {
  logoSrc: string;
  sourceName: string;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  logoSrc,
  sourceName,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <img
        src={logoSrc}
        alt={sourceName}
        className="rounded-full"
        style={{
          width: '16px',
          height: '16px',
        }}
      />
      <SourceLabel text={sourceName} />
    </div>
  );
};

export default SourceBadge;