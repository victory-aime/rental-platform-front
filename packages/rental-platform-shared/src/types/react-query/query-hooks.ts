import {
  useQuery,
  useMutation,
  QueryKey,
  MutationKey,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MutationInput } from './types'

type UseCustomQueryProps<TData, TError = AxiosError> = {
  queryKey: QueryKey
  queryFn: () => Promise<TData>
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}

type UseCustomMutationProps<TPayload, TResult, TError = AxiosError> = {
  mutationKey?: MutationKey
  mutationFn: (input: MutationInput<TPayload>) => Promise<TResult>
  options?: Omit<
    UseMutationOptions<TResult, TError, MutationInput<TPayload>>,
    'mutationFn' | 'mutationKey'
  >
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

export const useCustomMutation = <TPayload, TResult, TError = AxiosError>({
  mutationKey,
  mutationFn,
  options,
}: UseCustomMutationProps<TPayload, TResult, TError>) => {
  return useMutation<TResult, TError, MutationInput<TPayload>>({
    mutationKey,
    mutationFn,
    ...options,
  })
}
