import React from 'react';
import { ProfileImage } from '../../atoms/images/ProfileImage';
import { PoweredByButton } from '../buttons/PoweredByButton';

interface ShareThreadImageViewProps {
  profileImage: string;
  backgroundImage?: string;
  question: string;
  answer: string;
  sources?: Array<{
    name: string;
    percentage: string;
    color?: string;
  }>;
  onPoweredByClick?: () => void;
  className?: string;
}

/**
 * ShareThreadImageView - Image overlay view for share thread experience
 * Shows full image with overlaid question and source badges
 */
export const ShareThreadImageView: React.FC<ShareThreadImageViewProps> = ({
  profileImage,
  backgroundImage,
  question,
  answer,
  sources = [
    { name: 'NYT', percentage: '34%', color: '#6E5FBC' },
    { name: 'Daily Mail', percentage: '25%', color: '#594495' },
    { name: 'AW', percentage: '10%', color: '#603C75' },
    { name: 'More', percentage: '10%', color: '#333333' }
  ],
  onPoweredByClick,
  className = ''
}) => {
  // Use profile image as background if no background provided
  const bgImage = backgroundImage || profileImage;

  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        width: '351px',
        height: '500px',
        background: '#2A2A2A',
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

      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top Section - Profile and Question */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="relative rounded-2xl p-4"
            style={{
              background: 'rgba(42, 42, 42, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <ProfileImage
                src={profileImage}
                alt="Profile"
                size={40}
                className="border-2 border-white/20"
              />
              <div className="text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <p className="text-white text-lg font-medium">
              {question}
            </p>
          </div>
        </div>

        {/* Source Badges */}
        <div className="flex gap-2 justify-center mb-4">
          {sources.map((source, index) => (
            <div
              key={index}
              className="px-3 py-1 rounded-full flex items-center gap-1"
              style={{
                background: source.color || '#333333',
              }}
            >
              <span className="text-white text-xs font-medium">{source.name}</span>
              <span className="text-white/80 text-xs">{source.percentage}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-3">
          <div className="text-white text-lg font-light">Ask Anything</div>
          <div className="flex justify-center">
            <PoweredByButton
              onClick={onPoweredByClick}
              className="scale-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareThreadImageView;