import * as React from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ANIMATION_DURATION } from "@/lib/constants";

export interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  animate?: boolean;
  animateOnHover?: boolean;
  animateOnMount?: boolean;
  exitAnimation?: boolean;
  duration?: number;
  delay?: number;
  whileHover?: HTMLMotionProps<"div">["whileHover"];
  whileTap?: HTMLMotionProps<"div">["whileTap"];
  initial?: HTMLMotionProps<"div">["initial"];
  animateProps?: HTMLMotionProps<"div">["animate"];
  exit?: HTMLMotionProps<"div">["exit"];
  transition?: HTMLMotionProps<"div">["transition"];
  layoutId?: string;
  dragEnabled?: boolean;
  dragConstraints?: HTMLMotionProps<"div">["dragConstraints"];
  dragElastic?: HTMLMotionProps<"div">["dragElastic"];
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      children,
      title,
      description,
      footer,
      header,
      className,
      animate = true,
      animateOnHover = true,
      animateOnMount = true,
      exitAnimation = true,
      duration = ANIMATION_DURATION.NORMAL,
      delay = 0,
      whileHover,
      whileTap,
      initial,
      animateProps,
      exit,
      transition,
      layoutId,
      dragEnabled = false,
      dragConstraints,
      dragElastic = 0.2,
      ...props
    },
    ref
  ) => {
    // Default animations
    const defaultInitial = animateOnMount
      ? initial || { opacity: 0, y: 20 }
      : initial;

    const defaultAnimate = animateProps || { opacity: 1, y: 0 };

    const defaultExit = exitAnimation
      ? exit || { opacity: 0, y: -20 }
      : exit;

    const defaultWhileHover = animateOnHover
      ? whileHover || {
          scale: 1.02,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }
      : whileHover;

    const defaultWhileTap = whileTap || { scale: 0.98 };

    const defaultTransition = transition || {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: "easeInOut",
    };

    if (!animate) {
      return (
        <Card ref={ref} className={className} {...props}>
          {(header || title || description) && (
            <CardHeader>
              {header}
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          {children && <CardContent>{children}</CardContent>}
          {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
      );
    }

    return (
      <motion.div
        ref={ref}
        layoutId={layoutId}
        initial={defaultInitial}
        animate={defaultAnimate}
        exit={defaultExit}
        whileHover={defaultWhileHover}
        whileTap={defaultWhileTap}
        transition={defaultTransition}
        drag={dragEnabled}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        className={cn("relative", className)}
      >
        <Card className="h-full">
          {(header || title || description) && (
            <CardHeader>
              {header}
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          {children && <CardContent>{children}</CardContent>}
          {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

// Export animated card list wrapper for collections
export const AnimatedCardList = ({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: stagger,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { AnimatedCard };