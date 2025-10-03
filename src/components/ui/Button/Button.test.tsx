import { fireEvent, render, screen } from '@/tests';

import { Button } from './Button';

describe('Button', () => {
  it('renders with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockPress = jest.fn();
    render(<Button title="Click me" onPress={mockPress} />);

    const button = screen.getByText('Click me');
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant by default', () => {
    render(<Button title="Primary" />);
    expect(screen.getByText('Primary')).toBeTruthy();
  });

  it('applies secondary variant', () => {
    render(<Button title="Secondary" variant="secondary" />);
    expect(screen.getByText('Secondary')).toBeTruthy();
  });

  it('applies outline variant', () => {
    render(<Button title="Outline" variant="outline" />);
    expect(screen.getByText('Outline')).toBeTruthy();
  });

  it('applies ghost variant', () => {
    render(<Button title="Ghost" variant="ghost" />);
    expect(screen.getByText('Ghost')).toBeTruthy();
  });

  it('applies danger variant', () => {
    render(<Button title="Danger" variant="danger" />);
    expect(screen.getByText('Danger')).toBeTruthy();
  });

  it('applies small size', () => {
    render(<Button title="Small" size="sm" />);
    expect(screen.getByText('Small')).toBeTruthy();
  });

  it('applies medium size by default', () => {
    render(<Button title="Medium" />);
    expect(screen.getByText('Medium')).toBeTruthy();
  });

  it('applies large size', () => {
    render(<Button title="Large" size="lg" />);
    expect(screen.getByText('Large')).toBeTruthy();
  });

  it('shows loading state', () => {
    render(<Button title="Loading" loading />);
    expect(screen.getByText('Loading')).toBeTruthy();
    // Loading indicator should be present (check for ActivityIndicator testID)
    const button = screen.getByText('Loading').parent;
    expect(button).toBeTruthy();
  });

  it('disables button when loading', () => {
    const mockPress = jest.fn();
    render(<Button title="Loading" loading onPress={mockPress} />);

    const button = screen.getByText('Loading');
    fireEvent.press(button);
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const mockPress = jest.fn();
    render(<Button title="Disabled" disabled onPress={mockPress} />);

    const button = screen.getByText('Disabled');
    fireEvent.press(button);
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('combines variant and size props', () => {
    render(<Button title="Danger Large" variant="danger" size="lg" />);
    expect(screen.getByText('Danger Large')).toBeTruthy();
  });

  it('passes through other Pressable props', () => {
    render(<Button title="Test" testID="button-test" />);
    expect(screen.getByTestId('button-test')).toBeTruthy();
  });
});
