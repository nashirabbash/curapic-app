import { useTheme } from "@/hooks/use-theme";
import { Host, Icon } from "@expo/ui";
import { Pressable } from "react-native";
import Text from "../Text";
import { ButtonColor, ButtonProps, ButtonSize } from "./type";

const SIZE_CONFIG: Record<
  ButtonSize,
  { paddingH: number; paddingV: number; circleSize: number; fontSize: number }
> = {
  small: { paddingH: 10, paddingV: 4, circleSize: 28, fontSize: 15 },
  medium: { paddingH: 14, paddingV: 7, circleSize: 34, fontSize: 15 },
  large: { paddingH: 20, paddingV: 14, circleSize: 50, fontSize: 17 },
  lg: { paddingH: 20, paddingV: 14, circleSize: 50, fontSize: 17 },
};

function getColorScheme(
  color: ButtonColor,
  theme: ReturnType<typeof useTheme>,
) {
  const map = {
    gray: {
      ghostText: theme.labels.tertiary,
      filledBg: theme.fills.tertiary,
      filledText: theme.labels.tertiary,
    },
    red: {
      ghostText: theme.accents.red,
      filledBg: theme.accents.red,
      filledText: theme.grays.white,
    },
    blue: {
      ghostText: theme.accents.blue,
      filledBg: theme.accents.blue,
      filledText: theme.grays.white,
    },
  };
  return map[color];
}

export default function Button({
  label,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  size = "medium",
  color = "blue",
  shape = "pill",
  variant = "ghost",
  disabled = false,
  onPress,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const config = SIZE_CONFIG[size];
  const scheme = getColorScheme(color, theme);

  const resolvedShape = iconOnly ? "circle" : shape;
  const isCircle = resolvedShape === "circle";

  const textColor = disabled
    ? theme.labels.tertiary
    : variant === "filled"
      ? scheme.filledText
      : scheme.ghostText;

  const bgColor = disabled
    ? scheme.filledBg
    : variant === "filled"
      ? scheme.filledBg
      : "transparent";

  const containerStyle = isCircle
    ? {
        width: config.circleSize,
        height: config.circleSize,
        borderRadius: config.circleSize / 2,
        justifyContent: "center" as const,
        alignItems: "center" as const,
      }
    : {
        paddingHorizontal: config.paddingH,
        paddingVertical: config.paddingV,
        borderRadius: resolvedShape === "pill" ? 1000 : 12,
        flexDirection: "row" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        gap: 4,
      };

  const iconSize = config.fontSize;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        containerStyle,
        {
          backgroundColor: pressed && !disabled ? scheme.filledBg : bgColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {leadingIcon && (
        <Host matchContents>
          <Icon name={leadingIcon} size={iconSize} color={textColor} />
        </Host>
      )}
      {label && (
        <Host matchContents>
          <Text
            variant={size === "large" ? "body" : "subheadline"}
            weight="semibold"
            color={textColor}
          >
            {label}
          </Text>
        </Host>
      )}
      {trailingIcon && (
        <Host matchContents>
          <Icon name={trailingIcon} size={iconSize} color={textColor} />
        </Host>
      )}
    </Pressable>
  );
}

export * from "./type";
