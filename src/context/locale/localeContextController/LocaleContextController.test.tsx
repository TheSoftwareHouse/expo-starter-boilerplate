import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { fireEvent, render, screen } from '@/tests';
import { AppLocale } from '../AppLocale.enum';
import { defaultLocale } from '../defaultLocale';
import { LocaleContext } from '../localeContext/LocaleContext';

import { LocaleContextController } from './LocaleContextController';

describe('LocaleContextController', () => {
  const TestComponent = () => {
    const context = useContext(LocaleContext);

    return (
      <View>
        <TouchableOpacity testID="set-locale-button" onPress={() => context?.setLocale(AppLocale.pl)}>
          <Text>SET LOCALE</Text>
        </TouchableOpacity>
        <Text testID="context-data">
          {JSON.stringify({
            defaultLocale: context?.defaultLocale,
            locale: context?.locale,
          })}
        </Text>
      </View>
    );
  };

  test('renders its children', () => {
    render(<Text testID="test-child">TEST</Text>, {
      wrapper: ({ children }) => <LocaleContextController>{children}</LocaleContextController>,
    });

    expect(screen.getByTestId('test-child')).toBeTruthy();
    expect(screen.getByText('TEST')).toBeTruthy();
  });

  test('provides functioning locale context with default locale', () => {
    render(<TestComponent />, {
      wrapper: ({ children }) => <LocaleContextController>{children}</LocaleContextController>,
    });

    const contextData = screen.getByTestId('context-data');
    expect(contextData).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: defaultLocale,
      }),
    );
  });

  test('allows locale to be changed through context', () => {
    render(<TestComponent />, {
      wrapper: ({ children }) => <LocaleContextController>{children}</LocaleContextController>,
    });

    // Initial state should be default locale
    expect(screen.getByTestId('context-data')).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: defaultLocale,
      }),
    );

    // Change locale
    fireEvent.press(screen.getByTestId('set-locale-button'));

    // Should now show Polish locale
    expect(screen.getByTestId('context-data')).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: AppLocale.pl,
      }),
    );
  });

  test('provides setLocale function that updates locale state', () => {
    const TestSetLocaleComponent = () => {
      const context = useContext(LocaleContext);

      return (
        <View>
          <TouchableOpacity testID="set-english" onPress={() => context?.setLocale(AppLocale.en)}>
            <Text>Set English</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="set-polish" onPress={() => context?.setLocale(AppLocale.pl)}>
            <Text>Set Polish</Text>
          </TouchableOpacity>
          <Text testID="current-locale">{context?.locale}</Text>
        </View>
      );
    };

    render(<TestSetLocaleComponent />, {
      wrapper: ({ children }) => <LocaleContextController>{children}</LocaleContextController>,
    });

    // Should start with default locale
    expect(screen.getByTestId('current-locale')).toHaveTextContent(defaultLocale);

    // Switch to Polish
    fireEvent.press(screen.getByTestId('set-polish'));
    expect(screen.getByTestId('current-locale')).toHaveTextContent(AppLocale.pl);

    // Switch back to English
    fireEvent.press(screen.getByTestId('set-english'));
    expect(screen.getByTestId('current-locale')).toHaveTextContent(AppLocale.en);
  });

  test('provides correct context value shape', () => {
    const TestContextShapeComponent = () => {
      const context = useContext(LocaleContext);

      return (
        <View>
          <Text testID="has-default-locale">{context?.defaultLocale ? 'true' : 'false'}</Text>
          <Text testID="has-locale">{context?.locale ? 'true' : 'false'}</Text>
          <Text testID="has-set-locale">{typeof context?.setLocale === 'function' ? 'true' : 'false'}</Text>
        </View>
      );
    };

    render(<TestContextShapeComponent />, {
      wrapper: ({ children }) => <LocaleContextController>{children}</LocaleContextController>,
    });

    expect(screen.getByTestId('has-default-locale')).toHaveTextContent('true');
    expect(screen.getByTestId('has-locale')).toHaveTextContent('true');
    expect(screen.getByTestId('has-set-locale')).toHaveTextContent('true');
  });
});
