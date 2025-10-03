import { StyleSheet } from 'react-native-unistyles';

export const buttonStyles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },

  // Variant styles
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: theme.colors.error,
  },

  // Size styles
  sm: {
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1),
    minHeight: 32,
  },
  md: {
    paddingHorizontal: theme.spacing(4),
    paddingVertical: theme.spacing(2),
    minHeight: 40,
  },
  lg: {
    paddingHorizontal: theme.spacing(6),
    paddingVertical: theme.spacing(4),
    minHeight: 48,
  },

  // State styles
  disabled: {
    opacity: 0.6,
  },
  loading: {
    opacity: 0.8,
  },
}));

export const buttonTextStyles = StyleSheet.create((theme) => ({
  // Base text styles
  base: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Variant text styles
  primary: {
    color: theme.colors.background,
  },
  secondary: {
    color: theme.colors.background,
  },
  outline: {
    color: theme.colors.primary,
  },
  ghost: {
    color: theme.colors.primary,
  },
  danger: {
    color: theme.colors.background,
  },

  // Size text styles
  sm: {
    fontSize: theme.typography.fontSize.sm,
  },
  md: {
    fontSize: theme.typography.fontSize.md,
  },
  lg: {
    fontSize: theme.typography.fontSize.lg,
  },
}));
