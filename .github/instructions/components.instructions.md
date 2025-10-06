# Component Development Instructions

This document provides guidance on using and developing UI components in the Expo Starter Boilerplate project.

## Overview

The project uses a custom UI component system built on top of React Native with Unistyles v3 for theming. Components are
designed to be reusable, theme-aware, and performant.

## UI Component System

### Available Components

The project includes a comprehensive set of UI components:

- **Box**: Layout container with padding, margin, background, borders, shadows
- **Stack**: Flexible stack for arranging children with consistent spacing
- **Typography**: Text component with size, weight, color, and preset variants
- **Button**: Interactive button with variants, sizes, and loading states
- **List**: High-performance list component (better than FlatList)
- **Loader**: Loading indicator component
- **Collapsible**: Expandable content sections

### Import Pattern

```typescript
import { Box, Typography, Button, List, Loader, Stack } from '@/components/ui';
```

## List Component Usage

**Always use the project's `List` component instead of React Native's `FlatList` for better performance:**

### Basic List

```typescript
import { List } from '@/components/ui';

const SimpleList = () => {
  const { data: users } = useQuery({
    ...authQueries.list({ page: '1' }),
  });

  return (
    <List
      data={users || []}
      renderItem={({ item }) => (
        <Box padding="md">
          <Typography>{item.name}</Typography>
        </Box>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  );
};
```

### List with Variants

```typescript
const StyledList = () => {
  return (
    <List
      variant="inset"           // 'default' | 'separated' | 'inset'
      padding="md"              // 'none' | 'xs' | 'sm' | 'md' | 'lg'
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  );
};
```

### Performance Benefits

- **Faster rendering**: Better performance than FlatList, especially with dynamic item sizes
- **Memory efficient**: Automatic recycling and optimized rendering
- **Drop-in replacement**: Similar API to FlatList with enhanced capabilities
- **Built-in optimization**: Automatic estimated item sizing and view recycling

## Box Component Usage

**Use the `Box` component for flexible layout containers with built-in spacing, styling, and theme support:**

### Basic Box Usage

```typescript
import { Box } from '@/components/ui';

const BasicExample = () => (
  <Box background="surface" borderRadius="lg" shadow="md">
    <Typography>Content inside a styled box</Typography>
  </Box>
);
```

### Spacing with Shorthand Props (Recommended)

```typescript
const ShorthandSpacing = () => (
  <Box p="md" m="lg">
    <Typography>Using shorthand props</Typography>
  </Box>
);
```

### Spacing with Number Values (Recommended)

```typescript
const NumberSpacing = () => (
  <Box padding={4} margin={6}>
    <Typography>Using number values (4 = 16px, 6 = 24px)</Typography>
  </Box>
);
```

### Material UI-Style Shorthand Props

```typescript
const ShorthandExample = () => (
  <Box
    pt={2}        // paddingTop: 8px
    pb="md"       // paddingBottom: 16px
    px={4}        // paddingHorizontal: 16px
    mt="lg"       // marginTop: 24px
    mb={3}        // marginBottom: 12px
    mx="auto"     // marginHorizontal: auto
  >
    <Typography>Using shorthand spacing props</Typography>
  </Box>
);
```

### Available Shorthand Props

**Padding:**

- `p` - padding (all sides)
- `pt` - paddingTop
- `pb` - paddingBottom
- `pl` - paddingLeft
- `pr` - paddingRight
- `px` - paddingHorizontal (left + right)
- `py` - paddingVertical (top + bottom)

**Margin:**

- `m` - margin (all sides)
- `mt` - marginTop
- `mb` - marginBottom
- `ml` - marginLeft
- `mr` - marginRight
- `mx` - marginHorizontal (left + right)
- `my` - marginVertical (top + bottom)

### Spacing Value Types

```typescript
type SpacingValue = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;

// String values (theme-based)
<Box p="md" />        // 16px
<Box m="lg" />        // 24px

// Number values (multiplied by 4px)
<Box p={4} />         // 16px (4 * 4)
<Box m={6} />         // 24px (6 * 4)
```

### Combining Props

```typescript
const ComplexExample = () => (
  <Box
    p={4}                    // Base padding: 16px
    pt={6}                   // Override paddingTop: 24px
    background="primary"     // Theme background color
    borderRadius="xl"        // Large border radius
    shadow="lg"              // Large shadow
    border="md"              // Medium border
  >
    <Typography color="white">Complex styled box</Typography>
  </Box>
);
```

### Priority Rules

2. **Specific over general**: `pt={2}` overrides `p={4}` for paddingTop only
3. **Number and string mixing**: Can mix `pt={2}` with `pb="md"`

## Stack Component Usage

**Use the `Stack` component for flexible layout arrangements with consistent spacing and alignment:**

### Basic Stack Usage

```typescript
import { Stack } from '@/components/ui';

const BasicExample = () => (
  <Stack gap="md">
    <Typography>First item</Typography>
    <Typography>Second item</Typography>
    <Typography>Third item</Typography>
  </Stack>
);
```

### Horizontal Layout

```typescript
const HorizontalExample = () => (
  <Stack direction="horizontal" gap="sm" align="center">
    <Typography variant="h1">Welcome!</Typography>
    <Icon name="wave" />
  </Stack>
);
```

### Spacing with Number Values (Recommended)

```typescript
const NumberSpacing = () => (
  <Stack gap={4} align="center">
    <Typography>Using number values (4 = 16px)</Typography>
  </Stack>
);
```

### Spacing Options

```typescript
// String values (theme-based)
<Stack gap="sm" />    // 8px gap
<Stack gap="md" />    // 16px gap
<Stack gap="lg" />    // 24px gap

// Number values (multiplied by 4px)
<Stack gap={2} />     // 8px gap (2 * 4)
<Stack gap={4} />     // 16px gap (4 * 4)
<Stack gap={6} />     // 24px gap (6 * 4)

// Alternative: space prop (same as gap)
<Stack space="md" />  // 16px gap
<Stack space={4} />   // 16px gap
```

### Stack Props

```typescript
interface StackProps extends ViewProps, SpacingProps {
  direction?: 'horizontal' | 'vertical'; // Layout direction

  // Spacing (both props do the same thing)
  space?: SpacingValue; // Main spacing prop
  gap?: SpacingValue; // Shorthand alias

  // Inherited from SpacingProps (same as Box)
  p?: SpacingValue; // padding
  pt?: SpacingValue; // paddingTop
  pb?: SpacingValue; // paddingBottom
  pl?: SpacingValue; // paddingLeft
  pr?: SpacingValue; // paddingRight
  px?: SpacingValue; // paddingHorizontal
  py?: SpacingValue; // paddingVertical

  m?: SpacingValue; // margin
  mt?: SpacingValue; // marginTop
  mb?: SpacingValue; // marginBottom
  ml?: SpacingValue; // marginLeft
  mr?: SpacingValue; // marginRight
  mx?: SpacingValue; // marginHorizontal
  my?: SpacingValue; // marginVertical

  align?: 'start' | 'center' | 'end' | 'stretch'; // Cross-axis alignment
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'; // Main-axis alignment
  wrap?: boolean; // Enable wrapping
}
```

### Advanced Examples

```typescript
// Responsive card layout with spacing
const CardGrid = () => (
  <Stack direction="horizontal" gap={4} p="md" wrap align="stretch">
    <Card />
    <Card />
    <Card />
  </Stack>
);

// Form layout with margin and padding
const FormExample = () => (
  <Stack gap="lg" p="xl" m="md">
    <Typography variant="h2">User Information</Typography>
    <Stack gap="md" px="sm">
      <TextInput placeholder="Name" />
      <TextInput placeholder="Email" />
      <Stack direction="horizontal" gap="sm" justify="end" mt="lg">
        <Button title="Cancel" variant="secondary" />
        <Button title="Submit" variant="primary" />
      </Stack>
    </Stack>
  </Stack>
);

// Complex spacing example
const ComplexLayout = () => (
  <Stack
    gap={3}           // 12px gap between children
    p={4}             // 16px padding all sides
    mt="lg"           // 24px top margin
    mx="auto"         // Horizontal margin auto
    direction="horizontal"
    wrap
  >
    <Item />
    <Item />
    <Item />
  </Stack>
);
```

### Priority Rules

1. **gap over space**: `gap={4}` overrides `space="lg"`
2. **Flexible spacing**: Support both string and number values
3. **Auto-layout**: Uses CSS flexbox for consistent layouts

## Component Development Guidelines

### File Structure Convention

**Always define components and styles in separate files following this naming convention:**

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

### Component Design Principles

1. **Theme-first approach**: All styling should be theme-aware and support both light and dark modes
2. **Use custom hooks**: Always use the project's custom `useStyles` hook instead of `useUnistyles` directly
3. **Never use hardcoded colors**: Always use theme colors (`theme.colors.*`) instead of hex codes, rgba, or color names
4. **Spacing**: Use `theme.spacing(n)` function where n \* 4px gives the final spacing value
5. **Component Modularity**: Break down components into smaller, reusable pieces (max 80 lines)
6. **Index exports**: Components/folders should have an index.ts file that exports only public elements

### Loading States

**Always show `Loader` component or loading indicators for async operations:**

```typescript
const MyComponent = () => {
  const { data, isLoading } = useQuery({
    ...someQuery,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      {/* Component content */}
    </Box>
  );
};
```

### Error Handling

**Use the built-in error handling and user feedback:**

```typescript
import { Alert } from 'react-native';

const handleError = () => {
  Alert.alert('Error', 'Something went wrong. Please try again.');
};
```

## Best Practices

### Component Props

✅ **Do:**

- Use TypeScript interfaces for all component props
- Provide sensible defaults for optional props
- Use union types for variant props
- Document complex props with JSDoc comments

❌ **Don't:**

- Use `any` types
- Create overly complex prop interfaces
- Skip default values for optional props

### Styling

✅ **Do:**

- Use theme tokens for all colors, spacing, and typography
- Follow the established component structure
- Use variants for different component states
- Test components in both light and dark themes

❌ **Don't:**

- Use hardcoded values
- Mix Unistyles with React Native StyleSheet
- Create styles inside component files
- Skip responsive design considerations

### Performance

✅ **Do:**

- Use `List` component instead of FlatList
- Implement proper keyExtractor for lists
- Use estimatedItemSize for better performance
- Memoize expensive computations

❌ **Don't:**

- Create unnecessary re-renders
- Skip optimization for large lists
- Use inline functions in render props without memoization

## Testing Components

### Test File Convention

```typescript
// ComponentName.test.tsx
import React from 'react';
import { render, screen } from '@/tests';

import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('component-name')).toBeDefined();
  });

  it('handles different variants', () => {
    render(<ComponentName variant="primary" />);
    // Test variant-specific behavior
  });
});
```

### Testing Guidelines

1. **Import from `@/tests`**: Always use project's testing utilities
2. **Test variants**: Ensure all component variants work correctly
3. **Test interactions**: Verify button presses, form inputs, etc.
4. **Accessibility**: Test with screen readers and accessibility features
5. **Theme switching**: Test components in both light and dark modes

## Common Patterns

### Conditional Rendering

```typescript
const ConditionalComponent = ({ showContent, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      {showContent ? (
        <Typography>Content is visible</Typography>
      ) : (
        <Typography color="muted">No content to show</Typography>
      )}
    </Box>
  );
};
```

### Form Components

```typescript
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  return (
    <Stack gap="md">
      <Typography variant="h2">User Information</Typography>
      <TextInput
        value={formData.name}
        onChangeText={(name) => setFormData(prev => ({ ...prev, name }))}
        placeholder="Enter name"
      />
      <TextInput
        value={formData.email}
        onChangeText={(email) => setFormData(prev => ({ ...prev, email }))}
        placeholder="Enter email"
      />
      <Button
        title="Submit"
        onPress={() => console.log('Form submitted:', formData)}
      />
    </Stack>
  );
};
```

## Don'ts

❌ Don't import React Native components directly when UI alternatives exist

❌ Don't use FlatList - use the `List` component instead

❌ Don't create inline styles - use theme-aware StyleSheet

❌ Don't skip component testing

❌ Don't use hardcoded colors or spacing values
