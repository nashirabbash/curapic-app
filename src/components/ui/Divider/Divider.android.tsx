import { HorizontalDivider, VerticalDivider } from "@expo/ui/jetpack-compose";
import type { DividerProps } from "./types";

export function Divider({
  orientation = "horizontal",
  thickness = 1,
  color,
}: DividerProps) {
  if (orientation === "vertical") {
    return <VerticalDivider thickness={thickness} color={color} />;
  }

  return <HorizontalDivider thickness={thickness} color={color} />;
}
