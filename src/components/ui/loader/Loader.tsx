import { ActivityIndicator, View } from 'react-native';

import { useStyles } from '@/hooks';

import { loaderStyles } from './Loader.styles';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
  variant?: 'default' | 'fullScreen' | 'centered';
}

export const Loader = ({ size = 'large', color, testID = 'loader', variant = 'default' }: LoaderProps) => {
  const { theme } = useStyles();

  const defaultColor = color || theme.colors.primary;

  const getContainerStyle = () => {
    switch (variant) {
      case 'fullScreen':
        return [loaderStyles.container, loaderStyles.fullScreen];
      case 'centered':
        return [loaderStyles.container, loaderStyles.centered];
      default:
        return loaderStyles.container;
    }
  };

  return (
    <View style={getContainerStyle()} testID={testID}>
      <ActivityIndicator size={size} color={defaultColor} />
    </View>
  );
};
