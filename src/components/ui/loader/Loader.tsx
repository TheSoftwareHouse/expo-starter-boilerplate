import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
}

export const Loader = ({ size = 'large', color, testID = 'loader' }: LoaderProps) => {
  const colorScheme = useColorScheme();

  const defaultColor = color || (colorScheme === 'dark' ? '#FFFFFF' : '#000000');

  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size={size} color={defaultColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
