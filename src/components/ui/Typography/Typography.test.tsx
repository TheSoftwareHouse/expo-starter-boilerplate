import { render, screen } from '@/tests';

import { Typography } from './Typography';

describe('Typography', () => {
  it('renders text with default props', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('applies h1 variant', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1')).toBeTruthy();
  });

  it('applies h2 variant', () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2')).toBeTruthy();
  });

  it('applies h3 variant', () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByText('Heading 3')).toBeTruthy();
  });

  it('applies body variant', () => {
    render(<Typography variant="body">Body text</Typography>);
    expect(screen.getByText('Body text')).toBeTruthy();
  });

  it('applies caption variant', () => {
    render(<Typography variant="caption">Caption text</Typography>);
    expect(screen.getByText('Caption text')).toBeTruthy();
  });

  it('applies size prop', () => {
    render(<Typography size="lg">Large text</Typography>);
    expect(screen.getByText('Large text')).toBeTruthy();
  });

  it('applies weight prop', () => {
    render(<Typography weight="bold">Bold text</Typography>);
    expect(screen.getByText('Bold text')).toBeTruthy();
  });

  it('applies color prop', () => {
    render(<Typography color="primary">Primary text</Typography>);
    expect(screen.getByText('Primary text')).toBeTruthy();
  });

  it('applies align prop', () => {
    render(<Typography align="center">Centered text</Typography>);
    expect(screen.getByText('Centered text')).toBeTruthy();
  });

  it('combines multiple style props', () => {
    render(
      <Typography size="lg" weight="bold" color="primary" align="center">
        Styled text
      </Typography>,
    );
    expect(screen.getByText('Styled text')).toBeTruthy();
  });

  it('variant takes precedence over individual props', () => {
    render(
      <Typography variant="h1" size="sm" weight="light">
        Title with variant
      </Typography>,
    );
    expect(screen.getByText('Title with variant')).toBeTruthy();
  });

  it('accepts custom style prop', () => {
    render(<Typography style={{ opacity: 0.5 }}>Custom styled text</Typography>);
    expect(screen.getByText('Custom styled text')).toBeTruthy();
  });

  it('passes through other Text props', () => {
    render(
      <Typography testID="typography-test" numberOfLines={1}>
        Text with props
      </Typography>,
    );
    expect(screen.getByTestId('typography-test')).toBeTruthy();
  });
});
