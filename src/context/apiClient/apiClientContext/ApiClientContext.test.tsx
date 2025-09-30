import { render, screen } from '@/tests';
import { Text } from 'react-native';

import { ApiClientContext } from './ApiClientContext';

describe('ApiClientContext', () => {
  test('correctly receive strategy', () => {
    render(
      <ApiClientContext.Consumer>
        {(context) => <Text testID="context-type">{typeof context}</Text>}
      </ApiClientContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTestId('context-type')).toBeTruthy();
  });
});
