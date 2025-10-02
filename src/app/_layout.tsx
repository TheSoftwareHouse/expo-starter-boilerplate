import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Loader } from '@/components/ui/loader';
import { useAuth } from '@/hooks';
import { useColorScheme } from '@/hooks/useColorScheme';
import { logger } from '@/integrations/logger';
import { AppProviders } from '@/providers/AppProviders';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize logger on app start
    logger.init();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Protected routes - only accessible when authenticated */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>

        {/* Public routes - only accessible when not authenticated */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <AppLayout />
    </AppProviders>
  );
}
