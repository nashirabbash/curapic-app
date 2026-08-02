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
import { useEffect, useState } from "react";
import { validateSignUpStep } from "@/utils/validation";
import { sendSignupOtp, submitOtp, submitSignup } from "./signupFlow";
import steps from "./SignUpItemsScreens.json";
import StepField from "./StepField";

const defaultService = createAuthService();

/** Tahap (attribut `tahap` di SignUpItemsScreens.json) — hindari magic index. */
const TAHAP = { NAME: 1, EMAIL: 2, PASSWORD: 3, CONFIRM: 4, OTP: 5 } as const;

/** Index array dari tahap OTP (baris ke-5 di JSON). */
const OTP_STEP_INDEX = steps.findIndex((s) => s.tahap === TAHAP.OTP);

export default function SignUpScreen({
  service = defaultService,
}: { service?: AuthService } = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string | undefined>>({});
  const [accountCreated, setAccountCreated] = useState(false);

  const step = steps[stepIndex];
  const setValue = (value: string) => {
    setValues((prev) => ({ ...prev, [step.tahap]: value }));
    setErrors((prev) => ({ ...prev, [step.tahap]: undefined }));
  };

  const user = {
    name: values[TAHAP.NAME]?.trim() ?? "",
    email: values[TAHAP.EMAIL]?.trim() ?? "",
    password: values[TAHAP.PASSWORD] ?? "",
  };

  // Step 5 (OTP): verifikasi kode → auto-login.
  const handleOtp = async () => {
    const code = values[TAHAP.OTP] ?? "";
    const codeError = validateSignUpStep(TAHAP.OTP, code, "");
    if (codeError) {
      setErrors((prev) => ({ ...prev, [TAHAP.OTP]: codeError }));
      return;
    }
    await submitOtp(service, user.email, code, dispatch, (href) =>
      router.replace(href),
    );
  };

  // Step 4 (Create Account): signup SATU KALI, lalu kirim OTP. Kalau sendOtp
  // gagal, user bisa "resend" di step 5 — bukan stuck (akun tidak dibuat ulang).
  const handleCreate = async () => {
    const error = validateSignUpStep(
      TAHAP.CONFIRM,
      values[TAHAP.CONFIRM] ?? "",
      user.password,
    );
    if (error) {
      setErrors((prev) => ({ ...prev, [TAHAP.CONFIRM]: error }));
      return;
    }

    dispatch(setLoading(true));
    try {
      if (!accountCreated) {
        const signup = await submitSignup(service, user);
        if (signup.error) {
          setErrors((prev) => ({ ...prev, [TAHAP.CONFIRM]: signup.error ?? undefined }));
          return;
        }
        setAccountCreated(true);
      }
      const otp = await sendSignupOtp(service, user.email);
      setErrors((prev) => ({ ...prev, [TAHAP.OTP]: otp.error ?? undefined }));
      setStepIndex(OTP_STEP_INDEX);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resendOtp = async () => {
    setErrors((prev) => ({ ...prev, [TAHAP.OTP]: undefined }));
    dispatch(setLoading(true));
    try {
      const otp = await sendSignupOtp(service, user.email);
      if (otp.error) {
        setErrors((prev) => ({ ...prev, [TAHAP.OTP]: otp.error ?? undefined }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClick = () => {
    if (step.tahap === TAHAP.OTP) void handleOtp();
    else if (step.tahap === TAHAP.CONFIRM) void handleCreate();
    else {
      const error = validateSignUpStep(
        step.tahap,
        values[step.tahap] ?? "",
        user.password,
      );
      if (error) {
        setErrors((prev) => ({ ...prev, [step.tahap]: error }));
        return;
      }
      setStepIndex(stepIndex + 1);
    }
  };

  const navigation = useNavigation();
  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      if (stepIndex === 0) return;
      e.preventDefault();
      setStepIndex((i) => i - 1);
    });
  }, [navigation, stepIndex]);

  const buttonLabel = isLoading
    ? "..."
    : step.tahap === TAHAP.OTP
      ? "Verify Code"
      : step.tahap === TAHAP.CONFIRM
        ? "Create Account"
        : "Continue";

  return (
    <Host useViewportSizeMeasurement style={{ flex: 1 }}>
      <Stack.Title asChild>
        <Host useViewportSizeMeasurement style={{ paddingRight: 20 }}>
          <LinearProgressIndicator
            progress={stepIndex / (steps.length - 1)}
            modifiers={[fillMaxWidth()]}
            color={theme.primary}
          />
        </Host>
      </Stack.Title>
      <Column
        style={{ backgroundColor: theme.background, paddingHorizontal: 20 }}
      >
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
        <Column
          alignment="center"
          spacing={16}
          style={{ paddingBottom: 52, paddingTop: 16 }}
        >
          <Button
            modifiers={[fillMaxWidth(), height(48)]}
            onClick={handleClick}
            enabled={!isLoading}
            colors={{ containerColor: theme.primary }}
          >
            <Text
              textStyle={{ letterSpacing: 2 }}
              color={theme.labels.primary}
              weight="semibold"
            >
              {buttonLabel}
            </Text>
          </Button>
          {step.tahap === TAHAP.OTP ? (
            <Text
              variant="body"
              weight="regular"
              color={theme.accents.blue}
              onPress={resendOtp}
            >
              {isLoading ? "Sending..." : "Didn't get a code? Resend"}
            </Text>
          ) : null}
          <Row spacing={4}>
            <Text variant="body" weight="regular" color={theme.textSecondary}>
              Already have an account?
            </Text>
            <Text
              variant="body"
              weight="regular"
              color={theme.accents.blue}
              onPress={() => router.push("/(screens)/(auth)/login")}
            >
              Log In
            </Text>
          </Row>
        </Column>
      </Column>
    </Host>
  );
}
