/**
 * Logger service for Expo/React Native applications
 *
 * This logger integrates with Sentry for error tracking and performance monitoring
 * in production, while providing console logging in development.
 *
 * Features:
 * - Automatic Sentry initialization with React Native optimizations
 * - Console logging in development mode
 * - Session replay with privacy protection
 * - Performance and network monitoring
 * - Automatic error capture
 *
 * Environment Variables:
 * - EXPO_PUBLIC_SENTRY_DSN: Your Sentry DSN for error reporting
 * - SENTRY_ORG: Your Sentry organization (for build-time configuration)
 * - SENTRY_PROJECT: Your Sentry project (for build-time configuration)
 * - SENTRY_AUTH_TOKEN: Your Sentry auth token (for build-time configuration)
 *
 * @example
 * ```typescript
 * import { logger } from '@/integrations/logger';
 *
 * // Initialize logger (done automatically in app layout)
 * logger.init();
 *
 * // Log messages
 * logger.error('Something went wrong');
 * logger.warning('This is a warning');
 * logger.info('This is info');
 *
 * // Log errors
 * logger.error(new Error('An error occurred'));
 * ```
 */

import {
  captureException,
  captureMessage,
  httpClientIntegration,
  init,
  mobileReplayIntegration,
  reactNativeTracingIntegration,
} from '@sentry/react-native';
import Constants from 'expo-constants';

type LogLevel = 'error' | 'info' | 'warning';
type Logger = Record<LogLevel, (message: string | Error) => void> & Record<string, unknown>;

const initLogger = () => {
  const sentryDsn = Constants.expoConfig?.extra?.sentryDsn || process.env.EXPO_PUBLIC_SENTRY_DSN;

  if (!sentryDsn) {
    // eslint-disable-next-line no-console
    console.warn('Sentry DSN not found. Logger will work in development mode only.');
    return;
  }

  return init({
    dsn: sentryDsn,
    integrations: [
      httpClientIntegration({
        failedRequestStatusCodes: [[400, 599]],
        failedRequestTargets: [/.*/],
      }),
      reactNativeTracingIntegration(),
      mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
        maskAllVectors: true,
      }),
    ],
    tracesSampleRate: __DEV__ ? 1.0 : 0.1,
    debug: __DEV__,
    enableNativeFramesTracking: true,
    enableAutoSessionTracking: true,
  });
};

const sendLog = (level: LogLevel, message: string | Error) => {
  if (__DEV__) {
    // In development, also log to console for easier debugging
    // eslint-disable-next-line no-console
    console[level === 'warning' ? 'warn' : level](message);
  }

  if (typeof message === 'string') {
    captureMessage(message, { level });
  } else {
    captureException(message, { level });
  }
};

export const logger = {
  init: initLogger,
  error: (message: string | Error) => sendLog('error', message),
  warning: (message: string | Error) => sendLog('warning', message),
  info: (message: string | Error) => sendLog('info', message),
} satisfies Logger;
