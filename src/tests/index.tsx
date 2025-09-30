import { render, RenderOptions, RenderResult } from '@testing-library/react-native';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { ApiClientContextController } from '@/context/apiClient/apiClientContextController/ApiClientContextController';
import { AuthContext } from '@/context/auth/authContext/AuthContext';
import { AppLocale } from '@/context/locale/AppLocale.enum';
import { defaultLocale } from '@/context/locale/defaultLocale';
import { LocaleContext } from '@/context/locale/localeContext/LocaleContext';

import { WrapperProps } from './types';

const InnerWrapper = ({ children }: WrapperProps) => {
  const [locale, setLocale] = useState<AppLocale>(defaultLocale);

  return (
    <ApiClientContextController>
      <AuthContext.Provider
        value={{
          accessToken: null,
          refreshToken: null,
          expires: null,
          isAuthenticating: false,
          isAuthenticated: false,
          login: jest.fn(),
          logout: jest.fn(),
          user: undefined,
        }}
      >
        <IntlProvider onError={() => {}} defaultLocale={defaultLocale} locale={locale}>
          <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>{children}</LocaleContext.Provider>
        </IntlProvider>
      </AuthContext.Provider>
    </ApiClientContextController>
  );
};

function customRender<T>(ui: React.ReactElement<T>, options?: Omit<RenderOptions, 'queries'>): RenderResult;
function customRender<T>(ui: React.ReactElement<T>, options: RenderOptions): RenderResult;
function customRender<T>(ui: React.ReactElement<T>, options?: RenderOptions): RenderResult | RenderResult {
  const Wrapper = ({ children }: Pick<WrapperProps, 'children'>) => <InnerWrapper>{children}</InnerWrapper>;

  return render<T>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { customRender as render };
