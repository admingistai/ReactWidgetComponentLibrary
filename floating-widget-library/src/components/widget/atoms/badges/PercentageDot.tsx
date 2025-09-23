import React from 'react';

interface PercentageDotProps {
  color?: string;
  size?: number;
}

export const PercentageDot: React.FC<PercentageDotProps> = ({
  color = '#BB61EF',
  size = 8
}) => {
  return (
    <div
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
    />
  );
};

export default PercentageDot;