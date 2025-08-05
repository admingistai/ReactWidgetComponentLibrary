import * as React from "react";
import { motion, type HTMLMotionProps, type TargetAndTransition } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
  label: string;
  showTooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipDelayDuration?: number;
  animate?: boolean;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  transition?: HTMLMotionProps<"button">["transition"];
  iconClassName?: string;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      showTooltip = true,
      tooltipSide = "bottom",
      tooltipDelayDuration = 200,
      animate = true,
      whileHover,
      whileTap,
      transition,
      className,
      iconClassName,
      size = "default",
      variant = "ghost",
      isLoading = false,
      loadingIcon,
      disabled,
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
        ? whileHover || { scale: 1.1 }
        : undefined;

    const defaultWhileTap: TargetAndTransition | undefined =
      animate && !isDisabled
        ? whileTap || { scale: 0.9 }
        : undefined;

    // Size-based icon dimensions
    const iconSizeClasses = {
      default: "h-4 w-4",
      sm: "h-3.5 w-3.5",
      lg: "h-5 w-5",
      icon: "h-4 w-4",
    };

    // Default loading icon
    const defaultLoadingIcon = (
      <svg
        className={cn(
          "animate-spin",
          iconSizeClasses[size || "default"],
          iconClassName
        )}
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
    );

    const buttonContent = (
      <span className={cn(iconSizeClasses[size || "default"], iconClassName)}>
        {isLoading ? (loadingIcon || defaultLoadingIcon) : icon}
      </span>
    );

    const buttonElement = animate ? (
      <motion.div
        whileHover={defaultWhileHover}
        whileTap={defaultWhileTap}
        transition={transition || defaultTransition}
        className="inline-flex"
      >
        <Button
          ref={ref}
          size={size === "icon" ? "icon" : size}
          variant={variant}
          className={cn(
            size !== "icon" && "p-2",
            className
          )}
          disabled={isDisabled}
          aria-label={label}
          {...props}
        >
          {buttonContent}
        </Button>
      </motion.div>
    ) : (
      <Button
        ref={ref}
        size={size === "icon" ? "icon" : size}
        variant={variant}
        className={cn(
          size !== "icon" && "p-2",
          className
        )}
        disabled={isDisabled}
        aria-label={label}
        {...props}
      >
        {buttonContent}
      </Button>
    );

    if (!showTooltip) {
      return buttonElement;
    }

    return (
      <TooltipProvider delayDuration={tooltipDelayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };