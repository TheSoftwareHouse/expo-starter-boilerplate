# API Development Instructions

## Overview

This project uses a **custom React Query abstraction** that simplifies API development. Always use the project's custom
hooks instead of TanStack Query directly.

## Core API Patterns

### 1. API Actions Structure

All API functions are organized in collections under `src/api/actions/`:

```
src/api/actions/
├── auth/
│   ├── auth.queries.ts    # GET operations
│   ├── auth.mutations.ts  # POST/PUT/DELETE operations
│   └── auth.types.ts      # TypeScript types
└── index.ts               # Mutation exports
```

### 2. Query Development

**Always define queries in the collection's `.queries.ts` file using the Query Factory pattern:**

```typescript
// src/api/actions/auth/auth.queries.ts
import { AxiosInstance } from 'axios';
import { infiniteQueryFactoryOptions, queryFactoryOptions } from '../../utils/queryFactoryOptions';
import { GetMeQueryResponse, GetUsersInfiniteArgs, GetUsersListArgs, GetUsersResponse } from './auth.types';

// Query functions
const getCurrentUser = (client: AxiosInstance) => async () => {
  return (await client.get<GetMeQueryResponse>('/me')).data;
};

const getUsersList =
  (client: AxiosInstance, { page = '1' }: GetUsersListArgs) =>
  async () => {
    return (await client.get<GetUsersResponse>('/users', { params: { page, count: 5 } })).data;
  };

// Query factory with keys and options
export const authQueries = {
  all: () => ['users'],
  me: () =>
    queryFactoryOptions({
      queryKey: [...authQueries.all(), 'me'],
      queryFn: (client) => getCurrentUser(client),
    }),
  lists: () => [...authQueries.all(), 'list'],
  list: (params: GetUsersListArgs) =>
    queryFactoryOptions({
      queryKey: [...authQueries.lists(), params],
      queryFn: (client) => getUsersList(client, params),
    }),
};
```

**Usage in components:**

```typescript
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@/hooks/useQuery/useQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { ThemedText } from '@/components/themed-text';
import { Loader } from '@/components/ui/loader';

const UsersList = () => {
  // List with parameters using query factory
  const { data: usersResponse, isLoading } = useQuery({
    ...authQueries.list({ page: '1' }),
  });

  // Current user
  const { data: user } = useQuery({
    ...authQueries.me(),
    enabled: true,
  });

  // With additional options
  const { data: cachedUsers } = useQuery({
    ...authQueries.list({ page: '1' }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data.users.filter((user) => user.id),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={usersResponse?.users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedText>{item.name}</ThemedText>
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

### 3. Mutation Development

**Always define mutations in the collection's `.mutations.ts` file:**

```typescript
// src/api/actions/auth/auth.mutations.ts
import { AxiosInstance } from 'axios';
import { BASE_URL } from '@/api/axios';
import { LoginMutationArguments, LoginMutationResponse } from './auth.types';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    if (body.username !== 'mike' && body.password !== 'demo') {
      return (await client.post<LoginMutationResponse>('/authorize', body)).data;
    }

    // Mock login implementation - simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login response
    const mockResponse: LoginMutationResponse = {
      accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
      tokenType: 'bearer',
      expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
    };

    // Simulate login validation
    if (body.username === 'mike' && body.password === 'demo') {
      return mockResponse;
    }

    // Simulate login failure
    throw new Error('Invalid credentials');
  },
};

export const refreshTokenUrl = `${BASE_URL}/users/refresh-token`;
```

**Usage in components:**

```typescript
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useMutation } from '@/hooks/useMutation/useMutation';
import { ThemedText } from '@/components/themed-text';

const LoginForm = () => {
  const { mutateAsync: login, isPending } = useMutation('loginMutation');

  const handleLogin = async () => {
    try {
      const response = await login({ username: 'mike', password: 'demo' });
      // Handle success - tokens are automatically stored
    } catch (error) {
      Alert.alert('Login Failed', 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isPending}
      >
        <ThemedText style={styles.buttonText}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 4. Infinite Queries

**For paginated data using the infinite query factory:**

```typescript
// In queries file
const getUsersInfinite =
  (client: AxiosInstance, { count = '5' }: GetUsersInfiniteArgs) =>
  async ({ pageParam = '1' }) => {
    return (await client.get<GetUsersResponse>('/users', { params: { page: pageParam, count } })).data;
  };

export const authQueries = {
  // ... other queries
  listsInfinite: () => [...authQueries.lists(), 'infinite'],
  listInfinite: (params: GetUsersInfiniteArgs) =>
    infiniteQueryFactoryOptions({
      queryKey: [...authQueries.listsInfinite(), params],
      queryFn: (client) => getUsersInfinite(client, params),
      initialPageParam: '1',
      getNextPageParam: ({ nextPage }) => nextPage?.toString(),
    }),
};
```

**Usage:**

```typescript
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { useInfiniteQuery } from '@/hooks/useInfiniteQuery/useInfiniteQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { ThemedText } from '@/components/themed-text';
import { Loader } from '@/components/ui/loader';

const InfiniteUsersList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteQuery({
    ...authQueries.listInfinite({ count: '5' }),
  });

  const allUsers = data?.pages.flatMap(page => page.users) ?? [];

  const renderUser = ({ item: user }) => (
    <View style={styles.userCard}>
      <ThemedText>{user.name}</ThemedText>
    </View>
  );

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <Pressable
        style={[styles.loadMoreButton, isFetching && styles.loadMoreButtonDisabled]}
        onPress={fetchNextPage}
        disabled={isFetching}
      >
        <ThemedText style={styles.loadMoreText}>
          {isFetching ? 'Loading...' : 'Load More'}
        </ThemedText>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        ListFooterComponent={renderFooter}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  loadMoreButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  loadMoreButtonDisabled: {
    opacity: 0.6,
  },
  loadMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Type Definitions

**Always define comprehensive types in `.types.ts` files:**

```typescript
// src/api/actions/auth/auth.types.ts

// Request types
export type LoginMutationArguments = {
  username: string;
  password: string;
};

export type GetUsersListArgs = {
  page?: string;
};

export type GetUsersInfiniteArgs = {
  count?: string;
};

// Response types
export type LoginMutationResponse = {
  accessToken: string;
  tokenType: string;
  expires: number;
  refreshToken: string;
};

export type GetMeQueryResponse = {
  firstName: string;
  lastName: string;
  username: string;
};

export type User = {
  id: string;
  name: string;
};

export type GetUsersResponse = {
  users: User[];
  nextPage?: number | null;
};

export type RefreshTokenMutationResponse = {
  accessToken: string;
  refreshToken: string;
};
```

## Error Handling

**Use the built-in error handling:**

```typescript
import { View, StyleSheet } from 'react-native';
import { useHandleQueryErrors } from '@/hooks/useHandleQueryErrors/useHandleQueryErrors';
import { useQuery } from '@/hooks/useQuery/useQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { ThemedText } from '@/components/themed-text';
import { Loader } from '@/components/ui/loader';

const UsersList = () => {
  const { data, error, isError, isLoading } = useQuery({
    ...authQueries.list({ page: '1' }),
  });

  // Automatic error handling
  useHandleQueryErrors(error);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Failed to load users</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render users */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
});
```

## Best Practices

1. **Use descriptive names**: `getCurrentUser` not `getUser`
2. **Group related operations**: Keep all auth operations in `auth` collection
3. **Type everything**: Never use `any` - define proper interfaces
4. **Handle loading states**: Always show `Loader` component or loading indicators
5. **Handle errors gracefully**: Use `useHandleQueryErrors` and `Alert` for user feedback
6. **Cache efficiently**: Leverage React Query's built-in caching
7. **Use optimistic updates**: For mutations that should feel instant
8. **Follow React Native patterns**: Use `FlatList` for lists, `StyleSheet` for styling
9. **Use @ aliases**: Import from `@/` for internal modules

## Common Patterns

### Dependent Queries

```typescript
const { data: user, isSuccess } = useQuery({
  ...authQueries.me(true),
  enabled: true,
});

const { data: usersList } = useQuery({
  ...authQueries.list({ page: '1' }),
  enabled: !!user && isSuccess, // Only run when user is loaded
});
```

### Invalidating Cache

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
const { mutateAsync: login } = useMutation('loginMutation', {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: authQueries.all() });
    queryClient.invalidateQueries({ queryKey: authQueries.me().queryKey });
  },
});
```

### Background Refetching

```typescript
const { data } = useQuery({
  ...authQueries.list({ page: '1' }),
  refetchInterval: 30000, // Refetch every 30 seconds
  staleTime: 10000, // Consider data stale after 10 seconds
});
```

## Don'ts

❌ Don't import from `@tanstack/react-query` directly

❌ Don't create API calls outside the `api/actions` structure

❌ Don't skip type definitions

❌ Don't forget to handle loading and error states
