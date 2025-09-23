import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShareThreadHeader } from '../../molecules/headers/ShareThreadHeader';
import { ProgressBar } from '../../atoms/ui/ProgressBar';
import { ShareThreadCard } from '../cards/ShareThreadCard';
import { ShareThreadImageView } from '../../molecules/share/ShareThreadImageView';
import { ShareCustomizationPanel } from '../../molecules/share/ShareCustomizationPanel';
import { SharePlatformBar } from '../../molecules/share/SharePlatformBar';
import { StackedSources, type SourceData } from '../StackedSources';
import { PoweredByButton } from '../../molecules/buttons/PoweredByButton';
import { MoreButton } from '../../molecules/buttons/MoreButton';
import { SuggestionsList } from '../SuggestionsList';

interface ShareThreadExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
  backgroundImage?: string;
  question: string;
  answer: string;
  className?: string;
  onPoweredByClick?: () => void;
}

/**
 * ShareThreadExperience - Enhanced share modal with dual views and customization
 * Combines image view, card view, customization panel, and social sharing
 */
export const ShareThreadExperience: React.FC<ShareThreadExperienceProps> = ({
  isOpen,
  onClose,
  profileImage,
  backgroundImage,
  question,
  answer,
  className = '',
  onPoweredByClick
}) => {
  const [viewMode, setViewMode] = useState<'image' | 'card'>('image');
  const [progress, setProgress] = useState(0);
  const [aiPrompt, setAiPrompt] = useState('');
  const [customSettings, setCustomSettings] = useState({
    borderColor: '#C081FF',
    showBorder: true,
    selectedQuote: answer,
    backgroundImage: backgroundImage || profileImage,
  });
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Different progress for each view
      const targetProgress = viewMode === 'image' ? 30 : 70;
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(interval);
            return targetProgress;
          }
          return prev + 2;
        });
      }, 50);

      // Scroll to first card when modal opens
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isOpen, viewMode]);

  const handleAiPromptSubmit = () => {
    // Handle AI prompt submission
    console.log('AI Prompt:', aiPrompt);
    // Here you would integrate with AI service
    setAiPrompt('');
  };

  const handleAddQuote = () => {
    console.log('Add quote from article');
    // Implementation for adding quote
  };

  const handleChangeBorder = () => {
    console.log('Change border color');
    // Cycle through border colors
    const colors = ['#C081FF', '#FF6B6B', '#4ECDC4', '#FFD93D'];
    const currentIndex = colors.indexOf(customSettings.borderColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCustomSettings(prev => ({ ...prev, borderColor: colors[nextIndex] }));
  };

  const handleRemoveBorder = () => {
    console.log('Remove border');
    setCustomSettings(prev => ({ ...prev, showBorder: !prev.showBorder }));
  };

  const handleCopyUrl = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    console.log('URL copied to clipboard');
  };

  const handleWhatsApp = () => {
    const text = `${question}\n\n${answer}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleInstagram = () => {
    console.log('Share to Instagram');
    // Instagram doesn't have a direct share API for web
    alert('To share on Instagram, take a screenshot and post it to your story!');
  };

  const handleMore = () => {
    console.log('More options');
    // Show more sharing options
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md z-[9998]"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative rounded-3xl shadow-2xl flex flex-col z-[9999] ${className}`}
        style={{
          background: '#1C1C1C',
          width: '380px',
          height: '680px',
        }}
      >
        {/* Header - Fixed */}
        <ShareThreadHeader onClose={onClose} />

        {/* Progress Bar - Fixed */}
        <div className="px-6 pb-2">
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex-1">
                <ProgressBar
                  progress={currentCard === index ? 100 : 30}
                  className="h-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-hidden flex items-start justify-center" style={{ paddingTop: '8px' }}>
          {/* Horizontal Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft;
              const cardWidth = 277;
              const gap = 20;
              const newIndex = Math.round(scrollLeft / (cardWidth + gap));
              setCurrentCard(newIndex);
            }}
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-5 h-full items-center w-max" style={{ minHeight: '380px', padding: '16px 0' }}>
              {/* Spacer for first card centering */}
              <div style={{ minWidth: '62.5px' }} />

              {/* Card 1 */}
              <div className="flex-shrink-0 snap-center transition-all duration-300">
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    width: currentCard === 0 ? '277px' : '250px',
                    height: currentCard === 0 ? '350px' : '320px',
                    background: 'linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)',
                    padding: '2px',
                    opacity: currentCard === 0 ? 1 : 0.7,
                    transform: currentCard === 0 ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden bg-[#2A2A2A]"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1580128660010-fd027e1e587a?w=800')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-4">
                      {/* Top Spacer */}
                      <div style={{ height: '180px' }}></div>

                      {/* Question Section */}
                      <div className="flex justify-center mb-auto">
                        <button
                          className="flex items-center"
                          style={{
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: 'rgba(42, 42, 42, 0.85)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '41px',
                            border: '1px solid rgba(192, 129, 255, 0.3)',
                            gap: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          {/* Sparkle Icon */}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                              fill="url(#gradient-sparkle1)"/>
                            <defs>
                              <linearGradient id="gradient-sparkle1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#B8FFE3" />
                                <stop offset="100%" stopColor="#C081FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span
                            style={{
                              color: 'white',
                              fontSize: '14px',
                              fontFamily: 'Work Sans, sans-serif',
                              fontWeight: 400,
                              lineHeight: '20px'
                            }}
                          >
                            What did Trump say?
                          </span>
                        </button>
                      </div>

                      {/* Bottom Section - Footer */}
                      <div className="mt-auto">
                        {/* Stacked Sources */}
                        <div className="flex justify-center" style={{ marginBottom: '3px' }}>
                          <div className="scale-75 origin-center">
                            <StackedSources
                            sources={[
                              {
                                id: '1',
                                logo: '📰',
                                name: 'NYT',
                                percentage: '34%',
                                color: '#6E5FBC'
                              },
                              {
                                id: '2',
                                logo: '📧',
                                name: 'Daily Mail',
                                percentage: '25%',
                                color: '#594495'
                              },
                              {
                                id: '3',
                                logo: '📊',
                                name: 'AW',
                                percentage: '10%',
                                color: '#603C75'
                              },
                              {
                                id: '4',
                                logo: '...',
                                name: 'More',
                                percentage: '10%',
                                color: '#333333'
                              }
                            ] as SourceData[]}
                            />
                          </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-center space-y-1">
                        <div
                          className="text-white"
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Work Sans, sans-serif',
                            fontWeight: 400,
                            lineHeight: '24px',
                            wordWrap: 'break-word'
                          }}
                        >
                          Ask Anything
                        </div>
                        <div className="flex justify-center">
                          <PoweredByButton
                            onClick={onPoweredByClick}
                            className="scale-90"
                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-shrink-0 snap-center transition-all duration-300">
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    width: currentCard === 1 ? '277px' : '250px',
                    height: currentCard === 1 ? '350px' : '320px',
                    background: 'linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)',
                    padding: '2px',
                    opacity: currentCard === 1 ? 1 : 0.7,
                    transform: currentCard === 1 ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden bg-[#2A2A2A]"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1565176030536-2b581d2d2793?w=800')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-4">
                      {/* Top Spacer */}
                      <div style={{ height: '180px' }}></div>

                      {/* Question Section */}
                      <div className="flex justify-center mb-auto">
                        <button
                          className="flex items-center"
                          style={{
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: 'rgba(42, 42, 42, 0.85)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '41px',
                            border: '1px solid rgba(192, 129, 255, 0.3)',
                            gap: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          {/* Sparkle Icon */}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                              fill="url(#gradient-sparkle2)"/>
                            <defs>
                              <linearGradient id="gradient-sparkle2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#B8FFE3" />
                                <stop offset="100%" stopColor="#C081FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span
                            style={{
                              color: 'white',
                              fontSize: '14px',
                              fontFamily: 'Work Sans, sans-serif',
                              fontWeight: 400,
                              lineHeight: '20px'
                            }}
                          >
                            Latest Policy Updates
                          </span>
                        </button>
                      </div>

                      {/* Bottom Section - Footer */}
                      <div className="mt-auto">
                        {/* Stacked Sources */}
                        <div className="flex justify-center" style={{ marginBottom: '3px' }}>
                          <div className="scale-75 origin-center">
                            <StackedSources
                            sources={[
                              {
                                id: '1',
                                logo: '📺',
                                name: 'CNN',
                                percentage: '40%',
                                color: '#6E5FBC'
                              },
                              {
                                id: '2',
                                logo: '🎙️',
                                name: 'BBC',
                                percentage: '30%',
                                color: '#594495'
                              },
                              {
                                id: '3',
                                logo: '🦊',
                                name: 'Fox',
                                percentage: '20%',
                                color: '#603C75'
                              },
                              {
                                id: '4',
                                logo: '...',
                                name: 'More',
                                percentage: '10%',
                                color: '#333333'
                              }
                            ] as SourceData[]}
                            />
                          </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-center space-y-1">
                        <div
                          className="text-white"
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Work Sans, sans-serif',
                            fontWeight: 400,
                            lineHeight: '24px',
                            wordWrap: 'break-word'
                          }}
                        >
                          Ask Anything
                        </div>
                        <div className="flex justify-center">
                          <PoweredByButton
                            onClick={onPoweredByClick}
                            className="scale-90"
                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex-shrink-0 snap-center transition-all duration-300">
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    width: currentCard === 2 ? '277px' : '250px',
                    height: currentCard === 2 ? '350px' : '320px',
                    background: 'linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)',
                    padding: '2px',
                    opacity: currentCard === 2 ? 1 : 0.7,
                    transform: currentCard === 2 ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden bg-[#2A2A2A]"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-4">
                      {/* Top Spacer */}
                      <div style={{ height: '180px' }}></div>

                      {/* Question Section */}
                      <div className="flex justify-center mb-auto">
                        <button
                          className="flex items-center"
                          style={{
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: 'rgba(42, 42, 42, 0.85)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '41px',
                            border: '1px solid rgba(192, 129, 255, 0.3)',
                            gap: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          {/* Sparkle Icon */}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                              fill="url(#gradient-sparkle3)"/>
                            <defs>
                              <linearGradient id="gradient-sparkle3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#B8FFE3" />
                                <stop offset="100%" stopColor="#C081FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span
                            style={{
                              color: 'white',
                              fontSize: '14px',
                              fontFamily: 'Work Sans, sans-serif',
                              fontWeight: 400,
                              lineHeight: '20px'
                            }}
                          >
                            Economic Forecast
                          </span>
                        </button>
                      </div>

                      {/* Bottom Section - Footer */}
                      <div className="mt-auto">
                        {/* Stacked Sources */}
                        <div className="flex justify-center" style={{ marginBottom: '3px' }}>
                          <div className="scale-75 origin-center">
                            <StackedSources
                            sources={[
                              {
                                id: '1',
                                logo: '💼',
                                name: 'WSJ',
                                percentage: '45%',
                                color: '#6E5FBC'
                              },
                              {
                                id: '2',
                                logo: '💰',
                                name: 'FT',
                                percentage: '25%',
                                color: '#594495'
                              },
                              {
                                id: '3',
                                logo: '🌐',
                                name: 'Reuters',
                                percentage: '20%',
                                color: '#603C75'
                              },
                              {
                                id: '4',
                                logo: '...',
                                name: 'More',
                                percentage: '10%',
                                color: '#333333'
                              }
                            ] as SourceData[]}
                            />
                          </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-center space-y-1">
                        <div
                          className="text-white"
                          style={{
                            fontSize: '18px',
                            fontFamily: 'Work Sans, sans-serif',
                            fontWeight: 400,
                            lineHeight: '24px',
                            wordWrap: 'break-word'
                          }}
                        >
                          Ask Anything
                        </div>
                        <div className="flex justify-center">
                          <PoweredByButton
                            onClick={onPoweredByClick}
                            className="scale-90"
                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer for last card centering - needs extra space for scrolling */}
              <div style={{ minWidth: '500px' }} />
            </div>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="flex justify-center px-6 pb-4" style={{ marginTop: '16px' }}>
          <div
            style={{
              width: '195px',
              height: '152px',
              padding: '8px',
              background: '#1D1D1D',
              boxShadow: '0px 6px 20.4px rgba(0, 0, 0, 0.80)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* AI Prompt Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                background: '#333333',
                borderRadius: '20px',
                width: '100%',
                height: '22px',
                flexShrink: 0
              }}
            >
              {/* Sparkle Icon Container */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '18px',
                  background: 'rgba(255, 255, 255, 0.10)',
                  padding: '1.5px',
                  flexShrink: 0
                }}
              >
                <svg width="7" height="7" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0L4.89806 2.76393H7.80423L5.45308 4.47214L6.35114 7.23607L4 5.52786L1.64886 7.23607L2.54692 4.47214L0.195774 2.76393H3.10194L4 0Z" fill="white"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Say, change the picture"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#C081FF',
                  fontSize: '10px',
                  fontFamily: 'Work Sans, sans-serif',
                  fontWeight: 400,
                  lineHeight: '12px',
                  width: '100%',
                  minWidth: 0
                }}
                className="placeholder:text-gray-500"
              />
            </div>

            {/* Customization Suggestions */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'scale(0.7)',
                transformOrigin: 'center',
                overflow: 'hidden'
              }}
            >
              <SuggestionsList
                suggestions={[
                  "Add quote from article",
                  "Change border color",
                  "Remove border"
                ]}
                onSuggestionClick={(text) => {
                  if (text === "Add quote from article") handleAddQuote();
                  else if (text === "Change border color") handleChangeBorder();
                  else if (text === "Remove border") handleRemoveBorder();
                }}
                showIcon={false}
              />
            </div>

            {/* More Button */}
            <div style={{ display: 'flex', justifyContent: 'center', transform: 'scale(0.65)', transformOrigin: 'center' }}>
              <MoreButton onClick={handleMore} />
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex justify-center gap-4 pb-6">
          <button
            onClick={handleCopyUrl}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="white"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">Copy url</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347z"/>
                <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2ZM12 17.5C9 17.5 6.5 15 6.5 12C6.5 9 9 6.5 12 6.5C15 6.5 17.5 9 17.5 12C17.5 15 15 17.5 12 17.5Z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">WhatsApp</span>
          </button>

          <button
            onClick={handleInstagram}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">Direct</span>
          </button>

          <button
            onClick={handleMore}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <circle cx="5" cy="12" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="19" cy="12" r="2"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">More</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ShareThreadExperience;
