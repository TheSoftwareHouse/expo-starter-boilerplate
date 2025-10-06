import { View, type ViewProps } from 'react-native';

import { useStyles } from '@/hooks';
import { SpacingProps, createSpacingStyles } from '@/utils/spacing';

import { boxStyles } from './Box.styles';

export interface BoxProps extends ViewProps, SpacingProps {
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
  // Shorthand padding props
  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,

  // Shorthand margin props
  m,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,

  background = 'transparent',
  borderRadius = 'none',
  shadow = 'none',
  border = 'none',
  style,
  ...props
}: BoxProps) => {
  const { theme } = useStyles();

  // Create spacing styles using shared utility
  const spacingStyles = createSpacingStyles({ p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my }, theme);

  return (
    <View
      style={[
        boxStyles.base,
        getStylesForVariant('background', background),
        getStylesForVariant('borderRadius', borderRadius),
        getStylesForVariant('shadow', shadow),
        getStylesForVariant('border', border),
        spacingStyles,
        style,
      ]}
      {...props}
    />
  );
};
