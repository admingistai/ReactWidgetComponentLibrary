import React from 'react';

interface IconButtonWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
}

/**
 * IconButtonWrapper - Atom component for wrapping SVG icons as buttons
 * Styled like ExpandButton with circular border and transparent background
 */
export const IconButtonWrapper: React.FC<IconButtonWrapperProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  ariaLabel,
  title
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      style={{
        width: '48px',
        height: '48px',
        padding: '0px',
        background: 'transparent',
        border: '2px solid #4A4A4A',
        borderRadius: '50%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        color: '#7A7A7A',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
    </button>
  );
};

export default IconButtonWrapper;