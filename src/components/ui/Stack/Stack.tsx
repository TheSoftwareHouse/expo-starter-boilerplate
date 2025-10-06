import { View, type ViewProps } from 'react-native';

import { useStyles } from '@/hooks';
import { SpacingValue, SpacingProps, getSpacingValue, createSpacingStyles } from '@/utils/spacing';

import { stackStyles } from './Stack.styles';

export interface StackProps extends ViewProps, SpacingProps {
  direction?: 'horizontal' | 'vertical';

  // Main space prop
  space?: SpacingValue;

  // Shorthand spacing props
  gap?: SpacingValue; // alias for space

  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

const getStyleForVariant = (variant: string, value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? stackStyles[variant as keyof typeof stackStyles] || {} : {};
  }
  const key = `${variant}${value.charAt(0).toUpperCase() + value.slice(1)}` as keyof typeof stackStyles;
  return stackStyles[key] || {};
};

export const Stack = ({
  direction = 'vertical',
  space,
  gap,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  style,
  // Extract spacing props
  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  m,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  ...props
}: StackProps) => {
  const { theme } = useStyles();

  // Create spacing styles from spacing props
  const spacingStyles = createSpacingStyles({ p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my }, theme);

  // Create gap styles
  const gapStyles = {
    ...(getSpacingValue(space || gap, theme) !== undefined && {
      gap: getSpacingValue(space || gap, theme),
    }),
  };

  return (
    <View
      style={[
        stackStyles.container,
        getStyleForVariant('', direction),
        getStyleForVariant('align', align),
        getStyleForVariant('justify', justify),
        wrap ? stackStyles.wrap : stackStyles.nowrap,
        spacingStyles,
        gapStyles,
        style,
      ]}
      {...props}
    />
  );
};
