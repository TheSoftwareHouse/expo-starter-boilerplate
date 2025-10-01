import { render, screen } from '@/tests';

import { Loader } from './loader';

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeTruthy();
  });

  it('renders with custom testID', () => {
    render(<Loader testID="custom-loader" />);

    const loader = screen.getByTestId('custom-loader');
    expect(loader).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeTruthy();
  });
});
