export const WIDGET_STATES = {
  MINIMIZED: 'minimized',
  EXPANDED: 'expanded',
  FLOATING: 'floating',
  DOCKED: 'docked',
  HIDDEN: 'hidden',
} as const;

export type WidgetState = (typeof WIDGET_STATES)[keyof typeof WIDGET_STATES];

export const WIDGET_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  CENTER: 'center',
} as const;

export type WidgetPosition = (typeof WIDGET_POSITIONS)[keyof typeof WIDGET_POSITIONS];

export const WIDGET_TRANSITIONS = {
  EASE_IN_OUT: 'ease-in-out',
  SPRING: 'spring',
  LINEAR: 'linear',
  BOUNCE: 'bounce',
} as const;

export type WidgetTransition = (typeof WIDGET_TRANSITIONS)[keyof typeof WIDGET_TRANSITIONS];

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const WIDGET_SIZES = {
  SMALL: {
    width: 320,
    height: 480,
  },
  MEDIUM: {
    width: 400,
    height: 600,
  },
  LARGE: {
    width: 480,
    height: 720,
  },
  FULL: {
    width: '100%',
    height: '100%',
  },
} as const;

export type WidgetSize = keyof typeof WIDGET_SIZES;

export const Z_INDEX = {
  BASE: 1000,
  OVERLAY: 1100,
  MODAL: 1200,
  TOOLTIP: 1300,
  NOTIFICATION: 1400,
} as const;