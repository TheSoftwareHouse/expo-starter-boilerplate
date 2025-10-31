/* eslint-env node */
/*
 * Environment Variable Configuration & Validation
 *
 * This file provides centralized environment variable management with Zod validation.
 * ⚠️ IMPORTANT: Do NOT import this file into your src/ folder - use `import { Env } from '@/env'` instead.
 *
 * Architecture:
 * 1. Client variables: Available in src/ via @/env (API URLs, feature flags, etc)
 * 2. Build-time variables: Only used in app.config.ts (bundle IDs, EAS config, etc)
 *
 * Usage:
 * - In app.config.ts: `import { Env, ClientEnv } from './env'`
 * - In src/ code: `import { Env } from '@/env'`
 *
 * Validation:
 * - Build fails if required variables are missing or invalid
 * - All variables are type-safe with full TypeScript inference
 * - Detailed error messages guide you to fix configuration issues
 */

/**
 * PART 1: Load Environment Variables
 *
 * Uses dotenv to load the correct .env file based on APP_ENV:
 * - APP_ENV=development → .env.development (default)
 * - APP_ENV=staging → .env.staging
 * - APP_ENV=production → .env.production
 *
 * APP_ENV is set by:
 * - EAS build profiles in eas.json (automatically)
 * - Inline when running commands: APP_ENV=staging npm start
 */
const z = require('zod');

const packageJSON = require('./package.json');
const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
// eslint-disable-next-line no-undef
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

/**
 * PART 2: Static App Configuration
 *
 * ⚠️ TEMPLATE CONFIGURATION - Update these values for your app:
 *
 * Base values for app identifiers that are transformed based on APP_ENV
 * to support multiple app variants (development, staging, production) on one device.
 *
 * These constants are kept here (not in .env) because they're modified by helper
 * functions to create environment-specific identifiers.
 *
 * Setup Instructions:
 * 1. Replace BUNDLE_ID with your iOS Bundle ID / Android Package Name
 *    Example: 'com.yourcompany.yourapp'
 *
 * 2. Replace NAME with your app's display name
 *    Example: 'My Awesome App'
 *
 * 3. Replace SLUG with your Expo slug (lowercase, no spaces)
 *    Example: 'my-awesome-app'
 *
 * 4. Replace EXPO_ACCOUNT_OWNER with your Expo account username
 *    Find at: https://expo.dev/accounts/[your-account]/settings
 *
 * 5. Replace EAS_PROJECT_ID with your project's EAS ID
 *    Get it by running: npx eas init
 *    Or find at: https://expo.dev/accounts/[account]/projects/[project]/settings
 *
 * 6. Replace SCHEME with your app's URL scheme (for deep links)
 *    Example: 'myapp' → opens with myapp://
 */

const BUNDLE_ID = 'com.yourcompany.expostarterboilerplate'; // Base iOS bundle identifier
const PACKAGE = 'com.yourcompany.expostarterboilerplate'; // Android package name
const NAME = 'Expo Starter'; // Base app name
const SLUG = 'expo-starter-boilerplate'; // Base Expo slug
const EXPO_ACCOUNT_OWNER = 'your-expo-account'; // Expo account owner (username or organization)
const EAS_PROJECT_ID = 'your-eas-project-id'; // EAS project ID (get from: npx eas init)
const SCHEME = 'expostarterboilerplate'; // Base URL scheme for deep links

/**
 * PART 3: App Variant Configuration Functions
 *
 * These functions generate environment-specific identifiers to support
 * multiple app variants (dev, staging, production) on a single device.
 *
 * Based on: https://docs.expo.dev/tutorial/eas/multiple-app-variants/
 */

/**
 * Get unique bundle identifier for the app variant
 *
 * Allows installing multiple app variants simultaneously.
 *
 * @param {string} identifier - The base bundle identifier or package name
 *
 * @returns {string} Environment-specific identifier
 * @example
 * // APP_ENV=development → "com.yourcompany.yourapp.dev"
 * // APP_ENV=staging     → "com.yourcompany.yourapp.staging"
 * // APP_ENV=production  → "com.yourcompany.yourapp"
 */
const getUniqueIdentifier = (identifier) => {
  if (APP_ENV === 'development') {
    return `${identifier}.dev`;
  }

  if (APP_ENV === 'staging') {
    return `${identifier}.staging`;
  }

  return identifier; // production
};

/**
 * Get app name for the variant
 *
 * @returns {string} Environment-specific app name
 * @example
 * // APP_ENV=development → "My App (Dev)"
 * // APP_ENV=staging     → "My App (Staging)"
 * // APP_ENV=production  → "My App"
 */
const getAppName = () => {
  if (APP_ENV === 'development') {
    return `${NAME} (Dev)`;
  }

  if (APP_ENV === 'staging') {
    return `${NAME} (Staging)`;
  }

  return NAME; // production
};

/**
 * Get unique URL scheme for the app variant
 *
 * Prevents deep link conflicts between variants.
 *
 * @returns {string} Environment-specific URL scheme
 * @example
 * // APP_ENV=development → "myapp-dev"
 * // APP_ENV=staging     → "myapp-staging"
 * // APP_ENV=production  → "myapp"
 */
const getScheme = () => {
  if (APP_ENV === 'development') {
    return `${SCHEME}-dev`;
  }

  if (APP_ENV === 'staging') {
    return `${SCHEME}-staging`;
  }

  return SCHEME; // production
};

/**
 * PART 4: Zod Validation Schemas
 *
 * Type-safe schemas with runtime validation.
 *
 * CLIENT VARIABLES: Available in src/ via @/env
 * BUILD-TIME VARIABLES: Only in app.config.ts
 *
 * To add variables:
 * 1. Add to schema (client or buildTime)
 * 2. Add to _clientEnv or _buildTimeEnv object
 * 3. Types are automatically inferred
 *
 * Docs: https://zod.dev
 */

/**
 * Client variables (accessible in src/ via @/env)
 */
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(), // App name with environment suffix
  SCHEME: z.string(), // URL scheme for deep links
  BUNDLE_ID: z.string(), // iOS Bundle Identifier
  PACKAGE: z.string(), // Android Package Name
  VERSION: z.string(), // App version from package.json

  // Environment variables from .env files
  EXPO_PUBLIC_SENTRY_DSN: z.string().optional(),
  EXPO_PUBLIC_API_URL: z.string().optional(),
  EXPO_PUBLIC_DEFAULT_LOCALE: z.string().optional(),
  EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: z.string().optional(),
});

/**
 * Build-time variables (only in app.config.ts)
 */
const buildTime = z.object({
  SLUG: z.string(),
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  // Sentry build-time variables
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

/**
 * PART 5: Environment Variable Values
 *
 * Values from helper functions, process.env, and package.json
 */

/**
 * @type {Record<keyof z.infer<typeof client>, unknown>}
 */
const _clientEnv = {
  // Dynamic configuration based on APP_ENV
  APP_ENV,
  NAME: getAppName(), // "Expo Starter (Dev)" | "Expo Starter (Staging)" | "Expo Starter"
  SCHEME: getScheme(), // "expostarterboilerplate-dev" | "expostarterboilerplate-staging" | "expostarterboilerplate"
  BUNDLE_ID: getUniqueIdentifier(BUNDLE_ID), // "com.yourcompany.expostarterboilerplate.dev" | "com.yourcompany.expostarterboilerplate.staging" | "com.yourcompany.expostarterboilerplate"
  PACKAGE: getUniqueIdentifier(PACKAGE), // "com.yourcompany.expostarterboilerplate.dev" | "com.yourcompany.expostarterboilerplate.staging" | "com.yourcompany.expostarterboilerplate"
  VERSION: packageJSON.version, // From package.json

  // Environment variables from .env files
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_DEFAULT_LOCALE: process.env.EXPO_PUBLIC_DEFAULT_LOCALE,
  EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime>, unknown>}
 */
const _buildTimeEnv = {
  SLUG,
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
  // Sentry build-time variables
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
};

/**
 * PART 6: Validation & Export
 *
 * Build fails if validation fails.
 */

// Merge client and build-time variables for validation
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

// Validate against merged schema
const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

// Handle validation errors
if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
    `\n❌ Missing or invalid variables in .env.${APP_ENV} file.`,
    `\n📝 Make sure all required variables are defined in .env.${APP_ENV}`,
    `\n💡 Tip: If you recently updated the .env file, restart with: npm start -- --clear`,
  );
  throw new Error('Invalid environment variables, Check terminal for more details');
}

/**
 * All validated variables (for app.config.ts)
 */
const Env = parsed.data;

/**
 * Client variables (for src/ via @/env)
 */
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  getUniqueIdentifier,
  getAppName,
  getScheme,
};
