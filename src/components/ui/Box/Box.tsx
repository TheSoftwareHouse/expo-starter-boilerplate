import { View, type ViewProps } from 'react-native';

import { boxStyles } from './Box.styles';

export interface BoxProps extends ViewProps {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  background?: 'transparent' | 'surface' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'none' | 'sm' | 'md';
}

const getStylesForVariant = (variant: string, value: string) => {
  const key = `${variant}${value.charAt(0).toUpperCase() + value.slice(1)}` as keyof typeof boxStyles;
  return boxStyles[key] || {};
};

export const Box = ({
  padding = 'none',
  margin = 'none',
  background = 'transparent',
  borderRadius = 'none',
  shadow = 'none',
  border = 'none',
  style,
  ...props
}: BoxProps) => {
  return (
    <View
      style={[
        boxStyles.base,
        getStylesForVariant('padding', padding),
        getStylesForVariant('margin', margin),
        getStylesForVariant('background', background),
        getStylesForVariant('borderRadius', borderRadius),
        getStylesForVariant('shadow', shadow),
        getStylesForVariant('border', border),
        style,
      ]}
      {...props}
    />
  );
};
