// see https://docs.expo.dev/guides/environment-variables/
import { env } from '@/env';

import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = env.EXPO_PUBLIC_DEFAULT_LOCALE as AppLocale;
