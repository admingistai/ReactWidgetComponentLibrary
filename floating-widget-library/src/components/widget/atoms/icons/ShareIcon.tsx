import React from 'react';

interface ShareIconProps {
  className?: string;
  size?: number;
}

export const ShareIcon: React.FC<ShareIconProps> = ({
  className = '',
  size = 20
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8.5C19.6569 8.5 21 7.15685 21 5.5C21 3.84315 19.6569 2.5 18 2.5C16.3431 2.5 15 3.84315 15 5.5C15 5.74127 15.0281 5.97596 15.0811 6.20096L8.91902 9.28202C8.40539 8.79767 7.73566 8.5 7 8.5C5.34315 8.5 4 9.84315 4 11.5C4 13.1569 5.34315 14.5 7 14.5C7.73566 14.5 8.40539 14.2023 8.91902 13.718L15.0811 16.799C15.0281 17.024 15 17.2587 15 17.5C15 19.1569 16.3431 20.5 18 20.5C19.6569 20.5 21 19.1569 21 17.5C21 15.8431 19.6569 14.5 18 14.5C17.2644 14.5 16.5947 14.7977 16.081 15.282L9.91902 12.201C9.97195 11.976 10 11.7413 10 11.5C10 11.2587 9.97195 11.024 9.91902 10.799L16.081 7.71798C16.5947 8.20233 17.2644 8.5 18 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShareIcon;