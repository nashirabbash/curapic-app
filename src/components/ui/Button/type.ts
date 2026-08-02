import { ViewStyle } from "react-native";
import type { IconName } from "@expo/ui";

export type ButtonSize = "small" | "medium" | "large" | "lg";
export type ButtonColor = "gray" | "red" | "blue";
export type ButtonShape = "rounded" | "pill" | "circle";
export type ButtonVariant = "ghost" | "filled";

export interface ButtonProps {
  /** Button label text */
  label?: string;
  /** When true, renders a circle button with just the icon (forces shape="circle") */
  iconOnly?: boolean;
  /** Icon name to show before the label */
  leadingIcon?: IconName;
  /** Icon name to show after the label */
  trailingIcon?: IconName;
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}