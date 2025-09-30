import { useQueryClient } from '@tanstack/react-query';

import { authQueries } from '@/api/actions/auth/auth.queries';
import { GetMeQueryResponse } from '@/api/actions/auth/auth.types';
import { GenericQueryOptions } from '@/hooks/useQuery/useQuery.types';
import { useQuery } from '../useQuery/useQuery';

export const useUser = (options?: GenericQueryOptions<GetMeQueryResponse>, mock?: boolean) => {
  const queryClient = useQueryClient();

  const resetUser = () => queryClient.removeQueries({ queryKey: authQueries.me().queryKey });

  const query = useQuery({ ...authQueries.me(mock), ...options });
  return { ...query, resetUser };
};
