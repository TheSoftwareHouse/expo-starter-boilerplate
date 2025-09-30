import { ReactNode } from 'react';
import { Text } from 'react-native';

import { render, screen } from '@/tests';

import { ApiClientContextController } from './ApiClientContextController';

describe('ApiClientContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  test('renders its children', () => {
    render(
      <ApiClientContextController>
        <Text>TEST</Text>
      </ApiClientContextController>,
      { wrapper },
    );

    expect(screen.getByText(/TEST/)).toBeTruthy();
  });
});
