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
import { StyleSheet } from 'react-native-unistyles';
import { useQuery } from '@/hooks/useQuery/useQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { Typography, Box, Loader, List } from '@/components/ui';

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
    <Box style={styles.container}>
      <List
        data={usersResponse?.users || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Typography>{item.name}</Typography>
        )}
        estimatedItemSize={60}
      />
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing(4),
  },
}));
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
```

**Usage in components:**

```typescript
import { Alert, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useMutation } from '@/hooks/useMutation/useMutation';
import { Typography, Box } from '@/components/ui';

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
    <Box style={styles.container}>
      <Pressable
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isPending}
      >
        <Typography style={styles.buttonText}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Typography>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(6),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
}));
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
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useInfiniteQuery } from '@/hooks/useInfiniteQuery/useInfiniteQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { Typography, Box, List } from '@/components/ui';

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
    <Box style={styles.userCard}>
      <Typography>{user.name}</Typography>
    </Box>
  );

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <Pressable
        style={[styles.loadMoreButton, isFetching && styles.loadMoreButtonDisabled]}
        onPress={fetchNextPage}
        disabled={isFetching}
      >
        <Typography style={styles.loadMoreText}>
          {isFetching ? 'Loading...' : 'Load More'}
        </Typography>
      </Pressable>
    );
  };

  return (
    <Box style={styles.container}>
      <List
        data={allUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        ListFooterComponent={renderFooter}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        estimatedItemSize={80}
      />
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing(4),
  },
  userCard: {
    padding: theme.spacing(2),
    marginVertical: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  loadMoreButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  loadMoreButtonDisabled: {
    opacity: 0.6,
  },
  loadMoreText: {
    color: 'white',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
}));
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
import { StyleSheet } from 'react-native-unistyles';
import { useHandleQueryErrors } from '@/hooks/useHandleQueryErrors/useHandleQueryErrors';
import { useQuery } from '@/hooks/useQuery/useQuery';
import { authQueries } from '@/api/actions/auth/auth.queries';
import { Typography, Box, Loader } from '@/components/ui';

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
      <Box style={styles.errorContainer}>
        <Typography style={styles.errorText}>Failed to load users</Typography>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      {/* Render users */}
    </Box>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing(4),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  errorText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
    textAlign: 'center',
  },
}));
```

## Best Practices

1. **Use descriptive names**: `getCurrentUser` not `getUser`
2. **Group related operations**: Keep all auth operations in `auth` collection
3. **Type everything**: Never use `any` - define proper interfaces
4. **Handle loading states**: Always show loading indicators (see [Component Instructions](components.instructions.md))
5. **Handle errors gracefully**: Use `useHandleQueryErrors` and `Alert` for user feedback
6. **Cache efficiently**: Leverage React Query's built-in caching
7. **Use optimistic updates**: For mutations that should feel instant
8. **Follow component patterns**: Use project UI components (see [Component Instructions](components.instructions.md))
9. **Use @ aliases**: Import from `@/` for internal modules
10. **Zod imports**: Always use `from 'zod/v4'` instead of `from 'zod'` for schema validation
11. **Constants naming**: Use SCREAMING_SNAKE_CASE for constants (e.g., `BASE_URL`, `REFRESH_TOKEN_URL`)

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
