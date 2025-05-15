import {
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

/**
 * Custom hook from UseQuery
 */
type UseCustomQueryProps<TData, TError = AxiosError> = {
  queryKey: QueryKey
  queryFn: () => Promise<TData>
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}

export const useCustomQuery = <TData, TError = AxiosError>({
  queryKey,
  queryFn,
  options,
}: UseCustomQueryProps<TData, TError>) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    ...options,
  })
}

/**
 * Custom hook for useMutation
 */
type UseCustomMutationProps<TPayload, TResult, TError = AxiosError> = {
  mutationKey?: QueryKey
  mutationFn: (payload: TPayload) => Promise<TResult>
  options?: Omit<UseMutationOptions<TResult, TError, TPayload>, 'mutationKey' | 'mutationFn'>
}

export const useCustomMutation = <TPayload, TResult, TError = AxiosError>({
  mutationKey,
  mutationFn,
  options,
}: UseCustomMutationProps<TPayload, TResult, TError>) => {
  return useMutation<TResult, TError, TPayload>({
    mutationKey,
    mutationFn,
    ...options,
  })
}
