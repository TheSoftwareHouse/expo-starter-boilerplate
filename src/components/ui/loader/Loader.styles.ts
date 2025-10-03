import { StyleSheet } from 'react-native-unistyles';

export const loaderStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${theme.colors.overlay}80`, // 50% opacity
    zIndex: 1000,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}));
