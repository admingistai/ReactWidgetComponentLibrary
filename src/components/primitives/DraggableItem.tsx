import * as React from "react";
import {
  motion,
  useDragControls,
  Reorder,
} from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DraggableItemProps {
  children: React.ReactNode;
  className?: string;
  handleClassName?: string;
  showHandle?: boolean;
  handlePosition?: "left" | "right";
  disabled?: boolean;
  axis?: "x" | "y" | false;
  dragConstraints?: React.RefObject<Element> | {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  dragElastic?: boolean | number;
  dragMomentum?: boolean;
  dragTransition?: {
    bounceStiffness?: number;
    bounceDamping?: number;
    power?: number;
    timeConstant?: number;
    restDelta?: number;
    restSpeed?: number;
  };
  snapToGrid?: boolean;
  gridSize?: number;
  onDragStart?: (event: any, info: any) => void;
  onDrag?: (event: any, info: any) => void;
  onDragEnd?: (event: any, info: any) => void;
  whileDrag?: any;
  customHandle?: React.ReactNode;
}

const DraggableItem = React.forwardRef<HTMLDivElement, DraggableItemProps>(
  (
    {
      children,
      className,
      handleClassName,
      showHandle = true,
      handlePosition = "left",
      disabled = false,
      dragConstraints,
      dragElastic = 0.2,
      dragMomentum = true,
      dragTransition,
      snapToGrid = false,
      onDragStart,
      onDrag,
      onDragEnd,
      whileDrag,
      customHandle,
    },
    ref
  ) => {
    const dragControls = useDragControls();
    const [isDragging, setIsDragging] = React.useState(false);

    // Handle drag start
    const handleDragStart = (event: any, info: any) => {
      setIsDragging(true);
      onDragStart?.(event, info);
    };

    // Handle drag end with optional snap to grid
    const handleDragEnd = (event: any, info: any) => {
      setIsDragging(false);
      
      if (snapToGrid && info.point) {
        // Snap to grid calculation for future implementation
        // const snappedPoint = {
        //   x: Math.round(info.point.x / gridSize) * gridSize,
        //   y: Math.round(info.point.y / gridSize) * gridSize,
        // };
      }
      
      onDragEnd?.(event, info);
    };

    // Start drag from handle
    const startDrag = (event: React.PointerEvent) => {
      if (!disabled) {
        dragControls.start(event);
      }
    };

    // Default drag handle
    const defaultHandle = (
      <div
        className={cn(
          "flex items-center justify-center cursor-move touch-none",
          "text-muted-foreground hover:text-foreground transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          handleClassName
        )}
        onPointerDown={startDrag}
      >
        <GripVertical className="h-4 w-4" />
      </div>
    );

    const handle = customHandle || defaultHandle;

    // Default whileDrag animation
    const defaultWhileDrag = whileDrag || {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      cursor: "grabbing",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex items-center",
          isDragging && "z-50",
          className
        )}
        drag={!disabled}
        dragControls={dragControls}
        dragListener={!showHandle}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        dragMomentum={dragMomentum}
        dragTransition={dragTransition}
        onDragStart={handleDragStart}
        onDrag={onDrag}
        onDragEnd={handleDragEnd}
        whileDrag={!disabled ? defaultWhileDrag : undefined}
        layout
        style={{
          touchAction: disabled ? "auto" : "none",
        }}
      >
        {showHandle && handlePosition === "left" && handle}
        
        <div className="flex-1">
          {children}
        </div>
        
        {showHandle && handlePosition === "right" && handle}
      </motion.div>
    );
  }
);

DraggableItem.displayName = "DraggableItem";

// Reorderable List Component
export interface ReorderableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  axis?: "x" | "y";
  showHandles?: boolean;
  handlePosition?: "left" | "right";
  disabled?: boolean;
}

export function ReorderableList<T>({
  items,
  onReorder,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  axis = "y",
  showHandles = true,
  handlePosition = "left",
  disabled = false,
}: ReorderableListProps<T>) {
  return (
    <Reorder.Group
      axis={axis}
      values={items}
      onReorder={onReorder}
      className={className}
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={keyExtractor(item, index)}
          value={item}
          className={cn(
            "relative",
            axis === "x" ? "inline-flex" : "block",
            itemClassName
          )}
          drag={!disabled}
          whileDrag={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className={cn("flex items-center w-full", axis === "x" ? "flex-row" : "flex-row")}>
            {showHandles && handlePosition === "left" && !disabled && (
              <div className="flex items-center justify-center cursor-move touch-none p-2 text-muted-foreground hover:text-foreground transition-colors">
                <GripVertical className="h-4 w-4" />
              </div>
            )}
            
            <div className="flex-1">
              {renderItem(item, index)}
            </div>
            
            {showHandles && handlePosition === "right" && !disabled && (
              <div className="flex items-center justify-center cursor-move touch-none p-2 text-muted-foreground hover:text-foreground transition-colors">
                <GripVertical className="h-4 w-4" />
              </div>
            )}
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export { DraggableItem };