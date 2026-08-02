import { TextInputProps } from '@expo/ui';
import { ViewStyle } from 'react-native';

export type TextFieldProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  placeholder?: string;
};
