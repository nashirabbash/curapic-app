import TextField from "@/components/ui/TextField";
import { useNativeState } from "@expo/ui";
import steps from "./SignUpItemsScreens.json";

type Step = (typeof steps)[number];
const KEYBOARD_TYPE: Record<Step["type"], "email-address" | "default"> = {
  text: "default",
  email: "email-address",
  password: "default",
};

export default function StepField({
  step,
  initialValue,
  onChange,
  errorMessage,
}: {
  readonly step: Step;
  readonly initialValue: string;
  readonly onChange: (value: string) => void;
  readonly errorMessage?: string;
}) {
  const input = useNativeState(initialValue);
  return (
    <TextField
      placeholder={step.placeholder}
      isPassword={step.type === "password"}
      keyboardType={KEYBOARD_TYPE[step.type]}
      value={input}
      onChangeText={onChange}
      errorMessage={errorMessage}
    />
  );
}
