/**
 * PoweredByFooter - Organism for footer with powered by button
 * Now uses PoweredByButton molecule for better component architecture
 */

import { PoweredByButton } from '../molecules';

interface PoweredByFooterProps {
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function PoweredByFooter({ 
  className = '',
  onClick,
  href
}: PoweredByFooterProps) {
  return (
    <PoweredByButton 
      className={className}
      onClick={onClick}
      href={href}
    />
  );
}