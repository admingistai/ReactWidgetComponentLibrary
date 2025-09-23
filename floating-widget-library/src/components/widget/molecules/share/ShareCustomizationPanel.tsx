import React from 'react';
import { MicIcon } from '../../atoms/icons/MicIcon';
import { PlusIcon } from '../../atoms/icons/PlusIcon';

interface ShareCustomizationPanelProps {
  aiPrompt: string;
  onAiPromptChange: (value: string) => void;
  onAiPromptSubmit: () => void;
  onAddQuote: () => void;
  onChangeBorder: () => void;
  onRemoveBorder: () => void;
  viewMode: 'image' | 'card';
  className?: string;
}

/**
 * ShareCustomizationPanel - AI-powered customization controls for share thread
 * Provides input for AI prompts and quick action buttons
 */
export const ShareCustomizationPanel: React.FC<ShareCustomizationPanelProps> = ({
  aiPrompt,
  onAiPromptChange,
  onAiPromptSubmit,
  onAddQuote,
  onChangeBorder,
  onRemoveBorder,
  viewMode,
  className = ''
}) => {
  const placeholderText = viewMode === 'image'
    ? '"Say, change the picture"'
    : '"Say, \'Use a different quote\'"';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* AI Prompt Input */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <MicIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => onAiPromptChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onAiPromptSubmit();
              }
            }}
            placeholder={placeholderText}
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 text-sm outline-none"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '8px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onAddQuote}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid transparent';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </div>
          <span className="text-sm">Add quote from article</span>
        </button>

        <button
          onClick={onChangeBorder}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid transparent';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </div>
          <span className="text-sm">Change border color</span>
        </button>

        <button
          onClick={onRemoveBorder}
          className="w-full flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid transparent';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </div>
          <span className="text-sm">Remove border</span>
        </button>
      </div>
    </div>
  );
};

export default ShareCustomizationPanel;