// see https://docs.expo.dev/guides/environment-variables/
import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = (process.env.EXPO_PUBLIC_DEFAULT_LOCALE as AppLocale) || AppLocale.en;
