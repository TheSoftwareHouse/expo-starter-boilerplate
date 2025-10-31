/*
 * Client Environment Variables
 *
 * Do not modify - use root env.js to add variables.
 * Loaded via expo-constants from app.config.ts extra field.
 */

import Constants from 'expo-constants';

/**
 * @type {typeof import('../env.js').ClientEnv}
 */
export const Env = Constants.expoConfig?.extra ?? {};
