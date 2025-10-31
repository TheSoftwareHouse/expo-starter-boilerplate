// see https://docs.expo.dev/guides/environment-variables/
import { Env } from '@/env';

import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = Env.EXPO_PUBLIC_DEFAULT_LOCALE as AppLocale;
