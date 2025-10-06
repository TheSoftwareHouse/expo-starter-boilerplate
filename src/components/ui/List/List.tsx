import React from 'react';
import { LegendList, type LegendListProps } from '@legendapp/list';
import type { ViewStyle } from 'react-native';

import { useStyles } from '@/hooks';

export type ListProps<T> = LegendListProps<T> & {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'separated' | 'inset';
};

export const List = <T,>({
  variant = 'default',
  padding = 'none',
  style,
  contentContainerStyle,
  ...props
}: ListProps<T>) => {
  const { theme } = useStyles();

  // Create variant styles for the main container
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'separated':
        return { backgroundColor: theme.colors.background };
      case 'inset':
        return {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          overflow: 'hidden',
        };
      default:
        return { backgroundColor: 'transparent' };
    }
  };

  // Create padding styles for the content container
  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'xs':
        return { padding: theme.spacing(1) };
      case 'sm':
        return { padding: theme.spacing(2) };
      case 'md':
        return { padding: theme.spacing(4) };
      case 'lg':
        return { padding: theme.spacing(6) };
      default:
        return { padding: 0 };
    }
  };

  return (
    <LegendList<T>
      style={[getVariantStyle(), style]}
      contentContainerStyle={[getPaddingStyle(), contentContainerStyle]}
      {...props}
    />
  );
};
