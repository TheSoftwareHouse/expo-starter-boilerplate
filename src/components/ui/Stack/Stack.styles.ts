import { StyleSheet } from 'react-native-unistyles';

export const stackStyles = StyleSheet.create((theme) => ({
  stack: {
    flexDirection: 'column',
  },

  // Direction variants
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },

  // Spacing variants
  spaceNone: { gap: 0 },
  spaceXs: { gap: theme.spacing(1) },
  spaceSm: { gap: theme.spacing(2) },
  spaceMd: { gap: theme.spacing(4) },
  spaceLg: { gap: theme.spacing(6) },
  spaceXl: { gap: theme.spacing(8) },
  spaceXxl: { gap: theme.spacing(12) },

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
