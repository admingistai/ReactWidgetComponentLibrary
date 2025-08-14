/**
 * Header - Organism component for widget header
 * Pure presentational component
 */

import { tokens } from "@/lib/design-tokens";
import { Text } from "../atoms";

interface HeaderProps {
  title?: string;
  className?: string;
}

export function Header({
  title = "Ask New York Times Anything!",
  className = "",
}: HeaderProps) {
  return (
    <div
      className={className}
      style={{
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: tokens.spacing["3xl"],
        display: "flex",
      }}
    >
      <div style={{ alignSelf: "stretch" }}>
        <Text variant="header">{title}</Text>
      </div>
    </div>
  );
}
