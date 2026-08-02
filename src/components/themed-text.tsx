import { Text } from "@expo/ui";

export default function ThemedText() {
  return (
    <Text
      textStyle={{
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 32,
        letterSpacing: 0.5,
      }}
    >
      Headline
    </Text>
  );
}
