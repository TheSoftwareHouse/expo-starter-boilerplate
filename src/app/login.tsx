import { Image } from 'expo-image';
import { Alert, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppLocale } from '@/context/locale/AppLocale.enum';
import { useAuth, useLocale } from '@/hooks';
import { Typography } from '@/components/ui/Typography';
import { Box } from '@/components/ui/Box';

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
    <Box style={styles.container}>
      {/* Language Switcher */}
      <View style={styles.languageSwitcher}>
        <Pressable style={styles.languageButton} onPress={handleLanguageSwitch}>
          <Typography style={styles.languageButtonText}>{locale === AppLocale.en ? '🇺🇸 EN' : '🇵🇱 PL'}</Typography>
        </Pressable>
      </View>

      <Box style={styles.content}>
        <Image source={require('assets/images/react-logo.png')} style={styles.logo} />

        <Typography variant="h1" style={styles.title}>
          {t('home.helloWorld')}
        </Typography>

        <Typography style={styles.subtitle}>Please sign in to continue</Typography>

        <Pressable
          style={[styles.loginButton, isAuthenticating && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isAuthenticating}
        >
          <Typography style={styles.loginButtonText}>{isAuthenticating ? 'Signing in...' : 'Sign In'}</Typography>
        </Pressable>

        <Typography style={styles.demoText}>Demo credentials are automatically used</Typography>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  languageSwitcher: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  languageButton: {
    backgroundColor: `${theme.colors.primary}1A`, // 10% opacity
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(1.5),
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: `${theme.colors.primary}4D`, // 30% opacity
  },
  languageButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(2.5),
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(10),
    textAlign: 'center',
    opacity: 0.7,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing(10),
    paddingVertical: theme.spacing(3.75),
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing(5),
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  demoText: {
    fontSize: theme.typography.fontSize.xs,
    opacity: 0.5,
    textAlign: 'center',
  },
}));
