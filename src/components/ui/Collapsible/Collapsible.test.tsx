import { render, screen, fireEvent } from '@/tests';

import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  it('renders with title', () => {
    render(
      <Collapsible title="Test Title">
        <span>Test Content</span>
      </Collapsible>,
    );

    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('starts closed by default', () => {
    render(
      <Collapsible title="Test Title">
        <span>Test Content</span>
      </Collapsible>,
    );

    expect(screen.queryByTestId('collapsible-content')).toBeFalsy();
  });

  it('can start open with defaultOpen prop', () => {
    render(
      <Collapsible title="Test Title" defaultOpen={true}>
        <span>Test Content</span>
      </Collapsible>,
    );

    expect(screen.getByTestId('collapsible-content')).toBeTruthy();
  });

  it('toggles open/closed when header is pressed', () => {
    render(
      <Collapsible title="Test Title">
        <span>Test Content</span>
      </Collapsible>,
    );

    const header = screen.getByTestId('collapsible-header');

    // Initially closed
    expect(screen.queryByTestId('collapsible-content')).toBeFalsy();

    // Click to open
    fireEvent.press(header);
    expect(screen.getByTestId('collapsible-content')).toBeTruthy();

    // Click to close
    fireEvent.press(header);
    expect(screen.queryByTestId('collapsible-content')).toBeFalsy();
  });

  it('renders with custom testID', () => {
    render(
      <Collapsible title="Test Title" testID="custom-collapsible">
        <span>Test Content</span>
      </Collapsible>,
    );

    expect(screen.getByTestId('custom-collapsible')).toBeTruthy();
    expect(screen.getByTestId('custom-collapsible-header')).toBeTruthy();
  });
});
