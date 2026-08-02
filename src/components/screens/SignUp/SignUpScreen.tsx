import Text from "@/components/ui/Text";
import { useTheme } from "@/hooks/use-theme";
import { useAppDispatch } from "@/store/hooks";
import { createAuthService } from "@/services/authService";
import type { AuthService } from "@/services/authService";
import { Column, Host, Row, Spacer } from "@expo/ui";
import { Button, LinearProgressIndicator } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
import { Stack, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { validateSignUpStep } from "@/utils/validation";
import { submitOtp, submitSignup } from "./signupFlow";
import steps from "./SignUpItemsScreens.json";
import StepField from "./StepField";

const defaultService = createAuthService();

export default function SignUpScreen({
  service = defaultService,
}: { service?: AuthService } = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const setValue = (value: string) => {
    setValues((prev) => ({ ...prev, [step.tahap]: value }));
    setErrors((prev) => ({ ...prev, [step.tahap]: undefined }));
  };

  const handleClick = async () => {
    // Step 5 (OTP): verifikasi kode → session aktif → auto-login ke tabs.
    if (step.tahap === 5) {
      const code = values[5] ?? "";
      const codeError = validateSignUpStep(5, code, "");
      if (codeError) {
        setErrors((prev) => ({ ...prev, [5]: codeError }));
        return;
      }
      setIsSubmitting(true);
      const result = await submitOtp(
        service,
        values[2]?.trim() ?? "",
        code,
        dispatch,
        (href) => router.replace(href),
      );
      setIsSubmitting(false);
      if (result.error) {
        setErrors((prev) => ({ ...prev, [5]: result.error ?? undefined }));
      }
      return;
    }

    // Step 4 (Create Account): daftar akun, berhasil → kirim OTP → lanjut step OTP.
    if (step.tahap === 4) {
      const error = validateSignUpStep(4, values[4] ?? "", values[3] ?? "");
      if (error) {
        setErrors((prev) => ({ ...prev, [4]: error }));
        return;
      }
      setIsSubmitting(true);
      const result = await submitSignup(service, {
        name: values[1]?.trim() ?? "",
        email: values[2]?.trim() ?? "",
        password: values[3] ?? "",
      });
      setIsSubmitting(false);
      if (result.error) {
        setErrors((prev) => ({ ...prev, [4]: result.error ?? undefined }));
        return;
      }
      setStepIndex(4); // tahap 5 = verifikasi email (OTP)
      return;
    }

    const error = validateSignUpStep(
      step.tahap,
      values[step.tahap] ?? "",
      values[3] ?? "",
    );
    if (error) {
      setErrors((prev) => ({ ...prev, [step.tahap]: error }));
      return;
    }
    if (isLast) router.push("/(tabs)/home");
    else setStepIndex(stepIndex + 1);
  };

  const navigation = useNavigation();
  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      if (stepIndex === 0) return;
      e.preventDefault();
      setStepIndex((i) => i - 1);
    });
  }, [navigation, stepIndex]);

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
            enabled={!isSubmitting}
            colors={{ containerColor: theme.primary }}
          >
            <Text
              textStyle={{ letterSpacing: 2 }}
              color={theme.labels.primary}
              weight="semibold"
            >
              {isSubmitting ? "..." : isLast ? "Verify Code" : step.tahap === 4 ? "Create Account" : "Continue"}
            </Text>
          </Button>
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