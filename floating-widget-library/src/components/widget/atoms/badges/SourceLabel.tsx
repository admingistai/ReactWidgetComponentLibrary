import React from 'react';

interface SourceLabelProps {
  text: string;
  className?: string;
}

export const SourceLabel: React.FC<SourceLabelProps> = ({
  text,
  className = ''
}) => {
  return (
    <div
      className={`text-white font-semibold ${className}`}
      style={{
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        lineHeight: '12px',
        wordWrap: 'break-word' as const,
      }}
    >
      {text}
    </div>
  );
};

export default SourceLabel;