import TextField from "@/components/ui/TextField";
import { useNativeState } from "@expo/ui";

type StepLike = { placeholder: string; type: "text" | "email" | "password" };
type StepInput = { placeholder: string; type: string };
const KEYBOARD_TYPE: Record<StepLike["type"], "email-address" | "default"> = {
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
  readonly step: StepInput;
  readonly initialValue: string;
  readonly onChange: (value: string) => void;
  readonly errorMessage?: string;
}) {
  const input = useNativeState(initialValue);
  const type = step.type as StepLike["type"];
  return (
    <TextField
      placeholder={step.placeholder}
      isPassword={type === "password"}
      keyboardType={KEYBOARD_TYPE[type]}
      value={input}
      onChangeText={onChange}
      errorMessage={errorMessage}
    />
  );
}