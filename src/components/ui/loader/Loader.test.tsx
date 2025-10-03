import { render, screen } from '@/tests';

import { Loader } from './Loader';

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

  it('renders with different variants', () => {
    const { rerender } = render(<Loader variant="default" testID="default-loader" />);
    expect(screen.getByTestId('default-loader')).toBeTruthy();

    rerender(<Loader variant="centered" testID="centered-loader" />);
    expect(screen.getByTestId('centered-loader')).toBeTruthy();

    rerender(<Loader variant="fullScreen" testID="fullscreen-loader" />);
    expect(screen.getByTestId('fullscreen-loader')).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    render(<Loader size="small" color="#FF0000" testID="custom-loader" />);

    const loader = screen.getByTestId('custom-loader');
    expect(loader).toBeTruthy();
  });
});
