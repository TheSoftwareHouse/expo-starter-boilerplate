import { z } from 'zod/v4';

/**
 * Client-side environment variables (embedded in app bundle)
 * These must be prefixed with EXPO_PUBLIC_ to be inlined by Metro bundler
 *
 * IMPORTANT: Only these variables are validated and exported for use in the app.
 * Server-side variables are NOT validated here to avoid build failures.
 */
const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url('EXPO_PUBLIC_API_URL must be a valid URL'),
  EXPO_PUBLIC_DEFAULT_LOCALE: z.enum(['en', 'pl']),
  EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: z
    .string()
    .min(32, 'EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY must be at least 32 characters'),
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

/**
 * Validates and parses client-side environment variables
 * Throws an error if validation fails
 *
 * IMPORTANT: Each environment variable must be explicitly referenced as process.env.VAR_NAME
 * for Expo's Metro bundler to properly inline EXPO_PUBLIC_* variables at build time.
 * Using process.env object destructuring or dynamic access will NOT work.
 */
function validateClientEnv() {
  // Explicitly reference each environment variable for Expo Metro bundler inlining
  const envVars = {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_DEFAULT_LOCALE: process.env.EXPO_PUBLIC_DEFAULT_LOCALE || 'en',
    EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY,
    EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  };

  const result = clientEnvSchema.safeParse(envVars);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((err) => `  - ${err.path.join('.')}: ${err.message}`).join('\n');

    throw new Error(`❌ Client environment variable validation failed:\n${formattedErrors}`);
  }

  return result.data;
}

/**
 * Validated client-side environment variables
 * Import this instead of using process.env directly
 *
 * @example
 * import { env } from '@/env';
 * const apiUrl = env.EXPO_PUBLIC_API_URL;
 *
 * Note: Only EXPO_PUBLIC_* variables are available here.
 * Server-side variables (SENTRY_ORG, etc.) are not validated or exported
 * to prevent build failures when they're missing.
 */
export const env = validateClientEnv();

/**
 * Type-safe client environment variables
 */
export type ClientEnv = z.infer<typeof clientEnvSchema>;
