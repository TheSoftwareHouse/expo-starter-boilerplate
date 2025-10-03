import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { buttonStyles, buttonTextStyles } from './Button.styles';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  style,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={(params) => [
        buttonStyles.button,
        buttonStyles[variant],
        buttonStyles[size],
        isDisabled && buttonStyles.disabled,
        loading && buttonStyles.loading,
        params.pressed && { opacity: 0.8 },
        typeof style === 'function' ? style(params) : style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      {loading && <ActivityIndicator size="small" color="white" />}
      <Text style={[buttonTextStyles.base, buttonTextStyles[variant], buttonTextStyles[size]]}>{title}</Text>
    </Pressable>
  );
};
