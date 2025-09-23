import React from 'react';
import { SourceBadge } from '../badges/SourceBadge';
import { PercentageBadge } from '../badges/PercentageBadge';

interface NewsCardHeaderProps {
  logoSrc: string;
  sourceName: string;
  percentage: string;
  className?: string;
  gradientColors?: {
    start: string;
    end: string;
  };
  percentageDotColor?: string;
}

export const NewsCardHeader: React.FC<NewsCardHeaderProps> = ({
  logoSrc,
  sourceName,
  percentage,
  className = '',
  gradientColors = {
    start: '#BB61EF',
    end: '#6700A2'
  },
  percentageDotColor
}) => {
  return (
    <div
      className={`flex justify-between items-center rounded-t-[10px] ${className}`}
      style={{
        padding: '8px 8px 8px 12px',
        background: `linear-gradient(128deg, ${gradientColors.start} 0%, ${gradientColors.end} 100%)`,
      }}
    >
      <SourceBadge logoSrc={logoSrc} sourceName={sourceName} />
      <PercentageBadge percentage={percentage} dotColor={percentageDotColor} />
    </div>
  );
};

export default NewsCardHeader;