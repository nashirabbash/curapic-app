import { useTheme } from "@/hooks/use-theme";
import { Text as ExpoText } from "@expo/ui";
import { getTextVariantStyle, getTextWeight } from "./helper";
import { TextProps } from "./type";

export default function Text({
  children,
  variant = "body",
  weight = "regular",
  color = "primary",
  align = "left",
  italic = false,
  textStyle,
  ...props
}: TextProps) {
  const theme = useTheme();

  // Resolve the actual color based on the current theme,
  // or allow developers to pass a custom string color.
  let resolvedColor: string = theme.text;
  if (color === "primary") resolvedColor = theme.labels.primary;
  else if (color === "secondary") resolvedColor = theme.labels.secondary;
  else if (color === "tertiary") resolvedColor = theme.labels.tertiary;
  else if (color === "quaternary") resolvedColor = theme.labels.quaternary;
  else if (color) resolvedColor = color;

  const variantStyle = getTextVariantStyle(variant);
  const fontWeight = getTextWeight(weight);

  const mergedTextStyle = {
    color: resolvedColor,
    fontSize: variantStyle.fontSize,
    lineHeight: variantStyle.lineHeight,
    letterSpacing: variantStyle.letterSpacing,
    fontWeight,
    textAlign: align,
    fontStyle: italic ? "italic" : "normal",
    ...textStyle,
  } as any; // Cast as any because @expo/ui might not explicitly declare fontStyle in textStyle types

  return (
    <ExpoText textStyle={mergedTextStyle} {...props}>
      {children}
    </ExpoText>
  );
}

export * from "./type";
