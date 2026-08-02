import Text from "@/components/ui/Text";
import TextField from "@/components/ui/TextField";
import { useTheme } from "@/hooks/use-theme";
import { loginFailure } from "@/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAuthService } from "@/services/authService";
import type { AuthService } from "@/services/authService";
import { submitLogin } from "./submitLogin";
import {
  Column,
  Host,
  Row,
  ScrollView,
  Spacer,
  useNativeState,
} from "@expo/ui";
import { Button, OutlinedButton, RNHostView } from "@expo/ui/jetpack-compose";
import {
  fillMaxHeight,
  fillMaxWidth,
  height,
} from "@expo/ui/jetpack-compose/modifiers";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { validateLogin } from "@/utils/validation";

const defaultService = createAuthService();

export default function LoginScreen({
  service = defaultService,
}: { service?: AuthService } = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const theme = useTheme();

  // Session sudah pulih dari secure storage (mis. restart app setelah login)
  // → langsung ke tabs, jangan tampilkan login wall.
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/(tabs)/home");
    }
  }, [isLoading, user, router]);

  const email = useNativeState("");
  const password = useNativeState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleLogin = () => {
    const validationErrors = validateLogin(email.value, password.value);
    setErrors(validationErrors);
    if (validationErrors.email || validationErrors.password) return;
    void submitLogin(
      service,
      { email: email.value, password: password.value },
      dispatch,
      (href) => router.replace(href),
    );
  };

  const handleGoogleLogin = async () => {
    // OAuth: browser terbuka sendiri; promise resolve saat browser buka, bukan
    // saat flow selesai. Tanpa isLoading global — user cancel OAuth tidak akan
    // pernah "selesai" dan isLoading akan stuck selamanya.
    const result = await service.googleLogin();
    if (result.error) {
      dispatch(loginFailure(result.error));
    }
    // Sukses: browser OAuth terbuka → event SIGNED_IN dari listener set session.
  };

  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Column style={{ paddingTop: 64 }} modifiers={[fillMaxHeight()]}>
          <Column alignment="center" spacing={28}>
            <Column alignment="start" spacing={8} modifiers={[fillMaxWidth()]}>
              <Text
                variant="title1"
                weight="bold"
                align="left"
                color={theme.text}
              >
                Welcome Back!
              </Text>
              <Text
                variant="subheadline"
                align="left"
                color={theme.textSecondary}
              >
                Please login to your account to continue.
              </Text>
            </Column>
            <TextField
              label="Email"
              value={email}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              errorMessage={errors.email}
              onChangeText={() => setErrors((e) => ({ ...e, email: undefined }))}
            />
            <TextField
              label="Password"
              value={password}
              placeholder="Enter your password"
              placeholderTextColor={theme.textSecondary}
              isPassword
              secureTextEntry
              errorMessage={errors.password}
              onChangeText={() =>
                setErrors((e) => ({ ...e, password: undefined }))
              }
            />
            {error ? (
              <Text variant="body" weight="regular" color={theme.accents.red}>
                {error}
              </Text>
            ) : null}
          </Column>
        </Column>
        <Spacer flexible />
        <Column
          spacing={16}
          style={{ paddingBottom: 52, paddingTop: 16 }}
          alignment="center"
        >
          <Button
            modifiers={[fillMaxWidth(), height(48)]}
            enabled={!isLoading}
            onClick={handleLogin}
            colors={{ containerColor: theme.primary }}
          >
            <Text
              variant="body"
              textStyle={{ letterSpacing: 2 }}
              weight="semibold"
              color={theme.labels.primary}
            >
              {isLoading ? "LOADING..." : "LOGIN"}
            </Text>
          </Button>
          <Text
            variant="body"
            weight="regular"
            color={theme.textSecondary}
            align="center"
            modifiers={[fillMaxWidth()]}
          >
            OR
          </Text>
          <OutlinedButton
            modifiers={[fillMaxWidth(), height(48)]}
            enabled={!isLoading}
            onClick={handleGoogleLogin}
          >
            <RNHostView matchContents>
              <Image
                source={require("@/assets/images/Google_Icon.svg")}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </RNHostView>
            <Spacer size={8} />
            <Text textStyle={{ letterSpacing: 2 }}>Google</Text>
          </OutlinedButton>
          <Row spacing={4}>
            <Text variant="body" weight="regular" color={theme.textSecondary}>
              Don&apos;t have an account?
            </Text>
            <Text
              variant="body"
              weight="semibold"
              color={theme.accents.blue}
              onPress={() => router.push("/(screens)/(auth)/SignUp")}
            >
              Sign Up
            </Text>
          </Row>
        </Column>
      </ScrollView>
    </Host>
  );
}
