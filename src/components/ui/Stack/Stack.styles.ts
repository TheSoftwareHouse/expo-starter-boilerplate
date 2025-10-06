import { StyleSheet } from 'react-native-unistyles';

export const stackStyles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'column',
  },

  // Direction variants
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },

  // Alignment variants
  alignStart: { alignItems: 'flex-start' },
  alignCenter: { alignItems: 'center' },
  alignEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },

  // Justify variants
  justifyStart: { justifyContent: 'flex-start' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },

  // Wrap variants
  wrap: { flexWrap: 'wrap' },
  nowrap: { flexWrap: 'nowrap' },
}));
