import { render, screen } from '@/tests';
import { Typography } from '../Typography';

import { Stack } from './Stack';

describe('Stack', () => {
  it('renders correctly with default props', () => {
    render(<Stack testID="test-stack" />);
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('renders children in vertical direction by default', () => {
    render(
      <Stack testID="test-stack">
        <Typography>First</Typography>
        <Typography>Second</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  it('applies horizontal direction', () => {
    render(
      <Stack testID="test-stack" direction="horizontal">
        <Typography>First</Typography>
        <Typography>Second</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  it('applies spacing between children', () => {
    render(
      <Stack testID="test-stack" space="md">
        <Typography>First</Typography>
        <Typography>Second</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies alignment', () => {
    render(
      <Stack testID="test-stack" align="center">
        <Typography>Centered</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies justify content', () => {
    render(
      <Stack testID="test-stack" justify="center">
        <Typography>Justified</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('applies wrap when enabled', () => {
    render(
      <Stack testID="test-stack" wrap>
        <Typography>Wrapped</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });

  it('combines multiple props', () => {
    render(
      <Stack testID="test-stack" direction="horizontal" space="lg" align="center" justify="between" wrap>
        <Typography>First</Typography>
        <Typography>Second</Typography>
      </Stack>,
    );
    expect(screen.getByTestId('test-stack')).toBeTruthy();
  });
});
