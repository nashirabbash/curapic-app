import { CurapicTextVariant, CurapicTextWeight } from "./type";

type TextVariantStyle = {
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export function getTextVariantStyle(
  variant: CurapicTextVariant,
): TextVariantStyle {
  switch (variant) {
    case "largeTitle":
      return { fontSize: 34, lineHeight: 41, letterSpacing: 0.4 };
    case "title1":
      return { fontSize: 28, lineHeight: 34, letterSpacing: 0.38 };
    case "title2":
      return { fontSize: 22, lineHeight: 28 };
    case "title3":
      return { fontSize: 20, lineHeight: 25 };
    case "headline":
      return { fontSize: 17, lineHeight: 22 };
    case "body":
      return { fontSize: 17, lineHeight: 22 };
    case "callout":
      return { fontSize: 16, lineHeight: 21 };
    case "subheadline":
      return { fontSize: 15, lineHeight: 20 };
    case "footnote":
      return { fontSize: 13, lineHeight: 18 };
    case "caption1":
      return { fontSize: 12, lineHeight: 16 };
    case "caption2":
      return { fontSize: 11, lineHeight: 13, letterSpacing: 0.06 };
    default:
      return { fontSize: 14, lineHeight: 22 };
  }
}

export function getTextWeight(
  weight: CurapicTextWeight,
): "400" | "600" | "700" {
  switch (weight) {
    case "bold":
      return "700";
    case "semibold":
      return "600"; // Mapping 590 to 600
    case "regular":
    default:
      return "400";
  }
}
