import React from 'react';

interface ArticleTitleProps {
  text: string;
  className?: string;
  maxLines?: number;
}

export const ArticleTitle: React.FC<ArticleTitleProps> = ({
  text,
  className = '',
  maxLines = 3
}) => {
  return (
    <div
      className={`text-white font-semibold ${className}`}
      style={{
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        lineHeight: '16.8px',
        wordWrap: 'break-word' as const,
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </div>
  );
};

export default ArticleTitle;