import { View } from "react-native";

import { Host, RNHostView } from "@expo/ui";
import { useTheme } from "@/hooks/use-theme";
import Text from "../Text";

export default function Badge({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <RNHostView matchContents>
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: theme.accents.red,
          borderRadius: 999,
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}
      >
        <Host matchContents>
          <Text
            variant="caption1"
            weight="semibold"
            color={theme.grays.white}
            textStyle={{ letterSpacing: 0.5 }}
          >
            {label}
          </Text>
        </Host>
      </View>
    </RNHostView>
  );
}
