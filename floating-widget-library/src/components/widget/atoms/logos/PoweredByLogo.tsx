/**
 * PoweredByLogo - Pure presentational component
 * GistAnswers logo for "Powered by" footer
 */

import { tokens } from '@/lib/design-tokens';
import gistAnswersLogo from '@/assets/icons/logo_GistAnswers 1.png';

interface PoweredByLogoProps {
  className?: string;
}

export function PoweredByLogo({ className = '' }: PoweredByLogoProps) {
  const { width, height } = tokens.dimensions.poweredBy.logo;
  
  return (
    <div 
      className={className}
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={gistAnswersLogo}
        alt="GistAnswers"
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain'
        }}
        loading="eager"
        draggable={false}
      />
    </div>
  );
}