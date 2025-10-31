/**
 * Jest setup file to configure test environment
 * Mocks expo-constants to provide environment variables to tests
 */

// Mock expo-constants to provide environment variables to the app
// eslint-disable-next-line no-undef
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      APP_ENV: 'development',
      NAME: 'Test App',
      SCHEME: 'testapp',
      BUNDLE_ID: 'com.test.app',
      PACKAGE: 'com.test.app',
      VERSION: '1.0.0',
      EXPO_PUBLIC_API_URL: 'https://api.test.com',
      EXPO_PUBLIC_DEFAULT_LOCALE: 'en',
      EXPO_PUBLIC_SENTRY_DSN: '',
      EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: 'test-encryption-key-that-is-at-least-32-characters-long-for-jest',
    },
  },
  default: {
    expoConfig: {
      extra: {
        APP_ENV: 'development',
        NAME: 'Test App',
        SCHEME: 'testapp',
        BUNDLE_ID: 'com.test.app',
        PACKAGE: 'com.test.app',
        VERSION: '1.0.0',
        EXPO_PUBLIC_API_URL: 'https://api.test.com',
        EXPO_PUBLIC_DEFAULT_LOCALE: 'en',
        EXPO_PUBLIC_SENTRY_DSN: '',
        EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: 'test-encryption-key-that-is-at-least-32-characters-long-for-jest',
      },
    },
  },
}));
