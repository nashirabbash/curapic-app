import React from 'react';
import { TextProps as ExpoTextProps } from '@expo/ui';

export type CurapicTextVariant = 
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline'
  | 'footnote'
  | 'caption1'
  | 'caption2';

export type CurapicTextWeight = 'regular' | 'semibold' | 'bold';

export type CurapicTextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | (string & {});

export type TextProps = Omit<ExpoTextProps, 'children' | 'textStyle'> & {
  children?: string;
  variant?: CurapicTextVariant;
  weight?: CurapicTextWeight;
  color?: CurapicTextColor;
  align?: 'left' | 'center' | 'right';
  italic?: boolean;
  // Expose textStyle separately to allow overriding while keeping custom props
  textStyle?: ExpoTextProps['textStyle'] & { fontStyle?: 'normal' | 'italic' }; 
};
