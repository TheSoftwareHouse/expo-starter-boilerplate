import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppLocale } from '@/context/locale/AppLocale.enum';
import { useAuth, useLocale } from '@/hooks';

export default function LoginScreen() {
  const { login, isAuthenticating } = useAuth();
  const { t, locale, setLocale } = useLocale();

  const handleLogin = async () => {
    try {
      await login({ username: 'mike', password: 'demo' });
    } catch {
      Alert.alert('Login Failed', 'Please try again');
    }
  };

  const handleLanguageSwitch = () => {
    const newLocale = locale === AppLocale.en ? AppLocale.pl : AppLocale.en;
    setLocale(newLocale);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Language Switcher */}
      <View style={styles.languageSwitcher}>
        <Pressable style={styles.languageButton} onPress={handleLanguageSwitch}>
          <ThemedText style={styles.languageButtonText}>{locale === AppLocale.en ? '🇺🇸 EN' : '🇵🇱 PL'}</ThemedText>
        </Pressable>
      </View>

      <ThemedView style={styles.content}>
        <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />

        <ThemedText type="title" style={styles.title}>
          {t('home.helloWorld')}
        </ThemedText>

        <ThemedText style={styles.subtitle}>Please sign in to continue</ThemedText>

        <Pressable
          style={[styles.loginButton, isAuthenticating && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isAuthenticating}
        >
          <ThemedText style={styles.loginButtonText}>{isAuthenticating ? 'Signing in...' : 'Sign In'}</ThemedText>
        </Pressable>

        <ThemedText style={styles.demoText}>Demo credentials are automatically used</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  languageSwitcher: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  languageButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.7,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  demoText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
  },
});
