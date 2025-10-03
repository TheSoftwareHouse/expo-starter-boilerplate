import { render, screen } from '@/tests';

import { Box } from './Box';

describe('Box', () => {
  it('renders correctly with default props', () => {
    render(<Box testID="test-box" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies padding variant', () => {
    render(<Box testID="test-box" padding="md" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies background variant', () => {
    render(<Box testID="test-box" background="surface" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies border radius variant', () => {
    render(<Box testID="test-box" borderRadius="lg" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies shadow variant', () => {
    render(<Box testID="test-box" shadow="md" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies border variant', () => {
    render(<Box testID="test-box" border="sm" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('combines multiple variants', () => {
    render(<Box testID="test-box" padding="md" background="surface" borderRadius="lg" shadow="md" border="sm" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('renders children correctly', () => {
    render(
      <Box testID="test-box">
        <Box testID="child-box" />
      </Box>,
    );
    expect(screen.getByTestId('test-box')).toBeTruthy();
    expect(screen.getByTestId('child-box')).toBeTruthy();
  });
});
