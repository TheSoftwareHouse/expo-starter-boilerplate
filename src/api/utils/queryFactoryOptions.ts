import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { UseInfiniteQueryOptions } from '@/hooks/useInfiniteQuery';
import { UseQueryOptions } from '@/hooks/useQuery';

export const queryFactoryOptions = <TQueryFnData = unknown, TError = StandardizedApiError>(
  options: UseQueryOptions<TQueryFnData, TError>,
) => options;

export const infiniteQueryFactoryOptions = <
  TQueryFnData = unknown,
  TPageParam = unknown,
  TError = StandardizedApiError,
>(
  options: UseInfiniteQueryOptions<TQueryFnData, TError, TPageParam>,
) => options;
