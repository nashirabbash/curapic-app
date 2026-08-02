import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";

import { Colors } from "@/constants/theme";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export type NativeTabItem = {
  name: "home" | "doctor" | "scan" | "profile";
  label: string;
  icon: MaterialIconName;
};

export type WebTabItem = {
  name: "home" | "doctor" | "scan" | "profile";
  label: string;
  href: "/(tabs)/home" | "/(tabs)/doctor" | "/(tabs)/scan" | "/(tabs)/profile";
};

export const nativeTabItems: NativeTabItem[] = [
  { name: "home", label: "Home", icon: "home" },
  { name: "doctor", label: "Doctor", icon: "local-hospital" },
  { name: "scan", label: "Scan", icon: "document-scanner" },
  { name: "profile", label: "Profile", icon: "person" },
];

export const webTabItems: WebTabItem[] = [
  { name: "home", label: "Home", href: "/(tabs)/home" },
  { name: "doctor", label: "Doctor", href: "/(tabs)/doctor" },
  { name: "scan", label: "Scan", href: "/(tabs)/scan" },
  { name: "profile", label: "Profile", href: "/(tabs)/profile" },
];

export function getTabColors(scheme: string | null | undefined) {
  return Colors[
    scheme === "unspecified" || scheme == null
      ? "light"
      : (scheme as "light" | "dark")
  ];
}
