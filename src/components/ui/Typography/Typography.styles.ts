import { StyleSheet } from 'react-native-unistyles';

export const typographyStyles = StyleSheet.create((theme) => ({
  base: {
    color: theme.colors.text,
  },

  // Size variants
  xs: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
  },
  sm: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
  md: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
  },
  lg: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
  },
  xl: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
  },
  xxl: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl * theme.typography.lineHeight.normal,
  },
  xxxl: {
    fontSize: theme.typography.fontSize.xxxl,
    lineHeight: theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
  },

  // Weight variants
  light: { fontWeight: theme.typography.fontWeight.light },
  normal: { fontWeight: theme.typography.fontWeight.normal },
  medium: { fontWeight: theme.typography.fontWeight.medium },
  semibold: { fontWeight: theme.typography.fontWeight.semibold },
  bold: { fontWeight: theme.typography.fontWeight.bold },
  extrabold: { fontWeight: theme.typography.fontWeight.extrabold },

  // Color variants
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.textSecondary },
  muted: { color: theme.colors.textMuted },
  link: { color: theme.colors.link },
  success: { color: theme.colors.success },
  warning: { color: theme.colors.warning },
  error: { color: theme.colors.error },

  // Text align variants
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },

  // Preset variants
  h1: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
  },
  h2: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.xxl * theme.typography.lineHeight.tight,
  },
  h3: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
  },
  h4: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
  },
  body: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
  },
  caption: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    color: theme.colors.textSecondary,
  },
}));
