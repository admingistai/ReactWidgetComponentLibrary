/**
 * ExpandButton - Molecular component for expand/collapse functionality
 * Pure component - toggles between open and close icons based on state
 * Following "Thinking in React" - no internal state, only props
 */

import buttonOpenIcon from '@/assets/icons/open/close button/buttonopen.png';
import buttonCloseIcon from '@/assets/icons/open/close button/buttonclose.png';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function ExpandButton({
  isExpanded,
  onClick,
  className = '',
  disabled = false,
  ariaLabel
}: ExpandButtonProps) {
  // Select the appropriate icon based on expanded state
  const iconSrc = isExpanded ? buttonCloseIcon : buttonOpenIcon;
  const defaultAriaLabel = isExpanded ? 'Collapse content' : 'Expand content';
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || defaultAriaLabel}
      aria-expanded={isExpanded}
      style={{
        width: '48px',
        height: '48px',
        padding: '0px',
        background: 'transparent',
        border: 'none',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        opacity: disabled ? 0.5 : 1,
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
      <img
        src={iconSrc}
        alt={isExpanded ? 'Close' : 'Open'}
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
        loading="eager"
        draggable={false}
      />
    </button>
  );
}