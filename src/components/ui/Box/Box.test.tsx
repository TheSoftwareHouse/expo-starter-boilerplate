import { render, screen } from '@/tests';

import { Box } from './Box';

describe('Box', () => {
  it('renders correctly with default props', () => {
    render(<Box testID="test-box" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies padding variant', () => {
    render(<Box testID="test-box" p="md" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies padding with number value', () => {
    render(<Box testID="test-box" p={4} />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies shorthand padding props', () => {
    render(<Box testID="test-box" pt="md" pb={2} pl="sm" pr={1} />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies shorthand margin props', () => {
    render(<Box testID="test-box" mt="lg" mb={3} ml="xs" mr={2} />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies horizontal and vertical spacing', () => {
    render(<Box testID="test-box" px="md" py={4} mx="lg" my={2} />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('applies shorthand props', () => {
    render(<Box testID="test-box" p="sm" m="md" />);
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
    render(<Box testID="test-box" p="md" background="surface" borderRadius="lg" shadow="md" border="sm" />);
    expect(screen.getByTestId('test-box')).toBeTruthy();
  });

  it('combines shorthand and variant props', () => {
    render(<Box testID="test-box" pt={2} mb="lg" px="md" background="primary" borderRadius="xl" shadow="lg" />);
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
