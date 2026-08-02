import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen
        name="login"
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen name="SignUp" options={{ headerTitle: "" }} />
      <Stack.Screen name="ForgotPassword" options={{ headerTitle: "" }} />
    </Stack>
  );
}
