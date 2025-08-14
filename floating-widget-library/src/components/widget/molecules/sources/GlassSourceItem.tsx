/**
 * GlassSourceItem - Individual source pill with glass morphism effect
 * Displays a logo in a circle that expands to show percentage on hover
 * Pure component with no internal state
 */

import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface GlassSourceItemProps {
  logo: string | ReactNode;
  logoAlt?: string;
  percentage?: string;
  isExpanded: boolean;
  index: number;
  backgroundColor: string;
  width: number; // Direct width value instead of expanded/collapsed widths
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function GlassSourceItem({
  logo,
  logoAlt,
  percentage,
  isExpanded,
  index: _index,
  backgroundColor,
  width,
  onClick,
  className = '',
  style = {}
}: GlassSourceItemProps) {
  // Determine if logo is an image URL or React component/text
  const isImageUrl = typeof logo === 'string' && (logo.includes('/') || logo.includes('.'));
  
  return (
    <motion.button
      className={`glass-source-item ${className}`}
      style={{
        ...style,
        backgroundColor,
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        height: 40, // Always 40px height
        borderRadius: 20, // Always pill-shaped
      }}
      animate={{
        width: width,
      }}
      transition={{ 
        duration: 0.3, 
        ease: 'easeOut',
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      onClick={onClick}
      aria-label={logoAlt || 'Source'}
    >
      {/* Glass morphism overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      />
      
      {/* Border effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Logo - 8px from right when collapsed, 4px left of percentage when expanded */}
      <div 
        className="logo-container"
        style={{
          position: 'absolute',
          left: 'auto',
          // In collapsed: 8px from right edge
          // In expanded: 42px from right (11px + ~27px percentage width + 4px gap)
          right: isExpanded ? '42px' : '8px',
          top: '50%',
          transform: 'translateY(-50%)', // Center vertically
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {isImageUrl ? (
          <img 
            src={logo as string} 
            alt={logoAlt || 'Source logo'} 
            style={{ 
              width: '22px', 
              height: '22px',
              objectFit: 'contain' 
            }}
          />
        ) : (
          <span>{logo}</span>
        )}
      </div>
      
      {/* Percentage - 11px from right when expanded */}
      {percentage && (
        <motion.span 
          className="percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ 
            opacity: { delay: isExpanded ? 0.15 : 0, duration: 0.2 }
          }}
          style={{
            position: 'absolute',
            right: '11px', // 11px from right edge
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
          }}
        >
          {percentage}
        </motion.span>
      )}
    </motion.button>
  );
}