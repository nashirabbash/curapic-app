import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{ headerStyle: { backgroundColor: theme.background } }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
