import React from 'react';

interface ProgressBarProps {
  progress?: number; // 0 to 100
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 60,
  className = ''
}) => {
  return (
    <div
      className={`w-full h-1 bg-gray-700 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C081FF 0%, #B8FFE3 100%)',
        }}
      />
    </div>
  );
};

export default ProgressBar;