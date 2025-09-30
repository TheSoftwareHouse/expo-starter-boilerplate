import { logger } from '@/integrations/logger';

// Mock Sentry functions for testing
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  reactNativeTracingIntegration: jest.fn(),
  httpClientIntegration: jest.fn(),
  mobileReplayIntegration: jest.fn(),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      sentryDsn: 'https://test-dsn@sentry.io/123456',
    },
  },
}));

describe('logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console methods
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have all required methods', () => {
    expect(logger).toHaveProperty('init');
    expect(logger).toHaveProperty('error');
    expect(logger).toHaveProperty('warning');
    expect(logger).toHaveProperty('info');
  });

  it('should initialize without errors', () => {
    expect(() => logger.init()).not.toThrow();
  });

  it('should log error messages', () => {
    const testMessage = 'Test error message';
    expect(() => logger.error(testMessage)).not.toThrow();
  });

  it('should log warning messages', () => {
    const testMessage = 'Test warning message';
    expect(() => logger.warning(testMessage)).not.toThrow();
  });

  it('should log info messages', () => {
    const testMessage = 'Test info message';
    expect(() => logger.info(testMessage)).not.toThrow();
  });

  it('should handle Error objects', () => {
    const testError = new Error('Test error');
    expect(() => logger.error(testError)).not.toThrow();
  });
});
