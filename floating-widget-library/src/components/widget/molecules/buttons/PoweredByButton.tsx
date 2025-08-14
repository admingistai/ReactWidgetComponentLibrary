/**
 * PoweredByButton - Molecular component for clickable "Powered by" button
 * Pure component - combines Text and PoweredByLogo atoms with click functionality
 * Following "Thinking in React" - reusable molecule with interaction behavior
 */

import { tokens } from '@/lib/design-tokens';
import { Text, PoweredByLogo } from '../../atoms';

interface PoweredByButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export function PoweredByButton({ 
  onClick,
  href = 'https://www.gistanswers.ai/',
  className = '',
  disabled = false
}: PoweredByButtonProps) {
  const handleClick = () => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: tokens.spacing.md,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        background: 'transparent',
        border: 'none',
        padding: '0',
        font: 'inherit'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      <Text variant="powered">Powered by</Text>
      <PoweredByLogo />
    </button>
  );
}