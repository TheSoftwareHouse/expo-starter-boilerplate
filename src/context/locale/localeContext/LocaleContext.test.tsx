import { Text } from 'react-native';

import { render, screen } from '@/tests';

import { LocaleContext } from './LocaleContext';

describe('LocaleContext', () => {
  test('is undefined by default', () => {
    render(
      <LocaleContext.Consumer>
        {(context) => <Text testID="context-type">{typeof context}</Text>}
      </LocaleContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTestId('context-type')).toHaveTextContent('undefined');
  });
});
