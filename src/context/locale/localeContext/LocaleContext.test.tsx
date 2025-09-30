import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { LocaleContext } from './LocaleContext';

describe('LocaleContext', () => {
  test('is undefined by default', () => {
    render(
      <LocaleContext.Consumer>
        {(context) => <Text testID="context-type">{typeof context}</Text>}
      </LocaleContext.Consumer>,
    );

    expect(screen.getByTestId('context-type')).toHaveTextContent('undefined');
  });
});
