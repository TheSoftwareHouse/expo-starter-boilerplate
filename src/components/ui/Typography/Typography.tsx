import { Text, type TextProps } from 'react-native';

import { typographyStyles } from './Typography.styles';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'muted' | 'link' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
}

export const Typography = ({ variant, size, weight, color, align, style, ...props }: TypographyProps) => {
  const variantStyle = variant ? typographyStyles[variant] : {};
  const sizeStyle = size ? typographyStyles[size] : {};
  const weightStyle = weight ? typographyStyles[weight] : {};
  const colorStyle = color ? typographyStyles[color] : {};
  const alignStyle = align ? typographyStyles[align] : {};

  return (
    <Text
      style={[typographyStyles.base, variantStyle, sizeStyle, weightStyle, colorStyle, alignStyle, style]}
      {...props}
    />
  );
};
