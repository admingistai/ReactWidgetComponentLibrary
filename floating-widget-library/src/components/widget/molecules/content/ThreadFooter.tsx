import React from 'react';
import { PoweredByButton } from '../buttons/PoweredByButton';

interface ThreadFooterProps {
  className?: string;
  onPoweredByClick?: () => void;
}

export const ThreadFooter: React.FC<ThreadFooterProps> = ({
  className = '',
  onPoweredByClick
}) => {
  return (
    <div className={`text-center space-y-3 ${className}`}>
      <div className="text-white text-lg font-light">Ask Anything</div>
      <div className="flex justify-center">
        <PoweredByButton
          onClick={onPoweredByClick}
          className="scale-90"
        />
      </div>
    </div>
  );
};

export default ThreadFooter;