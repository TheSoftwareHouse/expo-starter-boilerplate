import { StyleSheet } from 'react-native-unistyles';

export const collapsibleStyles = StyleSheet.create((theme) => ({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(6),
  },
}));
