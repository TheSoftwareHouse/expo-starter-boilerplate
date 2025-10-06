import { render, screen } from '@/tests';

import { Stack } from './Stack';

describe('Stack', () => {
  it('renders correctly with default props', () => {
    render(<Stack testID="test-stack" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('renders children in vertical direction by default', () => {
    render(
      <Stack testID="test-stack">
        <Stack testID="child-1" />
        <Stack testID="child-2" />
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  it('applies horizontal direction', () => {
    render(<Stack testID="test-stack" direction="horizontal" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies spacing between children with string value', () => {
    render(<Stack testID="test-stack" space="md" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies spacing between children with number value', () => {
    render(<Stack testID="test-stack" space={4} />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies gap shorthand prop', () => {
    render(<Stack testID="test-stack" gap={2} />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies padding props', () => {
    render(<Stack testID="test-stack" p="md" pt={2} px="lg" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies margin props', () => {
    render(<Stack testID="test-stack" m="sm" mt={4} mx="xl" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies justify content', () => {
    render(<Stack testID="test-stack" justify="center" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies wrap when enabled', () => {
    render(<Stack testID="test-stack" wrap />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('combines multiple props', () => {
    render(
      <Stack testID="test-stack" direction="horizontal" gap={4} p="md" m="sm" align="center" justify="between" wrap />,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });
});
