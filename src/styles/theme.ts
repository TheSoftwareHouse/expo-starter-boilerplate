import { StyleSheet } from 'react-native-unistyles';

// Define the light theme based on existing Colors and enhanced with more design tokens
export const lightTheme = {
  colors: {
    // Primary colors (from existing theme)
    primary: '#0a7ea4',
    primaryLight: '#4fafd1',
    primaryDark: '#075c7a',

    // Secondary colors
    secondary: '#FF6B6B',
    secondaryLight: '#FF8E8E',
    secondaryDark: '#E55555',

    // Background colors (from existing theme)
    background: '#fff',
    surface: '#F8F9FA',
    card: '#FFFFFF',

    // Text colors (from existing theme)
    text: '#11181C',
    textSecondary: '#687076',
    textMuted: '#9BA1A6',

    // Interactive colors
    tint: '#0a7ea4', // from existing theme
    link: '#0a7ea4',
    success: '#28A745',
    warning: '#FFC107',
    error: '#FF3B30',
    info: '#17A2B8',

    // UI elements
    border: '#E1E5E9',
    divider: '#F0F0F0',
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Icons and tabs (from existing theme)
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    tabBackground: '#FFFFFF',
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      xxxxl: 48,
    },
    fontWeight: {
      light: '300' as const,
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      linear: 'linear' as const,
      ease: 'ease' as const,
      easeIn: 'ease-in' as const,
      easeOut: 'ease-out' as const,
      easeInOut: 'ease-in-out' as const,
    },
  },
  // Helper functions
  spacing: (value: number) => value * 4,
};

// Define the dark theme
export const darkTheme = {
  colors: {
    // Primary colors (adjusted for dark mode)
    primary: '#4fafd1',
    primaryLight: '#7ac5dd',
    primaryDark: '#2a9bc7',

    // Secondary colors
    secondary: '#FF8E8E',
    secondaryLight: '#FFB3B3',
    secondaryDark: '#FF6B6B',

    // Background colors (from existing theme)
    background: '#151718',
    surface: '#1C1E1F',
    card: '#252729',

    // Text colors (from existing theme)
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textMuted: '#687076',

    // Interactive colors
    tint: '#fff', // from existing theme
    link: '#4fafd1',
    success: '#30D158',
    warning: '#FFD60A',
    error: '#FF453A',
    info: '#5AC8FA',

    // UI elements
    border: '#3A3D40',
    divider: '#2C2F32',
    overlay: 'rgba(0, 0, 0, 0.7)',

    // Icons and tabs (from existing theme)
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    tabBackground: '#151718',
  },
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  animation: lightTheme.animation,
  // Helper functions
  spacing: lightTheme.spacing,
};

// Define the themes object
export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

// Define breakpoints for responsive design
export const breakpoints = {
  xs: 0, // Required breakpoint with value 0
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// TypeScript declarations for type safety
type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

// Configure Unistyles
StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    adaptiveThemes: true, // Automatically switch between light/dark based on system preference
  },
});

// Export types for use throughout the app
export type Theme = typeof lightTheme;
export type ThemeColors = Theme['colors'];
export type ThemeSpacing = typeof lightTheme.spacing;
export type ThemeBorderRadius = Theme['borderRadius'];
export type ThemeTypography = Theme['typography'];
export type ThemeShadows = Theme['shadows'];
export type ThemeAnimation = Theme['animation'];
