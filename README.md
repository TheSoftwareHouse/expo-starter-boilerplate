# Expo Starter Boilerplate

This is an [Expo](https://expo.dev) project created with
[`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and modified by the TSH team.

## How to bootstrap your Expo project

To create a new project using this boilerplate template:

1. **Use this template**: Click the "Use this template" button on the GitHub repository page, or clone the repository:

   ```bash
   git clone https://github.com/TheSoftwareHouse/expo-starter-boilerplate.git your-project-name
   cd your-project-name
   ```

   **Alternative - Clone with clean history**: If you want to start with a fresh git history (single commit):

   ```bash
   git clone --depth 1 https://github.com/TheSoftwareHouse/expo-starter-boilerplate.git your-project-name
   cd your-project-name
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Update project details**: Modify the `app.json` file to reflect your project's name, slug, and other configuration
   details.

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure environment**: Copy and configure your environment variables:

   ```bash
   cp .env.example .env.local
   ```

5. **Initialize translations** (optional): If you plan to use internationalization:

   ```bash
   npx babelsheet2 init
   ```

6. **Start developing**: Your project is ready! You can now start the development server and begin building your app.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses
[file-based routing](https://docs.expo.dev/router/introduction).

## Native Development Setup

For native development and building production apps, you'll need to set up the native development environment:

### Prerequisites

- **Node.js**: Version 22 or newer
- **Git**: For version control
- **Watchman** (recommended): For better performance on macOS/Linux

### Android Development

1. **Install Android Studio**: Download and install [Android Studio](https://developer.android.com/studio)
2. **Configure Android SDK**: Follow the
   [Expo Android Studio setup guide](https://docs.expo.dev/workflow/android-studio-emulator/)
3. **Set up environment variables**: Configure `ANDROID_HOME` and add platform-tools to your PATH
4. **Create or start an emulator**: Set up an Android Virtual Device (AVD) through Android Studio

### iOS Development (macOS only)

1. **Install Xcode**: Download from the [Mac App Store](https://apps.apple.com/app/xcode/id497799835)
2. **Install Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```
3. **Install iOS Simulator**: Follow the [Expo iOS Simulator setup guide](https://docs.expo.dev/workflow/ios-simulator/)
4. **Install CocoaPods** (if using bare workflow):
   ```bash
   sudo gem install cocoapods
   ```

### Additional Setup Resources

- [Expo Development Build](https://docs.expo.dev/develop/development-builds/introduction/) - For custom native code
- [EAS Build](https://docs.expo.dev/build/introduction/) - Cloud-based build service
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) - Detailed native setup guide

### Verify Your Setup

To check if your development environment is properly configured, you can use these diagnostic tools:

1. **Expo Doctor**: Diagnose and validate your Expo development environment

   ```bash
   npx expo-doctor
   ```

2. **React Native Doctor**: Check your React Native development setup (for bare workflow projects)

   ```bash
   npx @react-native-community/cli doctor
   ```

3. **Manual verification**: Try running the project on different platforms

   ```bash
   # Start the development server
   npm start

   # Test on iOS simulator (press 'i' in terminal or scan QR code)
   # Test on Android emulator (press 'a' in terminal or scan QR code)
   ```

These tools will help identify missing dependencies, incorrect configurations, or environment issues that might prevent
your app from running properly.

## Translation Management

This project uses [babelsheet2](https://github.com/TheSoftwareHouse/babelsheet2) for managing translations. Babelsheet2
is a tool that allows you to sync translations between Google Sheets and your React/React Native applications, making it
easy to collaborate with translators and content managers.

### Setup

1. Initialize babelsheet2 configuration:

   ```bash
   npx babelsheet2 init
   ```

2. Configure your Google Sheets integration in the generated `babelsheet.json` file with your spreadsheet details.

3. Fetch translations from your configured Google Sheet:

   ```bash
   npm run fetch-translations
   ```

The translations will be automatically downloaded and formatted for use in your application.

## Logging

This project uses Sentry for error tracking and logging in production. The logger service is automatically initialized
when the app starts.

### Setup

1. Copy the environment variables from `.env.example` to your `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Configure your Sentry credentials in the `.env` file:
   ```env
   EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
   SENTRY_ORG=your-sentry-organization
   SENTRY_PROJECT=your-sentry-project
   SENTRY_AUTH_TOKEN=your-sentry-auth-token
   ```

### Usage

Import and use the logger anywhere in your app:

```typescript
import { logger } from '@/integrations/logger';

// Log an error
logger.error('Something went wrong');
logger.error(new Error('An error occurred'));

// Log a warning
logger.warning('This is a warning message');

// Log info
logger.info('This is an info message');
```

The logger automatically:

- Sends logs to Sentry in production
- Logs to console in development for easier debugging
- Captures performance traces and user interactions
- Records session replays (with sensitive data masked)

### Features

- **React Native Integration**: Uses `@sentry/react-native` for optimal mobile performance
- **Development Mode**: Console logging enabled in development
- **Production Optimized**: Lower sampling rates and optimized settings for production
- **Session Replay**: Automatically captures user sessions with privacy protection
- **Performance Monitoring**: Tracks app performance and network requests
- **Error Boundary Integration**: Automatically captures unhandled errors

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our
  [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll
  create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## How to Contribute

Anyone and everyone is welcome to contribute. Start by checking out the list of
[open issues](https://github.com/TheSoftwareHouse/expo-starter-boilerplate/issues).

However, if you decide to get involved, please take a moment to review the [guidelines](CONTRIBUTING.md).

## License

Copyright © 2021-present The Software House. This source code is licensed under the MIT license found in the
[LICENSE](LICENSE.md) file.

---

<sup>
Made with ♥ by The Software House (<a href="https://tsh.io">website</a>, <a href="https://tsh.io/blog">blog</a>)
and <a href="https://github.com/TheSoftwareHouse/expo-starter-boilerplate/graphs/contributors">contributors</a>.
</sup>
