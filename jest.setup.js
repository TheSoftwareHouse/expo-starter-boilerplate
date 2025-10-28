/**
 * Jest setup file to configure test environment
 * Sets up global environment variables before tests run
 */

// Set up test environment variables
process.env.EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.test.com';
process.env.EXPO_PUBLIC_DEFAULT_LOCALE = process.env.EXPO_PUBLIC_DEFAULT_LOCALE || 'en';
process.env.EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY =
  process.env.EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY ||
  'test-encryption-key-that-is-at-least-32-characters-long-for-jest';
process.env.NODE_ENV = 'test';
