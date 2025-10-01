import { Text } from 'react-native';

import { render, screen } from '@/tests';

import { AuthContext } from './AuthContext';

describe('AuthContext', () => {
  test('is undefined by default', () => {
    render(
      <AuthContext.Consumer>{(context) => <Text testID="context-type">{typeof context}</Text>}</AuthContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTestId('context-type')).toHaveTextContent('undefined');
  });
});
