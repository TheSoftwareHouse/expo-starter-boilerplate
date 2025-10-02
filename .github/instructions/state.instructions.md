# State Management Instructions

## Overview

This project uses a **Context + Controller pattern** for global state management. Local component state is handled with
useState/useReducer, while global state uses React Context with dedicated controller components.

## Context Architecture

### 1. Context Structure

Each context follows this structure:

```
src/context/[contextName]/
├── [contextName]Context/
│   ├── [ContextName]Context.ts       # Context definition
│   ├── [ContextName]Context.types.ts # TypeScript types
│   └── [ContextName]Context.test.tsx # Context tests
├── [contextName]ContextController/
│   ├── [ContextName]ContextController.tsx      # Controller component with business logic
│   ├── [ContextName]ContextController.types.ts # Controller types
│   └── [ContextName]ContextController.test.tsx # Controller tests
```

**Hook for context access is placed in `src/hooks/use[ContextName]/`:**

```
src/hooks/use[ContextName]/
├── use[ContextName].ts           # Hook to access context
├── use[ContextName].types.ts     # Hook types
└── use[ContextName].test.tsx     # Hook tests
```

### 2. Context Implementation Pattern

**Context Definition:**

```typescript
// src/context/auth/authContext/AuthContext.ts
import { createContext } from 'react';
import { AuthContextValue } from './AuthContext.types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
```

**Context Types:**

```typescript
// src/context/auth/authContext/AuthContext.types.ts
import { GetMeQueryResponse, LoginMutationArguments } from '@/api/actions/auth/auth.types';
import { AuthState } from '../authReducer/authReducer.types';

export type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: ({ password, username }: LoginMutationArguments) => void;
  logout: VoidFunction;
  user: GetMeQueryResponse | undefined;
};
```

**Context Controller:**

```typescript
// src/context/auth/authContextController/AuthContextController.tsx
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useMutation } from '@/hooks/useMutation/useMutation';
import { useUser } from '@/hooks/useUser/useUser';
import { AuthContext } from '../authContext/AuthContext';
import { AuthContextValue } from '../authContext/AuthContext.types';
import { authReducer } from '../authReducer/authReducer';
import { authStorage } from '../authStorage/AuthStorage';
import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    accessToken: authStorage.accessToken,
    refreshToken: authStorage.refreshToken,
    expires: authStorage.expires,
  });

  const {
    data: user,
    isFetching,
    isSuccess: isUserSuccess,
    isError,
    resetUser,
  } = useUser(
    {
      enabled: !!state.accessToken,
    },
    true,
  );

  const { mutateAsync: loginMutation } = useMutation('login');
  const { mutateAsync: logoutMutation } = useMutation('logout');

  const login = useCallback(async (credentials: LoginMutationArguments) => {
    try {
      const tokens = await loginMutation(credentials);
      setTokens(dispatch, tokens);
    } catch (error) {
      // Handle login error
      throw error;
    }
  }, [loginMutation]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      resetTokens(dispatch);
      resetUser();
    } catch (error) {
      // Handle logout error but still clear local state
      resetTokens(dispatch);
      resetUser();
    }
  }, [logoutMutation, resetUser]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      isAuthenticated: !!state.accessToken,
      isAuthenticating: isFetching,
      login,
      logout,
      user,
    }),
    [state, isFetching, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 3. Controller Pattern

**Controller Implementation:**

```typescript
// src/context/locale/localeContextController/LocaleContextController.tsx
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { translations } from '@/i18n/messages';
import { AppLocale } from '../AppLocale.enum';
import { defaultLocale } from '../defaultLocale';
import { LocaleContext } from '../localeContext/LocaleContext';
import { LocaleContextControllerProps } from './LocaleContextController.types';

export const LocaleContextController = ({ children }: LocaleContextControllerProps) => {
  const [locale, setLocale] = useState<AppLocale>(defaultLocale);

  return (
    <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={translations[locale]}>
      <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
};
```

**Controller Types:**

```typescript
// src/context/locale/localeContextController/LocaleContextController.types.ts
import { ReactNode } from 'react';

export interface LocaleContextControllerProps {
  children: ReactNode;
}
```

### 4. Hook for Context Access

**Context Hook:**

```typescript
// src/hooks/useAuth/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/authContext/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContextController');
  }

  return context;
};
```

**Hook Tests:**

```typescript
// src/hooks/useAuth/useAuth.test.tsx
import { renderHook } from '@testing-library/react-native';
import { useAuth } from './useAuth';
import { AuthContextController } from '@/context/auth/authContextController/AuthContextController';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContextController>{children}</AuthContextController>
);

describe('useAuth', () => {
  it('returns auth context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthContextController');
  });
});
```

## Local State Patterns

### 1. Simple State with useState

```typescript
import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <EditForm
          data={formData}
          onChange={setFormData}
          onCancel={handleCancel}
        />
      ) : (
        <ViewProfile onEdit={handleEdit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### 2. Complex State with useReducer

```typescript
import { useReducer } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

// State and actions
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_LOADING'; payload: boolean };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

// Component usage
const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // Filter todos based on current filter
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <View style={styles.container}>
      <TodoInput onAdd={addTodo} />
      <TodoFilter
        current={state.filter}
        onChange={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })}
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### 3. Custom State Hook

```typescript
// src/hooks/useToggle/useToggle.tsx
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
};

// Usage
const Modal = () => {
  const { value: isOpen, toggle, setFalse } = useToggle();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggle}>
        <ThemedText>Open Modal</ThemedText>
      </Pressable>
      {isOpen && (
        <ModalComponent onClose={setFalse}>
          <ThemedText>Modal content</ThemedText>
        </ModalComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
```

## Data Flow Patterns

### 1. Parent-Child Communication

**Props Down, Events Up:**

```typescript
// Parent component
const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users } = useQuery('getUsers');

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <View style={styles.container}>
      <UserGrid users={users} onUserSelect={handleUserSelect} />
      {selectedUser && <UserDetails userId={selectedUser} />}
    </View>
  );
};

// Child component
interface UserGridProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

const UserGrid = ({ users, onUserSelect }: UserGridProps) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item: user }) => (
        <UserCard
          user={user}
          onPress={() => onUserSelect(user.id)}
        />
      )}
      style={styles.userGrid}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userGrid: {
    flex: 1,
  },
});
```

### 2. Context for Global State

```typescript
// Usage in components
const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.header, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <ThemedText type="title">My App</ThemedText>
      {isAuthenticated ? (
        <View style={styles.userSection}>
          <ThemedText>Welcome, {user?.name}</ThemedText>
          <Pressable style={styles.logoutButton} onPress={logout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </Pressable>
        </View>
      ) : (
        <LoginButton />
      )}
    </View>
  );
};

const Settings = () => {
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (newLocale: AppLocale) => {
    setLocale(newLocale);
  };

  return (
    <View style={styles.settingsContainer}>
      <ThemedText type="subtitle">Settings</ThemedText>
      <LanguageSelector
        current={locale}
        onChange={handleLanguageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
});
```

## Provider Setup

### 1. AppProviders Configuration

```typescript
// src/providers/AppProviders.tsx
import { AuthContextController } from '@/context/auth/authContextController/AuthContextController';
import { LocaleContextController } from '@/context/locale/localeContextController/LocaleContextController';
import { ApiClientContextController } from '@/context/apiClient/apiClientContextController/ApiClientContextController';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LocaleContextController>
      <ApiClientContextController>
        <AuthContextController>{children}</AuthContextController>
      </ApiClientContextController>
    </LocaleContextController>
  );
};
```

### 2. Root App Setup

```typescript
// src/app/_layout.tsx
import { AppProviders } from '@/providers/AppProviders';

function AppLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
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
```

## Best Practices

### 1. Context Design

✅ **Do:**

- Keep contexts focused and small
- Use controllers for business logic
- Provide proper TypeScript types
- Write tests for contexts and controllers
- Use derived state in controllers
- Separate concerns (auth, UI state, etc.)

❌ **Don't:**

- Create monolithic contexts
- Put all global state in one context
- Skip error boundaries around providers
- Use context for data that changes frequently
- Access context outside of components

### 2. Local State

✅ **Do:**

- Use useState for simple state
- Use useReducer for complex state logic
- Create custom hooks for reusable state logic
- Keep state as close to where it's used as possible
- Use proper TypeScript types

❌ **Don't:**

- Over-complicate simple state with useReducer
- Store derived state unnecessarily
- Create unnecessary re-renders
- Skip memoization for expensive computations

### 3. State Updates

✅ **Do:**

- Use functional updates with useState
- Handle async operations properly
- Provide loading and error states
- Use optimistic updates where appropriate
- Validate state changes

❌ **Don't:**

- Mutate state directly
- Forget to handle errors in async operations
- Skip loading states for long operations
- Update state after component unmount

## Common Patterns

### 1. Optimistic Updates

```typescript
const { mutateAsync: updateUser } = useMutation('updateUser');

const handleUpdate = async (userData: Partial<User>) => {
  // Optimistic update
  setState((prev) => ({
    ...prev,
    currentUser: prev.currentUser ? { ...prev.currentUser, ...userData } : null,
  }));

  try {
    const updatedUser = await updateUser(userData);
    setState((prev) => ({ ...prev, currentUser: updatedUser }));
  } catch (error) {
    // Revert optimistic update
    setState((prev) => ({ ...prev, currentUser: originalUser }));
    throw error;
  }
};
```

### 2. Debounced State Updates

```typescript
import { useDebouncedCallback } from 'use-debounce';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debouncedSearch = useDebouncedCallback(
    (value: string) => setDebouncedSearchTerm(value),
    300
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const { data: results } = useQuery('searchItems', {
    variables: debouncedSearchTerm,
    enabled: !!debouncedSearchTerm,
  });

  return (
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
      />
      {results && <SearchResults results={results} />}
    </View>
  );
};
```

### 3. State Persistence

```typescript
import { useCallback, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

// Create MMKV instance for app state persistence
const storage = new MMKV({
  id: 'app-state-storage',
});

const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = storage.getString(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setPersistedState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        try {
          storage.set(key, JSON.stringify(newValue));
        } catch (error) {
          // Handle storage error
          console.error('Failed to persist state:', error);
        }
        return newValue;
      });
    },
    [key],
  );

  return [state, setPersistedState] as const;
};

// Example usage
const useUserPreferences = () => {
  const [preferences, setPreferences] = usePersistedState('userPreferences', {
    theme: 'light' as 'light' | 'dark',
    notifications: true,
    language: 'en',
  });

  const updateTheme = useCallback(
    (theme: 'light' | 'dark') => {
      setPreferences((prev) => ({ ...prev, theme }));
    },
    [setPreferences],
  );

  const toggleNotifications = useCallback(() => {
    setPreferences((prev) => ({ ...prev, notifications: !prev.notifications }));
  }, [setPreferences]);

  return {
    preferences,
    updateTheme,
    toggleNotifications,
    setPreferences,
  };
};
```
