import { StyleSheet } from 'react-native-unistyles';

export const HEADER_HEIGHT = 250;

export const parallaxScrollViewStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: theme.spacing(8),
    gap: theme.spacing(4),
    overflow: 'hidden',
  },
}));
