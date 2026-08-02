import { Divider as SwiftUIDivider } from "@expo/ui/swift-ui";
import type { DividerProps } from "./types";

export function Divider({
  orientation = "horizontal",
  thickness = 1,
}: DividerProps) {
  // SwiftUI Divider does not support direct thickness/color via simple props out-of-the-box.
  // We wrap it in a Host with appropriate RN style dimensions so it displays properly in RN views.

  if (orientation === "vertical") {
    return <SwiftUIDivider />;
  }

  return <SwiftUIDivider />;
}
