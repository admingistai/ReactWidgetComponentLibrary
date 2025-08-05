import * as React from "react";
import {
  WIDGET_STATES,
  WIDGET_POSITIONS,
  type WidgetState,
  type WidgetPosition,
} from "@/lib/constants";

export interface UseWidgetOptions {
  id: string;
  initialState?: WidgetState;
  initialPosition?: WidgetPosition;
  initialSize?: { width: number | string; height: number | string };
  persist?: boolean;
  onStateChange?: (state: WidgetState) => void;
  onPositionChange?: (position: WidgetPosition) => void;
  onSizeChange?: (size: { width: number | string; height: number | string }) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface UseWidgetReturn {
  state: WidgetState;
  position: WidgetPosition;
  size: { width: number | string; height: number | string };
  isMinimized: boolean;
  isExpanded: boolean;
  isFloating: boolean;
  isDocked: boolean;
  isHidden: boolean;
  setState: (state: WidgetState) => void;
  setPosition: (position: WidgetPosition) => void;
  setSize: (size: { width: number | string; height: number | string }) => void;
  toggleMinimize: () => void;
  toggleExpand: () => void;
  show: () => void;
  hide: () => void;
  dock: () => void;
  float: () => void;
  reset: () => void;
}

const STORAGE_PREFIX = "widget_";

export function useWidget({
  id,
  initialState = WIDGET_STATES.FLOATING,
  initialPosition = WIDGET_POSITIONS.BOTTOM_RIGHT,
  initialSize = { width: 400, height: 600 },
  persist = true,
  onStateChange,
  onPositionChange,
  onSizeChange,
  minWidth = 200,
  minHeight = 150,
  maxWidth = window.innerWidth - 40,
  maxHeight = window.innerHeight - 40,
}: UseWidgetOptions): UseWidgetReturn {
  // Load persisted state from localStorage
  const loadPersistedState = React.useCallback(() => {
    if (!persist) return null;
    
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load widget state:", error);
    }
    return null;
  }, [id, persist]);

  // Initialize state with persisted values or defaults
  const persisted = loadPersistedState();
  
  const [state, setStateInternal] = React.useState<WidgetState>(
    persisted?.state || initialState
  );
  
  const [position, setPositionInternal] = React.useState<WidgetPosition>(
    persisted?.position || initialPosition
  );
  
  const [size, setSizeInternal] = React.useState<{
    width: number | string;
    height: number | string;
  }>(persisted?.size || initialSize);

  // Previous state for restoration
  const [previousState, setPreviousState] = React.useState<WidgetState | null>(null);
  const [previousSize, setPreviousSize] = React.useState<typeof size | null>(null);

  // Persist state to localStorage
  const persistState = React.useCallback(() => {
    if (!persist) return;
    
    try {
      const data = { state, position, size };
      localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to persist widget state:", error);
    }
  }, [id, persist, state, position, size]);

  // Update persistence when state changes
  React.useEffect(() => {
    persistState();
  }, [persistState]);

  // State setters with callbacks
  const setState = React.useCallback(
    (newState: WidgetState) => {
      setStateInternal(newState);
      onStateChange?.(newState);
    },
    [onStateChange]
  );

  const setPosition = React.useCallback(
    (newPosition: WidgetPosition) => {
      setPositionInternal(newPosition);
      onPositionChange?.(newPosition);
    },
    [onPositionChange]
  );

  const setSize = React.useCallback(
    (newSize: { width: number | string; height: number | string }) => {
      // Apply constraints
      let constrainedSize = { ...newSize };
      
      if (typeof newSize.width === "number") {
        constrainedSize.width = Math.max(minWidth, Math.min(maxWidth, newSize.width));
      }
      
      if (typeof newSize.height === "number") {
        constrainedSize.height = Math.max(minHeight, Math.min(maxHeight, newSize.height));
      }
      
      setSizeInternal(constrainedSize);
      onSizeChange?.(constrainedSize);
    },
    [minWidth, minHeight, maxWidth, maxHeight, onSizeChange]
  );

  // Computed states
  const isMinimized = state === WIDGET_STATES.MINIMIZED;
  const isExpanded = state === WIDGET_STATES.EXPANDED;
  const isFloating = state === WIDGET_STATES.FLOATING;
  const isDocked = state === WIDGET_STATES.DOCKED;
  const isHidden = state === WIDGET_STATES.HIDDEN;

  // Actions
  const toggleMinimize = React.useCallback(() => {
    if (isMinimized) {
      setState(previousState || WIDGET_STATES.FLOATING);
      setPreviousState(null);
    } else {
      setPreviousState(state);
      setState(WIDGET_STATES.MINIMIZED);
    }
  }, [isMinimized, state, setState, previousState]);

  const toggleExpand = React.useCallback(() => {
    if (isExpanded) {
      setState(previousState || WIDGET_STATES.FLOATING);
      setSize(previousSize || initialSize);
      setPreviousState(null);
      setPreviousSize(null);
    } else {
      setPreviousState(state);
      setPreviousSize(size);
      setState(WIDGET_STATES.EXPANDED);
    }
  }, [isExpanded, state, size, setState, setSize, previousState, previousSize, initialSize]);

  const show = React.useCallback(() => {
    if (isHidden) {
      setState(previousState || WIDGET_STATES.FLOATING);
      setPreviousState(null);
    }
  }, [isHidden, setState, previousState]);

  const hide = React.useCallback(() => {
    if (!isHidden) {
      setPreviousState(state);
      setState(WIDGET_STATES.HIDDEN);
    }
  }, [isHidden, state, setState]);

  const dock = React.useCallback(() => {
    if (!isDocked) {
      setPreviousState(state);
      setState(WIDGET_STATES.DOCKED);
    }
  }, [isDocked, state, setState]);

  const float = React.useCallback(() => {
    setState(WIDGET_STATES.FLOATING);
  }, [setState]);

  const reset = React.useCallback(() => {
    setState(initialState);
    setPosition(initialPosition);
    setSize(initialSize);
    setPreviousState(null);
    setPreviousSize(null);
    
    // Clear persisted state
    if (persist) {
      try {
        localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
      } catch (error) {
        console.error("Failed to clear widget state:", error);
      }
    }
  }, [
    id,
    persist,
    initialState,
    initialPosition,
    initialSize,
    setState,
    setPosition,
    setSize,
  ]);

  return {
    state,
    position,
    size,
    isMinimized,
    isExpanded,
    isFloating,
    isDocked,
    isHidden,
    setState,
    setPosition,
    setSize,
    toggleMinimize,
    toggleExpand,
    show,
    hide,
    dock,
    float,
    reset,
  };
}