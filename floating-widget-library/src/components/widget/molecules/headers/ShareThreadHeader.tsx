import React from 'react';
import { CloseIcon } from '../../atoms/icons/CloseIcon';

interface ShareThreadHeaderProps {
  onClose?: () => void;
  className?: string;
}

export const ShareThreadHeader: React.FC<ShareThreadHeaderProps> = ({
  onClose,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <h2 className="text-lg font-medium text-white">Share Thread</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
        aria-label="Close"
      >
        <CloseIcon size={20} />
      </button>
    </div>
  );
};

export default ShareThreadHeader;