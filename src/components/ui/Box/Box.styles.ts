import { StyleSheet } from 'react-native-unistyles';

export const boxStyles = StyleSheet.create((theme) => ({
  base: {
    // Base box styles
  },

  // Padding variants
  paddingNone: { padding: 0 },
  paddingXs: { padding: theme.spacing(1) },
  paddingSm: { padding: theme.spacing(2) },
  paddingMd: { padding: theme.spacing(4) },
  paddingLg: { padding: theme.spacing(6) },
  paddingXl: { padding: theme.spacing(8) },
  paddingXxl: { padding: theme.spacing(12) },

  // Margin variants
  marginNone: { margin: 0 },
  marginXs: { margin: theme.spacing(1) },
  marginSm: { margin: theme.spacing(2) },
  marginMd: { margin: theme.spacing(4) },
  marginLg: { margin: theme.spacing(6) },
  marginXl: { margin: theme.spacing(8) },
  marginXxl: { margin: theme.spacing(12) },

  // Background variants
  backgroundTransparent: { backgroundColor: 'transparent' },
  backgroundSurface: { backgroundColor: theme.colors.surface },
  backgroundDefault: { backgroundColor: theme.colors.background },
  backgroundPrimary: { backgroundColor: theme.colors.primary },
  backgroundSecondary: { backgroundColor: theme.colors.secondary },
  backgroundSuccess: { backgroundColor: theme.colors.success },
  backgroundWarning: { backgroundColor: theme.colors.warning },
  backgroundError: { backgroundColor: theme.colors.error },

  // Border radius variants
  borderRadiusNone: { borderRadius: 0 },
  borderRadiusXs: { borderRadius: theme.borderRadius.xs },
  borderRadiusSm: { borderRadius: theme.borderRadius.sm },
  borderRadiusMd: { borderRadius: theme.borderRadius.md },
  borderRadiusLg: { borderRadius: theme.borderRadius.lg },
  borderRadiusXl: { borderRadius: theme.borderRadius.xl },
  borderRadiusFull: { borderRadius: theme.borderRadius.full },

  // Shadow variants
  shadowNone: {},
  shadowSm: theme.shadows.sm,
  shadowMd: theme.shadows.md,
  shadowLg: theme.shadows.lg,

  // Border variants
  borderNone: {},
  borderSm: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  borderMd: {
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
}));
