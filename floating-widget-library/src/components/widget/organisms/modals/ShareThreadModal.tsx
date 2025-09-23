import React, { useEffect, useState } from 'react';
import { ShareThreadHeader } from '../../molecules/headers/ShareThreadHeader';
import { ProgressBar } from '../../atoms/ui/ProgressBar';
import { ShareThreadCard } from '../cards/ShareThreadCard';

interface ShareThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
  question: string;
  answer: string;
  className?: string;
  autoProgress?: boolean;
  onPoweredByClick?: () => void;
}

export const ShareThreadModal: React.FC<ShareThreadModalProps> = ({
  isOpen,
  onClose,
  profileImage,
  question,
  answer,
  className = '',
  autoProgress = true,
  onPoweredByClick
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && autoProgress) {
      // Simulate progress animation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isOpen, autoProgress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-gray-800 rounded-3xl shadow-2xl ${className}`}
        style={{
          width: 'fit-content',
          minWidth: '400px',
        }}
      >
        <ShareThreadHeader onClose={onClose} />

        <div className="px-4 pb-2">
          <ProgressBar progress={progress} />
        </div>

        <div className="p-6 pt-4">
          <ShareThreadCard
            profileImage={profileImage}
            question={question}
            answer={answer}
            onPoweredByClick={onPoweredByClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareThreadModal;