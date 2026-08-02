import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AuthGate } from "@/components/template/AuthGate";
import { store } from "@/store";
import { attachAuthListener, createAuthService } from "@/services/authService";
import { Provider } from "react-redux";

export default function Layout() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme.background]);

  // Listener global sekali saat app start: session dari secure storage
  // (INITIAL_SESSION) → redux; event login/logout/refresh → redux.
  useEffect(() => {
    const sub = attachAuthListener(createAuthService(), store.dispatch);
    return () => sub.data?.subscription.unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <KeyboardProvider>
            <AuthGate>
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
            </AuthGate>
          </KeyboardProvider>
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}
