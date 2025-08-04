import * as React from "react";
import {
  motion,
  type HTMLMotionProps,
  type TargetAndTransition,
} from "framer-motion";
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Exclude React event handlers that conflict with Framer Motion
type ExcludedProps = 
  | "asChild" 
  | "onAnimationStart" 
  | "onAnimationEnd" 
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

// Create a simpler interface that doesn't conflict
export interface ButtonProps extends Omit<ShadcnButtonProps, ExcludedProps> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  transition?: HTMLMotionProps<"button">["transition"];
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      disabled,
      whileHover,
      whileTap,
      transition,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const defaultTransition = {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
    };

    const defaultWhileHover: TargetAndTransition | undefined =
      animate && !isDisabled
        ? whileHover
          ? { scale: 1.05, ...whileHover }
          : { scale: 1.05 }
        : whileHover;

    const defaultWhileTap: TargetAndTransition | undefined =
      animate && !isDisabled
        ? whileTap
          ? { scale: 0.95, ...whileTap }
          : { scale: 0.95 }
        : whileTap;

    if (!animate) {
      return (
        <ShadcnButton
          ref={ref}
          className={cn(fullWidth && "w-full", "relative", className)}
          disabled={isDisabled}
          variant={variant}
          size={size}
          {...props}
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
          {isLoading ? loadingText || children : children}
          {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
        </ShadcnButton>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          "relative",
          className
        )}
        disabled={isDisabled}
        whileHover={defaultWhileHover}
        whileTap={defaultWhileTap}
        transition={transition || defaultTransition}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !isLoading && (
          <span className="inline-flex">{leftIcon}</span>
        )}
        {isLoading ? loadingText || children : children}
        {rightIcon && !isLoading && (
          <span className="inline-flex">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
