import { Divider } from "@/components/ui/Divider";
import { useTheme } from "@/hooks/use-theme";
import EyeIcon from "@expo/material-symbols/visibility.xml";
import EyeSlashIcon from "@expo/material-symbols/visibility_off.xml";
import { Column, Icon, Row, Spacer, TextInput } from "@expo/ui";
import { fillMaxWidth, weight } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import Text from "../Text";
import { TextFieldProps } from "./type";
export default function TextField({
  label,
  errorMessage,
  isPassword,
  containerStyle,
  style,
  placeholder,
  ...props
}: TextFieldProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Column spacing={10}>
      {label && (
        <Text variant="headline" weight="semibold">
          {label}
        </Text>
      )}
      <Column>
        <Row
          style={{ borderColor: "black", paddingVertical: 14 }}
          alignment="center"
          modifiers={[fillMaxWidth()]}
        >
          <TextInput
            modifiers={[weight(1)]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            {...(props as any)}
          />
          <Spacer flexible />
          {isPassword && (
            <Icon
              name={Icon.select({
                ios: isPasswordVisible ? "eye" : "eye.slash",
                android: isPasswordVisible ? EyeIcon : EyeSlashIcon,
              })}
              size={20}
              onPress={togglePasswordVisibility}
              color={theme.textSecondary}
            />
          )}
        </Row>
        <Divider color={isFocused ? theme.accents.blue : theme.separator} />
      </Column>
      {errorMessage && (
        <Text variant="caption1" color={theme.accents.red}>
          {errorMessage}
        </Text>
      )}
    </Column>
  );
}

export * from "./type";
