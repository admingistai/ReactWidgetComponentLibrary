import React from 'react';
import { ThreadQuestion } from '../../molecules/content/ThreadQuestion';
import { ThreadAnswer } from '../../molecules/content/ThreadAnswer';
import { ThreadFooter } from '../../molecules/content/ThreadFooter';

interface ShareThreadCardProps {
  profileImage: string;
  question: string;
  answer: string;
  className?: string;
  onPoweredByClick?: () => void;
}

export const ShareThreadCard: React.FC<ShareThreadCardProps> = ({
  profileImage,
  question,
  answer,
  className = '',
  onPoweredByClick
}) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: '#3A3A3A',
        width: '351px', // Total width including padding
      }}
    >
      {/* Purple gradient border effect */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          padding: '1.01px',
          background: 'linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-6"
        style={{
          paddingTop: '35.3px',
          paddingBottom: '35.3px',
          paddingLeft: '19.4px',
          paddingRight: '35.3px',
        }}>
        <ThreadQuestion
          profileImage={profileImage}
          question={question}
        />

        <ThreadAnswer answer={answer} />

        <div className="pt-4">
          <ThreadFooter onPoweredByClick={onPoweredByClick} />
        </div>
      </div>
    </div>
  );
};

export default ShareThreadCard;