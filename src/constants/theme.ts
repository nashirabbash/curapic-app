/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// @ts-ignore: side-effect import of CSS for web bundlers (ignored in native environments)
import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
  "primary": "#4FC2F8",
  "text": "#000000",
  "secondaryBg": "rgba(118, 118, 128, 0.12)",
  "buttonLabel": "#ffffff",
  "background": "#FFFFFF",
  "backgroundElement": "#F2F2F7",
  "backgroundSelected": "#E5E5EA",
  "textSecondary": "rgba(60, 60, 67, 0.6)",
  "separator": "#C6C6C8",
  "accents": {
    "red": "#FF383C",
    "orange": "#FF8D28",
    "yellow": "#FFCC00",
    "green": "#34C759",
    "mint": "#00C8B3",
    "teal": "#00C3D0",
    "cyan": "#00C0E8",
    "blue": "#0088FF",
    "indigo": "#6155F5",
    "purple": "#CB30E0",
    "pink": "#FF2D55",
    "brown": "#AC7F5E"
  },
  "backgrounds": {
    "primary": "#FFFFFF",
    "secondary": "#F2F2F7",
    "tertiary": "#FFFFFF",
    "primaryElevated": "#FFFFFF",
    "secondaryElevated": "#F2F2F7",
    "tertiaryElevated": "#FFFFFF"
  },
  "backgroundsGrouped": {
    "primary": "#F2F2F7",
    "secondary": "#FFFFFF",
    "tertiary": "#F2F2F7",
    "primaryElevated": "#F2F2F7",
    "secondaryElevated": "#FFFFFF",
    "tertiaryElevated": "#F2F2F7"
  },
  "fills": {
    "primary": "rgba(120, 120, 120, 0.2)",
    "secondary": "rgba(120, 120, 128, 0.16)",
    "tertiary": "rgba(118, 118, 128, 0.12)",
    "quaternary": "rgba(116, 116, 128, 0.08)"
  },
  "fillsVibrant": {
    "primary": "#CCCCCC",
    "secondary": "#E0E0E0",
    "tertiary": "#EDEDED"
  },
  "grays": {
    "black": "#000000",
    "white": "#FFFFFF",
    "gray": "#8E8E93",
    "gray2": "#AEAEB2",
    "gray3": "#C7C7CC",
    "gray4": "#D1D1D6",
    "gray5": "#E5E5EA",
    "gray6": "#F2F2F7"
  },
  "labels": {
    "primary": "#000000",
    "secondary": "rgba(60, 60, 67, 0.6)",
    "tertiary": "rgba(60, 60, 67, 0.3)",
    "quaternary": "rgba(60, 60, 67, 0.18)"
  },
  "labelsVibrant": {
    "primary": "#1A1A1A",
    "secondary": "#727272",
    "tertiary": "#BFBFBF",
    "quaternary": "#D9D9D9"
  },
  "labelsVibrantControls": {
    "primary": "#1A1A1A",
    "secondary": "#727272",
    "tertiary": "#BFBFBF"
  },
  "overlays": {
    "default": "rgba(0, 0, 0, 0.2)",
    "activityViewController": "rgba(0, 0, 0, 0.2)"
  },
  "separators": {
    "opaque": "#C6C6C8",
    "nonOpaque": "rgba(0, 0, 0, 0.12)",
    "vibrant": "#E6E6E6"
  },
  "miscellaneous": {
    "alertOverlay": "rgba(41, 41, 58, 0.23)",
    "tabUnselected": "#999999",
    "windowGrabber": "#000000",
    "segmentedControlSelectedFill": "#FFFFFF",
    "buttons": {
      "labelDestructiveDisabled": "rgba(255, 56, 60, 0.5)",
      "bgDestructiveProminent": "rgba(255, 56, 60, 0.2)",
      "bgDestructive": "rgba(255, 56, 60, 0.14)"
    },
    "keyboards": {
      "emojiMic": "rgba(34, 43, 89, 0.63)",
      "glyphsPrimary": "#595959",
      "glyphsSecondary": "#B3B3B3",
      "keys": "#141414"
    },
    "sidebar": {
      "fillSelected": "#FFFFFF",
      "shadowDragOver": "rgba(0, 0, 0, 0.2)"
    },
    "textField": {
      "bg": "#FFFFFF",
      "outline": "rgba(60, 60, 67, 0.29)"
    },
    "windowControls": {
      "close": "#FF5F57",
      "minimize": "#FEBC2F",
      "maximize": "#27C840",
      "bgInactive": "rgba(0, 0, 0, 0.05)"
    },
    "toggle": {
      "axLabelOff": "#B3B3B3"
    }
  }
},
  dark: {
  "primary": "#4FC2F8",
  "text": "#FFFFFF",
  "secondaryBg": "rgba(118, 118, 128, 0.24)",
  "buttonLabel": "#ffffff",
  "background": "#000000",
  "backgroundElement": "#1C1C1E",
  "backgroundSelected": "#3A3A3C",
  "textSecondary": "rgba(235, 235, 245, 0.7)",
  "separator": "#38383A",
  "accents": {
    "red": "#FF4245",
    "orange": "#FF9230",
    "yellow": "#FFD600",
    "green": "#30D158",
    "mint": "#00DAC3",
    "teal": "#00D2E0",
    "cyan": "#3CD3FE",
    "blue": "#0091FF",
    "indigo": "#6D7CFF",
    "purple": "#DB34F2",
    "pink": "#FF375F",
    "brown": "#B78A66"
  },
  "backgrounds": {
    "primary": "#000000",
    "secondary": "#1C1C1E",
    "tertiary": "#2C2C2E",
    "primaryElevated": "#1C1C1E",
    "secondaryElevated": "#2C2C2E",
    "tertiaryElevated": "#3A3A3C"
  },
  "backgroundsGrouped": {
    "primary": "#000000",
    "secondary": "#1C1C1E",
    "tertiary": "#2C2C2E",
    "primaryElevated": "#1C1C1E",
    "secondaryElevated": "#2C2C2E",
    "tertiaryElevated": "#3A3A3C"
  },
  "fills": {
    "primary": "rgba(120, 120, 128, 0.36)",
    "secondary": "rgba(120, 120, 128, 0.32)",
    "tertiary": "rgba(118, 118, 128, 0.24)",
    "quaternary": "rgba(118, 118, 128, 0.18)"
  },
  "fillsVibrant": {
    "primary": "#333333",
    "secondary": "#1F1F1F",
    "tertiary": "#121212"
  },
  "grays": {
    "black": "#000000",
    "white": "#FFFFFF",
    "gray": "#8E8E93",
    "gray2": "#636366",
    "gray3": "#48484A",
    "gray4": "#3A3A3C",
    "gray5": "#2C2C2E",
    "gray6": "#1C1C1E"
  },
  "labels": {
    "primary": "#FFFFFF",
    "secondary": "rgba(235, 235, 245, 0.7)",
    "tertiary": "rgba(235, 235, 245, 0.3)",
    "quaternary": "rgba(235, 235, 245, 0.16)"
  },
  "labelsVibrant": {
    "primary": "#F5F5F5",
    "secondary": "#8A8A8A",
    "tertiary": "#404040",
    "quaternary": "#262626"
  },
  "labelsVibrantControls": {
    "primary": "#F5F5F5",
    "secondary": "#8A8A8A",
    "tertiary": "#404040"
  },
  "overlays": {
    "default": "rgba(0, 0, 0, 0.48)",
    "activityViewController": "rgba(0, 0, 0, 0.29)"
  },
  "separators": {
    "opaque": "#38383A",
    "nonOpaque": "rgba(255, 255, 255, 0.17)",
    "vibrant": "#1A1A1A"
  },
  "miscellaneous": {
    "alertOverlay": "rgba(18, 18, 18, 0.56)",
    "tabUnselected": "#7E7E7E",
    "windowGrabber": "#FFFFFF",
    "segmentedControlSelectedFill": "rgba(255, 255, 255, 0.27)",
    "tabBarSelection": "#FFFFFF",
    "buttons": {
      "labelDestructiveDisabled": "rgba(255, 66, 69, 0.5)",
      "bgDestructiveProminent": "rgba(255, 66, 69, 0.2)",
      "bgDestructive": "rgba(255, 66, 69, 0.14)"
    },
    "keyboards": {
      "emojiMic": "rgba(255, 255, 255, 0.73)",
      "glyphsPrimary": "#A6A6A6",
      "glyphsSecondary": "#4D4D4D",
      "keys": "#454545"
    },
    "sidebar": {
      "fillSelected": "rgba(142, 142, 147, 0.25)",
      "shadowDragOver": "rgba(0, 0, 0, 0.9)"
    },
    "textField": {
      "bg": "#000000",
      "outline": "rgba(235, 235, 245, 0.3)"
    },
    "windowControls": {
      "close": "#FF5F57",
      "minimize": "#FEBC2F",
      "maximize": "#27C840",
      "bgInactive": "rgba(255, 255, 255, 0.05)"
    },
    "toggle": {
      "axLabelOff": "#A6A6A6"
    }
  }
},
} as const;

export type ThemeColor = {
  [K in keyof typeof Colors.light & keyof typeof Colors.dark]: (typeof Colors.light)[K] extends string ? K : never;
}[keyof typeof Colors.light & keyof typeof Colors.dark];

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
