import { Image, type ImageSource } from 'expo-image';
import { Link } from 'expo-router';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAuth } from '@/hooks';
import { HelloWave } from '@/components/HelloWave';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { Stack, Typography, Box, Button } from '@/components/ui';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image source={require('@/assets/images/partial-react-logo.png') as ImageSource} style={styles.reactLogo} />
      }
    >
      <Stack direction="horizontal" align="center" gap="sm">
        <Typography variant="h1">Welcome!</Typography>
        <HelloWave />
      </Stack>

      <Stack gap="sm">
        <Typography variant="h2">🔐 Authentication Status</Typography>
        <Box background="surface" p="md" borderRadius="md" border="sm">
          <Stack gap="sm">
            <Typography>
              <Typography weight="semibold">Status:</Typography> Authenticated ✅
            </Typography>
            {user && (
              <>
                <Typography>
                  <Typography weight="semibold">User:</Typography> {user.firstName} {user.lastName}
                </Typography>
                <Typography>
                  <Typography weight="semibold">Username:</Typography> {user.username}
                </Typography>
              </>
            )}
            <Button title="Logout" variant="danger" size="md" onPress={logout} />
          </Stack>
        </Box>
      </Stack>

      <Stack gap="sm">
        <Typography variant="h3">Step 1: Try it</Typography>
        <Typography>
          Edit <Typography weight="semibold">app/(tabs)/index.tsx</Typography> to see changes. Press{' '}
          <Typography weight="semibold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Typography>{' '}
          to open developer tools.
        </Typography>
      </Stack>

      <Stack gap="sm">
        <Link href="/modal">
          <Link.Trigger>
            <Typography variant="h3">Step 2: Explore</Typography>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={() => alert('Share pressed')} />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction title="Delete" icon="trash" destructive onPress={() => alert('Delete pressed')} />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <Typography>{`Tap the Explore tab to learn more about what's included in this starter app.`}</Typography>
      </Stack>

      <Stack gap="sm">
        <Typography variant="h3">Step 3: Get a fresh start</Typography>
        <Typography>
          {`When you're ready, run `}
          <Typography weight="semibold">npm run reset-project</Typography> to get a fresh{' '}
          <Typography weight="semibold">app</Typography> directory. This will move the current{' '}
          <Typography weight="semibold">app</Typography> to <Typography weight="semibold">app-example</Typography>.
        </Typography>
      </Stack>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
