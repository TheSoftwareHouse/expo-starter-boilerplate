import { AxiosInstance } from 'axios';

import { infiniteQueryFactoryOptions, queryFactoryOptions } from '../../utils/queryFactoryOptions';

import { GetMeQueryResponse, GetUsersInfiniteArgs, GetUsersListArgs, GetUsersResponse } from './auth.types';

const getCurrentUser =
  (client: AxiosInstance, { mock = false } = {}) =>
  async () => {
    if (mock) {
      // Mock user data response
      const mockUserResponse: GetMeQueryResponse = {
        firstName: 'Mike',
        lastName: 'Tyson',
        username: 'mike',
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return mockUserResponse;
    }

    return (await client.get<GetMeQueryResponse>('/me')).data;
  };

const getUsersInfinite =
  (client: AxiosInstance, { count = '5' }: GetUsersInfiniteArgs) =>
  async ({ pageParam = '1' }) => {
    return (await client.get<GetUsersResponse>('/users', { params: { page: pageParam, count } })).data;
  };

const getUsersList =
  (client: AxiosInstance, { page = '1' }: GetUsersListArgs) =>
  async () => {
    return (await client.get<GetUsersResponse>('/users', { params: { page, count: 5 } })).data;
  };

export const authQueries = {
  all: () => ['users'],
  me: (mock?: boolean) =>
    queryFactoryOptions({
      queryKey: [...authQueries.all(), 'me'],
      queryFn: (client) => getCurrentUser(client, { mock }),
    }),
  lists: () => [...authQueries.all(), 'list'],
  list: (params: GetUsersListArgs) =>
    queryFactoryOptions({
      queryKey: [...authQueries.lists(), params],
      queryFn: (client) => getUsersList(client, params),
    }),
  listsInfinite: () => [...authQueries.lists(), 'infinite'],
  listInfinite: (params: GetUsersInfiniteArgs) =>
    infiniteQueryFactoryOptions({
      queryKey: [...authQueries.listsInfinite(), params],
      queryFn: (client) => getUsersInfinite(client, params),
      initialPageParam: '1',
      getNextPageParam: ({ nextPage }) => nextPage?.toString(),
    }),
};
