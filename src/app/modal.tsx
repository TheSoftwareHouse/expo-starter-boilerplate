import { Link } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

import { Box } from '@/components/ui/Box';
import { Typography } from '@/components/ui/Typography';

export default function ModalScreen() {
  return (
    <Box style={styles.container}>
      <Typography variant="h1">This is a modal</Typography>
      <Link href="/" dismissTo style={styles.link}>
        <Typography color="primary">Go to home screen</Typography>
      </Link>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
