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
  expandDirection?: 'right' | 'center';
  expandedWidth?: number; // Custom expanded width for each source
  collapsedWidth?: number; // Custom collapsed width (default 40px)
  logoLeftPosition?: number; // Custom logo left position
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
  index,
  backgroundColor,
  expandDirection = 'right', // Default to right expansion
  expandedWidth = 140,
  collapsedWidth = 40,
  logoLeftPosition = 10,
  onClick,
  className = '',
  style = {}
}: GlassSourceItemProps) {
  // Determine if logo is an image URL or React component/text
  const isImageUrl = typeof logo === 'string' && (logo.includes('/') || logo.includes('.'));
  
  const isRightExpand = expandDirection === 'right';
  
  // Calculate scale factor for transform-based animation
  const scaleX = isExpanded ? 1 : collapsedWidth / expandedWidth;
  
  return (
    <motion.button
      className={`glass-source-item ${className}`}
      style={{
        ...style,
        backgroundColor,
        // zIndex handled by parent container now
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Always left-aligned content
        padding: 0,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        // Always render at expanded width
        width: expandedWidth,
        height: 40,
        borderRadius: 20, // Always pill-shaped
        // CRITICAL: Fixed transform origin for left-edge stability
        transformOrigin: 'left center',
      }}
      animate={{
        // Use transform for scaling instead of width animation
        scaleX: scaleX,
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
      
      {/* Logo - Adjusted position to account for scaling */}
      <motion.div 
        className="logo-container"
        style={{
          position: 'absolute',
          left: `${logoLeftPosition}px`, // Custom position for each source
          top: '50%',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        animate={{
          // Counter-scale the logo to maintain its position when parent scales
          transform: `translateY(-50%) scaleX(${1 / scaleX})`,
        }}
        transition={{ 
          duration: 0.3, 
          ease: 'easeOut',
          type: 'spring',
          stiffness: 300,
          damping: 25
        }}
      >
        {isImageUrl ? (
          <img 
            src={logo as string} 
            alt={logoAlt || 'Source logo'} 
            style={{ 
              width: '20px', 
              height: '20px',
              objectFit: 'contain' 
            }}
          />
        ) : (
          <span>{logo}</span>
        )}
      </motion.div>
      
      {/* Percentage - Always rendered but with opacity animation */}
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
            right: '15px',
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