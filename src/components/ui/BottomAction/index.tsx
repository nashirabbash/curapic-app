import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomAction({ children, gap }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        gap: gap || 16,
        paddingBottom: insets.bottom + 32,
        paddingTop: 20,
      }}
    >
      {children}
    </View>
  );
}
