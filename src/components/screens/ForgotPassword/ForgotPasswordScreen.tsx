import Text from "@/components/ui/Text";
import { useTheme } from "@/hooks/use-theme";
import { setLoading } from "@/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAuthService } from "@/services/authService";
import type { AuthService } from "@/services/authService";
import { Column, Host, Row, Spacer } from "@expo/ui";
import { Button, LinearProgressIndicator } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
import { Stack, useNavigation, useRouter } from "expo-router";
import type { Href } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { validateResetStep } from "@/utils/validation";
import { requestResetOtp, submitNewPassword, verifyResetOtp } from "./resetFlow";
import steps from "./ResetItemsScreens.json";
import StepField from "../SignUp/StepField";

const defaultService = createAuthService();

/** Tahap reset — indices start dari 1 (JSON). hindari magic index. */
const RESET_STEP = { EMAIL: 1, OTP: 2, PASSWORD: 3 } as const;

export default function ForgotPasswordScreen({
  service = defaultService,
}: { service?: AuthService } = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string | undefined>>({});
  // Email dibaca di langkah OTP/password walau current step bukan email —
  // disimpan ref biar tak perlu re-render (nilai tak muncul di baris lain).
  const emailRef = useRef("");

  const step = steps[stepIndex];
  const getValue = (tahap: number) => values[tahap] ?? "";

  const setValue = (value: string) => {
    setValues((prev) => ({ ...prev, [step.tahap]: value }));
    if (step.tahap === RESET_STEP.EMAIL) emailRef.current = value.trim();
    setErrors((prev) => ({ ...prev, [step.tahap]: undefined }));
  };

  /** Langkah 1: email → kirim OTP reset. */
  const handleEmail = async () => {
    const error = validateResetStep(RESET_STEP.EMAIL, getValue(RESET_STEP.EMAIL), "");
    if (error) {
      setErrors((prev) => ({ ...prev, [RESET_STEP.EMAIL]: error }));
      return;
    }
    const email = emailRef.current;
    dispatch(setLoading(true));
    try {
      const otp = await requestResetOtp(service, email);
      if (otp.error) {
        setErrors((prev) => ({ ...prev, [RESET_STEP.EMAIL]: otp.error ?? undefined }));
        return;
      }
      setStepIndex(1);
    } finally {
      dispatch(setLoading(false));
    }
  };

  /** Langkah 2: validasi OTP 6 digit → session reset aktif. */
  const handleOtp = async () => {
    const error = validateResetStep(RESET_STEP.OTP, getValue(RESET_STEP.OTP), "");
    if (error) {
      setErrors((prev) => ({ ...prev, [RESET_STEP.OTP]: error }));
      return;
    }
    const email = emailRef.current;
    dispatch(setLoading(true));
    try {
      const verify = await verifyResetOtp(service, email, getValue(RESET_STEP.OTP));
      if (verify.error) {
        setErrors((prev) => ({ ...prev, [RESET_STEP.OTP]: verify.error ?? undefined }));
        return;
      }
      setStepIndex(2);
    } finally {
      dispatch(setLoading(false));
    }
  };

  /** Langkah 3: set password baru → auto-login tabs. */
  const handleNewPassword = () => {
    const password = getValue(RESET_STEP.PASSWORD);
    const error = validateResetStep(RESET_STEP.PASSWORD, password, "");
    if (error) {
      setErrors((prev) => ({ ...prev, [RESET_STEP.PASSWORD]: error }));
      return;
    }
    void submitNewPassword(service, password, dispatch, (href) =>
      router.replace(href as Href),
      emailRef.current,
    );
  };

  const handleClick = () => {
    if (step.tahap === RESET_STEP.EMAIL) void handleEmail();
    else if (step.tahap === RESET_STEP.OTP) void handleOtp();
    else handleNewPassword();
  };

  const navigation = useNavigation();
  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      if (stepIndex === 0) return;
      e.preventDefault();
      setStepIndex((i) => i - 1);
    });
  }, [navigation, stepIndex]);

  let buttonLabel = "Continue";
  if (isLoading) buttonLabel = "...";
  else if (step.tahap === RESET_STEP.EMAIL) buttonLabel = "Send Code";
  else if (step.tahap === RESET_STEP.OTP) buttonLabel = "Verify Code";
  else buttonLabel = "Reset Password";

  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <Stack.Title asChild>
        <Host useViewportSizeMeasurement style={{ paddingRight: 20 }}>
          <LinearProgressIndicator
            progress={(stepIndex + 1) / steps.length}
            modifiers={[fillMaxWidth()]}
            color={theme.primary}
          />
        </Host>
      </Stack.Title>
      <Column style={{ backgroundColor: theme.background, paddingHorizontal: 20 }}>
        <Column spacing={28} style={{ paddingTop: 64 }}>
          <Column spacing={8} alignment="start">
            <Text variant="title1" weight="semibold">
              {step.title}
            </Text>
            <Text variant="body" weight="regular">
              {step.description}
            </Text>
          </Column>
          <StepField
            key={step.tahap}
            step={step}
            initialValue={values[step.tahap] ?? ""}
            onChange={setValue}
            errorMessage={errors[step.tahap]}
          />
        </Column>
        <Spacer flexible />
        <Column alignment="center" spacing={16} style={{ paddingBottom: 52, paddingTop: 16 }}>
          <Button
            modifiers={[fillMaxWidth(), height(48)]}
            onClick={handleClick}
            enabled={!isLoading}
            colors={{ containerColor: theme.primary }}
          >
            <Text textStyle={{ letterSpacing: 2 }} color={theme.labels.primary} weight="semibold">
              {buttonLabel}
            </Text>
          </Button>
          {step.tahap === RESET_STEP.EMAIL ? (
            <Row spacing={4}>
              <Text variant="body" weight="regular" color={theme.textSecondary}>
                Remembered it?
              </Text>
              <Text
                variant="body"
                weight="regular"
                color={theme.accents.blue}
                onPress={() => router.back()}
              >
                Back to Login
              </Text>
            </Row>
          ) : null}
        </Column>
      </Column>
    </Host>
  );
}