import { ThemedText } from "@/components/themed-text";
import { useRouter } from "expo-router";

type AuthHelperTextProps = Readonly<{
  type: "login" | "signup";
}>;

export default function AuthHelperText({ type }: AuthHelperTextProps) {
  const router = useRouter();

  const labelText = (type: "login" | "signup") => {
    switch (type) {
      case "login":
        return "Don't have an account? ";
      case "signup":
        return "Already have an account? ";
    }
  };

  const routerPath = (type: "login" | "signup") => {
    switch (type) {
      case "login":
        return "./SignUp";
      case "signup":
        return "./Login";
    }
  };

  return (
    <ThemedText
      style={{ textAlign: "center", fontWeight: "400", fontSize: 14 }}
    >
      {labelText(type)}
      <ThemedText
        themeColor="primary"
        style={{ fontWeight: "500", fontSize: 14 }}
        onPress={() => router.push(routerPath(type))}
      >
        {type === "login" ? "Sign Up" : "Login"}
      </ThemedText>
    </ThemedText>
  );
}
