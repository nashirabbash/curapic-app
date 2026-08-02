import { useTheme } from "@/hooks/use-theme";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { nativeTabItems } from "@/components/navigation/tabs/helper";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function Layout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const activeTabName =
    segments[0] === "(tabs)" ? (segments[1] ?? "home") : "home";
  const activeTabTitle =
    nativeTabItems.find(({ name }) => name === activeTabName)?.label ??
    "Curapic";

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme.background]);

  return (
    <Provider store={store}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <KeyboardProvider>
            <Stack
              initialRouteName="(screens)"
              screenOptions={{
                headerStyle: { backgroundColor: theme.background },
                headerTintColor: theme.text,
                headerShadowVisible: false,
                headerShown: false,
              }}
            >
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </KeyboardProvider>
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}
