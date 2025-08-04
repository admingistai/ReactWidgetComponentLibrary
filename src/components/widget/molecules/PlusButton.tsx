/**
 * PlusButton - Molecular component for plus/add action button
 * Pure component - click handling passed from parent
 * Following "Thinking in React" - no state, only props
 */

import { PlusButtonIcon } from "../atoms";

interface PlusButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "lg";
}

export function PlusButton({
  onClick,
  className = "",
  disabled = false,
  size = "sm",
}: PlusButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "32px",
        height: "32px",
        background: "transparent",
        border: "none",
        padding: "4px",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.2s ease",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "0.8";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "1";
        }
      }}
    >
      <PlusButtonIcon size={size} />
    </button>
  );
}
