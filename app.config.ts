import { ConfigContext, ExpoConfig } from 'expo/config';

import { ClientEnv, Env } from './env';

/**
 * Expo App Configuration
 *
 * This config uses TypeScript for better type safety and IDE support.
 * Environment variables are loaded and validated via env.js
 *
 * Docs: https://docs.expo.dev/workflow/configuration/
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  slug: Env.SLUG,
  version: Env.VERSION,
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: Env.SCHEME,
  userInterfaceStyle: 'automatic',
  owner: Env.EXPO_ACCOUNT_OWNER,
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './src/assets/images/android-icon-foreground.png',
      backgroundImage: './src/assets/images/android-icon-background.png',
      monochromeImage: './src/assets/images/android-icon-monochrome.png',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: Env.PACKAGE,
  },
  web: {
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000',
        },
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        note: 'Sentry configuration will be loaded from environment variables: SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN',
      },
    ],
    'react-native-edge-to-edge',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    // Pass client environment variables to the app
    // These will be accessible via expo-constants in src/
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
