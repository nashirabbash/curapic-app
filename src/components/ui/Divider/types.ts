import type { ColorValue } from 'react-native';

export interface DividerProps {
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The thickness of the divider line.
   * Note: On iOS (SwiftUI), thickness might not be visibly altered without specific modifiers.
   * @default 1
   */
  thickness?: number;
  /**
   * The color of the divider.
   * Note: On iOS (SwiftUI), color is not supported directly without modifiers.
   */
  color?: ColorValue;
}
