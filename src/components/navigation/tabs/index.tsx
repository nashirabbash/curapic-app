import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

import { getTabColors, nativeTabItems } from "./helper";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = getTabColors(scheme);

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      {nativeTabItems.map(({ name, label, icon }) => (
        <NativeTabs.Trigger name={name} key={name}>
          <NativeTabs.Trigger.Label>{label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon
                family={MaterialIcons}
                name={icon}
              />
            }
            renderingMode="template"
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
