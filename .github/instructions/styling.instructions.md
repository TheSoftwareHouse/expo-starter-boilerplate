# Styling with React Native Unistyles v3 Instructions

## Overview

This project uses **React Native Unistyles v3** for styling, theming, and responsive design. Unistyles provides a
powerful StyleSheet replacement with built-in theming, breakpoints, variants, and advanced styling features while
maintaining compatibility with React Native's styling system.

## Core Styling Principles

### 1. Use Unistyles StyleSheet Instead of React Native StyleSheet

**Always import `StyleSheet` from `react-native-unistyles`, never from `react-native`, and use the project's custom
`useStyles` hook:**

```typescript
// ✅ Correct
import { StyleSheet } from 'react-native-unistyles';
import { useStyles } from '@/hooks';

// ❌ Wrong
import { StyleSheet } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
```

### 2. Style Merging Best Practices

**Always use array syntax for merging styles - NEVER spread Unistyles objects:**

```typescript
// ✅ Correct - Use array syntax
<View style={[styles.container, additionalStyle]} />

// ✅ Correct - Merge with conditional styles
<View style={[
  styles.base,
  isActive && styles.active,
  { marginTop: theme.spacing(2) }
]} />

// ❌ Wrong - Don't spread Unistyles
<View style={{ ...styles.container, ...additionalStyle }} />

// ❌ Wrong - Avoid unpredictable behavior
<View style={{ ...styles.dynamic({ variant: 'primary' }) }} />
```

**Why array syntax is important:**

- Prevents unpredictable behavior with dynamic styles
- Maintains proper style resolution order
- Ensures consistent performance across platforms

### 3. Spacing Function

**Use the spacing function for all spacing values. The function multiplies by 4px base unit:**

```typescript
theme.spacing(1); // 4px
theme.spacing(2); // 8px
theme.spacing(4); // 16px
theme.spacing(6); // 24px
theme.spacing(8); // 32px
theme.spacing(12); // 48px
theme.spacing(16); // 64px
```

### 2. Theme-Aware Styling

**All styles should use the theme system for colors, spacing, typography:**

```typescript
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useStyles } from '@/hooks';

const MyComponent = () => {
  const { theme } = useStyles();

  const styles = StyleSheet.create((theme) => ({
    container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing(4),
    borderRadius: theme.borderRadius.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.md,
    marginTop: theme.spacing(2),
  },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
    </View>
  );
};
```

### 3. Responsive Design with Breakpoints

**Use breakpoints for responsive layouts:**

```typescript
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    padding: theme.spacing(4),
    variants: {
      size: {
        small: {
          padding: theme.spacing(2),
        },
        large: {
          padding: theme.spacing(6),
        },
      },
    },
    // Responsive design using breakpoints
    ':sm': {
      padding: theme.spacing(6),
    },
    ':md': {
      padding: theme.spacing(8),
      flexDirection: 'row',
    },
    ':lg': {
      padding: theme.spacing(12),
    },
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    ':sm': {
      fontSize: theme.typography.fontSize.lg,
    },
    ':md': {
      fontSize: theme.typography.fontSize.xl,
    },
  },
}));
```

## Theme Configuration

### 1. Available Theme Tokens

The project includes comprehensive design tokens:

```typescript
// Colors
theme.colors.primary; // Primary brand color
theme.colors.secondary; // Secondary color
theme.colors.background; // Background color
theme.colors.surface; // Surface color (cards, etc.)
theme.colors.text; // Primary text color
theme.colors.textSecondary; // Secondary text color
theme.colors.textMuted; // Muted text color
theme.colors.success; // Success state color
theme.colors.warning; // Warning state color
theme.colors.error; // Error state color

// Spacing (multiplies by 4px base unit)
theme.spacing(1); // 4px
theme.spacing(2); // 8px
theme.spacing(4); // 16px
theme.spacing(6); // 24px
theme.spacing(8); // 32px
theme.spacing(12); // 48px
theme.spacing(16); // 64px

// Typography
theme.typography.fontSize.xs; // 12px
theme.typography.fontSize.sm; // 14px
theme.typography.fontSize.md; // 16px
theme.typography.fontSize.lg; // 18px
theme.typography.fontSize.xl; // 20px
theme.typography.fontSize.xxl; // 24px

theme.typography.fontWeight.light; // '300'
theme.typography.fontWeight.normal; // '400'
theme.typography.fontWeight.medium; // '500'
theme.typography.fontWeight.semibold; // '600'
theme.typography.fontWeight.bold; // '700'

// Border Radius
theme.borderRadius.xs; // 4px
theme.borderRadius.sm; // 8px
theme.borderRadius.md; // 12px
theme.borderRadius.lg; // 16px
theme.borderRadius.xl; // 24px
theme.borderRadius.full; // 9999px (pill shape)

// Shadows
theme.shadows.sm; // Small shadow
theme.shadows.md; // Medium shadow
theme.shadows.lg; // Large shadow

// Helper Functions
theme.spacing(2); // Returns 8px (2 * 4px)
```

### 2. Dynamic Theme Switching

**The theme automatically switches between light and dark based on system preferences:**

```typescript
const MyComponent = () => {
  const { theme, rt } = useStyles();

  // Check current theme
  const isDark = rt.themeName === 'dark';

  // Access current theme tokens
  const backgroundColor = theme.colors.background;

  return (
    <View style={{ backgroundColor }}>
      <Text>Current theme: {rt.themeName}</Text>
    </View>
  );
};
```

## Component Styling Patterns

### 1. File Structure Convention

**Always define StyleSheets in separate files following this naming convention:**

```
ComponentName.tsx -> ComponentName.styles.ts
```

**Files should be on the same folder level:**

```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.styles.ts
│   └── Button.test.tsx
└── Card/
    ├── Card.tsx
    ├── Card.styles.ts
    └── Card.test.tsx
```

**Example implementation:**

```typescript
// Button.styles.ts
import { StyleSheet } from 'react-native-unistyles';

export const buttonStyles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
      },
      size: {
        small: {
          paddingHorizontal: theme.spacing(2),
          paddingVertical: theme.spacing(1),
        },
        medium: {
          paddingHorizontal: theme.spacing(4),
          paddingVertical: theme.spacing(2),
        },
        large: {
          paddingHorizontal: theme.spacing(6),
          paddingVertical: theme.spacing(4),
        },
      },
    },
  },
  text: {
    fontWeight: theme.typography.fontWeight.semibold,
    variants: {
      variant: {
        primary: {
          color: 'white',
        },
        secondary: {
          color: theme.colors.text,
        },
      },
      size: {
        small: {
          fontSize: theme.typography.fontSize.sm,
        },
        medium: {
          fontSize: theme.typography.fontSize.md,
        },
        large: {
          fontSize: theme.typography.fontSize.lg,
        },
      },
    },
  },
}));
```

```typescript
// Button.tsx
import { Text, Pressable } from 'react-native';
import { buttonStyles } from './Button.styles';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
}

export const Button = ({ title, variant = 'primary', size = 'medium', onPress }: ButtonProps) => {
  return (
    <Pressable style={buttonStyles.button({ variant, size })} onPress={onPress}>
      <Text style={buttonStyles.text({ variant, size })}>{title}</Text>
    </Pressable>
  );
};
```

### 2. UI Component System

**Use the project's UI component system for consistent styling:**

```typescript
import { Box, Stack, Typography, Button } from '@/components/ui';

const MyComponent = () => (
  <Box background="surface" padding="md" borderRadius="lg" shadow="md">
    <Stack space="md">
      <Typography variant="h1">Main Title</Typography>
      <Typography variant="h3" color="secondary">Subtitle</Typography>
      <Typography color="muted">Description text</Typography>
      <Button title="Click me" variant="primary" size="md" onPress={() => {}} />
    </Stack>
  </Box>
);
```

**Available UI Components:**

- **Box**: Layout container with padding, margin, background, borders, shadows
- **Stack**: Flexible container for arranging children with consistent spacing
- **Typography**: Text component with size, weight, color, and preset variants
- **Button**: Interactive button with variants, sizes, and loading states

### 3. Conditional Styling Based on Theme

```typescript
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.colors.background,
    // Conditional styling based on theme
    ...(rt.themeName === 'dark' && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    }),
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing(4),
    borderRadius: theme.borderRadius.lg,
    // Add shadow only in light mode
    ...(rt.themeName === 'light' && theme.shadows.md),
  },
}));
```

## Responsive Design

### 1. Breakpoint Usage

**Use breakpoints for responsive layouts that adapt to different screen sizes:**

```typescript
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing(4),
    // Mobile first approach
    ':sm': {
      // Tablets and up
      padding: theme.spacing(6),
      flexDirection: 'row',
    },
    ':md': {
      // Desktop and up
      padding: theme.spacing(8),
      maxWidth: 1200,
      alignSelf: 'center',
    },
  },
  sidebar: {
    width: '100%',
    ':sm': {
      width: '30%',
    },
    ':md': {
      width: '25%',
    },
  },
  content: {
    width: '100%',
    marginTop: theme.spacing(4),
    ':sm': {
      width: '70%',
      marginTop: 0,
      marginLeft: theme.spacing(4),
    },
    ':md': {
      width: '75%',
      marginLeft: theme.spacing(6),
    },
  },
}));
```

### 2. Dynamic Styling with Runtime

```typescript
import { useStyles } from '@/hooks';

const ResponsiveComponent = () => {
  const { rt } = useStyles();

  // Access current breakpoint
  const isMobile = rt.breakpoint === 'xs';
  const isTablet = rt.breakpoint === 'sm' || rt.breakpoint === 'md';
  const isDesktop = rt.breakpoint === 'lg' || rt.breakpoint === 'xl';

  // Access screen dimensions
  const screenWidth = rt.screen.width;
  const screenHeight = rt.screen.height;

  return (
    <View>
      <Text>Current breakpoint: {rt.breakpoint}</Text>
      <Text>Screen size: {screenWidth}x{screenHeight}</Text>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </View>
  );
};
```

## Advanced Unistyles Features

### 1. Media Queries for Precise Control

**Use media queries for pixel-perfect responsive design:**

```typescript
import { StyleSheet, mq } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    // Media queries provide more precise control than breakpoints
    backgroundColor: {
      [mq.only.width(240, 380)]: theme.colors.primary,
      [mq.only.width(380)]: theme.colors.secondary,
    },
  },
  advanced: {
    padding: theme.spacing(4),
    // Combine width and height media queries
    padding: {
      [mq.width(400).and.height(600)]: theme.spacing(6),
      [mq.only.height(300, 500)]: theme.spacing(2),
    },
  },
  responsive: {
    fontSize: theme.typography.fontSize.md,
    // Mix breakpoints with media queries (media queries have higher priority)
    fontSize: {
      sm: theme.typography.fontSize.lg, // Breakpoint
      [mq.only.width(200, 400)]: theme.typography.fontSize.xl, // Will override breakpoint
    },
  },
}));
```

**Media Query Reference:**

```typescript
// Available combinations
mq.only.width(100, 200); // width from 100 to 199
mq.only.height(300, 500); // height from 300 to 499
mq.width(400).and.height(600); // width 400+ AND height 600+
mq.height(500).and.width(300); // height 500+ AND width 300+

// With breakpoints
mq.only.width(200, 'xl'); // from 200 to xl breakpoint
mq.only.width('sm', 'md'); // from sm to md breakpoint
mq.only.width(null, 800); // from 0 to 799
mq.only.width(500); // from 500 onwards
```

### 2. Compound Variants for Complex Styling

**Handle complex variant combinations with compound variants:**

```typescript
const styles = StyleSheet.create((theme) => ({
  button: {
    padding: theme.spacing(2),
    borderRadius: theme.borderRadius.md,
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
      },
      size: {
        small: {
          padding: theme.spacing(1),
        },
        large: {
          padding: theme.spacing(4),
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
    // Apply special styles when multiple conditions are met
    compoundVariants: [
      {
        variant: 'primary',
        size: 'large',
        // When variant is primary AND size is large
        styles: {
          boxShadow: theme.shadows.lg,
          transform: [{ scale: 1.05 }],
        },
      },
      {
        variant: 'secondary',
        disabled: true,
        // When variant is secondary AND disabled is true
        styles: {
          backgroundColor: theme.colors.disabled,
          borderColor: theme.colors.border,
        },
      },
    ],
  },
}));

// Usage with TypeScript inference
<Pressable style={styles.button({
  variant: 'primary',
  size: 'large',
  disabled: false
})} />
```

### 3. Third-party Component Integration with withUnistyles

**Wrap third-party components to make them theme-aware:**

```typescript
import { withUnistyles } from 'react-native-unistyles';
import { Blurhash } from 'react-native-blurhash';
import { Button } from 'react-native';

// Auto-mapping for style props
const StyledBlurhash = withUnistyles(Blurhash);

// Custom prop mapping
const StyledButton = withUnistyles(Button, (theme, rt) => ({
  color: theme.colors.primary,
  backgroundColor: rt.themeName === 'dark' ? theme.colors.surface : 'transparent',
}));

// Dynamic prop mapping with uniProps
const MyComponent = ({ isDisabled }) => {
  return (
    <StyledButton
      uniProps={(theme, rt) => ({
        color: isDisabled ? theme.colors.disabled : theme.colors.primary,
        backgroundColor: rt.themeName === 'dark' ? theme.colors.surface : 'transparent',
      })}
      title="Click me"
    />
  );
};
```

**Props resolution priority:**

1. Global mappings (from withUnistyles second parameter)
2. `uniProps` (dynamic mapping)
3. Inline props (highest priority)

### 4. Keyboard Avoidance Integration

**Use runtime insets for automatic keyboard handling:**

```typescript
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    // Automatically adjust for keyboard using IME insets
    transform: [
      {
        translateY: -rt.insets.ime, // Negative value to move content up
      },
    ],
  },
  inputContainer: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    right: theme.spacing(4),
    // Add keyboard padding
    paddingBottom: rt.insets.ime,
  },
}));
```

### 5. Display and Hide Components

**Show/hide components based on screen size:**

```typescript
import { Display, Hide, mq } from 'react-native-unistyles';

const ResponsiveComponent = () => {
  return (
    <View>
      {/* Show only on small devices */}
      <Display mq={mq.only.width(0, 400)}>
        <Text>Mobile navigation</Text>
      </Display>

      {/* Hide on large devices */}
      <Hide mq={mq.only.width(800)}>
        <Text>This is hidden on desktop</Text>
      </Hide>

      {/* Show only in landscape mode */}
      <Display mq={mq.only.width(600).and.height(0, 400)}>
        <Text>Landscape content</Text>
      </Display>
    </View>
  );
};
```

### 6. Breakpoint Management

**Access current breakpoint and registered breakpoints:**

```typescript
import { useStyles } from '@/hooks';

const BreakpointInfo = () => {
  const { rt } = useStyles();

  // Check current breakpoint
  const isMobile = rt.breakpoint === 'xs';
  const isTablet = rt.breakpoint === 'sm' || rt.breakpoint === 'md';
  const isDesktop = rt.breakpoint === 'lg' || rt.breakpoint === 'xl';

  // Access all registered breakpoints
  const breakpoints = rt.breakpoints;

  return (
    <View>
      <Text>Current: {rt.breakpoint}</Text>
      <Text>Screen: {rt.screen.width}x{rt.screen.height}</Text>
      <Text>Available: {Object.keys(breakpoints).join(', ')}</Text>

      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </View>
  );
};
```

### 7. Built-in Orientation Breakpoints

**Use landscape and portrait breakpoints on mobile:**

```typescript
const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: {
      portrait: theme.colors.background,
      landscape: theme.colors.surface,
    },
    padding: {
      portrait: theme.spacing(4),
      landscape: theme.spacing(2),
    },
  },
}));
```

## Animation Integration

### 1. Unistyles with React Native Reanimated

```typescript
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { useStyles } from '@/hooks';

const AnimatedComponent = () => {
  const { theme } = useStyles();
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const styles = StyleSheet.create((theme) => ({
    container: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing(6),
      borderRadius: theme.borderRadius.md,
    },
  }));

  const handlePress = () => {
    scale.value = withTiming(1.1, { duration: theme.animation.duration.fast });
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Pressable onPress={handlePress}>
        <Text>Animated Button</Text>
      </Pressable>
    </Animated.View>
  );
};
```

## Best Practices

### 1. Performance Optimization

✅ **Do:**

- Define styles in separate `.styles.ts` files following the naming convention
- Use `StyleSheet.create` with theme function for dynamic styling
- Leverage Unistyles' built-in optimization
- Use variants for conditional styling rather than JavaScript conditionals
- Keep StyleSheets outside component render functions
- Always use theme colors (`theme.colors.*`) instead of hex codes, rgba, or color names
- Use `npm run lint -- --fix` to automatically fix formatting errors when checking generated code

❌ **Don't:**

- Create styles inline within JSX
- Define styles inside component functions
- Use React Native's StyleSheet.create
- Create unnecessary style objects in render
- Use hardcoded colors like `#FF0000`, `'white'`, `'black'` (except `'transparent'` which is acceptable)
- Use `npm run lint` without `--fix` when you want to automatically resolve formatting issues

### 2. File Structure and Organization

✅ **Do:**

- Follow the `ComponentName.tsx` → `ComponentName.styles.ts` convention
- Keep style files at the same folder level as components
- Export named style objects from `.styles.ts` files
- Use descriptive names for style exports (e.g., `buttonStyles`, `cardStyles`)

❌ **Don't:**

- Mix styles and component logic in the same file
- Create deeply nested style file structures
- Use generic names like `styles` for exports

### 3. Maintenance and Consistency

✅ **Do:**

- Always use theme tokens instead of hardcoded values
- Follow the established color and spacing scales
- Use semantic color names (primary, secondary, error) instead of specific colors
- Test components in both light and dark themes
- Use responsive breakpoints for different screen sizes
- Follow the file structure convention for styles

❌ **Don't:**

- Hardcode colors, spacing, or typography values
- Skip testing in dark mode
- Ignore responsive design considerations
- Mix Unistyles with React Native StyleSheet
- Place styles inside component files

### 4. Component Architecture

✅ **Do:**

- Create reusable styled components with variants
- Use the project's UI component system (Box, Stack, Typography, Button)
- Implement proper TypeScript types for style variants
- Document custom theme extensions
- Follow the established file structure for styles

❌ **Don't:**

- Create overly complex variant combinations
- Skip TypeScript typing for style props
- Create custom themed components when UI components suffice
- Define styles inside component files

## Common Patterns

### 1. Card Component with Variants

```typescript
// Card.styles.ts
import { StyleSheet } from 'react-native-unistyles';

export const cardStyles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.borderRadius.lg,
    variants: {
      variant: {
        elevated: {
          backgroundColor: theme.colors.surface,
          ...theme.shadows.md,
        },
        outlined: {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        filled: {
          backgroundColor: theme.colors.primary,
        },
      },
      padding: {
        small: {
          padding: theme.spacing(2),
        },
        medium: {
          padding: theme.spacing(4),
        },
        large: {
          padding: theme.spacing(6),
        },
      },
    },
  },
}));
```

```typescript
// Card.tsx
import { View } from 'react-native';
import { cardStyles } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'small' | 'medium' | 'large';
}

export const Card = ({ children, variant = 'elevated', padding = 'medium' }: CardProps) => {
  return <View style={cardStyles.card({ variant, padding })}>{children}</View>;
};
```

````

### 2. Responsive Grid Layout

```typescript
// GridContainer.styles.ts
import { StyleSheet } from 'react-native-unistyles';

export const gridStyles = StyleSheet.create((theme) => ({
  grid: {
    flexDirection: 'column',
    gap: theme.spacing(4),
    ':sm': {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  gridItem: {
    width: '100%',
    ':sm': {
      width: 'calc(50% - 8px)',
    },
    ':md': {
      width: 'calc(33.333% - 12px)',
    },
    ':lg': {
      width: 'calc(25% - 16px)',
    },
  },
}));
````

```typescript
// GridContainer.tsx
import { View } from 'react-native';
import { gridStyles } from './GridContainer.styles';

interface GridContainerProps {
  children: React.ReactNode;
}

export const GridContainer = ({ children }: GridContainerProps) => {
  return <View style={gridStyles.grid}>{children}</View>;
};
```

````

### 3. Form Input with States

```typescript
// Input.styles.ts
import { StyleSheet } from 'react-native-unistyles';

export const inputStyles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing(4),
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    variants: {
      state: {
        default: {},
        error: {
          borderColor: theme.colors.error,
        },
        disabled: {
          opacity: 0.6,
          backgroundColor: theme.colors.background,
        },
      },
    },
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing(1),
  },
}));
````

```typescript
// Input.tsx
import { View, Text, TextInput } from 'react-native';
import { inputStyles } from './Input.styles';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const Input = ({ value, onChangeText, placeholder, error, disabled }: InputProps) => {
  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input({
          state: error ? 'error' : disabled ? 'disabled' : 'default',
        })}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
      />
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};
```

## Integration with Existing Components

When updating existing components to use Unistyles:

1. **Replace imports**: Change from `react-native` StyleSheet to `react-native-unistyles`
2. **Update colors**: Replace hardcoded colors with theme tokens
3. **Add responsive design**: Consider adding breakpoint-based styling
4. **Use semantic spacing**: Replace magic numbers with theme spacing values
5. **Test thoroughly**: Ensure components work in both light and dark themes

## Debugging and Troubleshooting

### 1. Why My View Doesn't Update? - Common Issues and Solutions

**Issue: Styles not updating when theme changes**

Check these common causes:

1. **Babel Plugin Configuration** - Ensure babel plugin is properly configured:

```javascript
// babel.config.js
module.exports = {
  plugins: [['react-native-unistyles/plugin']],
};
```

2. **Third-party Components** - Use `withUnistyles` for third-party components:

```typescript
import { withUnistyles } from 'react-native-unistyles';
import { SomeThirdPartyComponent } from 'third-party-lib';

const StyledThirdParty = withUnistyles(SomeThirdPartyComponent);

// Now it will update with theme changes
<StyledThirdParty style={styles.container} />
```

3. **Web-specific Issues** - On web, check if styles are properly converted:

```typescript
// Verify StyleSheet is imported from unistyles
import { StyleSheet } from 'react-native-unistyles'; // ✅
import { StyleSheet } from 'react-native'; // ❌
```

4. **Dependency Detection** - Unistyles automatically detects theme dependencies, but for complex cases:

```typescript
// If theme changes aren't detected, ensure you're using theme directly
const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background, // ✅ Direct theme usage
    // color: getColor(theme), // ❌ Indirect usage may not be detected
  },
}));
```

### 2. Theme Access Issues

```typescript
// If theme is not accessible, ensure unistyles is configured
import '@/styles/theme'; // Make sure this is imported in your app root

// Check theme availability
const { theme, rt } = useStyles();
console.log('Current theme:', rt.themeName);
console.log('Available colors:', Object.keys(theme.colors));
```

### 3. Responsive Design Testing

```typescript
// Debug current breakpoint and screen size
const { rt } = useStyles();

useEffect(() => {
  console.log('Breakpoint:', rt.breakpoint);
  console.log('Screen:', rt.screen);
}, [rt.breakpoint, rt.screen]);
```

### 4. Performance Monitoring

```typescript
// Use React DevTools Profiler to monitor re-renders
// Ensure StyleSheet.create is not called unnecessarily in render
```

### 5. Style Resolution Issues

**Check style application order:**

```typescript
// Styles are applied in this order:
// 1. Base styles
// 2. Variant styles
// 3. Compound variant styles
// 4. Breakpoint/media query styles
// 5. Inline styles (highest priority)

const styles = StyleSheet.create((theme) => ({
  button: {
    padding: theme.spacing(2), // Base style
    variants: {
      size: {
        large: {
          padding: theme.spacing(4), // Variant style
        },
      },
    },
    // Breakpoint styles override variants
    ':md': {
      padding: theme.spacing(6),
    },
  },
}));
```

Remember to always test your styled components in both light and dark themes, and across different screen sizes to
ensure a consistent user experience.
