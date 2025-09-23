import React from 'react';
import { NewsCardHeader } from '../../molecules/headers/NewsCardHeader';
import { ArticleTitle } from '../../atoms/typography/ArticleTitle';

export type ColorwayTheme = 'purple' | 'pink' | 'blue' | 'custom';

interface NewsArticleCardProps {
  logoSrc?: string;
  sourceName?: string;
  percentage?: string;
  articleTitle: string;
  backgroundImage?: string;
  className?: string;
  onClick?: () => void;
  colorway?: ColorwayTheme;
  customColors?: {
    backgroundGradient?: string;
    backgroundSolid?: string;
    headerGradient?: {
      start: string;
      end: string;
    };
    percentageDot?: string;
  };
}

const colorThemes = {
  purple: {
    backgroundGradient: 'linear-gradient(240deg, rgba(65, 0, 102, 0) 0%, #410066 100%)',
    headerGradient: { start: '#BB61EF', end: '#6700A2' },
    percentageDot: '#BB61EF'
  },
  pink: {
    backgroundGradient: 'linear-gradient(240deg, rgba(61, 50, 159, 0) 0%, #3D329F 100%)',
    backgroundSolid: '#692631',
    headerGradient: { start: '#6F61EF', end: '#403889' },
    percentageDot: '#6F61EF'
  },
  blue: {
    backgroundGradient: 'linear-gradient(240deg, rgba(61, 50, 159, 0) 0%, #3D329F 100%)',
    headerGradient: { start: '#6F61EF', end: '#403889' },
    percentageDot: '#6F61EF'
  }
};

export const NewsArticleCard: React.FC<NewsArticleCardProps> = ({
  logoSrc = '/nytlogo.png',
  sourceName = 'The New York Times',
  percentage = '24%',
  articleTitle,
  backgroundImage,
  className = '',
  onClick,
  colorway = 'purple',
  customColors
}) => {
  // Select theme colors
  const theme = colorway === 'custom' ? customColors : colorThemes[colorway];
  const backgroundStyle = theme?.backgroundSolid || theme?.backgroundGradient || colorThemes.purple.backgroundGradient;
  const headerGradient = theme?.headerGradient || colorThemes.purple.headerGradient;
  const percentageDot = theme?.percentageDot || colorThemes.purple.percentageDot;

  return (
    <div
      className={`rounded-[10px] flex flex-col cursor-pointer transition-transform hover:scale-105 ${className}`}
      style={{
        width: '255px',
        minHeight: '102px',
        background: backgroundImage
          ? `${backgroundStyle}, url(${backgroundImage})`
          : backgroundStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onClick}
    >
      <NewsCardHeader
        logoSrc={logoSrc}
        sourceName={sourceName}
        percentage={percentage}
        gradientColors={headerGradient}
        percentageDotColor={percentageDot}
      />

      <div
        className="flex-1 flex flex-col"
        style={{
          padding: '12px',
        }}
      >
        <ArticleTitle
          text={articleTitle}
          maxLines={3}
        />
      </div>
    </div>
  );
};

export default NewsArticleCard;