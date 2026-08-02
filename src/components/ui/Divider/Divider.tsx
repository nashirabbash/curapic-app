import React from 'react';
import { View } from 'react-native';
import type { DividerProps } from './types';

export function Divider({ orientation = 'horizontal', thickness = 1, color = '#E0E0E0' }: DividerProps) {
  return (
    <View
      style={[
        orientation === 'horizontal'
          ? { height: thickness, width: '100%', backgroundColor: color }
          : { width: thickness, height: '100%', backgroundColor: color },
      ]}
    />
  );
}
