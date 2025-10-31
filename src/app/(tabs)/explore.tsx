import { Image } from 'expo-image';
import { Platform, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useStyles, useAuth } from '@/hooks';
import { ExternalLink } from '@/components/ExternalLink';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/ui/Collapsible';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Box } from '@/components/ui/Box';
import { Typography } from '@/components/ui/Typography';
import { List } from '@/components/ui/List';

// Sample data for the List component demo
const sampleListData = [
  { id: '1', title: '🚀 High Performance', description: 'Legend List provides much better performance than FlatList' },
  { id: '2', title: '⚡ Dynamic Sizing', description: 'Supports dynamically sized items out of the box' },
  { id: '3', title: '🔄 Drop-in Replacement', description: 'Easy migration from FlatList with similar API' },
  { id: '4', title: '📱 Cross Platform', description: 'Works perfectly on iOS, Android, and Web' },
  { id: '5', title: '🎨 Customizable', description: 'Multiple variants and styling options available' },
];

export default function TabTwoScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme } = useStyles();

  const renderListItem = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <Box p="md" style={{ marginBottom: 8 }}>
      <Typography variant="h4" style={{ marginBottom: 4 }}>
        {item.title}
      </Typography>
      <Typography color="secondary" size="sm">
        {item.description}
      </Typography>
    </Box>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: theme.colors.border, dark: theme.colors.surface }}
      headerImage={
        <IconSymbol
          size={310}
          color={theme.colors.textMuted}
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <Box style={styles.titleContainer}>
        <Typography
          variant="h1"
          style={{
            fontFamily: Platform.select({
              ios: 'ui-rounded',
              default: 'normal',
              web: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
            }),
          }}
        >
          Explore
        </Typography>
      </Box>

      <Typography>This app includes example code to help you get started.</Typography>

      <Collapsible title="� List Component Demo">
        <Typography style={{ marginBottom: 16 }}>
          The <Typography weight="bold">List</Typography> component is a lightweight wrapper around{' '}
          <Typography weight="bold">@legendapp/list</Typography> providing better performance than FlatList:
        </Typography>

        <Typography variant="h4" style={{ marginBottom: 12 }}>
          Default Variant:
        </Typography>
        <Box style={styles.listContainer}>
          <List
            data={sampleListData}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={80}
          />
        </Box>

        <Typography variant="h4" style={{ marginBottom: 12, marginTop: 16 }}>
          Inset Variant:
        </Typography>
        <Box style={styles.listContainer}>
          <List
            variant="inset"
            padding="sm"
            data={sampleListData.slice(0, 3)}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={80}
          />
        </Box>

        <Typography style={{ marginTop: 16, fontSize: 14, opacity: 0.8 }}>
          💡 Use List instead of FlatList for better performance, especially with dynamic item sizes.
        </Typography>
      </Collapsible>

      <Collapsible title="�🔐 Protected Routes Demo">
        <Box p="md" borderRadius="md" style={styles.authInfo}>
          <Typography>
            <Typography weight="bold">Authentication Status:</Typography>{' '}
            {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </Typography>
          {user && (
            <Typography>
              <Typography weight="bold">Logged in as:</Typography> {user.firstName} {user.lastName} (@
              {user.username})
            </Typography>
          )}
          <Typography style={styles.infoText}>
            This content is only visible to authenticated users. When you logout, you&apos;ll be redirected to the login
            screen.
          </Typography>
          <Pressable style={styles.logoutButton} onPress={logout}>
            <Typography style={styles.logoutButtonText}>Logout</Typography>
          </Pressable>
        </Box>
      </Collapsible>

      <Collapsible title="File-based routing">
        <Typography>
          This app has two screens: <Typography weight="bold">app/(tabs)/index.tsx</Typography> and{' '}
          <Typography weight="bold">app/(tabs)/explore.tsx</Typography>
        </Typography>
        <Typography>
          The layout file in <Typography weight="bold">app/(tabs)/_layout.tsx</Typography> sets up the tab navigator.
        </Typography>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Typography color="primary">Learn more</Typography>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Typography>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Typography weight="bold">w</Typography> in the terminal running this project.
        </Typography>
      </Collapsible>
      <Collapsible title="Images">
        <Typography>
          For static images, you can use the <Typography weight="bold">@2x</Typography> and{' '}
          <Typography weight="bold">@3x</Typography> suffixes to provide files for different screen densities
        </Typography>
        <Image
          source={require('assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Typography color="primary">Learn more</Typography>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Typography>
          This template has light and dark mode support. The <Typography weight="bold">useStyles()</Typography> hook
          lets you access the current theme and automatically adapts UI colors and styling accordingly.
        </Typography>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Typography color="primary">Learn more</Typography>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Typography>
          This template includes an example of an animated component. The{' '}
          <Typography weight="bold">components/HelloWave.tsx</Typography> component uses the powerful{' '}
          <Typography
            weight="bold"
            style={{
              fontFamily: Platform.select({
                ios: 'ui-monospace',
                default: 'monospace',
                web: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              }),
            }}
          >
            react-native-reanimated
          </Typography>{' '}
          library to create a waving hand animation.
        </Typography>
        {Platform.select({
          ios: (
            <Typography>
              The <Typography weight="bold">components/ParallaxScrollView.tsx</Typography> component provides a parallax
              effect for the header image.
            </Typography>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  headerImage: {
    color: theme.colors.textMuted,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  listContainer: {
    height: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  authInfo: {
    backgroundColor: `${theme.colors.primary}1A`, // 10% opacity
    padding: theme.spacing(4),
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing(2),
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing(5),
    paddingVertical: theme.spacing(2.5),
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: theme.spacing(2),
  },
  logoutButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
}));
