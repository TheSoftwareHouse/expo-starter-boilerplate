import { View, type ViewProps } from 'react-native';

import { stackStyles } from './Stack.styles';

export interface StackProps extends ViewProps {
  direction?: 'horizontal' | 'vertical';
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
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
  space = 'none',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  style,
  ...props
}: StackProps) => {
  return (
    <View
      style={[
        stackStyles.stack,
        getStyleForVariant('', direction),
        getStyleForVariant('space', space),
        getStyleForVariant('align', align),
        getStyleForVariant('justify', justify),
        wrap ? stackStyles.wrap : stackStyles.nowrap,
        style,
      ]}
      {...props}
    />
  );
};
