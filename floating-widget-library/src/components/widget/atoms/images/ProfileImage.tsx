import React from 'react';

interface ProfileImageProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = 'Profile',
  size = 80,
  className = ''
}) => {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)',
          padding: '2px',
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;