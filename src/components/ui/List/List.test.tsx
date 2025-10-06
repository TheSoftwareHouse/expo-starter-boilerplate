import React from 'react';
import { Text } from 'react-native';

import { render, screen } from '@/tests';

import { List } from './List';

const mockData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

const renderItem = ({ item }: { item: { id: string; name: string } }) => (
  <Text testID={`item-${item.id}`}>{item.name}</Text>
);

describe('List', () => {
  it('renders list component correctly', () => {
    render(
      <List
        testID="list-container"
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item: { id: string; name: string }) => item.id}
      />,
    );

    expect(screen.getByTestId('list-container')).toBeDefined();
  });

  it('renders without errors', () => {
    expect(() => {
      render(
        <List data={mockData} renderItem={renderItem} keyExtractor={(item: { id: string; name: string }) => item.id} />,
      );
    }).not.toThrow();
  });

  it('renders with different variants', () => {
    expect(() => {
      render(
        <List
          variant="inset"
          data={mockData}
          renderItem={renderItem}
          keyExtractor={(item: { id: string; name: string }) => item.id}
        />,
      );
    }).not.toThrow();
  });

  it('handles empty data gracefully', () => {
    expect(() => {
      render(<List data={[]} renderItem={renderItem} keyExtractor={(item: { id: string; name: string }) => item.id} />);
    }).not.toThrow();
  });
});
